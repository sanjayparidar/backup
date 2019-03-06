var app = angular.module('myapp',['ngRoute']);

 app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    
    .when("/",
    {

        templateUrl : "/views/home/index.html",
        
    })
    .when("/login", {
      
        templateUrl : "/views/login/index.html",
        
    })
    .when("/paris", {
        templateUrl : "mentor_register.html",
        controller : "mentorsignupctrl"
    })
    .when("/paris", {
        templateUrl : "mentorsignin.html",
        controller : "mentorloginctrl"
    })
});


         
       app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

 
 app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

//  app.directive('validFile',function(){
//   return {
//     require:'ngModel',
//     link:function(scope,el,attrs,ngModel){
//       //change event is fired when file is selected
//       el.bind('change',function(){
//         scope.$apply(function(){
//           ngModel.$setViewValue(el.val());
//           ngModel.$render();
//         });
//       });
//     }
//   }
// });

 
app.controller('studentsignupctrl', function($scope, $http,fileUpload){
	   $scopenewData={}
	   $scope.signup=function(){
		     resumefile=$scope.resume
	         $scope.newData.ResumeUrl=resumefile;
         console.log($scope.newData)
             $http({
			        method : "post",
			        url : "https://glacial-citadel-47306.herokuapp.com/api/students",
			        data : $scope.newData
		          }).then(function(res){
                    console.log(res.data)
                
            });    
		  }

});


app.controller('loginctrl', function($scope, $http,$window){
       $scope.data= { };
       $scope.showMsg=false;
       
    $scope.login=function(){
      console.log($scope.data)
          var url={
            "where":{"emailID":$scope.data.emailID,
                     "password":$scope.data.password
            }
          };
          var mainurl='https://glacial-citadel-47306.herokuapp.com/api/students/findOne?filter='+JSON.stringify(url)
          console.log(mainurl)
                  $http({
                          method : "GET",
                          url : mainurl
                      }).then(function(res){
                        $scope.data=res.data
                        console.log($scope.data)
                         if(res.data.name)
                       {
                      $window.location.href=""
                      }
                  else
                      {
                      $scope.showMsg=true;
                      $scope.msg="This Password is Incorrect !";
                      }
            });    
          }
});


app.controller('mentorsignupctrl', function($scope, $http, $window,fileUpload){
    
    $scope.signup=function(){
    var resumefile=$scope.resume
        $scope.newData.ResumeUrl=resumefile;
    var  profile=$scope.profilepic
    $scope.newData.ProfilePic=profile;
   // console.log($scope.newData);
   console.log($scope.newData)
   $http({
            method : "post",
            url : "https://glacial-citadel-47306.herokuapp.com/api/mentors",
            data : $scope.newData
         }).then(function(res){
                    console.log(res.data)
                
            });       
         
     }                                                                                                                                             
});


app.controller('mentorloginctrl', function($scope, $http,$window){
     $scopedata={}
       $scope.showMsg=false;
     $scope.mentorlogin=function(){
      console.log($scope.data)
     var url={
            "where":{"EmailID":$scope.data.emailID,
                     "Password":$scope.data.password
            }
          };
          var mainurl='https://glacial-citadel-47306.herokuapp.com/api/mentors/findOne?filter='+JSON.stringify(url)
          console.log(mainurl)
                  $http({
                          method : "GET",
                          url : mainurl
                      }).then(function(res){
                        $scope.data=res.data;
                        console.log(res.data)
                   if(res.data.name)
            {

                $window.location.href=""
            }
            else
            {
                $scope.showMsg=true;
                $scope.msg="This Username and password is Incorrect !";
            }
            });    
      }

});