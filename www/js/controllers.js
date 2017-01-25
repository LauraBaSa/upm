angular.module('starter.controllers', [])

  //////////////////////////////////////////////////////////////////////////////////////////
  .controller('AppCtrl', function($scope, $http) {
    $scope.data = {};
  })

//  ///////////////////////////////CONTROLLERS DE LOGIN//////////////////////////////////////////////////
  // //////////////////////////////// codigo para el logout  :::window.localStorage.removeItem("username");//////////////////////////////////
  .controller('PlaylistCtrl', ['$scope', '$stateParams','$http','$state',function($scope, $stateParams, $http, $state) {
      $scope.submit = function(){
        var link = ' https://www.serviciosocial.xyz/api/usuario.php?url=login';
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
              //  window.storage guarda el id del usuario para pasarlo entre controladores
              window.localStorage.setItem("idUsuario", idUsuario);
              window.localStorage.setItem("idAlumno", idAlumno);
              console.log("idAlumno: "+ idAlumno+"idUsuario: "+ idUsuario);

              //si el parametro de tipoUsuario = '2' se redirecciona al profesor
            }else if($scope.response[1].tipoUsuario == '2'){
              $state.go('app.inicio') ;
              var idProfesor = $scope.response[1].idProfesor;
              var idUsuario = $scope.response[1].idusuario;
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


  .controller('registroCtrl', ['$scope', '$stateParams','$http',function ($scope, $stateParams, $http) {
      // función para insertar un usuario,
      $scope.registrar = function(){
        var link = ' https://www.serviciosocial.xyz/api/usuario.php?url=insertar';
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
  .controller('ajusteModificarContrasenaCtrl', ['$scope', '$stateParams','$http',function ($scope, $stateParams, $http) {
      // función para modificar contraseña del usuario un usuario,
      $scope.modificar = function(){
        if($scope.data.passNueva == $scope.data.passRepetir){
          var link = 'https://www.serviciosocial.xyz/api/usuario.php?url=modificarcontrasena';
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

  .controller('consultaGruposCtrl', ['$scope', '$stateParams','$http',function ($scope, $stateParams, $http) {
      // funcion para la consulta al servidor
      // consulta todos los grupos que tenía un profesor
      var link = ' https://www.serviciosocial.xyz/api/grupo.php?url=buscarconprofesor';
      var idUsuario=window.localStorage.getItem("idProfesor");
      $http.post(link,{idProfesor : idUsuario}).then(function (res){
        //$scope.optionGrupo tiene la información que envía el servidor
        $scope.optionGrupo = res.data;
        console.log($scope.optionGrupo);
      });

    }])

.controller('consultaHoraCtrl', ['$scope', '$stateParams','$http',function ($scope, $stateParams, $http) {
  //obtener los datos de el archivo de json
  $http.get('js/data.json')
  //añadir una funcion cuando la funcion termine (ajax)los parámetros que llegan son los datos que se han cargado
    .success(function(data){
      //$scope. ayuda a enviar cualquier dato a la plantilla
      $scope.Lista=data.Horario;
      console.log($scope.Lista);
    });
}])

  .controller('consultaMateriaCtrl', ['$scope', '$stateParams','$http',function ($scope, $stateParams, $http) {
    // controlador exclusivo para consultar todas las materias
    var link = ' https://www.serviciosocial.xyz/api/materia.php?url=buscar';
    $http.post(link).then(function (res){
      //$scope.response tiene la información que envía el servidor
      $scope.response1 = res.data;
      console.log($scope.response1);
    });
  }])

  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL INICIO DEL ALUMNO Y DEL PROFESOR////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('inicioCtrl', ['$scope', '$state','$http',function ($scope, $state, $http) {

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
          var link = ' https://www.serviciosocial.xyz/api/asistencia.php?url=iniciarclase';
          $http.post(link, {longitud : long, latitud :lat, tolerancia: tolerancia, claveGrupo : grupo}).then(function (res){
            //$scope.response tiene la información que envía el servidor
            $scope.response = res.data;
            console.log($scope.response);

          });
          console.log(long + "+" + lat + "+" + grupo + "+"+ tolerancia);
        });
      };
    }])

  .controller('buscarSiguienteClaseAlumnoCtrl', ['$scope', '$state','$http',function ($scope, $state, $http) {
    // se obtiene el id de Usuario
    var idAlumno=window.localStorage.getItem("idAlumno");
    //Los datos que se vana recibir del servidor son:
    //
    //Funcion para recibir los datos del servidor
      var link = ' https://www.serviciosocial.xyz/api/asistencia.php?url=buscarclasesabiertas';
      $http.post(link, {idAlumno : idAlumno}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response1 = res.data;
        console.log($scope.response1);
      });
  }])

  .controller('inicioACtrl', ['$scope', '$state','$http',function ($scope, $state, $http) {
          // se obtiene el id de Usuario
    var idAlumno=window.localStorage.getItem("idAlumno");
    //Los datos que se vana recibir del servidor son:
    //
    //Funcion para recibir los datos del servidor
    $scope.buscarClase=function(){
      var link = ' https://www.serviciosocial.xyz/api/asistencia.php?url=buscarclasesabiertas';
      $http.post(link, {idAlumno : idAlumno}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response1 = res.data;
        console.log($scope.response1);
      });
    };
    $scope.paseLista = function() {
      var link = ' https://www.serviciosocial.xyz/api/asistencia.php?url=buscarclasesabiertas';
      $http.post(link, {idAlumno : idAlumno}).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response = res.data;
        if($scope.response[0].responseCode == 1){
          //Los datos que se van a recibir del servidor son:
          //
          //Funcion para recibir los datos del servidor
          var idGrupo = $scope.response[1].idGrupo;
          var link = ' https://www.serviciosocial.xyz/api/asistencia.php?url=asistir';
          $http.post(link, {idAlumno : idAlumno, idGrupo: idGrupo }).then(function (res){
            //$scope.response tiene la información que envía el servidor
            $scope.response2 = res.data;
            if($scope.response2[0].responseCode == 1){
              alert("Registrado correctamente");
            }else if($scope.response2[0].responseCode ==0){
              alert("error, verifique que no se ha terminado el tiempo de pase de lista");
            }
          });
        }else if($scope.response[0].responseCode == 0){
          alert("error, se ha terminado el tiempo de pase de lista");
        }
      });
    };
  }])



  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL MENU DEL PROFESOR////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////

  .controller('buscaGrupoProfesorCtrl', ['$scope', '$state','$http',function ($scope, $state, $http) {

    }])

  .controller('listaDeAlumnosCtrl', ['$scope', '$state','$http',function ($scope, $state, $http) {
      // consulta todos los alumnos de un grupo
      $scope.lista = function(){
          var grupo = document.getElementById('cmb_grupo').value;
          console.log(grupo);
        // funcion para la consulta al servidor
        // datos que se reciben: alumno, claveGrupo, idGrupo, nombreM
          var link = ' https://www.serviciosocial.xyz/api/grupo.php?url=buscaralumnosdegrupo';
          $http.post(link,{claveGrupo : grupo}).then(function (res){
            //$scope.listaA tiene la información que envía el servidor
            $scope.listaA = res.data;
            console.log($scope.listaA);
          });
      }
    }])

  .controller('cDigosDeGruposCtrl', ['$scope', '$stateParams', '$http',function ($scope, $stateParams, $http) {
      var link = ' https://www.serviciosocial.xyz/api/grupo.php?url=buscarconprofesor';
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

  .controller('comentarioProfVerCtrl', ['$scope', '$stateParams', '$http',function ($scope, $stateParams, $http) {
      //función para consultar los foros, datos obtenidos: ClaveGrupo, fechaInicio, fechaTermino, idForo, requerimiento
      $scope.lista = function(){
        var grupo = document.getElementById('cmb_grupo1').value;
        console.log(grupo);
        var link1 = ' https://www.serviciosocial.xyz/api/foro.php?url=buscarforoporgrupo';
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

  .controller('horarioCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])

  .controller('nuevaActividadCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])

  .controller('acercaDeNosotrosCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {


    }])

  .controller('ajustesCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
    }])

  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DE LOS AJUSTES DEL PROFESOR////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('ajusteHorarioCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    $scope.prueba = function() {
      var grupo = document.getElementById('cmb_grupo').value;
      var horaInicio = document.getElementById('cmb_horaInicio').value;
      var horaFin = document.getElementById('cmb_horaTermino').value;
      var materia = document.getElementById('cmb_materia').value;
      alert( materia + grupo + horaInicio + horaFin );
    };
  }])

  .controller('ajusteCalificacionCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
    $scope.prueba = function() {
      var grupo = document.getElementById('cmb_grupo').value;
      var actividad = document.getElementById('cmb_actividad').value;
      var rubros = document.getElementById('cmb_rubros').value;
      var nuevaPuntuacion= $scope.data.txt_nuevaPuntuacion;
      alert(grupo + actividad + rubros + nuevaPuntuacion);

    };
  }])

  .controller('ajusteHorarioHoraCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

  }])


  .controller('ajusteHorarioHoraCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

  }])

  .controller('ajusteNuevoHorarioCtrl', ['$scope', '$stateParams', '$http', '$state',
    function ($scope, $stateParams, $http, $state) {
      // la función siguiente es para probar si es el controlador correcto de cada vista
      $scope.data = {};
      // console.log(datos.mensaje);
      var link = ' https://www.serviciosocial.xyz/api/materia.php?url=buscar';
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
        var link = ' https://www.serviciosocial.xyz/api/grupo.php?url=insertar';
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

  .controller('ajusteHorarioHoraFinalCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])

  //  ///////////////////////////////AQUI VAN LOS CONTROLLERS DE LAS ACTIVIDADES DEL PROFESOR //////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////

  .controller('memoramaProfCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
    var grupo = document.getElementById('cmb_grupo').value;
  }])

  .controller('equipoProfCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
    var grupo = document.getElementById('cmb_grupo').value;
  }])

  .controller('codigoProfCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
      $scope.consutaGrupo = function(){
        var link = ' https://www.serviciosocial.xyz/api/usuario.php?url=insertar';

        $http.post(link, {correo : $scope.data.correo, contrasena :$scope.data.contrasena, nombre : $scope.data.nombre,
          apellidoP : $scope.data.apellidoP, apellidoM : $scope.data.apellidoM}).then(function (res){
          //$scope.response tiene la información que envía el servidor
          $scope.response = res.data;
          console.log($scope.response);
        });
      }
    }])

  .controller('comentarioProfCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
    var grupo = document.getElementById('cmb_grupo').value;
    }])

  .controller('testProfCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
    var grupo = document.getElementById('cmb_grupo').value;
    }])
  .controller('nuevoTestProfCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])

  .controller('participacionProfCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {
      var grupo = document.getElementById('cmb_grupo').value;
    }])



  //  ///////////////////////////////CONTROLLERS DE LOS ALUMNOS//////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('menuAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])


  .controller('listaMateriasAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('horarioAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('agregarMateriaAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('actividadAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('ajusteAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  //  ///////////////////////////////CONTROLLERS DE LAS ACTIVIDADES DE LOS ALUMNOS//////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('memoramaAlumnoCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])

  .controller('ComentariosAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('codigoAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('equipoAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('participacionAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

    }])
  .controller('testAlumCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams, $http) {

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
