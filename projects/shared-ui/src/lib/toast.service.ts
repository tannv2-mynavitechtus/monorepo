import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();
  private counter = 0;

  show(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', duration = 3000) {
    const id = this.counter++;
    const toast: Toast = { id, message, type, duration };
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    setTimeout(() => {
      this.clear(id);
    }, duration);
  }

  success(message: string, duration = 3000) {
    this.show(message, 'success', duration);
  }

  info(message: string, duration = 3000) {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration = 3000) {
    this.show(message, 'warning', duration);
  }

  error(message: string, duration = 3000) {
    this.show(message, 'error', duration);
  }

  clear(id: number) {
    const remaining = this.toastsSubject.value.filter(t => t.id !== id);
    this.toastsSubject.next(remaining);
  }
}
