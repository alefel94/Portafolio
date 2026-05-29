import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  @ViewChild('orb') orbRef!: ElementRef<HTMLDivElement>;

  isDark = true;

  ngOnInit(): void {
    this.isDark = !document.documentElement.classList.contains('light-theme');
  }

  private dragging = false;
  private startY = 0;
  private readonly ELASTIC = 0.18;
  private readonly TRIGGER = 30;

  private readonly onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const raw = e.clientY - this.startY;
    const offset = Math.max(0, raw) * this.ELASTIC;
    this.orbRef.nativeElement.style.transform = `translateY(${offset}px)`;
  };

  private readonly onUp = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.dragging = false;
    if (e.clientY - this.startY > this.TRIGGER) {
      this.toggle();
    }
    this.springBack();
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
  };

  onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    this.dragging = true;
    this.startY = e.clientY;
    this.orbRef.nativeElement.style.transition = 'none';
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
  }

  toggle(): void {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('light-theme');
  }

  private springBack(): void {
    const orb = this.orbRef.nativeElement;
    orb.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
    orb.style.transform = 'translateY(0)';
    orb.addEventListener('transitionend', () => { orb.style.transition = ''; }, { once: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
  }
}
