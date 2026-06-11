import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiComponent } from './shared-ui.component';

@NgModule({
  declarations: [
    SharedUiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SharedUiComponent
  ]
})
export class SharedUiModule { }
