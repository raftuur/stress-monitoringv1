export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "OPERATOR";
  status: boolean;
  created_at: string;
  updated_at: string;
}