import { Component, OnInit } from '@angular/core';
import { CryptoCurrencyService } from '../crypto-currency.service';
import { MatDialog } from '@angular/material/dialog';
import { ChartComponent } from '../chart/chart.component';
import { ToastrService } from 'ngx-toastr';
import { ComparisonViewComponent } from '../comparison-view/comparison-view.component';
import { FavViewComponent } from '../fav-view/fav-view.component';

@Component({
  selector: 'app-crypto-currencies-view',
  templateUrl: './crypto-currencies-view.component.html',
  styleUrls: ['./crypto-currencies-view.component.scss']
})

export class CryptoCurrenciesViewComponent implements OnInit {
  data: any;                       /**
                                    * This object hold all data which come from crypto service component
                                    * that component all the http request to get data from server
                                    */
  selectedData: any[];
  constructor(private cryptoService: CryptoCurrencyService, public dialog: MatDialog, private toastr: ToastrService) {
    console.log('CryptoCurrencies Constructor has called');
  }
  p = 1;                           /** This object create for pagination */
  alldata: any = [];               /** This object is hold all latest coin data */
  isShowRow = true;                /** This object is used to perform to show and hide a filter row */
  globalarray: any = [];           /** This object is also hold a all data for performing a other operation */
  dataarray: any = [];             /** This is perform same as globalarray */
  showcheckbox = true;             /** This object handle is show and hide checkbox operation  */
  search: any;                     /** This object is used for filter the data by many items */
  showDataofChildComponent: void;  /** This object is used to close all dialog box */
  value = 0;

/**
 * ============= SHOW ALL LATEST DATA OF COINS ==============================
 * This Function called a latest data.
 * This data print in table with coin Image.
 * Error Handle use to handle the error.
 */
  public getlatestalldata(): any {
    this.cryptoService.getLatestData().subscribe(
      (data: any) => {
        this.alldata = data.data;
      },
      (error: any) => {
        console.log(error.status);
      });
  }

  /**
   * =========== HANDLE THE CHECKBOX =====================
   * This function handle the checkbox
   * Not click more than two checkbox.
   * if select more than two checkbox so give me warning.
   */
  public validcheck(latestdata: any): any {
    if (this.globalarray.length < 2) {
      this.globalarray.push(latestdata);
      // console.log(this.globalarray);
    } else {
      this.toastr.warning('You can only compare 2 coins');
    }
  }

  /**
   * ========= DO COMPARE THE TWO COINS ==============================
   * This function is related to valid check function.
   * This function call global array that object contain two values.
   * this.globalarrray object pass in data section in mat dialog box.
   *
   * If you press direct comaprison button
   * they show warning notifier.
   */
  public comparecurrencies(): any {
    if (this.globalarray.length === 2) {
      this.toastr.success('You are comparing ' + this.globalarray[0].name + ' and ' + this.globalarray[1].name);
      this.dialog.open(ComparisonViewComponent, {
        data: this.globalarray,
        width: '1000px',
        height: '600px'
      });
      this.dialog.afterAllClosed.subscribe(result => {
        this.showDataofChildComponent = result;
      });
    } else {
      this.toastr.warning('You need to select two Coins to compare');
    }
  }

  /**
   * ========= SHOW A FAVORITE LIST ========================
   * This function help to see the favroite list
   * which help this function you can see favorite list.
   * Which stored in local storage of your browser.
   * Local storage data show in dialog box
   * for show using called same dialog box called
   * for show save favorite list
   */
  public showfavoritelist(): any {
    this.toastr.success('Finally You can see your favorite list');
    this.dataarray = [];
    for (const sf in localStorage) {
      if (sf.includes('fav-')) {
        this.dataarray.push(JSON.parse(localStorage.getItem(sf)));
      }
    }
    console.log('fav coins object', this.dataarray);
    this.dialog.open(FavViewComponent, {
      data: this.dataarray,
      width: '1300px',
      height: '600px',
    });
  }

  /**
   * =========== SORTED DATA BY PRICE ==================
   * This function used for Price sorting.
   * Here called a sorted data according to price.
   * Only called a sorted data from Server
   * all the data render push in this.alldata object.
   */
  public sortbyprice(): any {
    this.toastr.success('Successfully Sort the table by Price');
    this.cryptoService.getLatestDatabyPrice().subscribe(
      (data) => {
        this.alldata = data.data;
        console.log('Get Data by Price', this.alldata);
      },
      (error) => {
        console.log('Some Error Occured in Sorting of Price', error.status);
      });
  }

  /**
   * ========== SORTED DATA BY MARKET CAPITAL ======================
   * This function used for Market Capital Sorting.
   * Here called a sorted data according to market capital.
   * here only a sorted data from server.
   * all the data push in same object this.alldata object.
   */
  public sortbymarketcapital(): any {
    this.toastr.success('Successfully Sort the table by Market Capital');
    this.cryptoService.getLatestDatabyMarketCap().subscribe(
      (data) => {
        this.alldata = data.data;
        console.log('Get Data by Market', this.alldata);
      },
      (error) => {
        console.log('Some Error Occured in Sorting of Market Capital', error.status);
      });
  }

  /**
   * ============= SHOW A FILTER BOX ===========================
   * This function is triggered
   * while clicked on filter button
   * they handled filter box
   * while clicked on filter button handle hide show function.
   */
  public ShowFilterTab(): any {
    this.toastr.success('You can see filter box');
    this.isShowRow = !this.isShowRow;
  }
  /**
   * ============= FOR CHECKBOX SHOW AND HIDE =================================
   * This event is trigger while clicked on any row
   * They handle hide and show event on table
   */
  public displaycheckbox(): any {
    this.showcheckbox = !this.showcheckbox;
  }

  /**
   * ============ SHOW A PRICE CHART OF PARTICULAR COIN ==============================
   * This function is triggered on chart icon in row
   * In this function called chart component for show particular row data.
   * When clicked on chart icon that called dialog box.
   * and also called data from other component.
   * here used rowData component
   * rowData object is hold data that come from other component.
   */
  public openChart(rowData: any): any {
    this.toastr.show('Here You can see chart of Price, Market capital, Volume last 24 hours');
    this.dialog.open(ChartComponent, {
      data: rowData,
      width: '900px',
      height: '600px'
    });
    this.dialog.afterAllClosed.subscribe(result => {
      this.showDataofChildComponent = result;
    });
  }

  /**
   * ========== SAVE A COIN A FAVORITE ==============================
   * This function is triggered
   * While clicked on star tag icon in html table
   * This function is save a particular coin all information in array form
   */
  public savefavorite(id: any): any {
    this.toastr.info('You have saved this coin');
    for (const save in this.alldata) {
      if (this.alldata[save].id === id) {
        localStorage.setItem('fav-' + this.alldata[save].name, JSON.stringify(this.alldata[save]));
      }
    }
  }

  /**
   * ========== DELETE FAVORITE =======================
   * This function is triggered
   * while clicked on trash icon in html table
   * this function first checked deleted id
   * deleted id is matched from save id
   * then deleted a favroite coin from local storage
   */
  public deletefavorite(id: any): any {
    this.toastr.error('Oops You delete a favorite');
    for (const del in this.alldata) {
      if (this.alldata[del].id === id) {
        localStorage.removeItem('fav-' + this.alldata[del].name);
      }
    }
  }
  ngOnInit(): void {
    console.log('CryptoCurrencies Component OnInit Called');
    this.getlatestalldata();     /** Here called a getlatestdata object called for show a data in table */
  }
}
