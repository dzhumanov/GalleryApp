import { Model } from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  role: string;
  token: string;
  displayName: string;
  googleID?: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;
