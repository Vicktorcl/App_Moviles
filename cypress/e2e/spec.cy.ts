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
      cy.intercept('/ingresar').as('route').then(() => {
        cy.contains('Asistencia DUOC');
      });
    });
  })

  it('Verificar inicio de sesión con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
      cy.get('#saludo').contains('¡Bienvenido(a)!');
      cy.contains('Cerrar sesión').click();
      });
    });
  })

  // it('Verificar publicación en foro', () => {
  //   cy.visit('http://localhost:8100/ingreso').then(() => {
  //     cy.contains('Asistencia DUOC');
  //     cy.get('#correo').invoke('val', '');
  //     cy.get('#correo').type('atorres@duocuc.cl');
  //     cy.get('#password').invoke('val', '');
  //     cy.get('#password').type('1234');
  //     cy.contains('Iniciar sesión').click();
  //     cy.intercept('/inicio').as('route').then(() => {
  //       cy.get('#saludo').contains('¡Bienvenido(a) Ana Torres!');
  //       cy.get('[ng-reflect-value="foro"]').click();
  //       cy.get('#titulo').type(`Título de prueba ${numero}`);
  //       cy.get('#contenido').type(`Contenido de prueba ${numero}`);
  //       cy.contains('Guardar').click();
  //       cy.wait(3000);
  //       cy.contains('Aceptar').click();
  //       cy.wait(3000);
  //       cy.contains(`Título de prueba ${numero}`).should('exist');
  //       cy.contains('Cerrar sesión').click();
  //     });
  //   });
  // })

  //   it(`Verificar eliminación en foro de la última publicación con el título que contiene ${numero}`, () => {
  //   cy.visit('http://localhost:8100/ingreso').then(() => {
  //     cy.contains('Asistencia DUOC');
  //     cy.get('#correo').invoke('val', '');
  //     cy.get('#correo').type('atorres@duocuc.cl');
  //     cy.get('#password').invoke('val', '');
  //     cy.get('#password').type('1234');
  //     cy.contains('Iniciar sesión').click();
  //     cy.intercept('/inicio').as('route').then(() => {
  //       cy.get('#saludo').contains('¡Bienvenido(a) Ana Torres!');
  //       cy.get('[ng-reflect-value="foro"]').click();
  //       cy.contains('Eliminar').click();
  //       cy.wait(3000);
  //       cy.contains('Aceptar').click();
  //       cy.wait(3000);
  //       cy.contains(`Título de prueba ${numero}`).should('not.exist');
  //       cy.contains('Cerrar sesión').click();
  //     });
  //   });
  // })
});
