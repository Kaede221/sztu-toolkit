import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const { spawn } = require('child_process')
const treeKill = require('tree-kill')

function createWindow() {
  // 创建主窗口
  const mainWindow = new BrowserWindow({
    width: 860,
    height: 680,
    resizable: false,
    maximizable: false,
    show: false,
    icon: './resources/logo.jpg',
    autoHideMenuBar: true,
    webPreferences: {
      preload: resolve(__dirname, '../preload/preload.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(resolve(__dirname, '../renderer/index.html'))
  }
}

// TODO 定义 用来记录PID
let childProcess_AutoConn = null

// TODO 定义函数调用内容 ↓↓↓
function startAutoLab() {
  console.log('Auto Lab has been clicked!')
}

function startAutoConn() {
  // 判断配置文件是否存在

  // 判断程序是否已经在运行了
  if (childProcess_AutoConn) {
    console.log('Process has been created!')
    return
  }
  // 首先 获取程序的路径
  const exePath = resolve(__dirname, '../../resources/applications/AutoConn.exe')
  // 启动子进程
  childProcess_AutoConn = spawn(exePath)
  console.log('Successfully started!')
}

function endAutoConn() {
  if (!childProcess_AutoConn) {
    console.log('There is no process running.')
    return
  }
  // 关闭程序即可
  treeKill(childProcess_AutoConn.pid)
  childProcess_AutoConn = null
  console.log('Successfully closed!')
}

// TODO 定义结束 ↑↑↑

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.fumoe')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // TODO 接收参数 调用对应内容
  ipcMain.on('start-auto-lab', startAutoLab)
  ipcMain.on('start-auto-conn', startAutoConn)
  ipcMain.on('end-auto-conn', endAutoConn)

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
