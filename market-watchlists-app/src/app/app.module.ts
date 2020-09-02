import { ApiService } from './service/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HoldingsComponent } from './component/holdings/holdings.component';
import { PotentialStocksComponent } from './component/potential-stocks/potential-stocks.component';
import { RandomComponent } from './component/random/random.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';
import { InterceptorService } from './service/interceptor.service';
import { EarningsComponent } from './component/earnings/earnings.component';

@NgModule({
  declarations: [
    AppComponent,
    HoldingsComponent,
    PotentialStocksComponent,
    RandomComponent,
    NavbarComponent,
    DialogComponent,
    EarningsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      { path: '', component: NavbarComponent },
    ]),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
