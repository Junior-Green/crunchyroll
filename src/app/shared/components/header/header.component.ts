import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'cr-logo', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crunchyroll-logo.svg')
    );
  }
}
