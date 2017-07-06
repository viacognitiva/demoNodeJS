var app = angular.module('MinhaApp', []);
app.controller('myController', function($scope, $http) {
      $scope.respostas=[];
      $scope.output=[];
      $scope.buscar = function() {

            $http.get('/api/busca/'+$scope.id).success(function(data) {
                 try{
                      if(notIsEmpty(data)){
                           $scope.reset();
                           $scope.respostas = angular.fromJson(data);
                           $scope.output.push({ id:$scope.respostas._id, resposta : $scope.respostas.resposta,pergunta:$scope.respostas.pergunta  });
                      }

                   }catch(exception){
                      $scope.reset();
                      console.log('Exception tratada'+exception);
                      $scope.errorMessage='Registro não encontrado.';
                   }

             });
      }
      $scope.parJson = function (json) {
         return angular.fromJson(json);
      }

      notIsEmpty = function (data) {
              return JSON.stringify(data, function(key, value) { return value === "" ? false : true });

      }

       $scope.reset = function(){
                 // $scope.successMessage='';
                  $scope.errorMessage='';
                 // $scope.user={};
                  $scope.output=[];
                  $scope.myForm.$setPristine(); //reset Form
       };



});