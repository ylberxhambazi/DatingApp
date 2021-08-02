import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './_guards/auth.guard'
import { ProfileListResolver } from './_resolvers/profile-list.resolver'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
        resolve: { users: ProfileListResolver }
      }
    ],
  },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
