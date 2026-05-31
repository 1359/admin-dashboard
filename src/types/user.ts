export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
  };
  address?: {
    street: string;
    city: string;
  };
}

export interface CreateUserData {
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: number;
}
