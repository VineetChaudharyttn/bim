import {Injectable, isDevMode} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

// Toastr message options
const toastrOptions = {
  closeButton: true, // Show Close button
  progressBar: true, // Show progress bar
  timeOut: 10000 // Auto Hide toastr after 10 seconds
};

/**
 * Bean to show toaster messages
 */
@Injectable({providedIn: 'root'})
export class AlertService {

  // Allows to use AlertService without injecting it. Used in models.
  static instance: AlertService = null;

  constructor(private toastr: ToastrService) {
    AlertService.instance = this;
  }

  showSuccess(message: string) {
    this.toastr.success(message, null, toastrOptions);
  }

  showWarning(message: string) {
    this.toastr.warning(message, null, toastrOptions);
  }

  showError(message: string) {
    this.toastr.error(message, null, toastrOptions);
  }

  showInfo(message: string) {
    this.toastr.info(message, null, toastrOptions);
  }

  showMessage(message: string) {
    this.toastr.show(message, null, toastrOptions);
  }

  debug(message: any) {
    if (isDevMode()) {
      window.console.debug(message);
    }
  }

  log(message: any) {
    if (isDevMode()) {
      window.console.log(message);
    }
  }
}
