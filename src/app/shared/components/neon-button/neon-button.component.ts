import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-neon-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="neon-button"
      [class.primary]="variant === 'primary'"
      [class.secondary]="variant === 'secondary'"
      [class.outline]="variant === 'outline'"
      [disabled]="disabled"
      (click)="handleClick($event)"
    >
      <span class="button-content">
        {{ text }}
        <svg
          *ngIf="showArrow"
          class="arrow"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
  `,
  styles: [`
    .neon-button {
      position: relative;
      padding: 0.875rem 2rem;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 2px solid;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.3s ease;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }

      &:hover::before {
        left: 100%;
      }

      .button-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        z-index: 1;
      }

      .arrow {
        transition: transform 0.3s ease;
      }

      &:hover .arrow {
        transform: translateX(4px);
      }

      &.primary {
        background: rgba(0, 240, 255, 0.1);
        border-color: #00f0ff;
        color: #00f0ff;

        &:hover {
          background: rgba(0, 240, 255, 0.2);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      &.secondary {
        background: rgba(122, 0, 255, 0.1);
        border-color: #7a00ff;
        color: #7a00ff;

        &:hover {
          background: rgba(122, 0, 255, 0.2);
          box-shadow: 0 0 20px rgba(122, 0, 255, 0.5);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      &.outline {
        background: transparent;
        border-color: #d9faff;
        color: #d9faff;

        &:hover {
          background: rgba(217, 250, 255, 0.1);
          box-shadow: 0 0 20px rgba(217, 250, 255, 0.3);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  `]
})
export class NeonButtonComponent {
  @Input() text: string = '';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() showArrow: boolean = false;
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
