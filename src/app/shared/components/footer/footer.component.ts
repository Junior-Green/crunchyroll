import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  menuDropdownShowing: boolean = false;
  selectedLanguage: string = "English (US)"

  @Input() showNav: boolean = true

  languages: string[] = [
    "English (US)",
    "Español",
    "Español (España)",
    "Português (Brasil)",
    "Português (Portugal)",
    "Français (France)",
    "Deutsch",
    "العربية",
    "Italiano",
    "Русский",
    "हिन्दी"
  ]

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'cr-sony-logo', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/sony-logo.svg')
    );
  }

  menuDropdownHandler(state: 'onShown' | 'onHidden') {
    if (state === 'onShown') {
      this.menuDropdownShowing = true
    }
    else {
      this.menuDropdownShowing = false
    }
  }

  changeSelectedLanguage(language: string) {
    this.selectedLanguage = language
  }


}
