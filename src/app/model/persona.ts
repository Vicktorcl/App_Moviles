import { NivelEducacional } from './nivel-educacional';

export class Persona {

  nombre = '';
  apellido = '';
  nivelEducacional: NivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
  fechaNacimiento: Date = new Date();
  direccion = '';

  constructor() {
  }

}
