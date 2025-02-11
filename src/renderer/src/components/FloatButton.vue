<script setup>
import { showToast } from '../utils/ks-utils'
const handleClick = () => {
  // 打开设置页面即可
  showToast('设置页面开发中!')
}
</script>

<template>
  <button class="floating-button" @click="handleClick"><i class="fas fa-history"></i></button>
</template>

<style scoped>
/* 悬浮按钮样式 */
.floating-button {
  position: fixed; /* 固定定位 */
  top: 20px; /* 距离顶部 20px */
  right: 20px; /* 距离右侧 20px */
  width: 50px; /* 宽度 */
  height: 50px; /* 高度 */
  border-radius: 15%; /* 圆形 */
  background-color: rgba(0, 0, 0, 0.13); /* 半透明背景 */
  color: white; /* 加号颜色 */
  font-size: 25px; /* 加号字体大小 */
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
  border: none; /* 去掉边框 */
  transition: background-color 0.3s ease; /* 添加背景颜色过渡效果 */
}

/* 鼠标悬停时改变背景颜色 */
.floating-button:hover {
  background-color: rgba(0, 0, 0, 0.7); /* 悬停时更深的半透明背景 */
}
</style>
