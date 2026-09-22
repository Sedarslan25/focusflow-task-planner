import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const initialTasks = [
  { id: 1, title: 'Prepare portfolio README', category: 'Career', priority: 'High', done: false },
  { id: 2, title: 'Review weekly goals', category: 'Personal', priority: 'Medium', done: true },
  { id: 3, title: 'Ship analytics dashboard', category: 'Work', priority: 'High', done: false }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const visible = useMemo(() => tasks.filter(t => filter === 'All' || (filter === 'Done' ? t.done : !t.done)), [tasks, filter]);
  const completed = tasks.filter(t => t.done).length;
  const addTask = e => { e.preventDefault(); if (!title.trim()) return; setTasks([...tasks, { id: Date.now(), title: title.trim(), category, priority, done: false }]); setTitle(''); };
  const toggle = id => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = id => setTasks(tasks.filter(t => t.id !== id));
  return <main className="app"><section className="hero"><p className="eyebrow">PERSONAL PRODUCTIVITY</p><h1>FocusFlow</h1><p>Plan meaningful work, track progress, and keep your week calm.</p><div className="stats"><b>{tasks.length}<small>Total tasks</small></b><b>{completed}<small>Completed</small></b><b>{tasks.length - completed}<small>In progress</small></b></div></section><section className="panel"><form onSubmit={addTask}><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="What needs your focus?"/><select value={category} onChange={e=>setCategory(e.target.value)}><option>Work</option><option>Career</option><option>Personal</option></select><select value={priority} onChange={e=>setPriority(e.target.value)}><option>High</option><option>Medium</option><option>Low</option></select><button>Add task</button></form><nav>{['All','Open','Done'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</nav><div className="tasks">{visible.map(task=><article className={task.done?'done':''} key={task.id}><input type="checkbox" checked={task.done} onChange={()=>toggle(task.id)}/><div><strong>{task.title}</strong><span>{task.category} · <em>{task.priority}</em></span></div><button aria-label="Remove task" onClick={()=>remove(task.id)}>×</button></article>)}{visible.length===0&&<p className="empty">No tasks in this view.</p>}</div></section></main>;
}
createRoot(document.getElementById('root')).render(<App/>);
