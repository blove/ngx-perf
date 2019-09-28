import { Component } from '@angular/core';
import { PerformanceService } from 'performance';

@Component({
  selector: 'str-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly performanceService: PerformanceService) {
    this.performanceService.fp$.subscribe(fp => console.log('fp', fp));
    // this.performanceService.fcp$.subscribe(fcp => console.log('fcp', fcp));
    // this.performanceService.tti$.subscribe(tti => console.log('tti', tti));
  }
}
