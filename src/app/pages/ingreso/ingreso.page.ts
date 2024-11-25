import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, AnimationController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonIcon, IonToolbar, IonInput, IonButton, IonRow, IonCol, IonGrid, IonCard, IonItem, IonCardContent, IonCardHeader, IonFooter } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LanguageComponent } from "../../components/language/language.component";

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule, FormsModule, AppComponent, HeaderComponent, FooterComponent,LanguageComponent
  ]
})
export class IngresoPage implements AfterViewInit, OnInit, ViewWillEnter {
  
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;
  
  correo: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private animationController: AnimationController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.correo = 'atorres';
    this.password = '1234';
  }

  ngAfterViewInit(): void {
    // Animación del título
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
        .fromTo('opacity', 0.2, 1);
      animation.play();
    }    
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }
  
  // Método para iniciar sesión
  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  toRuta(): void {
    this.router.navigate(['/map']);
  }

  toRegistrarse(): void {
    this.router.navigate(['/registrarme']);
  }

  // Método para navegar a la página de correo con el correo como parámetro
  public ingresarValidarCorreo(): void {
    this.router.navigate(['/correo']);
  }

  // Método para mostrar mensajes de toast
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion ? duracion : 2000
      });
    toast.present();
  }
}
