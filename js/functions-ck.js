(function(e){function f(){o=!1;r.each(function(t,r){e(r).toggleClass("active",t>=n).removeClass("content_visible")});h();p();setTimeout(function(){o=!0;t=0},1e3)}function l(){n--;n<1&&(n=0);f()}function c(){n++;n>i&&(n=i);f()}function h(){a.eq(n).addClass("active").siblings().removeClass("active")}function p(){var e=r.eq(n).find("h1");e.removeClass("hidden");e.parent().prevAll().find("h1").addClass("hidden");e.parent().nextAll().find("h1").removeClass("hidden")}function d(e){if(o&&(e.originalEvent.detail<0||e.originalEvent.wheelDelta>0)){t--;Math.abs(t)>=s&&l()}else if(o){t++;t>=s&&c()}return!1}var t=0,n=0,r=e(".slide"),i=r.length-1,s=10,o=!0,u=e("nav"),a=u.find("span");e(window).on({"DOMMouseScroll mousewheel":d});e(document).keydown(function(e){switch(e.keyCode){case 40:c();break;case 38:l()}});a.on("click",function(){n=a.index(e(this));h();var t=r.removeClass("content_visible").eq(n);t.addClass("active");t.prevAll().removeClass("active");t.nextAll().addClass("active");p()});e(".expand").on("click",function(){e(this).parent().parent().addClass("content_visible")});e(".close").on("click",function(){e(this).parent().parent().removeClass("content_visible")})})(jQuery);