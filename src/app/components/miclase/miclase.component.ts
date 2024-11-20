import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageComponent } from '../language/language.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, CommonModule, IonCard, IonCardContent, LanguageComponent, TranslateModule]
})
export class MiclaseComponent implements OnDestroy {
  clase: any;
  private subscription: Subscription;

  constructor( private authService: AuthService) 
  { 
    this.subscription = this.authService.qrCodeData.subscribe((qr) =>{
      this.clase = qr? JSON.parse(qr): null;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 

}
