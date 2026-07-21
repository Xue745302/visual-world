# Visual World

一个使用纯 HTML、CSS 和原生 JavaScript 制作的 AI 数字漫剧个人艺术家作品集网站。

## 当前版本包含

- 电影式进入界面；
- 中文创作宣言与法文、英文副文案；
- 深色首屏与滚动后的浅色作品区域；
- 数据驱动的作品列表；
- 视觉实验错位网格；
- 原创漫剧系列；
- 角色档案；
- 商业项目区域；
- 图片/视频全屏查看器；
- 背景声音开关；
- 移动端适配；
- 减少动态效果支持；
- 不依赖框架、构建工具、数据库或付费服务。

## 如何预览

最简单的方法是双击 `index.html`。

为了获得更稳定的本地预览，也可以：

1. 在项目文件夹的地址栏输入 `cmd` 并按回车；
2. 输入：

```bat
py -m http.server 8000
```

3. 在浏览器打开：

```text
http://localhost:8000
```

如果电脑没有 `py` 命令，可尝试：

```bat
python -m http.server 8000
```

## 第一步要替换的内容

### 1. 网站名称与个人资料

打开：

```text
data/site.js
```

修改：

- `siteName`
- `artistName`
- `artistBio`
- `contactLabel`
- `contactUrl`

### 2. 作品

打开：

```text
data/projects.js
```

复制一个现有对象，再修改：

- `id`
- `type`
- `title`
- `subtitle`
- `year`
- `status`
- `cover`
- `description`
- `tags`

作品类型固定使用：

```text
visual-experiment
original-series
character-archive
commercial-project
behind-the-scenes
```

### 3. 角色

打开：

```text
data/characters.js
```

替换示例角色。

## 如何添加图片

例如添加作品 `moon-story`：

```text
assets/projects/moon-story/
├── cover.webp
├── 01.webp
└── trailer.mp4
```

然后在 `data/projects.js` 中写：

```js
cover: "assets/projects/moon-story/cover.webp",
video: "assets/projects/moon-story/trailer.mp4"
```

文件路径大小写必须完全一致。

## 如何添加背景音乐

把已经确认授权的音乐命名为：

```text
ambient.mp3
```

放入：

```text
assets/audio/ambient.mp3
```

网页不会自动播放有声音乐。访客必须点击“进入故事 · 开启声音”。

没有放入音频时，网站仍然可以正常浏览。

## 免费发布

本项目是纯静态网站，可以部署到 Cloudflare Pages 免费方案。

无需构建命令，发布目录为项目根目录。

默认网址会类似：

```text
https://你的项目名.pages.dev
```

## 注意

- 示例标题、角色和商业项目都必须替换；
- 不要虚构客户和商业成果；
- 不要使用授权不明确的图片、音乐、字体或视频；
- 上传视频前先压缩，避免网站加载过慢。
