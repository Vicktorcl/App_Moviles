import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { IonToolbar, IonButton, IonIcon, IonFooter, IonSegment, IonSegmentButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { grid, gridOutline, home, homeOutline, pencilOutline, person, personOutline, schoolOutline, stopCircleOutline, videocamOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule]
})
export class FooterComponent {

  selectedButton = 'welcome';
  @Output() footerClick = new EventEmitter<string>();

  constructor( private authservice: AuthService) { 
    addIcons({ homeOutline, gridOutline, personOutline, schoolOutline, pencilOutline,videocamOutline, stopCircleOutline});
  }

  
  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }
  segmentedChange($event: any){
    this.footerClick.emit(this.selectedButton);
   }

    
}

