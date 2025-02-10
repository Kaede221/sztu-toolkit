<script setup>
import ItemButton from './ItemButton.vue'

const props = defineProps({
  // 卡片的标题是什么
  title: {
    type: String,
    required: true
  },
  // 卡片的介绍信息是什么
  info: {
    type: String,
    required: true
  },
  // 传入图标的class
  iconImage: {
    type: String,
    required: true
  },
  // 传入按钮点击事件
  onButtonClickStart: {
    type: Function,
    required: true
  },
  onButtonClickEnd: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <div class="tool-icon">
        <i class="fas" :class="props.iconImage"></i>
      </div>
      <h2 class="tool-title">{{ props.title }}</h2>
    </div>
    <p class="tool-description">{{ props.info }}</p>
    <ItemButton
      :on-click-start="props.onButtonClickStart"
      :on-click-end="onButtonClickEnd"
    ></ItemButton>
  </div>
</template>

<style>
.tool-card {
  width: 350px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-5px);
}

.tool-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.tool-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.tool-icon i {
  font-size: 24px;
  color: white;
}

.tool-title {
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.tool-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 25px;
}
</style>
