import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { LetterAnimationType } from '../guesstimate/guesstimate.component';
import { LetterComponent } from '../letter/letter.component';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
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
