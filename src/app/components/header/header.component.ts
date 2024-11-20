import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonButton, IonIcon,IonTitle } from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonIcon, IonHeader, IonToolbar, IonButton,IonTitle, CommonModule, TranslateModule ]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService,
    private animationController: AnimationController,
  ) {
    addIcons({ logOutOutline });
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      }
    });
   }

   ngAfterViewInit(): void {
    this.iniciarAnimacionTitulo();
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
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
