import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Publicacion } from 'src/app/model/publicacion';
import { APIClientService } from 'src/app/services/apiclient.service';
import { CodigoqrComponent } from 'src/app/components/codigoqr/codigoqr.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { ScannerService } from 'src/app/services/scanner.service';
import { Capacitor } from '@capacitor/core';
import { Dinosaur } from 'src/app/model/dinosaur';
import { WelcomeComponent } from "../../components/welcome/welcome.component";
import { Asistencia } from 'src/app/model/asistencia';
import { gridOutline, homeOutline, pencilOutline, schoolOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonTitle, CodigoqrComponent, ForoComponent, MisdatosComponent, MiclaseComponent,
    IonToolbar, CommonModule, FormsModule,
    HeaderComponent, FooterComponent, TranslateModule, LanguageComponent, WelcomeComponent]
})
export class InicioPage {
  
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';

  constructor( private auth: AuthService, private scanner: ScannerService) { 
    addIcons({homeOutline,schoolOutline,pencilOutline,gridOutline});
  }
  ionViewWillEnter() {
    this.changeComponent('codigoqr');
  }

  async headerClick(button: string){
    if (button === 'scan' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'codigoqr';
    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
      this.mostrarAsistencia(await this.scanner.scan());
    
  }

  webQrScanned(qr: string) {
    this.mostrarAsistencia(qr);
  }

  webQrStopped() {
    this.mostrarAsistencia('welcome');
  }

   mostrarAsistencia(qr: string){
    if (Asistencia.codigoQrValido(qr)){
      this.auth.qrCodeData.next(qr);
      this.changeComponent('miclase');
      return;
    }

    this.changeComponent('welcome');
  }

  async footerClick(button: string){
    if (button === 'codigoqr' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'codigoqr';
    else if (button === 'codigoqr' && Capacitor.getPlatform() !== 'web')
      this.mostrarAsistencia(await this.scanner.scan());

    this.selectedComponent = button;
  }

  changeComponent(name: string){
    this.selectedComponent = name;
    this.footer.selectedButton = name;
  }

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

}

