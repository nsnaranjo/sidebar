import { Routes } from '@angular/router';
import {AuthGuard} from "../application/guards/auth.guard";
import {LayoutComponent} from "./layout/layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {UserProfileResolver} from "../application/resolvers/user-profile.resolver";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    //canActivate: [AuthGuard],
    //resolve: { userProfile: UserProfileResolver },
    children: [
      {
        path: '',
        component: DashboardComponent,
        //canActivate: [AuthGuard],
      }
    ]
  }
];
