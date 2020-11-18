import { Component, OnInit } from '@angular/core';
import { CryptoCurrencyService } from './crypto-currency.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  global: any;  /** this object is used to assign a whole data */
  constructor(private cryptoService: CryptoCurrencyService) {
    console.log('App Component Constructor Called');
  }
  ngOnInit(): void {
    console.log('App Component ngOnInit Called');
    this.cryptoService.getglobalData().subscribe(
      (data) => {
        this.global = data.data;  /** Here data.data assign own data in this.global object */
      },
      /** Here Handling Client Side error */
      (error) => {
        console.log(error);
      });
  }
}
