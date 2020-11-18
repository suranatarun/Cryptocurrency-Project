// Both are default modules which is prebuilt in angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// This module is used for setup a routing in whole angular app
import { AppRoutingModule } from './app-routing.module';

// This is default component
import { AppComponent } from './app.component';

// Those components is installed after the angular app from the component command
// Those component show different data in the app
import { CryptoCurrenciesViewComponent } from './crypto-currencies-view/crypto-currencies-view.component';
import { ComparisonViewComponent } from './comparison-view/comparison-view.component';
import { PriceChartViewComponent } from './price-chart-view/price-chart-view.component';
import { ChartComponent } from './chart/chart.component';

// This module is setup navigation between component using [routerLink]
import { RouterModule } from '@angular/router';

// This Module for take http request from server
import { HttpClientModule } from '@angular/common/http';

// This module for notfier animation while work on events
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
// This module is used to perform actions on form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This module is used for pagination which is used in table of cryptocurrencies page
import { NgxPaginationModule } from 'ngx-pagination';

// This module library used for built a chart in page
import { ChartsModule } from 'ng2-charts';

// ==========This module is belong from Angular Material Library==============================================
// this module is used for show a range slider
import { MatSliderModule } from '@angular/material/slider';
// this module is used for show a dialog box which contain chart page data
import { MatDialogModule } from '@angular/material/dialog';

// this service contain api http request for fetching a data from server and provide a function which call in component.
import { CryptoCurrencyService } from './crypto-currency.service';

// this filter library for search the data but inpout box
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// this component is used to show a favorite coin list which is stored in local storage
import { FavViewComponent } from './fav-view/fav-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoCurrenciesViewComponent,
    ComparisonViewComponent,
    PriceChartViewComponent,
    ChartComponent,
    FavViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatDialogModule,
    ChartsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    // This toastr module is used for animation in angular project
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      preventDuplicates: true,
      progressAnimation: 'increasing'
    }),
    // Here detail of navigation present
    RouterModule.forRoot([
      { path: 'cryptocurrencies', component: CryptoCurrenciesViewComponent },
      { path: '', redirectTo: 'cryptocurrencies', pathMatch: 'full' },
      { path: 'comparison', component: ComparisonViewComponent },
      { path: 'price-chart', component: PriceChartViewComponent },
      { path: 'chart', component: ChartComponent },
      { path: '*', component: CryptoCurrenciesViewComponent },
      { path: '**', component: CryptoCurrenciesViewComponent },
    ]),
  ],
  providers: [CryptoCurrencyService], /** This Service Component give service to whole project */
  bootstrap: [AppComponent]
})
export class AppModule { }
