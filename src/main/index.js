import { app, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// 引入自定义工具包
import { endProcess, startProcess } from './utils/exeUtils'
import { createTray, createAndGetWindow, initUpdate } from './utils/initUtils'
import { autoUpdater } from 'electron-updater'
import { signals } from './constants/commonConstants'

// 定义主窗口对象
let mainWindow = null

app.on('ready', () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.fumoe.top')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // TODO 接收参数 调用对应内容
  // Auto Lab部分
  ipcMain.on(signals.START_AUTO_LAB, () => startProcess('Auto Lab', 'AutoLab.exe'))
  ipcMain.on(signals.END_AUTO_LAB, () => endProcess('AutoLab.exe'))

  // Auto Conn部分
  ipcMain.on(signals.START_AUTO_CONN, () => startProcess('Auto Conn', 'AutoConn.exe'))
  ipcMain.on(signals.END_AUTO_CONN, () => endProcess('AutoConn.exe'))

  mainWindow = createAndGetWindow()
  createTray(mainWindow)
})
