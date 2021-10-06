import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearVendeComponent } from './components/crear-vende/crear-vende.component';
import { BodyComponent } from './components/dom/body/body.component';
import { MainComponent } from './components/dom/main/main.component';
import { LoginComponent } from './components/login/login.component';
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
