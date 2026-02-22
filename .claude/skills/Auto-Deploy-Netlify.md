# Skill: Auto Deploy to Netlify

## Описание
Автоматический деплой проекта на Netlify — сборка, проверка, публикация.

## Триггер
Пользователь просит задеплоить, опубликовать сайт или обновить продакшн.

## Инструкции

### Предварительные проверки
1. Убедись что проект собирается без ошибок:
   ```bash
   npm run build
   ```
2. Проверь линтинг:
   ```bash
   npm run lint
   ```
3. Убедись что все изменения закоммичены:
   ```bash
   git status
   ```

### Деплой на Netlify
1. Проверь наличие Netlify CLI:
   ```bash
   npx netlify --version
   ```
2. Если не авторизован:
   ```bash
   npx netlify login
   ```
3. Если сайт ещё не привязан:
   ```bash
   npx netlify init
   ```
4. Деплой:
   - Preview: `npx netlify deploy`
   - Production: `npx netlify deploy --prod`

### Конфигурация (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### После деплоя
1. Выведи URL опубликованного сайта
2. Проверь что сайт доступен (WebFetch на URL)
3. Запиши URL в memory.md

## Пример использования
```
Задеплой текущую версию сайта на Netlify (production)
```
