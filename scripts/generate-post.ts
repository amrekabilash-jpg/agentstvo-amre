#!/usr/bin/env npx tsx
/**
 * Генератор статей для geoaeo.pro
 *
 * Использование:
 *   npm run gen              → следующая тема из plan.json
 *   npm run gen -- --id 3    → конкретная тема по ID
 *   npm run gen -- --dry     → только предпросмотр без сохранения
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import OpenAI from "openai";
import "dotenv/config";

// ─── Пути ────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");
const PLAN_PATH = path.join(ROOT, "content/blog/plan.json");
const BLOG_DIR = path.join(ROOT, "content/blog");

// ─── Типы ────────────────────────────────────────────────────────────────────

interface Topic {
  id: number;
  week: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  focus_keyword: string;
  brief: string;
  status: "pending" | "done";
}

interface Plan {
  meta: { site: string; agency: string; audience: string; tone: string; language: string };
  topics: Topic[];
}

// ─── CLI аргументы ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const idArg = args.indexOf("--id");
const targetId = idArg !== -1 ? parseInt(args[idArg + 1]) : null;
const isDry = args.includes("--dry");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яёa-z0-9\s-]/gi, (c) => c)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .trim();
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function log(emoji: string, msg: string): void {
  console.log(`${emoji}  ${msg}`);
}

// ─── Загрузка плана ──────────────────────────────────────────────────────────

function loadPlan(): Plan {
  return JSON.parse(fs.readFileSync(PLAN_PATH, "utf8")) as Plan;
}

function savePlan(plan: Plan): void {
  fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2) + "\n", "utf8");
}

function getNextTopic(plan: Plan, id: number | null): Topic {
  if (id !== null) {
    const found = plan.topics.find((t) => t.id === id);
    if (!found) throw new Error(`Тема с id=${id} не найдена в plan.json`);
    return found;
  }
  const pending = plan.topics.filter((t) => t.status === "pending");
  if (pending.length === 0) throw new Error("Все темы уже написаны! Добавь новые в plan.json");
  return pending[0];
}

// ─── GPT-4 генерация ─────────────────────────────────────────────────────────

async function generateArticle(topic: Topic, meta: Plan["meta"]): Promise<string> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `Ты — опытный SEO-копирайтер цифрового агентства "${meta.agency}" (сайт: ${meta.site}).

Пишешь статьи для блога на русском языке.

АУДИТОРИЯ: ${meta.audience}

СТИЛЬ: ${meta.tone}

ПРАВИЛА:
- Только Markdown (заголовки ##/###, списки, таблицы, **жирный**)
- H1 НЕ пиши — он будет из frontmatter
- Начни сразу с вводного абзаца или ##
- Минимум 1200 слов
- Конкретные цифры, примеры, кейсы из казахстанского рынка
- В конце — призыв к действию со ссылкой на /contacts
- Ключевое слово: "${topic.focus_keyword}" — использовать органично 4-6 раз
- НЕ пиши "В заключение" или "Вывод:" — сразу финальный абзац`;

  const userPrompt = `Напиши статью для блога.

ТЕМА: ${topic.title}
КАТЕГОРИЯ: ${topic.category}
ТЕГИ: ${topic.tags.join(", ")}
БРИФ: ${topic.brief}

Структура статьи:
1. Вводный абзац (почему тема важна прямо сейчас)
2. 4-6 разделов с заголовками ## (каждый закрывает конкретный вопрос)
3. Минимум одна таблица или маркированный список
4. Финальный призыв к действию

Пиши только тело статьи (Markdown), без frontmatter.`;

  log("🤖", "Отправляю запрос в GPT-4o...");

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 3000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("GPT вернул пустой ответ");

  log("✅", `Сгенерировано ~${content.split(" ").length} слов`);
  return content;
}

// ─── Сборка Markdown файла ───────────────────────────────────────────────────

function buildMarkdown(topic: Topic, body: string): string {
  const today = formatDate(new Date());
  const canonical = `https://geoaeo.pro/blog/${topic.slug}`;

  const frontmatter = `---
title: "${topic.title.replace(/"/g, '\\"')}"
slug: "${topic.slug}"
excerpt: "${topic.brief.slice(0, 155).replace(/"/g, '\\"')}..."
date: "${today}"
updated: "${today}"
author:
  name: "Амре Хавлааш"
  role: "Основатель Агентства"
category: "${topic.category}"
tags: [${topic.tags.map((t) => `"${t}"`).join(", ")}]
featuredImage:
  src: "/images/blog/${topic.slug}.svg"
  alt: "${topic.title.replace(/"/g, '\\"')}"
draft: false
seo:
  title: "${topic.title.replace(/"/g, '\\"')}"
  description: "${topic.brief.slice(0, 155).replace(/"/g, '\\"')}..."
  canonical: "${canonical}"
---`;

  return `${frontmatter}\n\n${body.trim()}\n`;
}

// ─── Git push ────────────────────────────────────────────────────────────────

function gitPush(slug: string): void {
  log("📦", "Добавляю в git...");
  execSync(`git -C "${ROOT}" add content/blog/${slug}.md content/blog/plan.json`, { stdio: "pipe" });
  execSync(
    `git -C "${ROOT}" commit -m "content: add blog post '${slug}'"`,
    { stdio: "pipe" }
  );
  log("🚀", "Пушу на Vercel...");
  execSync(`git -C "${ROOT}" push origin main`, { stdio: "inherit" });
}

// ─── Главная функция ─────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("\n🖊️  Генератор статей geoaeo.pro\n");

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌  OPENAI_API_KEY не найден. Добавь его в .env.local");
    process.exit(1);
  }

  const plan = loadPlan();
  const topic = getNextTopic(plan, targetId);

  log("📋", `Тема #${topic.id}: ${topic.title}`);
  log("🗓 ", `Плановая дата: ${topic.week}`);
  log("🔑", `Ключевое слово: ${topic.focus_keyword}`);

  if (isDry) {
    log("👁 ", "Режим --dry: файл не сохранится, git не запустится");
    console.log("\nБриф:", topic.brief);
    return;
  }

  // Проверяем не существует ли уже файл
  const outPath = path.join(BLOG_DIR, `${topic.slug}.md`);
  if (fs.existsSync(outPath)) {
    log("⚠️ ", `Файл ${topic.slug}.md уже существует. Используй --id другой темы.`);
    process.exit(1);
  }

  // Генерируем
  const body = await generateArticle(topic, plan.meta);
  const markdown = buildMarkdown(topic, body);

  // Сохраняем
  fs.writeFileSync(outPath, markdown, "utf8");
  log("💾", `Сохранено: content/blog/${topic.slug}.md`);

  // Помечаем в плане как done
  const topicInPlan = plan.topics.find((t) => t.id === topic.id)!;
  topicInPlan.status = "done";
  savePlan(plan);
  log("📝", `plan.json обновлён — тема #${topic.id} помечена как done`);

  // Деплой
  gitPush(topic.slug);

  console.log(`\n✨ Готово! Статья будет доступна через ~2 мин:`);
  console.log(`   https://geoaeo.pro/blog/${topic.slug}\n`);
}

main().catch((err) => {
  console.error("\n❌ Ошибка:", err.message);
  process.exit(1);
});
