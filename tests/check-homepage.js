const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const zhHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const enHtml = fs.readFileSync(path.join(root, "index_en.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css", "custom.css"), "utf8");
const js = fs.readFileSync(path.join(root, "js", "custom.js"), "utf8");

function requireIncludes(source, items, label) {
  for (const item of items) {
    if (!source.includes(item)) {
      throw new Error(`Missing ${label}: ${item}`);
    }
  }
}

function requireExcludes(source, items, label) {
  for (const item of items) {
    if (source.includes(item)) {
      throw new Error(`Stale ${label} remains: ${item}`);
    }
  }
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function extractSingle(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Missing ${label}.`);
  }
  return stripTags(match[1]);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const requiredZhText = [
  "OptiMax 企业经营私域世界模型",
  "企业经营私域世界模型",
  "让企业经营更智能、更高效、更简单",
  "AI技术",
  "让 AI 不止回答问题，还能理解企业约束并生成可执行决策",
  "Graph Foundation Model",
  "Multi-Agent Orchestration",
  "Private Deployment",
  "Explainable Optimization",
  "图大模型能力",
  "联合决策引擎",
  "Agent 协同管控",
  "企业私域部署",
  "产品规划",
  "OptiONE",
  "RiskOps",
  "FactoryOps",
  "AI交付工程师体系",
  "应用场景",
  "真实经营场景验证",
  "知名企业真实经营场景",
  "创始团队",
  "申作军教授",
  "中国工程院外籍院士，曾任香港大学副校长（研究）",
  "现为香港大学工程学院及经济及工商管理学院双聘讲座教授",
  "曲源博士",
  "张普竣博士",
  "刘安邦博士",
  "朱晓冬博士",
  "朱越",
  "徐茂林",
  "诚聘英才",
  "机器学习算法工程师",
  "FDE / AI交付工程师",
  "为何加入OptiMax AI",
  "做早期核心建设者",
  "面对真实产业问题",
  "数码港3座F区5层创业中心7室",
  "hr@optimax.hk",
  "admin@optimax.hk"
];

const requiredEnText = [
  "OptiMax Enterprise AI",
  "Private World Model for Enterprise Operations",
  "Making enterprise operations smarter, more efficient, and simpler",
  "AI Technology",
  "does more than answer questions",
  "Graph Foundation Model",
  "Multi-Agent Orchestration",
  "Private Deployment",
  "Explainable Optimization",
  "Graph Model Capabilities",
  "Joint Decision Engine",
  "Agent Collaboration Control",
  "Enterprise Private Deployment",
  "Product Roadmap",
  "OptiONE",
  "RiskOps",
  "FactoryOps",
  "AI Delivery Engineering System",
  "Use Cases",
  "Technical proof in real operations",
  "Private World Model for Enterprise Operations",
  "well-known enterprises",
  "Founding Team",
  "Prof. Zuo-Jun Max Shen",
  "Foreign Member of the Chinese Academy of Engineering, served as Vice-President (Research) of the University of Hong Kong",
  "currently a chaired professor jointly appointed by the Faculty of Engineering and the Faculty of Business and Economics at the University of Hong Kong",
  "Dr. Yuan Qu",
  "Dr. Pujun Zhang",
  "Dr. Anbang Liu",
  "Dr. Xiaodong Zhu",
  "Yue Zhu",
  "Maolin Xu",
  "Careers",
  "Machine Learning Algorithm Engineer",
  "FDE / AI Delivery Engineer",
  "Why Join OptiMax AI",
  "Build From the Early Core",
  "Solve Real Industry Problems",
  "Unit 7, Entrepreneurship Center",
  "hr@optimax.hk",
  "admin@optimax.hk"
];

const enScenarioPanel = enHtml.match(/<aside class="scenario-proof-panel">([\s\S]*?)<\/aside>/);
if (!enScenarioPanel) {
  throw new Error("English scenario proof panel is missing.");
}

const enScenarioHeadline = extractSingle(enScenarioPanel[1], /<h2>([\s\S]*?)<\/h2>/, "English scenario proof headline");
if (enScenarioHeadline.length > 42) {
  throw new Error(`English scenario proof headline is too long for the fixed panel: ${enScenarioHeadline.length} characters.`);
}

const enScenarioProofItems = [...enScenarioPanel[1].matchAll(/<span><b>\d+<\/b>([\s\S]*?)<\/span>/g)].map((match) => stripTags(match[1]));
if (enScenarioProofItems.length !== 3) {
  throw new Error("English scenario proof panel should contain exactly three proof items.");
}

for (const item of enScenarioProofItems) {
  if (item.length > 92) {
    throw new Error(`English scenario proof item is too long for the fixed panel: ${item.length} characters.`);
  }
}

const enTechArchitecture = enHtml.match(/<div class="tech-architecture"[\s\S]*?<\/div>\s*<\/div>\s*<div class="tech-card-grid">/);
if (!enTechArchitecture) {
  throw new Error("English AI technology architecture panel is missing.");
}

const enTechPipelineItems = [...enTechArchitecture[0].matchAll(/<span><b>[\s\S]*?<\/b>([\s\S]*?)<\/span>/g)].map((match) => stripTags(match[1]));
if (enTechPipelineItems.length !== 4) {
  throw new Error("English AI technology architecture pipeline should contain exactly four steps.");
}

for (const item of enTechPipelineItems) {
  if (item.length > 42) {
    throw new Error(`English AI technology pipeline item is too long for the architecture panel: ${item.length} characters.`);
  }
}

const expectedEnTechPipeline = [
  ["01", "Structure field problems"],
  ["02", "Model private data and knowledge"],
  ["03", "Configure Agent + OR scenarios"],
  ["04", "Reuse product modules"]
];

const expectedZhTechNodeLabels = [
  ["tech-node-1", "业务知识图谱"],
  ["tech-node-2", "经营约束建模"],
  ["tech-node-3", "多 Agent 协同"],
  ["tech-node-4", "OR 求解优化"]
];

for (const [nodeClass, label] of expectedZhTechNodeLabels) {
  const pattern = new RegExp(`<div class="tech-node ${nodeClass}">\\s*<span class="tech-node-copy">${escapeRegExp(label)}<\\/span>\\s*<\\/div>`);
  if (!pattern.test(zhHtml)) {
    throw new Error(`Chinese ${nodeClass} should keep a single unbroken capsule label: ${label}.`);
  }
}

if (!/<div class="tech-graph-core">\s*企业经营私域\s*<br>\s*世界模型\s*<\/div>/.test(zhHtml)) {
  throw new Error("Chinese technology core should use a balanced explicit line break.");
}

for (const [step, label] of expectedEnTechPipeline) {
  const pattern = new RegExp(`<span>\\s*<b>${escapeRegExp(step)}<\\/b>\\s*<em class="tech-step-copy">${escapeRegExp(label)}<\\/em>\\s*<\\/span>`);
  if (!pattern.test(enTechArchitecture[0])) {
    throw new Error(`English AI technology pipeline should include ${step} ${label}.`);
  }
}

const enProductDelivery = enHtml.match(/<div class="product-delivery-bar">([\s\S]*?)<\/div>/);
if (!enProductDelivery) {
  throw new Error("English product roadmap delivery bar is missing.");
}

for (const [step, label] of expectedEnTechPipeline) {
  const pattern = new RegExp(`<span>\\s*<b>${escapeRegExp(step)}<\\/b>\\s*<em class="product-step-copy">${escapeRegExp(label)}<\\/em>\\s*<\\/span>`);
  if (!pattern.test(enProductDelivery[1])) {
    throw new Error(`English product delivery bar should include ${step} ${label} as forced line blocks.`);
  }
}

const requiredHtmlHooks = [
  "didi-inspired",
  "platform-hero",
  "hero-carousel",
  "data-hero-carousel-prev",
  "data-hero-carousel-next",
  "data-hero-carousel-dot",
  "hero-advanced-manufacturing.jpg",
  "hero-cargo-vessel.jpg",
  "hero-factory-corridor.jpg",
  "hero-glass-nav",
  "section-kicker",
  "founder-feature",
  "founder-photo-row",
  "founder-photo-card",
  "xiaodong-zhu-new.jpg",
  "yue-zhu-new.png",
  "maolin-xu.png",
  "career-panel",
  "hero-scroll-cue",
  "section-nav",
  "section-nav-up",
  "section-nav-down",
  "section-panel",
  "section-panel-inner",
  "profile-drawer",
  "data-profile-drawer-open",
  "trust-section",
  "roadmap-section",
  "scenario-section",
  "tech-watermark",
  "tech-foundation-layout",
  "tech-architecture",
  "product-platform",
  "scenario-system",
  "join-footer-panel",
  "join-footer-grid",
  "join-contact",
  "join-contact-list",
  "id=\"join\""
];

const requiredCssHooks = [
  ".didi-inspired",
  ".platform-hero",
  ".hero-carousel",
  ".hero-carousel-slide",
  ".hero-carousel-arrow",
  ".hero-carousel-dots",
  ".hero-glass-nav",
  "backdrop-filter",
  ".section-kicker",
  ".founder-feature",
  ".founder-feature-photo",
  ".founder-photo-row",
  ".founder-photo-card",
  ".career-panel",
  ".hero-scroll-cue",
  ".section-nav",
  ".section-nav-up",
  ".section-nav-down",
  ".section-panel",
  ".section-panel-inner",
  ".profile-drawer",
  ".profile-drawer-panel",
  ".tech-architecture",
  ".tech-tags",
  ".tech-card",
  ".product-platform",
  ".product-module",
  ".scenario-system",
  ".scenario-matrix",
  ".tech-watermark",
  ".join-footer-panel",
  ".join-footer-grid",
  ".join-contact",
  ".join-contact-list",
  "@keyframes scrollCue"
];

const requiredZhRuntimeHooks = [
  "css/custom.css?v=enterprise-world-model-v13",
  "js/custom.js?v=enterprise-world-model-v13",
];

const requiredEnRuntimeHooks = [
  "css/custom.css?v=enterprise-world-model-v13",
  "js/custom.js?v=enterprise-world-model-v13",
];

const requiredRuntimeHooks = [
  "optimaxSectionScroll",
  "initHeroCarousel",
  "scrollRestoration",
  "syncInitialSectionScroll"
];

const staleZhText = [
  "企业级私有供应链AI决策大脑",
  "企业私有供应链AI决策大脑",
  "AI决策大脑",
  "供应链AI决策",
  "值得信赖的企业AI决策技术",
  "复杂供应链决策",
  "企业优智大模型",
  "<p class=\"lead\"><strong>企业经营私域世界模型</strong></p>",
  "OptiFlow 决策中枢",
  "供应链预警系统",
  "RiskOps 供应链风险管理",
  "商务拓展",
  "数据平台工程师",
  "运营主管",
  "founder-photo-placeholder",
  "is-photo-pending",
  "Webpage template: Worthy",
  "Page 1 /",
  "Page 2 /",
  "Page 3 /",
  "公司由香港大学副校长、",
  "申作军教授是香港大学副校长（研究）",
  "是中国工程院外籍院士，工程学院及经济及工商管理学院"
];

const staleEnText = [
  "Enterprise Private Supply Chain AI Decision Brain",
  "Private Supply Chain AI Decision Brain",
  "AI Decision Brain",
  "supply chain AI decision",
  "core decision-making problems",
  "decision-making space",
  "Business Development",
  "Data Platform Engineer",
  "Operations Manager",
  "founder-photo-placeholder",
  "is-photo-pending",
  "Webpage template: Worthy",
  "Page 1 /",
  "Page 2 /",
  "Page 3 /",
  "Professor Zuo-Jun Max Shen, Vice-President (Research)",
  "Professor Shen is the Vice-President (Research)",
  "He is a chaired professor jointly appointed by the Faculty of Engineering and the Faculty of Business and Economics"
];

requireIncludes(zhHtml, requiredZhText, "Chinese content");
requireIncludes(enHtml, requiredEnText, "English content");

const zhHeroHeading = extractSingle(
  zhHtml,
  /<div class="[^"]*hero-copy[^"]*"[\s\S]*?<h1>([\s\S]*?)<\/h1>/,
  "Chinese hero heading"
);
if (zhHeroHeading !== "OptiMax 企业经营私域世界模型") {
  throw new Error(`Chinese hero heading should be OptiMax 企业经营私域世界模型, got: ${zhHeroHeading}`);
}

if (!/<img src="images\/xiaodong-zhu-new\.jpg" alt="朱晓冬博士" class="img-responsive">\s*<h3>朱晓冬博士<\/h3>/.test(zhHtml)) {
  throw new Error("Chinese founder card should label Xiaodong Zhu as 朱晓冬博士.");
}

if (!/<img src="images\/xiaodong-zhu-new\.jpg" alt="Dr\. Xiaodong Zhu" class="img-responsive">\s*<h3>Dr\. Xiaodong Zhu<\/h3>/.test(enHtml)) {
  throw new Error("English founder card should label Xiaodong Zhu as Dr. Xiaodong Zhu.");
}

if (!/<img src="images\/yue-zhu-new\.png" alt="朱越" class="img-responsive">\s*<h3>朱越<\/h3>/.test(zhHtml)) {
  throw new Error("Chinese founder card should use the updated Yue Zhu photo.");
}

for (const hook of requiredHtmlHooks) {
  if (!zhHtml.includes(hook) || !enHtml.includes(hook)) {
    throw new Error(`Missing shared homepage layout hook: ${hook}`);
  }
}

requireIncludes(css, requiredCssHooks, "CSS hook");
requireIncludes(zhHtml, requiredZhRuntimeHooks, "Chinese runtime hook");
requireIncludes(enHtml, requiredEnRuntimeHooks, "English runtime hook");
requireIncludes(zhHtml + enHtml + js, requiredRuntimeHooks, "runtime hook");
requireExcludes(zhHtml, staleZhText, "Chinese content");
requireExcludes(enHtml, staleEnText, "English content");

if (!css.includes(".tech-node-copy") || !css.includes("white-space: nowrap;")) {
  throw new Error("Chinese technology nodes need nowrap label wrappers to prevent awkward auto wrapping.");
}

function extractCssBlock(source, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`, "m"));
  if (!match) {
    throw new Error(`Missing CSS block for ${selector}.`);
  }
  return match[1];
}

function findCssBlockWith(source, selector, requiredSnippets, label) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [...source.matchAll(new RegExp(`(^|\\n)${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`, "gm"))];
  const block = matches.map((match) => match[2]).find((candidate) => requiredSnippets.every((snippet) => candidate.includes(snippet)));
  if (!block) {
    throw new Error(`Missing CSS block for ${label}.`);
  }
  return block;
}

const productCoreBlock = extractCssBlock(css, ".product-core");
if (!productCoreBlock.includes("display: flex;") || !productCoreBlock.includes("flex-direction: column;")) {
  throw new Error("Product core card should use a column flow so text cannot overlap the layer stack.");
}

const productLayersBlock = findCssBlockWith(css, ".product-layers", ["margin-top: auto;"], "product layers flow layout");
if (productLayersBlock.includes("position: absolute;") || !productLayersBlock.includes("position: relative;") || !productLayersBlock.includes("margin-top: auto;")) {
  throw new Error("Product layers should sit in normal document flow at the bottom of the OptiONE card.");
}

const joinContactItemBlock = findCssBlockWith(css, ".join-contact-list li", ["display: grid;", "grid-template-columns: 18px minmax(0, 1fr);"], "contact list item layout");
if (!joinContactItemBlock.includes("display: grid;") || !joinContactItemBlock.includes("grid-template-columns: 18px minmax(0, 1fr);")) {
  throw new Error("Contact list items should align icon and copy in a stable two-column row.");
}

if (!css.includes(".join-contact-copy") || !css.includes(".join-contact-value") || !css.includes(".join-contact-list a")) {
  throw new Error("Contact list should group text cleanly and keep email links inline.");
}

if (!zhHtml.includes("join-contact-value") || !enHtml.includes("join-contact-value")) {
  throw new Error("Contact values should be wrapped separately from labels on both homepages.");
}

const noWrapRequirements = [
  ".platform-hero h1",
  ".roadmap-lead-line",
  ".join-footer-column .nowrap-line"
];

requireIncludes(css, noWrapRequirements, "no-wrap CSS rule");

if (!zhHtml.includes("join-footer-note nowrap-line") || !zhHtml.includes("optimax-footer-note nowrap-line")) {
  throw new Error("Footer note lines should use nowrap-line wrappers.");
}

if (!zhHtml.includes('<span class="roadmap-lead-line">产品以 OptiONE 企业级 Agent 协同管控底座为核心，</span><br>') ||
    !zhHtml.includes('<span class="roadmap-lead-line">向 RiskOps、FactoryOps 与 FDE 交付体系持续沉淀。</span>')) {
  throw new Error("Chinese product roadmap lead should break after 核心， with two balanced no-wrap lines.");
}

const zhJoinUsColumn = zhHtml.match(/<div class="join-footer-column">\s*<h3>JOIN US<\/h3>([\s\S]*?)<\/div>\s*<div id="contact"/);
if (!zhJoinUsColumn) {
  throw new Error("Chinese JOIN US footer column is missing.");
}

if (zhJoinUsColumn[1].includes('href="mailto:hr@optimax.hk"') || zhJoinUsColumn[1].includes("hr@optimax.hk")) {
  throw new Error("Duplicated HR email should be removed from the left JOIN US footer column.");
}

for (const staleColor of ["#f26f21", "#c74d11"]) {
  if (css.toLowerCase().includes(staleColor)) {
    throw new Error(`Stale orange brand color remains: ${staleColor}`);
  }
}

if (!css.includes("--optimax-accent: #2f6fb7")) {
  throw new Error("OptiMax blue accent variable is missing.");
}

const requiredEnglishOverflowRules = [
  'html[lang="en"] .tech-architecture',
  'html[lang="en"] .tech-graph-core',
  'html[lang="en"] .tech-node-3',
  'html[lang="en"] .tech-node-4',
  'html[lang="en"] .tech-card',
  'html[lang="en"] .tech-card p',
  'html[lang="en"] .tech-pipeline',
  'html[lang="en"] .tech-pipeline span',
  'html[lang="en"] .tech-step-copy',
  'html[lang="en"] .product-delivery-bar',
  'html[lang="en"] .product-delivery-bar span',
  'html[lang="en"] .product-step-copy',
  'html[lang="en"] .join-footer-column .nowrap-line',
  'html[lang="en"] .join-contact-copy',
  'html[lang="en"] .scenario-proof-panel',
  'html[lang="en"] .scenario-proof-panel h2',
  'html[lang="en"] .scenario-proof span'
];

requireIncludes(css, requiredEnglishOverflowRules, "English scenario overflow rule");

const enTechPipelineBlock = extractCssBlock(css, 'html[lang="en"] .tech-pipeline');
if (!enTechPipelineBlock.includes("grid-template-columns: repeat(2, minmax(0, 1fr));")) {
  throw new Error("English technology pipeline should use a 2-column grid so long step labels do not collide.");
}

const enScenarioHeadingBlock = extractCssBlock(css, 'html[lang="en"] .scenario-proof-panel h2');
for (const requiredSnippet of ["white-space: normal;", "overflow-wrap: anywhere;", "font-size: clamp(25px, 2.05vw, 32px);"]) {
  if (!enScenarioHeadingBlock.includes(requiredSnippet)) {
    throw new Error(`English scenario heading should include ${requiredSnippet}`);
  }
}

const enProductDeliveryBlock = extractCssBlock(css, 'html[lang="en"] .product-delivery-bar');
if (!enProductDeliveryBlock.includes("grid-template-columns: repeat(2, minmax(0, 1fr));")) {
  throw new Error("English product delivery bar should use a 2-column grid so step labels do not collide.");
}

const enProductDeliverySpanBlock = extractCssBlock(css, 'html[lang="en"] .product-delivery-bar span');
for (const requiredSnippet of ["white-space: normal;", "overflow: hidden;", "min-width: 0;"]) {
  if (!enProductDeliverySpanBlock.includes(requiredSnippet)) {
    throw new Error(`English product delivery cells should include ${requiredSnippet}`);
  }
}

const enProductStepCopyBlock = extractCssBlock(css, 'html[lang="en"] .product-step-copy');
for (const requiredSnippet of ["display: block;", "white-space: normal;", "overflow-wrap: anywhere;", "min-width: 0;"]) {
  if (!enProductStepCopyBlock.includes(requiredSnippet)) {
    throw new Error(`English product step copy should include ${requiredSnippet}`);
  }
}

const enCapsuleNodesBlock = findCssBlockWith(
  css,
  'html[lang="en"] .tech-node-3,\nhtml[lang="en"] .tech-node-4',
  ["border-radius: 999px;", "white-space: normal;"],
  "English technology capsule node layout"
);
if (!enCapsuleNodesBlock.includes("width: 132px;") || !enCapsuleNodesBlock.includes("min-height: 56px;")) {
  throw new Error("English technology long labels should use wider capsule nodes.");
}

const enFooterNoWrapBlock = extractCssBlock(css, 'html[lang="en"] .join-footer-column .nowrap-line');
if (!enFooterNoWrapBlock.includes("white-space: normal;")) {
  throw new Error("English footer notes should wrap instead of forcing one-line text.");
}

const enTechStepCopyBlock = extractCssBlock(css, 'html[lang="en"] .tech-step-copy');
for (const requiredSnippet of ["display: block;", "white-space: normal;", "overflow-wrap: anywhere;", "min-width: 0;"]) {
  if (!enTechStepCopyBlock.includes(requiredSnippet)) {
    throw new Error(`English technology step copy should include ${requiredSnippet}`);
  }
}

const enContactCopyBlock = extractCssBlock(css, 'html[lang="en"] .join-contact-copy');
if (!enContactCopyBlock.includes("grid-template-columns: 72px minmax(0, 1fr);")) {
  throw new Error("English contact labels need enough width for Careers.");
}

for (const staleScrollRule of [":target", "scroll-margin-top: 128px", "target.offset().top-151", "$target.offset().top"]) {
  if (css.includes(staleScrollRule) || js.includes(staleScrollRule)) {
    throw new Error(`Stale offset scroll behavior remains: ${staleScrollRule}`);
  }
}

for (const sectionId of ["trusted-ai", "roadmap", "scenarios", "portfolio", "services", "join"]) {
  const panelPattern = new RegExp(`id="${sectionId}"[^>]*section-panel`);
  if (!panelPattern.test(zhHtml) || !panelPattern.test(enHtml)) {
    throw new Error(`Section ${sectionId} is not configured as a viewport panel on both homepages.`);
  }
}

if (/id="about"[^>]*section-panel/.test(zhHtml) || /id="about"[^>]*section-panel/.test(enHtml)) {
  throw new Error("Company profile should be integrated into the hero drawer, not a standalone viewport panel.");
}

if (/id="contact"[^>]*section-panel/.test(zhHtml) || /id="contact"[^>]*section-panel/.test(enHtml)) {
  throw new Error("Contact should be integrated into the join panel, not a standalone viewport panel.");
}

if (!/id="contact"[^>]*join-contact/.test(zhHtml) || !/id="contact"[^>]*join-contact/.test(enHtml)) {
  throw new Error("Contact details are not integrated into the join panel.");
}

const expectedArrowLinks = [
  'class="hero-scroll-cue smooth-scroll" href="#trusted-ai"',
  'class="section-nav section-nav-up smooth-scroll" href="#banner"',
  'class="section-nav section-nav-down smooth-scroll" href="#roadmap"',
  'class="section-nav section-nav-up smooth-scroll" href="#trusted-ai"',
  'class="section-nav section-nav-down smooth-scroll" href="#scenarios"',
  'class="section-nav section-nav-up smooth-scroll" href="#roadmap"',
  'class="section-nav section-nav-down smooth-scroll" href="#portfolio"',
  'class="section-nav section-nav-up smooth-scroll" href="#scenarios"',
  'class="section-nav section-nav-down smooth-scroll" href="#services"',
  'class="section-nav section-nav-up smooth-scroll" href="#portfolio"',
  'class="section-nav section-nav-down smooth-scroll" href="#join"',
  'class="section-nav section-nav-up smooth-scroll" href="#services"'
];

for (const link of expectedArrowLinks) {
  if (!zhHtml.includes(link) || !enHtml.includes(link)) {
    throw new Error(`Missing section arrow link on both homepages: ${link}`);
  }
}

for (const html of [zhHtml, enHtml]) {
  if ((html.match(/data-toggle="modal"/g) || []).length > 0) {
    throw new Error("Founder team cards should not open modal detail pages.");
  }

  if (!/<footer id="footer">[\s\S]*Copyright © 2025 OptiMax AI Limited\. All Rights Reserved\.[\s\S]*<\/footer>/.test(html)) {
    throw new Error("Footer copyright is missing or malformed.");
  }
}

console.log("Homepage content and design hooks are present on Chinese and English pages.");
