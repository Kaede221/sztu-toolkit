<script setup>
import { ref } from 'vue'

// 定义一个记录变量 判断当前的状态是什么
// 0 stopping 1 running
const buttonState = ref(0)

// 定义class 用来给按钮添加样式
const tempClass = ref('')

// 接收点击事件
const props = defineProps({
  onClickStart: {
    type: Function,
    required: true
  },
  onClickEnd: {
    type: Function,
    required: true
  }
})

// 实现点击事件
const handleClick = () => {
  if (buttonState.value === 0) {
    buttonState.value = 1
    tempClass.value = 'running'
    props.onClickStart()
  } else {
    buttonState.value = 0
    tempClass.value = ''
    props.onClickEnd()
  }
}

// 实现鼠标移入事件
const handleMouseOver = () => {
  if (buttonState.value === 1) {
    tempClass.value = 'stopping'
  } else {
    tempClass.value = 'default'
  }
}

// 鼠标移出事件
const handleMouseOut = () => {
  if (buttonState.value === 1) {
    tempClass.value = 'running'
  } else {
    tempClass.value = ''
  }
}
</script>

<template>
  <!-- 对于按钮来说 只有两个状态 开启或者关闭 直接根据之前的写法实现即可 -->
  <button
    id="btn"
    class="tool-button"
    :class="tempClass"
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <i v-if="buttonState === 0" class="fas fa-play"></i>
    <i v-else-if="tempClass === 'running'" class="fas fa-running"></i>
    <i v-else class="fas fa-stop-circle"></i>
    {{ buttonState === 0 ? '启动工具' : tempClass === 'running' ? '运行中' : '停止运行' }}
  </button>
</template>

<style lang="css">
.tool-button {
  display: inline-flex;
  align-items: center;
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-button i {
  margin-right: 10px;
}

.tool-button:hover {
  transform: translateX(5px);
}

.default {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.running {
  background: green;
  color: white;
}

.stopping {
  background: red;
  color: white;
}
</style>
