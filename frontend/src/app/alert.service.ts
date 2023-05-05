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

  /**
   * This function sets an error message and updates a message update subject.
   * @param {string} message - The message parameter is a string that represents an error message that needs to be set.
   */
  setMessage(message: string) {
    this.errorMessage = message;
    this.messageUpdate.next(this.errorMessage);
  }

  /**
   * This function sets an error code and notifies subscribers of the code update.
   * @param {number} code - The code parameter is a number that represents an error code. It is used to update the
   * errorCode property of an object and notify any subscribers of the codeUpdate event.
   */
  setCode(code: number) {
    this.errorCode = code;
    this.codeUpdate.next(this.errorCode);
  }

}
