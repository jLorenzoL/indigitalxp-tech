import { Routes, RouterModule } from '@angular/router';
import { CustomerComponentComponent } from './components/main/customer-component/customer.component';
import { StatisticsComponent } from './components/main/statistics/statistics.component';


const APP_ROUTES: Routes = [
  { path : '**', component : CustomerComponentComponent },
  { path : 'customers', component : CustomerComponentComponent },
  { path : 'statistics', component : StatisticsComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);