describe('Verificar mi aplicación', () => {
  const numero = Math.floor(Math.random() * 1000000) + 1;

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    cy.visit('/').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('12345');
      cy.contains('Ingresar').click();
      cy.intercept('/ingresar')
        .as('route')
        .then(() => {
          cy.contains('Asistencia DUOC');
        });
    });
  });

  it('Verificar inicio de sesión con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio')
        .as('route')
        .then(() => {
          cy.get('#saludo').contains('¡Bienvenido(a)!');
          cy.contains('Cerrar sesión').click();
        });
    });
  });

  it('Verificar publicación en foro', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
          cy.get('#saludo').contains('¡Bienvenido(a)!');
          cy.get('[ng-reflect-value="foro"]').click();
          cy.get('#titulo').type(`Título de prueba ${numero}`);
          cy.get('#contenido').type(`Contenido de prueba ${numero}`);
          cy.contains('Guardar').click();
          cy.wait(3000);
          cy.contains(`Título de prueba ${numero}`).should('exist');
          cy.contains('Cerrar sesión').click();
        });
    });
  });

  it(`Verificar eliminación en foro de la última publicación con el título que contiene ${numero}`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido(a)!');
        cy.get('[ng-reflect-value="foro"]').click();
        cy.contains('Eliminar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero}`).should('not.exist');
        cy.contains('Cerrar sesión').click();
      });
    });
  });

  it('Verificar datos en mis datos', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido(a)!');
        cy.get('[ng-reflect-value="misdatos"]').click();
        cy.contains('Limpiar').click();
  
        // Llenar cada campo con sus valores correspondientes
        cy.get('#Cuenta input').type('Vic2225', { force: true });
        cy.contains('Guardar').click();
        cy.wait(1000)
        cy.get('#Correo input').type('a@a.cl', { force: true });
        cy.contains('Guardar').click();
        cy.wait(1000)
        cy.get('#Nombre input').type('a', { force: true });
        cy.contains('Guardar').click();
        cy.wait(1000)
        cy.get('#Apellido input').type('a', { force: true });
        cy.contains('Guardar').click();
        cy.wait(1000)
        cy.get('#Direccion input').type('a', { force: true });
        cy.contains('Guardar').click();
        cy.wait(1000)

      cy.get('#Educacion').click();


    cy.get('ion-alert') 
      .should('be.visible'); // Verifica que el overlay esté completamente visible
    cy.wait(1000)
    cy.get('ion-alert button')
      .contains('Media Completa') // Usa el texto visible exacto de la opción
      .click();
      cy.contains('OK').click({ force: true });
      
      cy.contains('Guardar').click({ force: true });
      cy.wait(1000)
  
        cy.get('#FechaNacimiento input')
        .scrollIntoView()  // Asegura que el input esté visible
        .clear()  // Limpia cualquier valor anterior
        .type('11/11/1999', { force: true });  // Ingresa la fecha manualmente
      cy.contains('Guardar').click(); 
      cy.wait(1000)
  
        cy.get('#PreguntaSecreta input').type('Cual es tú animal favorito', { force: true });
        cy.contains('Guardar').click();
        cy.wait(1000)
  
        cy.get('#RespuestaSecreta input').type('Gato', { force: true });
        cy.contains('Guardar').click();
        cy.wait(1000)
        cy.get('#Contraseña input').type('5678', { force: true });
        cy.contains('Guardar').click();
  
        cy.get('#RepetirContraseña input').type('5678', { force: true });
        cy.wait(3000)
        cy.contains('Guardar').click();
        cy.wait(3000)
        cy.contains('Cerrar sesión').click();
        
        cy.contains('Asistencia DUOC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('Vic2225');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('5678');
      cy.contains('Ingresar').click();
      cy.get('[ng-reflect-value="misdatos"]').click();
      });
    });
  });

  
});