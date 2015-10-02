﻿$('body').attr('ng-app', 'CCVideoApp');

'use strict';
var convertToMinutes = function (n) { function i(n, t, i) { return (new Array(i + 1).join(t) + n).slice(-i) } var t = Math.floor(n / 60), r = n - t * 60, u = Math.floor(n / 3600); return n = n - u * 3600, i(t, "", 2) + ":" + i(r, "0", 2) };
/* App Module */

angular
	.module('CCVideoApp', [
		'ngRoute',
		'videoControllers',
		'ui.sortable'
	])
	.config(['$routeProvider', '$httpProvider',
		function ($routeProvider) {

			$routeProvider
			.when('/videos', {
				templateUrl: '/DesktopModules/Calvary_VideoCourse/ng/Views/videoListView.html',
				controller: 'videoCtrl'
			})
			.when('/videos/:VideoId', {
				templateUrl: '/DesktopModules/Calvary_VideoCourse/ng/Views/videoPlayerView.html',
				controller: 'videoPlayerCtrl'
			})
			.when('/courses/:courseId', {
				templateUrl: '/DesktopModules/Calvary_VideoCourse/ng/Views/editCourseView.html',
				controller: 'editCourseCtrl'
			})
			.when('/status', {
				templateUrl: '/DesktopModules/Calvary_VideoCourse/ng/Views/statusView.html',
				controller: 'statusCtrl'
			})
			.otherwise({
				redirectTo: '/videos'
			});
		}]);

