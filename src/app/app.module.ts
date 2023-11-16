import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DynamicDialogBoxComponent } from './dynamic-dialog-box/dynamic-dialog-box.component';

const firebaseConfig = {
  apiKey: "AIzaSyBFuyo8zjD2uP8R4dMHq5kQkmK7G3iMVs4",
  authDomain: "trinethra-portal.firebaseapp.com",
  projectId: "trinethra-portal",
  storageBucket: "trinethra-portal.appspot.com",
  messagingSenderId: "117444886923",
  appId: "1:117444886923:web:816308ba5521d6bfe36f8e"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DynamicDialogBoxComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "trinethra-portal", "appId": "1:117444886923:web:816308ba5521d6bfe36f8e", "storageBucket": "trinethra-portal.appspot.com", "apiKey": "AIzaSyBFuyo8zjD2uP8R4dMHq5kQkmK7G3iMVs4", "authDomain": "trinethra-portal.firebaseapp.com", "messagingSenderId": "117444886923" })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
