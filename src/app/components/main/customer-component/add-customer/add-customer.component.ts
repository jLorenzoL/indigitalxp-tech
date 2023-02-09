import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { SnackBarConfigurationSharedComponent } from 'src/app/components/shared/snackbar/snack-bar-configuration-shared/snack-bar-configuration-shared.component';

@Component({
    selector: 'add-customer-component',
    templateUrl: './add-customer.component.html'
})
export class AddCustomerComponent implements OnInit {

    form: FormGroup;
    name: string;
    apellido: string;
    email: string;
    document: string;
    born: Date;

    constructor(
        private fb: FormBuilder,
        private _customerService: CustomerService,
        private _snackBarClassShared: SnackBarConfigurationSharedComponent,
        private dialogRef: MatDialogRef<AddCustomerComponent>) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.name, [Validators.required]],
            apellido: [this.apellido, [Validators.required]],
            email: [this.email, [Validators.required, Validators.email]],
            document: [this.document, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
            born: [this.born, [Validators.required]]
        });
    }

    save() {
        const requestBody = {
            "name": this.form.value.name,
            "lastname": this.form.value.apellido,
            "mail": this.form.value.email,
            "document": this.form.value.document,
            "born": this.form.value.born
        }

        this._customerService.saveNewCustomer(requestBody)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    if (res.state == true) {
                        this.dialogRef.close(this.form.value);
                    } else {
                        this._snackBarClassShared.openSnackBar(res.message, 5000, 'OK')
                    }
                },
                error: (e) => {
                    this._snackBarClassShared.openSnackBar(e.error.errors[0], 5000, 'OK')
                }
            });
    }

    close() {
        this.dialogRef.close();
    }

}