import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { httpInterceptorProviders } from '../_helpers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { 

  
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      //providers: [httpInterceptorProviders]
    }
  }
}
