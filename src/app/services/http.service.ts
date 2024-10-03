import { AccreditedGaragesParameters } from '../core/interfaces/parameters/accredited-garages.parameters';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccreditedGaragesSearch } from '../core/interfaces/accredited-garages-search.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrlApi;
  }

  getAccreditedGarages(
    accreditedGaragesParameters?: AccreditedGaragesParameters
  ): Observable<Array<AccreditedGaragesSearch>> {
    let localVarPath = `/garage-accredited/?${new URLSearchParams({
      latitude: accreditedGaragesParameters?.latitude as string,
      longitude: accreditedGaragesParameters?.longitude as string,
    }).toString()}`;
    return this.http.get<Array<AccreditedGaragesSearch>>(
      `${this.baseUrl}${localVarPath}`
    );
  }
}
