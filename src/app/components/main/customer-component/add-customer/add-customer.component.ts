import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'add-customer-component',
    templateUrl: './add-customer.component.html'
})
export class AddCustomerComponent implements OnInit {

    form: FormGroup;
    name:string;
    apellido:string;
    email: string;
    document: string;
    born: Date;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddCustomerComponent>){
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.name, [Validators.required]],
            apellido: [this.apellido, [Validators.required]],
            email: [this.email, [Validators.email]],
            document: [this.document, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
            born: [this.born, [Validators.required]]
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}