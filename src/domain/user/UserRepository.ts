import type { User } from './User';

export type UserRepository = {
  save: (user: User) => Promise<void>;
  update: (user: User) => Promise<void>;
  findById: (id: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  delete: (id: string) => Promise<void>;
};
