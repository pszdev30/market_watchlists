import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry, catchError, first } from 'rxjs/operators';
import { TransferService } from './transfer.service';
import { AngularFireDatabase } from '@angular/fire/database';

const serverError: string = 'Uh oh! It looks like that isn\'t a valid ticker. Try again later';
const action: string = 'Close';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private transfer: TransferService, private db: AngularFireDatabase) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(catchError((error: HttpErrorResponse) => {
      console.log(httpRequest)
      let url = httpRequest.urlWithParams;
      let urlSplit = url.split('/')
      let ticker = urlSplit[5];

      let errorMessage = `Error Code: ${error.status},  Message: ${error.message}`;

      if (error.status == 404) {
        this.snackBar.open(serverError, action, {
          duration: 3500,
        });
        this.db.database.ref('/Holdings').child(ticker).remove()
        this.transfer.stopRefresh(true);
        return throwError(errorMessage)
      }
      this.transfer.stopRefresh(false);
    }));

  }
}
