'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentList
 * @description
 * # commentList
 */
var milliPer = {
        SEC:    1000,
        MI:     60000,
        HR:     3600000,
        DAY:    86400000
};

angular.module('commentList', ['comment'])
  .directive('commentList', function () {
    return {
      template: '<div class="commentList">' +
                    '<table class="table table-bordered">' +
                    '<thead><tr>' +
                        '<th>Author</th><th>Comment</th><th>Posted</th>' +
                    '</tr></thead>' +
                    '<tbody><tr ng-repeat="comment in comments">' +
                    '<td>{{comment.author}}</td><td>{{comment.msg}}</td><td>{{comment.timestamp | ts}}</td>' +
                    '</tr></tbody>' +
                    '</table>' +
                '</div>',
      restrict: 'E',
      scope: {
        comments: '='
      },

      link: function postLink(scope, element, attrs) {}
    };
  }).filter('ts', function($filter) { 
    return function(ts) {
        var retVal      = 'no date',
            timeStamp   = parseInt(ts, 10);
        
        if (!isNaN(timeStamp)) {
            var delta = new Date().getTime() - timeStamp,
                        qualifier;
            
            if (delta > milliPer.DAY - milliPer.SEC) {
                retVal = Math.floor(delta/milliPer.DAY);
                qualifier = 'day';
            } else if (delta > milliPer.HR - 1000) {
                retVal = Math.floor(delta/milliPer.HR);
                qualifier = 'hour';
            } else {
                retVal = Math.floor(delta/milliPer.MI);
                if (retVal <= 0) {
                    retVal = 1;
                }
                qualifier = 'minute';
            }
            retVal += ' ' + qualifier + (retVal > 1 ? 's' : '') + ' ago';
        }
        return retVal;
    }
    });


