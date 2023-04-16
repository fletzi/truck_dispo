import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  errorMessage: string = "";
  errorCode: number = 0;
  messageUpdate = new Subject<string>();
  codeUpdate = new Subject<number>()

  constructor() { }

  setMessage(message: string) {
    this.errorMessage = message;
    this.messageUpdate.next(this.errorMessage);
  }

  setCode(code: number) {
    this.errorCode = code;
    this.codeUpdate.next(this.errorCode);
  }

}
