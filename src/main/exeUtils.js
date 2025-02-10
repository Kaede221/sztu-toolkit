import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
const { spawn } = require('child_process')
const path = require('path')
const treeKill = require('tree-kill')

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
 * @param {ChildProcessWithoutNullStreams} childProcess 子进程
 * @param {String} processTitle 子进程标题
 * @param {String} processFilename 子进程需要运行的程序名称(包含exe)
 * @returns 无返回
 */
export function startProcess(childProcess, processTitle, processFilename) {
  if (childProcess) {
    console.log(`Process has been created! Title: ${processTitle}`)
    return
  }
  // 启动子进程
  childProcess = spawn(getExePath(processFilename))
  console.log(`${processTitle} has been launched!`)
}

/**
 * 停止目标子进程
 * @param {ChildProcessWithoutNullStreams} childProcess 子进程
 * @param {String} processTitle 子进程名称
 * @returns 无返回
 */
export function endProcess(childProcess, processTitle) {
  if (!childProcess) {
    console.log('There is no process running.')
    return
  }
  // 关闭程序即可
  treeKill(childProcess.pid)
  childProcess = null
  console.log(`${processTitle} Successfully closed!`)
}
