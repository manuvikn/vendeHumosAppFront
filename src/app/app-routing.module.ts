import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearVendeComponent } from './components/crear-vende/crear-vende.component';
import { BodyComponent } from './components/dom/body/body.component';
import { MainComponent } from './components/dom/main/main.component';
import { InfoVendeComponent } from './components/info-vende/info-vende.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BodyGuard } from './guards/body.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [ BodyGuard ],
    children: [
      {
        path: '',
        component: BodyComponent
      },
      {
        path: 'new-vendehumos',
        component: CrearVendeComponent
      },
      {
        path: 'vende-humos/:id',
        component: InfoVendeComponent
      },
      {
        path: 'perfil',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
