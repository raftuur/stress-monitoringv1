export interface Respondent {
  id: number;
  respondent_code: string;
  full_name: string;
  gender: string;
  age: number;
  occupation: string;
  created_at: string;
  updated_at: string;
}

export interface RespondentPagination {
  items: Respondent[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateRespondentRequest {
  full_name: string;
  gender: string;
  age: number;
  occupation: string;
}