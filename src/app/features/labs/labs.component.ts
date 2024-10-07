import { Component } from '@angular/core';
import { AppCommomModule } from '../../shared/app.common.module';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [AppCommomModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {

}
