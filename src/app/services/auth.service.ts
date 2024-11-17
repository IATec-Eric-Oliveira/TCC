import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { LoginDto } from "../dtos/User/LoginDto";
import { LoginResponseDto } from "../dtos/User/LoginResponseDto";

@Injectable({
    providedIn: 'root',
})
export class AuthService extends HttpService{
    private readonly TOKEN_KEY = 'authToken';

    login(dto: LoginDto): Observable<LoginResponseDto> {
        return this.post<LoginResponseDto>('/User/login', dto);
    }
    
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        // Additional token validation (e.g., expiration check) can be done here
        return !!token;
    }
}