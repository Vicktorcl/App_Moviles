import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { IonContent, IonHeader, IonLabel, IonSelectOption, IonButton, IonGrid, IonCard, IonItem, IonCardContent, IonCardHeader, IonToolbar, IonInput, IonIcon, IonTitle } from '@ionic/angular/standalone';
import { showAlert, showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { APIClientService } from 'src/app/services/apiclient.service';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { convertDateToString } from 'src/app/tools/date-functions';
import { addIcons } from 'ionicons';
import { arrowDownCircle, trash, bookmarkOutline, logOutOutline } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonTitle, IonIcon,TranslateModule, CommonModule, FormsModule, IonLabel, IonSelectOption, IonGrid, IonButton, IonItem, IonCard, IonCardHeader, IonCardContent, HeaderComponent, FooterComponent, DatePickerComponent, IonContent, IonHeader, IonInput]
})
export class RegistrarmePage {

  usuario: Usuario = new Usuario(); 
  usuarios: Usuario[] = [];
  listaNivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();
  repeatPassword = '';

  constructor(
    private router: Router,
    private bd: DataBaseService,
    private auth: AuthService,
    private api: APIClientService
  ) {
    addIcons({ arrowDownCircle, trash, bookmarkOutline, logOutOutline }),
    this.bd.listaUsuarios.subscribe((usuarios) => {
      if (usuarios) {
        this.usuarios = usuarios;
      }
    });
  }



  async actualizarDatos() {
    // Validaciones de campos
  if (!this.usuario.cuenta || this.usuario.cuenta.trim() === '') {
    showToast('Debe ingresar una cuenta válida');
    return;
  }

  if (!this.usuario.correo || this.usuario.correo.trim() === '' || !this.usuario.correo.includes('@')) {
    showToast('Debe ingresar un correo válido');
    return;
  }

  if (!this.usuario.nombre || this.usuario.nombre.trim() === '') {
    showToast('Debe ingresar un nombre');
    return;
  }

  if (!this.usuario.apellido || this.usuario.apellido.trim() === '') {
    showToast('Debe ingresar un apellido');
    return;
  }

  if (!this.usuario.direccion || this.usuario.direccion.trim() === '') {
    showToast('Debe ingresar una dirección');
    return;
  }

  if (!this.usuario.nivelEducacional) {
    showToast('Debe seleccionar un nivel educacional');
    return;
  }

  if (!this.usuario.fechaNacimiento) {
    showToast('Debe seleccionar una fecha de nacimiento');
    return;
  }

  if (!this.usuario.preguntaSecreta || this.usuario.preguntaSecreta.trim() === '') {
    showToast('Debe ingresar una pregunta secreta');
    return;
  }

  if (!this.usuario.respuestaSecreta || this.usuario.respuestaSecreta.trim() === '') {
    showToast('Debe ingresar una respuesta secreta');
    return;
  }

  if (!this.usuario.password || this.usuario.password.trim() === '') {
    showToast('Debe ingresar una contraseña');
    return;
  }

  if (!this.repeatPassword || this.repeatPassword.trim() === '') {
    showToast('Debe repetir la contraseña');
    return;
  }

  if (this.usuario.password !== this.repeatPassword) {
    showToast('Las contraseñas no coinciden');
    return;
  }

  // Verificación de duplicados y registro
  try {
    const usuarioExistente = await this.bd.buscarUsuarioPorCuenta(this.usuario.cuenta);
    if (usuarioExistente) {
      showAlert('Error', `El usuario con cuenta "${this.usuario.cuenta}" ya está registrado.`);
      return;
    }

    const correoExistente = await this.bd.buscarUsuarioPorCorreo(this.usuario.correo);
    if (correoExistente) {
      showAlert('Error', `El correo "${this.usuario.correo}" ya está en uso.`);
      return;
    }

    await this.bd.guardarUsuario(this.usuario);
    showToast('Usuario registrado con éxito.');
    this.usuario = new Usuario(); // Limpiar formulario
    this.repeatPassword = '';
  } catch (error) {
    showAlert('Error', `Ocurrió un problema al registrar el usuario: ${error}`);
  }
  }

  actualizarNivelEducacional(event: any) {
    debugger
    this.usuario.nivelEducacional
      = NivelEducacional.buscarNivelEducacional(event.detail.value)!;
  }

  
  limpiarCampos() {
    this.usuario.cuenta ='';
    this.usuario.correo = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.direccion = '';
    this.usuario.preguntaSecreta = '';
    this.usuario.respuestaSecreta = '';
    this.usuario.password = '';
    this.repeatPassword = '';
    this.usuario.fechaNacimiento = new Date();
  }

  volverAlInicio(): void {
    this.router.navigate(['/ingreso']);
  }
}