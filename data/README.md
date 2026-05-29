# products（Product Hub）主题数据目录说明

本目录用于沉淀 [`themes/cms/products`](../) 主题的参考数据与素材（行业案例、截图、原始站点片段等），方便后续补齐配置、对齐实现与验收。

> 与平台相关的能力、字段类型、插件开关等以 Baklib 平台实际表现为准；本 README 关注**信息架构与交互范式**层面的对照与启发。

---

## 本模板定位（B2B 产品数字资产枢纽 / PIM 门户）

「products」类站点在现实中跨度极大（电商货架、纯 PIM 后台、应用商店、产品 wiki、产品宣传画册等）。**本主题优先服务的形态是：B2B 产品数字资产枢纽（Product Hub）**——以**单品**为锚点，通过「**中心辐射（Hub and Spoke）**」结构聚合：

- **紧耦合**：当前产品自身的参数表、主图、物料库（与具体型号绑定）。
- **松耦合**：跨栏目的客户案例、技术文档、知识库问答（由型号 / 关联型号 / 标签反向匹配）。

本质上，它仍然是一个**资源与内容管理平台**（CMS / 资源中台的产品向落地），主要受众是 **B2B 客户的工程师与采购方**，而**不是面向终端消费者的电商站**。

### 本枢纽应覆盖的能力（产品级 checklist）

1. **产品中心（选型）**  
   可按系列 / 分类 / 行业 / 关键参数检索产品；详情页支持多图、参数表、亮点、关联产品。

2. **客户案例库**  
   行业 / 场景 / 量化成果叙事；每个案例可反向引用 1 个或多个产品型号。

3. **技术文档库**  
   工程师手册、集成指南、版本变更；左目录 + 右正文 + 上下篇导航。

4. **资料下载库**  
   规格书、CAD、固件、白皮书等；带文件类型图标、关键字 / 类型过滤。

5. **常见问题（FAQ）库**  
   按分组 / 锚点导航，配手风琴折叠；每条 FAQ 可适用多个型号。

6. **转化动线（双向、去电商化）**  
   主 CTA 为「获取方案 / 联系工程师 / 申请试用」；**不出现**「立即购买 / 加入购物车 / 标价 / 库存」等电商化表达。

### 刻意不作为主参考的方向（边界说明）

下列形态**不是**本模板的主定位，仅作邻接领域调研：

- **纯 B2C 电商（货架 / 购物车 / 标价）**——主 CTA 是「Buy Now」「Add to Cart」，与本模板的「获取方案」叙事冲突。
- **纯应用市场 / 插件商店**（Install App、第三方开发者自助上架为主）。
- **泛创作者 / 专家市集**（按人接单、作品集为主）。

---

## PIM 与产品门户领域的「行业地图」

围绕「产品信息管理」与「产品对外呈现」，业内常见的工具与平台可分为以下几类。下文是**调研参照**，不表示本主题需 1:1 复刻其商业模块。

### 1. 纯血 PIM（产品信息管理平台）

承担产品主数据治理、属性建模、跨渠道分发，常与 ERP / DAM / 电商打通。

| 产品 | 官网 | 地位与要点 | 对 Baklib / 本主题的启发 |
|------|------|------------|-------------------------|
| **Akeneo** | [https://www.akeneo.com/](https://www.akeneo.com/) | 开源出身、市场份额领先的 B2B PIM；支持复杂属性建模、变体、多语言与多渠道导出。 | **属性结构**比单一 `body` 更接近 B2B 选型场景；模板侧应把「参数表」「亮点」「关联」做成独立结构化字段，而非全堆在富文本里。 |
| **Salsify** | [https://www.salsify.com/](https://www.salsify.com/) | PIM + 产品体验管理（PXM），强调 D2C 与电商主图、文案治理。 | 启示：**产品「资产 + 文案」可治理**；Product Hub 中物料库的版本与命名建议遵循一套**资产规范**。 |
| **inRiver** | [https://www.inriver.com/](https://www.inriver.com/) | 偏 B2B/制造业 PIM，强调与 DAM、CMS、电商的双向集成。 | 提示：Baklib Product Hub 适合做 PIM 之外的「**对外发布层**」，重检索/可读性，而非主数据存储。 |
| **Katana PIM** | [https://www.katanapim.com/](https://www.katanapim.com/) | 中腰部 PIM，提供 Find-a-partner 等基本目录交互。 | 卡片信息层级（Logo / 摘要 / 标签 / 行动）值得参考。 |

### 2. 数字目录 / 电子画册 SaaS（最贴近「产品对外呈现」的轻量工具）

把「产品资料」做成**可分享、可追踪、可分发**的 H5 / PDF 目录，受众是销售员与渠道伙伴。

| 产品 | 官网 | 地位与要点 | 对 Baklib Product Hub 的启发 |
|------|------|------------|-------------------------------|
| **智目录（iCatalog）** | [https://www.icatalog.cn/pc.index.html](https://www.icatalog.cn/pc.index.html) | 国内**轻量级产品目录 SaaS**：上传产品图 + Excel，一键生成可微信查看 / 邮件发送的目录；用户覆盖五金、工具、机械、医疗器材、服饰、玩具等 20,000+ 企业。 | 「**Excel 一键导入 + 微信扫码查看**」是国内中小外贸 / 制造企业的真实痛点；Product Hub 可在 [`page.product.liquid`](../templates/page.product.liquid) 的物料库与 [`channel.downloads.liquid`](../templates/channel.downloads.liquid) 上突出**轻量录入**与**微信侧分享**，避免企业另维护一个目录工具。 |
| **云展网（Yunzhan365）/ Product Catalog** | [https://www.yunzhan365.com/use/product-catalog/](https://www.yunzhan365.com/use/product-catalog/) | **交互式 H5 电子画册**：PDF 一键转 H5，嵌入视频 / 购买按钮 / 超链接 / 弹窗；带浏览量、停留时长、地域、热点点击图等数据追踪；多渠道分发（H5、iframe 嵌入、邮件、二维码）。 | 启示：① 单品页可借鉴**多媒体叠层**（视频 + 弹窗 + 跳转链接）；② Baklib 站点级访问数据可类比其「热点点击图」，作为运营复盘依据；③ 与其差异化：Product Hub 是**站点 / 门户**形态（SEO、独立路由、跨栏目关联），更适合做**长期门面**；电子画册更适合**短期销售物料**。两者可组合：站点提供「**详情页**」，把 H5 画册作为附件分享。 |

> **与 Baklib Product Hub 的差异 / 互补**：智目录 / 云展网的产出物是「**可分发的文档**」（H5 / PDF），生命周期短、围绕**单次销售触达**；Baklib Product Hub 的产出物是「**长期可访问的站点**」，围绕**自然流量 / 选型 / 文档 / 售后**形成内容资产闭环。建议在客户侧话术中明确：**门户做底座，画册做战术**。

### 3. CMS + DAM + 帮助中心组合（接近 Baklib「CaaS / 内容中台」叙事）

不少企业并不使用专业 PIM，而是用 **CMS + 帮助中心 + DAM** 组合搭建产品门户。常见栈：

- **Contentful** + 自建前端 + Cloudinary
- **Sanity** + Next.js + DAM
- **Strapi** + Astro/Nuxt + S3
- **Storyblok** + Visual Editor + 多语言

启发：B2B 产品门户的**性价比拐点**通常出现在「PIM 太重、纯静态站点太散」之间——这正是 Baklib Product Hub 的甜区。

### 4. 巨头 PIM / 电商套件的延伸模块

- **Salesforce Product Cloud**：与 CRM 一体，重型 B2B。
- **SAP Commerce / Hybris PCM**：制造业巨头标配 PIM。
- **Magento (Adobe Commerce) Catalog**：电商向，但属性建模能力较强。

这类方案实施周期长、许可成本高，本主题**不**作为主参考。

### Baklib Product Hub 的市场切入（差异化话术）

相对于动辄**年费十万级**的 PIM 套件或主打销售物料的电子画册 SaaS，Baklib Product Hub 可提炼为 **「轻量级 PIM 门户底座」**：

许多中腰部制造企业（出海硬科技、工业设备、医疗耗材、化工等）当下的痛点往往是：**别再用 PDF / 网盘把产品资料拼成「找不到」的散件**。

通过 Baklib 的 Product Hub 模板，可对外强调：

1. **开箱即用**：实施成本与周期显著低于 Akeneo / Salsify 等专业 PIM。
2. **门户向**：天然支持自然流量 / SEO / GEO，比电子画册更适合做**长期门面**。
3. **结构化**：在「参数表 / 物料库 / 文档 / FAQ / 案例」上做体系化沉淀，比纯 CMS 富文本更易检索。
4. **可组合**：与企业现有 PIM / ERP / DAM / 电子画册可并存（门户做对外**呈现层**）。

---

## 一、二级域名 / 路径关键字（subdomains & path keywords）

用于路由、采集标签或对照验收时的命名参考；已按本定位**收敛**为偏「产品 / 选型 / 资料 / 案例 / 文档」用词（不含 `cart` / `shop` / `buy` / `price` 等电商化关键字）。

> 约定：只写关键字本身，不含协议与主域名；线上可能是子域（`products.example.com`）或主站路径（`example.com/products`）。

```json
[
  "products",
  "catalog",
  "models",
  "specs",
  "datasheet",
  "downloads",
  "resources",
  "docs",
  "support",
  "cases",
  "stories",
  "industries"
]
```

---

## 二、行业案例 URL（cases）

可公开访问、可复现的链接，用于**产品门户 / PIM / 数字目录**的信息架构与交互对照（选型、参数表、物料库、案例叙事等）。

> 约定：使用完整 URL（含 `https://`）；括号内短备注用途。

**数字目录 / PIM / 产品聚合平台**

```text
- https://www.icatalog.cn/pc.index.html (智目录：国内轻量级产品目录 SaaS；Excel 录入 + 微信扫码查看)
- https://www.yunzhan365.com/use/product-catalog/ (云展网：交互式 H5 电子产品画册，含数据追踪与多渠道分发；产品目录场景页)
- https://www.akeneo.com/product-catalog/ (Akeneo：PIM 厂商的目录解读页；可参考其「单品多渠道分发」叙事)
- https://www.katanapim.com/find-a-partner (Katana PIM：列表型目录的筛选与卡片信息层级)
- https://www.centricsoftwarechina.com/products (Centric Software：B2B 产品聚合页；分区与导航入口)
- https://www.salsify.com/platform/digital-shelf (Salsify：数字货架页；可参考多媒体叠层与转化引导)
```

**资料下载中心（download hub）参考**

工业巨头的官方资料库通常承担「**产品族 × 文档类型 × 语言 × 版本**」的多维检索能力，是本主题 [`channel.downloads.liquid`](../templates/channel.downloads.liquid) 与 [`_product-downloads.liquid`](../snippets/_product-downloads.liquid) 的标杆参照。

```text
- https://library.abb.com/ (ABB Library：电气 / 自动化 / 机器人巨头的官方资料库；多产品线 × 文档类型 × 语言 × 版本的多维检索范式，下载中心标杆)
```

ABB Library 值得借鉴的设计点：

1. **入口即检索框**——首屏没有营销文案，直接是「**关键词 + 类目筛选**」，符合工程师「来即取走」的真实使用动机；
2. **多维筛选并存**——按 *Document Kind*（手册 / 数据表 / 固件 / 软件包）、*Language*、*Product Category*、*Date* 同时收敛，结果带文件类型徽章与体积；
3. **文件元数据透明**——文件名 / 文件类型 / 大小 / 发布日期 / 版本号同屏展示，避免「点开才知不是我要的」；
4. **去转化化**——没有「立即购买」「加入购物车」，行动按钮统一是 **Download / Open**，与本主题去电商化叙事一致；
5. **可深链**——每条资料拥有独立 URL，便于销售 / 工程师在邮件、IM 中点对点分发。

> **TODO**：再补齐 3–5 条更具体的「**单品详情页**」与「**资料下载页**」对照链接，覆盖工业相机 / 工业机器人 / 工业控制 / 医疗器械 / 高端化工等 Baklib 目标行业。

---

## 三、产品门户常见范式（模板验收参考）

以下范式服务于**单品选型 + 物料库 + 文档 + FAQ + 案例**，而非电商转化链。

### 1. 选型优先的检索结构（Selection / Search-First）

- 选型中心页宜支持**多维筛选**（系列 / 行业 / 关键参数）；卡片层级一致。
- 关键参数可作为**对比维度**（暂未在本主题中实现对比页，可作为后续扩展）。

### 2. 单品详情页的「中心辐射」叙事

- **紧耦合**（与型号绑定）：参数表、亮点要点、主图轮播、物料库（规格书 / CAD / 固件）。
- **松耦合**（跨栏目反向匹配）：相关案例、相关文档、相关 FAQ。
- 顶部 **Sticky 子导航 + IntersectionObserver 高亮**，便于长页面浏览。

### 3. 物料库与下载页的可信感

- 文件**类型徽章**（PDF / DWG / STEP / ZIP）+ **大小** + **更新日期** 三件套，提升专业感。
- 涉及版权 / 注册下载的资料应有明确的「**申请获取**」按钮，不要直接放 URL（避免被爬取）。
- **多维检索**优先于「精美排版」：行动按钮统一为 **Download / Open**，不出现购物车 / 立即购买。范式参照 [ABB Library](https://library.abb.com/)（Document Kind / Language / Product Category / Date 四维收敛 + 文件元数据同屏展示 + 每条资料独立 URL 可深链分享）。

### 4. 案例页的痛点 / 方案 / 成果三段式

- 顶部一句话**关键成效**（如「上线后处理效率提升 38%」），用强色块强调。
- **量化成果**用大字号数值 + 单位 + 说明的卡片网格呈现，便于一眼提取。
- 侧栏放客户档案 + 关联产品反向链接，把案例**链回单品页**。

### 5. 转化与动线（去电商化）

- 主 CTA 三选一或并存：**获取方案 / 联系工程师 / 申请试用**。
- 不出现「Buy Now」「Add to Cart」「立即购买」等终端消费者表达。
- 全局对话框（`<dialog>` + `form_tag 'feedback'`）作为主转化入口；未配置反馈插件时降级 `mailto:lead_email`。

### 6. SEO / GEO 与结构化数据

- 平台默认支持页面 **`.md` 后缀地址**与元数据；**GEO（生成式引擎优化）与结构化呈现**由平台侧统一处理，本主题**不**在 Liquid 中维护自定义 JSON-LD 片段。
- 若需在文档层补充语义，可在页面正文或站点级设置中按 Baklib 产品能力配置。

---

## 四、模板案例参考（theme demos）

> 待补齐。建议从 [`seeds/002_pages.yml`](../seeds/002_pages.yml) 出发布出最小站点，截图 5 个频道首页 + 1 个单品详情 + 1 个案例详情，落地到 `screenshots/`。

---

## 五、TODO（待补充清单）

- [ ] 按「选型 + 物料 + 文档 + FAQ + 案例」对照本主题模板逐项验收
- [ ] 补齐**单品详情页**与**资料下载页**的真实站点 URL（至少 5 条），覆盖工业相机 / 工业机器人 / 医疗器械 / 高端化工
- [ ] 在 `screenshots/` 下补齐统一命名对照截图（`brand-page-date.png`，多断点加 `-desktop/-mobile`）
- [ ] 如需沉淀页面原始结构，新增子目录并记录采集方式与时间戳（避免过期 DOM 误导）
- [ ] 调研「**对比页（compare）**」「**报价单（quote sheet）**」「**型号配置器（configurator）**」等扩展模板，评估是否纳入下一个迭代

---

## 六、落地设计建议（模板嵌套层 + Schema 信息架构）

围绕「**别再用 PDF / 网盘把产品资料拼成找不到的散件**」这个核心诉求，建议把本模板定义为：**企业对外可检索、可关联、可持续运营的在线产品目录库**。  
设计目标不是把所有资料“堆上网”，而是把资料变成“**按产品锚点可回收、按场景可复用、按角色可直达**”的结构化资产。

### 1) 模板嵌套层（推荐 4 层）

建议使用「**布局层 → 频道层 → 实体层 → 片段层**」的分层嵌套，避免每个页面重复造轮子。

1. **布局层（Layout Layer）**  
   负责全局框架：头部导航、侧栏规则、面包屑、SEO 元信息、页脚与全局 CTA（联系工程师 / 获取方案）。

2. **频道层（Channel Layer）**  
   对应产品中心、资料下载、案例、文档、FAQ 等频道首页；统一处理筛选器、排序、分页、空状态与频道说明。

3. **实体层（Entity Layer）**  
   对应具体详情页：产品详情、案例详情、文档详情；以“中心辐射”组织内容区块（概述、参数、下载、相关案例、相关 FAQ）。

4. **片段层（Snippet Layer）**  
   可复用组件：参数表、文件列表、标签组、关联内容卡片、Sticky 子导航、反馈表单。  
   原则：**展示逻辑在片段层，数据语义在 schema 层**，避免把业务规则写死在模板 HTML。

### 2) Schema 信息架构（推荐实体模型）

建议至少拆成 6 类核心实体，并用 `model_code` / `slug` / `tags` 建立可追踪关联。

1. **Product（产品）**：目录库主锚点  
   - 标识字段：`product_id`、`model_code`、`slug`、`status`（active/eol）  
   - 展示字段：`name`、`series`、`summary`、`highlights[]`、`hero_media`  
   - 结构字段：`spec_groups[]`（参数分组）、`industries[]`、`scenarios[]`  
   - 关联字段：`downloads[]`、`doc_refs[]`、`faq_refs[]`、`case_refs[]`、`related_products[]`

2. **DownloadAsset（下载资料）**：文件资产对象化  
   - 基础字段：`asset_id`、`title`、`file_url`、`file_type`、`file_size`  
   - 业务字段：`doc_kind`（datasheet/cad/manual/firmware）、`version`、`language`、`release_date`  
   - 权限字段：`access_level`（public/form-gated/internal）  
   - 关联字段：`applicable_models[]`、`product_ids[]`

3. **DocArticle（技术文档）**：工程内容沉淀  
   - 结构字段：`doc_id`、`title`、`toc`、`content`、`version`、`updated_at`  
   - 分类字段：`doc_type`（guide/api/troubleshooting/release-note）  
   - 关联字段：`product_ids[]`、`scenario_tags[]`

4. **CaseStudy（客户案例）**：价值证明对象  
   - 基础字段：`case_id`、`title`、`industry`、`region`  
   - 叙事字段：`pain_points`、`solution`、`outcomes[]`（量化指标）  
   - 关联字段：`product_ids[]`、`download_refs[]`

5. **FaqItem（常见问题）**：售前售后知识闭环  
   - 基础字段：`faq_id`、`question`、`answer`、`group`、`priority`  
   - 关联字段：`product_ids[]`、`doc_refs[]`、`keywords[]`

6. **Taxonomy（分类与标签）**：跨频道统一语义  
   - `industries`（行业）、`scenarios`（场景）、`series`（系列）、`doc_kind`（文档类型）、`language`、`compliance_tags`  
   - 用于所有频道的过滤器统一映射，保证“同一个词，同一个筛选结果”。

### 3) 关键关系设计（避免“找不到”）

- **一切资料都必须可追溯到产品锚点**：文件、FAQ、案例、文档都可反向命中 `product_id/model_code`。  
- **同一资料允许多产品复用**：通过 `applicable_models[]` 避免重复上传和版本漂移。  
- **频道检索统一走 Taxonomy**：产品页、下载页、案例页使用同一套行业/场景/系列词表。  
- **文件必须带最小可读元数据**：类型、大小、版本、语言、更新时间，减少“点开才发现不对”。  
- **状态字段前置**：EOL 产品、过期资料、草稿文档都要可过滤，防止旧资料混入生产检索。

### 4) 实施顺序（最小可用版本）

1. 先建 `Product + DownloadAsset + Taxonomy` 三类 schema，打通“产品页 ↔ 下载页”。
2. 再接入 `FaqItem + DocArticle`，形成“查型号 → 查资料 → 查问题”的闭环。
3. 最后补 `CaseStudy` 与跨频道推荐，完成“选型 + 证明 + 转化”的完整叙事。

按这个分层和架构推进，`products` 模板可以从“页面展示”升级为企业的**在线产品目录底座**：  
资料不再散落在 PDF 和网盘里，而是围绕产品主键形成可检索、可关联、可运营的长期数字资产。

---

## 七、V1 开发计划（产品目录库 / 只关心产品本身）

为降低首版落地风险，把开发拆成两个阶段：

- **V1（本计划）——产品目录库**：只做「产品本身」的录入、分类与检索；**不**实现 `DownloadAsset`、`DocArticle`、`CaseStudy`、`FaqItem` 这些关联实体的来源与渲染。
- **V2（后续）——关联内容**：再补「资料 / 文档 / 案例 / FAQ」的数据来源（站内栏目、外部站点或 API）与界面。

> V1 中，产品详情的关联字段（`downloads[]`、`doc_refs[]` 等）**只声明、不消费**：先把字段位留出来，数据来源与展示放到 V2，避免后续改 schema 造成数据迁移。

### 1) 模板结构（index → channel → page）

复用本主题已存在的模板文件，三层各司其职：

| 层级 | 角色 | 对应模板文件 | 职责（V1） |
|---|---|---|---|
| `index` | 产品目录库总览（dictionary） | [`templates/index.liquid`](../templates/index.liquid) | 全量产品入口；按 `series` / `industries` / `scenarios` 提供分面导航，列出栏目与精选产品。 |
| `channel` | 基于栏目分类的产品列表 | [`templates/channel.products.liquid`](../templates/channel.products.liquid) | 单个栏目下的产品 dictionary；栏目头图 + 描述 + 产品卡片网格 + 分页。 |
| `page` | 产品详情页 | [`templates/page.product.liquid`](../templates/page.product.liquid) | 单品详情：标题、型号、标签分类、参数分组、主图、富文本正文。 |

> V1 暂不启用 `channel.downloads / channel.docs / channel.cases / channel.faqs` 与对应 `page.*`，保留文件但不进入导航主线。

### 2) Schema 设计

> 说明：下方 JSON 为**信息架构示意**，便于评审字段与 type；落地到 `{% schema %}` / `config/settings_schema.json` 时，面向用户的 `label` / `info` 须改为 `t:schema.*` 国际化键（参见主题开发规范），此处用中文仅为可读。

#### 2.1 全局（`config/settings_schema.json`）

新增一个「分类词表」分组，三个 `textarea`，**每行一个**，作为站点级受控词表，供产品页的分类字段引用：

```json
{
  "name": "t:schema.taxonomy.name",
  "settings": [
    { "id": "industries", "type": "textarea", "label": "行业分类（每行一个）" },
    { "id": "scenarios",  "type": "textarea", "label": "场景分类（每行一个）" },
    { "id": "series",     "type": "textarea", "label": "系列分类（每行一个）" }
  ]
}
```

读取：`{{ site.settings.industries }}`；在模板里 `split: "\n"` 后用于渲染与筛选。

#### 2.2 栏目（channel schema）

栏目层只需「头图 + 描述」用于列表页头部：

```json
{
  "settings": [
    { "id": "thumb_image_url", "type": "image_picker", "label": "栏目缩略图" },
    { "id": "description",     "type": "textarea",     "label": "栏目描述" }
  ]
}
```

读取：`{{ page.settings.thumb_image_url }}` / `{{ page.settings.description }}`（`image_picker` 返回图片地址字符串）。

#### 2.3 产品详情（page schema，模板 `page.product`）

| 分组 | 字段 id | type | 说明 |
|---|---|---|---|
| 基础 | `title` | （页面自带标题） | 产品展示名称，用页面原生 `title`，无需重复声明 |
| 基础 | `model_code` | `text` | 产品唯一标识 / 型号，用于检索与（V2）关联匹配 |
| 标签分类 | `tags` | `tag_picker`（`multiple`） | 通用标签，读 `page.settings.tags` |
| 标签分类 | `industries` | `select`（`multiple`，`choices_from: "$site.industries"`） | 行业分类，候选来自全局 `industries` |
| 标签分类 | `scenarios` | `select`（`multiple`，`choices_from: "$site.scenarios"`） | 场景分类，候选来自全局 `scenarios` |
| 标签分类 | `series` | `select`（`choices_from: "$site.series"`） | 系列分类，候选来自全局 `series` |
| 结构 | `spec_groups` | `textarea`（约定式） | 参数分组（见下方说明，V1 用约定文本，V2 视需要升级） |
| 产品信息 | `thumb_image_url` | `image_picker` | 主图 / 缩略图 |
| 产品信息 | `description` | `textarea` | 一句话摘要，用于卡片与 SEO |
| 产品信息 | `content` | `richtext`（`to_markdown: true`） | 正文富文本，支持导出 `.md` |
| 关联（V1 仅声明） | `downloads` / `doc_refs` / `faq_refs` / `case_refs` / `related_products` | `textarea`（占位） | V1 不消费；V2 再定来源（站内 / 外部 / API）与渲染 |

分类字段示意：

```json
{
  "id": "industries",
  "type": "select",
  "multiple": true,
  "choices_from": "$site.industries",
  "label": "行业分类"
}
```

#### 2.4 关于 `spec_groups[]`（重要取舍）

Baklib 动态表单的 `settings` **没有原生「可重复块 / 数组」type**，无法用单个字段直接表达「分组 → 多条参数」的嵌套结构。V1 建议二选一：

- **方案 A（推荐，最快落地）**：`spec_groups` 用一个 `textarea`，按约定解析，例如每行 `分组::参数名::参数值`：

```text
基本参数::额定电压::24V
基本参数::防护等级::IP67
通信::协议::EtherCAT
```

  模板侧 `split: "\n"` → 再 `split: "::"`，按第一段聚合为分组表格。优点：零平台依赖、可批量录入；缺点：录入需遵守约定。

- **方案 B（结构更规范）**：等评估后引入「区块/重复组」能力（若平台版本支持）或拆成固定数量的分组字段；改造成本更高，排到 V2。

> V1 采用方案 A，确保「参数分组」能立即上线并参与详情页渲染；后续如需强结构化再迁移。

### 3) V1 验收清单

- [ ] 全局 `industries / scenarios / series` 三个 `textarea` 生效，能被产品页 `choices_from: "$site.*"` 读到
- [ ] `index` 总览页可按系列 / 行业 / 场景分面进入
- [ ] `channel.products` 列表页展示栏目头图 + 描述 + 产品卡片 + 分页
- [ ] `page.product` 详情页渲染：型号、标签分类、`spec_groups` 参数表、主图、富文本正文
- [ ] 关联字段仅占位、不渲染，且 schema 结构与 V2 兼容（无需破坏性迁移）
