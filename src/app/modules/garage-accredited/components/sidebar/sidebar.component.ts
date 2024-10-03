import { Component, OnDestroy } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { DetailsComponent } from '../details/details.component';
import { SearchComponent } from '../search/search.component';
import { GarageAccreditedService } from '../../../../services/garage-accredited.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [ListComponent, DetailsComponent, SearchComponent],
})
export class SidebarComponent implements OnDestroy {
  isDetails: boolean = false;
  isDetails$ = toObservable(this.garageAccreditedService.isDetails);
  private subscriptions: Subject<boolean> = new Subject<boolean>();

  constructor(public garageAccreditedService: GarageAccreditedService) {
    this.isDetails$
      .pipe(takeUntil(this.subscriptions))
      .subscribe((isDetails) => {
        this.isDetails = isDetails ?? [];
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }
}
