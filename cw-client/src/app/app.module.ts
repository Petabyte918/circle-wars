import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EntitiesService } from './entities/entities.service'

import { AppComponent } from './app.component';
import { GameWindowComponent } from './game-window/game-window.component';

@NgModule({
  declarations: [
    AppComponent,
    GameWindowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EntitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
