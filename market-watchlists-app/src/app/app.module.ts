import { HoldingsResolverService } from './holdings-resolver.service';
import { ApiService } from './service/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HoldingsComponent } from './component/holdings/holdings.component';
import { PotentialStocksComponent } from './component/potential-stocks/potential-stocks.component';
import { RandomComponent } from './component/random/random.component';
import { NavbarComponent } from './component/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HoldingsComponent,
    PotentialStocksComponent,
    RandomComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [ApiService, HoldingsResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
