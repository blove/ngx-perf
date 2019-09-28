import { Component } from '@angular/core';
import { NgxPerfComponent } from 'projects/performance/src/public-api';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@NgxPerfComponent('HomeComponent')
export class HomeComponent {}
