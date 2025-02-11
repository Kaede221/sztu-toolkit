import { toast } from 'vue3-toastify'

// 封装弹窗函数 方便后续调用 一行搞定
export function showToast(
  message,
  type = 'default',
  theme = 'dark',
  transition = 'zoom',
  autoClose = 1000,
  position = 'bottom-right'
) {
  toast(message, { theme, type, transition, autoClose, position })
}
