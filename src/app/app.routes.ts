import { Route, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login/login.component';
import { MenuItem, menuItems } from './core/models/menu.item';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PartnerSignupComponent } from './core/components/partner/partner-signup/partner-signup.component';

const itemToRoute = (i: MenuItem): Route => {
    const route: Route = { path: i.route, component: i.component };
    if (i.children) {
        route.children = i.children.map((s) => itemToRoute(s))
    }
    return route;
};

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'partner_signup', component: PartnerSignupComponent 
    },
    {
        path: 'home', component: HomeComponent,
        canActivate : [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            ...menuItems.map((i) => itemToRoute(i))
        ]
    }

    // {
    //     path: 'home', component: HomeComponent,
    //     data: {
    //         title: 'Home',
    //     },
    //     children: [
    //         { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    //         {
    //             path: 'dashboard', component: DashboardComponent,
    //             data: {
    //                 title: 'Dashboard',
    //             }
    //         },
    //         {
    //             path: 'labs', component: LabsComponent,
    //             children: [
    //                 {
    //                     path: 'add-lab', component: AddLabComponent
    //                 },
    //                 {
    //                     path: 'edit-lab', component: EditLabComponent
    //                 },
    //                 {
    //                     path: 'view-lab', component: ViewLabComponent
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'services', component: ServicesComponent
    //         },
    //         {
    //             path: 'patients', component: PatiensComponent
    //         },
    //         {
    //             path: 'staff', component: LabStaffComponent
    //         },
    //         {
    //             path: 'appointment', component: AppointmentsComponent
    //         }
    //     ]
    // }
];

