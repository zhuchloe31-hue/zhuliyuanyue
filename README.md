# 朱李元月 Portfolio

这是一个纯静态个人主页，可以免费部署到不需要访问者登录的公网平台。

## 推荐免费发布方式

### Cloudflare Pages

- 可得到类似 `zhuliyuanyue.pages.dev` 的公开网址。
- 适合想要全球访问速度更稳定、以后也方便绑定自定义域名的情况。
- 发布方式：Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Upload assets。
- 上传这个文件夹里的全部网页文件即可。

### GitHub Pages

- 可得到类似 `https://你的GitHub用户名.github.io/` 的公开网址。
- 适合已有 GitHub 账号、希望后续用代码仓库维护主页的情况。
- 新建名为 `你的GitHub用户名.github.io` 的公开仓库，将这些文件放到仓库根目录，并在 Pages 设置里启用发布。

## 文件结构

- `index.html`: 首页，只保留姓名和项目入口。
- `styles.css`: 全站样式。
- `projects/`: 点击项目入口后进入的详情页。
