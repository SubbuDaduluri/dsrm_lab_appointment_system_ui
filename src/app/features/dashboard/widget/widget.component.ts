import { NgComponentOutlet } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AppCommomModule } from '../../../shared/app.common.module';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DashboardMiniCardWidget } from '../../../core/models/dashboard.widget.model';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgComponentOutlet, MatButtonModule,MatIcon,
    AppCommomModule
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent {
  widgetData= input.required<DashboardMiniCardWidget>();
  mode: ProgressBarMode = 'determinate';
  bufferValue = 75;




}
