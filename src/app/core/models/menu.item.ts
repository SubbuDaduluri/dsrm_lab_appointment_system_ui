import { Type } from "@angular/core";
import { HomeComponent } from "../../features/home/home.component";
import { DashboardComponent } from "../../features/dashboard/dashboard.component";
import { LabsComponent } from "../../features/labs/labs.component";
import { ViewLabComponent } from "../../features/labs/view-lab/view-lab.component";
import { AddLabComponent } from "../../features/labs/add-lab/add-lab.component";
import { EditLabComponent } from "../../features/labs/edit-lab/edit-lab.component";
import { ServicesComponent } from "../../features/services/services.component";
import { PatiensComponent } from "../../features/patiens/patiens.component";
import { LabStaffComponent } from "../../features/lab-staff/lab-staff.component";
import { AppointmentsComponent } from "../../features/appointments/appointments.component";
import { CalendarAppointmentComponent } from "../../features/appointments/calendar-appointment/calendar-appointment.component";

export type MenuItem = {
    icon: string;
    label: string;
    show?: boolean;
    route?: string;
    children?: MenuItem[];
    component?: Type<unknown>;
}

export const menuItems: MenuItem[] = [
    // {
    //     label: 'Home',
    //     icon: 'home',
    //     route: 'home',
    //     component: HomeComponent
    // },
    {
        label: 'Dashboard',
        icon: 'dashboard',
        route: 'dashboard',
        show: true,
        component: DashboardComponent
    },
    {
        label: 'Lab Management',
        icon: 'all_out',
        route: 'labs',
        show: true,
        component: LabsComponent,
        children: [
            {
                label: 'All Labs',
                icon: 'list',
                route: 'view-lab',
                show: true,
                component: ViewLabComponent
            }, {
                label: 'Add Lab',
                icon: 'add',
                route: 'add-lab',
                show: true,
                component: AddLabComponent
            }, {
                label: 'Edit Lab',
                icon: 'edit',
                route: 'edit-lab',
                show: false,
                component: AddLabComponent
            }
        ]
    },
    {
        label: 'Services',
        icon: 'local_laundry_service',
        route: 'services',
        show: true,
        component: ServicesComponent
    },
    {
        label: 'Patients',
        icon: 'account_circle',
        route: 'patients',
        show: true,
        component: PatiensComponent
    },
    {
        label: 'Staff',
        icon: 'assignment_ind',
        route: 'staff',
        show: true,
        component: LabStaffComponent
    },
    {
        label: 'Appointments',
        icon: 'date_range',
        route: 'appointments',
        show: true,
        component: AppointmentsComponent,
        children: [
            {
                label: 'Appointments',
                icon: 'date_range',
                route: 'calendar',
                show: true,
                component: CalendarAppointmentComponent
            },
            {
                label: 'Appointment List',
                icon: 'list',
                route: 'appointments-list',
                show: true,
                component: AppointmentsComponent
            },
            {
                label: 'Book Appointment',
                route: 'book-appointment',
                icon: 'add',
                show: true,
                component: AppointmentsComponent
            },
            {
                label: 'Edit Appointment',
                route: 'edit-appointment',
                icon: 'edit',
                show: false,
                component: AppointmentsComponent
            }
        ]
    }

]
