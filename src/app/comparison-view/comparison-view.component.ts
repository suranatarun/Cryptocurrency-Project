import { Component, OnInit } from '@angular/core';
import { CryptoCurrencyService } from '../crypto-currency.service';
import { Chart } from 'chart.js';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comparison-view',
  templateUrl: './comparison-view.component.html',
  styleUrls: ['./comparison-view.component.scss']
})
export class ComparisonViewComponent implements OnInit {

  chart: any = []; // <=== This object hold a information of chart
  compare: any; // This object is hold information whichh is come to be previous page
  constructor(private cryptoService: CryptoCurrencyService, @Optional() @Inject(MAT_DIALOG_DATA) public anydata: any) {
    console.log('got data to compare', anydata);
    this.compare = anydata;
  }
  ngOnInit(): void {
    this.cryptoService.getLatestData().subscribe(
      (data) => {

        // Here Create Chart to contain a two values
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            datasets: [
              {
              label: 'Price of ' + this.compare[0].name,
              backgroundColor: '#556052',
              borderColor: '#f2efea',
              data: [this.compare[0].quote?.USD?.price], // <---  This line print Coins Price in Yaxis
              fill: false,
            },
            {
              label: 'Price of ' + this.compare[1].name,
              backgroundColor: '#556052',
              borderColor: '#f2efea',
              data: [this.compare[1].quote?.USD?.price], // <---  This line print Coins Price in Yaxis
              fill: false,
            },
            {
              label: 'Market Capital / 1000000000 of ' + this.compare[0].name,
              fill: false,
              backgroundColor: '#af6b58',
              borderColor: '#f2efea',
              data: [(this.compare[0].quote?.USD?.market_cap / 1000000000)], // <--- This line print Market Capital in YAxis
            },
            {
              label: 'Market Capital / 1000000000 of ' + this.compare[1].name,
              fill: false,
              backgroundColor: '#af6b58',
              borderColor: '#f2efea',
              data: [(this.compare[1].quote?.USD?.market_cap /  1000000000)], // <--- This line print Market Capital in YAxis
            },
            {
              label: 'Volume 24h / 100000000 of ' + this.compare[0].name,
              fill: false,
              backgroundColor: '#cbbcb1',
              borderColor: '#f2efea',
              data: [this.compare[0].quote?.USD?.volume_24h / 100000000], // <--- This line print Volume 24h Capital in YAxis
            },
            {
              label: 'Volume 24h / 100000000 of ' + this.compare[1].name,
              fill: false,
              backgroundColor: '#cbbcb1',
              borderColor: '#f2efea',
              data: [this.compare[1].quote?.USD?.volume_24h / 100000000], // <--- This line print Volume 24h Capital in YAxis
            }]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Compare Chart'
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
                  labelString: 'Amount $',
                }
              }]
            }
          }
        });
      });
  }
}
