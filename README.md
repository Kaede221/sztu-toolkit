# sztu-toolkit

Kaede, 一个大一新生自制的 SZTU 小工具, 欢迎查看源代码或者自行进行修改!

## 技术栈

Vue3, Vite, Electron

## 程序配置文件

在根目录的`configs`文件夹中, 自行修改即可

## Project Setup

### Install

```bash
$ yarn
```

### 开发

```bash
$ yarn dev
```

### 构建

```bash
# 考虑到兼容性问题 本程序暂时只提供Windows版本构建
$ yarn build:win
```

# 开发进度

## 2025-2-11

- [ ] 更加人性化: 关闭程序时, 提示已经进入托盘
- [ ] 修改消息框样式, 允许堆叠, 解决消息太多看不到的情况 (可以使用Toast之类的东西)
- [ ] 添加设置界面, 允许快速的修改各种config文件
- [x] 提升代码耦合度, 优化代码逻辑

## 2025-2-10

- [x] 设计程序页面
- [x] 实现按钮交互
- [x] **重构工具类**
- [x] 实现 Auto Conn 工具类
- [x] **实现按钮调用程序**
- [x] 打包程序并构建Release
