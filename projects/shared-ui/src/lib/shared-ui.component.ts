import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from './toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-shared-toast',
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts$ | async" class="toast-item" [ngClass]="toast.type">
        <div class="toast-body">
          <span class="toast-icon">
            <svg *ngIf="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <svg *ngIf="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <svg *ngIf="toast.type === 'info'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <svg *ngIf="toast.type === 'warning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </span>
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" (click)="clearToast(toast.id)" aria-label="Close Toast">&times;</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
      pointer-events: none;
    }
    .toast-item {
      pointer-events: auto;
      background-color: var(--bg-card, #ffffff);
      border: 1px solid var(--border-color, #e2e8f0);
      box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      border-radius: 10px;
      padding: 12px 20px;
      min-width: 320px;
      max-width: 500px;
      animation: slideUpIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 0.25s ease;
    }
    @keyframes slideUpIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .toast-body {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .toast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .icon {
      width: 20px;
      height: 20px;
    }
    .toast-item.success .icon { color: var(--success-color, #10b981); }
    .toast-item.error .icon { color: var(--danger-color, #ef4444); }
    .toast-item.warning .icon { color: var(--warning-color, #f59e0b); }
    .toast-item.info .icon { color: var(--primary-color, #3b82f6); }
    
    .toast-message {
      font-size: 13.5px;
      font-weight: 500;
      color: var(--text-primary, #0f172a);
      flex-grow: 1;
    }
    .toast-close {
      background: none;
      border: none;
      font-size: 18px;
      line-height: 1;
      color: var(--text-muted, #94a3b8);
      cursor: pointer;
      padding: 0 4px;
      transition: color 0.2s;
    }
    .toast-close:hover {
      color: var(--text-primary, #0f172a);
    }
  `]
})
export class SharedUiComponent implements OnInit {
  toasts$!: Observable<Toast[]>;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toasts$ = this.toastService.toasts$;
  }

  clearToast(id: number) {
    this.toastService.clear(id);
  }
}
