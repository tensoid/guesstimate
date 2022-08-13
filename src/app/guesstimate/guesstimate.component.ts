import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import { WordComponent } from '../word/word.component';


export interface CursorPosition {
  wordIndex: number;
  letterIndex: number;
}

export type LetterAnimationType = 'right' | 'wrong';


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

  qoutes: string[] = [
    "Life isnt about getting and having its about giving and being",
    "Whatever the mind of man can conceive and believe it can achieve",
    "Strive not to be a success but rather to be of value",
    "Two roads diverged in a wood and II took the one less traveled by And that has made all the difference",
    "I attribute my success to this I never gave or took any excuse",
    "You miss  of the shots you dont take",
    "Ive missed more than  shots in my career Ive lost almost  games  times Ive been trusted to take the game winning shot and missed Ive failed over and over and over again in my life And that is why I succeed",
    "The most difficult thing is the decision to act the rest is merely tenacity",
    "Every strike brings me closer to the next home run",
    "Definiteness of purpose is the starting point of all achievement",
    "We must balance conspicuous consumption with conscious capitalism",
    "Life is what happens to you while youre busy making other plans",
    "We become what we think about",
    "Twenty years from now you will be more disappointed by the things that you didnt do than by the ones you did do so throw off the bowlines sail away from safe harbor catch the trade winds in your sails  Explore Dream Discover",
    "Life is  what happens to me and  of how I react to it",
    "The most common way people give up their power is by thinking they dont have any",
    "The mind is everything What you think you become",
    "The best time to plant a tree was  years ago The second best time is now",
    "An unexamined life is not worth living",
    "Eighty percent of success is showing up",
    "Your time is limited so dont waste it living someone elses life",
    "Winning isnt everything but wanting to win is",
    "I am not a product of my circumstances I am a product of my decisions",
    "Every child is an artist  The problem is how to remain an artist once he grows up",
    "You can never cross the ocean until you have the courage to lose sight of the shore",
    "Ive learned that people will forget what you said people will forget what you did but people will never forget how you made them feel",
    "Either you run the day or the day runs you",
    "Whether you think you can or you think you cant youre right",
    "The two most important days in your life are the day you are born and the day you find out why",
    "Whatever you can do or dream you can begin it  Boldness has genius power and magic in it",
    "The best revenge is massive success",
    "People often say that motivation doesnt last Well neither does bathing  Thats why we recommend it daily",
    "Life shrinks or expands in proportion to ones courage",
    "If you hear a voice within you say you cannot paint then by all means paint and that voice will be silenced",
    "There is only one way to avoid criticism do nothing say nothing and be nothing",
    "Ask and it will be given to you search and you will find knock and the door will be opened for you",
    "The only person you are destined to become is the person you decide to be",
    "Go confidently in the direction of your dreams  Live the life you have imagined",
    "When I stand before God at the end of my life I would hope that I would not have a single bit of talent left and could say I used everything you gave me",
    "Few things can help an individual more than to place responsibility on him and to let him know that you trust him",
    "Certain things catch your eye but pursue only those that capture the heart",
    "Believe you can and youre halfway there",
    "Everything youve ever wanted is on the other side of fear",
    "We can easily forgive a child who is afraid of the dark the real tragedy of life is when men are afraid of the light",
    "Teach thy tongue to say I do not know and thous shalt progress",
    "Start where you are Use what you have  Do what you can",
    "When I was  years old my mother always told me that happiness was the key to life  When I went to school they asked me what I wanted to be when I grew up  I wrote down happy  They told me I didnt understand the assignment and I told them they didnt understand life",
    "Fall seven times and stand up eight",
    "When one door of happiness closes another opens but often we look so long at the closed door that we do not see the one that has been opened for us",
    "Everything has beauty but not everyone can see",
    "How wonderful it is that nobody need wait a single moment before starting to improve the world",
    "When I let go of what I am I become what I might be",
    "Life is not measured by the number of breaths we take but by the moments that take our breath away",
    "Happiness is not something readymade  It comes from your own actions",
    "If youre offered a seat on a rocket ship dont ask what seat Just get on",
    "First have a definite clear practical ideal a goal an objective Second have the necessary means to achieve your ends wisdom money materials and methods Third adjust all your means to that end",
    "If the wind will not serve take to the oars",
    "You cant fall if you dont climb  But theres no joy in living your whole life on the ground",
    "We must believe that we are gifted for something and that this thing at whatever cost must be attained",
    "Too many of us are not living our dreams because we are living our fears",
    "Challenges are what make life interesting and overcoming them is what makes life meaningful",
    "If you want to lift yourself up lift up someone else",
    "I have been impressed with the urgency of doing Knowing is not enough we must apply Being willing is not enough we must do",
    "Limitations live only in our minds  But if we use our imaginations our possibilities become limitless",
    "You take your life in your own hands and what happens A terrible thing no one to blame",
    "Whats money A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do",
    "I didnt fail the test I just found  ways to do it wrong",
    "In order to succeed your desire for success should be greater than your fear of failure",
    "A person who never made a mistake never tried anything new",
    "The person who says it cannot be done should not interrupt the person who is doing it",
    "There are no traffic jams along the extra mile",
    "It is never too late to be what you might have been",
    "You become what you believe",
    "I would rather die of passion than of boredom",
    "A truly rich man is one whose children run into his arms when his hands are empty",
    "It is not what you do for your children but what you have taught them to do for themselves that will make them successful human beings",
    "If you want your children to turn out well spend twice as much time with them and half as much money",
    "Build your own dreams or someone else will hire you to build theirs",
    "The battles that count arent the ones for gold medals The struggles within yourselfthe invisible battles inside all of usthats where its at",
    "Education costs money  But then so does ignorance",
    "I have learned over the years that when ones mind is made up this diminishes fear",
    "It does not matter how slowly you go as long as you do not stop",
    "If you look at what you have in life youll always have more If you look at what you dont have in life youll never have enough",
    "Remember that not getting what you want is sometimes a wonderful stroke of luck",
    "You cant use up creativity  The more you use the more you have",
    "Dream big and dare to fail",
    "Our lives begin to end the day we become silent about things that matter",
    "Do what you can where you are with what you have",
    "If you do what youve always done youll get what youve always gotten",
    "Dreaming after all is a form of planning",
    "Its your place in the world its your life Go on and do all you can with it and make it the life you want to live",
    "You may be disappointed if you fail but you are doomed if you dont try",
    "Remember no one can make you feel inferior without your consent",
    "Life is what we make it always has been always will be",
    "The question isnt who is going to let me its who is going to stop me",
    "When everything seems to be going against you remember that the airplane takes off against the wind not with it",
    "Its not the years in your life that count Its the life in your years",
    "Change your thoughts and you change your world",
    "Either write something worth reading or do something worth writing",
    "Nothing is impossible the word itself says Im possible",
    "The only way to do great work is to love what you do",
    "If you can dream it you can achieve it"
  ];

  HIDDEN_LETTERS_PERCENTAGE: number = 0.25;
  
  currentSentence: string[];
  currentWordIndex: number;
  hiddenLetterIndexes: number[][];
  guessedLettersCurrentWord: string[];

  @ViewChildren(WordComponent)
  wordComponents: QueryList<WordComponent>;
  
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
    this.currentSentence = this.qoutes[Math.floor(Math.random() * this.qoutes.length)].split(" ");
    
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

  get cursorPosition(): CursorPosition {
    let cursorPositionInWord = this.hiddenLetterIndexes[this.currentWordIndex][this.guessedLettersCurrentWord.length];
    return {
      wordIndex: this.currentWordIndex,
      letterIndex: cursorPositionInWord
    }
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
