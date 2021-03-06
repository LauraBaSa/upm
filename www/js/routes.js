/**
 * Created by analaura on 13/12/2016.
 */
 angular.module('starter.routes', [])

   .config(function($stateProvider, $urlRouterProvider) {
     $stateProvider

       //////////////////////////////PAGINA DE LOGIN//////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////

       //
       .state('app', {
         url: "/app",
         abstract: true,
         templateUrl: "templates/menu.html",
         controller: 'AppCtrl'
       })

       .state('app.playlists', {
         url: "/playlists",
         views: {
           'appContent' :{
             templateUrl: "templates/login.html",
             controller:'PlaylistCtrl'
           },
           'menuList': {
             templateUrl : "templates/menu.html"
           }

         }
       })

       //////////////////////////////PÁGINAS DE INICIO//////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////
       // sólo se comenta esta función ya que en las siguientes funciones es la misma estructura.
       // ruta para la página de inicio del profesor
       //url: indica la url que aparecerá en el navegador, pero omo será una app móvil, no se verá, pero en fase de programación
       //es muy util ya que las pruebas son en navegador web

       .state('app.inicio', {
         url: "/inicioProf",
         //views es la interfaz que se abrirá al ejecutar esta función
         views: {
           'appContent' :{
             //templatesUrl: es la ruta que se abrirá, hay que tener en cuenta que el archivo .html debe estar dentro de la carpeta templates
             templateUrl: "templates/inicio.html",
             //es el controlador que se ejecuta por defecto en esta vista, el controlador y su programacion está dentro de www/js/controllers.js
             controller:'inicioCtrl'
           },
           //aqui se encuentra el menú que se mostrará
           'menuList': {
             //dependiendo de la vista es el menú que se abrirá
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.inicioA', {
         url: "/inicioAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/inicioA.html",
             controller:'inicioACtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       //////////////////////////////MENU DEL PROFESOR//////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////

       .state('app.ListaAlumno', {
         url: "/listaAlumnos",
         views: {
           'appContent' :{
             templateUrl: "templates/listaDeAlumnos.html",
             controller: 'listaDeAlumnosCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })
       .state('app.cDigosDeGrupos', {
         url: "/codigosGrupos",
         views: {
           'appContent' :{
             templateUrl: "templates/cDigosDeGrupos.html",
             controller:'cDigosDeGruposCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.comentarioProfVer', {
         url: "/comentarioProfVer",
         views: {
           'appContent' :{
             templateUrl: "templates/comentarioProfVer.html",
             controller:'comentarioProfVerCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.horario', {
         url: "/horario",
         views: {
           'appContent' :{
             templateUrl: "templates/horario.html",
             controller: 'horarioCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.nuevaActividad', {
         url: "/nuevaActividad",
         views: {
           'appContent' :{
             templateUrl: "templates/nuevaActividad.html",
             controller:'nuevaActividadCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.ajustes', {
         url: "/ajustesProf",
         views: {
           'appContent' :{
             templateUrl: "templates/ajustes.html",
             controller: 'ajustesCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.acercaDeNosotros', {
         url: "/acercaDeNosotros",
         views: {
           'appContent' :{
             templateUrl: "templates/acercaDeNosotros.html",
             controller:'acercaDeNosotrosCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })
       //////////////////////////////ACTIVIDADES DEL PROFESOR//////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////

       .state('app.participacionProf', {
         url: "/participacionProf",
         views: {
           'appContent' :{
             templateUrl: "templates/participacionProf.html",
             controller:'participacionProfCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })
       .state('app.memoramaProf', {
         url: "/memoramaProf",
         views: {
           'appContent' :{
             templateUrl: "templates/memoramaProf.html",
             controller:'memoramaProfCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.equipoProf', {
         url: "/equipoProf",
         views: {
           'appContent' :{
             templateUrl: "templates/equipoProf.html",
             controller:'equipoProfCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.codigoProf', {
         url: "/codigoProf",
         views: {
           'appContent' :{
             templateUrl: "templates/codigoProf.html",
             controller:'codigoProfCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.comentarioProf', {
         url: "/comentarioProf",
         views: {
           'appContent' :{
             templateUrl: "templates/comentarioProf.html",
             controller:'comentarioProfCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.testProf', {
         url: "/testProf",
         views: {
           'appContent' :{
             templateUrl: "templates/testProf.html",
             controller:'testProfCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.nuevoTestProf', {
         url: "/nuevoTestProf",
         views: {
           'appContent' :{
             templateUrl: "templates/nuevoTestProf.html",
             controller:'nuevoTestProfCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       //////////////////////////////AJUSTES DEL PROFESOR//////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////

       .state('app.ajusteHorario', {
         url: "/ajusteHorario",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteHorario.html",
             controller: 'ajusteHorarioCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.ajusteCalificacion', {
         url: "/ajusteCalificacion",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteCalificacion.html",
             controller:'ajusteCalificacionCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })
       .state('app.ajusteHorarioHora', {
         url: "/ajusteHorarioHora",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteHorarioHora.html",
             controller:'ajusteHorarioHoraCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.ajusteNuevoHorario', {
         url: "/ajusteNuevoHorario",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteNuevoHorario.html",
             controller:'ajusteNuevoHorarioCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.ajusteHorarioHoraFinal', {
         url: "/ajusteHorarioHoraFinal",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteHorarioHoraFinal.html"
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })

       .state('app.ajusteModificarContrasena', {
         url: "/ajusteModificarContrasena",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteModificarContrasena.html",
             controller: "ajusteModificarContrasenaCtrl"
           },
           'menuList': {
             templateUrl : "templates/menuProf.html"
           }
         }
       })
       //////////////////////////////MENU DEL ALUMNO//////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////

       .state('app.listaMateriasAlum', {
         url: "/listaMateriasAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/listaMateriasAlum.html",
             controller:'listaMateriasAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.ComentariosAlum', {
         url: "/ComentariosAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/ComentariosAlum.html",
             controller:'ComentariosAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.horarioAlum', {
         url: "/horarioAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/horarioAlum.html",
             controller:'horarioAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.actividadAlum', {
         url: "/actividadAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/actividadAlum.html",
             controller:'actividadAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       //////////////////////////////ACTIVIDADES DEL ALUMNO//////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////
       .state('app.memoramaAlumno', {
         url: "/memoramaAlumno",
         views: {
           'appContent' :{
             templateUrl: "templates/memoramaAlumno.html",
             controller:'memoramaAlumnoCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.codigoAlum', {
         url: "/codigoAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/codigoAlum.html",
             controller:'codigoAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.equipoAlum', {
         url: "/equipoAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/equipoAlum.html",
             controller:'equipoAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.participacionAlum', {
         url: "/participacionAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/participacionAlum.html",
             controller:'participacionAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.testAlum', {
         url: "/testAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/testAlum.html",
             controller:'testAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       //////////////////////////////AJUSTES DEL ALUMNO //////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////

       .state('app.ajusteAlum', {
         url: "/ajusteAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteAlum.html",
             controller:'ajusteAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       .state('app.agregarMateriaAlum', {
         url: "/agregarMateriaAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/agregarMateriaAlum.html",
             controller:'agregarMateriaAlumCtrl'
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })
       .state('app.ajusteModificarContrasenaAlum', {
         url: "/ajusteModificarContrasenaAlum",
         views: {
           'appContent' :{
             templateUrl: "templates/ajusteModificarContrasenaAlum.html",
             controller: "ajusteModificarContrasenaCtrl"
           },
           'menuList': {
             templateUrl : "templates/menuAlum.html"
           }
         }
       })

       //////////////////////////////MENU DE LOGIN //////////////////////////////////
       //////////////////////////////////////////////////////////////////////////////////////

       .state('app.registro', {
         url: "/registro",
         views: {
           'appContent' :{
             templateUrl: "templates/registro.html",
             controller:'registroCtrl'
           }
         }
       })




     // if none of the above states are matched, use this as the fallback
     $urlRouterProvider.otherwise('/app/playlists')
   });


