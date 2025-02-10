<script setup>
import AppCard from './components/AppCard.vue'

// ! 初始化工具相关数据
const cards = [
  {
    title: 'Auto Lab',
    info: '简单的实验室速通工具, 基于Python开发, 不会读取你的任何数据! 放心使用即可',
    iconImage: 'fa-flask'
  },
  {
    title: 'Auto Conn',
    info: '断网自动重连工具, 帮助你在掉网络的时候自动重新连接!',
    iconImage: 'fa-plug'
  }
]

// 定义两个点击事件 分别是启动和结束运行
const handleButtonClickStart = (index) => {
  switch (index) {
    case 0:
      window.api.startAutoLab()
      new Notification('Kaede 提示你!', { body: 'Auto Lab 工具启动啦!' })
      break
    case 1:
      window.api.startAutoConn()
      new Notification('Kaede 有话说!', { body: 'Auto Conn 开始运行啦!' })
      break
    default:
      alert('未知启动')
  }
}

const handleButtonClickEnd = (index) => {
  switch (index) {
    case 0:
      window.api.endAutoLab()
      new Notification('Kaede 发现', { body: 'Auto Lab 工具已经停止咯' })
      break
    case 1:
      window.api.endAutoConn()
      new Notification('Kaede 意识到', { body: 'Auto Conn 睡觉去咯~' })
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
