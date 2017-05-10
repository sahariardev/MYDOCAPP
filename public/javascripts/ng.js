//here angular js will go
var bingo="asdadsas";
var lol;
var app=angular.module('myDocapp',['ngRoute']);
app.config(function($routeProvider){
    
    $routeProvider
    .when("/item/:id",{
        
        templateUrl:"html/item.html",
        controller:'ItemController'
        
    })
    .when("/create",{
        
        templateUrl:"html/edit.html",
        controller:'createController'
    })
    .when("/edit/:id",{
        
        templateUrl:"html/edit.html",
        controller:'editController'
    })
    .when("/msg",{
        
        templateUrl:"html/msg.html",
        controller:'msgController'
    })
});

app.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});

app.controller('msgController',function($scope){
   $scope.message="Successfully Added Data"; 
    
});
app.controller('ItemController',function($scope,$route, $routeParams,$http){
    
   $scope.param = $route.current.params.id;
    var url="addData/data/"+$scope.param;
    
    
    $scope.values=[];
    
    $http.get(url).then(function(response){
        $scope.values.push(response.data);
        console.log($scope.values[0].title)
        
        
        
    })
    
    
    

    
});
app.controller("listitemsController",function($scope,$http){
    
    var url='/addData/';
    $scope.list=[];
    
    $http.get(url).then(function(response){
        lol=response.data;
        for(var key in response.data)
            {
                
                lol[key].id=key;
                
                $scope.list.push(lol[key]);
                
                
              console.log(lol[key]);    
            }
        
        
    });
    
    console.log($scope.list);
    
    /*
    $scope.list=[
        
      {
          id:1,
          title:'List one'
      },
        {
          id:2,
          title:'List two'
      },
        {
          id:3,
          title:'List three'
      },
        {
          id:4,
          title:'List four'
      },
        {
          id:5,
          title:'List five'
      },
        {
          id:6,
          title:'List six'
      }
    ];*/
    
});

app.controller('createController',function($scope,$http,$location){
    
    $scope.buttonname="Save Data";
    $scope.variables={
      title:'',
      client:'',
      tag:'',
      description:'',
      snippet:''    
        
    }
        
    
    
    $scope.save=function()
    {
        var data={
            title:$scope.variables.title,
            client:$scope.variables.client,
            tag:$scope.variables.tag,
            description:$scope.variables.description,
            snippet:$scope.variables.snippet
                };
        var url="/addData/";
        $http.post(url,data).success( function(data,status){
            console.log(data);
            $location.path('/msg');
        });
        
        
        
        
        
    }
    
});
app.controller('editController',function($scope,$route, $routeParams){
    
    $scope.buttonname="Update Data";
    $scope.id = $route.current.params.id;
    
});
