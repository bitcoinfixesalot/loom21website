import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';

/**
 * Fades an element in the first time it scrolls into view: `<div appReveal>` or, to stagger
 * siblings, `<div appReveal="80">` (delay in ms). The styles are `.reveal` / `.reveal--in` in src/styles.scss.
 *
 * The element is only hidden from the browser, and only if it starts below the viewport, so
 * prerendered HTML, content already on screen and pages without JavaScript stay fully visible.
 * Nothing happens when the visitor prefers reduced motion.
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  /** Delay before the fade starts, in milliseconds. */
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      if (el.getBoundingClientRect().top < window.innerHeight) {
        return; // on screen (or above it) already: hiding it now would make it blink
      }
      el.classList.add('reveal');
      if (this.delay()) {
        el.style.transitionDelay = `${this.delay()}ms`;
      }
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          el.classList.add('reveal--in');
          observer.disconnect();
        }
      }, { rootMargin: '0px 0px -8% 0px' });
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
