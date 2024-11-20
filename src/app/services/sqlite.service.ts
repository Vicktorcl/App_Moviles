import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { 
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
  CapacitorSQLitePlugin,
  capSQLiteUpgradeOptions
} from '@capacitor-community/sqlite';
import { showAlertError } from '../tools/message-functions';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  sqliteConnection!: SQLiteConnection;
  isService: boolean = false;
  platform!: string;
  sqlitePlugin!: CapacitorSQLitePlugin;
  native: boolean = false;
  
  constructor() { }

  async inicializarPlugin(): Promise<boolean> {
    try {
      this.platform = Capacitor.getPlatform();
      this.native = this.platform === 'ios' || this.platform === 'android';
      this.sqlitePlugin = CapacitorSQLite;
      this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
      this.isService = true;
      return true;
    } catch (error) {
      const errorMessage = showAlertError('SQLiteService.initializePlugin', error);
      return Promise.reject(errorMessage);
    }
  }

  async inicializarAlmacenamientoWeb(): Promise<void> {
    try {
      await this.sqliteConnection.initWebStore();
    } catch (error) {
      const errorMessage = showAlertError('SQLiteService.initializeWebStore', error);
      return Promise.reject(errorMessage);
    }
  }

  async abrirBaseDeDatos(dbName: string, encrypted: boolean, mode: string, version: number
    , readonly: boolean): Promise<SQLiteDBConnection>  
    {
      try {
        const isConsistent = (await this.sqliteConnection.checkConnectionsConsistency()).result;
        const isConnected = (await this.sqliteConnection.isConnection(dbName, readonly)).result;
      
        const db = isConsistent && isConnected
          ? await this.sqliteConnection.retrieveConnection(dbName, readonly)
          : await this.sqliteConnection.createConnection(dbName, encrypted, mode, version, readonly);
      
        await db.open();
        return db;
      } catch (error) {
        return Promise.reject(await showAlertError('SQLiteService.open', error));
      }
    }

  async recuperarConexion(dbName: string, readonly: boolean): Promise<SQLiteDBConnection> {try {
    return await this.sqliteConnection.retrieveConnection(dbName, readonly);
  } catch (error) {
    return Promise.reject(await showAlertError('SQLiteService.retrieveConnection', error));
  }
  }

  async cerrarConexion(database:string, readonly: boolean): Promise<void> {
    try {
      await this.sqliteConnection.closeConnection(database, readonly);
    } catch (error) {
      const errorMessage = showAlertError('SQLiteService.closeConnection', error);
      return Promise.reject(errorMessage);
    }
  }

  async crearBaseDeDatos(options: capSQLiteUpgradeOptions): Promise<void> {
    try {
      await this.sqlitePlugin.addUpgradeStatement(options);
    } catch (error) {
      const errorMessage = showAlertError('SQLiteService.createDataBase', error);
      return Promise.reject(errorMessage);
    }
  }

  async guardarNombreBaseDeDatos(dbName: string) : Promise<void> {
    try {
      await this.sqliteConnection.saveToStore(dbName);
    } catch (error) {
      const errorMessage = showAlertError('SQLiteService.saveDataBaseNameToStore', error);
      return Promise.reject(errorMessage);
    }
  }

  async eliminarBaseDeDatos(dbName: string) {
    try {
      await this.sqlitePlugin.deleteDatabase({ database: dbName });
    } catch (error) {
      const errorMessage = showAlertError('SQLiteService.deleteDataBase', error);
      return Promise.reject(errorMessage);
    }
  }
}
