import { Component, OnInit } from '@angular/core';
import { CryptoCurrencyService } from '../crypto-currency.service';
import { Chart } from 'chart.js';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  // this object is created to hold a chart
  chart: any = [];
  // this object is created to hold other page information
  chartData: any;

  constructor(private cryptoService: CryptoCurrencyService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Chart Component Constructor has called');
    this.chartData = data;
  }

  ngOnInit(): void {
    this.cryptoService.getLatestData().subscribe(
      (datanew) => {
        // this console get data from another page
        console.log('got the data from another component', this.chartData);

        // Here Create Chart to show information in chart of particular coin
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: [this.chartData.name + ' Coin Data'],
            datasets: [{
              label: 'Price',
              backgroundColor: '#f9813a',
              borderColor: '#f9813a',
              data: [this.chartData.quote.USD.price], // <---  This line print Coins Price in Yaxis
              fill: false,
            }, {
              label: 'Market Capital / 1000000000',
              fill: false,
              backgroundColor: '#ffd5cd',
              borderColor: '#ffd5cd',
              data: [(this.chartData.quote.USD.market_cap / 1000000000)], // <--- This line print Market Capital in YAxis
            },
            {
              label: 'Volume 24h / 100000000',
              fill: false,
              backgroundColor: '#9ad3bc',
              borderColor: '#9ad3bc',
              data: [this.chartData.quote.USD.volume_24h / 100000000], // <--- This line print Volume 24h Capital in YAxis
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            title: {
              display: true,
              text: 'CryptoCurrencies Chart'
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Value'
                }
              }]
            }
          }
        });
      });
  }
}
