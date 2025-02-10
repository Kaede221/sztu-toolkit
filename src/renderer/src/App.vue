<script setup>
import AppCard from './components/AppCard.vue'

// 初始化工具相关数据
const cards = [
  {
    title: 'Auto Lab',
    info: '简单的实验室速通工具, 基于Python开发, 不会读取你的任何数据! 放心使用即可',
    iconImage: 'fa-flask'
  },
  { title: '工具2', info: '这是工具2的介绍信息', iconImage: 'fa-cogs' },
  { title: '工具3', info: '这是工具3的介绍信息', iconImage: 'fa-wrench' },
  { title: '工具4', info: '这是工具4的介绍信息', iconImage: 'fa-hammer' }
]

// 定义两个点击事件 分别是启动和结束运行
const handleButtonClickStart = (index) => {
  switch (index) {
    case 0:
      alert('Auto Lab 工具已经启动')
      break
    case 1:
      alert('工具2启动')
      break
    case 2:
      alert('工具3启动')
      break
    case 3:
      alert('工具4启动')
      break
    default:
      alert('未知启动')
  }
}

const handleButtonClickEnd = (index) => {
  switch (index) {
    case 0:
      alert('Auto Lab 工具已经停止')
      break
    case 1:
      alert('工具2停止')
      break
    case 2:
      alert('工具3停止')
      break
    case 3:
      alert('工具4停止')
      break
    default:
      alert('未知停止')
  }
}
</script>

<template>
  <div class="header">
    <h1 class="title"><span class="colorful-text">SZTU</span> Toolkit</h1>
    <p class="tip">由 Kaede 制作的 SZTU 小工具合集</p>
  </div>
  <br />
  <div class="card-group">
    <AppCard
      v-for="(card, index) in cards"
      :key="index"
      :title="card.title"
      :info="card.info"
      :icon-image="card.iconImage"
      :on-button-click-start="() => handleButtonClickStart(index)"
      :on-button-click-end="() => handleButtonClickEnd(index)"
    ></AppCard>
  </div>
</template>

<style lang="css">
.title {
  color: white;
}

.colorful-text {
  background: linear-gradient(90deg, rgb(245, 223, 152), rgb(255, 167, 3));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.tip {
  color: white;
  font-size: large;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
