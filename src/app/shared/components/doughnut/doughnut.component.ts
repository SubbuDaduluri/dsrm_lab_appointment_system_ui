import { Component, input, OnInit } from '@angular/core';
import { AppCommomModule } from '../../app.common.module';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ChartConfiguration } from 'chart.js';
import { DashboardChartWidget } from '../../../core/models/dashboard.chart.widget.model';

@Component({
  selector: 'app-doughnut',
  standalone: true,
  imports: [CommonModule, BaseChartDirective,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.scss'
})
export class DoughnutComponent implements OnInit {

  chartWidget = input.required<DashboardChartWidget>();

  public barChartType = "doughnut";
  public barChartLegend = true;
  public barChartData = {
    labels: [
      'Pending',
      'Completed',
      'Inprocess'
    ],
    datasets: [{
      label: 'Patient Appointment Status',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        enabled: true
      },
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
