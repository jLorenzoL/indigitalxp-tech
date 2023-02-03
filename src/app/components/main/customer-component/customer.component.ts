import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponentComponent implements OnInit {

  filterSearchForm!: FormGroup;
  isLoadingResults = true;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  step = 0;

  displayedColumns: string[] = [
    'name',
    'email',
    'document'
  ];
  constructor(
    private _customerService: CustomerService,
    private readonly _router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.createForm();
  }

  createForm(){
    this.filterSearchForm = new FormGroup({
      document: new FormControl("", [Validators.maxLength(9), Validators.minLength(8)]),
      email: new FormControl("", [Validators.email])
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  searchCustomer(){
    const valueFiltro = this.filterSearchForm.controls;
    const doc = valueFiltro["document"].value;
    const email = valueFiltro["email"].value;
    this.searchCustomerData(doc, email);
  }

  searchCustomerData(doc: string, email: string){
    this._customerService.searchCustomer(doc, email).pipe(
      map((userData : any) => {
        this.setStep(1);
        this.dataSource = userData.result
      })
    ).subscribe();
  }

  ngOnDestroy(){

  }

  addCustomer(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= '560px'

    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.saveCustomer(data)
      });    

  }

  saveCustomer(data: any){

    console.log(data)

    const requestBody = {
      "name" : data.name,
      "lastname": data.apellido,
      "mail": data.email,
      "document" : data.document,
      "born": data.born
    }

    this._customerService.saveNewCustomer(requestBody)
      .subscribe({
      next: (res) => {
        console.log(res);
        if(res.state == true) {
          this.dataSource = new MatTableDataSource<any[]>([]);
          this.searchCustomerData("","");
        }
      },
      error: (e) => console.error(e)
    });;


  }



  resetForm(){
    console.log('LIMPIAR CAMPOS')
  }

}
