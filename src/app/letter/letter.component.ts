import { trigger, style, transition, animate, sequence } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { LetterAnimationType } from '../guesstimate/guesstimate.component';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  animations: [ 
    trigger('letterAnimation', [
      transition('* => right', [
        sequence([
          style({ background: 'green' }),
          animate('1s', style({ background: 'white' }))
        ])
      ]),
      transition('* => wrong', [
        sequence([
          style({ background: 'red' }),
          animate('1s', style({ background: 'white' }))
        ])
      ])
    ]),
  ]
})
export class LetterComponent {

  @Input() letter: string;
  @Input() hasCursor: boolean;

  animationState: string = "";

  playAnimation(animation: LetterAnimationType): void {    
    this.animationState = animation;  
  }
}
