
export interface Gender {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface GenderResponse {
  genders: Gender[];
}


