import { contextBridge, ipcRenderer } from 'electron'
import { signals } from '../main/constants/commonConstants'

// 自定义API
const api = {
  // TODO 渲染进程->主进程
  startAutoLab: () => ipcRenderer.send(signals.START_AUTO_LAB),
  endAutoLab: () => ipcRenderer.send(signals.END_AUTO_LAB),
  startAutoConn: () => ipcRenderer.send(signals.START_AUTO_CONN),
  endAutoConn: () => ipcRenderer.send(signals.END_AUTO_CONN),

  // TODO 主进程->渲染进程
  // 实现通用Toast方法
  mainShowToast: (callback) => ipcRenderer.on('main-show-toast', (_, data) => callback(data))
}

contextBridge.exposeInMainWorld('api', api)
