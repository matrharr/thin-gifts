import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  count = 0;
  
  constructor(private spinner: SpinnerService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.update_nonce();
    this.spinner.show();
    this.count++;
    return next.handle(request)
      .pipe(tap(
        event => console.log(event),
        error => console.log(error)
      ), finalize(() => {
        this.count--;
        if (this.count === 0) this.spinner.hide();
      }))
  }

  update_nonce() {
    let scriptTag = document.getElementById('paypal');
    scriptTag['data-csp-nonce'] = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}