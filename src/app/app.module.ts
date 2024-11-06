import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatBadgeModule } from "@angular/material/badge";
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CheckoutComponent } from './checkout/checkout.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestore } from "@angular/fire/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBpqn3iHgdoPiO-uVxsJNi2pTpjEk3ZJoE",
  authDomain: "contact-aad4c.firebaseapp.com",
  projectId: "contact-aad4c",
  storageBucket: "contact-aad4c.firebasestorage.app",
  messagingSenderId: "1069475548357",
  appId: "1:1069475548357:web:0fec1670b46661dab074ac"
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    CartComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBadgeModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
