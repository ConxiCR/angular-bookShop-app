import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ],
})
export class ConfirmationDialogModule { }
