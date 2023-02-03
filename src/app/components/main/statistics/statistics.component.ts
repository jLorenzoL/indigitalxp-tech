import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  dataSource: any[];
  dataSourceyyyy: any[];

  constructor(private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.searchInfoByMM();
    this.searchInfoByYYYY();
  }

  searchInfoByYYYY(){
    this._customerService.searchCustomerByYYYY().pipe(
      map((userData : any) => {
        this.dataSourceyyyy = userData.result
      })
    ).subscribe();
  }

  searchInfoByMM(){
    this._customerService.searchCustomerByMonth().pipe(
      map((userData : any) => {
        const result = this.transformData(userData.result);
        this.dataSource = result
      })
    ).subscribe();
  }

  transformData(result : any[]) : any[] {

    const list: { name: string; value: string; }[] = []
    result.forEach(element => {
      const val = {name:'', value: ''};
      val.name = this.transformNumberToMonth(element.name)
      val.value = element.value;
      list.push(val);
    });

    return list.splice(0);
    
  }

  transformNumberToMonth(val : any) : string{
    const date = new Date();
    date.setMonth(val - 1);
    return date.toLocaleString('en-PE', { month: 'long' });
  }

}

