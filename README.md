# AI 产品作品集本地预览

这是一个面向国内秋招的中文 AI 产品个人主页和项目作品集。

## 本地运行

```bash
npm install
npm run dev
```

然后打开终端里显示的本地地址。

## 可替换内容

- `src/data/profile.ts`：姓名、定位、邮箱、简历链接、能力描述
- `src/data/projects.ts`：项目列表、项目详情和 Case Study 内容
- `app/globals.css`：颜色、排版、间距和响应式样式

## 可用命令

- `npm run dev`：启动本地预览
- `npm run build`：检查生产构建
- `npm run lint`：检查代码风格
- `npm test`：构建并检查首页渲染结果
