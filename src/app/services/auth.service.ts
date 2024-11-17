import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { LoginDto } from "../dtos/User/LoginDto";
import { LoginResponseDto } from "../dtos/User/LoginResponseDto";

@Injectable({
    providedIn: 'root',
})
export class AuthService extends HttpService{
    login(dto: LoginDto): Observable<LoginResponseDto> {
        return this.post<LoginResponseDto>('/User/login', dto);
    }
}