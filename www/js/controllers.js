angular.module('starter.controllers', [])

  //////////////////////////////////////////////////////////////////////////////////////////
  .controller('AppCtrl', function($scope, $http) {
    $scope.data = {};
  })
  // constante que contiene el inicio de la url, cambiar por nueva url, que tenga de su dominio
  .constant('urlApp','https://www.serviciosocial.xyz/api/')
//  ///////////////////////////////CONTROLLERS DE LOGIN//////////////////////////////////////////////////
  // //////////////////////////////// codigo para el logout  :::window.localStorage.removeItem("username");//////////////////////////////////
  // funcion de login en la aplicación
  .controller('PlaylistCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
      $scope.submit = function(){
        //link está concatenado con la url de la app
        // la ruta que se pone aqui es nombreArchivo.php?url=NombreDeLaFuncionDePHP
        var link = urlApp+'usuario.php?url=login';
        // funcion para la consulta al servidor
        $http.post(link, {correo : $scope.data.username, contrasena :$scope.data.password}).then(function (res){
          //$scope.response tiene la información que envía el servidor
          $scope.response = res.data;
          var length1 =$scope.response.length;
          console.log($scope.data.password);
          //alert($scope.response[1].tipoUsuario);
          //si la longitud del objeto que se recibe guardada en la variable "lenght" es 1
          // quiere decir que el usuario no está en la base de datos
          // en este caso se enviará un mensaje de error
          if(length1==1){
            alert('Error: el usuario no existe. Intentelo de nuevo');
          }else if(length1==2){// si la longitud del objeto recibido es igual a 2, entonces el usuario si existe
            // si el parametro de tipoUsuario = '1' se redirecciona al inicio del alumno
            if( $scope.response[1].tipoUsuario == '1' ){
              $state.go('app.inicioA') ;
              var idAlumno = $scope.response[1].idalumno;
              var idUsuario = $scope.response[1].idusuario;
              //  window.storage guarda el idUsuario y idAlumno para pasarlo entre controladores
              window.localStorage.setItem("idUsuario", idUsuario);
              window.localStorage.setItem("idAlumno", idAlumno);
              console.log("idAlumno: "+ idAlumno+"idUsuario: "+ idUsuario);

              //si el parametro de tipoUsuario = '2' se redirecciona al profesor
            }else if($scope.response[1].tipoUsuario == '2'){
              $state.go('app.inicio') ;
              var idProfesor = $scope.response[1].idProfesor;
              var idUsuario = $scope.response[1].idusuario;
              //  window.storage guarda el idUsuario y idAlumno para pasarlo entre controladores
              window.localStorage.setItem("idUsuario", idUsuario);
              window.localStorage.setItem("idProfesor", idProfesor);
              console.log("idProfesor: "+ idProfesor+"idUsuario: "+ idUsuario);
            }
          }else if(length1<2){// si se recibe más de dos objetos manda un error
            alert('Error: el usuario no existe. Intentelo de nuevo');
          }
        });
      }
    }])


  .controller('registroCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // función para insertar un usuario
      $scope.registrar = function(){
        var link = urlApp+'usuario.php?url=insertar';
        // funcion para la consulta al servidor
        //envío: correo, contrasena, nombre,apellidoP, apellidoM
        $http.post(link, {correo : $scope.data.correo, contrasena :$scope.data.contrasena, nombre : $scope.data.nombre,
          apellidoP : $scope.data.apellidoP, apellidoM : $scope.data.apellidoM}).then(function (res){
          //$scope.response tiene la información que envía el servidor
            $scope.response = res.data;
          console.log($scope.response);

        });
      }
    }])

  //  ///////////////////////////////CONTROLLERS QUE USAN TANTO ALUMNO COMO PROFESOR//////////////////////////////////////////////////
  // //////////////////////////////// ///////////////////////////

  .controller('ajusteModificarContrasenaCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // función para modificar contraseña un usuario
      $scope.modificar = function(){
        if($scope.data.passNueva == $scope.data.passRepetir){
          // en la funcion envío el idUsusario y contraseña
          // recibo
          var link = urlApp+'usuario.php?url=modificarcontrasena';
          var idUsuario=window.localStorage.getItem("idUsuario");
          // funcion para la consulta al servidor, envío idUsuario y nuevaContraseña
          $http.post(link, {idusuario : idUsuario, contrasena :$scope.data.passNueva}).then(function (res){
            //$scope.response tiene la información que envía el servidor
            $scope.response = res.data;
            console.log($scope.response);
            console.log(idUsuario+$scope.data.passNueva);
          });
        }else{
          alert("las contraseñas no son iguales");
        }
      }
    }])

  .controller('consultaGruposCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // funcion para la consulta al servidor
      // consulta todos los grupos que tenía un profesor
      var link = urlApp+'grupo.php?url=buscarconprofesor';
      var idUsuario=window.localStorage.getItem("idProfesor");
      $http.post(link,{idProfesor : idUsuario}).then(function (res){
        //$scope.optionGrupo tiene la información que envía el servidor
        $scope.optionGrupo = res.data;
        console.log($scope.optionGrupo);
      });

    }])

.controller('consultaHoraCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
  //obtener los datos de el archivo de json
  $http.get('js/data.json')
  //añadir una funcion cuando la funcion termine (ajax)los parámetros que llegan son los datos que se han cargado
    .success(function(data){
      //$scope. ayuda a enviar cualquier dato a la plantilla
      $scope.Lista=data.Horario;
      console.log($scope.Lista);
    });
}])

  .controller('consultaMateriaCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // controlador exclusivo para consultar todas las materias
    var link = urlApp+'materia.php?url=buscar';
    $http.post(link).then(function (res){
      //$scope.response tiene la información que envía el servidor
      $scope.response1 = res.data;
      console.log($scope.response1);
    });
  }])

  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL INICIO DEL ALUMNO Y DEL PROFESOR////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('inicioCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

// la función siguiente es para probar si es el controlador correcto de cada vista
      $scope.data = {};
      // función para dar comienzo a una clase
      $scope.comienzaClase = function() {
        // Función para obtener la posición
        navigator.geolocation.getCurrentPosition(function(position) {
          // se guardan las coordenadas de longitud y latitud
          var long = position.coords.longitude;
          var lat = position.coords.latitude;
          // obtener el grupo de cmb_grupo
          var grupo = document.getElementById('cmb_grupo').value;
          // obtener la tolerancia de cmb_tolerancia
          var tolerancia = document.getElementById('cmb_tolerancia').value;
          // obtener el id del usuario
          var idProfesor=window.localStorage.getItem("idProfesor");
          var link = urlApp+'asistencia.php?url=iniciarclase';
          $http.post(link, {longitud : long, latitud :lat, tolerancia: tolerancia, claveGrupo : grupo}).then(function (res){
            //$scope.response tiene la información que envía el servidor
            $scope.response = res.data;
            console.log($scope.response);

          });
          console.log(long + "+" + lat + "+" + grupo + "+"+ tolerancia);
        });
      };
    }])

  .controller('buscarSiguienteClaseAlumnoCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // se obtiene el id de Usuario
    var idAlumno=window.localStorage.getItem("idAlumno");
    //Los datos que se vana recibir del servidor son:
    //
    //Funcion para recibir los datos del servidor
      var link = urlApp+'asistencia.php?url=buscarclasesabiertas';
      $http.post(link, {idAlumno : idAlumno}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response1 = res.data;
        console.log($scope.response1);
      });
  }])

  .controller('inicioACtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // se obtiene el id de Usuario
    var idAlumno=window.localStorage.getItem("idAlumno");
    //Los datos que se vana recibir del servidor son:
    //
    //Funcion para recibir los datos del servidor
    $scope.buscarClase=function(){
      var link = urlApp+'asistencia.php?url=buscarclasesabiertas';
      $http.post(link, {idAlumno : idAlumno}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response1 = res.data;
        console.log($scope.response1);
      });
    };
    $scope.paseLista = function() {
      var link = urlApp+'asistencia.php?url=buscarclasesabiertas';
      $http.post(link, {idAlumno : idAlumno}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response = res.data;
        console.log($scope.response);
        /*if($scope.response[0].responseCode == 1){*/
          //Los datos que se van a recibir del servidor son:
          //
          //Funcion para recibir los datos del servidor
          var idGrupo = $scope.response[1].idGrupo;
          var link = urlApp+'asistencia.php?url=asistir';
          $http.post(link, {idAlumno : idAlumno, idGrupo: idGrupo }).then(function (res){
            //$scope.response tiene la información que envía el servidor
            $scope.response2 = res.data;
            if($scope.response2[0].responseCode == 1){
              alert("Registrado correctamente");
              console.log($scope.response2);
            }else if($scope.response2[0].responseCode ==0){
              alert("error, verifique que no se ha terminado el tiempo de pase de lista");
            }
          });
        /*}else if($scope.response[0].responseCode == 0){
          alert("error, se ha terminado el tiempo de pase de lista");
        }*/
      });
    };
  }])



  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL MENU DEL PROFESOR////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////

  .controller('buscaGrupoProfesorCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  .controller('listaDeAlumnosCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // consulta todos los alumnos de un grupo
      $scope.lista = function(){
          var grupo = document.getElementById('cmb_grupo').value;
          console.log(grupo);
        // funcion para la consulta al servidor
        // datos que se reciben: alumno, claveGrupo, idGrupo, nombreM
          var link = urlApp+'grupo.php?url=buscaralumnosdegrupo';
          $http.post(link,{claveGrupo : grupo}).then(function (res){
            //$scope.listaA tiene la información que envía el servidor
            $scope.listaA = res.data;
            console.log($scope.listaA);
          });
      }
    }])

  .controller('cDigosDeGruposCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    var link = urlApp+'grupo.php?url=buscarconprofesor';
      //obtener el id de usuario
      var idUsuario=window.localStorage.getItem("idProfesor");
      //funcion que consulta todos los grupos de un profesor
      // los datos que se reciben son: claveGrupo, idGrupo, nombreM
       $http.post(link,{idProfesor : idUsuario}).then(function (res){
       //$scope.response tiene la información que envía el servidor
       $scope.response = res.data;
       var length =$scope.response.length;
       console.log($scope.response);
       });
    }])

  .controller('comentarioProfVerCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    //función para consultar los foros, datos obtenidos: ClaveGrupo, fechaInicio, fechaTermino, idForo, requerimiento
      $scope.lista = function(){
        var grupo = document.getElementById('cmb_grupo1').value;
        console.log(grupo);
        var link1 = urlApp+'foro.php?url=buscarforoporgrupo';
        $http.post(link1,{claveGrupo : grupo}).then(function (res){
          $scope.listaF = res.data;
          var size = $scope.listaF.length;
          if(size>1){
            //$scope.listaForo tiene la información que envía el servidor
            $scope.listaForo = res.data;
            console.log($scope.listaForo);
          }else if(size==1){
            alert("no hay foros en éste grupo");
          }
        });
      }
      $scope.ConsultaForo = function(){
        alert("consulta foro de comentarioProfVer")
      }
  }])

  .controller('horarioCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  .controller('nuevaActividadCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  .controller('acercaDeNosotrosCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {


  }])

  .controller('ajustesCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DE LOS AJUSTES DEL PROFESOR////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('ajusteHorarioCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

    $scope.prueba = function() {
      var grupo = document.getElementById('cmb_grupo').value;
      var horaInicio = document.getElementById('cmb_horaInicio').value;
      var horaFin = document.getElementById('cmb_horaTermino').value;
      var materia = document.getElementById('cmb_materia').value;
      alert( materia + grupo + horaInicio + horaFin );
    };
  }])

  .controller('ajusteCalificacionCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    $scope.prueba = function() {
      var grupo = document.getElementById('cmb_grupo').value;
      var actividad = document.getElementById('cmb_actividad').value;
      var rubros = document.getElementById('cmb_rubros').value;
      var nuevaPuntuacion= $scope.data.txt_nuevaPuntuacion;
      alert(grupo + actividad + rubros + nuevaPuntuacion);

    };
  }])

  .controller('ajusteHorarioHoraCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])


  .controller('ajusteHorarioHoraCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  .controller('ajusteNuevoHorarioCtrl',  ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    // la función siguiente es para probar si es el controlador correcto de cada vista
      $scope.data = {};
      // console.log(datos.mensaje);
      var link = urlApp+'materia.php?url=buscar';
      $http.post(link).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response1 = res.data;
        console.log($scope.response1);
      });
      // las siguientes variables es el dato que se obtiene de los combobox
      var cicloEscolar = document.getElementById('cmb_cicloEscolar').value;
      var idUsuario=window.localStorage.getItem("idUsuario");
      // funcion para registrar una nueva clase
      console.log($scope.data.grupo);
      $scope.registra = function(){
        // se asigna una URL en dónde está la función que se usará, url=NombreDeLaFuncion
        var link = urlApp+'grupo.php?url=insertar';
        var materia = document.getElementById('cmb_materia').value;
        var grupo = $scope.data.grupos;
        console.log(grupo);
        $http.post(link, {claveGrupo : grupo, idProfesor : idUsuario , ciclo : cicloEscolar, materia : materia}).then(function (res){
          //$scope.response tiene la información que envía el servidor
          $scope.response = res.data;
          console.log($scope.response);
        });
      }
    }])

  .controller('ajusteHorarioHoraFinalCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  //  ///////////////////////////////AQUI VAN LOS CONTROLLERS DE LAS ACTIVIDADES DEL PROFESOR //////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////

  .controller('memoramaProfCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    var grupo = document.getElementById('cmb_grupo').value;
  }])

  .controller('equipoProfCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    var grupo = document.getElementById('cmb_grupo').value;
  }])

  .controller('codigoProfCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    $scope.consutaCodigo = function(){
      var link = urlApp+'usuario.php?url=insertar';

      $http.post(link, {correo : $scope.data.correo, contrasena :$scope.data.contrasena, nombre : $scope.data.nombre,
        apellidoP : $scope.data.apellidoP, apellidoM : $scope.data.apellidoM}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response = res.data;
        console.log($scope.response);
      });
    }
    alert("codigoProf");
    }])

  .controller('comentarioProfCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    $scope.data = {};
    $scope.iniciarActividad = function(){
      var grupo = document.getElementById('cmb_grupo').value;
      var hora = document.getElementById('cmb_horaTermino').value;
      var tema=$scope.data.tema;
      var fecha = $scope.data.fecha +" "+ hora+":00";
      var link = urlApp+'foro.php?url=crearforo';
      $http.post(link, {requerimiento : tema, fecha : fecha, claveGrupo : grupo}).then(function (res){
       //$scope.response tiene la información que envía el servidor
       $scope.response = res.data;
       console.log($scope.response);
       console.log(tema + " "+fecha+" "+ grupo);
       });
    }
    }])

  .controller('testProfCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    var grupo = document.getElementById('cmb_grupo').value;
    }])
  .controller('nuevoTestProfCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  .controller('participacionProfCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {
    var grupo = document.getElementById('cmb_grupo').value;
    //esta función busca aleatoriamente a un alumno de una clase
    $scope.buscar = function(){
      var link = urlApp+'asistencia.php?url=participacion';
      $http.post(link, {grupo : grupo}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.nombreAlumno = res.data;
        //el responseCode es el código que se envía para saber los errores de la base de datos siendo:
        // 0 = no hay datos para la consulta
        // 1 o más  = el numero de filas que envia la base de datos
        // -1 = hay un error en la base de datos
        validar = $scope.nombreAlumno[0].responseCode;
        if(validar >= 1){
          console.log($scope.nombreAlumno);
        }else if(validar == 0){
          console.log("número de alumnos"+$scope.nombreAlumno[0].responseCode);
          console.log($scope.nombreAlumno);
          alert("no hay alumnos en ese grupo");
        }else if (validar == -1){
          console.log($scope.nombreAlumno[0].responseCode);
        }
      });
    }

    $scope.participar = function(){
      var link = urlApp+'api/usuario.php?url=login';

      /*$http.post(link, {grupo : grupo}).then(function (res){
       //$scope.response tiene la información que envía el servidor
       $scope.participacion = res.data;

       });*/
      alert("participacionProfCtrl11");
    }
    $scope.listaAsistencia = function(){
      var link = urlApp+'usuario.php?url=login';

      /*$http.post(link, {grupo : grupo}).then(function (res){
       //$scope.response tiene la información que envía el servidor
       $scope.listaAsis = res.data;

       });*/
      alert("participacionProfCtr funcion listaAsistencia");
    }

  }])



  //  ///////////////////////////////CONTROLLERS DE LOS ALUMNOS//////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('menuAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])


  .controller('listaMateriasAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('horarioAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('agregarMateriaAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('actividadAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('ajusteAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  //  ///////////////////////////////CONTROLLERS DE LAS ACTIVIDADES DE LOS ALUMNOS//////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('memoramaAlumnoCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

  .controller('ComentariosAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('codigoAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('equipoAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('participacionAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])
  .controller('testAlumCtrl', ['$scope', '$stateParams','$http','$state','urlApp',function($scope, $stateParams, $http, $state,urlApp) {

  }])

/*$scope.submit = function(){
  var link = ' https://www.serviciosocial.xyz/api/usuario.php?url=login';

  $http.post(link, {correo : $scope.data.username, contrasena :$scope.data.password}).then(function (res){
    //$scope.response tiene la información que envía el servidor
    $scope.response = res.data;
    var length =$scope.response.length;
    //alert($scope.response[1].tipoUsuario);
    //console.log($scope.response)

  });
}*/

// la función comentada es para sprobar si es el controlador correcto de cada vista
/*$scope.data = {};
 $scope.prueba = function() {

 alert('es la funcion correcta');

 };*/

// var grupo = document.getElementById('cmb_grupo').value;
