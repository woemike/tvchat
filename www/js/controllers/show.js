var mod = angular.module('tvchat.controllers.show', []);



mod.controller('ShowCtrl', function ($scope,
                                     $stateParams,
                                     $ionicScrollDelegate,
                                     $firebaseArray,
                                     ShowsService,
                                     FIREBASE_URL,
                                     UserService) {

	$scope.user = UserService;

	$scope.show = ShowsService.getShow(parseInt($scope.showId));
  $scope.showId = $stateParams.showId;

	$scope.data = {
		messages: [],
		message: '',
		loading: true,
		showInfo: false
	};

	var messagesRef = new Firebase(FIREBASE_URL);

	$scope.loadMessages = function () {

    var query = messagesRef
      .child("messages")
      .orderByChild("showId")
      .equalTo($scope.showId)
      .limitToLast(200);

    $scope.data.messages = $firebaseArray(query);
    $scope.data.messages.$loaded().then(function (data){
      console.log("AngularFire $loaded");
      $scope.data.loading = false;
      $ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
    });

	};

	$scope.sendMessage = function () {

    if ($scope.data.message){
      $scope.data.messages.$add({
        showId: $scope.showId,
        text: $scope.data.message,
        username: $scope.user.current.name,
        userId: $scope.user.current.userId,
        profilePic: $scope.user.current.profilePic,
        timestamp: new Date().getTime()
      });
      $scope.data.message = '';
      $ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
    }


	};

  $scope.loadMessages();

	console.log("ShowCtrl-Created");

	$scope.$on("$ionicView.enter", function () {
		console.log("ShowCtrl-Enter");
	});

	$scope.$on("$ionicView.beforeLeave", function () {
		console.log("ShowCtrl-Leave");
	});

});
