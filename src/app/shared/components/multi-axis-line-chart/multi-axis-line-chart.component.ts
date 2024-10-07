import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardChartWidget } from '../../../core/models/dashboard.chart.widget.model';
import 'chartjs-adapter-moment';



@Component({
  selector: 'app-multi-axis-line-chart',
  standalone: true,
  imports: [CommonModule,
    BaseChartDirective,
    MatCardModule,
    MatDividerModule],
  templateUrl: './multi-axis-line-chart.component.html',
  styleUrl: './multi-axis-line-chart.component.scss'
})
export class MultiAxisLineChartComponent {


  chartWidget = input.required<DashboardChartWidget>();

  chartType = "line";
  barChartLegend = true;
  lineChartData = {
    labels: [
      "2024-01-02",
      "2024-02-02",
      "2024-03-02",
      "2024-04-02",
      "2024-05-02",
      "2024-06-02",
      "2024-07-02",
      "2024-08-02",
      "2024-09-02",
      "2024-10-02",
      "2024-11-02",
      "2024-12-02",
    ],
    datasets: [
      {
        "backgroundColor": "rgb(156, 39, 176)",
        "borderColor": "rgb(156, 39, 176)",
        "fill": false,
        "data": [
          10,
          120,
          80,
          200,
          100,
          10,
          1000,
          80,
          40,
          100
        ],
        "label": "Cancelled",
        yAxisID: 'y',
      },
      {
        "backgroundColor": "rgb(39, 176, 200)",
        "borderColor": "rgb(39, 176, 200)",
        "data": [
          300,
          -1200,
          20,
          -340,
          800,
          300,
          100,
          500,
          200,
          500
        ],
        "label": "Booked",
        yAxisID: 'y1',
      }
    ],
  };
  lineChartOptions: ChartConfiguration<'line'>['options'] =
    {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Total Appointments'
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            "tooltipFormat": "[Q]Q - YYYY",
            unit: 'quarter',
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
        },
      }
    };
  constructor() {
  }

  ngOnInit(): void {
  }

}