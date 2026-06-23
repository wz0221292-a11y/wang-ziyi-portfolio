export const portfolioProfile = {
  name: "王子仪",
  role: "产品设计师",
  focus: "游戏设计开发 / 产品设计 / 数字体验",
  school: "西南交通大学（犀浦校区）产品设计专业本科大二在读",
  plan: "计划 2027 年赴英国伦敦拉夫堡大学攻读工业设计硕士",
  email: "2081854516@qq.com",
  phone: "13258227523",
  intro:
    "我正在建立一种面向未来设计的复合型能力：以产品设计与工业设计为基础，把游戏设计开发、UE5 空间、AI 辅助创意、网站开发和视频叙事整合成可体验、可展示的数字化作品。",
  extendedIntro:
    "长期关注虚拟空间、互动原型和数字内容表达，习惯从用户路径、空间叙事、交互反馈和视觉氛围中寻找设计切入点。跨文化经历也让我更敏感于不同城市、产品和服务背后的审美与体验差异。",
};

export const navItems = [
  { label: "首页", href: "#home" },
  { label: "关于", href: "#about" },
  { label: "成果", href: "#outcomes" },
  { label: "项目", href: "#projects" },
  { label: "优势", href: "#strengths" },
  { label: "联系", href: "#contact" },
];

export const stats = [
  { value: "6+", label: "技能方向", detail: "产品设计 / 游戏设计开发 / UE5 / AI / 网站 / 视频" },
  { value: "5", label: "实践主题", detail: "从课程成果到交互原型展示" },
  { value: "8+", label: "跨文化观察", detail: "欧洲、日本、俄罗斯等经历" },
  { value: "2027", label: "深造规划", detail: "伦敦拉夫堡大学工业设计硕士" },
];

export const aboutTags = [
  "Product Design",
  "UX / Interaction",
  "AI Product",
  "0->1",
  "Experience Design",
  "System Thinking",
];

export const aboutInfo = [
  { label: "姓名", value: "王子仪 / WANG ZIYI" },
  { label: "求职方向", value: "产品设计 · 体验设计 · AI 产品" },
  { label: "邮箱", value: portfolioProfile.email, href: `mailto:${portfolioProfile.email}` },
  { label: "电话", value: portfolioProfile.phone, href: `tel:${portfolioProfile.phone}` },
  { label: "微信", value: "fw020914" },
];

export const education = [
  {
    school: "悉尼大学",
    major: "交互设计与电子艺术（硕士在读）",
    location: "澳大利亚 · 悉尼",
    period: "2025.02 - 2026.11",
    description: "聚焦交互系统原型、用户研究、数据驱动体验与 AIGC 交互方向。",
  },
  {
    school: "华南农业大学",
    major: "风景园林（学士）",
    location: "中国 · 广州",
    period: "2020.09 - 2024.06",
    description: "本科阶段积累了空间行为研究、用户动线分析、数据可视化与视觉表达基础。",
  },
];

export const experiences = [
  {
    company: "广东省交通规划设计研究院集团有限公司",
    role: "景观与空间设计实习生",
    location: "中国 · 广州",
    period: "2023.07 - 2023.08",
    bullets: [
      "参与滨海景观项目调研、方案设计与数据整理。",
      "结合人流热力图分析优化步行路径与空间体验。",
      "使用 Rhino 建模，并在 Figma 中制作数字交互看板辅助方案讨论。",
      "项目成果《汕尾品清湖海堤生态改造》获设计竞赛一等奖并成功落地实施。",
    ],
  },
  {
    company: "广州市城市规划设计研究院",
    role: "城市设计实习生",
    location: "中国 · 广州",
    period: "2023.01 - 2023.02",
    bullets: [
      "通过问卷与访谈获取用户需求，分析社区公共空间问题。",
      "输出“步行友好 + 文化元素融合”优化方案。",
      "方案被采纳进入正式设计报告。",
    ],
  },
];

export const aboutProjects = [
  {
    title: "代号模拟池",
    subtitle: "AI 内容流量模拟工具",
    category: "AI Product / UX",
    description:
      "从 0 到 1 设计 AI 内容评估产品，通过 LLM 与规则模型模拟内容发布后的流量表现。构建 6 维度内容评分体系与流量映射逻辑，完成 PRD、产品方案设计、信息架构与 Web MVP 验证。",
  },
  {
    title: "Pet Air",
    subtitle: "宠物出行产品设计与交互原型",
    category: "UX / Service Design",
    description:
      "围绕宠物主人航班出行情境，优化信息割裂与流程繁琐问题。经过可用性测试后，用户满意度提升 32%，关键流程点击量减少 40%。",
  },
  {
    title: "FloraSense",
    subtitle: "情绪感应灯交互产品设计",
    category: "Interaction Design",
    description:
      "基于 HR / HRV 生理数据与环境信息，构建情绪感知与动态灯光反馈机制。情绪识别准确率达 82%，舒缓反馈体验满意度提升 35%。",
  },
];

export const skillGroups = [
  {
    title: "产品与体验",
    items: ["用户研究", "需求分析", "PRD", "信息架构", "交互流程", "用户旅程地图", "服务设计"],
  },
  {
    title: "设计与原型",
    items: ["Figma", "Axure", "Adobe Photoshop", "Adobe Illustrator", "高保真界面设计", "交互原型设计"],
  },
  {
    title: "AI 与产品思维",
    items: ["ChatGPT", "Claude", "DeepSeek", "Manus", "AI 产品逻辑设计", "AIGC 工具体验落地"],
  },
  {
    title: "技术基础",
    items: ["Python（基础）", "SQL（基础）", "JavaScript（基础）", "p5.js"],
  },
  {
    title: "三维与空间",
    items: ["Rhino", "SketchUp", "AutoCAD"],
  },
];

export const languageAndInterests = [
  { label: "语言能力", value: "英语（流利，可作为工作语言） | 韩语（基础）" },
  { label: "兴趣方向", value: "摄影 | 陶艺 | 内容创作 | AI 探索" },
];

export const academicOutcomes = [
  {
    title: "产品造型与形态推敲",
    label: "Form Study",
    description:
      "围绕产品比例、结构关系、使用姿态和造型语义进行草图推敲与方案迭代，训练从问题到形态表达的设计转化能力。",
    points: ["设计草图", "形态分析", "方案迭代"],
  },
  {
    title: "用户研究与设计定位",
    label: "Research",
    description:
      "通过用户场景、需求拆解、竞品观察和设计机会提炼，建立从真实使用情境出发的产品判断，而不是只停留在视觉外观。",
    points: ["用户路径", "需求拆解", "机会定义"],
  },
  {
    title: "模型制作与数字表达",
    label: "Prototype",
    description:
      "结合课程模型、数字建模、版面汇报与交互展示，把专业学习成果整理成可被观看、理解和继续开发的作品系统。",
    points: ["实体模型", "数字建模", "版面表达"],
  },
  {
    title: "跨媒介设计呈现",
    label: "Presentation",
    description:
      "将产品设计课程训练延伸到网页、视频、游戏空间和 AI 辅助视觉中，让专业作品具备更强的叙事和展示能力。",
    points: ["网页展示", "视频叙事", "AI 辅助"],
  },
];

export const outcomeGalleryItems = [
  {
    title: "灵境方舱 01",
    image: "/assets/outcomes/outcome-01-city-healing-cabin-1.webp",
  },
  {
    title: "灵境方舱 02",
    image: "/assets/outcomes/outcome-02-city-healing-cabin-2.webp",
  },
  {
    title: "CubeCare 智能药盒 01",
    image: "/assets/outcomes/outcome-03-cubecare-1.webp",
  },
  {
    title: "CubeCare 智能药盒 02",
    image: "/assets/outcomes/outcome-04-cubecare-2.webp",
  },
  {
    title: "竹息-巢光",
    image: "/assets/outcomes/outcome-05-zhuxi-chaoguang.webp",
  },
  {
    title: "钻石切割机顶盒",
    image: "/assets/outcomes/outcome-06-diamond-console.webp",
  },
  {
    title: "盈测管家",
    image: "/assets/outcomes/outcome-07-profitcast.webp",
  },
  {
    title: "设计史展板",
    image: "/assets/outcomes/outcome-08-design-history.webp",
  },
  {
    title: "青铜觉醒导览手册",
    image: "/assets/outcomes/outcome-09-bronze-awakening.webp",
  },
  {
    title: "SoftCare 护理机器人 01",
    image: "/assets/outcomes/outcome-10-softcare-1.webp",
  },
  {
    title: "SoftCare 护理机器人 02",
    image: "/assets/outcomes/outcome-11-softcare-2.webp",
  },
  {
    title: "模块化休闲步道",
    image: "/assets/outcomes/outcome-12-modular-path.webp",
  },
  {
    title: "AeroNest 人机工程展板",
    image: "/assets/outcomes/outcome-13-aeronest.webp",
  },
];

export const projects = [
  {
    title: "UE5 游戏开发实践",
    category: "Game Prototype",
    description:
      "围绕恐怖氛围、空间叙事、玩家路线与交互反馈搭建场景原型，将产品设计里的用户体验思维放进游戏空间。",
    tags: ["Unreal Engine 5", "蓝图逻辑", "空间叙事", "沉浸体验"],
    visualType: "corridor",
  },
  {
    title: "网站开发实践",
    category: "Web Portfolio",
    description:
      "学习网页结构、页面排版、基础交互与内容组织，把设计作品、视频内容与 Demo 统一到清晰的展示系统中。",
    tags: ["React", "页面布局", "交互实现", "作品展示"],
    visualType: "interface",
  },
  {
    title: "网页游戏开发实践",
    category: "Web Game",
    description:
      "通过轻量级网页游戏训练规则拆解、状态反馈和创意原型转化能力，让交互想法能快速被试玩和验证。",
    tags: ["游戏规则", "交互反馈", "原型验证", "前端实现"],
    visualType: "webgame",
  },
  {
    title: "AI 辅助创意设计",
    category: "AI Workflow",
    description:
      "使用 AI 工具进行创意发散、资料整理、文本优化、项目规划和视觉参考生成，提高从想法到表达的效率。",
    tags: ["AI 工具", "创意发散", "视觉参考", "效率提升"],
    visualType: "ai",
  },
  {
    title: "视频剪辑与视觉表达",
    category: "Motion Story",
    description:
      "通过素材整理、节奏剪辑、字幕处理与基础包装，将设计过程、游戏 Demo 和项目成果转化为更清晰的视觉叙事。",
    tags: ["视频剪辑", "字幕包装", "项目汇报", "内容表达"],
    visualType: "motion",
  },
];

export const strengths = [
  {
    title: "设计与技术结合",
    description:
      "具备产品设计专业基础，同时主动学习 UE5、AI、网站开发、网页游戏和视频剪辑，能把创意转化为可展示的数字化成果。",
    icon: "cpu",
  },
  {
    title: "国际化视野",
    description:
      "拥有欧洲、日本、俄罗斯等多地游学与交流经历，对不同文化中的设计、艺术、建筑和用户习惯保持敏感度。",
    icon: "globe",
  },
  {
    title: "自主学习能力",
    description:
      "能够主动学习新工具和新平台，并快速应用到个人项目、作品集表达和创作流程中。",
    icon: "sparkles",
  },
  {
    title: "表达与展示能力",
    description:
      "能够通过图文、视频、网页和游戏场景等多种媒介呈现创意，适合综合型设计项目开发。",
    icon: "monitor",
  },
];
