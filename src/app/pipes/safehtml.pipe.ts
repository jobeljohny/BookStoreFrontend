import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML',
})
export class SafeHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string|null) {
    if(html != null)
      return this.sanitizer.bypassSecurityTrustResourceUrl(html);
    else
      return null
  }
}
