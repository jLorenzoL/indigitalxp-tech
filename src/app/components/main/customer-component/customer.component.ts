import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { SnackBarConfigurationSharedComponent } from '../../shared/snackbar/snack-bar-configuration-shared/snack-bar-configuration-shared.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Subscription } from 'rxjs';
import { IResponseBusquedaCustomer } from 'src/app/models/response';
import { of } from 'rxjs';
import { CustomerRequest } from 'src/app/models/consultaRequest';

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponentComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  sort: MatSort = new MatSort();

  filterSearchForm!: FormGroup;
  isLoadingResults = true;
  dataSource = new MatTableDataSource();
  paginatorSubscribe?: Subscription;
  step = 0;
  resultsLength = 0;
  firstCallServiceSearch: boolean;
  searchFilters: CustomerRequest;
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

    if (this.dataSource) {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    }

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

    this.firstCallServiceSearch = true;

    if (this.filterSearchForm.valid && this.sort != undefined) {
      this.paginator.pageIndex = 0;

      if (this.paginatorSubscribe != undefined) this.paginatorSubscribe.unsubscribe();

      this.assembleData()

      this.paginatorSubscribe = merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            this.searchFilters.pageable = this.firstCallServiceSearch;

            if (!this.firstCallServiceSearch) {
              this.updatePageRequest()
            }
            return this._customerService.searchCustomerPage(this.searchFilters);
          }),
          map((data: IResponseBusquedaCustomer) => {

            if (this.firstCallServiceSearch) {
              if (data && data.totalPages >= 1) {
                this.resultsLength = data.totalElements;
                this.firstCallServiceSearch = false;
              } else {
                this.resultsLength = 0;
                this.isLoadingResults = false;
                this._snackBarClassShared.openSnackBar("No existen resultados", 5000, 'OK')
              }
            }
            return this.setDataSearch(data);
          }),
          catchError(() => {
            this.isLoadingResults = false;
            return of([]);
          })
        )
        .subscribe(data => { this.dataSource.data = data })
    }

  }

  setDataSearch(data: IResponseBusquedaCustomer) {
    if (data && data.totalElements >= 1) this.setStep(1);
    const resultRow: [] = [];
    data.customers.forEach(customer => {
      resultRow.push(customer);
    });
    return resultRow;
  }

  updatePageRequest() {
    this.searchFilters.results = this.paginator.pageSize;
    this.searchFilters.page = this.paginator.pageIndex;
  }

  assembleData() {
    const dato: CustomerRequest = new CustomerRequest();
    const valueFiltro = this.filterSearchForm.controls;
    dato.customerFilter.documentNumber = valueFiltro["document"].value;
    dato.customerFilter.email = valueFiltro["email"].value;
    dato.results = this.paginator.pageSize;
    dato.page = this.paginator.pageIndex;
    dato.pageable = true;
    this.searchFilters = dato;
    return;
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
      data => { if (data) this.searchCustomer() }
    );
  }

  viewGrafics() {
    this._router.navigate(['/statistics']);
  }

  resetForm() {
    this.dataSource = new MatTableDataSource();
    this.setStep(0)
    this.filterSearchForm.reset({
      document: "",
      email: ""
    })
    this.resultsLength = 0
    this.dataSource.data = [];
    this.searchFilters = new CustomerRequest();
    this.firstCallServiceSearch = false;
  }

}
