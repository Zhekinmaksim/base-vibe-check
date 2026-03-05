# 🎯 Vibe Check — Onchain Mood Tracker

A **Base Mini App** that lets users share their daily onchain mood and see a live community vibe check. Built with Next.js, MiniKit, and the Farcaster Frame SDK.

**Moods:** 🚀 Bullish · 🔨 Building · ✨ Vibing · 🐻 Bearish · 🌿 Touching Grass · 🎰 Full Degen

---

## Архитектура проекта

```
base-vibe-check/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts          # Манифест для Farcaster / Base App
│   ├── api/
│   │   └── webhook/
│   │       └── route.ts          # Обработка вебхуков (добавление/удаление приложения)
│   ├── components/
│   │   ├── MiniKitProvider.tsx    # Инициализация Frame SDK
│   │   └── VibeCheck.tsx         # Основной UI компонент
│   ├── globals.css               # Стили + Tailwind
│   ├── layout.tsx                # Корневой layout с метаданными
│   └── page.tsx                  # Главная страница
├── minikit.config.ts             # Конфигурация манифеста
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── .env.example
```

---

## Пошаговая инструкция запуска

### Шаг 0 — Предварительные требования

Перед началом убедитесь, что у вас есть:

1. **Node.js** (v18 или выше) — скачайте с https://nodejs.org
2. **Git** — https://git-scm.com
3. **Аккаунт на Vercel** — зарегистрируйтесь на https://vercel.com (бесплатно)
4. **Аккаунт Farcaster** — создайте через Warpcast (https://warpcast.com) или приложение Base
5. **GitHub аккаунт** — для хостинга репозитория

---

### Шаг 1 — Создание репозитория на GitHub

1. Зайдите на https://github.com/new
2. Назовите репозиторий `base-vibe-check`
3. Выберите **Public**
4. Нажмите **Create repository**

---

### Шаг 2 — Клонирование и настройка проекта

```bash
# Клонируйте пустой репозиторий
git clone https://github.com/<ваш-username>/base-vibe-check.git
cd base-vibe-check

# Скопируйте все файлы проекта в эту папку
# (все файлы из этого архива)

# Установите зависимости
npm install
```

---

### Шаг 3 — Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```bash
cp .env.example .env.local
```

Пока оставьте URL как есть — мы обновим его после деплоя на Vercel.

---

### Шаг 4 — Локальный запуск (проверка)

```bash
npm run dev
```

Откройте http://localhost:3000 в браузере. Вы увидите интерфейс приложения.

> **Примечание:** Полностью Mini App работает только внутри Base App / Warpcast, но UI можно проверить локально.

---

### Шаг 5 — Деплой на Vercel

**Способ A: Через Vercel CLI**

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel

# Следуйте инструкциям:
# - Подтвердите настройки проекта
# - Выберите свой аккаунт
# - Vercel определит Next.js автоматически
```

**Способ B: Через веб-интерфейс Vercel**

1. Зайдите на https://vercel.com/new
2. Импортируйте ваш GitHub-репозиторий `base-vibe-check`
3. Добавьте переменную окружения:
   - `NEXT_PUBLIC_PROJECT_NAME` = `Vibe Check`
4. Нажмите **Deploy**

После деплоя вы получите URL вида: `https://base-vibe-check-xxx.vercel.app`

---

### Шаг 6 — Обновление URL в конфигурации

1. В панели Vercel зайдите в **Settings → Environment Variables**
2. Добавьте переменную:
   - `NEXT_PUBLIC_URL` = `https://ваш-url.vercel.app` (без / в конце)
3. **Важно:** Зайдите в **Settings → Deployment Protection** и **отключите** "Vercel Authentication" (переключите в OFF и сохраните). Это нужно, чтобы Base App мог загрузить ваш манифест.
4. Переразверните проект (Deployments → три точки → Redeploy)

---

### Шаг 7 — Создание accountAssociation (подпись манифеста)

Это привязывает ваше Mini App к вашему Farcaster-аккаунту.

1. Откройте https://base.dev/preview?tab=account
2. Вставьте ваш домен Vercel (например `base-vibe-check-xxx.vercel.app`) в поле **App URL**
3. Нажмите **Submit**
4. Нажмите **Verify** и следуйте инструкциям (потребуется подтверждение через Warpcast)
5. Скопируйте полученный объект `accountAssociation`

---

### Шаг 8 — Вставка accountAssociation в код

Откройте `minikit.config.ts` и замените пустые значения:

```typescript
accountAssociation: {
  header: "eyJm...скопированное_значение...",
  payload: "eyJk...скопированное_значение...",
  signature: "MHhm...скопированное_значение...",
},
```

Закоммитьте и запушьте:

```bash
git add .
git commit -m "Add account association credentials"
git push origin main
```

Vercel автоматически переразвернёт приложение.

---

### Шаг 9 — Проверка (Preview)

1. Перейдите на https://base.dev/preview
2. Вставьте ваш URL в поле для проверки
3. Проверьте:
   - **Preview tab** — корректный embed и кнопка запуска
   - **Account tab** — credentials валидны (зелёная галочка)
   - **Metadata tab** — все поля манифеста заполнены

---

### Шаг 10 — Публикация в Base App

1. Откройте приложение **Base** (мобильное приложение)
2. Создайте новый пост (cast)
3. Вставьте URL вашего приложения: `https://ваш-url.vercel.app`
4. Опубликуйте — ваше Mini App теперь доступно в Base App!

Пользователи смогут нажать на карточку в ленте и открыть ваш Vibe Check прямо внутри приложения Base.

---

## Кастомизация

### Добавление своих настроений

В файле `app/components/VibeCheck.tsx` отредактируйте массив `MOODS`:

```typescript
const MOODS = [
  { id: "your_mood", emoji: "🎉", label: "Party", color: "#FF00FF", description: "Let's go!" },
  // ...
];
```

### Изменение внешнего вида

- **Цвета:** Отредактируйте CSS-переменные в `app/globals.css` (блок `:root`)
- **Шрифты:** Замените Google Fonts URL в `globals.css`
- **Манифест:** Обновите `minikit.config.ts` — название, описание, категорию, иконки

### Добавление постоянного хранилища

Для сохранения голосов между сессиями подключите:
- **Upstash Redis** (рекомендуется для Vercel) — https://upstash.com
- **Vercel KV** — встроенное хранилище Vercel

---

## Полезные ссылки

- [Base Mini Apps Docs](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [MiniKit Quickstart](https://docs.base.org/builderkits/minikit/quickstart)
- [Farcaster Frame SDK](https://miniapps.farcaster.xyz)
- [Base Build Preview](https://base.dev/preview)
- [Base Mini App Templates](https://github.com/base/demos/tree/master/mini-apps/templates)

---

## Лицензия

MIT
