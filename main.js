'use strict';
// TALavagna - processo principale (Electron)
const { app, BrowserWindow, session, shell, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Registro di avvio/errori: %APPDATA%\TALavagna\talavagna-log.txt
function log(msg) {
  try {
    const dir = app.getPath('userData');
    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(path.join(dir, 'talavagna-log.txt'), `[${new Date().toISOString()}] ${msg}\n`);
  } catch (_) { /* niente */ }
}
process.on('uncaughtException', (err) => {
  log('ERRORE: ' + (err && err.stack || err));
  try { dialog.showErrorBox('TALavagna - errore', String(err && err.stack || err)); } catch (_) { /* niente */ }
});
log(`avvio v${app.getVersion()} electron ${process.versions.electron} - ${process.platform} ${process.arch}`);

// User agent "Chrome puro": senza il marcatore Electron, così WhatsApp Web,
// Gmail e Outlook trattano TALavagna come un normale Chrome per Windows.
const CHROME_UA = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`;
app.userAgentFallback = CHROME_UA;
app.setAppUserModelId('it.tal.talavagna');

if (!app.requestSingleInstanceLock()) {
  log('già in esecuzione: porto in primo piano la finestra esistente');
  app.quit();
}

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 960,
    minWidth: 960,
    minHeight: 620,
    show: false,
    title: 'TALavagna',
    backgroundColor: '#0a1214',
    icon: path.join(__dirname, 'build', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  let shown = false;
  const reveal = () => { if (shown || win.isDestroyed()) return; shown = true; win.maximize(); win.show(); log('finestra mostrata'); };
  win.once('ready-to-show', reveal);
  setTimeout(reveal, 5000);   // paracadute: mostra comunque la finestra
  win.webContents.on('render-process-gone', (_e, d) => log('renderer terminato: ' + JSON.stringify(d)));
  win.webContents.on('did-fail-load', (_e, code, desc) => log(`caricamento fallito ${code} ${desc}`));
  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Solo per i test automatici: salva uno screenshot e chiude.
  if (process.env.TALAVAGNA_SHOT) {
    win.webContents.on('console-message', (_e, _l, msg) => console.log('[renderer]', msg));
    setTimeout(async () => {
      if (process.env.TALAVAGNA_JS) await win.webContents.executeJavaScript(process.env.TALAVAGNA_JS).catch(e => console.log('JS ERR', e));
      setTimeout(async () => {
        const img = await win.webContents.capturePage();
        require('fs').writeFileSync(process.env.TALAVAGNA_SHOT, img.toPNG());
        app.quit();
      }, 1500);
    }, 5000);
  }
}

// Accessi Google/Microsoft restano dentro l'app; gli altri link si aprono nel browser.
const LOGIN_HOSTS = /(^|\.)(accounts\.google\.com|login\.microsoftonline\.com|login\.live\.com|login\.microsoft\.com|account\.live\.com)$/i;

app.on('web-contents-created', (_e, contents) => {
  if (contents.getType() !== 'webview') return;
  contents.setWindowOpenHandler(({ url }) => {
    try {
      const host = new URL(url).hostname;
      if (LOGIN_HOSTS.test(host)) return { action: 'allow' };
    } catch (_) { /* url non valido */ }
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
});

ipcMain.on('open-external', (_e, url) => {
  if (typeof url === 'string' && /^https?:\/\//i.test(url)) shell.openExternal(url);
});

app.on('second-instance', () => {
  if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
});

app.whenReady().then(() => {
  const ALLOWED = new Set(['media', 'notifications', 'clipboard-sanitized-write', 'fullscreen', 'mediaKeySystem']);
  const setup = (ses) => {
    ses.setUserAgent(CHROME_UA);
    ses.setPermissionRequestHandler((_wc, perm, cb) => cb(ALLOWED.has(perm)));
  };
  setup(session.defaultSession);
  ['persist:google', 'persist:microsoft', 'persist:whatsapp', 'persist:sites'].forEach((p) => setup(session.fromPartition(p)));

  Menu.setApplicationMenu(null);
  createWindow();
});

app.on('window-all-closed', () => app.quit());
