import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'cr-premium-button',
  templateUrl: './premium-button.component.html',
  styleUrls: ['./premium-button.component.scss']
})
export class PremiumButtonComponent {
  @Input() style: 'fill' | 'outline' = 'fill'
  @Input() label: string = 'Click Me!'
  @Input() showCrown: boolean = false
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'cr-crown', // Icon name used in mat-icon component
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/crown.svg')
    );
  }
}
