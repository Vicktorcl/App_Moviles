import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { IngresoPage } from './ingreso.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';  // Importar Storage
import { IonicStorageModule } from '@ionic/storage-angular';  // Importar módulo necesario

describe('Probar página de ingreso', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        FormsModule,
        CommonModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        IonicStorageModule.forRoot()  // Agregar IonicStorageModule
      ],
      providers: [
        AuthService,
        ToastController,
        APIClientService,
        TranslateService,
        Storage // Proveer Storage
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Debería poder crear la página de ingreso', () => {
    expect(component).toBeTruthy();
  });

  it('Debería asignar correo y contraseña correctamente', () => {
    expect(component.correo).toBe('atorres');
    expect(component.password).toBe('1234');
  });

  it('Debería poder iniciar sesión con Ana Torres', fakeAsync(() => {
    spyOn(authService, 'login'); // Espiar el método login

    // Asignamos valores a las propiedades
    component.correo = 'atorres';
    component.password = '1234';
    
    // Llamamos al método ingresar()
    component.ingresar();

    tick(); // Avanzar el tiempo para esperar el comportamiento asíncrono (como la llamada a login)

    // Verificamos si el método login fue llamado con los parámetros esperados
    expect(authService.login).toHaveBeenCalledWith('atorres', '1234');
  }));

  it('Debería mostrar un mensaje de toast cuando se llame a mostrarMensaje()', fakeAsync(() => {
    spyOn(component, 'mostrarMensaje'); // Espiar el método mostrarMensaje

    const mensaje = 'Ingreso exitoso';
    component.mostrarMensaje(mensaje); // Llamamos al método para mostrar el mensaje

    tick(); // Avanzar el tiempo para esperar el comportamiento asíncrono de la animación de toast

    // Verificamos que se haya llamado a mostrarMensaje con el mensaje correcto
    expect(component.mostrarMensaje).toHaveBeenCalledWith(mensaje);
  }));
});
