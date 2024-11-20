"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[475],{475:(v,p,s)=>{s.r(p),s.d(p,{IngresoPage:()=>_});var h=s(467),n=s(3953),m=s(177),a=s(4742),g=s(9417),c=s(4842);let f=(()=>{var i;class d{constructor(e){this.translate=e,this.changeCurrentLanguage=new n.bkB,this.languageSelected="es",this.translate.use("es")}setCurrentLanguage(){this.languageSelected=this.translate.currentLang}changeLanguage(e){this.translate.use(e),this.changeCurrentLanguage.emit(e)}}return(i=d).\u0275fac=function(e){return new(e||i)(n.rXU(c.c$))},i.\u0275cmp=n.VBU({type:i,selectors:[["app-language"]],outputs:{changeCurrentLanguage:"changeCurrentLanguage"},standalone:!0,features:[n.aNF],decls:12,vars:14,consts:[[1,"transparent-bg"],["slot","end",1,"color-black",3,"ngModelChange","label","ngModel"],["value","en"],["value","es"],["value","arn"]],template:function(e,t){1&e&&(n.j41(0,"div",0)(1,"ion-select",1),n.nI1(2,"translate"),n.mxI("ngModelChange",function(r){return n.DH7(t.languageSelected,r)||(t.languageSelected=r),r}),n.bIt("ngModelChange",function(r){return t.changeLanguage(r)}),n.j41(3,"ion-select-option",2),n.EFF(4),n.nI1(5,"translate"),n.k0s(),n.j41(6,"ion-select-option",3),n.EFF(7),n.nI1(8,"translate"),n.k0s(),n.j41(9,"ion-select-option",4),n.EFF(10),n.nI1(11,"translate"),n.k0s()()()),2&e&&(n.R7$(),n.Mz_("label","",n.bMT(2,6,"Language"),":"),n.R50("ngModel",t.languageSelected),n.R7$(3),n.SpI(" ",n.bMT(5,8,"Language.English")," "),n.R7$(3),n.SpI(" ",n.bMT(8,10,"Language.Spanish")," "),n.R7$(3),n.SpI(" ",n.bMT(11,12,"Language.Mapudungun")," "))},dependencies:[m.MD,g.YN,g.BC,g.vS,a.bv,a.Nm,a.Ip,a.Je,c.h,c.D9],styles:[".custom-toolbar[_ngcontent-%COMP%]{--background: #ffb800;--color: black}"]}),d})();var b=s(3314),C=s(4796);const M=["titulo"],I=["selectLanguage"];let _=(()=>{var i;class d{constructor(e,t,o,r,l){this.router=e,this.translate=t,this.authService=o,this.animationController=r,this.toastController=l,this.correo="",this.password=""}ngOnInit(){this.correo="atorres",this.password="1234"}ngAfterViewInit(){this.itemTitulo&&this.animationController.create().addElement(this.itemTitulo.nativeElement).iterations(1/0).fromTo("transform","translateX(0%)","translateX(100%)").fromTo("opacity",.2,1).play()}ionViewWillEnter(){var e=this;return(0,h.A)(function*(){e.selectLanguage.setCurrentLanguage()})()}navigateTheme(){this.router.navigate(["/theme"])}ingresar(){this.authService.login(this.correo,this.password)}toRuta(){this.router.navigate(["/map"])}ingresarValidarCorreo(){this.router.navigate(["/correo"])}mostrarMensaje(e,t){var o=this;return(0,h.A)(function*(){(yield o.toastController.create({message:e,duration:t||2e3})).present()})()}}return(i=d).\u0275fac=function(e){return new(e||i)(n.rXU(b.Ix),n.rXU(c.c$),n.rXU(C.u),n.rXU(a.Hx),n.rXU(a.K_))},i.\u0275cmp=n.VBU({type:i,selectors:[["app-ingreso"]],viewQuery:function(e,t){if(1&e&&(n.GBs(M,5,n.aKT),n.GBs(I,5)),2&e){let o;n.mGM(o=n.lsd())&&(t.itemTitulo=o.first),n.mGM(o=n.lsd())&&(t.selectLanguage=o.first)}},standalone:!0,features:[n.aNF],decls:53,vars:27,consts:[["selectLanguage",""],[1,"custom-toolbar"],["slot","start",1,"ion-margin"],[1,"show-in-landscape"],[1,"ion-text-center"],["slot","end",1,"ion-margin"],["shape","round","size","small",1,"custom-toolbar",3,"click"],[1,"background-image",3,"fullscreen"],["alt","DUOC","src","assets/images/Logoduoc.png"],[1,"center-container"],[1,"ion-text-center","ion-padding"],["placeholder","Correo",3,"ngModelChange","ngModel","placeholder"],["placeholder","Contrase\xf1a","type","password",3,"ngModelChange","ngModel","placeholder"],["size","12",1,"ion-text-center"],["expand","block",3,"click"],["fill","clear",3,"click"]],template:function(e,t){if(1&e){const o=n.RV6();n.j41(0,"ion-header")(1,"ion-toolbar",1)(2,"div",2),n.nrm(3,"app-language",null,0),n.k0s(),n.j41(5,"div",3)(6,"h1",4),n.EFF(7),n.nI1(8,"translate"),n.k0s()(),n.j41(9,"div",5)(10,"ion-button",6),n.bIt("click",function(){return n.eBV(o),n.Njj(t.navigateTheme())}),n.EFF(11," Tema "),n.k0s()()()(),n.j41(12,"ion-content",7),n.nrm(13,"br")(14,"br")(15,"br")(16,"br")(17,"img",8),n.j41(18,"div",9)(19,"ion-card",10)(20,"ion-card-header")(21,"ion-toolbar")(22,"h2"),n.EFF(23),n.nI1(24,"translate"),n.k0s()()(),n.j41(25,"ion-card-content")(26,"ion-item")(27,"ion-input",11),n.nI1(28,"translate"),n.mxI("ngModelChange",function(l){return n.eBV(o),n.DH7(t.correo,l)||(t.correo=l),n.Njj(l)}),n.k0s()(),n.j41(29,"ion-item")(30,"ion-input",12),n.nI1(31,"translate"),n.mxI("ngModelChange",function(l){return n.eBV(o),n.DH7(t.password,l)||(t.password=l),n.Njj(l)}),n.k0s()(),n.j41(32,"ion-grid")(33,"ion-row")(34,"ion-col",13)(35,"ion-button",14),n.bIt("click",function(){return n.eBV(o),n.Njj(t.ingresar())}),n.EFF(36),n.nI1(37,"translate"),n.k0s()()(),n.j41(38,"ion-row")(39,"ion-col",13)(40,"ion-button",15),n.bIt("click",function(){return n.eBV(o),n.Njj(t.toRuta())}),n.EFF(41,"Ruta DUOC"),n.k0s()()(),n.j41(42,"ion-row")(43,"ion-col",13)(44,"ion-button",15),n.bIt("click",function(){return n.eBV(o),n.Njj(t.ingresarValidarCorreo())}),n.EFF(45),n.nI1(46,"translate"),n.k0s()()()()()()()(),n.j41(47,"ion-footer")(48,"ion-toolbar",1)(49,"h5"),n.EFF(50),n.nI1(51,"translate"),n.nI1(52,"translate"),n.k0s()()()}2&e&&(n.R7$(7),n.SpI(" ",n.bMT(8,11,"AppName")," "),n.R7$(5),n.Y8G("fullscreen",!0),n.R7$(11),n.JRh(n.bMT(24,13,"Login.Title.Login")),n.R7$(4),n.FS9("placeholder",n.bMT(28,15,"Login.Placeholder.Email")),n.R50("ngModel",t.correo),n.R7$(3),n.FS9("placeholder",n.bMT(31,17,"Login.Placeholder.Password")),n.R50("ngModel",t.password),n.R7$(6),n.JRh(n.bMT(37,19,"Login.Button.Login")),n.R7$(9),n.JRh(n.bMT(46,21,"Login.Button.ForgotPassword")),n.R7$(5),n.Lme(" ",n.bMT(51,23,"AuthorText")," ",n.bMT(52,25,"Author")," "))},dependencies:[m.MD,a.bv,a.Jm,a.b_,a.I9,a.ME,a.hU,a.W9,a.M0,a.lO,a.eU,a.$w,a.uz,a.ln,a.ai,a.Gw,c.h,c.D9,g.YN,g.BC,g.vS,f],styles:["ion-content[_ngcontent-%COMP%]{--padding-top: 20px;--padding-bottom: 20px;--padding-end: 20px;--padding-start: 20px;--background: none;height:100%;width:100%}ion-item[_ngcontent-%COMP%]{--padding-bottom: 10px}body[_ngcontent-%COMP%]{overflow-y:hidden;overflow-x:hidden}.center-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:90vh}.foto-portada[_ngcontent-%COMP%]{width:100%}@media screen and (orientation: landscape){.center-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:80%;width:80%;text-align:center;margin:auto}.foto-portada[_ngcontent-%COMP%]{width:30%}}.centrar[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.background-image[_ngcontent-%COMP%]{background:url(/assets/images/pao.png) no-repeat center center fixed;background-size:cover;height:100vh;width:100%}.custom-toolbar[_ngcontent-%COMP%]{--background: #ffb800;--color: black}.login-container[_ngcontent-%COMP%]{border:2px solid gray;position:absolute;top:50%;left:50%;--background: transparent;transform:translate(-50%) translateY(-70%)}@media screen and (orientation: portrait){.login-container[_ngcontent-%COMP%]{width:300px}}@media screen and (orientation: landscape){.login-container[_ngcontent-%COMP%]{width:480px;padding-top:20px;padding-bottom:10px}.float-left-landscape[_ngcontent-%COMP%]{float:left}.float-right-landscape[_ngcontent-%COMP%]{float:right}}.transparent-input[_ngcontent-%COMP%]{opacity:90%!important}"]}),d})()}}]);