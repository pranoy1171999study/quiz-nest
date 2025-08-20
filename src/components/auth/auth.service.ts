// auth.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../../services/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private router: Router, private route:ActivatedRoute) { }
    // -------- Sign Up --------
    async signUp(email: string, password: string, fullName?: string, profilePictureUrl?: string): Promise<User> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { fullName, profilePictureUrl, provider: 'local' },
            },
        });
        if (error) throw error;
        return data.user!;
    }

    // -------- Sign In --------
    async signIn(email: string, password: string){
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        this.redirectToHimeOrPrevPage();
    }

    // -------- Google OAuth --------
    async signInWithGoogle(): Promise<void> {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw error;
        this.redirectToHimeOrPrevPage();
    }

    // -------- Session --------
    async getSession(): Promise<Session | null> {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    }

    // -------- Current User (if session valid) --------
    async getUser(): Promise<User | null> {
        const session = await this.getSession();
        return session?.user ?? null;
    }

    // -------- Sign Out --------
    async signOut(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // redirect after logout
        this.router.navigate(['/login']);
    }

    redirectToHimeOrPrevPage(){
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
        this.router.navigateByUrl(returnUrl);
      } else {
        this.router.navigate(['/']);
      }
    }
}
