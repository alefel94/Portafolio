import { Component, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShaderAnimationComponent } from '../shader-animation/shader-animation.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-parallax-section',
  standalone: true,
  imports: [CommonModule, ShaderAnimationComponent],
  templateUrl: './parallax-section.component.html',
  styleUrls: ['./parallax-section.component.scss']
})
export class ParallaxSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('parallaxContainer') parallaxContainer!: ElementRef;

  private mm = gsap.matchMedia();

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initParallaxLayers();
    this.initEntryAnimations();
    this.initAmbientFloat();
  }

  private initParallaxLayers(): void {
    const el = this.parallaxContainer.nativeElement;

    this.mm.add('(min-width: 1px)', () => {
      // ── Layer 0: Shader WebGL ─────────────────────────────────────
      // Moves at ~9% of scroll speed → stays "behind" everything else
      gsap.to(el.querySelector('app-shader-animation'), {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // ── Layer 2: Float elements wrapper ───────────────────────────
      // Moves at ~22% of scroll speed → intermediate depth
      gsap.to(el.querySelector('.float-layer'), {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.6,
        },
      });

      // ── Layer 3: Main content ──────────────────────────────────────
      // Moves fastest and fades out first → feels closest to the viewer
      gsap.to(el.querySelector('.parallax-content'), {
        y: -280,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '55% top',
          scrub: 1,
        },
      });
    });
  }

  private initEntryAnimations(): void {
    const el = this.parallaxContainer.nativeElement;

    // Staggered reveal on load — runs once, not scroll-driven
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(el.querySelector('.parallax-prefix'), {
      opacity: 0,
      y: 20,
      duration: 0.9,
    })
    .from(el.querySelector('.parallax-title'), {
      opacity: 0,
      y: 70,
      duration: 1.3,
    }, '-=0.6')
    .from(el.querySelector('.parallax-subtitle'), {
      opacity: 0,
      y: 30,
      duration: 1.1,
    }, '-=0.8')
    .from(el.querySelector('.cta-btn'), {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.4');
  }

  private initAmbientFloat(): void {
    const el = this.parallaxContainer.nativeElement;

    // Gentle vertical drift on each float element (runs independently of scroll)
    gsap.to(el.querySelectorAll('.float-el'), {
      y: '+=25',
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: 0.4,
    });
  }

  scrollToHero(): void {
    this.router.navigate(['/desarrollador']);
  }

  ngOnDestroy(): void {
    this.mm.revert();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
