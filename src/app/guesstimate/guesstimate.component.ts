import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import { QouteService } from '../qoute.service';
import { WordComponent } from '../word/word.component';


export interface CursorPosition {
  wordIndex: number;
  letterIndex: number;
}

export interface Qoute {
  text: string;
  author: string;
}

export type LetterAnimationType = 'right' | 'wrong';

export type Difficulty = 'easy' | 'medium' | 'hard';


@Component({
  selector: 'app-guesstimate',
  templateUrl: './guesstimate.component.html',
  styleUrls: ['./guesstimate.component.scss']
})


export class GuesstimateComponent implements OnInit {

  constructor(private qouteService: QouteService) {}


  HIDDEN_LETTERS_PERCENTAGE: number = 0.25;
  
  currentQoute: Qoute;
  currentWordIndex: number;
  hiddenLetterIndexes: number[][];
  guessedLettersCurrentWord: string[];

  @ViewChildren(WordComponent)
  wordComponents: QueryList<WordComponent>;
  
  ngOnInit(): void {
    this.getNextQoute();
  }

  resetWordGuesses(): void {
    this.guessedLettersCurrentWord = [];
  }

  getNextQoute(): void {
    this.qouteService.getQoute().subscribe(qoute => {
      this.loadNextQoute(qoute);
    });
  }

  loadNextQoute(qoute: Qoute): void {

    // Reset for next word
    this.hiddenLetterIndexes = [];
    this.guessedLettersCurrentWord = [];
    this.currentWordIndex = 0;

    // Get a random word from the list of possible words
    this.currentQoute = qoute;
    
    // Create unique random indexes for the hidden letters
    for(let i = 0; i < this.qouteWords.length; i++) {

      // Word length without special characters
      const wordLength = (this.qouteWords[i].match(/[a-z]/g) || []).length;
      const hiddenLettersCount = Math.floor(wordLength * this.HIDDEN_LETTERS_PERCENTAGE);
      
      this.hiddenLetterIndexes.push([]);
      this.hiddenLetterIndexes[i].push(Math.floor(Math.random() * wordLength));
      while (this.hiddenLetterIndexes[i].length < hiddenLettersCount) {
        const index = Math.floor(Math.random() * wordLength);
        if (!this.hiddenLetterIndexes[i].includes(index) && this.qouteWords[i][index].match(/[a-z]/)) {
          this.hiddenLetterIndexes[i].push(index);
        }
      }

      // Sort the indexes to insert the guessed letters in the right order later
      this.hiddenLetterIndexes[i].sort();
    }
  }

  checkIfGuessedWord(): boolean {
    const currentWord = this.qouteWords[this.currentWordIndex];
    const currentHiddenLetterIndexes = this.hiddenLetterIndexes[this.currentWordIndex];
    for(let i = 0; i < this.hiddenLettersCount; i++) {
      if(currentWord[currentHiddenLetterIndexes[i]].toLowerCase() !== this.guessedLettersCurrentWord[i]) {
        return false;
      }
    }
    
    return true;
  }

  guessLetter(letter: string) {
    this.guessedLettersCurrentWord.push(letter);
    
    if(this.guessedLettersCurrentWord.length < this.hiddenLettersCount) return;
    
    if(this.checkIfGuessedWord()) {

      
      for(let index of this.hiddenLetterIndexes[this.currentWordIndex]) {
        this.wordComponents.get(this.currentWordIndex)?.playLetterAnimation(index, "right");
      }

      this.selectNextWord();

      return;
    }

    for(let index of this.hiddenLetterIndexes[this.currentWordIndex]) {
      this.wordComponents.get(this.currentWordIndex)?.playLetterAnimation(index, "wrong");
    }
    
    this.resetWordGuesses();
  }
  
  selectNextWord(): void {

    if(this.currentWordIndex >= this.qouteWords.length - 1) {
      this.getNextQoute();
      return;
    }

    this.currentWordIndex++;
    this.guessedLettersCurrentWord = [];
  }

  playKeyboardSound(): void {
    const audioFile = Math.floor(Math.random() * 4) + 1;
    const audio = new Audio(`assets/sounds/keypress${audioFile}.wav`);
    audio.normalize();
    audio.volume = 0.1;
    audio.play();
  }

  //------- GETTERS AND SETTERS ----------//

  get shownWords(): string[][] {

    let shownWords: string[][] = [];

    if(!this.currentQoute) return [];

    // Show all already solved words in full
    const solvedWords = this.qouteWords.slice(0, this.currentWordIndex);
    shownWords = solvedWords.map(word => word.split(""));

    // Replace the hidden letters with empty spaces in all words
    for(let w_idx = this.currentWordIndex; w_idx < this.qouteWords.length; w_idx++) {
      let shownLetters: string[] = [];
      for (let l_idx = 0; l_idx < this.qouteWords[w_idx].length; l_idx++) {
        if (this.hiddenLetterIndexes[w_idx].includes(l_idx)) {
          shownLetters.push("");
        } else {
          shownLetters.push(this.qouteWords[w_idx][l_idx]);
        }
      }

      // Place guessed letters in the current word thats being solved
      if(w_idx == this.currentWordIndex) {
        for(let i = 0; i < this.guessedLettersCurrentWord.length; i++) {
          shownLetters[this.hiddenLetterIndexes[w_idx][i]] = this.guessedLettersCurrentWord[i];
        }
      }

      shownWords.push(shownLetters);
    }

    return shownWords;
  }

  get qouteWords(): string[] {
    if(!this.currentQoute) return [];
    return this.currentQoute.text.split(" ");
  }
  
  get hiddenLettersCount(): number {
    return this.hiddenLetterIndexes[this.currentWordIndex].length;
  }

  get cursorPosition(): CursorPosition {    
    let cursorPositionInWord = this.hiddenLetterIndexes[this.currentWordIndex][this.guessedLettersCurrentWord.length];
    return {
      wordIndex: this.currentWordIndex,
      letterIndex: cursorPositionInWord
    }
  }

  get qouteAuthor(): string {
    if(!this.currentQoute) return "";
    if(this.currentQoute.author == "") return "Unknown";

    return this.currentQoute.author;
  }

  //------- DOM EVENTS ----------//

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    if(event.key == "Backspace"){
      this.guessedLettersCurrentWord.pop();
      this.playKeyboardSound();
      return;
    }
    
    let key = event.key.toLowerCase();    

    // Check if the key is a letter
    if(key.length === 1 && key.match(/[a-z]/)) {
      this.guessLetter(key);
      this.playKeyboardSound();   
    }
  }
}
