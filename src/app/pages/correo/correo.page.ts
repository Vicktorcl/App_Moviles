import { AfterViewInit, ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuario';
import { ToastController, AnimationController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonCardContent,TranslateModule, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit, AfterViewInit  {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  
  public correo: string = '';
  public respuesta: string = '';  // Correo ingresado
  errorMessage: string = '';  // Para mostrar mensajes de error si es necesario

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private toastController: ToastController,
    private db: DataBaseService,
    private animationController: AnimationController
  ) { }

  ngOnInit() {
    this.correo = ''; // Inicia correo como un valor vacío para asegurar que no haya conflicto
  }

  public ngAfterViewInit(): void {
    // Animación del título
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translateY(0%)', 'translateX(100%)') // Mueve el título hacia arriba
        .fromTo('opacity', 0.5, 1);
      animation.play();
    }
  }

  // Método para verificar el correo
  public async verificarCorreo(): Promise<void> {
    // Validar el formato del correo
    if (!this.validarCorreo(this.correo)) {
      alert('El formato del correo ingresado no es válido');
      return; // Salir si el correo no es válido
    }
  
    // Buscar el usuario por correo
    const usuarioEncontrado = await this.authService.buscarUsuarioPorCorreo(this.correo);
  
    if (!usuarioEncontrado) {
      // Redirigir a la página de incorrecto si el correo no existe
      this.router.navigate(['/incorrecto']);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado  
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }

  public validarCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  }

  private iniciarAnimacionTitulo(): void {
    if (this.itemTitulo) {
      this.animationController.create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1)
        .play();
    }}

  volverAlInicio(): void {
    this.router.navigate(['/ingreso']); // Redirige al inicio
  }
}
