import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ManageRequestTorneoComponent } from './pages/manage-request-torneo/manage-request-torneo.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CheckIfIsLogoutGuard } from './guards/check-if-is-logout.guard';
import { CheckIfIsLoggedOnGuard } from './guards/check-if-is-logged-on.guard';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { CheckIfIsAdminGuard } from './guards/check-if-is-admin.guard';
import { ManageClubsComponent } from './pages/manage-clubs/manage-clubs.component';
import { ManageParticipantComponent } from './pages/manage-participant/manage-participant.component';
import { ManageCentroEstudiosComponent } from './pages/manage-centro-estudios/manage-centro-estudios.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [CheckIfIsLoggedOnGuard]
    },
    {
        path: 'manage-request-torneo',
        component: ManageRequestTorneoComponent,
        canActivate: [CheckIfIsLogoutGuard],
    },
    {
        path: 'manage-participants',
        component: ManageParticipantComponent,
        canActivate: [CheckIfIsLogoutGuard],
    },
    {
        path: 'manage-clubs',
        component: ManageClubsComponent,
        canActivate: [CheckIfIsLogoutGuard],
    },
    {
        path: 'manage-centro-estudios',
        component: ManageCentroEstudiosComponent,
        canActivate: [CheckIfIsLogoutGuard],
    },
    {
        path: 'manage-users',
        component: ManageUserComponent,
        canActivate: [CheckIfIsLogoutGuard, CheckIfIsAdminGuard],
    },
    {
        path: '',
        redirectTo: '/manage-request-torneo',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];
