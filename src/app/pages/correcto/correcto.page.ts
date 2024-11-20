import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, TranslateModule, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CorrectoPage implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  
  public usuario: Usuario | undefined; // Hacerlo opcional
  public respuesta: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController) { {
      // Recibir datos de la navegación
      this.activatedRoute.queryParams.subscribe(params => {
        const nav = this.router.getCurrentNavigation();
        if (nav && nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
        } 
      });
    }
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
  
    public irALogin(): void {
      this.router.navigate(['/ingreso']);
    }
  }
  