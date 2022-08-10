import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-guesstimate',
  templateUrl: './guesstimate.component.html',
  styleUrls: ['./guesstimate.component.scss']
})
export class GuesstimateComponent implements OnInit {

  possibleWords: string[] = [
    "grandma",
    "words",
    "hello",
    "world",
    "computer",
    "science",
    "program",
    "software",
    "hardware",
    "internet",
    "network"
  ];

  HIDDEN_LETTERS_PERCENTAGE: number = 0.25;
  
  currentSentence: string[] = [];
  currentWordIndex: number = 0;
  hiddenLetterIndexes: number[][] = [];
  guessedLettersCurrentWord: string[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.nextSentence();
  }

  resetWordGuesses(): void {
    this.guessedLettersCurrentWord = [];
  }

  nextSentence(): void {

    // Reset for next word
    this.hiddenLetterIndexes = [];
    this.guessedLettersCurrentWord = [];
    this.currentWordIndex = 0;

    // Get a random word from the list of possible words
    this.currentSentence = this.possibleWords;
    
    // Create unique random indexes for the hidden letters
    for(let i = 0; i < this.currentSentence.length; i++) {

      const wordLength = this.currentSentence[i].length;
      const hiddenLettersCount = Math.floor(this.currentSentence[i].length * this.HIDDEN_LETTERS_PERCENTAGE);
      
      this.hiddenLetterIndexes.push([]);
      this.hiddenLetterIndexes[i].push(Math.floor(Math.random() * wordLength));
      while (this.hiddenLetterIndexes[i].length < hiddenLettersCount) {
        const index = Math.floor(Math.random() * wordLength);
        if (!this.hiddenLetterIndexes[i].includes(index)) {
          this.hiddenLetterIndexes[i].push(index);
        }
      }

      // Sort the indexes to insert the guessed letters in the right order later
      this.hiddenLetterIndexes[i].sort();
    }
  }

  checkIfGuessedWord(): boolean {
    const currentWord = this.currentSentence[this.currentWordIndex];
    const currentHiddenLetterIndexes = this.hiddenLetterIndexes[this.currentWordIndex];
    for(let i = 0; i < this.hiddenLettersCount; i++) {
      if(currentWord[currentHiddenLetterIndexes[i]] !== this.guessedLettersCurrentWord[i]) {
        return false;
      }
    }
    
    return true;
  }

  guessLetter(letter: string) {
    this.guessedLettersCurrentWord.push(letter);
    
    if(this.guessedLettersCurrentWord.length < this.hiddenLettersCount) return;
    
    if(this.checkIfGuessedWord()) {
      this.selectNextWord();
      return;
    }
    
    this.resetWordGuesses();
  }
  
  selectNextWord(): void {
    this.currentWordIndex++;
    this.guessedLettersCurrentWord = [];
    if(this.currentWordIndex >= this.currentSentence.length) {
      this.nextSentence();
    }
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

    // Show all already solved words in full
    const solvedWords = this.currentSentence.slice(0, this.currentWordIndex);
    shownWords = solvedWords.map(word => word.split(""));

    // Replace the hidden letters with empty spaces in all words
    for(let w_idx = this.currentWordIndex; w_idx < this.currentSentence.length; w_idx++) {
      let shownLetters: string[] = [];
      for (let l_idx = 0; l_idx < this.currentSentence[w_idx].length; l_idx++) {
        if (this.hiddenLetterIndexes[w_idx].includes(l_idx)) {
          shownLetters.push("");
        } else {
          shownLetters.push(this.currentSentence[w_idx][l_idx]);
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
  
  get hiddenLettersCount(): number {
    return this.hiddenLetterIndexes[this.currentWordIndex].length;
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
