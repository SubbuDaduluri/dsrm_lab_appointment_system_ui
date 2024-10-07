import { Component, computed, input, signal } from '@angular/core';
import { AppCommomModule } from '../../app.common.module';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenuItem } from '../../../core/models/menu.item';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  animations: [
    trigger('expandSubMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ],
  imports: [AppCommomModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  item = input.required<MenuItem>();
  collapsed = input(false);
  nestedMenuOpen = signal(false);
  routeHistory = input('');
  level = computed(() => this.routeHistory().split('/').length - 1);

  indentation = computed(() => this.collapsed() ? '16px' : `${(16 + (this.level() * 16))}px`);
  toggleNested() {
    if (!this.item().children) {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
