import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMarkdown } from 'ngx-markdown';

import { TermsComponent } from './terms.component';
import { emailAddress } from '../constants/contact-const';

describe('TermsComponent', () => {
  const create = (platform: 'browser' | 'server') => {
    TestBed.configureTestingModule({
      imports: [TermsComponent],
      providers: [provideZonelessChangeDetection(), provideMarkdown(), { provide: PLATFORM_ID, useValue: platform }]
    });
    return TestBed.createComponent(TermsComponent).componentInstance;
  };

  it('uses mailto links in the browser', () => {
    const content = create('browser').content;
    expect(content).not.toContain('[[EMAIL]]');
    expect(content.split(`(mailto:${emailAddress()})`).length - 1).toBe(5);
  });

  it('never puts the plain address in server-rendered content', () => {
    const content = create('server').content;
    expect(content).not.toContain('@loom21');
    expect(content).toContain('info [at] loom21 [dot] com');
  });
});
