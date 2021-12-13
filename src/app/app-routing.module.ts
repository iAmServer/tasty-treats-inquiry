import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inquiry',
    pathMatch: 'full',
  },
  {
    path: 'inquiry',
    component: FormComponent,
  },
  {
    path: 'inquires/list',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
