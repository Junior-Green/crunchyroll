import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as chroma from 'chroma-js';

@Component({
  selector: 'cr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input({required: true}) label: string = "Click"
  @Input() disabled: boolean = false
  @Input() backgroundColor: string = "#000000"
  @Input() labelColor: string = "#FFFFFF"
  @Input() buttonStyle: "fill" | "outline" = "fill"
  hoverShade: string = "#000000";
  isHovered: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.hoverShade = chroma(this.backgroundColor).brighten().hex();
  }
}

