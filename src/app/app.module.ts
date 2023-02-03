
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { CustomerComponentComponent } from './components/main/customer-component/customer.component';
import { CustomerService } from './services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { AddCustomerComponent } from './components/main/customer-component/add-customer/add-customer.component';
import { StatisticsModule } from './components/main/statistics/statistics.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerComponentComponent,
    AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StatisticsModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
