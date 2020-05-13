
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule, PoTemplatesModule } from '@po-ui/ng-templates';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    PoPageLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
