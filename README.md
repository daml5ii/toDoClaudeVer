<div align="center">

# 🪐 Space Tasks

### A professional to-do list set against an animated space universe

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-gold?style=for-the-badge)

<br/>

> *Priorities. Due dates. Shooting stars. All in your browser.*

<br/>

![separator](https://capsule-render.vercel.app/api?type=waving&color=f5c842&height=80&section=header&fontSize=0)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🪐 **Animated Space Background** | Live canvas with twinkling stars, shooting stars, drifting nebulae & planets |
| 🎯 **Priority Levels** | Tag tasks High, Medium, or Low with colour-coded badges |
| 📅 **Due Dates** | Automatic overdue detection — tasks flag when time runs out |
| 🔍 **Smart Filters** | Filter by All · Active · Completed · High Priority · Due Today |
| 📊 **Progress Tracking** | Live stats and progress bar to show your momentum |
| 💾 **Private & Offline** | Everything lives in `localStorage` — no account, no server, no tracking |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/space-tasks.git
cd space-tasks

# Open directly — zero install needed
open index.html

# Or serve locally
npx serve .
```

---

## 📁 Project Structure

```
space-tasks/
├── index.html      ← App shell + animated canvas background
├── style.css       ← Glassy UI on dark space theme
├── app.js          ← Task logic, filters & localStorage
└── README.md       ← You are here 👋
```

---

## 🛸 How It Works

Tasks are stored in your browser's `localStorage` under the key `pro_tasks_v1` as a JSON array:

```json
[
  {
    "id": 1718123456789,
    "text": "Launch the rocket",
    "priority": "high",
    "due": "2026-06-10",
    "done": false
  }
]
```

No backend. No database. No sign-up. It just works.

---

## 🌌 Background Animation

The space scene is rendered on an HTML5 `<canvas>` element and includes:

- **320 twinkling stars** — each with an individual twinkle speed and warm golden tint
- **Shooting stars** — spawn every ~2 seconds with glowing yellow trails
- **5 drifting nebula orbs** — slow-moving radial gradients in amber and gold
- **2 detailed planets** — a ringed Saturn-like giant and a cratered moon
- **60 floating dust particles** — warm specks drifting across the scene

All animation runs via `requestAnimationFrame` — smooth and performant.

---

## 🌍 Deploy

The app is a plain static site — deploy anywhere for free:

| Platform | Steps |
|---|---|
| **Netlify** | Drag & drop your project folder on [netlify.com](https://netlify.com) |
| **GitHub Pages** | Settings → Pages → set source to `main` branch |
| **Vercel** | Import repo on [vercel.com](https://vercel.com) — done |

---

<div align="center">

![separator](https://capsule-render.vercel.app/api?type=waving&color=f5c842&height=80&section=footer&fontSize=0)

Made with ✦ and a lot of stargazing

*Drop tasks, not rockets* 🚀

</div>