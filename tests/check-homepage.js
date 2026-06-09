const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css", "custom.css"), "utf8");
const js = fs.readFileSync(path.join(root, "js", "custom.js"), "utf8");

const requiredText = [
  "OptiMax 企业优智大模型",
  "AI赋能、数据驱动，助力企业数智转型",
  "公司简介",
  "值得信赖的企业AI决策技术",
  "风险智能诊断",
  "预测与补货推荐",
  "Agent 智能问答",
  "运筹优化求解",
  "私有化安全部署",
  "FDE 快速配置",
  "产品规划",
  "RiskOps 供应链风险管理",
  "FactoryOps 工厂智能排查",
  "OptiONE Agent 协同管控底座",
  "FDE 快速交付与业务 POC",
  "典型应用场景",
  "OptiFlow 决策中枢",
  "fa-exclamation-triangle",
  "fa-building",
  "fa-rocket",
  "fa-bell-o",
  "fa-shopping-cart",
  "采购智能化管理",
  "创始团队",
  "诚聘英才",
  "机器学习算法工程师",
  "为何加入OptiMax AI",
  "数码港3座F区5层创业中心7室",
  "hr@optimax.hk",
  "admin@optimax.hk"
];

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
  "founder-card",
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
  "tech-watermark",
  "tech-orbit",
  "roadmap-section",
  "scenario-section",
  "scenario-cluster",
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
  ".founder-card",
  ".career-panel",
  ".hero-scroll-cue",
  ".section-nav",
  ".section-nav-up",
  ".section-nav-down",
  ".section-panel",
  ".section-panel-inner",
  ".profile-drawer",
  ".profile-drawer-panel",
  ".trust-card",
  ".tech-watermark",
  ".tech-orbit",
  ".roadmap-item",
  ".scenario-section",
  ".scenario-feature",
  ".join-footer-panel",
  ".join-footer-grid",
  ".join-contact",
  ".join-contact-list",
  "@keyframes scrollCue"
];

const requiredRuntimeHooks = [
  "css/custom.css?v=hero-carousel-v4",
  "js/custom.js?v=hero-carousel-v4",
  "optimaxSectionScroll",
  "initHeroCarousel",
  "scrollRestoration",
  "syncInitialSectionScroll"
];

for (const text of requiredText) {
  if (!html.includes(text)) {
    throw new Error(`Missing required content: ${text}`);
  }
}

for (const hook of requiredHtmlHooks) {
  if (!html.includes(hook)) {
    throw new Error(`Missing homepage layout hook: ${hook}`);
  }
}

for (const hook of requiredCssHooks) {
  if (!css.includes(hook)) {
    throw new Error(`Missing CSS hook: ${hook}`);
  }
}

for (const staleColor of ["#f26f21", "#c74d11"]) {
  if (css.toLowerCase().includes(staleColor)) {
    throw new Error(`Stale orange brand color remains: ${staleColor}`);
  }
}

if (!css.includes("--optimax-accent: #2f6fb7")) {
  throw new Error("OptiMax blue accent variable is missing.");
}

for (const staleScrollRule of [":target", "scroll-margin-top: 128px", "target.offset().top-151", "$target.offset().top"]) {
  if (css.includes(staleScrollRule) || js.includes(staleScrollRule)) {
    throw new Error(`Stale offset scroll behavior remains: ${staleScrollRule}`);
  }
}

for (const sectionId of ["trusted-ai", "roadmap", "scenarios", "portfolio", "services", "join"]) {
  const panelPattern = new RegExp(`id="${sectionId}"[^>]*section-panel`);
  if (!panelPattern.test(html)) {
    throw new Error(`Section ${sectionId} is not configured as a viewport panel.`);
  }
}

if (/id="about"[^>]*section-panel/.test(html)) {
  throw new Error("Company profile should be integrated into the hero drawer, not a standalone viewport panel.");
}

if (/id="contact"[^>]*section-panel/.test(html)) {
  throw new Error("Contact should be integrated into the join panel, not a standalone viewport panel.");
}

if (/<li><a href="#company-profile"[^>]*>公司简介<\/a><\/li>/.test(html)) {
  throw new Error("Company profile should not appear as a top navigation item.");
}

if (!/id="contact"[^>]*join-contact/.test(html)) {
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
  if (!html.includes(link)) {
    throw new Error(`Missing section arrow link: ${link}`);
  }
}

for (const hook of requiredRuntimeHooks) {
  if (!html.includes(hook) && !js.includes(hook)) {
    throw new Error(`Missing runtime hook: ${hook}`);
  }
}

console.log("Homepage content and design hooks are present.");
