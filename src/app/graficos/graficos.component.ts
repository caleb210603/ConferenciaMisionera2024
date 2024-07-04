import { DashboardService } from './../../services/dashboard.service';
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ChartData, ChartType, Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css',
})
export class GraficosComponent {
  users: User[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getBarChartData();
    this.getLineChartData();
    this.getBarChartDataZoneTotal();
  }

  public barData = {
    'Zona 1': {
      day1: 19,
      day2: 10,
      day3: 6,
    },
    'Zona 10': {
      day1: 18,
      day2: 13,
      day3: 10,
    },
    'Zona 11': {
      day1: 28,
      day2: 15,
      day3: 12,
    },
    'Zona 12': {
      day1: 39,
      day2: 23,
      day3: 18,
    },
    'Zona 13': {
      day1: 35,
      day2: 31,
      day3: 28,
    },
    'Zona 14': {
      day1: 25,
      day2: 19,
      day3: 17,
    },
    'Zona 2': {
      day1: 32,
      day2: 18,
      day3: 10,
    },
    'Zona 4': {
      day1: 37,
      day2: 31,
      day3: 25,
    },
    'Zona 5': {
      day1: 27,
      day2: 20,
      day3: 5,
    },
    'Zona 6': {
      day1: 26,
      day2: 19,
      day3: 15,
    },
    'Zona 7': {
      day1: 41,
      day2: 19,
      day3: 17,
    },
    'Zona 9': {
      day1: 22,
      day2: 18,
      day3: 9,
    },
  };

  public barData2 = {
    day1: 349,
    day2: 236,
    day3: 172,
  };

  public barData3 = {
    'Zona 5': 41,
    'Zona 14': 32,
    'Zona 10': 26,
    'Zona 13': 45,
    'Zona 12': 45,
    'Zona 9': 29,
    'Zona 4': 44,
    'Zona 11': 36,
    'Zona 2': 37,
    'Zona 6': 31,
    'Zona 7': 48,
    'Zona 1': 25,
  };

  public chartType: ChartType = 'bar';
  public chartType2: ChartType = 'bar';
  public chartType3: ChartType = 'bar';

  public chartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Jueves',
        data: [],
        borderColor: '#228CE8',
        backgroundColor: '#228CE8',
        pointBorderColor: '#228CE8',
        pointRadius: 6,
        borderRadius: 5,
        pointBackgroundColor: 'white',
        fill: false,
      },
      {
        label: 'Viernes',
        data: [],
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        pointBorderColor: '#FF6384',
        pointRadius: 6,
        borderRadius: 5,
        pointBackgroundColor: 'white',
        fill: false,
      },
      {
        label: 'Sabado',
        data: [],
        borderColor: '#FFCE56',
        backgroundColor: '#FFCE56',
        pointBorderColor: '#FFCE56',
        pointRadius: 6,
        borderRadius: 5,
        pointBackgroundColor: 'white',
        fill: false,
      },
    ],
  };

  public chartData2: ChartData = {
    datasets: [
      {
        label: 'Conteo',
        data: [],
        borderColor: '#228CE8',
        backgroundColor: ['#228CE8', '#FF6384', '#FFCE56'],
        pointBorderColor: '#228CE8',
        pointRadius: 6,
        borderRadius: 5,
        pointBackgroundColor: 'white',
        fill: false,
      },
    ],
  };

  public chartData3: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Asistencia Total',
        data: [],
        borderColor: '#228CE8',
        backgroundColor: ['#228CE8', '#FF6384', '#FFCE56'],
        pointBorderColor: '#228CE8',
        pointRadius: 20,
        pointBackgroundColor: 'white',
        fill: false,
      },
    ],
  };

  public chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  public chartOptions2: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  public chartOptions3: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  getBarChartData() {
    //this.dashboardService.getReportList().subscribe((data) => {
    this.chartData.labels = Object.keys(this.barData).sort((a, b) => {
      const zoneNumberA = parseInt(a.split(' ')[1]);
      const zoneNumberB = parseInt(b.split(' ')[1]);
      return zoneNumberA - zoneNumberB;
    });
    this.chartData.datasets[0].data = Object.values(this.barData).map(
      (zoneData) => zoneData.day1
    );
    this.chartData.datasets[1].data = Object.values(this.barData).map(
      (zoneData) => zoneData.day2
    );
    this.chartData.datasets[2].data = Object.values(this.barData).map(
      (zoneData) => zoneData.day3
    );
    //});
  }

  getLineChartData() {
    //this.dashboardService.getDayList().subscribe((data: any) => {
    this.chartData2.labels = ['Jueves', 'Viernes', 'Sabado'];
    this.chartData2.datasets[0].data = [
      this.barData2.day1,
      this.barData2.day2,
      this.barData2.day3,
    ];
    //});
  }

  getBarChartDataZoneTotal() {
    const zonas = Object.keys(this.barData3);
    const asistencias = Object.values(this.barData3);
  
    this.chartData3 = {
      labels: zonas,
      datasets: [{
        label: 'Asistencia Total',
        data: asistencias,
        backgroundColor: ['#228CE8', '#FF6384', '#FFCE56', '#6BCB77', '#94D2E6', '#F16F6F'],
        borderColor: ['#228CE8', '#FF6384', '#FFCE56', '#6BCB77', '#94D2E6', '#F16F6F'],
        borderWidth: 1,
        borderRadius: 10,
      }]
    };

    this.chartData3.labels = Object.keys(this.barData3).sort((a, b) => {
      const zoneNumberA = parseInt(a.split(' ')[1]);
      const zoneNumberB = parseInt(b.split(' ')[1]);
      return zoneNumberA - zoneNumberB;
    });
  }
  
}
