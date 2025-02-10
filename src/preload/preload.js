import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 自定义API
const api = {
  startAutoLab: () => ipcRenderer.send('start-auto-lab'),
  startAutoConn: () => ipcRenderer.send('start-auto-conn'),
  endAutoConn: () => ipcRenderer.send('end-auto-conn')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
