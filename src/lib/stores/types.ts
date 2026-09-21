// ==========================================
// Base Types
// ==========================================

/** Type for enhanced image imports (?enhanced) - matches Svelte's Picture type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EnhancedImgModule = any;

/** Type for regular media imports (SVG, PNG without enhanced) */
export type MediaImport = string;

/** Type for video imports */
export type VideoImport = string;

// ==========================================
// Floater Types
// ==========================================

export type floaterPosition = {
  top: number;
  left: number;
  zIndex: number;
  animationDelay: number;
};

export type FloaterCategory = "image" | "video" | "document" | "link";

export type FloaterData = {
  Title: string;
  id: number;
  category: FloaterCategory;
  media?: EnhancedImgModule | VideoImport;
  file?: string;
  href?: string;
  parent: string;
};

export type FloatersDb = Record<string, FloaterData>;

// ==========================================
// Card Types
// ==========================================

export type CardContent = {
  title: string;
  subtitle: string;
  text: string;
  picture: EnhancedImgModule;
  exNum: number;
};

export type CardData = {
  Title: string;
  Description: string;
  Question: string;
  IndexNum: number;
  CoverImg: EnhancedImgModule;
  Content: CardContent[];
  bgColor: string;
  isProjCover: boolean;
};

export type CardsDb = Record<string, CardData>;

// ==========================================
// Alter Ego Types
// ==========================================

export type AlterEgoCard = {
  Title: string;
  Id?: string;
  Description: string;
  Question?: string;
};

export type AlterEgosDb = Record<string, AlterEgoCard>;

// ==========================================
// Share Types
// ==========================================

export type ShareData = {
  title: string;
  exTitle: string;
  exDescription: string;
  exText: string;
  exImage: {
    img?: EnhancedImgModule;
  };
  bgColor: string;
  url: string;
};

export type FinalShareData = {
  text: string;
  url: string;
  files: File[];
};

export type ShareInfo = {
  title: string;
  exTitle: string;
  text: string;
  url: string;
};

// ==========================================
// Tedium/Data Policy Types
// ==========================================

export type TeamMember = {
  name: string;
  email: string;
};

export type TediumScene = {
  Title: string;
  Commentary: string;
  Caption?: string;
};

export type TediumData = {
  About: {
    Title: string;
    Subtitle: string;
    SubDescription: string;
    Description: string;
  };
  Team: TeamMember[];
  Scene1: TediumScene;
  Scene2: TediumScene;
  Scene3: TediumScene;
  Scene4: TediumScene;
  Scene5: TediumScene;
};

export type DatapolicyData = {
  About: {
    Title: string;
    Subtitle: string;
    Description: string;
  };
};

export type ResearchTeamMember = {
  name: string;
  role: string;
  contact: string;
  url: string;
};

export type ResearchTeam = ResearchTeamMember[];

export type Inquirers = string[];

// ==========================================
// Footer/Navigation Types
// ==========================================

export type FooterLink = {
  label: string;
  img?: MediaImport;
  url?: string;
  href?: string;
  isButton?: boolean;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type NavLink = {
  label: string;
  href?: string;
  url?: string;
};

export type MainButton = {
  label: string;
  href?: string;
  url?: string;
  status?: string;
  icon?: MediaImport;
};

// ==========================================
// Animation Types
// ==========================================

export type AnimationState = {
  element: HTMLElement;
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
  vx: number;
  vy: number;
  phaseX: number;
  phaseY: number;
  isDragging: boolean;
};

// ==========================================
// Page Data Types
// ==========================================

export type PageData = {
  cardsDb?: CardsDb;
  floatersDb?: FloatersDb;
  alterEgosDb?: AlterEgosDb;
  title?: string;
  subtitle?: string;
  description?: string;
  SubDescription?: string;
  media?: EnhancedImgModule[];
  textPolicy?: Record<string, { title: string; text: string }>;
  inquirers?: string[];
  logoImage?: MediaImport;
  condensed_logo?: MediaImport;
  condensed_logo_white?: MediaImport;
  backgroundImage?: EnhancedImgModule;
};

// ==========================================
// Meta Types
// ==========================================

export type MetaData = {
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
};
