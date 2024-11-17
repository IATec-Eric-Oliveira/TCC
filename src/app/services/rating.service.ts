import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { RatingDto } from "../dtos/Rating/RatingDto";
import { CreateRatingDto } from "../dtos/Rating/CreateRatingDto";

@Injectable({
    providedIn: 'root',
})
export class RatingService extends HttpService{
    getRating(id: number): Observable<RatingDto> {
        return this.get<RatingDto>(`/Rating/get/${id}`);
    }

    getAllRatings(): Observable<Array<RatingDto>> {
        return this.get<Array<RatingDto>>(`/Rating/getAll`);
    }

    createRating(dto: CreateRatingDto): Observable<RatingDto> {
        return this.post<RatingDto>('/Rating/create', dto);
    }

    updateRating(id: number, dto: RatingDto): Observable<void> {
        return this.put<void>(`/Rating/update/${id}`, dto);
    }

    deleteRating(id: number): Observable<void> {
        return this.delete<void>(`/Rating/${id}`);
    }
}