import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { AppCommomModule } from '../../shared/app.common.module';
import { Chart } from 'chart.js/auto';
import { WidgetComponent } from './widget/widget.component';
import { DashboardLayout } from '../../core/models/dashboard-layout';
import { ChartComponent } from './chart/chart.component';
import { DoughnutComponent } from '../../shared/components/doughnut/doughnut.component';
import { GridColsDirective } from '../../shared/directives/grid-cols.directive';
import { DashboardMiniCardWidget } from '../../core/models/dashboard.widget.model';
import { MultiAxisLineChartComponent } from '../../shared/components/multi-axis-line-chart/multi-axis-line-chart.component';
import { DashboardChartWidget } from '../../core/models/dashboard.chart.widget.model';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppCommomModule,
    WidgetComponent,
    ChartComponent,
    DoughnutComponent,
    GridColsDirective,
    MultiAxisLineChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  cardLayout: DashboardLayout | undefined;

  widgetCards: DashboardMiniCardWidget[] = [
    {
      title: 'Total Patients',
      value: 2500,
      progressValue: 45,
      progressDescription: 'Increased',
      icon: "person_add",
      percentageIncreased: false,
    },
    {
      title: 'Total Appointments',
      value: 450,
      progressValue: 70,
      progressDescription: "Increased",
      icon: "date_range",
      percentageIncreased: true,
    },
    {
      title: 'Todays Appointments',
      value: 85,
      progressValue: 45,
      progressDescription: "Increase in 28 Days",
      icon: "date_range",
      percentageIncreased: true,
    },
    {
      title: 'Total Reports Uploaded',
      value: 450,
      progressValue: 45,
      progressDescription: "Increase in 28 Days",
      icon: "account_balance_wallet"
    }
  ];

  widgetChartGrids: DashboardChartWidget[] = [
    {
      title: 'Patient Appointment Status',
      chartTpe: "doughnutChart"
    },
    {
      title: 'Total Appointments',
       chartTpe: "multiLineChart"
    }
  ];



  ngOnInit(): void {
    this.cardLayout = {
      columns: 4,
      miniCard: { cols: 1, rows: 1 },
      chart: { cols: 2, rows: 2 },
      table: { cols: 4, rows: 4 }
    };
  }
}
