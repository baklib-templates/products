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
