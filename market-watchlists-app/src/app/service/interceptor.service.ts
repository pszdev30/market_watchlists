import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry, catchError } from 'rxjs/operators';
import { TransferService } from './transfer.service';

const serverError: string = 'Uh oh! It looks like that isn\'t a valid ticker. Try again later';
const action: string = 'Close';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private transfer: TransferService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      let errorMessage = `Error Code: ${error.status},  Message: ${error.message}`;

      if (error.status == 404) {
        this.snackBar.open(serverError, action, {
          duration: 3500,
        });
      }

      return throwError(errorMessage)
    }));
  }
}
