import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ContentManagementComponent } from './content-management/content-management.component'
import { GameComponent } from './game/game.component'

const routes: Routes = [
  { path: 'content-management', component: ContentManagementComponent },
   {path: '', component: GameComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
