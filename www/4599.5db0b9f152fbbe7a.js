"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4599],{4599:(v,g,a)=>{a.r(g),a.d(g,{PreguntaPage:()=>M});var p=a(467),t=a(3953),m=a(177),u=a(9417),o=a(2441),d=a(4842),P=a(3314),_=a(4742);const f=["titulo"];let M=(()=>{var s;class h{constructor(n,e,r){this.router=n,this.toastController=e,this.animationController=r,this.respuesta="";const i=this.router.getCurrentNavigation();i&&i.extras.state&&i.extras.state.usuario?this.usuario=i.extras.state.usuario:this.router.navigate(["/ingreso"])}ngAfterViewInit(){this.itemTitulo&&this.animationController.create().addElement(this.itemTitulo.nativeElement).iterations(1/0).duration(6e3).fromTo("transform","translateY(0%)","translateX(100%)").fromTo("opacity",.5,1).play()}cargarPreguntaSecreta(){return this.usuario?this.usuario.preguntaSecreta:(this.mostrarToast("No se encontr\xf3 al usuario.","danger"),"Pregunta no disponible")}mostrarToast(n,e){var r=this;return(0,p.A)(function*(){(yield r.toastController.create({message:n,duration:2e3,color:e,position:"top"})).present()})()}validarRespuestaSecreta(){this.usuario?this.router.navigate(this.usuario.respuestaSecreta===this.respuesta?["/correcto"]:["/incorrecto"],{state:{usuario:this.usuario}}):alert("No se ha encontrado el usuario.")}volverAlInicio(){this.router.navigate(["/ingreso"])}}return(s=h).\u0275fac=function(n){return new(n||s)(t.rXU(P.Ix),t.rXU(_.K_),t.rXU(_.Hx))},s.\u0275cmp=t.VBU({type:s,selectors:[["app-pregunta"]],viewQuery:function(n,e){if(1&n&&t.GBs(f,5,t.aKT),2&n){let r;t.mGM(r=t.lsd())&&(e.itemTitulo=r.first)}},standalone:!0,features:[t.aNF],decls:31,vars:14,consts:[["titulo",""],[1,"custom-toolbar"],[1,"ion-text-left","ion-text","font-size-18"],["alt","DUOC","src","/assets/images/Logoduoc.png",1,"foto-portada"],[1,"ion-text-center"],["alt","Silhouette of mountains","src","/assets/images/duda.webp"],["type","text","type","password","placeholder","Escribe tu respuesta",1,"ion-text-center",3,"ngModelChange","ngModel"],[3,"click"]],template:function(n,e){if(1&n){const r=t.RV6();t.j41(0,"ion-header")(1,"ion-toolbar",1)(2,"ion-title",2,0)(4,"div"),t.EFF(5," Sistema de Asistencia DUOC "),t.k0s()()()(),t.j41(6,"ion-content"),t.nrm(7,"img",3)(8,"br")(9,"br"),t.j41(10,"ion-title",4),t.EFF(11),t.nI1(12,"translate"),t.k0s(),t.j41(13,"ion-card")(14,"div",4),t.nrm(15,"img",5),t.k0s(),t.j41(16,"ion-card-header")(17,"ion-card-title",4),t.EFF(18),t.k0s(),t.nrm(19,"br"),t.j41(20,"ion-input",6),t.mxI("ngModelChange",function(c){return t.eBV(r),t.DH7(e.respuesta,c)||(e.respuesta=c),t.Njj(c)}),t.EFF(21),t.nI1(22,"translate"),t.k0s()(),t.j41(23,"ion-card-content")(24,"div",4)(25,"ion-button",7),t.bIt("click",function(){return t.eBV(r),t.Njj(e.validarRespuestaSecreta())}),t.EFF(26),t.nI1(27,"translate"),t.k0s(),t.j41(28,"ion-button",7),t.bIt("click",function(){return t.eBV(r),t.Njj(e.volverAlInicio())}),t.EFF(29),t.nI1(30,"translate"),t.k0s()()()()()}2&n&&(t.R7$(11),t.JRh(t.bMT(12,6,"PasswordRecovery.Title")),t.R7$(7),t.JRh(null==e.usuario?null:e.usuario.preguntaSecreta),t.R7$(2),t.R50("ngModel",e.respuesta),t.R7$(),t.JRh(t.bMT(22,8,"PasswordRecovery.Step2")),t.R7$(5),t.JRh(t.bMT(27,10,"answerRecovery.RecoverButton")),t.R7$(3),t.JRh(t.bMT(30,12,"PasswordRecovery.GoBack")))},dependencies:[o.$w,o.Jm,o.I9,o.tN,d.h,d.D9,o.ME,o.b_,o.W9,o.eU,o.BC,o.ai,m.MD,u.YN,u.BC,u.vS],styles:["ion-content[_ngcontent-%COMP%]{--padding-top: 20px;--padding-bottom: 20px;--padding-end: 20px;--padding-start: 20px;--background: none;height:100%;width:100%}ion-item[_ngcontent-%COMP%]{--padding-bottom: 10px}body[_ngcontent-%COMP%]{overflow-y:hidden;overflow-x:hidden}.center-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:90vh}.foto-portada[_ngcontent-%COMP%]{width:100%}@media screen and (orientation: landscape){.center-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:80%;width:80%;text-align:center;margin:auto}.foto-portada[_ngcontent-%COMP%]{width:30%}}.centrar[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.background-image[_ngcontent-%COMP%]{background:url(/src/assets/images/pao.jpg) no-repeat center center fixed;background-size:cover;height:100vh;width:100%}.custom-toolbar[_ngcontent-%COMP%]{--background: #ffb800;--color: black}"]}),h})()}}]);