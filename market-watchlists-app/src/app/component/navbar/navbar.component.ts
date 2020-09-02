import { TransferService } from 'src/app/service/transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  earnings: boolean = false;

  constructor(private transfer: TransferService) { }

  ngOnInit(): void {
    this.transfer.earningsObservable$.subscribe((res) => {
      if (res)
        this.earnings = true;
      else
        this.earnings = false;
    });
  }

  
  goToEarnings() {
    this.transfer.goToEarnings(true);
  }

}
