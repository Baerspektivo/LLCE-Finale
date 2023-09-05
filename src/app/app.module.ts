import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { CheckModeComponent } from './check-mode/check-mode.component';
import { ExamModeComponent } from './exam-mode/exam-mode.component';
import { StatistikComponent } from './Popup/statistik/statistik.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PopUpComponent } from './Popup/pop-up/pop-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
// import { SingleChoiceQuestionComponent } from './Templates/single-choice-questeion/single-choice-questeion.component';
// import { MultipleChoiceQuestionComponent } from './Templates/multiple-choice-questeion/multiple-choice-questeion.component';
// import { InputChoiceQuesteionComponent } from './Templates/input-choice-questeion/input-choice-questeion.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { FilterComponent } from './Templates/filter/filter.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { PrivacyPolicyComponent } from './Templates/privacy-policy/privacy-policy.component';
import { ErrorMessageComponent } from './Popup/error-message/error-message.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    // LearningCenterComponent,
    CheckModeComponent,
    ExamModeComponent,
    StatistikComponent,
    PopUpComponent,
    // SingleChoiceQuestionComponent,
    // MultipleChoiceQuestionComponent,
    // InputChoiceQuesteionComponent,
    AppNavigationComponent,
    FilterComponent,
    CookieBannerComponent,
    PrivacyPolicyComponent,
    ErrorMessageComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
