import { contextBridge, ipcRenderer } from 'electron'
import { signals } from '../main/constants/commonConstants'

// 自定义API
const api = {
  startAutoLab: () => ipcRenderer.send(signals.START_AUTO_LAB),
  endAutoLab: () => ipcRenderer.send(signals.END_AUTO_LAB),
  startAutoConn: () => ipcRenderer.send(signals.START_AUTO_CONN),
  endAutoConn: () => ipcRenderer.send(signals.END_AUTO_CONN)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('versions', {
      appVersion: process.env.npm_package_version
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
