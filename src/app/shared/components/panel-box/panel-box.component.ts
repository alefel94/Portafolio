import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-box',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="panel-box"
      [class.with-header]="title"
      [class.glowing]="glowing"
    >
      <div *ngIf="title" class="panel-header">
        <h3 class="panel-title">{{ title }}</h3>
        <span *ngIf="status" class="panel-status" [class.online]="status === 'online'">
          <span class="status-indicator"></span>
          {{ status }}
        </span>
      </div>
      <div class="panel-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .panel-box {
      position: relative;
      background: rgba(10, 15, 30, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 240, 255, 0.2);
      border-radius: 0.25rem;
      padding: 1.5rem;
      transition: all 0.3s ease;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #00f0ff, transparent);
        opacity: 0.5;
      }

      &:hover {
        border-color: rgba(0, 240, 255, 0.4);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
      }

      &.glowing {
        border-color: rgba(0, 240, 255, 0.5);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
        animation: pulse-glow 2s ease-in-out infinite;
      }

      &.with-header {
        padding: 0;
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(0, 240, 255, 0.2);
        background: rgba(0, 240, 255, 0.05);
      }

      .panel-title {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #00f0ff;
        margin: 0;
      }

      .panel-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.75rem;
        text-transform: uppercase;
        color: #7a8fa5;

        &.online {
          color: #00ff9c;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7a8fa5;
          animation: blink 2s ease-in-out infinite;
        }

        &.online .status-indicator {
          background: #00ff9c;
          box-shadow: 0 0 10px #00ff9c;
        }
      }

      .panel-content {
        padding: 1.5rem;
      }
    }

    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
      }
      50% {
        box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
      }
    }

    @keyframes blink {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }
  `]
})
export class PanelBoxComponent {
  @Input() title: string = '';
  @Input() status: 'online' | 'offline' | '' = '';
  @Input() glowing: boolean = false;
}
