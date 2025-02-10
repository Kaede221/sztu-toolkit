import { app, shell, BrowserWindow, ipcMain, nativeImage, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// 引入Kaede自定义工具包
import { endProcess, startProcess } from './exeUtils'

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
    icon: join(app.getAppPath(), './resources/icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
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
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

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

  createWindow()
  createTray()
})

// 创建托盘图标
function createTray() {
  const iconPath = join(app.getAppPath(), './resources/icon.ico')
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
