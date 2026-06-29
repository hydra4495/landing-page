export interface ContestTimeline {
  phase: string;
  date: string;
}

export interface ContestPrize {
  title: string;
  amount: string;
  desc: string;
  icon: string;
  isFirst?: boolean;
}

export interface ContestRule {
  icon: string;
  title: string;
  description: string;
}

export interface EvaluationCriteria {
  title: string;
  desc: string;
}

export interface SectionConfig {
  id: string;
  name: string;
  visible: boolean;
}

export interface LandingPageContent {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    ctaBtn: string;
    imageUrl: string;
  };
  about: {
    title: string;
    titleHighlight: string;
    desc: string;
    imageUrl: string;
  };
  info: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: ContestRule[];
  };
  prizes: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: ContestPrize[];
  };
  criteria: {
    title: string;
    titleHighlight: string;
    desc: string;
    imageUrl: string;
    items: EvaluationCriteria[];
  };
  submission?: {
    title: string;
    titleHighlight: string;
    organizerLabel: string;
    organizerContent: string;
    methodLabel: string;
    emailLabel: string;
    emailContent: string;
    physicalLabel: string;
    physicalContent: string;
  };
}
