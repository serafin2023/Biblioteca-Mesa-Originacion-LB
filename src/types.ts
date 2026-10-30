export type ViewMode = 'com' | 'pla';

export type SchemeKey = 'eudr' | 'epa' | 'bs' | 'comun';

export type RouteType = 'direct' | 'plant';

export type RoleKey = 'prod' | 'com' | 'adm' | 'log' | 'pla' | 'exp';

export interface QuestionItem {
  q: string;
  ok: number; // 1 for yes, 0 for no
}

export interface StepAction {
  role: RoleKey;
  text: string;
  owner: string;
}

export interface RouteStops {
  campo?: [RoleKey, string, string][];
  planta?: [RoleKey, string, string][];
  puerto?: [RoleKey, string, string][];
}

export interface ViewSchemeData {
  qs: (string | QuestionItem)[];
  ok: string;
  okNote: string;
  noNote: string;
  direct: RouteStops;
  plant: RouteStops;
}

export interface SchemeInfo {
  code: string;
  dest: string;
  cut: string;
  ficha: [string, string][];
  cutText: string;
  validate: boolean;
  com: ViewSchemeData;
  pla: ViewSchemeData;
}

export interface ContactItem {
  color: string;
  label: string;
  name: string;
}

export interface ViewContent {
  heroT: string;
  heroP: string;
  mk: string;
  chk: string;
  chkSub: string;
  contacts: [string, string, string][];
}
