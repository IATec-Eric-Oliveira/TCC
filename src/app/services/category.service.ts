import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { CategoryDto } from "../dtos/Category/CategoryDto";

@Injectable({
    providedIn: 'root',
})
export class CategoryService extends HttpService{
    getCategory(id: number): Observable<CategoryDto> {
        return this.get<CategoryDto>(`/Category/get/${id}`);
    }

    getAllUsers(): Observable<Array<CategoryDto>> {
        return this.get<Array<CategoryDto>>(`/Category/getAll`);
    }

    createCategory(dto: CategoryDto): Observable<CategoryDto> {
        return this.post<CategoryDto>('/Category/create', dto);
    }

    updateCategory(id: number, dto: CategoryDto): Observable<void> {
        return this.put<void>(`/Category/update/${id}`, dto);
    }

    deleteCategory(id: number): Observable<void> {
        return this.delete<void>(`/Category/${id}`);
    }
}