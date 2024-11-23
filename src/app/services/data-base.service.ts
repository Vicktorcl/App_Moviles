import { capSQLiteChanges, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { Usuario } from '../model/usuario';
import { BehaviorSubject } from 'rxjs';
import { NivelEducacional } from '../model/nivel-educacional';
import { showAlertError } from '../tools/message-functions';
import { convertDateToString, convertStringToDate } from '../tools/date-functions';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {


  testUser1 = Usuario.getNewUsuario(
    'atorres', 
    'atorres@duocuc.cl', 
    '1234', 
    '¿Cuál es tu animal favorito?', 
    'gato',
    'Ana', 
    'Torres', 
    NivelEducacional.buscarNivelEducacional(6)!,
    new Date(2000, 0, 5),
    'La Florida');

  testUser2 = Usuario.getNewUsuario(
    'jperez', 
    'jperez@duocuc.cl', 
    '5678', 
    '¿Cuál es tu postre favorito?',
    'panqueques',
    'Juan', 
    'Pérez',
    NivelEducacional.buscarNivelEducacional(5)!,
    new Date(2000, 1, 10),
    'La Pintana');

  testUser3 = Usuario.getNewUsuario(
    'cmujica', 
    'cmujica@duocuc.cl', 
    '0987', 
    '¿Cuál es tu vehículo favorito?',
    'moto',
    'Carla', 
    'Mujica', 
    NivelEducacional.buscarNivelEducacional(6)!,
    new Date(2000, 2, 20),
    'Providencia');

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
      CREATE TABLE IF NOT EXISTS USUARIO (
        cuenta TEXT PRIMARY KEY NOT NULL,
        correo TEXT NOT NULL,
        password TEXT NOT NULL,
        preguntaSecreta TEXT NOT NULL,
        respuestaSecreta TEXT NOT NULL,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        nivelEducacional INTEGER NOT NULL,
        fechaNacimiento INTEGER NOT NULL,
        direccion TEXT NOT NULL
      );
      `]
    }
  ];

  sqlInsertUpdate = `
    INSERT OR REPLACE INTO USUARIO (
        cuenta,
        correo,
        password,
        preguntaSecreta,
        respuestaSecreta,
        nombre,
        apellido,
        nivelEducacional,
        fechaNacimiento,
        direccion
    ) VALUES (?,?,?,?,?,?,?,?,?,?);
  `;

  nombreBD = 'basedatos';
  db!: SQLiteDBConnection;
  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  

  constructor(private sqliteService: SQLiteService) { }


  async inicializarBaseDeDatos(){
    try {
      await this.sqliteService.crearBaseDeDatos({database: this.nombreBD, upgrade: this.userUpgrades});
      this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);
      await this.crearUsuarioDePrueba();
      await this.leerUsuarios();
    } catch (error) {
      showAlertError('DataBaseService.initializeDataBase', error);
    }
  }

  async crearUsuarioDePrueba() {
    try {
      // Verifica y guarda al usuario 'atorres' si no existe
      const user1 = await this.leerUsuario(this.testUser1.nombre);
      if (!user1) {
        await this.guardarUsuario(this.testUser1);
      }
  
      // Verifica y guarda al usuario 'jperez' si no existe
      const user2 = await this.leerUsuario(this.testUser2.nombre);
      if (!user2) {
        await this.guardarUsuario(this.testUser2);
      }
  
      // Verifica y guarda al usuario 'cmujica' si no existe
      const user3 = await this.leerUsuario(this.testUser3.nombre);
      if (!user3) {
        await this.guardarUsuario(this.testUser3);
      }
  
    } catch (error) {
      showAlertError('DataBaseService.createTestUsers', error);
    }
  }

 

  async guardarUsuario(usuario: Usuario): Promise<void> {
    try {
      this.sqlInsertUpdate = `
        INSERT OR REPLACE INTO USUARIO (
          cuenta,
          correo,
          password,
          preguntaSecreta,
          respuestaSecreta,
          nombre,
          apellido,
          nivelEducacional,
          fechaNacimiento,
          direccion
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
      await this.db.run(this.sqlInsertUpdate, [
          usuario.cuenta, 
          usuario.correo, 
          usuario.password,
          usuario.preguntaSecreta, 
          usuario.respuestaSecreta, 
          usuario.nombre, 
          usuario.apellido,
          usuario.nivelEducacional.id, 
          convertDateToString(usuario.fechaNacimiento), 
          usuario.direccion
      ]);
      await this.leerUsuarios();
    } catch (error) {
      showAlertError('DataBaseService.saveUser', error);
    }
  }

  async leerUsuarios(): Promise<Usuario[]> {
    try {
      const q = 'SELECT * FROM USUARIO;';
      const rows = (await this.db.query(q)).values;
      let usuarios: Usuario[] = [];
      if (rows) {
        usuarios = rows.map((row: any) => this.rowToUser(row));
      }
      this.listaUsuarios.next(usuarios);
      return usuarios;
    } catch (error) {
      showAlertError('DataBaseService.leerUsuarios', error);
      return [];
    }
  }

  async leerUsuario(cuenta: string): Promise<Usuario | undefined> {
    try {
      const q = 'SELECT * FROM USUARIO WHERE cuenta=?;';
      const rows = (await this.db.query(q, [cuenta])).values;
      return rows?.length? this.rowToUser(rows[0]) : undefined;
    } catch (error) {
      showAlertError('DataBaseService.readUser', error);
      return undefined;
    }
  }

  async eliminarUsuarioUsandoCuenta(cuenta: string): Promise<boolean> {
    try {
      const q = 'DELETE FROM USUARIOS WHERE cuenta=?';
      const result: capSQLiteChanges = await this.db.run(q, [cuenta]);
      const rowsAffected = result.changes?.changes ?? 0;
      await this.leerUsuarios();
      return rowsAffected > 0;
    } catch (error) {
      showAlertError('DataBaseService.deleteByUserName', error);
      return false;
    }
  }

  async buscarUsuarioValido(cuenta: string, password: string): Promise<Usuario | undefined> {
    try {
      const q = 'SELECT * FROM USUARIO WHERE cuenta=? AND password=?;';
      const rows = (await this.db.query(q, [cuenta, password])).values;
      return rows?.length? this.rowToUser(rows[0]) : undefined;
    } catch (error) {
      showAlertError('DataBaseService.findUser', error);
      return undefined;
    }
  }

  async buscarUsuarioPorCuenta(cuenta: string): Promise<Usuario | undefined> {
    try {
      const q = 'SELECT * FROM USUARIO WHERE cuenta=?;';
      const rows = (await this.db.query(q, [cuenta])).values;
      return rows? this.rowToUser(rows[0]) : undefined;
    } catch (error) {
      showAlertError('DataBaseService.findUserByEmail', error);
      return undefined;
    }
  }

  async buscarUsuarioPorCorreo(correo: string): Promise<Usuario | undefined> {
      const rows = (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;',[correo])).values;
      if (!rows){
        return undefined;
      }
      if (rows.length === 0) {
        return undefined
      }

      const usuarios: Usuario[] = [];
      if (rows!.length > 0){
        rows?.forEach(row=>{
          const usuario = this.rowToUser(row);
          usuarios.push(usuario);
        });
      } 
  
      return usuarios[0];
  }
  
  // async buscarUsuarioPorRespuestaSecretaBD(respuestaSecreta: string): Promise<string | undefined> {
  //   const usuarios: Usuario[] = (await this.db.query(
  //     'SELECT * FROM USUARIO WHERE respuestaSecreta=?;', 
  //     [respuestaSecreta])).values as Usuario[];
  
  //   // Si el usuario existe, devuelve la respuesta secreta
  //   return usuarios.length > 0 ? usuarios[0].respuestaSecreta : undefined;
  // }

  // obtenerPreguntaSecreta(correo: string): string | undefined {
  //   const usuario = this.buscarUsuarioPorCorreo(correo);
  //   return usuario ? usuario.preguntaSecreta : undefined; // Si el usuario no se encuentra, retorna undefined
  // }

  private rowToUser(row: any): Usuario {
    try {
      const usuario = new Usuario();
      usuario.cuenta = row.cuenta;
      usuario.correo = row.correo;
      usuario.password = row.password;
      usuario.preguntaSecreta = row.preguntaSecreta;
      usuario.respuestaSecreta = row.respuestaSecreta;
      usuario.nombre = row.nombre;
      usuario.apellido = row.apellido;
      usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(row.nivelEducacional) || new NivelEducacional();
      usuario.fechaNacimiento = convertStringToDate(row.fechaNacimiento);
      usuario.direccion = row.direccion;
      return usuario;
    } catch (error) {
      showAlertError('DataBaseService.rowToUser', error);
      return new Usuario();
    }
  }

}
