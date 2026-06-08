# Codebase Summary

## Overview
**Space Tasks** — offline browser to-do app with an animated space canvas background. Built with plain HTML, CSS, and JavaScript. No backend, no build step. Data lives in `localStorage` under key `pro_tasks_v1`.

## Files
- `index.html` — app shell + embedded canvas starfield animation
- `style.css` — light/dark themes, glassy UI, responsive layout
- `app.js` — task CRUD, filters, localStorage, rendering
- `README.md` — public project description and deployment

## Core Flow
1. **index.html** defines the layout: input row (text, priority, due date), filter buttons, and `#taskContainer`.
2. **app.js** manages state:
   - `tasks` array of objects with `id`, `text`, `priority`, `due`, `done`
   - `activeFilter` controls the current view
   - `render()` redraws stats, progress bar, and active/completed lists
3. **style.css** styles the UI with gold accents, dark overlays, and mobile tweaks.

## Key Functions
- `loadTasks()` / `saveTasks()` — localStorage persistence
- `buildTaskEl(task)` — creates task DOM node with checkbox, badge, due label, edit/delete
- `addTask()`, `toggleTask()`, `deleteTask()` — basic actions
- `startEdit()` / `completeEdit()` — inline editing
- `getFiltered()` — applies Active, Completed, High Priority, Due Today filters

## External Dependency
- `@tabler/icons-webfont` CDN for checkbox/action icons.
