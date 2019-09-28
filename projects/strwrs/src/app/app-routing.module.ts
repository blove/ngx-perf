import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mos-eisley',
    loadChildren: './features/mos-eisley/mos-eisley.module#MosEisleyModule'
  },
  {
    path: 'people',
    loadChildren: './features/people/people.module#PeopleModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
