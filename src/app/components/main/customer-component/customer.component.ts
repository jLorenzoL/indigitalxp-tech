import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { SnackBarConfigurationSharedComponent } from '../../shared/snackbar/snack-bar-configuration-shared/snack-bar-configuration-shared.component';

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
    private _snackBarClassShared: SnackBarConfigurationSharedComponent,
    private readonly _router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.createForm();
  }

  createForm() {
    this.filterSearchForm = new FormGroup({
      document: new FormControl("", [Validators.maxLength(9), Validators.minLength(8)]),
      email: new FormControl("", [Validators.email])
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  searchCustomer() {
    const valueFiltro = this.filterSearchForm.controls;
    const doc = valueFiltro["document"].value;
    const email = valueFiltro["email"].value;
    this.searchCustomerData(doc, email);
  }

  searchCustomerData(doc: string, email: string) {
    this._customerService.searchCustomer(doc, email).pipe(
      map((userData: any) => {
        this.setStep(1);
        userData.result.length > 0 ?
          this.dataSource = userData.result : this._snackBarClassShared.openSnackBar("No existen resultados", 5000, 'OK')
      })
    ).subscribe();
  }

  ngOnDestroy() {

  }

  addCustomer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '560px'

    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.dataSource = new MatTableDataSource<any[]>([]);
          this.searchCustomerData("", "");
        }
        
      });

  }

  viewGrafics() {
    this._router.navigate(['/statistics']);
  }

  resetForm() {
    this.dataSource = new MatTableDataSource<any[]>([]);
    this.setStep(0)
    const valueFiltro = this.filterSearchForm.controls;
    valueFiltro["document"].setValue('');
    valueFiltro["email"].setValue('');
  }

}
