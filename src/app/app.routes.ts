import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicenowHomeComponent } from './servicenow-home/servicenow-home.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home"
  },
  {
    path: "sn",
    component: ServicenowHomeComponent,
    title: "ServiceNow"
  }
];
