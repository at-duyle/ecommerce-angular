import { Injectable } from '@angular/core';
// import alertify from 'alertify.js';
declare var alertify: any;
@Injectable()

export class NotificationService {

  // private _notifier: alertify;
  private _notifier: any = alertify;
  constructor() {
    alertify.defaults = {
      // dialogs defaults
      autoReset: true,
      basic: false,
      closable: true,
      closableByDimmer: true,
      frameless: false,
      maintainFocus: true, // <== global default not per instance, applies to all dialogs
      maximizable: true,
      modal: true,
      movable: true,
      moveBounded: false,
      overflow: true,
      padding: true,
      pinnable: true,
      pinned: true,
      preventBodyShift: false, // <== global default not per instance, applies to all dialogs
      resizable: true,
      startMaximized: false,
      transition: 'pulse',

      // notifier defaults
      notifier: {
        // auto-dismiss wait time (in seconds)  
        delay: 5,
        // default position
        position: 'top-right',
        // adds a close button to notifier messages
        closeButton: false
      },

      // language resources 
      glossary: {
        // dialogs default title
        title: 'AlertifyJS',
        // ok button text
        ok: 'OK',
        // cancel button text
        cancel: 'Cancel'
      },

      // theme settings
      theme: {
        // class name attached to prompt dialog input textbox.
        input: 'ajs-input',
        // class name attached to ok button
        ok: 'ajs-ok',
        // class name attached to cancel button 
        cancel: 'ajs-cancel'
      }
    };
    // this._notifier = alertify;
  }

  printSuccessMessage = (message: string) => {
    this._notifier.success(message).dismissOthers();
  }

  printWarningMessage = (message: string) => {
    this._notifier.warning(message).dismissOthers();
  }

  printErrorMessage = (message: string) => {
    this._notifier.error(message).dismissOthers();
  }

  printConfirmationDialog = (message: string, okCallBack: () => any) => {
    this._notifier.confirm(message, function (e) {
      if (e) {
        okCallBack();
      } else {
      }
    });
  }
}