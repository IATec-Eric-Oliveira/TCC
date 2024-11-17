import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { ReportDto } from "../dtos/Report/ReportDto";
import { CreateReportDto } from "../dtos/Report/CreateReportDto";

@Injectable({
    providedIn: 'root',
})
export class ReportService extends HttpService{
    getReport(id: number): Observable<ReportDto> {
        return this.get<ReportDto>(`/Report/get/${id}`);
    }

    getAllReports(): Observable<Array<ReportDto>> {
        return this.get<Array<ReportDto>>(`/Report/getAll`);
    }

    createReport(dto: CreateReportDto): Observable<ReportDto> {
        return this.post<ReportDto>('/Report/create', dto);
    }

    updateReport(id: number, dto: ReportDto): Observable<void> {
        return this.put<void>(`/Report/update/${id}`, dto);
    }

    deleteReport(id: number): Observable<void> {
        return this.delete<void>(`/Report/${id}`);
    }
}