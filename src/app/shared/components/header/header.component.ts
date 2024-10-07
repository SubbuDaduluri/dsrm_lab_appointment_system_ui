import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, Signal, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppCommomModule } from '../../app.common.module';
import { StorageService } from '../../../core/services/storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    AppCommomModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isDarkTheme: Observable<boolean> | undefined;

  constructor(private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  collapsed = false;
  @Output() sideNavCollapsed = new EventEmitter<boolean>();

  toggleSideNav() {
    this.collapsed = !this.collapsed;
    this.sideNavCollapsed.emit(this.collapsed);
  }

  logout(): void {
    this.authService.logout();
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
