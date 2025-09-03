// models/User.ts
export type UserType = {
  id: number;
  username: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
