import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonFooter, IonButton, IonIcon, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, personCircleOutline, gridOutline, personOutline, schoolOutline, pencilOutline, videocamOutline, stopCircleOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule]
})
export class FooterComponent implements OnInit {

  selectedButton = '';  // Inicializa el botón seleccionado
  usuarioAutenticado: Usuario | null = null;  // Aquí almacenamos el usuario autenticado
  @Output() footerClick = new EventEmitter<string>();  // Emite el evento cuando se hace clic en un botón
  @Input() cuenta: string = '';  // Recibe la cuenta como Input

  constructor(private auth: AuthService) { 
    addIcons({ homeOutline, personCircleOutline, gridOutline, personOutline, schoolOutline, pencilOutline, videocamOutline, stopCircleOutline });
  }

  // Se asegura de que la información del usuario se cargue al iniciar el componente
  async ngOnInit() {
    try {
      this.usuarioAutenticado = await this.auth.leerUsuarioAutenticado();
      if (this.usuarioAutenticado) {
        // Actualiza el botón seleccionado y cuenta al cargar el componente
        this.selectedButton = 'codigoqr'; // Ajusta esto a lo que necesites
      }
    } catch (error) {
      console.error('Error al cargar el usuario autenticado:', error);
    }
  }

  // En caso de que el valor de cuenta cambie, actualiza el botón
  ngOnChanges() {
    if (this.cuenta) {
      // Aquí puedes definir el comportamiento si la cuenta cambia
      this.selectedButton = 'foro'; // O el valor predeterminado que desees
    }
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);  // Emite el botón seleccionado al componente principal
  }

  segmentedChange($event: any) {
    this.footerClick.emit(this.selectedButton);  // Emite el evento al cambiar el segmento
  }
}
