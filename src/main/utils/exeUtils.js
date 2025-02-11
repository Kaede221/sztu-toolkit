import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
const { spawn } = require('child_process')
const path = require('path')
const treeKill = require('tree-kill')

// TODO 本地实现线程管理
// 直接定义字典, 用来储存就好了
const processDict = {
  // 储存键值对 key是程序名称 value是程序pid
}

/**
 * 根据文件名, 获取对应的执行路径
 * @param {String} fileName 文件名称
 * @returns {String} 文件的访问路径
 */
export function getExePath(fileName) {
  if (is.dev) {
    return path.join(app.getAppPath(), './resources/applications', fileName)
  } else {
    return path.join(process.resourcesPath, 'applications', fileName)
  }
}

/**
 * 开始运行目标进程
 * @param {String} processTitle 子进程标题
 * @param {String} processFilename 子进程需要运行的程序名称(包含exe)
 * @returns 无返回
 */
export function startProcess(processTitle, processFilename) {
  // 直接判断字典中有没有这个程序名称就好
  if (processFilename in processDict) {
    console.log(`Process has been created! Title: ${processTitle}`)
    return
  }
  // 否则启动子进程
  const childProcess = spawn(getExePath(processFilename))
  // 并且加入字典中, 方便管理
  processDict[processFilename] = childProcess.pid
  console.log(`${processTitle} has been launched!`)
}

/**
 * 停止目标子进程
 * @param {String} processFilename 子进程程序名称
 * @returns 无返回
 */
export function endProcess(processFilename) {
  if (processFilename in processDict) {
    // 找到了目标进程
    treeKill(processDict[processFilename], 'SIGTERM', (err) => {
      if (err) {
        console.error(`Error tree kill! \nPID: ${processDict[processFilename]}\nERR: ${err}`)
      } else {
        console.log(`Tree kill successfully! Title: ${processFilename}`)
      }
    })
    // 移除键值对
    delete processDict[processFilename]
  } else {
    // 否则就是没找到
    console.log('No such a process.')
  }
}
