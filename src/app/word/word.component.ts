import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { LetterAnimationType } from '../guesstimate/guesstimate.component';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { LetterComponent } from '../letter/letter.component';


@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  animations: [

    trigger('listAnimation', [

      transition('* => *', [ 

        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})

export class WordComponent {

  @Input() word: string[];
  @Input() cursorPosition: number;

  @ViewChildren(LetterComponent)
  letterComponents: QueryList<LetterComponent>;

  playLetterAnimation(letterIndex: number, animation: LetterAnimationType): void {    
    this.letterComponents.get(letterIndex)?.playAnimation(animation);    
  }
}
