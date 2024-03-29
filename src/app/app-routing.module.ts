import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './characters/character/character.component';
import { CharactersComponent } from './characters/characters/characters.component';
import { CharactersService } from './shared/services/characters.service';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: 'character', component: CharactersComponent,
  },
  {
    path: 'character/:id', component: CharacterComponent, resolve: {
      characterInfo: CharactersService,
    },
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'character' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
