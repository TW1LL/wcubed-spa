import {Component, Input, OnInit} from '@angular/core';

export interface IWcubedSection {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'wcubed-section',
  template: `    
    <div class="icon-block">
      <h2 class="center brown-text"><i mz-icon-mdi [icon]="icon" [size]="'48px'"></i></h2>
      <h5 class="center">{{title}}</h5>

      <p class="light">{{description}}</p>
    </div>
  `,
  styles: []
})
export class WCubedSectionComponent{
  @Input() title: string;
  @Input() icon: string;
  @Input() description: string;
}
