/**
 * 实现一些初始化程序的方法
 */
import { nativeImage, Tray, Menu, app, BrowserWindow, shell } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'

/**
 * 初始化托盘图标
 * @param {BrowserWindow} mainWindow 主窗口对象
 */
export function createTray(mainWindow) {
  const iconPath = join(app.getAppPath(), './resources/icon.ico')
  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
  const tray = new Tray(trayIcon)

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

/**
 * 创建主窗口并返回
 * @returns 创建好的主窗口对象
 */
export function createAndGetWindow() {
  // 创建主窗口
  const mainWindow = new BrowserWindow({
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

  return mainWindow
}
