angular.module('starter.controllers', [])

  //////////////////////////////////////////////////////////////////////////////////////////
  .controller('AppCtrl', function($scope, $http) {
    $scope.data = {};

  })

//  ///////////////////////////////CONTROLLERS DE LOGIN//////////////////////////////////////////////////
  // //////////////////////////////// codigo para el logout  :::window.localStorage.removeItem("username");//////////////////////////////////
  .controller('PlaylistCtrl', ['$scope', '$stateParams','$http','$state',
    function($scope, $stateParams, $http, $state) {
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
              var idUser1 = $scope.response[1].idusuario;
              //  window.storage guarda el id del usuario para pasarlo entre controladores
              window.localStorage.setItem("idUser", idUser1);
              window.localStorage.setItem("idAlumno", idAlumno);
              console.log("idAlumno: "+ idAlumno+"idUser1: "+ idUser1);

              //si el parametro de tipoUsuario = '2' se redirecciona al profesor
            }else if($scope.response[1].tipoUsuario == '2'){
              $state.go('app.inicio') ;
              var idProfesor = $scope.response[1].idProfesor;
              var idUser = $scope.response[1].idusuario;
              window.localStorage.setItem("idUser", idUser);
              window.localStorage.setItem("idProfesor", idProfesor);
              console.log("idProfesor: "+ idProfesor+"idUser: "+ idUser);
            }
          }else if(length1<2){// si se recibe más de dos objetos manda un error
            alert('Error: el usuario no existe. Intentelo de nuevo');
          }
        });
      }
    }])


  .controller('registroCtrl', ['$scope', '$stateParams','$http',
    function ($scope, $stateParams, $http) {
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
  .controller('ajusteModificarContrasenaCtrl', ['$scope', '$stateParams','$http',
    function ($scope, $stateParams, $http) {
      // función para modificar contraseña del usuario un usuario,
      $scope.modificar = function(){
        if($scope.data.passNueva == $scope.data.passRepetir){
          var link = 'https://www.serviciosocial.xyz/api/usuario.php?url=modificarcontrasena';
          var idUsuario=window.localStorage.getItem("idUser");
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

  .controller('consultaGruposCtrl', ['$scope', '$stateParams','$http',
    function ($scope, $stateParams, $http) {
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

  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL INICIO DEL ALUMNO Y DEL PROFESOR////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('inicioCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

// la función siguiente es para probar si es el controlador correcto de cada vista
      $scope.data = {};
      $scope.comienzaClase = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.data.posicion= (position.coords.latitude + " -- " + position.coords.longitude);
        });

      };

    }])

  .controller('inicioACtrl', ['$scope', '$stateParams','$state',
    function ($scope, $stateParams, $state) {
// la función comentada es para probar si es el controlador correcto de cada vista
      $scope.data = {};
      $scope.prueba = function() {
        alert('inicioACtrl');
      };
    }])



  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL MENU DEL PROFESOR////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////



  .controller('buscaGrupoProfesorCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])



  .controller('listaDeAlumnosCtrl', ['$scope', '$state','$http',
    function ($scope, $state, $http) {
      // consulta todos los alumnos de un grupo
      $scope.lista = function(){
          var grupo = document.getElementById('cmb_grupo').value;
          console.log(grupo);
        // funcion para la consulta al servidor
        // datos que se reciben: alumno, claveGrupo, idGrupo, nombreM
          var link1 = ' https://www.serviciosocial.xyz/api/grupo.php?url=buscaralumnosdegrupo';
          $http.post(link1,{claveGrupo : grupo}).then(function (res){
            //$scope.listaA tiene la información que envía el servidor
            $scope.listaA = res.data;
            console.log($scope.listaA);

          });
      }
    }])
  .controller('cDigosDeGruposCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {

      var link = ' https://www.serviciosocial.xyz/api/grupo.php?url=buscarconprofesor';
      var idUsuario=window.localStorage.getItem("idProfesor");
      //funcion que consulta todos los grupos de un profesor
      // los datos que se reciben son: claveGrupo, idGrupo, nombreM
       $http.post(link,{idProfesor : idUsuario}).then(function (res){
       //$scope.response tiene la información que envía el servidor
       $scope.response = res.data;

       var length =$scope.response.length;
       //alert($scope.response[1].tipoUsuario);
       console.log($scope.response);

       });

    }])

  .controller('comentarioProfVerCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {
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

  .controller('horarioCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('nuevaActividadCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('acercaDeNosotrosCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('ajustesCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
      $scope.data = {};
      $scope.prueba = function() {

        //alert('es la funcion correcta AjustesCtrl');

      };
    }])

  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DE LOS AJUSTES DEL PROFESOR////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('ajusteHorarioCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('ajusteCalificacionCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('ajusteHorarioHoraCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])


  .controller('ajusteHorarioHoraCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
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
      var idUsuario=window.localStorage.getItem("idUser");
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
      $scope.prueba1 = function() {
        /*var link = ' https://www.serviciosocial.xyz/api/grupo.php?url=buscar';
         $http.post(link, {claveGrupo : cmb_grupo}).then(function (res){
         //$scope.response tiene la información que envía el servidor
         $scope.response1 = res.data;
         console.log($scope.response1);
         });*/
      };




    }])

  .controller('ajusteHorarioHoraFinalCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])


  //  ///////////////////////////////AQUI VAN LOS CONTROLLERS DE LAS ACTIVIDADES DEL PROFESOR //////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////

  .controller('memoramaProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('equipoProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('codigoProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
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

  .controller('comentarioProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('testProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('nuevoTestProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('participacionProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])



  //  ///////////////////////////////CONTROLLERS DE LOS ALUMNOS//////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('menuAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])


  .controller('listaMateriasAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('horarioAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('agregarMateriaAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('actividadAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('ajusteAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  //  ///////////////////////////////CONTROLLERS DE LAS ACTIVIDADES DE LOS ALUMNOS//////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('memoramaAlumnoCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])


  .controller('ComentariosAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('codigoAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('equipoAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('participacionAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('testAlumCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

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

