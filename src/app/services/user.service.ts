import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { UserDto } from "../dtos/User/UserDto";
import { CreateUserDto } from "../dtos/User/CreateUserDto";

@Injectable({
    providedIn: 'root',
})
export class UserService extends HttpService{
    getUser(id: number): Observable<UserDto> {
        return this.get<UserDto>(`/User/get/${id}`);
    }

    getAllUsers(): Observable<Array<UserDto>> {
        return this.get<Array<UserDto>>(`/User/getAll`);
    }

    createUser(dto: CreateUserDto): Observable<UserDto> {
        return this.post<UserDto>('/User/create', dto);
    }

    updateUser(id: number, dto: UserDto): Observable<void> {
        return this.put<void>(`/User/update/${id}`, dto);
    }

    deleteUser(id: number): Observable<void> {
        return this.delete<void>(`/User/${id}`);
    }
}