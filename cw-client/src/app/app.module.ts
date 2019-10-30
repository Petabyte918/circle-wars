import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EntitiesService } from './entities/entities.service'

import { AppComponent } from './app.component';
import { GameWindowComponent } from './game-window/game-window.component';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './game/game.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { NameComponent } from './content-management/forms/name/name.component';
import { DescriptionComponent } from './content-management/forms/description/description.component';
import { NotesComponent } from './content-management/forms/notes/notes.component';
import { StringComponent } from './content-management/forms/primitives/string/string.component';
import { TextComponent } from './content-management/forms/primitives/text/text.component';
import { BooleanComponent } from './content-management/forms/primitives/boolean/boolean.component';
import { EnumComponent } from './content-management/forms/primitives/enum/enum.component';
import { ItemComponent } from './content-management/forms/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    GameWindowComponent,
    GameComponent,
    ContentManagementComponent,
    NameComponent,
    DescriptionComponent,
    NotesComponent,
    StringComponent,
    TextComponent,
    BooleanComponent,
    EnumComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [EntitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
