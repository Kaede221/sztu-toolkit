import { app, shell, BrowserWindow, ipcMain, nativeImage, Tray, Menu } from 'electron'
import { resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const { spawn } = require('child_process')
const treeKill = require('tree-kill')

let tray = null
let mainWindow = null

function createWindow() {
  // 创建主窗口
  mainWindow = new BrowserWindow({
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

  // 设置程序 关闭后是隐藏 不是彻底关闭
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault()
      mainWindow.hide()
    }
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

app.on('ready', () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.fumoe.top')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // TODO 接收参数 调用对应内容
  ipcMain.on('start-auto-lab', startAutoLab)
  ipcMain.on('start-auto-conn', startAutoConn)
  ipcMain.on('end-auto-conn', endAutoConn)

  createWindow()
  createTray()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 创建托盘图标
function createTray() {
  const iconPath = './resources/logo.jpg'
  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
  tray = new Tray(trayIcon)

  // 定义菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开主界面',
      click: () => {
        if (mainWindow) {
          mainWindow.show() // 显示主窗口
        }
      }
    },
    {
      label: '退出',
      click: () => {
        app.isQuitting = true // 标记为退出
        app.quit() // 退出应用程序
      }
    }
  ])

  tray.setToolTip('SZTU Toolkit by Kaede')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        mainWindow.show()
      }
    }
  })
}
