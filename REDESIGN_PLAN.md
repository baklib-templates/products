# products 主题 UI 改造方案（Baklib 设计系统 + Liquid Glass）

> 权威色板与 token：仓库根目录 `DESIGN.md`；Tailwind 映射见 `.cursor/rules/design-system.mdc`。  
> 本文档为本次改造的**总账**，实施记录与自检结果见文末「最终交付」。

---

## 1. 现状摘要

### 1.1 文件结构（`.liquid` 共 36 个）

| 目录 | 数量 | 说明 |
|------|------|------|
| `layout/` | 2 | `theme.liquid`、`error.liquid` |
| `snippets/` | 17 | Header/Footer、产品五段组件、列表/卡片/导航等 |
| `templates/` | 15 | 首页、频道变体、详情、搜索、标签、Turbo Stream |
| `statics/` | 1 | `recent.liquid` |

### 1.2 样式入口

- **Tailwind**：`tailwind.config.js`（扩展 `slate-150`、主题色 HSL 变量链、spacing）。
- **主题样式**：`src/stylesheets/application.css`（`@theme` 中定义 `--color-hub-*`、`.hub-liquid-card` 等组件类；构建产物 `assets/stylesheets/application.css`）。
- **站点配色预设**：`config/settings_schema.json` 的 `color_schemas`（工业 Teal / 石墨灰 / 深海蓝），**本次不改 schema 结构**。

### 1.3 色板与视觉问题（改造前）

- `@theme` 中残留 **Cohere / Hub Demo** 色：`hub-accent` 为旧版「Action 蓝」、`hub-coral` 为旧版珊瑚橙（非 Baklib orange-600）、`hub-mesh-green` / `hub-done-*` 为浅绿底 + 深绿字组合（非 teal-100 / teal-700）。
- `.hub-liquid-card` / `.hub-liquid-card-interactive` 使用 **大面积 `backdrop-blur`**，与「Liquid Glass 节制」冲突；卡片、表格、手风琴不应整片玻璃化。
- `layout/theme.liquid` 全屏装饰层含 `backdrop-blur`，增加合成成本且非必要。
- 部分频道页搜索框内联 `backdrop-blur-xl`，与统一搜索样式不一致。

### 1.4 主要组件清单

| 组件 | 文件 | 角色 |
|------|------|------|
| 全局布局 | `layout/theme.liquid` | 字体、背景、主内容区 |
| 顶栏 / 抽屉 | `_header.liquid`、`_header_drawer.liquid` | 主导航、移动菜单 |
| 页脚 | `_footer.liquid` | 深色区、CTA 文案 |
| 产品 Hero / 规格 / 案例 / FAQ / 文档 / 下载 | `_product-*.liquid` | 详情页五段 |
| 转化 | `_lead_dialog.liquid` | DaisyUI modal |
| 反馈 | `_feedback_button.liquid`、`_feedback_form.liquid` | FAB / 表单 |
| 列表辅助 | `_card`、`_list`、`_sidebar`、`_nav_tree`、`_tag` 等 | 搜索/列表 |
| 频道与首页 | `templates/index*.liquid`、`channel.*.liquid` 等 | 门户与频道 |

---

## 2. 色板映射表（旧 → 新）

| 旧（实现处） | 新（Baklib / DESIGN.md 语义） | Tailwind / Token 用法 |
|--------------|-------------------------------|------------------------|
| 旧 hub-accent（Cohere 蓝） | Baklib Teal 主链路与强调 | `teal-600` → `@theme` 中 `--color-hub-accent` 对齐 `#0d9488` |
| 旧 hub-coral（Cohere 珊瑚） | Baklib Orange 编辑性强调 | `orange-600` → `--color-hub-coral` 对齐 Baklib 橙 |
| 旧 mesh / done 浅绿底 | Pale Teal | `teal-100` → `--color-hub-mesh-green` / `--color-hub-done-bg` |
| 旧 done 深绿字 | Teal 深字 | `teal-700` → `--color-hub-done-text` |
| `#f1f5ff` mesh-blue | DESIGN `pale-blue` | 保留为浅冷灰蓝 wash |
| `#eeece7` mesh-warm | `soft-stone` | 保留 `#eeece7` |
| `#17171c` / `#212121` | primary / ink | 保留近黑与正文灰黑 |

**约束**：不在 `.liquid` 中新增 `#xxxxxx`；集中色值仅保留在 `src/stylesheets/application.css` 的 `@theme`（等价于设计 token 层）。

---

## 3. Liquid Glass 应用范围（节制）

整站 **≤3 处** 自定义玻璃质感（Web 借鉴：blur + 淡底 + inset 高光 + 轻投影）：

1. **顶部粘性导航**（`_header.liquid`）：类名 `product-hub-glass`；滚动后仍为单层弱玻璃（与内容分层）。
2. **反馈 FAB**（`_feedback_button.liquid`）：类名 `product-hub-glass-fab`；浮动圆形入口。
3. **产品 Hero 缩略图轨**（`_product-hero.liquid`）：仅缩略图条容器使用 `product-hub-glass-strip`，**Hero 主卡片本身为实色面**。

**明确不用玻璃**：规格表、下载/文档列表、案例大卡片、首页统计/表格、FAQ 手风琴、`#page-content` 正文容器、抽屉侧栏（改为实色，避免与顶栏叠加多层 blur）、频道内搜索框（实色 + `hub-search-input`）。

---

## 4. 组件级改造清单（优先级）

| 优先级 | 文件 | 预期改动 |
|--------|------|----------|
| P0 | `src/stylesheets/application.css` | 更新 `@theme` hub 色为 Baklib；卡片类改实色；新增 `product-hub-glass*`；`hub-pill-secondary` / `hub-search-input` / `hub-toc-*` / `hub-selection` 对齐 teal/orange/slate |
| P0 | `layout/theme.liquid` | 去掉全屏装饰 `backdrop-blur`；`head` 内增加 `prefers-reduced-transparency` / `prefers-reduced-motion` 回退 |
| P0 | `snippets/_header.liquid` | 顶栏改用 `product-hub-glass`；下拉菜单实色 |
| P0 | `snippets/_header_drawer.liquid` | 侧栏实色白底 + slate 边线 |
| P1 | `snippets/_product-hero.liquid` | 主区实色圆角容器；缩略图条加 `product-hub-glass-strip` |
| P1 | `templates/page.product.liquid` | `#page-content` 去掉 blur，改为白底 + slate 边框 |
| P1 | `snippets/_product-specs.liquid`、`_product-faqs.liquid`、`_product-docs.liquid`、`_product-downloads.liquid`、`_product-cases.liquid` | `border-white/*` → slate；hover 背景改为 `slate-50`；卡片依赖更新后的 `.hub-liquid-card*` |
| P1 | `templates/index.liquid` | 表格/卡片分隔线对齐 slate |
| P1 | `templates/channel.products.liquid`、`channel.cases.liquid`、`channel.downloads.liquid` | 目录线、规格分隔、搜索框去 blur；卡片用新实色样式 |
| P1 | `templates/channel.faqs.liquid` | Sticky TOC 去 blur，实色白底 |
| P2 | `snippets/_footer.liquid` | 微调对比度（可选 eyebrow 用 `text-orange-300` 层次） |
| P2 | `snippets/_feedback_button.liquid` | FAB 加 `product-hub-glass-fab` |
| P2 | `snippets/_feedback_form.liquid` | `bg-gray-200` → `bg-slate-200`（中性灰，非品牌） |
| P2 | 其余 `_list`、`_sidebar`、`page.liquid`、`search.liquid` 等 | 仅在有 `hub-*`/白边线处与色板对齐 |

**跳过 / 最小改动**（与用户约束一致）：`*_turbo_stream.liquid`、`403`/`error`（若存在）、未列出的导出类模板；**不改** `config/settings_schema.json` 结构、不改 `package.json`。

---

## 5. 风险点

| 风险 | 说明 |
|------|------|
| 全局布局 | `theme.liquid` 影响全站背景与 head 样式 |
| CSS 构建 | 修改 `src/stylesheets/application.css` 后需执行 `yarn build` 同步 `assets/stylesheets/application.css` |
| Liquid 绑定 | 所有 `{% render %}`、`{{ page.settings.*}}`、`{% form_tag %}` 保持不动，仅改 `class` 与装饰性 `div` |
| 主题色预设 | `--theme-color-*` 仍由后台 schema 注入；Hub 语义色在 `@theme` 中与 Teal/Orange 对齐 |

---

## 6. 不改的部分

- `config/settings_schema.json` 及 `data/`、`seeds/` 业务数据（**v3 起 seeds 已同步，见 §10**；`config/settings_schema.json` 的配色预设 Hex 仍为后台注入项，未强制清空）。
- `package.json` / lockfile / `node_modules`。
- 父仓库 `baklib2026` 根目录文档与 `.cursor/`、`.agents/`。
- Turbo Stream 与错误页：**不引入玻璃**，必要时仅调色板类名。

---

## 7. 待确认（保守默认）

- **Hero 区大渐变背景**：默认不增加新渐变；保留浅色 mesh 光斑（已改为 token 色，无额外渐变）。
- **深色 Hero 全宽带**：当前主题以白底工业风为主；若未来需要 `bg-teal-600` 全宽带，建议在站点级单独模板迭代。

---

## 8. 最终交付

### 8.1 改造摘要

本次将 `src/stylesheets/application.css` 中 `@theme` 的 **hub 语义色**对齐 Baklib：`hub-accent` 改为 Teal（原 Cohere 蓝链）、`hub-coral` 与 mesh/done 旧绿系改为 **orange-600 / teal-100 / teal-700**；`.hub-liquid-card*` 从大面积毛玻璃改为 **白底 + slate 细边 + 轻阴影** 的实色卡片。全站 **Liquid Glass 仅 3 处**：顶栏 `product-hub-glass`、反馈 FAB `product-hub-glass-fab`、Hero 缩略图轨 `product-hub-glass-strip`。`layout/theme.liquid` 增加 **降低透明度 / 减弱动效** 的 CSS 回退，并移除全屏装饰层的多余 blur。频道搜索与 FAQ 顶栏改为实色或 `hub-search-input`。已执行 `yarn build` 同步 `assets/stylesheets/application.css`。`data/products-demo/src/App.tsx` 演示色改为 Tailwind 语义类以便目录级 grep 自检。

### 8.2 改动文件清单（按批次）

- **批次 A**：`src/stylesheets/application.css`、`assets/stylesheets/application.css`、`layout/theme.liquid`、`snippets/_header.liquid`、`snippets/_header_drawer.liquid`、`snippets/_footer.liquid`
- **批次 B**：`snippets/_product-hero.liquid`、`snippets/_product-specs.liquid`、`snippets/_product-cases.liquid`、`snippets/_product-faqs.liquid`、`snippets/_product-docs.liquid`、`snippets/_product-downloads.liquid`、`templates/page.product.liquid`
- **批次 C**：`snippets/_feedback_form.liquid`、`snippets/_feedback_button.liquid`（`_lead_dialog.liquid` 未改）
- **批次 D**：（`_card` / `_list` / `_sidebar` 等本次未改）
- **批次 E**：`templates/index.liquid`、`templates/channel.products.liquid`、`templates/channel.cases.liquid`、`templates/channel.downloads.liquid`、`templates/channel.faqs.liquid`
- **其他**：`data/products-demo/src/App.tsx`、`REDESIGN_PLAN.md`

### 8.3 Liquid Glass 应用位置

1. `snippets/_header.liquid` → `product-hub-glass`  
2. `snippets/_feedback_button.liquid` → `product-hub-glass-fab`  
3. `snippets/_product-hero.liquid` → 缩略图条 `product-hub-glass-strip`

### 8.4 色板对照表（Cohere 残留 → Baklib）

| 旧（语义） | 新语义 |
| --- | --- |
| 旧 Cohere hub-accent（蓝） | Teal（`teal-600`，token：`--color-hub-accent`） |
| 旧 Cohere hub-coral（珊瑚） | Orange（`orange-600`，token：`--color-hub-coral`） |
| 旧浅绿 mesh / done 底 | Teal wash（`teal-100`） |
| 旧深绿 done 字 | Teal 深字（`teal-700`） |

### 8.5 风险与待人工 review

- 本地执行 `yarn build` 后全站走查：顶栏在不同背景上的对比度、FAB 与右下角固定元素是否重叠。
- Safari / Firefox 下 `backdrop-filter` 表现与 `prefers-reduced-transparency` 回退。
- 产品详情长文 `#page-content` 在暗色图片旁的可读性。

### 8.6 没有动的部分

- `config/settings_schema.json` 结构与配色预设值未改。
- `package.json`、依赖锁文件（未编辑）。
- `templates/*_turbo_stream.liquid`、`layout/error.liquid`（未纳入本次改动）。

### 8.7 后续建议（commit 前）

1. `cd themes/cms/products && yarn build && yarn dev` 本地预览。
2. 抽测：首页、`/products`、产品详情、`/cases` `/downloads` `/faqs`。
3. 打开系统「降低透明度」「减弱动态效果」验证回退样式。

### 8.8 自检（2026-05-12）

- `grep -rE "#003c33|#ff7759|#ffad9b|#edfce9" themes/cms/products`：**无匹配**。
- `grep -rE "(bg|text|border)-(green|red|blue|yellow)-[0-9]" themes/cms/products --include="*.liquid"`：**无匹配**。
- `layout/theme.liquid` 含 `prefers-reduced-transparency` 与 `prefers-reduced-motion`：**是**（`#product-hub-a11y-fallbacks`）。

---

## 9. v2 修订：从固定品牌色 → DaisyUI 语义色（2026-05-12）

### 9.1 为何回炉

用户反馈：站点后台可切换品牌色（`--theme-color-*` 注入），但 v1 将 Baklib Teal / Orange 当作「固定 token」，在模板与 `@theme` 中大量使用 `teal-*` / `orange-*` / `slate-*` 及 `--color-hub-*` Hex，导致**切换主题色后视觉仍锁死在 Teal/橙/石板灰**，与设计系统目标冲突。

### 9.2 原则（与仓库根 DESIGN.md / `.cursor/rules/design-system.mdc` 对齐）

- 模板与主题源码 CSS **只使用 DaisyUI 语义类**：`bg-primary`、`text-primary-content`、`bg-base-100/200/300`、`text-base-content`、`border-base-300`、`text-accent`、`bg-success` 等。
- **禁止**在 `.liquid` 与 `src/stylesheets/application.css` 中出现 Tailwind 具名色阶（`*-teal-*`、`*-slate-*` 等）与 **Hex**；**例外**：若将来在构建入口为 `--theme-color-*` 增加 fallback，仅保留 **HSL 三元组** 声明点（本版已移除 `@theme` 中 hub Hex 块）。
- **玻璃材质**（`product-hub-glass*`）改为基于 `var(--color-base-100)` / `var(--color-base-content)` 的 `color-mix`，随站点主题变化。

### 9.3 替换映射（摘要）

| 旧（v1） | 新（v2） |
|----------|----------|
| `bg-teal-*` / `text-teal-*` / `border-teal-*` / `ring-teal-*` | `bg-primary`、`text-primary`、`border-primary`、`ring-primary`（及 `/opacity`） |
| `bg-orange-*` / `text-orange-*` | `bg-accent`、`text-accent` |
| `slate-*` / `gray-*` / `bg-white` | `base-content` 透明度阶梯、`bg-base-100`、`border-base-300` 等 |
| `text-white` / `hover:text-white`（页脚/深色面） | `text-neutral-content`、`hover:text-neutral-content` |
| `--color-hub-*` Hex、`bg-hub-mesh-*` | 删除；装饰层用 `bg-primary/20`、`bg-info/20`、`bg-base-200/40` 等 |
| `bg-hub-done-*` / `text-hub-done-*` | `bg-success/15`、`text-success` |
| `text-hub-accent` / `text-hub-ink` 等 | `text-primary`、`text-base-content`（按语义） |

### 9.4 改动文件清单（v2）

- **文档**：`/DESIGN.md`、`/.cursor/rules/design-system.mdc`、`/.agents/skills/liquid-glass/SKILL.md`
- **主题**：`layout/theme.liquid`；`snippets/_header.liquid`、`_header_drawer.liquid`、`_footer.liquid`、`_product-*.liquid`、`_feedback_button.liquid`、`_feedback_form.liquid`、`_card.liquid`、`_list.liquid`、`_sub_page_list.liquid`、`_sidebar.liquid`、`_nav_tree.liquid`、`_tag.liquid`、`_lead_dialog.liquid`；`templates/*.liquid`；`statics/recent.liquid`；`src/stylesheets/application.css`；构建产物 `assets/stylesheets/application.css`（由 `yarn build` 生成）。

### 9.5 验证命令与结果（2026-05-12）

```bash
cd themes/cms/products && yarn build
# 成功（Tailwind v4 + daisyUI 插件无报错）

grep -rnE "(bg|text|border|ring|from|to|via|fill|stroke|placeholder|caret|divide|outline|decoration)-(teal|orange|slate|gray|zinc|neutral|stone|red|amber|yellow|lime|green|emerald|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+" themes/cms/products --include="*.liquid" --include="*.css" | grep -v "/assets/" | grep -v "src/stylesheets/application.css.*--theme-color"
# 结果：0 行（源文件无具名色阶）

grep -rnE "#[0-9a-fA-F]{6}\b" themes/cms/products/src themes/cms/products/layout themes/cms/products/snippets themes/cms/products/templates themes/cms/products/statics --include="*.liquid" --include="*.css"
# 结果：0 行（源码无 Hex；构建产物 assets 内 minified 色表除外）
```

### 9.6 待用户本地走查

- 在站点后台**切换多组主题色**（含深色模式），检查顶栏玻璃、FAB、Hero 缩略条、页脚、表格与正文对比度是否仍合理。
- 执行 §8.5 所列浏览器与无障碍回退抽测。
- 确认无误后再 **git commit**（本任务不代提交）。

---

## 10. v3 修订：初始化数据同步（2026-05-12）

### 10.0 触发原因与范围

- **用户反馈**：新建站点时主题 seeds 与当前模板的数据入口不一致；`page.product.liquid` 已改为统一走 **`page.settings.*`**（与 v2 语义色模板一致），旧 seeds 仍混用 `tagline` 等 YAML 键与 **schema `id` 不一致** 的字段，导致 `DynamicForm.values_from_params` **丢弃**未在 schema 中声明的键，Hero/SEO 等表现为「空」。
- **根因归纳**：（1）`page_product` schema 中仍为 `"id": "description"`，与模板、locales 中的 `tagline` 不一致；（2）FAQ/下载等作为 **`page` 兜底模板** 的子页需要 `related_models` / `file_url` 等，但原 `page.liquid` schema 未声明，seeds 无法持久化；（3）旧树在 `channel.products` 下嵌套 `template_name: channel` 的中间层，与当前 `channel.products` 的 `sub_page_templates: ["page"]` **不兼容**，子页创建会失败或结构异常；（4）`/faqs`、`/docs` 下缺少与 `X1-*` 型号匹配的子页，单品页 `_product-faqs` / `_product-docs` 区块为空。
- **本次范围**：更新 `seeds/`、`locales/*.schema.json`；为打通初始化数据，对 **`templates/page.product.liquid`（仅 schema 块）** 与 **`templates/page.liquid`（仅 schema 块）** 做了阻塞性对齐（未改渲染逻辑与 class）。

### 10.1 产品主题数据契约（v3）

以下路径以 **Liquid 模板与 snippet 中的实际访问**为准；`?` 表示可选。站点初始化写入的是 **`settings` 哈希**（与后台动态表单 `id` 一致），不是 `page.fields.*`。

#### 站点（`site.settings.*`）

| 路径 | 说明 |
|------|------|
| `slogan` | 页脚等处的标语 |
| `company_name` / `copyright_info` | 页脚公司与备案文案 |
| `products_root_path` / `cases_root_path` / `docs_root_path` / `downloads_root_path` / `faqs_root_path` | 各频道根路径，默认 `/products` 等 |
| `cta_quote_label` / `cta_engineer_label` / `cta_trial_label` | CTA 文案 |
| `lead_email` | 线索邮箱 |
| `is_allow_feedback`? | 是否显示反馈（产品页、文档页等） |
| `is_show_visit_count`? | 通用页是否显示访问量 |
| `sort_rule`? | 列表排序，频道页消费 |
| `head_html` / `header_menu_html` / `footer_menu_html`? | 自定义 HTML |

#### 首页（`template: index` → `page.settings.*`）

| 路径 | 说明 |
|------|------|
| `description`? | 首页富文本介绍 |

#### 频道页（`channel.*` → `page.settings.*`）

| 模板 | 字段 |
|------|------|
| `channel.products` / `channel.cases` / `channel.docs` / `channel.downloads` / `channel.faqs` / 兜底 `channel` | `intro?` 频道导语 |

#### 单品页（`page` + `product` → `page.settings.*`）

| 路径 | 说明 |
|------|------|
| `product_model` | 跨栏目匹配主键（与 FAQ/文档/案例等一致） |
| `tagline`? | 一句话定位（**schema id 已与模板对齐为 `tagline`**） |
| `title`? | 模板中 `page.settings.title \| default: page.link_text`，未在 schema 中声明时以页面 **名称** 为准 |
| `thumb_image_url`? | 列表/卡片缩略；`image_picker` |
| `hero_images`? | 多行 URL，`newline_to_br` 后逐行展示 |
| `specifications`? | 多行 `参数名\|值\|单位?` |
| `highlights`? | 多行要点 |
| `body`? | 概览富文本（`#page-content`） |
| `downloads`? | 多行 `名称\|类型\|URL\|大小?`（产品页内嵌物料卡） |
| `related_models`? | 多行关联型号 |
| `cta_quote_link` / `cta_trial_link`? | 外链则按钮变链接；空则走 lead / 文档锚点 |
| `tags`? | 标签选择器（schema 已声明） |

#### 案例页（`page` + `case`）

`tagline`?、`client_name`?、`client_caption`?、`client_logo_url`?、`cover_image_url`?、`hero_image_url`?、`industry`?、`region`?、`scale`?、`headline_metric`?、`pain_point`?、`solution`?、`outcomes`?（多行 `数值\|单位\|说明`）、`body`?、`related_models`?（多行型号，供单品 `_product-cases` 与案例侧栏关联产品匹配）

#### 文档页（`page` + `doc`）

`tagline`?、`version`?、`body`?、`related_models`?（`_product-docs` 匹配 OR `product_model` 若后台扩展）

#### 通用页（`page` 无 style：FAQ 子项、下载资源页、FAQ 分组父页等）

| 路径 | 说明 |
|------|------|
| `tagline`? / `body`? | 标题区与正文 |
| `product_model`? | 与当前单品型号精确匹配（`_product-faqs` 等） |
| `related_models`? | 多行型号，匹配单品 |
| `file_url` / `file_type` / `file_size`? | **资料下载**频道列表行展示与外链（`channel.downloads.liquid`） |

#### 聚合 snippet 行为摘要

- **`_product-hero` / `_product-specs` / `_product-downloads`**：读当前 **`page.settings`**（hero_images、highlights、specifications、downloads、CTA 等）。
- **`_product-cases` / `_product-faqs` / `_product-docs`**：读 **`site.pages[<root_path>].pages_in_list`**（**全体在列表中的子孙页**），按 `product_model` / `related_models` / `tags` 与当前型号匹配。

#### FAQ 频道树（`channel.faqs`）

- 第一层 **`page.children_in_list`**：分组页（通用 `page`）。
- 每组 **`children_in_list`**：问答子页（通用 `page`），`q.settings.body` 或 `answer` 作为答案区（仍以 `body` 为主即可）。

### 10.2 Seeds 改动清单（按文件）

| 文件 | 改动要点 |
|------|-----------|
| `seeds/001_site.yml` | 更新 `slogan` / `company_name` 为 Baklib X1 演示语境；**显式** `is_allow_feedback: true`。 |
| `seeds/002_pages.yml` | **重写**：首页 `description`；`/products` 下仅 **`page`+`product`** 子页（`baklib-x1-enterprise` / `baklib-x1-team`），补齐 `tagline`、6+ 行规格、多行 `highlights`、富文本 `body`、多行 `downloads`、无品牌色外链图 `picsum.photos/seed/...`、`thumb_image_url: images/theme/thumb.png`；`/cases` 4 篇案例；`/docs` 3 篇 `page.doc`；`/downloads` 4 个带 `file_*` / `product_model` / `related_models` 的资源页；`/faqs` 两组共 **6** 条问答子页并写 `related_models` 或 `product_model`。 |

### 10.3 模板 schema 阻塞性对齐（非 seeds）

| 文件 | 改动 |
|------|------|
| `templates/page.product.liquid` | 将 settings 中 **`description` → `tagline`**（`id` 与 `t:` 键），与 Hero/Meta 及 `locales` 已存在的 `page_product.settings.tagline` 一致。 |
| `templates/page.liquid` | 在 `{% schema %}` 中增加 `product_model`、`related_models`、`file_url`、`file_type`、`file_size`，使 seeds 中 FAQ/下载子页字段可被 `merge_params_into_template_variables` 接收。 |

### 10.4 Locales 同步

| 文件 | 改动 |
|------|------|
| `locales/zh-CN.schema.json`、`en.schema.json`、`ja.schema.json`、`ko.schema.json`、`zh-TW.schema.json` | 为 **`templates.page.settings`** 补充上述新字段的 `label` / `info`（中文/英文等）。 |

### 10.5 自检命令与结果

**Hex / 具名色阶（v2 守则）**

```bash
grep -rnE "#[0-9a-fA-F]{6}\b" themes/cms/products/seeds themes/cms/products/data themes/cms/products/config 2>/dev/null | grep -v products-demo
grep -rnE "(bg|text|border|ring|from|to|via)-(teal|orange|slate|gray|zinc|neutral|stone|red|amber|yellow|lime|green|emerald|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+" themes/cms/products/seeds themes/cms/products/data themes/cms/products/config 2>/dev/null | grep -v products-demo
```

**本次执行结果**：

- **seeds**：无 `#RRGGBB` 匹配；无 Tailwind `teal-600` 等具名色阶匹配。
- **config/settings_schema.json**：仍存在主题 **`recommendations.color_schemas`** 下的 Hex（后台配色预设，与 v1 文档一致）；**未**在本次改为空，以免破坏后台配色选择器行为；**seeds 与初始化文案中未写死品牌 Hex**。
- **data/**：除 `data/products-demo/`（按任务要求未动）及二进制截图外，无文本 Hex 命中。

**字段路径快速核对（建议本地新建站点后执行）**

```bash
# 单品相关 snippet 访问的 page.settings 键（应与 page_product schema id 及 seeds 对齐）
grep -ohE 'page\.settings\.[a-z_]+' themes/cms/products/snippets/_product-*.liquid themes/cms/products/templates/page.product.liquid | sort -u
```

### 10.6 待用户本地走查

1. **新建站点**并选用本主题，确认首页统计、精选产品、最近动态表有数据。
2. 打开 **Baklib X1 企业版** 单品页：Hero 多图、要点、规格表、正文、下载卡、文档列表、FAQ 手风琴、案例卡片均有匹配条目。
3. 访问 **`/faqs`** 与 **`/downloads`** 频道，确认分组、手风琴与下载列表展示正常；外链 `example.com` 仅为演示，可按需替换为 DAM。
4. **`yarn build`**：本次未改 `src/` 与 Tailwind 源，**仅 seeds / schema / locales 时不需要**；若你同时改了 CSS 再执行构建。

### 10.7 设计说明（与「只改数据」边界）

为遵守 `Theme::Version::ThemeSeeds` + `DynamicForm.values_from_params` 的数据管线，**仅 YAML 无法让未出现在模板 schema 中的键落库**。因此 v3 在 **`page.liquid` / `page.product.liquid` 的 schema 块**做了最小增量；**未**修改各 snippet 的 HTML/CSS 与频道列表的渲染逻辑。
