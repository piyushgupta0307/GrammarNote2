import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { ResizerDirective } from './directives/resizer.directive';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdTooltipBasic } from './tooltip-basic';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    ResizerDirective,
    // NgbdTooltipBasics
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
