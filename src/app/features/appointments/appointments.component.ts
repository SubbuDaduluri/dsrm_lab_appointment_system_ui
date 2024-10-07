import { Component } from '@angular/core';
import { AppCommomModule } from '../../shared/app.common.module';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [AppCommomModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {

}
