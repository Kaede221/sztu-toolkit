/**
 * 实现一些初始化程序的方法
 */
import { nativeImage, Tray, Menu, app, BrowserWindow, shell, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
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
 * 初始化菜单栏
 * @param {BrowserWindow} mainWindow 主窗口对象
 */
function initMenuBar(mainWindow) {
  // 直接定义菜单模板即可
  let template = [
    {
      label: '关于',
      submenu: [
        {
          label: '关于 Kaede',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '关于 Kaede',
              message: 'Kaede 是本程序的开发者哦!'
            })
          }
        },
        {
          label: '关于程序',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '关于程序',
              message: '这是一个基于 Electron 和 Vue3 的应用程序。\n版权所有 © 2025'
            })
          }
        }
      ]
    },
    {
      label: '检查更新',
      click: () => {
        console.log('Checking update.')
      }
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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
    // autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false
    }
  })

  // 加载菜单
  initMenuBar(mainWindow)

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

/**
 * 初始化更新内容
 */
export function initUpdate() {
  // 配置更新选项
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })
  autoUpdater.on('update-available', () => {
    console.log('Downloaded successfully')
  })
  autoUpdater.on('update-not-available', () => {
    console.log('You are the lastest version.')
  })
  autoUpdater.on('error', (ev, err) => {
    console.log('Error on updating')
    console.log(ev, err)
  })
  autoUpdater.on('download-progress', () => {
    console.log('Downloading...')
  })
  autoUpdater.on('update-downloaded', () => {
    console.log('Ready to update!')
    const options = {
      type: 'info',
      buttons: ['确定', '取消'],
      title: '应用更新',
      message: '发现了一个新版本哦! 推荐更新一下!'
    }
    dialog.showMessageBox(options).then((returnVal) => {
      if (returnVal.response === 0) {
        console.log('Started update...')
        setTimeout(() => {
          autoUpdater.quitAndInstall()
        }, 1000)
      } else {
        console.log('cancel update')
        return
      }
    })
  })
}
