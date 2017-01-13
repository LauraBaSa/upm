angular.module('starter.controllers', [])

  //////////////////////////////Factory para enviar el ID del alumno y del profesor///////////////////////////

/*  .factory('MisDatos', function($http){

        return {
          idAlumno: function(idAlum){
            return idAlum;
          }
        }
  })*/



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

        $http.post(link, {correo : $scope.data.username, contrasena :$scope.data.password}).then(function (res){
          //$scope.response tiene la información que envía el servidor
          $scope.response = res.data;
          var length1 =$scope.response.length;
console.log($scope.response);
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
              var idUser1 = $scope.response[1].idalumno;
              window.localStorage.setItem("idUser", idUser1);
              console.log(idUser1);
              //si el parametro de tipoUsuario = '2' se redirecciona al profesor
            }else if($scope.response[1].tipoUsuario == '2'){
              $state.go('app.inicio') ;
              var idUser = $scope.response[1].idProfesor;
              window.localStorage.setItem("idUser", idUser);
              console.log(idUser);
            }
          }else if(length1<2){// si se recibe más de dos objetos manda un error
            alert('Error: el usuario no existe. Intentelo de nuevo');
          }
        });
      }
    }])


  .controller('registroCtrl', ['$scope', '$stateParams','$http',
    function ($scope, $stateParams, $http) {

      $scope.registrar = function(){
        var link = ' https://www.serviciosocial.xyz/api/usuario.php?url=insertar';

        $http.post(link, {correo : $scope.data.correo, contrasena :$scope.data.contrasena, nombre : $scope.data.nombre,
          apellidoP : $scope.data.apellidoP, apellidoM : $scope.data.apellidoM}).then(function (res){
          //$scope.response tiene la información que envía el servidor
            $scope.response = res.data;
          console.log($scope.response);

        });

      }




    }])
  //    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL INICIO DEL ALUMNO Y DEL PROFESOR////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('inicioCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

// la función siguiente es para probar si es el controlador correcto de cada vista
      $scope.data = {};
      $scope.prueba = function() {
        alert('es la funcion inicio Profesor');
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


  .controller('listaDeAlumnosCtrl', ['$scope', '$state','$http',
    function ($scope, $state, $http) {
    //obtener los datos de el archivo de json
      $http.get('js/data.json')
        //añadir una funcion cuando la funcion termine (ajax)los parámetros que llegan son los datos que se han cargado
        .success(function(data){
          //$scope. ayuda a enviar cualquier dato a la plantilla
          $scope.ListaGrupos=data.ListaGrupos;
          $scope.ListaAlumnos=data.ListaAlumnos;
          //console.debug(data.ListaGrupos);
          $scope.Lista = data.Lista;

          $scope.mostrar = function() {
            var length=$scope.Lista.length;
            for (i = 0; i < length; i++){
              for (j = 0 ;j < $scope.Lista[i].nombres.length; j++) {
                console.log($scope.Lista[i].nombres[j].nombre +" "+ $scope.Lista[i].nombres[j].apellidoP +" "+ $scope.Lista[i].nombres[j].apellidoM );
                alert($scope.Lista[i].nombres[j].nombre);
                $scope.ListaA=$scope.Lista[i].nombres[j].apellidoM;
              }
            }
          };
        });
    }])
  .controller('cDigosDeGruposCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('comentarioProfVerCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

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

  .controller('ajusteNuevoHorarioCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {
      // la función siguiente es para probar si es el controlador correcto de cada vista
      $scope.data = {};
      // console.log(datos.mensaje);
      // las siguientes variables es el dato que se obtiene de los combobox
      var grupo = document.getElementById('cmb_grupo').value;
      var cicloEscolar = document.getElementById('cmb_cicloEscolar').value;
      var materia = document.getElementById('cmb_materia').value;
      var idUsuario=window.localStorage.getItem("idUser");

      var link = ' https://www.serviciosocial.xyz/api/materia.php?url=buscar';
      $http.post(link).then(function (res){
        //$scope.response tiene la información que envía el servidor
        $scope.response1 = res.data;
        console.log($scope.response1);
      });




      // funcion para registrar una nueva clase
      $scope.registra = function(){
        // se asigna una URL en dónde está la función que se usará, url=NombreDeLaFuncion
        var link = ' https://www.serviciosocial.xyz/api/grupo.php?url=insertar';
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

    }])

  .controller('comentarioProfCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
  .controller('comentarioProfVerCtrl', ['$scope', '$stateParams',
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

