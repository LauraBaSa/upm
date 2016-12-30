angular.module('starter.controllers', [])

/*.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    if($scope.loginData.username=='ana' && $scope.loginData.password=='123'){

    }


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})*/

  .controller('AppCtrl', function($scope, $http) {
    $scope.data = {};
    $scope.prueba = function() {

      alert('es la funcion correcta');

    };
    $scope.submit = function(){
      var link = 'http://nikola-breznjak.com/_testings/ionicPHP/api.php';

      $http.post(link, {username : $scope.data.username, password :$scope.data.password}).then(function (res){
        $scope.response = res.data;
        alert($scope.response);
      });
    }
  })

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', ['$scope', '$stateParams','$http',
  function($scope, $stateParams, $http) {
    $scope.data = {};
    $scope.prueba = function() {

      alert('es la funcion correcta');

    };
    $scope.submit = function(){
      var link = 'https://www.serviciosocial.xyz/usuario-ionic.php?url=login';

      $http.post(link, {correo : $scope.data.username, contrasena :$scope.data.password}).then(function (res){
        $scope.response = res.data;
        alert($scope.response);
        console.log($scope.response);

      });
    }
}])

//    /////////////////////////////AQUI VAN LOS CONTROLLERS DEL MENU////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////

  .controller('inicioCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

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

/*  .controller('listaDeAlumnosCtrl', ['$scope', '$state','$http',
    function ($scope, $state, $http) {
      //obtener los datos de el archivo de json
      $http.get('js/data.json')
      //añadir una funcion cuando la funcion termine (ajax)los parámetros que llegan son los datos que se han cargado
        .success(function(data){
          //$scope. ayuda a enviar cualquier dato a la plantilla
          $scope.Lista=data.Lista;
          console.debug(data.Lista);

         /!* var length=$scope.Lista.length;
          for (i = 0; i < length; i++){
            for (j = 0 ;j < $scope.Lista[i].nombres.length; j++) {
              console.log($scope.Lista[i].nombres[j].nombre); //console.log() es mejor :)

            }
          }*!/



          $scope.listaNombres = function() {
            console.log('Doing login', $scope.loginData);


          };

        });
    }])*/

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

  .controller('ajustesCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('acercaDeNosotrosCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


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

  .controller('ajusteNuevoHorarioCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
    }])

  .controller('ajusteNuevoHorarioCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
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

  //  ///////////////////////////////CONTROLLERS DE LOGIN//////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  /*
   .controller('loginCtrl',['$scope',
   function($scope){
   $scope.login={
   usuario :'',
   clave:''
   };
   $scope.ingresar=function(){
   alert($scope.login.usuario+" "+$scope.login.clave);
   };
   }
   ]);*/

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/Login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('registroCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])
