import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="system-badge"
      [class.blue]="color === 'blue'"
      [class.purple]="color === 'purple'"
      [class.green]="color === 'green'"
      [class.pink]="color === 'pink'"
      [class.orange]="color === 'orange'"
    >
      {{ text }}
    </span>
  `,
  styles: [`
    .system-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(0, 240, 255, 0.1);
      border: 1px solid rgba(0, 240, 255, 0.3);
      border-radius: 0.25rem;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.75rem;
      color: #00f0ff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.2s ease;
      white-space: nowrap;

      &:hover {
        background: rgba(0, 240, 255, 0.2);
        box-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff;
        transform: translateY(-2px);
      }

      &.purple {
        background: rgba(122, 0, 255, 0.1);
        border-color: rgba(122, 0, 255, 0.3);
        color: #7a00ff;

        &:hover {
          background: rgba(122, 0, 255, 0.2);
          box-shadow: 0 0 10px #7a00ff, 0 0 20px #7a00ff, 0 0 30px #7a00ff;
        }
      }

      &.green {
        background: rgba(0, 255, 156, 0.1);
        border-color: rgba(0, 255, 156, 0.3);
        color: #00ff9c;

        &:hover {
          background: rgba(0, 255, 156, 0.2);
          box-shadow: 0 0 10px #00ff9c, 0 0 20px #00ff9c, 0 0 30px #00ff9c;
        }
      }

      &.pink {
        background: rgba(255, 0, 229, 0.1);
        border-color: rgba(255, 0, 229, 0.3);
        color: #ff00e5;

        &:hover {
          background: rgba(255, 0, 229, 0.2);
          box-shadow: 0 0 10px #ff00e5, 0 0 20px #ff00e5, 0 0 30px #ff00e5;
        }
      }

      &.orange {
        background: rgba(255, 102, 0, 0.1);
        border-color: rgba(255, 102, 0, 0.3);
        color: #ff6600;

        &:hover {
          background: rgba(255, 102, 0, 0.2);
          box-shadow: 0 0 10px #ff6600, 0 0 20px #ff6600, 0 0 30px #ff6600;
        }
      }
    }
  `]
})
export class SystemBadgeComponent {
  @Input() text: string = '';
  @Input() color: 'blue' | 'purple' | 'green' | 'pink' | 'orange' = 'blue';
}
