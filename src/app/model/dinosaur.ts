import { showAlert, showAlertError } from "../tools/message-functions";

export class Dinosaur {

  static jsonDinoExample =
    `{
      "sede": "",
      "idAsignatura":"",
      "seccion":"",
      "nombreAsignatura": "",
      "nombreProfesor": "",
      "dia": "",
      "bloqueInicio":"",
      "bloqueTermino":"",
      "horaInicio":"", 
      "horaFin": ""
    }`;
  
    static jsonDinoEmpty =
    `{
      "sede": "",
      "idAsignatura": "",
      "seccion": "",
      "nombreAsignatura": "",
      "nombreProfesor": "",
      "dia": "",
      "bloqueInicio": "",
      "bloqueTermino": "",
      "horaInicio": "",
      "horaFin": "",
    }`;

   sede = '';
   idAsignatura = '';
   seccion = '';
   nombreAsignatura = '';
   nombreProfesor = '';
   dia = '';
   bloqueInicio = 0;
   bloqueTermino = 0;
   horaInicio = '';
   horaFin = '';

  constructor() { }

  public static getNewDinosaur(
    sede: string,
    idAsignatura: string,
    seccion: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    dia: string,
    bloqueInicio: number,
    bloqueTermino: number,
    horaInicio: string,
    horaFin: string,
  ) {
    const dino = new Dinosaur();
    dino.sede = sede;
    dino.idAsignatura = idAsignatura;
    dino.seccion = seccion;
    dino.nombreAsignatura = nombreAsignatura;
    dino.nombreProfesor = nombreProfesor;
    dino.dia = dia;
    dino.bloqueInicio = bloqueInicio;
    dino.bloqueTermino = bloqueTermino;
    dino.horaInicio = horaInicio;
    dino.horaFin = horaFin;
    return dino;
  }

  // Devolver verdadero si el texto del QR contiene todos los datos de
  // una clase, de lo contrario se ha escaneado un QR que a lo 
  // mejor es válido, pero es de otro tipo de información.

  static isValidDinosaurQrCode(qr: string) { if (qr ==='') return false;
    try{
      const json = JSON.parse(qr);
      if( json.bloqueInicio !== undefined
        && json.bloqueTermino !== undefined
        && json.dia !==undefined
        && json.horaFin !== undefined
        && json.horaInicio !== undefined
        && json.idAsignatura !== undefined
        && json.nombreAsignatura !== undefined
        && json.nombreProfesor !== undefined
        && json.seccion !== undefined
        && json.sede !== undefined)
        {
          return true;
        }
    } catch(error){ }
    showAlert ('El código QR escaneado no corresponde a una asistencia');
    return false;
  }
  
}
