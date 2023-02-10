import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-configuration-shared',
  templateUrl: './snack-bar-configuration-shared.component.html'
})
export class SnackBarConfigurationSharedComponent {

  constructor(public snackBarShared: MatSnackBar) { }

  openSnackBar(texto:string, tiempo:number,textoButton:string, position?:any) {
    position = position == null ? 'bottom' : position;
      this.snackBarShared.open(texto,textoButton,{ duration: tiempo, verticalPosition:position });
  }
}
