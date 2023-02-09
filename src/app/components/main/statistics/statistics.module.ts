import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: 'statistics', component: StatisticsComponent }]),
    NgxChartsModule,
    MaterialModule
  ]
})
export class StatisticsModule { }
