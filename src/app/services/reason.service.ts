import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { ReasonDto } from "../dtos/Reason/ReasonDto";
import { CreateReasonDto } from "../dtos/Reason/CreateReasonDto";

@Injectable({
    providedIn: 'root',
})
export class ReasonService extends HttpService{
    getReason(id: number): Observable<ReasonDto> {
        return this.get<ReasonDto>(`/Reason/get/${id}`);
    }

    getAllReasons(): Observable<Array<ReasonDto>> {
        return this.get<Array<ReasonDto>>(`/Reason/getAll`);
    }

    createReason(dto: CreateReasonDto): Observable<ReasonDto> {
        return this.post<ReasonDto>('/Reason/create', dto);
    }

    updateReason(id: number, dto: ReasonDto): Observable<void> {
        return this.put<void>(`/Reason/update/${id}`, dto);
    }

    deleteReason(id: number): Observable<void> {
        return this.delete<void>(`/Reason/${id}`);
    }
}