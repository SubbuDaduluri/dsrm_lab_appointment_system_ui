import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { AppCommomModule } from '../../../shared/app.common.module';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [AppCommomModule,
    BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  myBarchart = viewChild.required<ElementRef>('myBarchart');

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() { }

  ngOnInit(): void {
  }


  createBarChart() {

    new Chart(this.myBarchart().nativeElement, {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {

        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          }
        }
      }

    });
  }

  createPieChart() {

    new Chart('Id', {
      type: 'pie', //this denotes tha type of chart
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }],
      }
    });
  }
}
