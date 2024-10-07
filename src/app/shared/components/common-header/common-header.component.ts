import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss'
})
export class CommonHeaderComponent {

  constructor( private router: Router){}

  navigateToLoginPage(){
    this.router.navigate(['/login']);
  }

}
