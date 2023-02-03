import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-mensaje',
  templateUrl: './snack-bar-mensaje.component.html',
})
export class SnackBarMensajeComponent {
  constructor( 
    public snackBarRef: MatSnackBarRef<SnackBarMensajeComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  click(){
    //Evento al hacer click en ok
    this.snackBarRef.dismiss();
    return true;
  }
}