import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UtilisateurViewComponent } from './utilisateur-view/utilisateur-view.Component';
  import { from } from 'rxjs';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';


const routes: Routes = [
  {
    path: '',
    name: 'auth',
    component: AuthComponent,
  },
  {
    path: 'auth',
    name: 'auth',
    component: AuthComponent,
  },
  {
    path: 'utilisateurs',
    name: 'utilisateur',
    component: UtilisateurViewComponent,
    //canActivate: [AuthGuard] ,
  },
  {
    path: 'utilisateur',
    name: 'utilisateur',
    component: UtilisateurComponent,
    //canActivate: [AuthGuard, AdminGuard] ,
  },
 
] as Array<{
    name?: string;
    path: string;
    component: any
}>;



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
