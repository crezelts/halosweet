// pages/.ts

import { createClient } from "@supabase/supabase-js";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  private supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  public getSupabase() {
    return this.supabase;
  }
}

