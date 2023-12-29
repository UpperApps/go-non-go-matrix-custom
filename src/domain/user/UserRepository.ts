import type { User } from './User';

export type UserRepository = {
  save: (user: User) => Promise<void>;
  update: (id: string, user: User) => Promise<void>;
  findById: (id: string) => Promise<User | undefined>;
  findAll: () => Promise<User[]>;
  delete: (id: string) => Promise<void>;
};
