export type ProjectCategory = "internship" | "independent-ai" | "experiment";
export type ProjectStatus = "concept" | "prototype" | "mvp" | "live";

export interface KeyDecision {
  title: string;
  situation?: string;
  decision: string;
  reason: string;
  tradeoff?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ProjectSection {
  id: string;
  navLabel: string;
  title: string;
  paragraphs?: string[];
  flow?: string[];
  decisions?: KeyDecision[];
  checklist?: Array<{
    title: string;
    items: string[];
    tone?: "done" | "next";
  }>;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  status: ProjectStatus;
  statusLabel: string;
  role: string[];
  tags: string[];
  coverImage: string;
  summary: string;
  period?: string;
  techStack?: string[];
  background?: string;
  problem?: string;
  research?: string;
  insight?: string;
  productStory?: string;
  roleDescription?: string;
  productDesign?: string;
  keyDecisions?: KeyDecision[];
  differentiation?: string;
  architecture?: string;
  mvp?: string;
  value?: string;
  metrics?: Metric[];
  commercialization?: string;
  roadmap?: string;
  reflection?: string;
  demoUrl?: string;
  githubUrl?: string;
  documentUrl?: string;
  images?: string[];
  visual: {
    label: string;
    title: string;
    rows: string[];
  };
  sections: ProjectSection[];
}

export const projectCategories: Array<{
  value: "all" | Extract<ProjectCategory, "internship" | "independent-ai">;
  label: string;
}> = [
  { value: "all", label: "全部" },
  { value: "internship", label: "实习" },
  { value: "independent-ai", label: "个人" },
];

const buildSections = (project: {
  overview: string[];
  problem: string[];
  research: string[];
  story: string[];
  design: string[];
  decisions: KeyDecision[];
  differentiation: string[];
  ai: string[];
  mvp: string[];
  value: string[];
  business: string[];
  next: string[];
  reflection: string[];
  flow?: string[];
  checklist?: ProjectSection["checklist"];
}): ProjectSection[] => [
  {
    id: "overview",
    navLabel: "项目概览",
    title: "项目概览",
    paragraphs: project.overview,
  },
  {
    id: "problem",
    navLabel: "问题",
    title: "为什么做这个产品",
    paragraphs: project.problem,
  },
  {
    id: "research",
    navLabel: "调研",
    title: "调研与洞察",
    paragraphs: project.research,
  },
  {
    id: "story",
    navLabel: "故事",
    title: "产品故事",
    paragraphs: project.story,
  },
  {
    id: "design",
    navLabel: "设计",
    title: "产品设计",
    paragraphs: project.design,
    flow: project.flow,
  },
  {
    id: "decisions",
    navLabel: "决策",
    title: "关键产品决策",
    decisions: project.decisions,
  },
  {
    id: "differentiation",
    navLabel: "差异",
    title: "产品差异化",
    paragraphs: project.differentiation,
  },
  {
    id: "ai",
    navLabel: "AI",
    title: "AI 与产品实现框架",
    paragraphs: project.ai,
  },
  {
    id: "mvp",
    navLabel: "MVP",
    title: "MVP 成果",
    paragraphs: project.mvp,
    checklist: project.checklist,
  },
  {
    id: "value",
    navLabel: "价值",
    title: "产品价值",
    paragraphs: project.value,
  },
  {
    id: "business",
    navLabel: "商业",
    title: "商业化思考",
    paragraphs: project.business,
  },
  {
    id: "next",
    navLabel: "优化",
    title: "未来优化",
    paragraphs: project.next,
  },
  {
    id: "reflection",
    navLabel: "复盘",
    title: "项目复盘",
    paragraphs: project.reflection,
  },
];

export const projects: Project[] = [
  {
    id: "01",
    slug: "eat-first",
    title: "Eat First",
    subtitle:
      "基于 AI 识别厨房食材，并针对临期食材生成可执行的处理方案与菜谱。",
    category: "independent-ai",
    categoryLabel: "个人",
    year: "2027",
    status: "mvp",
    statusLabel: "MVP",
    role: ["AI Product", "产品设计", "Vibe Coding"],
    tags: ["AI Agent", "Vision", "MVP"],
    coverImage: "/project-covers/ai-food-rescue-assistant.png",
    period: "2027.08",
    techStack: ["LLM", "React", "TypeScript", "Cloudflare"],
    summary:
      "围绕家庭厨房中容易被忽略的临期食材，设计一个从记录、提醒到生成处理方案的轻量 AI 产品。",
    background:
      "家庭厨房管理很容易因为录入成本高而中断，临期食材往往在用户真正想做饭之前已经被遗忘。",
    problem:
      "核心问题不是“缺少菜谱”，而是用户缺少一个低成本、及时、可执行的食材处理提示。",
    research:
      "调研重点放在厨房管理、食谱生成和备忘录工具的体验差异，观察用户为什么难以持续记录。",
    insight:
      "产品机会在于把“管理食材”转成“拯救食材”，让 AI 直接服务于临期场景下的行动决策。",
    productStory:
      "用户记录食材后，系统识别保质期和优先级，在食材临期前生成处理建议、替代方案和菜谱方向。",
    roleDescription:
      "负责需求定义、产品结构、核心流程、Prompt 设计和 MVP 原型实现。",
    productDesign:
      "MVP 聚焦食材录入、保质期管理、临期判断和 AI 处理方案生成，避免早期变成复杂库存系统。",
    keyDecisions: [
      {
        title: "从“管理食材”转向“拯救食材”",
        situation: "传统库存式管理需要持续录入，用户负担较重。",
        decision: "把产品目标收敛到临期食材的处理决策。",
        reason: "用户更容易为明确、及时的行动建议付出使用成本。",
        tradeoff: "早期不会覆盖完整厨房库存管理，需要后续根据使用频率再扩展。",
      },
      {
        title: "让 AI 输出可执行方案，而不是只生成菜谱",
        decision: "输出结构包含处理优先级、可替代食材、保存建议和菜谱方向。",
        reason: "临期场景下用户需要降低决策成本，而不是面对更多选择。",
      },
    ],
    differentiation:
      "与普通食谱工具相比，这个产品围绕食材状态组织体验；与备忘录相比，它直接给出下一步行动。",
    architecture:
      "前端负责录入与状态展示，LLM 根据食材、偏好、时间和限制条件生成处理方案，后续可扩展图片识别和 RAG 食谱库。",
    mvp: "当前 MVP 验证重点是低成本录入、临期提醒和 AI 方案生成的完整闭环。",
    value:
      "对用户的价值是减少浪费和降低做饭决策成本；对产品侧的价值是验证 AI 是否能在家庭微场景里形成持续使用。",
    commercialization:
      "商业化可以围绕家庭厨房订阅、生鲜平台导流和厨房工具合作展开，但前提是先证明记录行为能够持续发生。",
    roadmap:
      "后续可以加入图片识别、多人家庭协作、偏好学习、营养目标和失败反馈机制。",
    reflection:
      "这个项目提醒我，AI 产品不是把模型接进去，而是找到一个模型输出能直接影响用户行动的位置。",
    visual: {
      label: "MVP Flow",
      title: "临期食材拯救方案",
      rows: ["番茄 · 2 天后过期", "鸡蛋 · 优先使用", "AI 生成 3 个低成本方案"],
    },
    sections: buildSections({
      overview: [
        "围绕家庭厨房中容易被忽略的临期食材，设计一个从记录、提醒到生成处理方案的轻量 AI 产品。",
        "MVP 的判断重点不是功能完整，而是验证用户是否愿意持续记录，以及 AI 建议能否真的降低处理食材的决策成本。",
      ],
      problem: [
        "厨房食材浪费往往不是因为用户不知道可以做什么，而是因为食材状态不可见、提醒不及时、处理方案不够具体。",
        "传统备忘录缺少结构化能力，食谱工具又通常从“想吃什么”出发，而不是从“手头有什么、什么快过期”出发。",
      ],
      research: [
        "调研关注三类工具：食谱生成、库存管理和备忘录提醒。它们分别解决灵感、记录和提醒，但很少把三者串成行动闭环。",
        "核心洞察是：用户在临期场景中需要的是“下一步怎么处理”，而不是更多候选内容。",
      ],
      story: [
        "用户可以快速记录食材和大致保质期。系统在食材接近临期时提示优先级，并结合口味、时间和现有食材生成处理建议。",
        "AI 的角色不是替用户管理所有库存，而是在关键时刻把零散信息转成可执行方案。",
      ],
      design: [
        "产品结构被压缩成三个主要动作：记录食材、查看优先级、生成拯救方案。",
        "早期版本避免做复杂家庭库存系统，把体验重心放在临期提醒和方案质量上。",
      ],
      flow: ["用户输入", "AI 识别", "食材结构化", "判断临期", "推荐处理方案", "生成菜谱"],
      decisions: [
        {
          title: "从“管理食材”转向“拯救食材”",
          situation: "传统库存式管理需要持续录入，用户负担较重。",
          decision: "把产品目标收敛到临期食材的处理决策。",
          reason: "用户更容易为明确、及时的行动建议付出使用成本。",
          tradeoff: "早期不会覆盖完整厨房库存管理，需要后续根据使用频率再扩展。",
        },
        {
          title: "让 AI 输出可执行方案，而不是只生成菜谱",
          decision: "输出结构包含处理优先级、可替代食材、保存建议和菜谱方向。",
          reason: "临期场景下用户需要降低决策成本，而不是面对更多选择。",
        },
      ],
      differentiation: [
        "与普通食谱工具相比，它从食材状态出发；与提醒工具相比，它不仅提醒，还提供处理路径。",
      ],
      ai: [
        "LLM 负责把食材、时间、口味偏好和约束条件转成结构化建议。",
        "后续可加入图片识别做低成本录入，再用轻量 RAG 引入稳定菜谱来源。",
      ],
      mvp: ["当前 MVP 已覆盖从食材记录到 AI 处理建议的核心路径。"],
      checklist: [
        {
          title: "当前已经实现",
          tone: "done",
          items: ["AI 食材识别", "食材记录", "保质期管理"],
        },
        {
          title: "正在开发",
          tone: "next",
          items: ["临期食材拯救", "AI 菜谱", "偏好反馈"],
        },
      ],
      value: [
        "用户价值是减少浪费和降低做饭决策成本；产品价值是验证 AI 能否在家庭微场景中形成稳定使用理由。",
      ],
      business: [
        "商业化可以从家庭厨房订阅、生鲜平台导流和厨房工具合作切入，但前提是先证明记录行为能够持续发生。",
      ],
      next: ["后续重点是降低录入成本、提升建议可信度，并建立失败反馈机制。"],
      reflection: [
        "这个项目提醒我，AI 产品不是把模型接进去，而是找到一个模型输出能直接影响用户行动的位置。",
      ],
    }),
  },
  {
    id: "02",
    slug: "china-go",
    title: "ChinaGo",
    subtitle: "AI 入境旅行助手，帮助外国游客快速适应中国旅行环境。",
    category: "independent-ai",
    categoryLabel: "个人",
    year: "2027",
    status: "mvp",
    statusLabel: "MVP",
    role: ["AI Product", "产品设计", "AI Development"],
    tags: ["AI Product", "Travel", "Localization"],
    coverImage: "/project-covers/ai-interview-review-agent.png",
    period: "2027",
    techStack: ["LLM", "Agent Workflow", "React"],
    summary:
      "把一次性模拟面试拆成提问、追问、诊断、复盘和训练规划，让练习真正形成迭代。",
    background:
      "求职准备中，用户经常能找到题目，却很难获得稳定、结构化、可追踪的反馈。",
    problem: "模拟练习和复盘计划之间断裂，用户不知道下一次应该优先改什么。",
    research: "调研重点包括题库产品、通用对话机器人和人工 mock 面试反馈的体验差异。",
    insight: "真正的机会不是生成更多问题，而是把回答质量转成可持续追踪的能力变化。",
    productStory:
      "Agent 在面试中追问，在结束后按照岗位能力维度复盘，再生成下一轮练习计划。",
    roleDescription: "负责 Agent 角色拆分、评估维度、Prompt 结构和原型流程设计。",
    productDesign: "系统拆为面试官、复盘官和训练规划三个阶段，分别处理追问、评价和行动建议。",
    keyDecisions: [
      {
        title: "拆分 Agent 角色",
        decision: "把面试、复盘和训练规划拆成三个不同 Prompt 阶段。",
        reason: "减少单轮对话承载过多任务带来的输出漂移。",
      },
    ],
    differentiation: "它不是题库，也不是单次聊天，而是围绕求职能力成长组织长期练习。",
    architecture: "核心流程包括会话记录、能力维度评分、问题归因和下一轮训练计划生成。",
    mvp: "当前原型验证重点是 Agent 流程拆分和复盘报告结构。",
    value: "帮助用户从“练了很多题”转向“知道自己具体在进步什么”。",
    roadmap: "后续可加入岗位画像、历史对比、真实面试导入和个性化训练计划。",
    reflection: "Agent 产品的关键不是自动化所有事情，而是把复杂任务拆成更可控的判断节点。",
    visual: {
      label: "Agent Loop",
      title: "面试复盘闭环",
      rows: ["模拟追问", "结构化评分", "下一轮训练计划"],
    },
    sections: buildSections({
      overview: [
        "把一次性模拟面试拆成提问、追问、诊断、复盘和训练规划，让练习真正形成迭代。",
      ],
      problem: [
        "很多用户可以不断刷题，却很难知道自己的回答到底弱在哪里，也难以形成下一次练习重点。",
      ],
      research: [
        "对比题库、通用聊天机器人和人工 mock 面试后，核心差异落在反馈的结构化程度和持续追踪能力。",
      ],
      story: [
        "Agent 先以面试官身份进行追问，再切换为复盘官输出问题归因，最后生成下一轮训练计划。",
      ],
      design: ["产品被拆成会话、复盘报告、能力维度和行动清单四个核心模块。"],
      flow: ["模拟提问", "追问补充", "回答诊断", "能力归因", "训练计划"],
      decisions: [
        {
          title: "拆分 Agent 角色",
          decision: "把面试、复盘和训练规划拆成三个不同 Prompt 阶段。",
          reason: "减少单轮对话承载过多任务带来的输出漂移。",
        },
      ],
      differentiation: ["相比题库产品，它关注回答质量；相比通用对话，它有固定评估维度。"],
      ai: ["LLM 负责追问、摘要、评分解释和行动计划生成，产品侧需要约束输出结构。"],
      mvp: ["当前原型验证重点是 Agent 流程拆分和复盘报告结构。"],
      checklist: [
        {
          title: "当前已经实现",
          tone: "done",
          items: ["模拟追问", "复盘报告结构", "训练计划生成"],
        },
        {
          title: "正在开发",
          tone: "next",
          items: ["岗位画像", "历史对比", "真实面试导入"],
        },
      ],
      value: ["帮助用户从“练了很多题”转向“知道自己具体在进步什么”。"],
      business: ["可作为求职训练工具的增值能力，后续需要验证用户是否愿意为持续反馈付费。"],
      next: ["补充真实练习样本，优化评分稳定性和低质量回答的追问策略。"],
      reflection: ["Agent 产品的关键不是自动化所有事情，而是把复杂任务拆成更可控的判断节点。"],
    }),
  },
  {
    id: "03",
    slug: "by-claw",
    title: "百应Claw AI Agent & skills 生态建设",
    subtitle: "面向企业场景的Agent能力平台与智能服务生态建设",
    category: "internship",
    categoryLabel: "实习",
    year: "2027",
    status: "prototype",
    statusLabel: "Prototype",
    role: ["AI产品实习生"],
    tags: ["AI Agent", "LLM", "Skill Ecosystem", "Product Optimization"],
    coverImage: "/project-covers/enterprise-knowledge-rag-assistant.png",
    period: "2027",
    techStack: ["RAG", "LLM", "API", "权限"],
    summary:
      "围绕业务团队查找内部资料的高频场景，探索一个可追溯、可控、带来源依据的知识问答助手。",
    background:
      "企业内部知识分散在多个文档和系统中，业务人员检索成本高，新成员上手慢。",
    problem:
      "通用大模型可以回答问题，但在企业场景中，答案必须可信、可追溯，并且遵守权限边界。",
    research:
      "调研关注企业搜索、知识库工具和 RAG 问答产品在引用、权限和低置信度处理上的差异。",
    insight: "业务用户不只需要答案，更需要知道答案来自哪里，以及什么时候不应该完全相信答案。",
    productStory:
      "用户提出业务问题后，系统检索相关文档，生成答案并展示引用来源；低置信度时引导用户回到原文确认。",
    roleDescription: "负责业务问题梳理、需求边界定义、关键页面原型和可信回答机制设计。",
    productDesign: "重点设计问答输入、来源引用、权限提示、低置信度提示和反馈入口。",
    keyDecisions: [
      {
        title: "答案必须显示来源",
        decision: "回答区同步展示引用片段和文档入口。",
        reason: "企业知识场景对可信度要求高，来源依据比答案流畅度更重要。",
      },
    ],
    differentiation:
      "与传统搜索相比，它能组织答案；与通用大模型相比，它强调来源、权限和置信度。",
    architecture: "核心框架包括文档切分、向量召回、重排、答案生成、引用展示和用户反馈日志。",
    mvp: "当前原型验证重点是带来源问答、引用展示和低置信度处理。",
    value: "业务价值主要体现在降低检索时间、提升知识复用效率和减少重复咨询。",
    commercialization: "适合以企业内部效率工具形态落地，后续需要通过真实使用日志评估 ROI。",
    roadmap: "后续可扩展权限分层、回答质量评估、反馈闭环和业务系统集成。",
    reflection: "企业 AI 产品的难点不是只在模型能力，而在数据治理、权限、责任边界和组织流程。",
    visual: {
      label: "RAG Console",
      title: "带来源的业务问答",
      rows: ["问题：本季度活动策略？", "答案引用 3 份文档", "低置信度时建议人工确认"],
    },
    sections: buildSections({
      overview: [
        "围绕业务团队查找内部资料的高频场景，探索一个可追溯、可控、带来源依据的知识问答助手。",
      ],
      problem: [
        "内部资料分散，新成员上手慢，业务人员需要在多个系统之间来回搜索。",
        "通用大模型在企业场景中还会遇到来源不清、权限不明和低置信度难处理的问题。",
      ],
      research: [
        "调研关注企业搜索、知识库工具和 RAG 问答产品在引用、权限和低置信度处理上的差异。",
      ],
      story: [
        "用户提出问题后，系统检索相关文档，生成答案并展示引用来源；低置信度时引导用户回到原文确认。",
      ],
      design: ["重点设计问答输入、来源引用、权限提示、低置信度提示和反馈入口。"],
      flow: ["用户提问", "文档召回", "内容重排", "生成答案", "展示来源", "反馈记录"],
      decisions: [
        {
          title: "答案必须显示来源",
          decision: "回答区同步展示引用片段和文档入口。",
          reason: "企业知识场景对可信度要求高，来源依据比答案流畅度更重要。",
        },
      ],
      differentiation: [
        "与传统搜索相比，它能组织答案；与通用大模型相比，它强调来源、权限和置信度。",
      ],
      ai: ["RAG 流程包括文档切分、向量召回、重排、答案生成、引用展示和用户反馈日志。"],
      mvp: ["当前原型验证重点是带来源问答、引用展示和低置信度处理。"],
      checklist: [
        {
          title: "当前已经实现",
          tone: "done",
          items: ["问题输入", "引用展示", "低置信度提示"],
        },
        {
          title: "正在开发",
          tone: "next",
          items: ["权限分层", "质量评估", "业务系统集成"],
        },
      ],
      value: ["业务价值主要体现在降低检索时间、提升知识复用效率和减少重复咨询。"],
      business: ["适合以企业内部效率工具形态落地，后续需要通过真实使用日志评估 ROI。"],
      next: ["继续完善权限、评价、反馈和运营监控能力。"],
      reflection: ["企业 AI 产品的难点不只在模型能力，而在数据治理、权限、责任边界和组织流程。"],
    }),
  },
];

export const featuredProjects = projects;

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getAdjacentProjects = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
  };
};
