import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CryptoCurrencyService {

  public ApiUrl = 'https://pro-api.coinmarketcap.com/v1/';  //  this API Link Of CoinMarketCap

  constructor(private http: HttpClient) {
    console.log('CryptoCurrencies Service page called');
  }

  // This error handling function is handled all errors which respond come from server.
  private handleError(error: HttpErrorResponse): any {
    console.log(error); // This line print error which come from server.
    return throwError(error);
  }

  // This getglobaldata function called in [app.component.ts] file.
  getglobalData(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json', // This line tell us data has in json format.
      'x-cmc_pro_api_key': '2fd51d8a-95d1-42d6-a208-dcf2b1ce1493'// <----- This is a API Key to access a data from server.
    });
    // Help of this http get request for getting global data of coin market capital server
    return this.http.get<any>(this.ApiUrl + 'global-metrics' + '/' + 'quotes' + '/' + 'latest',
      { headers: httpHeaders }) // this headers: httpHeaders is used to pass a key in header while getting a data
      .pipe(
        catchError(this.handleError), // <----- this line is error handling when get any error from server.
      );
  }



  // This getLatestData function is called in [cryptocurrencies.component.ts] file.
  getLatestData(): any {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json', // This line tell us data has in JSON format
      'x-cmc_pro_api_key': '2fd51d8a-95d1-42d6-a208-dcf2b1ce1493' // <----- This is a API Key to access a data from server.
    });
    // Help of this http get request for getting a latest data of all coins from coin market capital server.
    return this.http.get(this.ApiUrl + 'cryptocurrency' + '/' + 'listings' + '/' + 'latest',
      { headers: httpHeaders }) // this headers: httpHeaders is used to pass key in header while getting a data
      .pipe(
        catchError(this.handleError), // <----- this line is error handling when get any error from server.
      );
  }



  // This getLatestDatabyPrice function is called also in [Cryptocurrencies.component.ts] file.
  getLatestDatabyPrice(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json', // This line tell us data has in JSON format
      'x-cmc_pro_api_key': '2fd51d8a-95d1-42d6-a208-dcf2b1ce1493'// <----- This is a API Key to access a data from server.
    });
    // Help of this http get request for getting a latest data of all coins to sorted by price.
    return this.http.get<any>(this.ApiUrl + 'cryptocurrency' + '/' + 'listings' + '/' + 'latest' + '?sort=price',
      { headers: httpHeaders }) // this headers: httpHeaders is used to pass key in header while getting a data
      .pipe(
        catchError(this.handleError), // <----- this line is error handling when get any error fromm server.
      );
  }



  // This getLatestDatabyMarketCap function is also called in [Cryptocurrencies.component.ts] file.
  getLatestDatabyMarketCap(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json', // This line tell us data has in JSON format
      'x-cmc_pro_api_key': '2fd51d8a-95d1-42d6-a208-dcf2b1ce1493' // <----- This is a API Key to access a data from server.
    });
    // Help of this http get request for getting a latest data of all coins to sorted by market capital.
    return this.http.get<any>(this.ApiUrl + 'cryptocurrency' + '/' + 'listings' + '/' + 'latest' + '?sort=market_cap',
      { headers: httpHeaders }) // this headers: httpHeaders is used to pass key in header while getting a data
      .pipe(
        catchError(this.handleError), // <----- this line is error handling when get any error from server.
      );
  }
}
