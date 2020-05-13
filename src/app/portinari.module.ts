import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoToolbarModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoMenuPanelModule } from '@po-ui/ng-components';
import { PoModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoGridModule } from '@po-ui/ng-components';
import { PoTableModule } from '@po-ui/ng-components';
import { PoDividerModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoToolbarModule,
    PoPageLoginModule,
    PoTemplatesModule,
    PoMenuPanelModule,
    PoModule,
    PoFieldModule,
    PoGridModule,
    PoTableModule,
    PoDividerModule


  ],
  exports:[
    CommonModule,
    PoToolbarModule,
    PoPageLoginModule,
    PoTemplatesModule,
    PoMenuPanelModule,
    PoModule,
    PoFieldModule,
    PoGridModule,
    PoTableModule,
    PoDividerModule
  ]
})
export class PortinariModule { }
