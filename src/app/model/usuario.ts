import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";
import { Asistencia } from '../interfaces/asistencia';
import { DataBaseService } from '../services/data-base.service';
import { Optional } from '@angular/core';
import { convertDateToString } from '../tools/date-functions';

export class Usuario extends Persona {

  cuenta = '';
  correo = '';
  password = '';
  preguntaSecreta = '';
  respuestaSecreta = '';

  constructor() {
    super();
  }


  static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date,
    direccion: string
  ) {
    let usuario = new Usuario();
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.direccion = direccion;
    return usuario;
  }

  // async buscarUsuarioValido(cuenta: string, password: string): Promise<Usuario | undefined> {
  //   return await this.db!.buscarUsuarioValido(cuenta, password);
  // }

  // async buscarUsuarioPorCuenta(cuenta: string): Promise<Usuario | undefined>  {
  //   return await this.db!.buscarUsuarioPorCuenta(cuenta);
  // }

  // async guardarUsuario(usuario: Usuario): Promise<void> {
  //   this.db!.guardarUsuario(usuario);
  // }


  
  // async eliminarUsuario(cuenta: string): Promise<void>  {
  //   this.db!.eliminarUsuarioUsandoCuenta(cuenta);
  // }

  public override toString(): string {
    return `\n
        Cuenta: ${this.cuenta}\n
        Correo: ${this.correo}\n
        Password: ${this.password}\n
        preguntaSecreta: ${this.preguntaSecreta}\n
        respuestaSecreta: ${this.respuestaSecreta}\n
        Nombre: ${this.nombre}\n
        Apellido: ${this.apellido}\n
        Nivel Educacional: ${this.nivelEducacional.getEducacion()}\n
        Fecha de nacimiento: ${convertDateToString(this.fechaNacimiento)}\n
        Direccion: ${this.direccion}\n
        `;
  }

}

