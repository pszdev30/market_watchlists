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
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';


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
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
