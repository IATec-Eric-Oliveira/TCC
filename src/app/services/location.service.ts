import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { LocationDto } from "../dtos/Location/LocationDto";
import { CreateLocationDto } from "../dtos/Location/CreateLocationDto";

@Injectable({
    providedIn: 'root',
})
export class LocationService extends HttpService{
    getLocation(id: number): Observable<LocationDto> {
        return this.get<LocationDto>(`/Location/get/${id}`);
    }

    getAllLocations(): Observable<Array<LocationDto>> {
        return this.get<Array<LocationDto>>(`/Location/getAll`);
    }

    createLocation(dto: CreateLocationDto): Observable<LocationDto> {
        return this.post<LocationDto>('/Location/create', dto);
    }

    updateLocation(id: number, dto: LocationDto): Observable<void> {
        return this.put<void>(`/Location/update/${id}`, dto);
    }

    deleteLocation(id: number): Observable<void> {
        return this.delete<void>(`/Location/${id}`);
    }
}