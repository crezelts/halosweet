// IUser interface definition in auth.service.ts
export interface IUser {
  email: string;
  password: string;
  name: string
}

// AuthService definition in auth.service.ts
export class AuthService {
  async signUp(user: IUser): Promise<void> {
    // Your implementation
  }
}
