import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { ImageDto } from "../dtos/Image/ImageDto";
import { CreateImageDto } from "../dtos/Image/CreateImageDto";

@Injectable({
    providedIn: 'root',
})
export class ImageService extends HttpService{
    getImage(id: number): Observable<ImageDto> {
        return this.get<ImageDto>(`/Image/get/${id}`);
    }

    getAllImages(): Observable<Array<ImageDto>> {
        return this.get<Array<ImageDto>>(`/Image/getAll`);
    }

    createImage(dto: CreateImageDto): Observable<ImageDto> {
        return this.post<ImageDto>('/Image/create', dto);
    }

    updateImage(id: number, dto: ImageDto): Observable<void> {
        return this.put<void>(`/Image/update/${id}`, dto);
    }

    deleteImage(id: number): Observable<void> {
        return this.delete<void>(`/data/${id}`);
    }
}