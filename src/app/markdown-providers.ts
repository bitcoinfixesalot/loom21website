import { SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MARKED_EXTENSIONS, MARKED_OPTIONS, provideMarkdown, SANITIZE } from 'ngx-markdown';
import { markedOptionsFactory } from './marked-options-factory';
import { emojiShortcodes } from './marked-emoji-extension';
import { AnchorService } from './services/anchor.service';

// Provided on the lazy docs/terms routes only, so ngx-markdown and marked stay out of the main bundle
export const markdownProviders = provideMarkdown({
  loader: HttpClient,
  markedOptions: {
    provide: MARKED_OPTIONS,
    useFactory: markedOptionsFactory,
    deps: [AnchorService],
  },
  markedExtensions: [{ provide: MARKED_EXTENSIONS, useValue: emojiShortcodes, multi: true }],
  sanitize: { provide: SANITIZE, useValue: SecurityContext.NONE },
});
