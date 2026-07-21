export type CategoryId =
  | "company"
  | "person"
  | "university"
  | "highschool"
  | "vocationalSchool"
  | "juniorHighSchool"
  | "elementarySchool"
  | "address"
  | "birthdate"
  | "phoneNumber"
  | "email"
  | "gender"
  | "age";

export interface CategoryMatch {
  category: CategoryId;
  start: number;
  end: number;
  text: string;
}

export interface MappingEntry {
  category: CategoryId;
  original: string;
  label: string;
}

export interface AnonymizeResult {
  output: string;
  mapping: MappingEntry[];
}
