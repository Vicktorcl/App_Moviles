import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonCardContent, IonCardTitle,TranslateModule, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PreguntaPage implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private animationController: AnimationController
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state && nav.extras.state['usuario']) {
      this.usuario = nav.extras.state['usuario'];
    } else {
      this.router.navigate(['/ingreso']);
    }
  }

  ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translateY(0%)', 'translateX(100%)')
        .fromTo('opacity', 0.5, 1);
      animation.play();
    }
  }

  // Método para cargar la pregunta secreta del usuario
  public cargarPreguntaSecreta(): string {
    if (this.usuario) {
      return this.usuario.preguntaSecreta; // Asegúrate de que el modelo Usuario tenga esta propiedad
    } else {
      this.mostrarToast('No se encontró al usuario.', 'danger');
      return 'Pregunta no disponible';
    }
  }

  // Método para mostrar un mensaje de toast
  async mostrarToast(message: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  // Método para validar la respuesta secreta
  public validarRespuestaSecreta(): void {
    if (this.usuario) {
      if (this.usuario.respuestaSecreta === this.respuesta) {
        this.router.navigate(['/correcto'], { state: { usuario: this.usuario } });
      } else {
        this.router.navigate(['/incorrecto'], { state: { usuario: this.usuario } });
      }
    } else {
      alert('No se ha encontrado el usuario.');
    }
  }

  volverAlInicio(): void {
    this.router.navigate(['/ingreso']);
  }
}
