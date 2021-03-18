interface Goals {
  health: string[];
  social: string[];
  culture: string[];
  home: string[];
  space: string[];
  finance: string[];
}

interface Goal {
  category: string;
  goal: string;
  expire_at: Date;
}
