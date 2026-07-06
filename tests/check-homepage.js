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

const requiredZhText = [
  "OptiMax 企业优智大模型",
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
  "用真实经营场景证明技术能力",
  "知名企业真实经营场景",
  "创始团队",
  "申作军教授",
  "曲源博士",
  "张普竣博士",
  "刘安邦博士",
  "朱晓冬",
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
  "well-known enterprises",
  "Founding Team",
  "Prof. Zuo-Jun Max Shen",
  "Dr. Yuan Qu",
  "Dr. Pujun Zhang",
  "Dr. Anbang Liu",
  "Xiaodong Zhu",
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
  "xiaodong-zhu.png",
  "yue-zhu.png",
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

const requiredRuntimeHooks = [
  "css/custom.css?v=enterprise-world-model-v3",
  "js/custom.js?v=enterprise-world-model-v3",
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
  "OptiFlow 决策中枢",
  "供应链预警系统",
  "RiskOps 供应链风险管理",
  "商务拓展",
  "数据平台工程师",
  "运营主管",
  "founder-photo-placeholder",
  "is-photo-pending",
  "Webpage template: Worthy"
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
  "Webpage template: Worthy"
];

requireIncludes(zhHtml, requiredZhText, "Chinese content");
requireIncludes(enHtml, requiredEnText, "English content");

for (const hook of requiredHtmlHooks) {
  if (!zhHtml.includes(hook) || !enHtml.includes(hook)) {
    throw new Error(`Missing shared homepage layout hook: ${hook}`);
  }
}

requireIncludes(css, requiredCssHooks, "CSS hook");
requireIncludes(zhHtml + enHtml + js, requiredRuntimeHooks, "runtime hook");
requireExcludes(zhHtml, staleZhText, "Chinese content");
requireExcludes(enHtml, staleEnText, "English content");

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
  'html[lang="en"] .tech-card',
  'html[lang="en"] .tech-card p',
  'html[lang="en"] .tech-pipeline',
  'html[lang="en"] .tech-pipeline span',
  'html[lang="en"] .scenario-proof-panel',
  'html[lang="en"] .scenario-proof-panel h2',
  'html[lang="en"] .scenario-proof span'
];

requireIncludes(css, requiredEnglishOverflowRules, "English scenario overflow rule");

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
