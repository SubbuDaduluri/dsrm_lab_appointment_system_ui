import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { AppCommomModule } from '../../app.common.module';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItem, menuItems } from '../../../core/models/menu.item';

// export type MenuItem = {
//   icon: string;
//   label: string;
//   route?: string;
//   children?: MenuItem[];
// }


@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [AppCommomModule, MenuItemComponent],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent implements OnInit {


  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItemsSideNav: MenuItem[] = [];

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');


  ngOnInit(): void {
    this.menuItemsSideNav = menuItems.map((menu, i) => {
      if (menu.route?.indexOf('home') == -1) {
        menu.route = 'home/' + menu.route;
      }
      return menu;
    });

  }

}
