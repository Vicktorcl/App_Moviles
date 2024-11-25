import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from 'src/app/services/auth.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { CodigoqrComponent } from 'src/app/components/codigoqr/codigoqr.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { UsuariosComponent } from "../../components/usuarios/usuarios.component";
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Capacitor } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { gridOutline, homeOutline, pencilOutline, schoolOutline } from 'ionicons/icons';
import { WelcomeComponent } from "../../components/welcome/welcome.component";
import { Asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonContent, IonTitle, CodigoqrComponent, ForoComponent, MisdatosComponent, MiclaseComponent,
    IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent, 
    TranslateModule, LanguageComponent, WelcomeComponent, UsuariosComponent
  ]
})
export class InicioPage implements OnInit {

  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'codigoqr';
  cuenta: string = ''; // Guardamos el nombre de la cuenta del usuario

  constructor(private auth: AuthService, private scanner: ScannerService) {
    addIcons({ homeOutline, schoolOutline, pencilOutline, gridOutline });
  }

  // Al iniciar el componente, obtenemos el usuario autenticado y actualizamos la cuenta
  async ngOnInit() {
    const usuario = await this.auth.leerUsuarioAutenticado();
    if (usuario) {
      this.cuenta = usuario.cuenta; // Asigna el nombre de la cuenta al componente
      this.actualizarFooter();  // Asegúrate de actualizar el footer con la cuenta al cargar la página
    }
  }

  // Cambia al componente correcto cuando la vista se va a cargar
  ionViewWillEnter() {
    this.changeComponent('codigoqr');
    this.actualizarFooter();
  }

  // Maneja los clics en el header para el escaneo de QR
  async headerClick(button: string) {
    if (button === 'scan' && Capacitor.getPlatform() === 'web') {
      this.selectedComponent = 'codigoqr';
    } else if (button === 'scan' && Capacitor.getPlatform() !== 'web') {
      const qr = await this.scanner.scan();
      this.mostrarAsistencia(qr);
    }
  }

  // Para el escaneo web de QR
  webQrScanned(qr: string) {
    this.mostrarAsistencia(qr);
  }

  // Si se detiene el escaneo del QR
  webQrStopped() {
    this.mostrarAsistencia('welcome');
  }

  // Muestra la asistencia basada en el QR escaneado
  mostrarAsistencia(qr: string) {
    if (Asistencia.codigoQrValido(qr)) {
      this.auth.qrCodeData.next(qr);
      this.changeComponent('miclase');
    } else {
      this.changeComponent('welcome');
    }
  }

  // Maneja los clics en el footer para cambiar el componente seleccionado
  async footerClick(button: string) {
    if (button === 'codigoqr' && Capacitor.getPlatform() === 'web') {
      this.selectedComponent = 'codigoqr';
    } else if (button === 'codigoqr' && Capacitor.getPlatform() !== 'web') {
      const qr = await this.scanner.scan();
      this.mostrarAsistencia(qr);
    } else {
      this.selectedComponent = button;
    }
    this.actualizarFooter();  // Actualiza el footer después del clic
  }

  // Cambia el componente mostrado
  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name; // Actualiza el botón seleccionado en el FooterComponent
    this.footer.cuenta = this.cuenta; // Pasa el nombre de la cuenta al FooterComponent
    this.actualizarFooter();
  }

  // Actualiza la información del footer, como la cuenta
  actualizarFooter() {
    if (this.footer) {
      this.footer.cuenta = this.cuenta;
    }
  }

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;
}
