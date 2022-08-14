import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WordComponent } from './word/word.component';
import { LetterComponent } from './letter/letter.component';
import { GuesstimateComponent } from './guesstimate/guesstimate.component';
import { HeaderComponent } from './header/header.component';
import { DifficultySettingComponent } from './difficulty-setting/difficulty-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    LetterComponent,
    GuesstimateComponent,
    HeaderComponent,
    DifficultySettingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
