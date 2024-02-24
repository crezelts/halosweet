// pages/superbase.service.ts

import { createClient } from "@supabase/supabase-js";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SuperbaseService {
  private supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  private supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  public getSupabase() {
    return this.supabase;
  }
  
  public async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }
}

