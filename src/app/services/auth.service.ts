import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { showToast } from 'src/app/tools/message-routines';
import { Usuario } from '../model/usuario';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';
import { showAlertError } from '../tools/message-functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);

  // La variable primerInicioSesion
  primerInicioSesion =  new BehaviorSubject<boolean>(false);
  storageQrCodeKey = 'QR_CODE';
  qrCodeData = new BehaviorSubject<string | null>(null);
  componenteSeleccionada = new BehaviorSubject<string>('codigoqr');
  

  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) { }

  async inicializarAutenticacion() {
    await this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      return Boolean(await this.leerUsuarioAutenticado());
    } catch (error) {
      showAlertError('AuthService.isAuthenticated', error);
      return false;
    }
  }

  // Leer el usuario autenticado y retornar su tipo de cuenta
  async leerUsuarioAutenticado(): Promise<Usuario | null> {
    try {
      const usuario = await this.storage.get(this.keyUsuario) as Usuario | null;
      this.usuarioAutenticado.next(usuario ?? null);
      return usuario;
    } catch (error) {
      showAlertError('AuthService.readAuthUser', error);
      return null;
    }
  }

  async guardarUsuarioAutenticado(usuario: Usuario): Promise<Usuario | null> {
    try {
      await this.storage.set(this.keyUsuario, usuario);
      this.usuarioAutenticado.next(usuario);
      return usuario;
    } catch (error) {
      showAlertError('AuthService.saveAuthUser', error);
      return null;
    }
  }

  async eliminarUsuarioAutenticado(): Promise<boolean> {
    try {
      await this.storage.remove(this.keyUsuario);
      this.usuarioAutenticado.next(null);
      return true;
    } catch (error) {
      showAlertError('AuthService.deleteAuthUser', error);
      return false;
    }
  }

  async buscarUsuarioPorCorreo(correo: string): Promise<Usuario | null> {
    const usuario = await this.bd.buscarUsuarioPorCorreo(correo);
    return usuario || null;
  }

  async login(cuenta: string, password: string): Promise<boolean> {
    try {
      const usuarioAutenticado = await this.storage.get(this.keyUsuario);

      if (usuarioAutenticado) {
        // Si ya hay un usuario autenticado, no hace falta repetir la lógica
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.primerInicioSesion.next(false);
        await this.router.navigate(['/ingreso']);
        return true;
      } else {
        const usuario = await this.bd.buscarUsuarioValido(cuenta, password);

        if (usuario) {
          showToast(`¡Bienvenid@ ${usuario.nombre} ${usuario.apellido}!`);
          await this.guardarUsuarioAutenticado(usuario);
          this.primerInicioSesion.next(true);
          await this.router.navigate(['/inicio']);
          return true;
        } else {
          showToast('El correo o la contraseña son incorrectos');
          await this.router.navigate(['/ingreso']);
          return false;
        }
      }
    } catch (error) {
      showAlertError('AuthService.login', error);
      return false;
    }
  }

  async logout(): Promise<boolean> {
    try {
      const usuario = await this.leerUsuarioAutenticado();

      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        await this.eliminarUsuarioAutenticado();
      }

      await this.router.navigate(['/ingreso']);
      return true;
    } catch (error) {
      showAlertError('AuthService.logout', error);
      return false;
    }
  }

  // Métodos para manejar el QR
  async readQrFromStorage(): Promise<string | null> {
    try {
      const qrData = await this.storage.get(this.storageQrCodeKey) as string | null;
      this.qrCodeData.next(qrData);
      return qrData;
    } catch (error) {
      showAlertError('AuthService.readQrFromStorage', error);
      return null;
    }
  }

  async saveQrToStorage(qrData: string): Promise<string | null> {
    try {
      await this.storage.set(this.storageQrCodeKey, qrData);
      this.qrCodeData.next(qrData);
      return qrData;
    } catch (error) {
      showAlertError('AuthService.saveQrToStorage', error);
      return null;
    }
  }

  async deleteQrFromStorage(): Promise<boolean> {
    try {
      await this.storage.remove(this.storageQrCodeKey);
      this.qrCodeData.next(null);
      return true;
    } catch (error) {
      showAlertError('AuthService.deleteQrFromStorage', error);
      return false;
    }
  }

  // Método para obtener el tipo de cuenta del usuario (admin o usuario normal)
  get tipoCuenta(): string | null {
    const usuario = this.usuarioAutenticado.value;
    return usuario ? usuario.cuenta : null;  // Devuelve 'admin' o 'usuario'
  }
}
