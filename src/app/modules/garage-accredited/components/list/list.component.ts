import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { GarageAccreditedService } from '../../../../services/garage-accredited.service';
import { AccreditedGaragesSearchResult } from '../../../../core/interfaces/accredited-garages-search-result.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DataViewModule,
    NgFor,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [provideNgxMask()],
})
export class ListComponent implements OnInit, OnDestroy {
  suggestions: AccreditedGaragesSearchResult[] = [];
  suggestions$ = toObservable(this.garageAccreditedService.suggestions);
  private subscriptions: Subject<boolean> = new Subject<boolean>();

  constructor(public garageAccreditedService: GarageAccreditedService) {}

  ngOnInit(): void {
    this.suggestions$
      .pipe(takeUntil(this.subscriptions))
      .subscribe((suggestions) => {
        this.suggestions = suggestions ?? [];
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  onSelect(selectedGarage: AccreditedGaragesSearchResult) {
    this.garageAccreditedService.selectedGarage.set(selectedGarage);
    this.garageAccreditedService.isDetails.set(true);
    this.garageAccreditedService.filter.set(selectedGarage.name ?? '');
    this.garageAccreditedService.garageLatitude.set(
      selectedGarage.latitude ?? -15.83055
    );
    this.garageAccreditedService.garageLongitude.set(
      selectedGarage.longitude ?? -47.90369
    );
  }

  googleMapsRouteLink(garageLatitude: number, garageLongitude: number) {
    return `https://www.google.com/maps/dir/${this.garageAccreditedService.latitude()},${this.garageAccreditedService.longitude()}/${garageLatitude},${garageLongitude}`;
  }
}
