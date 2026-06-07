// Professional To-Do List

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const prioritySelect = document.getElementById('prioritySelect');
const dueInput = document.getElementById('dueInput');
const taskContainer = document.getElementById('taskContainer');
const dateLabel = document.getElementById('dateLabel');
const progressFill = document.getElementById('progressFill');
const statTotal = document.getElementById('statTotal');
const statDone = document.getElementById('statDone');
const statDue = document.getElementById('statDue');

const STORAGE_KEY = 'pro_tasks_v1';
let tasks = [];
let activeFilter = 'all';

// ── Persistence ──────────────────────────────────────────

function loadTasks() {
    try {
        tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        tasks = [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ── Helpers ───────────────────────────────────────────────

function todayStr() {
    return new Date().toISOString().slice(0, 10);
}

function uid() {
    return Date.now() + Math.random();
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function dueLabelFor(due) {
    if (!due) return null;
    const today = todayStr();
    if (due === today) return { text: 'Today', overdue: false };
    if (due < today) return { text: 'Overdue', overdue: true };
    const d = new Date(due + 'T00:00:00');
    return { text: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), overdue: false };
}

function getFiltered() {
    return tasks.filter(t => {
        if (activeFilter === 'active') return !t.done;
        if (activeFilter === 'done') return t.done;
        if (activeFilter === 'high') return t.priority === 'high' && !t.done;
        if (activeFilter === 'today') return t.due === todayStr();
        return true;
    });
}

// ── Render ────────────────────────────────────────────────

function render() {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const dueToday = tasks.filter(t => t.due === todayStr() && !t.done).length;

    statTotal.textContent = total;
    statDone.textContent = done;
    statDue.textContent = dueToday;
    progressFill.style.width = total ? Math.round(done / total * 100) + '%' : '0%';

    const list = getFiltered();
    taskContainer.innerHTML = '';

    if (!list.length) {
        taskContainer.innerHTML = `
            <div class="empty-state">
                <i class="ti ti-checklist"></i>
                <p>Nothing here</p>
            </div>`;
        return;
    }

    const active = list.filter(t => !t.done);
    const completed = list.filter(t => t.done);

    if (active.length) {
        const label = document.createElement('div');
        label.className = 'section-label';
        label.textContent = 'Active';
        taskContainer.appendChild(label);

        const ul = document.createElement('div');
        ul.className = 'task-list';
        active.forEach(t => ul.appendChild(buildTaskEl(t)));
        taskContainer.appendChild(ul);
    }

    if (completed.length) {
        const label = document.createElement('div');
        label.className = 'section-label';
        label.textContent = 'Completed';
        taskContainer.appendChild(label);

        const ul = document.createElement('div');
        ul.className = 'task-list';
        completed.forEach(t => ul.appendChild(buildTaskEl(t)));
        taskContainer.appendChild(ul);
    }
}

function buildTaskEl(t) {
    const item = document.createElement('div');
    item.className = 'task-item' + (t.done ? ' done' : '');

    const pLabel = { high: 'High', medium: 'Medium', low: 'Low' }[t.priority];
    const pClass = { high: 'p-high', medium: 'p-medium', low: 'p-low' }[t.priority];
    const due = t.due ? dueLabelFor(t.due) : null;

    item.innerHTML = `
        <div class="task-check ${t.done ? 'checked' : ''}" role="checkbox" aria-checked="${t.done}" tabindex="0">
            <i class="ti ti-check check-icon"></i>
        </div>
        <div class="task-body">
            <div class="task-text">${escapeHtml(t.text)}</div>
            <div class="task-meta">
                <span class="priority-badge ${pClass}">${pLabel}</span>
                ${due ? `<span class="task-due ${due.overdue ? 'overdue' : ''}">
                    <i class="ti ti-calendar-event" style="font-size:11px"></i>${due.text}
                </span>` : ''}
            </div>
        </div>
        <div class="task-actions">
            <button class="edit-btn" aria-label="Edit task">
                <i class="ti ti-edit"></i>
            </button>
            <button class="delete-btn" aria-label="Delete task">
                <i class="ti ti-trash"></i>
            </button>
        </div>`;

    item.querySelector('.task-check').addEventListener('click', () => toggleTask(t.id));
    item.querySelector('.edit-btn').addEventListener('click', () => startEdit(t.id));
    item.querySelector('.delete-btn').addEventListener('click', () => deleteTask(t.id));

    return item;
}

// ── Actions ───────────────────────────────────────────────

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.unshift({
        id: uid(),
        text,
        priority: prioritySelect.value,
        due: dueInput.value,
        done: false
    });
    taskInput.value = '';
    saveTasks();
    render();
    taskInput.focus();
}

function toggleTask(id) {
    const t = tasks.find(t => t.id === id);
    if (t) { t.done = !t.done; saveTasks(); render(); }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
}

function startEdit(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    taskInput.value = task.text;
    prioritySelect.value = task.priority;
    dueInput.value = task.due || '';

    addBtn.textContent = 'Save';
    addBtn.innerHTML = '<i class="ti ti-device-floppy"></i> Save';
    addBtn.dataset.editId = String(id);

    taskInput.focus();
}

function completeEdit() {
    const id = addBtn.dataset.editId;

    if (!id) {
        addTask();
        return;
    }

    const text = taskInput.value.trim();
    if (!text) return;

    const task = tasks.find(t => t.id === Number(id));
    if (task) {
        task.text = text;
        task.priority = prioritySelect.value;
        task.due = dueInput.value;
        saveTasks();
    }

    cancelEdit();
    render();
}

function cancelEdit() {
    taskInput.value = '';
    dueInput.value = '';
    prioritySelect.value = 'medium';

    addBtn.innerHTML = '<i class="ti ti-plus"></i> Add';
    delete addBtn.dataset.editId;
}

// ── Events ────────────────────────────────────────────────

addBtn.addEventListener('click', () => {
    if (addBtn.dataset.editId) {
        completeEdit();
    } else {
        addTask();
    }
});
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (addBtn.dataset.editId) {
            completeEdit();
        } else {
            addTask();
        }
    }
    if (e.key === 'Escape' && addBtn.dataset.editId) {
        cancelEdit();
        render();
    }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        render();
    });
});

// ── Init ──────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
    const d = new Date();
    dateLabel.textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    loadTasks();
    render();
});

