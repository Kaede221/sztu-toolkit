import { app, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

// 引入自定义工具包
import { endProcess, startProcess } from './utils/exeUtils'
import { createTray, createAndGetWindow } from './utils/initUtils'

// 定义主窗口对象
let mainWindow = null

// TODO 定义 用来记录进程
let childProcess_AutoConn = null
let childProcess_AutoLab = null

app.on('ready', () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.fumoe.top')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // TODO 接收参数 调用对应内容
  ipcMain.on('start-auto-lab', () => startProcess(childProcess_AutoLab, 'Auto Lab', 'AutoLab.exe'))
  ipcMain.on('end-auto-lab', () => endProcess(childProcess_AutoLab, 'Auto Lab'))
  ipcMain.on('start-auto-conn', () =>
    startProcess(childProcess_AutoConn, 'Auto Conn', 'AutoConn.exe')
  )
  ipcMain.on('end-auto-conn', () => endProcess(childProcess_AutoConn, 'Auto Conn'))

  mainWindow = createAndGetWindow()
  createTray(mainWindow)
})
