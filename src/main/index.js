import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

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

// TODO 定义函数调用内容
function startAutoLab() {
  console.log('Auto Lab has been clicked!')
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.fumoe')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // TODO 接收参数 调用对应内容
  ipcMain.on('start-auto-lab', () => startAutoLab())

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
