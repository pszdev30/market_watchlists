import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.earnings().subscribe((res) => {
      console.log(res)
    })
  }

}
