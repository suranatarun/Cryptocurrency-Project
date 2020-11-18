import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CryptoCurrencyService } from '../crypto-currency.service';


@Component({
  selector: 'app-price-chart-view',
  templateUrl: './price-chart-view.component.html',
  styleUrls: ['./price-chart-view.component.scss']
})
export class PriceChartViewComponent implements OnInit {

  chart: any = []; // This will hold our chart info

  constructor(private cryptoservice: CryptoCurrencyService) { }

  // Here Create Function Which Show Data of Coins
  public ShowDataByCoins(): any {
    this.cryptoservice.getLatestData().subscribe(
      (data) => { // <--- Here data object assign all data which come from API

        // Here Get Price of Coin from API
        // tslint:disable-next-line: no-shadowed-variable
        const Price = data['data'].map(data => data?.quote?.USD.price); // Here Print all price of coins
        console.log(Price);

        // Here Get Symbol of Coin from API
        // tslint:disable-next-line: no-shadowed-variable
        const Symbol = data['data'].map(data => data?.symbol); // Here Print all coins of symbol
        console.log(Symbol);


        // Here Create Chart to Show Price of Coin and Symbol of Coin
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: Symbol, // <===  Here Assign all Symbol which is come from API.
            datasets: [
              {
                data: Price, // <=== Here Assign all Price Value which is come from API.
                borderColor: '#ffa36c',
                backgroundColor: '#ffa36c',
                fill: false
              },
            ],
          },
          options: {
            legend: {
              display: false,
              labels: {
                fontColor: '#e8e8e8',
                fontFamily: 'Times New Roman',
              }
            },
            scales: {
              xAxes: [{
                display: true,
              },
              ],
              yAxes: [{
                display: true
              }],
            },
          },
        });
      },
      (error) => {
        console.log('Some Error Occured:', error);
      });
  }
  ngOnInit(): void {
    // Here called function which is create outside of ngOnInit function
    this.ShowDataByCoins();
  }
}












































