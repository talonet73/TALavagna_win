'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tal', {
  openExternal: (url) => ipcRenderer.send('open-external', url)
});
