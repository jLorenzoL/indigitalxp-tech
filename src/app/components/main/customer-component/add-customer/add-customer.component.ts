import { FormBuilder, FormGroup } from '@angular/forms';
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
            name: [this.name, []],
            apellido: [this.apellido, []],
            email: [this.email, []],
            document: [this.document, []],
            born: [this.born, []]
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}