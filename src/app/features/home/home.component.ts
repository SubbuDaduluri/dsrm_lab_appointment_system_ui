import { Component, computed, signal } from '@angular/core';
import { AppCommomModule } from '../../shared/app.common.module';
import { Chart } from 'chart.js/auto';
import { CustomSidenavComponent } from '../../shared/components/custom-sidenav/custom-sidenav.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { GridColsDirective } from '../../shared/directives/grid-cols.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppCommomModule,
    CustomSidenavComponent,
    HeaderComponent,GridColsDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'dsrm_lab_appointment_system_ui';

  collapsed = signal(false);
  sideNavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  showFiller = false;
  events: string[] = [];
  opened: boolean = false;
  sideBarOpened: boolean = true;

  toggleSideNav(eventData : boolean) {
    this.collapsed.set(eventData);
  }
}
