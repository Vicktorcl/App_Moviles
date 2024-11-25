import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon, IonContent, IonList, IonCard, IonCardTitle, IonCardContent, IonCardHeader } from "@ionic/angular/standalone";
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showToast } from 'src/app/tools/message-routines';
import { CommonModule, NgFor } from '@angular/common'; // Importar NgFor

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [IonCardHeader,CommonModule, IonCardContent, IonCardTitle, IonCard, IonList, IonContent, IonIcon, IonButton, NgFor] // Agregar NgFor a imports
})
export class UsuariosComponent implements OnInit {

  listaUsuarios: Usuario[] = [];

  constructor(private dataBaseService: DataBaseService) {}

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  async cargarUsuarios() {
    try {
      this.listaUsuarios = await this.dataBaseService.leerUsuarios();
    } catch (error) {
      showToast('Error al cargar los usuarios.');
    }
  }

  async eliminarUsuario(cuenta: string) {
    try {
      const eliminado = await this.dataBaseService.eliminarUsuarioUsandoCuenta(cuenta);
      if (eliminado) {
        showToast('Usuario eliminado correctamente.');
        await this.cargarUsuarios();
      } else {
        showToast('No se pudo eliminar el usuario.');
      }
    } catch (error) {
      showToast('Error al intentar eliminar el usuario.');
    }
  }
}
