import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CryptoCurrencyService } from '../crypto-currency.service';

@Component({
  selector: 'app-fav-view',
  templateUrl: './fav-view.component.html',
  styleUrls: ['./fav-view.component.scss']
})
export class FavViewComponent implements OnInit {

  arraydata: any;
  constructor(private cryptoService: CryptoCurrencyService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Get Favorite List', data);
    this.arraydata = data;
   }

  ngOnInit(): void {

  }

}
