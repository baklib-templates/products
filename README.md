# products（Product Hub）主题

本主题是 Baklib CMS 下面向 **B2B 企业 PIM** 与「产品数字资产枢纽」的可交付主题。以「**单品（Product）**」为核心锚点，通过「**中心辐射（Hub and Spoke）**」结构聚合：

- **紧耦合**：当前产品自身的参数表、主图、物料库等（直接来自 `page.settings`）。
- **松耦合**：跨栏目拉取的客户案例、技术文档、知识库问答（通过站点 settings 中的频道根路径 + `{% query %}` 过滤）。

主题彻底**去电商化**：禁止出现购物车 / 立即购买 / 库存状态 / 标价等 UI；核心转化动作统一为「**获取方案**」「**联系工程师**」「**申请试用**」。

## 信息架构（推荐站点结构）

| 路径 | 模板 | 用途 |
|------|------|------|
| `/`            | `templates/index.liquid`           | 选型门户首页（推荐入口） |
| `/products`    | `templates/channel.products.liquid`| 产品选型中心：左侧分类树 + 右侧高密度列表 |
| `/cases`       | `templates/channel.cases.liquid`   | 全局客户案例库（图片卡片瀑布流） |
| `/docs`        | `templates/channel.docs.liquid`    | 全局技术支持库（目录 + 正文） |
| `/downloads`   | `templates/channel.downloads.liquid`| 全局资料库（极简列表 + 搜索） |
| `/faqs`        | `templates/channel.faqs.liquid`    | 全局问答库（锚点 + 手风琴） |
| 产品详情       | `templates/page.product.liquid`    | 单品主控页（Hero + 吸顶导航 + 五段组件） |
| 案例详情       | `templates/page.case.liquid`       | 客户案例详情（痛点 / 方案 / 成果） |
| 文档详情       | `templates/page.doc.liquid`        | 技术文档详情（宽 prose + 右侧 TOC） |

> 频道路径在站点级 settings 中可配，详见下文「频道根路径」。

## 模板变体与命名

频道与详情页采用 Baklib 的**变体模板**命名（**`channel.<style>.liquid` / `page.<style>.liquid`**）。后台为每个栏目/页面选择对应「样式」即可路由到此变体。当未指定样式时，`templates/channel.liquid` 与 `templates/page.liquid` 作为兜底降级渲染。

## 产品详情页组件（按需组装）

`page.product.liquid` 本身只做编排，按顺序 `{% render %}` 下列 5 个组件：

| 组件 | 文件 | 数据来源 |
|------|------|----------|
| Hero / 概览 | `snippets/_product-hero.liquid` | 紧耦合：`page.settings.product_model`、`specifications`、`body`、主图轮播 |
| 物料库      | `snippets/_product-downloads.liquid` | 紧耦合：`page.settings.downloads`（JSON 数组） |
| 支持库      | `snippets/_product-docs.liquid`      | 松耦合：站点级 `docs_root_path` 子树 + 型号过滤 |
| 知识库      | `snippets/_product-faqs.liquid`      | 松耦合：站点级 `faqs_root_path` 子树 + 型号过滤 |
| 案例库      | `snippets/_product-cases.liquid`     | 松耦合：站点级 `cases_root_path` 子树 + 型号过滤 |

吸顶导航锚点：`#overview / #downloads / #docs / #faqs / #cases`；滚动侦测高亮由 Alpine + `IntersectionObserver` 实现。

## 站点级设置（`config/settings_schema.json`）

| 字段 | 说明 |
|------|------|
| `slogan` / `company_name` / `copyright_info` | 通用品牌信息 |
| `sort_rule` | 列表默认排序 |
| `is_allow_feedback` / `is_show_visit_count` / `is_allow_header` / `is_allow_footer` | 通用开关 |
| `products_root_path` 等 5 项 | 频道根路径（详情页用于跨栏目查询） |
| `cta_quote_label` / `cta_engineer_label` / `cta_trial_label` | 全局 CTA 文案 |
| `lead_email` | 转化对话框邮件兜底地址（未启用站点反馈时使用） |
| `head_html` / `header_menu_html` / `footer_menu_html` | 自定义 HTML 注入 |

## 单品页内容字段（`page.settings.*`）

| 字段 | 类型 | 说明 |
|------|------|------|
| `product_model`   | text     | 型号（用于跨栏目过滤的主键） |
| `tagline`         | text     | 一句话定位 |
| `hero_images`     | textarea | 主图轮播：每行一条 URL（资源库或外链） |
| `specifications`  | textarea | 参数表（每行 `参数名｜值｜单位`，竖线分隔；最少 2 段） |
| `downloads`       | textarea | 物料库（每行 `名称｜文件类型｜URL｜大小`；JSON 数组也兼容） |
| `body`            | richtext | 概览正文（启用 `to_markdown` 便于 .md 导出） |
| `related_models`  | textarea | 关联型号（可选，多行；用于跨栏目松耦合匹配） |
| `cta_quote_link`  | text     | 「获取方案」目标链接（默认走 dialog） |
| `cta_trial_link`  | text     | 「申请试用」目标链接 |

## 案例与文档页字段（用于跨栏目过滤）

- 案例 / 文档 / FAQ 页可在 `page.settings.related_models` 中维护**一行一型号**的关联清单。
- 也兼容**页面标签**（`page.tags` / `page.settings.tags`）；详情页组件会对两者做合集去重判断。

## 构建与开发

依赖管理统一使用 **Yarn**（与仓库 `yarn.lock` 对齐）。

```bash
yarn
yarn build      # 一次构建到 assets/
yarn dev        # 监听并实时编译
```

构建产物：

- CSS：`src/stylesheets/application.css` → `assets/stylesheets/application.css`
- JS：`src/javascripts/application.js` → `assets/javascripts/application.js`（IIFE，`es2015` 目标）

## 上线检查清单

1. 站点级 settings 中 `products_root_path / cases_root_path / docs_root_path / downloads_root_path / faqs_root_path` 与实际栏目 slug 对齐。
2. 案例 / 文档 / FAQ 模板名（template_name）与 [`templates/page.case.liquid`](./templates/page.case.liquid)、[`page.doc.liquid`](./templates/page.doc.liquid) 等变体匹配。
3. 单品页字段补全：至少维护 `product_model`、`specifications`、主图与 `body`。
4. 转化按钮：在 [`config/settings_schema.json`](./config/settings_schema.json) 中确认 CTA 文案；若使用 `mailto:`，配置 `lead_email`。
5. 文案审计：站点自定义 HTML / 顶部菜单中**不得出现**「购物车 / 加入购物车 / 立即购买 / 标价 / 库存」等表达。

## 设计约束

- 主色：Teal `#0d9488`（CSS 变量驱动；可在后台切换工业 Teal / 石墨灰 / 深海蓝预设）。
- 留白与浅灰分区：大量 `bg-slate-50`、卡片用 `border-slate-200/80` + 浅阴影。
- 参数表格易读性优先：`table-fixed`、首列加粗、单位灰阶弱化。
- 字体层级：Hero 标题 ≥ 32px、节标题 18–20px、参数表 14px。
