'use strict';
/* =========================================================
   TALavagna - logica della dashboard
   ========================================================= */

// ---------- Palette 16 colori ----------
const COLORS = [
  { name: 'Ottanio', hex: '#0E7C86' },
  { name: 'Turchese', hex: '#14B8A6' },
  { name: 'Azzurro', hex: '#0EA5E9' },
  { name: 'Blu', hex: '#2563EB' },
  { name: 'Indaco', hex: '#4F46E5' },
  { name: 'Viola', hex: '#7C3AED' },
  { name: 'Magenta', hex: '#C026D3' },
  { name: 'Rosa', hex: '#DB2777' },
  { name: 'Rosso', hex: '#DC2626' },
  { name: 'Bordeaux', hex: '#7A1F35' },
  { name: 'Arancio', hex: '#EA580C' },
  { name: 'Ocra', hex: '#C8962E' },
  { name: 'Giallo', hex: '#EAB308' },
  { name: 'Lime', hex: '#65A30D' },
  { name: 'Verde', hex: '#16A34A' },
  { name: 'Grafite', hex: '#475569' }
];

// ---------- Icone ----------
const ICONS = {
  mail: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.3V17h16V7.3l-8 4.9zM4.6 7l7.4 4.5L19.4 7H4.6z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2zm12 8H5v9h14v-9zM7 12h3v3H7v-3z"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.6.7.7-2.5-.2-.3A8 8 0 0 1 12 4zm-3.2 4c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4l-.5-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5z"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6C8.9 5.5 8.4 6.7 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.2 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 0 1-4.4 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z"/></svg>',
  cam: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M4 6h11a2 2 0 0 1 2 2v1.5l4-2.5v10l-4-2.5V16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v8h11V8H4z"/></svg>',
  idea: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2a7 7 0 0 1 4 12.7V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.3A7 7 0 0 1 12 2zm0 2a5 5 0 0 0-2.9 9.1l.9.6V16h4v-2.3l.9-.6A5 5 0 0 0 12 4zM9 20h6v2H9v-2z"/></svg>',
  reload: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a8 8 0 0 1 7.4 5H17v2h6V5h-2v2.3A10 10 0 1 0 22 13h-2a8 8 0 1 1-8-9z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.4 7.4 0 0 0 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" transform="translate(-1 0)"/></svg>',
  min: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 17h14v2.5H5z"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 4.6 12 10.2l5.6-5.6 1.8 1.8-5.6 5.6 5.6 5.6-1.8 1.8-5.6-5.6-5.6 5.6-1.8-1.8 5.6-5.6-5.6-5.6z"/></svg>'
};

// ---------- User agent ----------
const CHROME_UA = navigator.userAgent.replace(/\s(Electron|talavagna|TALavagna)\/\S+/gi, '');
const FIREFOX_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0';

// ---------- Archiviazione ----------
const LS_LAYOUT = 'talavagna.layout.v1';
const LS_SETTINGS = 'talavagna.settings.v1';
const LS_IDEAS = 'talavagna.ideas.v1';
const LS_SEEN = 'talavagna.welcome.v1';

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (_) { return fallback; }
}
function store(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* spazio pieno */ }
}

const settings = Object.assign({
  msAccount: 'personal',      // personal = outlook.live.com · work = outlook.office.com
  refreshMin: 10,
  inactiveOpacity: 0.8,
  snap: 16,
  gap: 6
}, load(LS_SETTINGS, {}));

const msBase = () => settings.msAccount === 'work' ? 'https://outlook.office.com' : 'https://outlook.live.com';

// ---------- Tipi di finestra ----------
const TYPES = {
  outlookMail: { title: 'Outlook Mail', icon: 'mail', color: '#2563EB', web: true, partition: 'persist:microsoft', url: () => msBase() + '/mail/', autoRefresh: true, single: true },
  outlookCal:  { title: 'Calendario Outlook', icon: 'calendar', color: '#4F46E5', web: true, partition: 'persist:microsoft', url: () => msBase() + '/calendar/', single: true },
  gmail:       { title: 'Gmail', icon: 'mail', color: '#DC2626', web: true, partition: 'persist:google', url: () => 'https://mail.google.com/mail/u/0/#inbox', autoRefresh: true, single: true },
  gcal:        { title: 'Google Calendar', icon: 'calendar', color: '#0EA5E9', web: true, partition: 'persist:google', url: () => 'https://calendar.google.com/calendar/u/0/r', single: true },
  whatsapp:    { title: 'WhatsApp', icon: 'chat', color: '#16A34A', web: true, partition: 'persist:whatsapp', url: () => 'https://web.whatsapp.com/', single: true },
  ideas:       { title: 'Blocco idee', icon: 'idea', color: '#C8962E', single: true },
  site:        { title: 'Sito', icon: 'globe', color: '#7C3AED', web: true, partition: 'persist:sites', single: false, max: 5 },
  webcam:      { title: 'Webcam', icon: 'cam', color: '#475569', single: false, max: 4 }
};
const SINGLE_ORDER = ['outlookMail', 'outlookCal', 'gmail', 'gcal', 'whatsapp', 'ideas'];

// ---------- Stato ----------
const desk = document.getElementById('desk');
const dockMin = document.getElementById('dock-min');
let panels = load(LS_LAYOUT, null);
const live = new Map();          // id -> { root, body, wv, timer, stream }
let activeId = null;
let zTop = 10;

const uid = () => Math.random().toString(36).slice(2, 9);
const deskSize = () => ({ w: desk.clientWidth, h: desk.clientHeight });

let saveT = null;
function save() {
  clearTimeout(saveT);
  saveT = setTimeout(() => store(LS_LAYOUT, panels), 250);
}

function newPanel(type, extra = {}) {
  const t = TYPES[type];
  const D = deskSize();
  const w = Math.min(560, D.w - 40), h = Math.min(420, D.h - 40);
  const n = (panels || []).filter(p => p.state !== "closed").length;
  return Object.assign({
    id: uid(),
    type,
    title: t.title,
    color: t.color,
    x: 40 + (n % 8) * 30,
    y: 30 + (n % 8) * 26,
    w, h,
    z: ++zTop,
    state: 'open',
    zoom: 1,
    compat: false,
    autoRefresh: !!t.autoRefresh
  }, extra);
}

function defaultLayout() {
  const D = deskSize();
  const g = 12, cols = 3, rows = 2;
  const cw = Math.floor((D.w - g * (cols + 1)) / cols);
  const ch = Math.floor((D.h - g * (rows + 1)) / rows);
  const order = ['outlookMail', 'gmail', 'whatsapp', 'outlookCal', 'gcal', 'ideas'];
  const list = order.map((type, i) => newPanel(type, {
    x: g + (i % cols) * (cw + g),
    y: g + Math.floor(i / cols) * (ch + g),
    w: cw, h: ch
  }));
  const siteColors = ['#7C3AED', '#C026D3', '#14B8A6'];
  for (let i = 0; i < 3; i++) list.push(newPanel('site', { title: `Sito ${i + 1}`, color: siteColors[i], url: '', state: 'min' }));
  list.push(newPanel('webcam', { state: 'min', cam: { mode: 'local' } }));
  return list;
}

/* =========================================================
   Costruzione finestre
   ========================================================= */
function btn(cls, icon, title) {
  const b = document.createElement('button');
  b.className = 'ph-btn ' + cls;
  b.title = title;
  b.innerHTML = ICONS[icon];
  return b;
}

function createPanel(p) {
  const t = TYPES[p.type];
  const root = document.createElement('div');
  root.className = 'panel';
  root.dataset.id = p.id;

  const head = document.createElement('div');
  head.className = 'ph';
  const color = document.createElement('button');
  color.className = 'ph-color';
  color.title = 'Cambia colore';
  const icon = document.createElement('span');
  icon.className = 'ph-icon';
  icon.innerHTML = ICONS[t.icon];
  const title = document.createElement('span');
  title.className = 'ph-title';
  const badge = document.createElement('span');
  badge.className = 'ph-badge hidden';
  const actions = document.createElement('div');
  actions.className = 'ph-actions';

  const bReload = btn('reload', 'reload', 'Aggiorna');
  const bGear = btn('gear', 'gear', 'Impostazioni finestra');
  const bMin = btn('min', 'min', 'Iconizza');
  const bClose = btn('close', 'close', 'Chiudi');
  if (t.web || p.type === 'webcam') actions.append(bReload);
  actions.append(bGear, bMin, bClose);
  head.append(color, icon, title, badge, actions);

  const body = document.createElement('div');
  body.className = 'pb';

  root.append(head, body);
  ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].forEach(d => {
    const h = document.createElement('div');
    h.className = 'rz ' + d;
    h.dataset.dir = d;
    root.append(h);
  });
  desk.append(root);

  const L = { root, body, title, badge, wv: null, timer: null, stream: null };
  live.set(p.id, L);

  // eventi
  root.addEventListener('pointerdown', () => activate(p.id), true);
  root.addEventListener('focusin', () => activate(p.id));
  color.addEventListener('click', (e) => { e.stopPropagation(); openPalette(p, color); });
  bReload.addEventListener('click', () => reloadPanel(p));
  bGear.addEventListener('click', () => openPanelSettings(p));
  bMin.addEventListener('click', () => minimize(p));
  bClose.addEventListener('click', () => closePanel(p));
  head.addEventListener('dblclick', (e) => { if (!e.target.closest('button')) toggleMax(p); });
  setupDrag(p, head);
  root.querySelectorAll('.rz').forEach(h => setupResize(p, h));

  applyGeometry(p);
  applyLook(p);
  buildBody(p);
  return L;
}

function applyGeometry(p) {
  const L = live.get(p.id);
  if (!L) return;
  const s = L.root.style;
  s.left = p.x + 'px';
  s.top = p.y + 'px';
  s.width = p.w + 'px';
  s.height = p.h + 'px';
  s.zIndex = p.z;
}

function applyLook(p) {
  const L = live.get(p.id);
  if (!L) return;
  L.root.style.setProperty('--c', p.color);
  L.title.textContent = p.title;
  L.root.classList.toggle('min', p.state === 'min');
  L.root.classList.toggle('active', p.id === activeId);
}

/* ---------- Contenuto ---------- */
function buildBody(p) {
  const L = live.get(p.id);
  const t = TYPES[p.type];
  stopMedia(L);
  clearInterval(L.timer);
  L.body.innerHTML = '';
  L.body.classList.remove('dark');
  L.wv = null;
  L.badge.classList.add('hidden');

  if (p.type === 'ideas') return buildIdeas(p, L);
  if (p.type === 'webcam') return buildWebcam(p, L);
  if (p.type === 'site' && !p.url) return buildSitePrompt(p, L);
  if (t.web) {
    const url = p.type === 'site' ? p.url : t.url();
    L.wv = makeWebview(p, url, t.partition);
    L.body.append(L.wv, makeErrorOverlay(p, L, url));
    if (t.autoRefresh) startAutoRefresh(p, L);
  }
}

function makeWebview(p, url, partition) {
  const wv = document.createElement('webview');
  wv.setAttribute('partition', partition);
  wv.setAttribute('allowpopups', '');
  wv.setAttribute('useragent', p.compat ? FIREFOX_UA : CHROME_UA);
  wv.setAttribute('src', url);
  wv.addEventListener('dom-ready', () => {
    try { wv.setZoomFactor(p.zoom || 1); } catch (_) { /* non pronto */ }
  });
  wv.addEventListener('page-title-updated', (e) => updateBadge(p, e.title));
  wv.addEventListener('focus', () => activate(p.id));
  wv.addEventListener('did-fail-load', (e) => {
    if (!e.isMainFrame || e.errorCode === -3) return;   // -3 = navigazione annullata, normale
    const L = live.get(p.id);
    const ov = L && L.body.querySelector('.error-overlay');
    if (ov) { ov.querySelector('p').textContent = `Errore ${e.errorCode}: ${e.errorDescription || 'pagina non raggiungibile'}`; ov.classList.add('show'); }
  });
  wv.addEventListener('did-start-loading', () => {
    const L = live.get(p.id);
    const ov = L && L.body.querySelector('.error-overlay');
    if (ov) ov.classList.remove('show');
  });
  return wv;
}

function makeErrorOverlay(p, L, url) {
  const ov = document.createElement('div');
  ov.className = 'error-overlay';
  ov.innerHTML = `<div class="placeholder"><h3>Pagina non caricata</h3><p></p>
    <div class="row" style="justify-content:center"><button class="btn retry">Riprova</button><button class="btn ghost ext">Apri nel browser</button></div></div>`;
  ov.querySelector('.retry').addEventListener('click', () => { ov.classList.remove('show'); L.wv && L.wv.reload(); });
  ov.querySelector('.ext').addEventListener('click', () => window.tal && window.tal.openExternal(url));
  return ov;
}

function updateBadge(p, title) {
  const L = live.get(p.id);
  if (!L) return;
  const m = /\((\d+)\)/.exec(title || '');
  const n = m ? parseInt(m[1], 10) : 0;
  L.badge.textContent = n > 99 ? '99+' : String(n);
  L.badge.classList.toggle('hidden', !n);
  p.unread = n;
  renderDock();
}

function startAutoRefresh(p, L) {
  clearInterval(L.timer);
  if (!p.autoRefresh) return;
  const ms = Math.max(1, Number(settings.refreshMin) || 10) * 60000;
  L.timer = setInterval(() => {
    // non ricarica mentre stai lavorando in questa finestra (es. una mail a metà)
    if (activeId === p.id && document.hasFocus()) return;
    try { L.wv && L.wv.reload(); } catch (_) { /* ignorato */ }
  }, ms);
}

function reloadPanel(p) {
  const L = live.get(p.id);
  if (!L) return;
  if (L.wv) { try { L.wv.reload(); } catch (_) { buildBody(p); } }
  else buildBody(p);
}

function normalizeUrl(u) {
  u = (u || '').trim();
  if (!u) return '';
  if (!/^[a-z]+:\/\//i.test(u)) u = 'https://' + u;
  return u;
}

function buildSitePrompt(p, L) {
  const box = document.createElement('div');
  box.className = 'placeholder';
  box.innerHTML = `<h3>Quale sito vuoi in questa finestra?</h3>
    <p>Scrivi l'indirizzo. Potrai cambiarlo quando vuoi dall'ingranaggio.</p>
    <div class="row"><input type="text" placeholder="es. www.ansa.it"><button class="btn">Apri</button></div>`;
  const inp = box.querySelector('input');
  const go = () => {
    const u = normalizeUrl(inp.value);
    if (!u) return inp.focus();
    p.url = u;
    try { if (p.title.startsWith('Sito')) p.title = new URL(u).hostname.replace(/^www\./, ''); } catch (_) { /* ok */ }
    applyLook(p); buildBody(p); save();
  };
  box.querySelector('button').addEventListener('click', go);
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  L.body.append(box);
}

/* ---------- Webcam ---------- */
function stopMedia(L) {
  if (L && L.stream) { L.stream.getTracks().forEach(tr => tr.stop()); L.stream = null; }
}

function buildWebcam(p, L) {
  const cam = p.cam || { mode: 'local' };
  L.body.classList.add('dark');
  if (cam.mode === 'local') {
    const v = document.createElement('video');
    v.autoplay = true; v.muted = true; v.playsInline = true;
    L.body.append(v);
    const constraints = { video: cam.deviceId ? { deviceId: { exact: cam.deviceId } } : true, audio: false };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => { L.stream = stream; v.srcObject = stream; })
      .catch(err => { L.body.innerHTML = ''; L.body.append(camMessage(p, 'Webcam non disponibile', `${err.name}: controlla che la webcam sia collegata e non usata da un'altra app.`)); });
    return;
  }
  // telecamera IP
  if (!cam.url) { L.body.append(camMessage(p, 'Telecamera IP', "Inserisci l'indirizzo della telecamera dalle impostazioni.")); return; }
  if (cam.ipType === 'web') {
    L.wv = makeWebview(p, cam.url, 'persist:sites');
    L.body.append(L.wv, makeErrorOverlay(p, L, cam.url));
    return;
  }
  const img = document.createElement('img');
  img.className = 'cam-img';
  img.alt = '';
  img.onerror = () => { L.body.innerHTML = ''; L.body.append(camMessage(p, 'Nessun segnale', "La telecamera non risponde. Verifica l'indirizzo, la rete e il tipo di flusso (MJPEG o istantanea).")); };
  if (cam.ipType === 'snapshot') {
    const sep = cam.url.includes('?') ? '&' : '?';
    const tick = () => { img.src = cam.url + sep + '_t=' + Date.now(); };
    tick();
    L.timer = setInterval(tick, Math.max(1, Number(cam.interval) || 2) * 1000);
  } else {
    img.src = cam.url;   // MJPEG: flusso continuo
  }
  L.body.append(img);
}

function camMessage(p, h, msg) {
  const box = document.createElement('div');
  box.className = 'placeholder';
  box.innerHTML = `<h3></h3><p></p><button class="btn">Impostazioni webcam</button>`;
  box.querySelector('h3').textContent = h;
  box.querySelector('p').textContent = msg;
  box.querySelector('button').addEventListener('click', () => openPanelSettings(p));
  return box;
}

/* ---------- Blocco idee ---------- */
let ideas = load(LS_IDEAS, []);
const saveIdeas = () => store(LS_IDEAS, ideas);
const ideaRenderers = new Set();

function buildIdeas(p, L) {
  const wrap = document.createElement('div');
  wrap.className = 'ideas';
  wrap.innerHTML = `<div class="ideas-bar"><input type="text" placeholder="Cerca tra le idee…"><button class="btn">+ Nuova idea</button></div><div class="ideas-list"></div>`;
  const search = wrap.querySelector('input');
  const list = wrap.querySelector('.ideas-list');

  const render = (focusId) => {
    const q = search.value.trim().toLowerCase();
    const items = ideas
      .filter(i => !q || i.text.toLowerCase().includes(q))
      .sort((a, b) => (b.pinned - a.pinned) || (b.updated - a.updated));
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = `<div class="ideas-empty">${q ? 'Nessuna idea trovata.' : 'Nessuna idea ancora. Premi “+ Nuova idea”.'}</div>`;
      return;
    }
    items.forEach(i => {
      const card = document.createElement('div');
      card.className = 'idea' + (i.pinned ? ' pinned' : '');
      card.innerHTML = `<textarea placeholder="Scrivi qui la tua idea…"></textarea>
        <div class="idea-foot"><span></span><button class="pin" title="Fissa in alto">★</button><button class="del" title="Elimina">🗑</button></div>`;
      const ta = card.querySelector('textarea');
      ta.value = i.text;
      card.querySelector('span').textContent = new Date(i.updated).toLocaleString('it-IT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
      const pin = card.querySelector('.pin');
      pin.classList.toggle('on', !!i.pinned);
      ta.addEventListener('input', () => { i.text = ta.value; i.updated = Date.now(); saveIdeas(); });
      ta.addEventListener('blur', () => { if (!i.text.trim()) { ideas = ideas.filter(x => x !== i); saveIdeas(); refreshIdeas(); } });
      pin.addEventListener('click', () => { i.pinned = !i.pinned; saveIdeas(); refreshIdeas(); });
      card.querySelector('.del').addEventListener('click', () => {
        if (i.text.trim() && !confirm('Eliminare questa idea?')) return;
        ideas = ideas.filter(x => x !== i); saveIdeas(); refreshIdeas();
      });
      list.append(card);
      if (i.id === focusId) setTimeout(() => ta.focus(), 0);
    });
  };

  wrap.querySelector('button').addEventListener('click', () => {
    const i = { id: uid(), text: '', created: Date.now(), updated: Date.now(), pinned: false };
    ideas.push(i);
    search.value = '';
    render(i.id);
  });
  search.addEventListener('input', () => render());
  L.body.append(wrap);
  ideaRenderers.add(render);
  L.ideasRender = render;
  render();
}
function refreshIdeas() { ideaRenderers.forEach(r => r()); }

/* =========================================================
   Attivazione, iconizza, chiudi
   ========================================================= */
function activate(id) {
  if (activeId === id) return;
  activeId = id;
  const p = panels.find(x => x.id === id);
  if (p && p.z < zTop) { p.z = ++zTop; applyGeometry(p); save(); }
  panels.forEach(x => { const L = live.get(x.id); if (L) L.root.classList.toggle('active', x.id === id); });
}

function deactivateAll() {
  activeId = null;
  live.forEach(L => L.root.classList.remove('active'));
}

// Quando il fuoco passa dentro una webview la finestra principale perde il "blur":
// controlliamo chi ha il fuoco per attivare la finestra giusta.
window.addEventListener('blur', () => {
  setTimeout(() => {
    const el = document.activeElement;
    const panel = el && el.closest && el.closest('.panel');
    if (panel) activate(panel.dataset.id);
  }, 0);
});

desk.addEventListener('pointerdown', (e) => { if (e.target === desk) deactivateAll(); });

function minimize(p) {
  p.state = 'min';
  if (activeId === p.id) activeId = null;
  applyLook(p); renderDock(); save();
}

function restore(p) {
  if (p.state === 'closed') { p.state = 'open'; clampPanel(p); createPanel(p); }
  p.state = 'open';
  p.z = ++zTop;
  applyGeometry(p); applyLook(p);
  activeId = null; activate(p.id);
  renderDock(); save();
}

function closePanel(p) {
  const t = TYPES[p.type];
  const L = live.get(p.id);
  if (L) { stopMedia(L); clearInterval(L.timer); L.root.remove(); live.delete(p.id); }
  if (activeId === p.id) activeId = null;
  if (t.single) p.state = 'closed';                 // ricorda posizione e colore per quando la riapri
  else panels = panels.filter(x => x !== p);        // siti e webcam extra vengono cancellati
  renderDock(); save();
}

function toggleMax(p) {
  const D = deskSize(), g = settings.gap;
  if (p.prev) { Object.assign(p, p.prev); p.prev = null; }
  else { p.prev = { x: p.x, y: p.y, w: p.w, h: p.h }; Object.assign(p, { x: g, y: g, w: D.w - 2 * g, h: D.h - 2 * g }); }
  applyGeometry(p); save();
}

/* =========================================================
   Trascinamento + calamita
   ========================================================= */
let guides = [];
function clearGuides() { guides.forEach(g => g.remove()); guides = []; }
function showGuide(kind, pos, from, to) {
  const g = document.createElement('div');
  g.className = 'guide ' + kind;
  if (kind === 'v') { g.style.left = (pos - 1) + 'px'; g.style.top = from + 'px'; g.style.height = Math.max(0, to - from) + 'px'; }
  else { g.style.top = (pos - 1) + 'px'; g.style.left = from + 'px'; g.style.width = Math.max(0, to - from) + 'px'; }
  desk.append(g); guides.push(g);
}

const others = (p) => panels.filter(o => o !== p && o.state === 'open');

// Calcola i punti di aggancio per una finestra in movimento.
function snapMove(p, x, y) {
  const S = settings.snap, g = settings.gap, D = deskSize();
  const w = p.w, h = p.h;
  let best = { x, y, dx: S + 1, dy: S + 1, gx: null, gy: null };

  const tryX = (cand, guide) => { const d = Math.abs(cand - x); if (d < best.dx) { best.dx = d; best.x = cand; best.gx = guide; } };
  const tryY = (cand, guide) => { const d = Math.abs(cand - y); if (d < best.dy) { best.dy = d; best.y = cand; best.gy = guide; } };

  // bordi dell'area di lavoro
  tryX(g, null); tryX(D.w - w - g, null);
  tryY(g, null); tryY(D.h - h - g, null);

  for (const o of others(p)) {
    const vNear = y < o.y + o.h + S + g && y + h > o.y - S - g;
    const hNear = x < o.x + o.w + S + g && x + w > o.x - S - g;
    if (vNear) {
      tryX(o.x + o.w + g, { pos: o.x + o.w + g / 2, o });  // mio sinistro al suo destro
      tryX(o.x - w - g, { pos: o.x - g / 2, o });          // mio destro al suo sinistro
      tryX(o.x, { pos: o.x, o });                          // allinea a sinistra
      tryX(o.x + o.w - w, { pos: o.x + o.w, o });          // allinea a destra
    }
    if (hNear) {
      tryY(o.y + o.h + g, { pos: o.y + o.h + g / 2, o });
      tryY(o.y - h - g, { pos: o.y - g / 2, o });
      tryY(o.y, { pos: o.y, o });
      tryY(o.y + o.h - h, { pos: o.y + o.h, o });
    }
  }
  const out = { x: best.dx <= S ? best.x : x, y: best.dy <= S ? best.y : y };
  clearGuides();
  if (best.dx <= S && best.gx) { const o = best.gx.o; showGuide('v', best.gx.pos, Math.min(o.y, out.y), Math.max(o.y + o.h, out.y + h)); }
  if (best.dy <= S && best.gy) { const o = best.gy.o; showGuide('h', best.gy.pos, Math.min(o.x, out.x), Math.max(o.x + o.w, out.x + w)); }
  return out;
}

// Aggancio di un singolo bordo durante il ridimensionamento.
function snapEdge(p, axis, value, isStart) {
  const S = settings.snap, g = settings.gap, D = deskSize();
  const cands = axis === 'x'
    ? [isStart ? g : D.w - g]
    : [isStart ? g : D.h - g];
  for (const o of others(p)) {
    if (axis === 'x') {
      const vNear = p.y < o.y + o.h + S && p.y + p.h > o.y - S;
      if (!vNear) continue;
      cands.push(o.x, o.x + o.w, isStart ? o.x + o.w + g : o.x - g);
    } else {
      const hNear = p.x < o.x + o.w + S && p.x + p.w > o.x - S;
      if (!hNear) continue;
      cands.push(o.y, o.y + o.h, isStart ? o.y + o.h + g : o.y - g);
    }
  }
  let bestV = value, bestD = S + 1;
  for (const c of cands) { const d = Math.abs(c - value); if (d < bestD) { bestD = d; bestV = c; } }
  return bestD <= S ? bestV : value;
}

function setupDrag(p, head) {
  head.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('button')) return;
    e.preventDefault();
    activate(p.id);
    const sx = e.clientX, sy = e.clientY, ox = p.x, oy = p.y;
    head.setPointerCapture(e.pointerId);
    document.body.classList.add('dragging');
    document.body.style.cursor = 'grabbing';
    p.prev = null;
    const move = (ev) => {
      const D = deskSize();
      let nx = ox + ev.clientX - sx, ny = oy + ev.clientY - sy;
      ({ x: nx, y: ny } = snapMove(p, nx, ny));
      p.x = Math.round(Math.min(Math.max(nx, -p.w + 120), D.w - 120));
      p.y = Math.round(Math.min(Math.max(ny, 0), D.h - 38));
      applyGeometry(p);
    };
    const up = () => {
      head.removeEventListener('pointermove', move);
      head.removeEventListener('pointerup', up);
      head.removeEventListener('pointercancel', up);
      document.body.classList.remove('dragging');
      document.body.style.cursor = '';
      clearGuides();
      save();
    };
    head.addEventListener('pointermove', move);
    head.addEventListener('pointerup', up);
    head.addEventListener('pointercancel', up);
  });
}

const MIN_W = 260, MIN_H = 160;
function setupResize(p, handle) {
  const dir = handle.dataset.dir;
  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    activate(p.id);
    const sx = e.clientX, sy = e.clientY;
    const o = { x: p.x, y: p.y, w: p.w, h: p.h };
    handle.setPointerCapture(e.pointerId);
    document.body.classList.add('dragging');
    document.body.style.cursor = getComputedStyle(handle).cursor;
    p.prev = null;
    const move = (ev) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      let left = o.x, top = o.y, right = o.x + o.w, bottom = o.y + o.h;
      if (dir.includes('e')) right = snapEdge(p, 'x', o.x + o.w + dx, false);
      if (dir.includes('w')) left = snapEdge(p, 'x', o.x + dx, true);
      if (dir.includes('s')) bottom = snapEdge(p, 'y', o.y + o.h + dy, false);
      if (dir.includes('n')) top = snapEdge(p, 'y', o.y + dy, true);
      if (right - left < MIN_W) { if (dir.includes('w')) left = right - MIN_W; else right = left + MIN_W; }
      if (bottom - top < MIN_H) { if (dir.includes('n')) top = bottom - MIN_H; else bottom = top + MIN_H; }
      top = Math.max(0, top);
      Object.assign(p, { x: Math.round(left), y: Math.round(top), w: Math.round(right - left), h: Math.round(bottom - top) });
      applyGeometry(p);
    };
    const up = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
      handle.removeEventListener('pointercancel', up);
      document.body.classList.remove('dragging');
      document.body.style.cursor = '';
      save();
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  });
}

function clampPanel(p) {
  const D = deskSize();
  p.w = Math.max(MIN_W, Math.min(p.w, D.w));
  p.h = Math.max(MIN_H, Math.min(p.h, D.h));
  p.x = Math.min(Math.max(p.x, -p.w + 120), D.w - 120);
  p.y = Math.min(Math.max(p.y, 0), D.h - 38);
}

window.addEventListener('resize', () => {
  panels.forEach(p => { if (p.state !== 'closed') { clampPanel(p); applyGeometry(p); } });
  save();
});

function tidy() {
  const open = panels.filter(p => p.state === 'open').sort((a, b) => a.y - b.y || a.x - b.x);
  if (!open.length) return;
  const D = deskSize(), g = 12, n = open.length;
  let cols = Math.ceil(Math.sqrt(n * (D.w / D.h) / 1.3));
  cols = Math.max(1, Math.min(cols, n));
  const rows = Math.ceil(n / cols);
  const cw = Math.floor((D.w - g * (cols + 1)) / cols);
  const ch = Math.floor((D.h - g * (rows + 1)) / rows);
  open.forEach((p, i) => {
    Object.assign(p, { x: g + (i % cols) * (cw + g), y: g + Math.floor(i / cols) * (ch + g), w: cw, h: ch, prev: null });
    applyGeometry(p);
  });
  save();
}

/* =========================================================
   Dock, menu, palette
   ========================================================= */
function renderDock() {
  dockMin.innerHTML = '';
  panels.filter(p => p.state === 'min').forEach(p => {
    const c = document.createElement('button');
    c.className = 'chip';
    c.style.setProperty('--c', p.color);
    c.title = 'Riapri ' + p.title;
    c.innerHTML = ICONS[TYPES[p.type].icon];
    const s = document.createElement('span');
    s.textContent = p.title + (p.unread ? ` (${p.unread})` : '');
    c.append(s);
    c.addEventListener('click', () => restore(p));
    dockMin.append(c);
  });
}

const menuAdd = document.getElementById('menu-add');
const palette = document.getElementById('palette');

function hidePopovers() { menuAdd.classList.add('hidden'); palette.classList.add('hidden'); }
document.addEventListener('pointerdown', (e) => {
  if (!e.target.closest('.popover') && !e.target.closest('#btn-add') && !e.target.closest('.ph-color')) hidePopovers();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { hidePopovers(); closeModal(); } });

function placePopover(el, anchor, above) {
  el.classList.remove('hidden');
  const r = anchor.getBoundingClientRect();
  const pw = el.offsetWidth, ph = el.offsetHeight;
  let left = Math.min(Math.max(8, r.left), window.innerWidth - pw - 8);
  let top = above ? r.top - ph - 8 : r.bottom + 8;
  if (top + ph > window.innerHeight - 8) top = r.top - ph - 8;
  el.style.left = left + 'px';
  el.style.top = Math.max(8, top) + 'px';
}

function menuItem(label, color, onClick, hint, disabled) {
  const b = document.createElement('button');
  b.className = 'menu-item';
  b.innerHTML = `<span class="dot" style="background:${color};color:${color}"></span><span></span>${hint ? `<small>${hint}</small>` : ''}`;
  b.children[1].textContent = label;
  b.disabled = !!disabled;
  b.addEventListener('click', () => { hidePopovers(); onClick(); });
  return b;
}

document.getElementById('btn-add').addEventListener('click', (e) => {
  if (!menuAdd.classList.contains('hidden')) return hidePopovers();
  menuAdd.innerHTML = '';
  const t1 = document.createElement('div'); t1.className = 'menu-title'; t1.textContent = 'Finestre';
  menuAdd.append(t1);
  SINGLE_ORDER.forEach(type => {
    const p = panels.find(x => x.type === type);
    const state = p ? p.state : 'closed';
    const hint = state === 'open' ? 'aperta' : state === 'min' ? 'iconizzata' : '';
    menuAdd.append(menuItem(p ? p.title : TYPES[type].title, p ? p.color : TYPES[type].color, () => {
      if (!p) { const np = newPanel(type); panels.push(np); createPanel(np); activate(np.id); renderDock(); save(); }
      else restore(p);
    }, hint));
  });
  const t2 = document.createElement('div'); t2.className = 'menu-title'; t2.textContent = 'Aggiungi';
  menuAdd.append(t2);
  const nSites = panels.filter(p => p.type === 'site').length;
  const nCams = panels.filter(p => p.type === 'webcam').length;
  menuAdd.append(menuItem('Nuovo sito', TYPES.site.color, () => {
    const np = newPanel('site', { title: `Sito ${nSites + 1}`, url: '' }); panels.push(np); createPanel(np); activate(np.id); save();
  }, `${nSites}/5`, nSites >= 5));
  menuAdd.append(menuItem('Nuova webcam', TYPES.webcam.color, () => {
    const np = newPanel('webcam', { cam: { mode: 'local' } }); panels.push(np); createPanel(np); activate(np.id); save();
  }, `${nCams}/4`, nCams >= 4));
  placePopover(menuAdd, e.currentTarget, true);
});

function openPalette(p, anchor) {
  palette.innerHTML = '';
  COLORS.forEach(c => {
    const s = document.createElement('button');
    s.className = 'swatch' + (c.hex.toLowerCase() === p.color.toLowerCase() ? ' sel' : '');
    s.style.background = `linear-gradient(180deg, color-mix(in srgb, ${c.hex} 70%, white 30%), ${c.hex} 55%, color-mix(in srgb, ${c.hex} 65%, black 35%))`;
    s.title = c.name;
    s.addEventListener('click', () => { p.color = c.hex; applyLook(p); renderDock(); save(); hidePopovers(); });
    palette.append(s);
  });
  placePopover(palette, anchor, false);
}

document.getElementById('btn-tidy').addEventListener('click', tidy);

/* =========================================================
   Modali (impostazioni)
   ========================================================= */
const modalWrap = document.getElementById('modal-wrap');
const modal = document.getElementById('modal');
function openModal(html) { modal.innerHTML = html; modalWrap.classList.remove('hidden'); }
function closeModal() { modalWrap.classList.add('hidden'); modal.innerHTML = ''; }
modalWrap.addEventListener('pointerdown', (e) => { if (e.target === modalWrap) closeModal(); });
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function openPanelSettings(p) {
  const t = TYPES[p.type];
  let html = `<h2>${ICONS[t.icon].replace('fill="#fff"', 'fill="' + p.color + '"').replace('<svg', '<svg width="26" height="26"')} Impostazioni finestra</h2>
    <label class="field"><span>Nome della finestra</span><input type="text" name="title" value="${esc(p.title)}"></label>`;

  if (p.type === 'site') {
    html += `<label class="field"><span>Indirizzo del sito</span><input type="text" name="url" value="${esc(p.url)}" placeholder="www.esempio.it"></label>`;
  }
  if (t.web) {
    html += `<label class="field"><span>Zoom contenuto: <b class="zv">${Math.round((p.zoom || 1) * 100)}%</b></span><input type="range" name="zoom" min="50" max="150" step="5" value="${Math.round((p.zoom || 1) * 100)}">
        <small>Riduci lo zoom per una vista più compatta e minimal.</small></label>`;
    if (t.autoRefresh) {
      html += `<label class="field check"><input type="checkbox" name="autoRefresh" ${p.autoRefresh ? 'checked' : ''}><span>Aggiorna automaticamente ogni ${settings.refreshMin} minuti</span></label>`;
    }
    html += `<label class="field check"><input type="checkbox" name="compat" ${p.compat ? 'checked' : ''}><span>Modalità compatibilità accesso</span></label>
      <div class="field"><small>Attivala solo se Google o Microsoft rifiutano l'accesso dicendo che il browser non è sicuro.</small></div>`;
  }
  if (p.type === 'webcam') {
    const cam = p.cam || { mode: 'local' };
    html += `<label class="field"><span>Sorgente</span><select name="mode">
        <option value="local" ${cam.mode === 'local' ? 'selected' : ''}>Webcam del PC / USB</option>
        <option value="ip" ${cam.mode === 'ip' ? 'selected' : ''}>Telecamera IP (indirizzo di rete)</option></select></label>
      <div class="cam-local"><label class="field"><span>Dispositivo</span><select name="deviceId"><option value="">Predefinita</option></select></label></div>
      <div class="cam-ip">
        <label class="field"><span>Indirizzo telecamera</span><input type="text" name="camUrl" value="${esc(cam.url || '')}" placeholder="http://192.168.1.50:8080/video">
          <small>Se richiede utente e password: http://utente:password@192.168.1.50/...</small></label>
        <label class="field"><span>Tipo di flusso</span><select name="ipType">
          <option value="mjpeg" ${cam.ipType !== 'snapshot' && cam.ipType !== 'web' ? 'selected' : ''}>Video MJPEG (continuo)</option>
          <option value="snapshot" ${cam.ipType === 'snapshot' ? 'selected' : ''}>Immagine istantanea (si aggiorna)</option>
          <option value="web" ${cam.ipType === 'web' ? 'selected' : ''}>Pagina web della telecamera</option></select>
          <small>I flussi RTSP non sono supportati in questa versione: usa l'indirizzo MJPEG o la pagina web della telecamera.</small></label>
        <label class="field"><span>Aggiornamento istantanea (secondi)</span><input type="number" name="interval" min="1" max="60" value="${cam.interval || 2}"></label>
      </div>`;
  }
  html += `<div class="modal-actions">
      ${t.web ? '<button class="btn ghost left ext">Apri nel browser</button>' : ''}
      <button class="btn ghost cancel">Annulla</button><button class="btn ok">Salva</button></div>`;
  openModal(html);

  const q = (n) => modal.querySelector(`[name="${n}"]`);
  const zoom = q('zoom');
  if (zoom) zoom.addEventListener('input', () => { modal.querySelector('.zv').textContent = zoom.value + '%'; });

  if (p.type === 'webcam') {
    const sync = () => {
      const ip = q('mode').value === 'ip';
      modal.querySelector('.cam-ip').style.display = ip ? '' : 'none';
      modal.querySelector('.cam-local').style.display = ip ? 'none' : '';
    };
    q('mode').addEventListener('change', sync); sync();
    navigator.mediaDevices.enumerateDevices().then(devs => {
      const sel = q('deviceId');
      if (!sel) return;
      devs.filter(d => d.kind === 'videoinput').forEach((d, i) => {
        const o = document.createElement('option');
        o.value = d.deviceId; o.textContent = d.label || `Webcam ${i + 1}`;
        if (p.cam && p.cam.deviceId === d.deviceId) o.selected = true;
        sel.append(o);
      });
    }).catch(() => {});
  }

  const ext = modal.querySelector('.ext');
  if (ext) ext.addEventListener('click', () => {
    const url = p.type === 'site' ? p.url : (p.type === 'webcam' ? (p.cam && p.cam.url) : t.url());
    if (url && window.tal) window.tal.openExternal(url);
  });
  modal.querySelector('.cancel').addEventListener('click', closeModal);
  modal.querySelector('.ok').addEventListener('click', () => {
    let rebuild = false;
    p.title = q('title').value.trim() || t.title;
    if (p.type === 'site') { const u = normalizeUrl(q('url').value); if (u !== p.url) { p.url = u; rebuild = true; } }
    if (t.web) {
      p.zoom = Number(zoom.value) / 100;
      const L = live.get(p.id);
      if (L && L.wv) { try { L.wv.setZoomFactor(p.zoom); } catch (_) { /* ok */ } }
      if (q('autoRefresh')) { p.autoRefresh = q('autoRefresh').checked; if (L && L.wv) startAutoRefresh(p, L); }
      const compat = q('compat').checked;
      if (compat !== !!p.compat) { p.compat = compat; rebuild = true; }
    }
    if (p.type === 'webcam') {
      p.cam = {
        mode: q('mode').value,
        deviceId: q('deviceId') ? q('deviceId').value : '',
        url: normalizeCamUrl(q('camUrl').value),
        ipType: q('ipType').value,
        interval: Number(q('interval').value) || 2
      };
      rebuild = true;
    }
    applyLook(p); renderDock(); save(); closeModal();
    if (rebuild) buildBody(p);
  });
}

function normalizeCamUrl(u) {
  u = (u || '').trim();
  if (u && !/^[a-z]+:\/\//i.test(u)) u = 'http://' + u;
  return u;
}

document.getElementById('btn-settings').addEventListener('click', () => {
  openModal(`<h2><img src="../build/icon.png" alt=""> Impostazioni TALavagna</h2>
    <label class="field"><span>Account Microsoft (Outlook)</span><select name="msAccount">
      <option value="personal" ${settings.msAccount === 'personal' ? 'selected' : ''}>Personale (outlook.com, hotmail, live)</option>
      <option value="work" ${settings.msAccount === 'work' ? 'selected' : ''}>Lavoro o scuola (Microsoft 365)</option></select>
      <small>Il nuovo Outlook per Windows usa lo stesso account: accedi una volta nella finestra Outlook e resta collegato.</small></label>
    <label class="field"><span>Aggiornamento automatico mail (minuti)</span><input type="number" name="refreshMin" min="1" max="120" value="${settings.refreshMin}"></label>
    <label class="field"><span>Trasparenza finestre non selezionate: <b class="ov">${Math.round(settings.inactiveOpacity * 100)}%</b> di opacità</span>
      <input type="range" name="inactiveOpacity" min="40" max="100" step="5" value="${Math.round(settings.inactiveOpacity * 100)}"></label>
    <label class="field"><span>Forza calamita: <b class="sv">${settings.snap}px</b></span><input type="range" name="snap" min="0" max="40" step="2" value="${settings.snap}">
      <small>0 = calamita disattivata.</small></label>
    <label class="field"><span>Spazio tra finestre agganciate: <b class="gv">${settings.gap}px</b></span><input type="range" name="gap" min="0" max="20" step="1" value="${settings.gap}"></label>
    <div class="modal-actions">
      <button class="btn danger left reset">Ripristina disposizione</button>
      <button class="btn ghost cancel">Annulla</button><button class="btn ok">Salva</button></div>`);
  const q = (n) => modal.querySelector(`[name="${n}"]`);
  q('inactiveOpacity').addEventListener('input', (e) => { modal.querySelector('.ov').textContent = e.target.value + '%'; document.documentElement.style.setProperty('--inactive-opacity', e.target.value / 100); });
  q('snap').addEventListener('input', (e) => { modal.querySelector('.sv').textContent = e.target.value + 'px'; });
  q('gap').addEventListener('input', (e) => { modal.querySelector('.gv').textContent = e.target.value + 'px'; });
  modal.querySelector('.cancel').addEventListener('click', () => { applySettings(); closeModal(); });
  modal.querySelector('.reset').addEventListener('click', () => {
    if (!confirm('Rimettere tutte le finestre nella disposizione iniziale? Gli accessi e le idee restano salvati.')) return;
    live.forEach(L => { stopMedia(L); clearInterval(L.timer); L.root.remove(); });
    live.clear();
    panels = defaultLayout();
    panels.forEach(p => { if (p.state !== 'closed') createPanel(p); });
    renderDock(); save(); closeModal();
  });
  modal.querySelector('.ok').addEventListener('click', () => {
    const prevMs = settings.msAccount, prevRefresh = settings.refreshMin;
    settings.msAccount = q('msAccount').value;
    settings.refreshMin = Math.max(1, Number(q('refreshMin').value) || 10);
    settings.inactiveOpacity = Number(q('inactiveOpacity').value) / 100;
    settings.snap = Number(q('snap').value);
    settings.gap = Number(q('gap').value);
    store(LS_SETTINGS, settings);
    applySettings();
    panels.forEach(p => {
      const L = live.get(p.id);
      if (!L) return;
      if (prevMs !== settings.msAccount && (p.type === 'outlookMail' || p.type === 'outlookCal')) buildBody(p);
      else if (prevRefresh !== settings.refreshMin && TYPES[p.type].autoRefresh) startAutoRefresh(p, L);
    });
    closeModal();
  });
});

function applySettings() {
  document.documentElement.style.setProperty('--inactive-opacity', settings.inactiveOpacity);
}

/* =========================================================
   Orologio, benvenuto, avvio
   ========================================================= */
function tickClock() {
  const d = new Date();
  document.getElementById('clock').innerHTML =
    `<b>${d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</b>${d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })}`;
}

function toast(msg, ms = 9000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.add('hidden'), ms);
}

function boot() {
  applySettings();
  if (!Array.isArray(panels) || !panels.length) panels = defaultLayout();
  panels.forEach(p => { zTop = Math.max(zTop, p.z || 0); });
  panels.forEach(p => { if (p.state !== 'closed') { clampPanel(p); createPanel(p); } });
  renderDock();
  save();
  tickClock();
  setInterval(tickClock, 15000);
  if (!load(LS_SEEN, false)) {
    toast('Benvenuto in TALavagna! Accedi una volta in ogni finestra (Outlook, Gmail, WhatsApp): la sessione resta salvata. Trascina dalla barra colorata, ridimensiona dai bordi, doppio clic per ingrandire.', 14000);
    store(LS_SEEN, true);
  }
}

boot();
