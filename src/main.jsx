import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const initialTasks = [
  { id: 1, title: 'Portföy README dosyasını hazırla', category: 'Kariyer', priority: 'Yüksek', done: false },
  { id: 2, title: 'Haftalık hedefleri gözden geçir', category: 'Kişisel', priority: 'Orta', done: true },
  { id: 3, title: 'Analiz panelini tamamla', category: 'İş', priority: 'Yüksek', done: false }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('İş');
  const [priority, setPriority] = useState('Orta');
  const [filter, setFilter] = useState('Tümü');
  const visible = useMemo(() => tasks.filter(t => filter === 'Tümü' || (filter === 'Tamamlanan' ? t.done : !t.done)), [tasks, filter]);
  const completed = tasks.filter(t => t.done).length;
  const addTask = e => { e.preventDefault(); if (!title.trim()) return; setTasks([...tasks, { id: Date.now(), title: title.trim(), category, priority, done: false }]); setTitle(''); };
  const toggle = id => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = id => setTasks(tasks.filter(t => t.id !== id));
  return <main className="app"><section className="hero"><p className="eyebrow">KİŞİSEL VERİMLİLİK</p><h1>FocusFlow</h1><p>Anlamlı işlerini planla, ilerlemeni takip et ve haftanı sakin biçimde yönet.</p><div className="stats"><b>{tasks.length}<small>Toplam görev</small></b><b>{completed}<small>Tamamlanan</small></b><b>{tasks.length - completed}<small>Devam eden</small></b></div></section><section className="panel"><form onSubmit={addTask}><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Neye odaklanman gerekiyor?"/><select value={category} onChange={e=>setCategory(e.target.value)}><option>İş</option><option>Kariyer</option><option>Kişisel</option></select><select value={priority} onChange={e=>setPriority(e.target.value)}><option>Yüksek</option><option>Orta</option><option>Düşük</option></select><button>Görev ekle</button></form><nav>{['Tümü','Açık','Tamamlanan'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</nav><div className="tasks">{visible.map(task=><article className={task.done?'done':''} key={task.id}><input type="checkbox" checked={task.done} onChange={()=>toggle(task.id)}/><div><strong>{task.title}</strong><span>{task.category} · <em>{task.priority}</em></span></div><button aria-label="Görevi sil" onClick={()=>remove(task.id)}>×</button></article>)}{visible.length===0&&<p className="empty">Bu görünümde görev yok.</p>}</div></section></main>;
}
createRoot(document.getElementById('root')).render(<App/>);
