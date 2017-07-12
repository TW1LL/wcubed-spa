import { Component, OnInit } from '@angular/core';
import {IWcubedSection} from '../wcubed-section/wcubed-section.component';
import {fadeInAnimation} from '../../../pipes/animations';

@Component({
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  selector: 'wcubed-home',
  template: `
    <mz-parallax [height]="500">
      <div class="container">
        <h1>w3</h1>
      </div>
      <img src="assets/bg.png">
    </mz-parallax>
    <div class="container">
      <div class="section">
        <div class="row">
          <div class="col s12 m6" *ngFor="let data of sections">
            <wcubed-section [icon]="data.icon" [title]="data.title" [description]="data.description"></wcubed-section>
          </div>
        </div>
      </div>
    </div>
    <div class="section bgimage">
      <product-list [count]="3"></product-list>
    </div>
  `,
  styles: []
})
export class WcubedHomeComponent {
  public sections: IWcubedSection[] = [
    {
      icon: 'wrench',
      title: 'Custom Work',
      description: 'If you need customization of one of my standard products or a totally custom product, please contact me before buying.'
    },
    {
      icon: 'message-alert',
      title: 'Feedback',
      description: 'Have feedback about my products or want to see something new? Continuous improvement is crucial to my business, and I want to hear from you! Head over to the contact page.'
    }
  ];


}
