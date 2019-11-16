import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { CategoryComponent } from './category/category.component';
import { TriviaCardComponent } from './trivia-card/trivia-card.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    LoginComponent,
    QuestionsComponent,
    ScorecardComponent,
    DifficultyComponent,
    CategoryComponent,
    TriviaCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
