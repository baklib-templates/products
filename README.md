# partners（伙伴门户）主题

本仓库是 Baklib CMS 的一个可交付主题项目：用于搭建企业「生态伙伴 / 渠道合作 / 集成市场」门户站点，覆盖**展示（目录 + 详情）**、**线索收集（成为伙伴）**与**运营入口（dashboard）**。

> 与平台相关的能力、字段类型、插件开关等以 Baklib 平台实际表现为准。

## 主题定位

- **适用场景**：生态伙伴展示、渠道代理商名录、技术集成市场、合作伙伴招募与线索分发。
- **交互重点**：伙伴目录页支持多维筛选（类型/地区/等级）；首页含「精选卡片」横向滚动；详情页突出 CTA 与资源链接。
- **风格与实现**：浅色主题（玻璃拟物卡片 + 渐变背景）、TailwindCSS + DaisyUI；JS 使用 esbuild 打包为 IIFE。

## 主要页面与信息架构

建议站点结构如下（slug 可按运营需要调整，示例以默认约定说明）：

- **首页**：`templates/index.liquid`
  - 展示站点口号与入口 CTA（浏览目录 / 成为伙伴）
  - 「精选集成」横向滚动卡片（scroll-snap）
  - 「解决方案伙伴」栅格展示
- **伙伴目录（channel）**：`templates/channel.liquid`（推荐路径 `/partner-hub`）
  - 左侧筛选：类型 / 地区 / 等级
  - 右侧列表：伙伴卡片（logo、标签、摘要、按钮）
  - 目录子页面：每个伙伴一条 `page` 详情
- **伙伴详情（page）**：`templates/page.liquid`
  - 标题、Slogan、标签、CTA（安装/联系）、官网
  - 富文本正文 + 资源链接（按行解析）+ 联系邮箱 + 行业标签
  - 可选渲染反馈按钮（依赖全局开关与平台插件）
- **静态页：成为伙伴**：`statics/become-a-partner.liquid`（通常路径 `/become-a-partner`）
  - 多步表单，最终以 **feedback** 表单提交（若平台启用 feedback 插件且允许留言）
- **静态页：dashboard**：`statics/dashboard.liquid`（通常路径 `/dashboard`）
  - 运营入口页，提供目录入口与示例图（`assets/images/dashboard.jpg`）

补充：
- 搜索页：`templates/search.liquid`
- 标签页：`templates/tag.liquid`
- 近期页：`statics/recent.liquid`

示例数据：
- 站点级设置示例：`seeds/001_site.yml`
- 伙伴条目示例：`seeds/002_pages.yml`

## 全局配置项（站点级 settings）

主题的站点级配置位于 `config/settings_schema.json`，常用项包括：

- **`partner_lead_email`**：线索接收邮箱（用于运营侧统一收件；实际触发点以平台为准）
- **`partner_type`**：伙伴类型文本列表（多行，每行一个）
- **`partner_region`**：伙伴地区文本列表（多行，每行一个）
- **`partner_tier`**：伙伴等级文本列表（多行，每行一个）
- **`sort_rule`**：目录/首页使用的排序规则（默认 `-created_at`）
- **`is_allow_feedback`**：是否允许展示反馈入口（仅在平台 feedback 插件可用时生效）
- **`is_allow_header` / `is_allow_footer`**：是否渲染页头/页脚
- **`head_html` / `header_menu_html` / `footer_menu_html`**：自定义 HTML 注入（请注意安全与样式一致性）

### `partner_type / partner_region / partner_tier` 的解析方式（重要）

这三个配置项的值是**多行文本**，主题侧按「换行拆分」读取：

- 写法：每行一个选项，例如（默认值）
  - `partner_type`：技术&集成 / 渠道&服务商
  - `partner_region`：北美 / 北欧 / 亚太
  - `partner_tier`：金牌 / 银牌
- 读取逻辑：主题使用 `strip | newline_to_br | split: '<br />'` 拆分为数组，并按索引取值（例如：类型的第 1 行视为“integration 显示名”，第 2 行视为“agency 显示名”）。

注意：
- **不要留空行**，否则某些默认回退逻辑会生效（见「已知问题/注意事项」）。
- 建议保持**顺序稳定**，避免与旧值兼容映射发生偏差。

## 内容录入指南（伙伴条目怎么填）

每个伙伴条目使用 `templates/page.liquid`，核心字段均在 `page.settings.*`：

- **基础信息**
  - **标题**：`title`（不填则回退 `page.link_text`）
  - **一句话介绍**：`tagline`（用于目录卡片摘要与详情页 header）
  - **Logo**：`logo_image_url`
  - **正文**：`body`（富文本）
- **分类字段（用于筛选与标签展示）**
  - **伙伴类型**：`partner_type`（choices_from：`$site.partner_type`）
  - **地区**：`region`（choices_from：`$site.partner_region`）
  - **等级**：`partner_tier`（choices_from：`$site.partner_tier`）
- **转化与链接**
  - **官网**：`website_url`
  - **行动链接**：`action_link`（如“安装 / 联系 / 预约演示”等）
  - **行动按钮文案**：`action_label`（可选；未填会按类型给默认文案）
- **侧边栏**
  - **资源链接**：`resource_links`（按行解析）
    - 推荐格式：`标题 | https://example.com`
    - 也兼容仅填 URL：`https://example.com`
  - **联系邮箱**：`contact_email`
  - **行业**：`industries`（支持逗号/中文逗号/换行分隔）

运营建议（非强制）：
- 目录卡片摘要会在 `tagline` 为空时回退到正文纯文本截断；建议至少维护 `tagline` 以保证卡片一致性。

## 筛选逻辑与兼容说明（旧值仍兼容）

目录页筛选发生在 `templates/channel.liquid`：

- 卡片上会写入 `data-partner-type / data-region / data-tier`，点击筛选按钮后用前端 JS 进行显示/隐藏。
- **兼容旧值**：历史内容可能保存为短码（例如 `integration` / `agency` / `na` / `nordic` / `apac` / `gold` / `silver`）。
  - 主题会把这些旧值映射为站点配置的显示文案（按上述多行列表的第 N 行取对应显示名）。
  - 因此即使你已将站点配置改为中文（如“技术&集成”），旧内容仍可正常筛选与展示。

## 构建与开发

### 环境要求

- Node.js（版本以团队基建为准）
- 包管理：仓库内已包含 `yarn.lock`，也可用 npm（以团队约定为准）

### 常用命令

```bash
# 安装依赖
yarn install

# 开发：监听并实时编译到 assets/
yarn dev

# 构建：一次性输出到 assets/
yarn build

# 可选：本地 livereload（需要 Ruby 环境）
yarn livereload
```

### 构建产物与约束

- CSS：`src/stylesheets/application.css` → `assets/stylesheets/application.css`（Tailwind CLI）
- JS：`src/javascripts/application.js` → `assets/javascripts/application.js`（esbuild bundle）
  - `--format=iife`
  - `--target=es2015`
  - 显式关闭 `optional chaining` / `nullish coalescing`（保证更旧环境兼容）

发布时请确保 `assets/` 目录中产物已更新（主题包以仓库内容为准）。

## 已知问题 / 注意事项

- **favicon 404（可选）**：若站点未配置或未上传 favicon，浏览器可能请求默认路径导致 404；这通常不影响功能，可按需在平台侧配置。
- **全局设置未保存导致筛选项为空**：`partner_type / partner_region / partner_tier` 若为空行或整体为空，模板会回退到内置默认文案（并影响旧值映射）。上线前建议逐项检查并保存。
- **反馈表单依赖平台插件**：`/become-a-partner` 页面需要平台启用 feedback 插件且允许留言时才会出现可提交的表单；否则会显示不可用提示（以平台为准）。

## 变更记录（本次主要改动概览）

以下为本次主题迭代的主要变化（便于新同事接手定位）：

- **移除 JSON-LD**：不再在 `layout/theme.liquid` 的 `<head>` 注入伙伴详情 JSON-LD。
- **统一浅色主题**：整体背景与卡片样式调整为浅色体系，更贴合伙伴门户的展示场景。
- **首页精选区横向滚动卡片**：使用 scroll-snap 的横向滚动，移动端可滑动浏览。
- **成为伙伴表单改为 feedback 提交**：`statics/become-a-partner.liquid` 最终步骤通过 feedback 表单提交消息（依赖平台插件）。
- **新增 dashboard 静态页**：`statics/dashboard.liquid`，用于运营入口与导航聚合。
- **修复筛选逻辑与旧值兼容**：目录页对 `integration/agency/na/apac/gold/silver` 等旧值做显示文案映射，保证历史内容可继续筛选。
