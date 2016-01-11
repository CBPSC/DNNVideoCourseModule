﻿/// <reference path="../app.js" />
/// <reference path="../factories.js" />
/// <reference path="C:\websites\dnndev.me\Website\DesktopModules\Calvary_VideoCourse\Scripts/angular.js" />
angular
	.module('videoControllers')
	.controller('statusCtrl', ['$scope', '$http', 'statusFactory', 'videosFactory', 'categoriesFactory', 'localizationFactory', '$location',
	function ($scope, $http, statusFactory, videosFactory, categoriesFactory, localizationFactory, $location) {

		// #region Controller Global Variables

		if (typeof editMode !== 'undefined') {
			$scope.editMode = true;
		} else {
			$scope.editMode = false;
		}


		// #endregion

		// #region Get Data from sources

		// Get user's completed videos
		statusFactory.callUsersData()
			.then(function(data) {
				$scope.userData = angular.fromJson(data);
				//console.log($scope.userData)
				angular.forEach($scope.userData, function (valueCategory, keyCategory) {
					valueCategory.Name = valueCategory.Name.replace('CCV_', '');
				});
				loadCats();
			}, function(data) {
				console.log('Error Getting User Data');
				console.log(data);
			});


		// Get categories
		var loadCats = function () {
			categoriesFactory.callCategoriesData()
			.then(function (data) {
				$scope.categories = angular.fromJson(data);
				angular.forEach($scope.categories, function (valueCategory, keyCategory) {
					valueCategory.RoleGroupName = valueCategory.RoleGroupName.replace('CCV_', '');
				});
				loadVids();
			}, function (data) {
				alert(data);
			})
		}

		// Get videos
		var loadVids = function () {
			videosFactory.callVideosData()
			.then(function (data) {
				$scope.videos = angular.fromJson(data);
				$scope.videoList($scope.videos);
			}, function (data) {
				alert(data);
			})
		}

		// Get Localization Resources
		localizationFactory.callResx()
		.then(function (data) {
			$scope.resx = angular.fromJson(data.ClientResources);
		}, function (data) {
			alert(data);
		})

		// #endregion

		// Create Video List
		$scope.videoList = function (videos) {



			// Iterate through each Category
			angular.forEach($scope.categories, function (valueCategory, keyCategory) {

				// Trim Category name

				// Iterate through each Role
				angular.forEach($scope.categories[keyCategory].Roles, function (valueCourse, keyCourse) {

					// Set courseId to RoleID
					$scope.categories[keyCategory].Roles[keyCourse].CourseId = valueCourse.RoleID;


					angular.forEach($scope.userData, function (valueUserGroup, keyUserGroup) {
						if (valueUserGroup.Id === valueCategory.RoleGroupID) {
							angular.forEach(valueUserGroup.Roles, function(valueUserRole, keyUserRole) {
								if (valueUserRole.Id === valueCourse.RoleID) {
									angular.forEach(valueUserRole.Users, function (valueUser, keyUser) {
										var myCounter = 0;
										var videoCounter = 0;
										var videoList = [];
										angular.forEach($scope.videos, function (valueVideo, keyVideo) {
											// Check to see that video is in the course
											if (valueVideo.CourseId === valueCourse.RoleID) {
												if (valueUser.Videos === null) {
													myCounter = 0;
												} else if (valueUser.Videos.match(valueVideo.VideoId)) {
													myCounter++;
												}
												//console.log(valueUser);
												videoCounter++;
												// Create list of updated videos
												videoList.push(valueVideo);
											}
										}, videoList);
										valueUser.name = valueUser.DisplayName !== '' ? valueUser.DisplayName : valueUser.Email;
										valueUser.numberComplete = myCounter;
										valueUser.totalVideos = videoCounter;
										valueUser.notStarted = valueUser.numberComplete === 0 ? 'not-started' : 'started';
										valueUser.percentComplete = (myCounter / videoCounter) * 100 + '%';
										valueUser.amountComplete = (myCounter / videoCounter) * 100;
										valueUser.courseComplete = valueUser.numberComplete === valueUser.totalVideos ? 'complete' : 'not-complete';

									});
								}
							});
						}
					});

				});
			});
			$('.collapse').collapse(function() {return false});
		}

		// #endregion 

		$scope.courseList = function () {
			$location.path('/videos/');
		}

	}]);