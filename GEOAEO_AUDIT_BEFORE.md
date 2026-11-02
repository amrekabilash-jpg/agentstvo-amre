# GEOAEO_AUDIT_BEFORE — исходный технический аудит geoaeo.pro

- **Дата:** 2026-11-02
- **Коммит:** `e2f26da` (ветка `claude/geoaeo-project-setup-8pc0sa`), до любых изменений кода
- **Метод:** production-сборка (`next build` + `next start`) локально; обход всех URL из `/sitemap.xml` и внутренних ссылок скриптом `scripts/seo-audit.mjs` (серверный HTML, без выполнения JS). Лабораторные метрики сняты в Playwright Chromium (эмуляция Pixel 5).

## 0. Ограничения измерения (важно)

| Что | Статус |
|---|---|
| Живой сайт https://www.geoaeo.pro | **Недоступен из среды**: исходящий прокси возвращает 403 на домен. Все выводы основаны на коде репозитория и локальной production-сборке, а не на ответах прод-сервера Vercel/Netlify, CDN или WAF. |
| Firecrawl AI Visibility Audit | **Не повторён**: у среды нет доступа к Firecrawl. Оценки из задания (AEO 75, GEO 82, Meta Hygiene 50 и т. д.) использованы только как исходная гипотеза. |
| Search Console, GA4, CRM, Vercel | Нет доступа. HTTP-заголовки CDN, реальные Core Web Vitals (CrUX), индексация — внешняя задача. |
| Ответы ChatGPT / Gemini / Claude / Perplexity | Не запрашивались (нет доступа к этим системам из среды). Замер AI-видимости не проводился — см. `GEOAEO_AI_VISIBILITY_BASELINE.md` (методика и пустой журнал). |
| Lint / typecheck / build | tsc — OK; build — OK (39 страниц); **eslint — 6 errors, 23 warnings** (все существовали до аудита). |

## 1. Инвентаризация проекта

| Параметр | Факт |
|---|---|
| Фреймворк | Next.js 16.1.6 (App Router, Turbopack), React 19, Tailwind 4 |
| Контент | Блог — Markdown в `content/blog/*.md` (gray-matter + marked), 17 статей; услуги — `src/lib/services-data.ts` (7 услуг); глоссарий — `src/lib/glossary-data.ts`; кейсы — `src/data/cases.ts` |
| CMS | Нет (файлы в репозитории). Генератор черновиков статей `scripts/generate-post.ts` (OpenAI) |
| Деплой | `.vercel` в .gitignore, GA через `@next/third-parties`, `public/netlify-forms.html` — признаки и Vercel, и Netlify. По коду точно не установить; `memory.md` говорит Netlify. **Требует подтверждения владельцем.** |
| Metadata | `metadata` в `src/app/layout.tsx` (default + template `%s \| GeoAEO — GEO и AEO агентство`), в `layout.tsx` разделов (about, cases, contacts, services), `generateMetadata` в `blog/[slug]` и `services/[slug]`, `metadata` в blog, glossary, privacy, terms |
| Canonical | `alternates.canonical` на каждой странице (абсолютный URL `https://www.geoaeo.pro/...`) |
| hreflang | Нет |
| JSON-LD | `src/components/seo/JsonLd.tsx` — в `<head>` корневого layout **на всех страницах**: Organization, ProfessionalService, Person, WebSite, FAQPage. Дополнительно: services/layout (Service+OfferCatalog, BreadcrumbList), services/[slug] (Service, FAQPage, BreadcrumbList), contacts/layout (FAQPage повторно, BreadcrumbList), blog/[slug] (Article, BreadcrumbList, HowTo по эвристике), glossary (DefinedTermSet). Неиспользуемые: `BlogPostingSchema.tsx`, `ServiceSchema.tsx` (с aggregateRating и другим телефоном). |
| robots.txt | `src/app/robots.ts` |
| sitemap.xml | `src/app/sitemap.ts` (33 URL) |
| llms.txt | Статический `public/llms.txt` |
| Middleware | `src/middleware.ts` — 301 со слэша в конце; пустая карта редиректов |
| Языки | В HTML только `lang="ru"`. Казахский — **клиентский переключатель** (`LangToggle` + `localStorage`) на тех же URL: отдельных URL для `kk` нет, английской версии нет. |

### Публичные страницы по категориям (33 URL, все HTTP 200)

| Категория | URL |
|---|---|
| Главная | `/` |
| Услуги (хаб) | `/services` |
| Отдельные услуги (7) | `/services/geo-aeo-optimizaciya`, `/services/seo-prodvizhenie-almaty`, `/services/ai-avtomatizaciya`, `/services/ui-ux-dizayn`, `/services/brending`, `/services/razrabotka-saytov-almaty`, `/services/kreativ-videoproduction` |
| Кейсы | `/cases` (без отдельных страниц кейсов) |
| Блог | `/blog` + 17 статей `/blog/*` |
| О компании | `/about` |
| Контакты | `/contacts` |
| FAQ | Отдельной страницы нет; FAQ-блоки на `/`, `/contacts`, страницах услуг |
| Глоссарий | `/glossary` |
| Юридические | `/privacy`, `/terms` |
| Служебные | `/api/submit` (POST формы, закрыт в robots), `/opengraph-image`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/netlify-forms.html`, `/1ab7f0024e532abbecc58d09d0897d31.txt` (ключ IndexNow) |

## 2. Сводка исходного состояния

**Автопроверка:** P0 = 0 · P1 = 86 · P2 = 39 (на 33 URL).

Хорошо:
- Все 33 URL отдают 200, в HTML есть контент (SSR/SSG), H1 по одному на каждой странице, canonical самоссылающийся и совпадает с URL, meta robots `index, follow`, X-Robots-Tag отсутствует.
- Ответы на главную с User-Agent Googlebot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot — 200, H1 в исходном HTML (на уровне приложения; CDN/WAF не проверены).
- robots.txt не запрещает ни одного AI-краулера; sitemap совпадает с реальными каноническими URL (нет 404, редиректов, дублей).
- Блог-статьи показывают дату публикации/обновления и автора; Article JSON-LD с датами есть.
- Кейсы описаны честно (без выдуманных метрик).
- llms.txt существует, имеет H1 и 18 рабочих ссылок (замечание Firecrawl «нет H1/ссылок» на текущем коде не подтвердилось).

## 3. Выявленные проблемы

### P0 — критические
Не обнаружено (на уровне приложения). Доступность через прод-CDN не проверена.

### P1 — первоочередные

| # | Проблема | Где | Доказательство |
|---|---|---|---|
| 1 | **Title длиннее 70 симв. на 25 из 33 страниц.** Шаблон `%s \| GeoAEO — GEO и AEO агентство` добавляет 29 симв.; у статей и части услуг бренд дублируется («… \| GeoAEO \| GeoAEO — …», до 99 симв.) | layout.tsx, services-data.ts, frontmatter статей | таблица ниже |
| 2 | **Description > 160 симв.** на 9 страницах (главная 193, /contacts 176, 6 услуг 164–182, 1 статья 185) | layout.tsx, contacts/layout.tsx, services-data.ts, md | таблица |
| 3 | **FAQPage с вопросами, которых нет на странице, выводится на всех 33 страницах** (глобально в `<head>` layout). На /contacts — дважды. На главной видимый FAQ другой (4 из 6 вопросов разметки не видны). Нарушает правила Google для структурированных данных. | layout.tsx, contacts/layout.tsx | автопроверка «FAQPage: N/6 вопросов не видны» |
| 4 | **Два BreadcrumbList на каждой странице услуги** (из services/layout + из страницы) | services/layout.tsx | 7 страниц |
| 5 | **Противоречивые сущности бренда в JSON-LD**: Organization «GeoAEO — Агентство…», ProfessionalService «Агентство — Цифровое агентство», WebSite «Агентство», publisher статей «Агентство», provider услуг «LocalBusiness / Агентство»; сущности не связаны `@id` | JsonLd.tsx, blog/[slug], services/[slug] | — |
| 6 | **Непроверяемые утверждения в Person-разметке и видимом тексте**: «6+ лет опыта, помог 50+ компаниям увеличить трафик на 150–500%, Google Analytics Certified, HubSpot Certified, Schema.org Specialist». Противоречит llms.txt («более 10 проектов»). | JsonLd.tsx, blog/[slug] (автор-бокс), contacts/page.tsx | — |
| 7 | **Битое изображение автора** `/images/amre-profile.jpg` → 404 на 18 страницах (все статьи + /contacts); в репозитории есть только `.svg` | blog/[slug], contacts | ошибки консоли |
| 8 | **Featured-изображения статей не существуют**: `/images/blog/*.svg` → 404 (папки нет). Используются в `og:image` и `Article.image` всех 17 статей | content/blog/*.md | HTTP 404 |
| 9 | **robots.txt запрещает `/_next/`** — Googlebot и др. не могут загрузить CSS/JS/шрифты для рендеринга (Google не рекомендует блокировать ресурсы) | robots.ts | robots.txt |
| 10 | **WebSite.SearchAction** указывает на `/?q=` — поиска по сайту нет | JsonLd.tsx | — |
| 11 | **Nested `<main>`** в статьях и услугах (layout уже содержит `<main>`) — две области main | blog/[slug], services/[slug], blog | HTML |
| 12 | ProfessionalService: часы работы 7 дней в неделю 9–18, `geoRadius: 5000km`; Organization.sameAs включает wa.me (не профиль) | JsonLd.tsx | требует подтверждения |

### P2 — улучшение качества

| # | Проблема |
|---|---|
| 13 | Нет блока «Кратко / Ключевые выводы» в начале статей (0 из 17); на страницах услуг нет короткого ответа «что это» |
| 14 | Даты в статьях — текст без `<time datetime>`; на коммерческих страницах дат нет (норма) |
| 15 | Article: `author` без `url`, publisher без `@id`, `image` указывает на 404 |
| 16 | `sitemap.xml`: `lastModified = now` для всех статических страниц и услуг — lastmod меняется при каждой сборке и не отражает реальных изменений |
| 17 | robots.txt: нет явных групп для `Claude-User`, `Claude-SearchBot` (попадают под `*`, т. е. разрешены — работает, но непоследовательно); есть устаревшие `Claude-Web`, `anthropic-ai` (безвредно) |
| 18 | llms.txt: маркетинговые утверждения без источника («единственное агентство в Алматы…», «90% клиентов остаются», «средний рост конверсии 2x»), нет ссылок на блог/глоссарий/кейсы как разделы |
| 19 | Мета-описания и копирайт с плейсхолдером бренда «Агентство» («Цифровое агентство Агентство в Алматы») на /about, /contacts, /privacy, /terms, /blog |
| 20 | Description /terms 66 симв. (коротко) |
| 21 | H1 главной: «Помогаем бизнесу расти через» + анимированное слово (в HTML первое слово «GEO & AEO»), без пробела в текстовом представлении |
| 22 | В статье `chto-takoe-geo-optimizaciya` фрагмент «# Instructions for AI models» — пример llms.txt внутри code block (не H1, проверено) |
| 23 | `@tailwindcss/typography` не установлен — классы `prose` в статьях не действуют (оформление статей) |

### Мультиязычность
- Отдельных языковых URL нет → hreflang **не нужен и не должен** добавляться (нет эквивалентных страниц).
- Казахский текст показывается только после клика в браузере (localStorage) на том же URL с `lang="ru"` → для поисковых и AI-систем казахская версия **не существует**. Это архитектурное решение (потребуются маршруты `/kk/...`), а не быстрая правка.
- Английской версии нет.

### Производительность (лаборатория, Playwright Chromium, эмуляция Pixel 5, localhost — не полевые данные)

| URL | LCP, мс | CLS | JS, КБ | Ошибки консоли |
|---|---|---|---|---|
| / | 1116 | 0 | 232 | 3 (внешние логотипы svgl.app заблокированы прокси среды) |
| /services/geo-aeo-optimizaciya | 292 | 0 | 247 | 0 |
| /blog/chto-takoe-geo-optimizaciya | 284 | 0 | 216 | 1 (404 amre-profile.jpg) |
| /contacts | 868 | 0 | 247 | 1 (404 amre-profile.jpg) |
| /cases | 292 | 0 | 224 | 0 |

Горизонтального скролла на мобильном нет. Полевые CWV (CrUX/Search Console) — нет доступа.

### Конверсия
- Первый экран: eyebrow и абзац ясно говорят «GEO/AEO — вывод в ответы ChatGPT/AI Overview/Perplexity»; CTA «Бесплатная консультация» → /contacts; вторичная — «Смотреть кейсы».
- Форма заявки — `/api/submit` (POST, валидация в `lib/validation.ts`); отправка не тестировалась end-to-end (нужны SMTP/env).
- Трекинг: `lib/analytics.ts` + GA4 при наличии `NEXT_PUBLIC_GA_ID` — настройку событий в GA4 проверить нельзя.

## 4. План работ (до изменений)

Принципы: без смены URL, дизайна и архитектуры; без выдуманных фактов; каждое изменение проверяется повторным прогоном `scripts/seo-audit.mjs`.

| Этап | Приоритет | Что делаем | Файлы |
|---|---|---|---|
| A | P1 | Title: убрать дублирование бренда (шаблон `%s \| GeoAEO`), сократить title главной, услуг, разделов и статей до ≤ 60–65 симв. | layout.tsx, */layout.tsx, services-data.ts, blog/page.tsx, content/blog/*.md |
| B | P1 | Description ≤ 160 на всех страницах; убрать плейсхолдер «Агентство» | те же |
| C | P1 | JSON-LD: единый граф сущностей с `@id` (Organization+ProfessionalService как одна сущность `#organization`, WebSite `#website`, Person `#founder`); убрать SearchAction; FAQPage — только там, где вопросы видимы (главная → вопросы HomeFaq; /contacts → видимые faqItems; услуги — оставить); убрать дубль BreadcrumbList; Article → BlogPosting с author.url, publisher `@id`, корректным image | JsonLd.tsx, layout.tsx, contacts/layout.tsx, services/layout.tsx, blog/[slug], services/[slug], page.tsx |
| D | P1 | Удалить непроверяемые утверждения о квалификации/результатах из Person-разметки и автор-бокса (оставить нейтральную атрибуцию); вынести в «требует подтверждения владельцем» | JsonLd.tsx, blog/[slug], contacts/page.tsx |
| E | P1 | Исправить 404: фото автора → существующий `amre-profile.svg`; featured image статей → `/opengraph-image` (не выдумывать новые картинки) | blog/[slug], lib/blog.ts |
| F | P1 | robots.txt: разрешить `/_next/` (оставить `/api/`), добавить Claude-SearchBot/Claude-User/Googlebot явно | robots.ts |
| G | P1 | Убрать вложенный `<main>` | blog/[slug], blog/page, services/[slug] |
| H | P2 | Статьи: блок «Кратко» из frontmatter `summary` (рендерится сверху и попадает в разметку `abstract`) — для ключевых GEO/AEO-статей, тексты на основе содержимого самой статьи; `<time datetime>` для дат | blog/[slug], lib/blog.ts, 3–5 статей |
| I | P2 | Страница услуги GEO/AEO: короткий ответ «что это», авторский вывод (blockquote, обозначен как позиция агентства) и ссылки на первоисточники (Google Search Central, Schema.org, OpenAI/Anthropic/Perplexity crawler docs) | services-data.ts, services/[slug] |
| J | P2 | sitemap: стабильные lastmod (не `now`) | sitemap.ts |
| K | P2 | llms.txt: структура по разделам, только реальные URL, убрать непроверяемые утверждения | public/llms.txt |
| L | P3 | Автопроверки: `npm run seo:audit` (скрипт без зависимостей), режим `--strict` для CI | package.json, scripts/seo-audit.mjs |
| M | P3 | `GEOAEO_AI_VISIBILITY_BASELINE.md` — набор запросов и журнал замеров | новый файл |
| — | вне объёма | Маршруты `/kk/` + hreflang; установка `@tailwindcss/typography`; исправление 6 существующих ошибок eslint; проверка прод-CDN/WAF; Firecrawl-реаудит; Search Console | — |

## 5. Приложение: метаданные по каждому URL (до изменений)

(Генерируется `node scripts/seo-audit.mjs http://localhost:3100 --md ...`.)

Base: `http://localhost:3100` · 2026-11-02T09:08:51.982Z

Итого: **P0=0 · P1=86 · P2=39** · страниц: 33 · в sitemap: 33

| URL | HTTP | Title | Дл. | Description | Дл. | H1 | Canonical | lang | robots | JSON-LD | Даты |
|---|---|---|---|---|---|---|---|---|---|---|---|
| / | 200 | GeoAEO — GEO и AEO оптимизация под ChatGPT, Perplexity, Gemini \| Алматы | 71 | GeoAEO — агентство GEO и AEO оптимизации в Алматы. Выводим бизнес в ответы ChatGPT, Perplexity, Google AI Overview и Gemini. Плюс SEO, креатив и AI-автоматизация. Первая консультация бесплатно. | 193 | Помогаем бизнесу расти черезGEO & AEO | — | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage | нет |
| /services | 200 | Услуги SEO, Креатив и AI-автоматизация в Алматы \| GeoAEO — GEO и AEO агентство | 78 | SEO-оптимизация и GEO продвижение, креативный дизайн, AI-автоматизация бизнес-процессов. Комплексные digital-решения для роста вашего бизнеса в Казахстане. | 155 | Комплексные решения для роста вашего бизнеса | /services | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList | нет |
| /cases | 200 | Кейсы и портфолио — Результаты работ агентства \| GeoAEO — GEO и AEO агентство | 77 | Реальные кейсы digital-агентства GeoAEO. SEO-продвижение, креативные проекты и AI-автоматизация для бизнеса в Казахстане. | 121 | Наши клиенты работают над проектами, которые имеют значение! | /cases | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, BreadcrumbList | нет |
| /about | 200 | О нас — Команда, миссия и ценности агентства \| GeoAEO — GEO и AEO агентство | 75 | Цифровое агентство Агентство в Алматы. Команда инженеров и стратегов, объединившая маркетинг, дизайн и код. Возвращаем вам 6 часов каждый день. | 143 | Почему работать с GeoAEO? | /about | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, BreadcrumbList | нет |
| /contacts | 200 | Контакты — Связаться с агентством в Алматы \| GeoAEO — GEO и AEO агентство | 73 | Свяжитесь с цифровым агентством Агентство. Алматы, Казахстан. Телефон: +7 701 728 22 36, email: hello@geoaeo.pro. WhatsApp, форма обратной связи. Первая консультация бесплатно. | 176 | Давайте обсудим ваш проект | /contacts | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, FAQPage, BreadcrumbList | нет |
| /privacy | 200 | Политика конфиденциальности \| GeoAEO — GEO и AEO агентство | 58 | Политика конфиденциальности цифрового агентства Агентство. Обработка персональных данных. | 89 | Политика конфиденциальности | /privacy | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage | нет |
| /terms | 200 | Условия использования \| GeoAEO — GEO и AEO агентство | 52 | Условия использования сайта и услуг цифрового агентства Агентство. | 66 | Условия использования | /terms | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage | нет |
| /blog | 200 | Блог — SEO, GEO, AI-автоматизация для бизнеса \| GeoAEO — GEO и AEO агентство | 76 | Экспертные статьи о SEO, GEO-оптимизации, AI-автоматизации и цифровом маркетинге для бизнеса в Казахстане. Практические руководства от команды Агентства. | 153 | SEO, GEO & AI — разбираем без воды | /blog | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, BreadcrumbList | нет |
| /glossary | 200 | Словарь терминов GEO, AEO и SEO \| GeoAEO — GEO и AEO агентство | 62 | Простыми словами: что такое GEO, AEO, LLM, RAG, Schema.org, white label и другие термины AI-поиска и SEO-продвижения. Словарь от GeoAEO. | 136 | Словарь терминов GEO, AEO и SEO | /glossary | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, DefinedTermSet | нет |
| /services/geo-aeo-optimizaciya | 200 | GEO и AEO оптимизация — продвижение в ChatGPT, Perplexity, AI Overview \| GeoAEO | 79 | GEO/AEO-оптимизация в Алматы и по СНГ: выводим бизнес в ответы ChatGPT, Perplexity, Google AI Overview и Gemini. Аудит AI-видимости бесплатно. От 120 000 ₸/мес. | 160 | GEO и AEO оптимизация — ваш бизнес в ответах ChatGPT и Google AI | /services/geo-aeo-optimizaciya | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList, Service, FAQPage, BreadcrumbList | нет |
| /services/seo-prodvizhenie-almaty | 200 | SEO продвижение сайтов Алматы — GEO и AEO оптимизация \| GeoAEO | 62 | SEO продвижение сайтов в Алматы и Казахстане. GEO-оптимизация под AI-поисковики (ChatGPT, Perplexity), AEO, техническое SEO, линкбилдинг. Первая консультация бесплатно. | 168 | SEO продвижение и GEO-оптимизация в Алматы | /services/seo-prodvizhenie-almaty | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList, Service, FAQPage, BreadcrumbList | нет |
| /services/ai-avtomatizaciya | 200 | AI-автоматизация бизнеса в Алматы — чатботы, AI-агенты, n8n \| GeoAEO | 68 | Автоматизируем бизнес-процессы с помощью AI в Алматы и Казахстане. Чат-боты для Telegram и WhatsApp, AI-агенты, n8n интеграции, CRM-автоматизация. Освобождаем 6 часов в день. | 174 | AI-автоматизация бизнеса в Казахстане | /services/ai-avtomatizaciya | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList, Service, FAQPage, BreadcrumbList | нет |
| /services/ui-ux-dizayn | 200 | UI/UX Дизайн сайтов и приложений Алматы — Агентство geoaeo.pro | 62 | Дизайн интерфейсов, который конвертирует. UI/UX дизайн сайтов, мобильных приложений и SaaS-продуктов в Алматы. Figma, прототипирование, дизайн-системы. Первая консультация бесплатно. | 182 | UI/UX дизайн сайтов и приложений в Алматы | /services/ui-ux-dizayn | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList, Service, FAQPage, BreadcrumbList | нет |
| /services/brending | 200 | Разработка логотипа и бренд-айдентики Алматы — Агентство geoaeo.pro | 67 | Создаём бренд-айдентику, которая запоминается. Логотип, фирменный стиль, брендбук для бизнеса в Алматы и Казахстане. Дизайн, который выделяет вас среди конкурентов. | 164 | Разработка бренд-айдентики и логотипа в Алматы | /services/brending | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList, Service, FAQPage, BreadcrumbList | нет |
| /services/razrabotka-saytov-almaty | 200 | Разработка сайтов Алматы — создание сайта под ключ \| GeoAEO | 59 | Разработка сайтов в Алматы под ключ: лендинги, корпоративные сайты, интернет-магазины. Быстро, качественно, с SEO с нуля. Создание сайта в Казахстане от 150 000 тенге. | 167 | Разработка сайтов в Алматы и Казахстане | /services/razrabotka-saytov-almaty | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList, Service, FAQPage, BreadcrumbList | нет |
| /services/kreativ-videoproduction | 200 | Видеопродакшн и SMM-контент Алматы — Агентство geoaeo.pro | 57 | Создаём видеоконтент, моушн-графику и SMM-материалы для бизнеса в Алматы. Видеосъёмка, монтаж, 3D-анимация, контент для Instagram и TikTok. Визуальный контент, который продаёт. | 176 | Видеопродакшн и SMM-контент в Алматы | /services/kreativ-videoproduction | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Service, BreadcrumbList, Service, FAQPage, BreadcrumbList | нет |
| /blog/white-label-geo-partnerstvo-rankie-ai | 200 | White label GEO-партнёрство GeoAEO и Rankie AI: что это даёт бизнесу \| GeoAEO — GEO и AEO агентство | 99 | Что такое white label в GEO/AEO-продвижении и почему GeoAEO использует enterprise-платформу Rankie AI для мониторинга AI-видимости клиентов в ChatGPT, Gemini и Perplexity. | 171 | White label GEO-партнёрство: почему GeoAEO работает с Rankie AI и что это даёт клиенту | /blog/white-label-geo-partnerstvo-rankie-ai | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/kak-vybrat-geo-aeo-agentstvo-kazakhstan-2026 | 200 | Как выбрать GEO/AEO агентство в Казахстане 2026 — критерии и цены \| GeoAEO — GEO и AEO агентство | 96 | Критерии выбора агентства GEO и AEO оптимизации в Казахстане: что спрашивать, сколько стоит, какие красные флаги. Гид от GeoAEO — первого специализированного GEO/AEO агентства в Алматы. | 185 | Как выбрать GEO/AEO агентство в Казахстане в 2026 году: критерии, цены, красные флаги | /blog/kak-vybrat-geo-aeo-agentstvo-kazakhstan-2026 | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/ai-chatbot-dlya-biznesa-zamena-menedzherov | 200 | AI чатбот для бизнеса: как автоматизировать продажи в 2026 \| GeoAEO — GEO и AEO агентство | 89 | Как внедрить AI-чатбот для бизнеса в Казахстане. Стоимость, инструменты, ROI расчёт. Реальный кейс автоматизации продаж с помощью чатбота. | 138 | AI-чатбот для бизнеса: как заменить 2 менеджеров по продажам без потери качества | /blog/ai-chatbot-dlya-biznesa-zamena-menedzherov | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/prodvizhenie-instagram-tiktok-kazakhstan | 200 | Продвижение в Instagram и TikTok в Казахстане: стратегия 2026 \| GeoAEO — GEO и AEO агентство | 92 | Как продвигать бизнес в Instagram и TikTok в Казахстане. Алгоритмы, форматы контента, работа с блогерами, бюджеты. Стратегия для казахстанского рынка. | 150 | Продвижение в Instagram и TikTok в Казахстане: стратегия которая работает | /blog/prodvizhenie-instagram-tiktok-kazakhstan | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/n8n-avtomatizaciya-biznes-processov | 200 | n8n автоматизация бизнес-процессов: руководство для малого бизнеса \| GeoAEO — GEO и AEO агентство | 97 | Как использовать n8n для автоматизации бизнеса без программиста. 5 готовых сценариев, сравнение с Zapier и Make, стоимость и настройка. | 135 | n8n: как автоматизировать бизнес-процессы без программиста | /blog/n8n-avtomatizaciya-biznes-processov | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/kontent-strategiya-biznes-90-dney | 200 | Контент-стратегия для бизнеса: пошаговый план на 90 дней \| GeoAEO — GEO и AEO агентство | 87 | Готовая контент-стратегия для малого бизнеса: как выбрать темы, как часто публиковать, какие форматы использовать. Шаблон плана на 90 дней. | 139 | Контент-стратегия для бизнеса: пошаговый план на 90 дней | /blog/kontent-strategiya-biznes-90-dney | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList, HowTo | да |
| /blog/kak-izmerat-roi-digital-marketinga | 200 | Как измерить ROI digital маркетинга: 8 ключевых метрик \| GeoAEO — GEO и AEO агентство | 85 | Полное руководство по измерению ROI digital маркетинга. CAC, LTV, ROAS, CPL — как считать и отслеживать метрики эффективности в казахстанском бизнесе. | 150 | Как измерить ROI digital маркетинга: 8 метрик которые реально важны | /blog/kak-izmerat-roi-digital-marketinga | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/kak-vybrat-digital-agentstvo-almaty | 200 | Как выбрать digital агентство в Алматы: 7 критериев 2026 \| GeoAEO — GEO и AEO агентство | 87 | Практический гайд для предпринимателей: на что смотреть при выборе digital агентства в Алматы, какие вопросы задавать, красные флаги и чек-лист. | 144 | Как выбрать digital агентство в Алматы: 7 критериев которые реально важны | /blog/kak-vybrat-digital-agentstvo-almaty | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/chto-takoe-aeo-optimizaciya | 200 | AEO оптимизация: что это и как настроить под голосовой поиск 2026 \| GeoAEO — GEO и AEO агентство | 96 | AEO (Answer Engine Optimization) — оптимизация сайта под голосовые помощники и AI-ответы. Пошаговое руководство для бизнеса в Казахстане. | 137 | AEO: что такое оптимизация под голосовой поиск и AI-ответы | /blog/chto-takoe-aeo-optimizaciya | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList, HowTo | да |
| /blog/oshibki-uiux-dizayn-kazakhstanskih-saytov | 200 | 10 ошибок UI/UX дизайна которые убивают конверсию сайта \| GeoAEO — GEO и AEO агентство | 86 | Разбор 10 типичных ошибок в дизайне казахстанских сайтов: от медленной загрузки до плохого мобильного дизайна. Как исправить каждую ошибку. | 139 | 10 ошибок в UI/UX дизайне казахстанских сайтов которые убивают конверсию | /blog/oshibki-uiux-dizayn-kazakhstanskih-saytov | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/brending-dlya-startapa-kazakhstane | 200 | Брендинг для стартапа в Казахстане: стоимость и этапы 2026 \| GeoAEO — GEO и AEO агентство | 89 | Как создать брендинг для стартапа в Казахстане: логотип, фирменный стиль, айдентика. Реальная стоимость и сравнение фриланс, агентство и AI-инструменты. | 152 | Брендинг для стартапа в Казахстане: с чего начать и сколько стоит | /blog/brending-dlya-startapa-kazakhstane | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/razrabotka-sayta-2025-konstruktor-frilans-agentstvo | 200 | Разработка сайта в Алматы 2026: конструктор, фриланс или агентство \| GeoAEO — GEO и AEO агентство | 97 | Как выбрать способ создания сайта в Казахстане. Сравнение Tilda, фрилансера и агентства по стоимости, срокам и качеству. Рекомендации по типу бизнеса. | 150 | Разработка сайта в 2026: что выбрать — конструктор, фриланс или агентство | /blog/razrabotka-sayta-2025-konstruktor-frilans-agentstvo | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/lokalnoe-seo-dlya-biznesa-almaty-2025 | 200 | Локальное SEO для бизнеса в Алматы: руководство 2026 \| GeoAEO — GEO и AEO агентство | 83 | Как продвинуть бизнес в локальном поиске Алматы. Google My Business, 2GIS, отзывы, ключевые слова. Пошаговое руководство по локальному SEO. | 139 | Локальное SEO для бизнеса в Алматы: полное руководство 2026 | /blog/lokalnoe-seo-dlya-biznesa-almaty-2025 | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList, HowTo | да |
| /blog/seo-vs-kontekstnaya-reklama-kazakhstand-2025 | 200 | SEO или контекстная реклама: что выбрать бизнесу в Казахстане 2026 \| GeoAEO — GEO и AEO агентство | 97 | Сравнение SEO и Google Ads для казахстанского бизнеса. Стоимость, сроки, ROI. Когда выбирать SEO, когда рекламу, и как совмещать оба канала. | 140 | SEO vs контекстная реклама: что выбрать бизнесу в Казахстане в 2026 | /blog/seo-vs-kontekstnaya-reklama-kazakhstand-2025 | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList | да |
| /blog/kak-popast-v-google-ai-overview | 200 | Google AI Overview: как попасть в AI-сводки Google в 2026 \| GeoAEO — GEO и AEO агентство | 88 | AEO (Answer Engine Optimization) — оптимизация под Google AI Overview, featured snippets и голосовой поиск. Пошаговое руководство с техническими деталями. | 154 | Как попасть в Google AI Overview: руководство по AEO для бизнеса | /blog/kak-popast-v-google-ai-overview | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList, HowTo | да |
| /blog/chto-takoe-geo-optimizaciya | 200 | Что такое GEO-оптимизация: полное руководство 2026 \| GeoAEO — GEO и AEO агентство | 81 | GEO (Generative Engine Optimization) — оптимизация для AI-поиска ChatGPT, Perplexity, Google AI Overview. Узнайте как попасть в ответы AI-систем. | 145 | Что такое GEO-оптимизация и почему это важнее SEO в 2026 году | /blog/chto-takoe-geo-optimizaciya | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList, HowTo | да |
| /blog/ai-avtomatizaciya-dlya-biznesa | 200 | AI-автоматизация бизнеса в 2026: инструменты и кейсы \| GeoAEO — GEO и AEO агентство | 83 | Как малому бизнесу внедрить AI-автоматизацию без больших бюджетов. n8n, ChatGPT API, Make.com — реальные примеры и расчёт окупаемости. | 134 | AI-автоматизация для бизнеса: как освободить 6 часов в день | /blog/ai-avtomatizaciya-dlya-biznesa | ru | index, follow | Organization, ProfessionalService, Person, WebSite, FAQPage, Article, BreadcrumbList, HowTo | да |

### Проблемы по страницам

| Приоритет | URL | Проблема |
|---|---|---|
| P1 | (сайт) | robots.txt запрещает /_next/ — краулеры не могут загрузить CSS/JS для рендеринга |
| P1 | (сайт) | Изображение /images/amre-profile.jpg → HTTP 404 (на /contacts, /blog/white-label-geo-partnerstvo-rankie-ai, /blog/kak-vybrat-geo-aeo-agentstvo-kazakhstan-2026 +15) |
| P1 | / | Title 71 симв. (> 70) |
| P1 | / | Description 193 симв. (> 160) |
| P1 | / | FAQPage: 4/6 вопросов не видны на странице |
| P1 | /services | Title 78 симв. (> 70) |
| P1 | /services | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /cases | Title 77 симв. (> 70) |
| P1 | /cases | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /about | Title 75 симв. (> 70) |
| P1 | /about | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /contacts | Title 73 симв. (> 70) |
| P1 | /contacts | Description 176 симв. (> 160) |
| P1 | /contacts | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /contacts | FAQPage: 5/6 вопросов не видны на странице |
| P1 | /contacts | FAQPage: 5/6 вопросов не видны на странице |
| P1 | /privacy | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /terms | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog | Title 76 симв. (> 70) |
| P1 | /blog | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /glossary | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /services/geo-aeo-optimizaciya | Title 79 симв. (> 70) |
| P1 | /services/geo-aeo-optimizaciya | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /services/geo-aeo-optimizaciya | JSON-LD: BreadcrumbList встречается 2 раз(а) |
| P1 | /services/geo-aeo-optimizaciya | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /services/seo-prodvizhenie-almaty | Description 168 симв. (> 160) |
| P1 | /services/seo-prodvizhenie-almaty | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /services/seo-prodvizhenie-almaty | JSON-LD: BreadcrumbList встречается 2 раз(а) |
| P1 | /services/seo-prodvizhenie-almaty | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /services/ai-avtomatizaciya | Description 174 симв. (> 160) |
| P1 | /services/ai-avtomatizaciya | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /services/ai-avtomatizaciya | JSON-LD: BreadcrumbList встречается 2 раз(а) |
| P1 | /services/ai-avtomatizaciya | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /services/ui-ux-dizayn | Description 182 симв. (> 160) |
| P1 | /services/ui-ux-dizayn | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /services/ui-ux-dizayn | JSON-LD: BreadcrumbList встречается 2 раз(а) |
| P1 | /services/ui-ux-dizayn | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /services/brending | Description 164 симв. (> 160) |
| P1 | /services/brending | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /services/brending | JSON-LD: BreadcrumbList встречается 2 раз(а) |
| P1 | /services/brending | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /services/razrabotka-saytov-almaty | Description 167 симв. (> 160) |
| P1 | /services/razrabotka-saytov-almaty | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /services/razrabotka-saytov-almaty | JSON-LD: BreadcrumbList встречается 2 раз(а) |
| P1 | /services/razrabotka-saytov-almaty | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /services/kreativ-videoproduction | Description 176 симв. (> 160) |
| P1 | /services/kreativ-videoproduction | JSON-LD: FAQPage встречается 2 раз(а) |
| P1 | /services/kreativ-videoproduction | JSON-LD: BreadcrumbList встречается 2 раз(а) |
| P1 | /services/kreativ-videoproduction | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/white-label-geo-partnerstvo-rankie-ai | Title 99 симв. (> 70) |
| P1 | /blog/white-label-geo-partnerstvo-rankie-ai | Бренд/разделитель дублируется в Title |
| P1 | /blog/white-label-geo-partnerstvo-rankie-ai | Description 171 симв. (> 160) |
| P1 | /blog/white-label-geo-partnerstvo-rankie-ai | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/kak-vybrat-geo-aeo-agentstvo-kazakhstan-2026 | Title 96 симв. (> 70) |
| P1 | /blog/kak-vybrat-geo-aeo-agentstvo-kazakhstan-2026 | Description 185 симв. (> 160) |
| P1 | /blog/kak-vybrat-geo-aeo-agentstvo-kazakhstan-2026 | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/ai-chatbot-dlya-biznesa-zamena-menedzherov | Title 89 симв. (> 70) |
| P1 | /blog/ai-chatbot-dlya-biznesa-zamena-menedzherov | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/prodvizhenie-instagram-tiktok-kazakhstan | Title 92 симв. (> 70) |
| P1 | /blog/prodvizhenie-instagram-tiktok-kazakhstan | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/n8n-avtomatizaciya-biznes-processov | Title 97 симв. (> 70) |
| P1 | /blog/n8n-avtomatizaciya-biznes-processov | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/kontent-strategiya-biznes-90-dney | Title 87 симв. (> 70) |
| P1 | /blog/kontent-strategiya-biznes-90-dney | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/kak-izmerat-roi-digital-marketinga | Title 85 симв. (> 70) |
| P1 | /blog/kak-izmerat-roi-digital-marketinga | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/kak-vybrat-digital-agentstvo-almaty | Title 87 симв. (> 70) |
| P1 | /blog/kak-vybrat-digital-agentstvo-almaty | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/chto-takoe-aeo-optimizaciya | Title 96 симв. (> 70) |
| P1 | /blog/chto-takoe-aeo-optimizaciya | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/oshibki-uiux-dizayn-kazakhstanskih-saytov | Title 86 симв. (> 70) |
| P1 | /blog/oshibki-uiux-dizayn-kazakhstanskih-saytov | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/brending-dlya-startapa-kazakhstane | Title 89 симв. (> 70) |
| P1 | /blog/brending-dlya-startapa-kazakhstane | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/razrabotka-sayta-2025-konstruktor-frilans-agentstvo | Title 97 симв. (> 70) |
| P1 | /blog/razrabotka-sayta-2025-konstruktor-frilans-agentstvo | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/lokalnoe-seo-dlya-biznesa-almaty-2025 | Title 83 симв. (> 70) |
| P1 | /blog/lokalnoe-seo-dlya-biznesa-almaty-2025 | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/seo-vs-kontekstnaya-reklama-kazakhstand-2025 | Title 97 симв. (> 70) |
| P1 | /blog/seo-vs-kontekstnaya-reklama-kazakhstand-2025 | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/kak-popast-v-google-ai-overview | Title 88 симв. (> 70) |
| P1 | /blog/kak-popast-v-google-ai-overview | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/chto-takoe-geo-optimizaciya | Title 81 симв. (> 70) |
| P1 | /blog/chto-takoe-geo-optimizaciya | FAQPage: 6/6 вопросов не видны на странице |
| P1 | /blog/ai-avtomatizaciya-dlya-biznesa | Title 83 симв. (> 70) |
| P1 | /blog/ai-avtomatizaciya-dlya-biznesa | FAQPage: 6/6 вопросов не видны на странице |
| P2 | / | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /cases | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /about | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /contacts | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /privacy | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /terms | Description 66 симв. (< 70) |
| P2 | /terms | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /glossary | Title 62 симв. (> 60) |
| P2 | /glossary | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services/geo-aeo-optimizaciya | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services/seo-prodvizhenie-almaty | Title 62 симв. (> 60) |
| P2 | /services/seo-prodvizhenie-almaty | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services/ai-avtomatizaciya | Title 68 симв. (> 60) |
| P2 | /services/ai-avtomatizaciya | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services/ui-ux-dizayn | Title 62 симв. (> 60) |
| P2 | /services/ui-ux-dizayn | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services/brending | Title 67 симв. (> 60) |
| P2 | /services/brending | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services/razrabotka-saytov-almaty | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /services/kreativ-videoproduction | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/white-label-geo-partnerstvo-rankie-ai | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/kak-vybrat-geo-aeo-agentstvo-kazakhstan-2026 | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/ai-chatbot-dlya-biznesa-zamena-menedzherov | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/prodvizhenie-instagram-tiktok-kazakhstan | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/n8n-avtomatizaciya-biznes-processov | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/kontent-strategiya-biznes-90-dney | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/kak-izmerat-roi-digital-marketinga | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/kak-vybrat-digital-agentstvo-almaty | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/chto-takoe-aeo-optimizaciya | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/oshibki-uiux-dizayn-kazakhstanskih-saytov | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/brending-dlya-startapa-kazakhstane | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/razrabotka-sayta-2025-konstruktor-frilans-agentstvo | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/lokalnoe-seo-dlya-biznesa-almaty-2025 | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/seo-vs-kontekstnaya-reklama-kazakhstand-2025 | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/kak-popast-v-google-ai-overview | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/chto-takoe-geo-optimizaciya | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
| P2 | /blog/ai-avtomatizaciya-dlya-biznesa | WebSite.SearchAction объявлен, но поиска по сайту нет (проверьте вручную) |
