import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IUser } from '../src/interface/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly supabase: SupabaseService,
    private readonly authService: AuthService
  ) { }

  // 사용자 등록 메서드
  async signIn(userForm: IUser) {
    const userId = await this.authService.signIn(userForm);

    return await this.supabase.getSupabase().from('getpost')
      .insert({ user_id: userId, name: userForm.name });
  }

  // 사용자 로그인 메서드
  async signUp(userForm: IUser) {
    return await this.authService.signUp(userForm)
  }

  // 사용자 로그아웃 메서드
  async signOut() {
    return await this.authService.signOut();
  }

  // 현재 로그인된 사용자의 프로필 정보를 가져오는 메서드
  async getProfile() {
    const userId = await this.authService.getProfile()

    return this.supabase.getSupabase().from('getpost')
      .select('username')
      .eq('id', userId)
      .single();
  }

  // 사용자 프로필 정보 업데이트 메서드
  async updateProfile(userUpdate: IUser) {
    const userId = await this.authService.getProfile()

    const updateUser = {
      username: userUpdate.name,
      user_id: userId,
    };

    return this.supabase.getSupabase().from('getpost').upsert(updateUser);
  }
}