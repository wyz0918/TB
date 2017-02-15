/*
 * @Author: wuyizhao
 * @Date:   2017-02-13 18:05:06
 * @Last Modified by:   wuyizhao
 * @Last Modified time: 2017-02-16 01:16:05
 */


window.onload = function() {

    var navul = document.getElementById('site-nav-bd-l');
    navli = navul.getElementsByTagName('li');
    show1 = document.getElementById("user-panel-pre");
    show2 = document.getElementById('username-hd');
    show3 = document.getElementById('message-hd-2');
    show4 = document.getElementById('message-hd');
    navli[0].onmouseover = function() {
        show1.style.display = "block";
        show2.style.display = "block";
    }
    navli[0].onmouseout = function() {
        show1.style.display = "none";
        show2.style.display = "none";
    }
    navli[1].onmouseover = function() {
        show3.style.display = "block";
        show4.style.display = "block";
    }
    navli[1].onmouseout = function() {
        show3.style.display = "none";
        show4.style.display = "none";
    };


    var searchtab = document.getElementById('searchtab');
    var alis = searchtab.getElementsByTagName("li");
    var blis = searchtab.getElementsByTagName("a");
    for(var j =0;j< alis.length;j++)
    {
      alis[j].onclick=function(){
        for(var j =0;j< alis.length;j++){
        alis[j].className="";
      }this.className="active";
      }
      blis[j].onclick=function(){
        for(var j =0;j< blis.length;j++){
        blis[j].parentNode.className="";
      }this.parentNode.className="active";
      }


    }








    var topmenu = document.getElementById('topmenu');
    var Lis = topmenu.getElementsByTagName("li");
            for (i = 0; i < Lis.length; i++) {
                Lis[i].onmouseover = function () {
                    this.className = "lihover";
                }

                Lis[i].onmouseout = function () {
                    this.className = "";
                }
            }
   $(function () {
            var container = $('#container');
            var list = $('#list');
            var buttons = $('#buttons span');
            var prev = $('#prev');
            var next = $('#next');
            var index = 1;
            var len = 5;
            var interval = 3000;
            var timer;


            function animate (offset) {
                var left = parseInt(list.css('left')) + offset;
                if (offset>0) {
                    offset = '+=' + offset;
                }
                else {
                    offset = '-=' + Math.abs(offset);
                }
                list.animate({'left': offset}, 300, function () {
                    if(left > -200){
                        list.css('left', -520 * len);
                    }
                    if(left < (-520 * len)) {
                        list.css('left', -520);
                    }
                });
            }

            function showButton() {
                buttons.eq(index-1).addClass('on').siblings().removeClass('on');
            }

            function play() {
                timer = setTimeout(function () {
                    next.trigger('click');
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }

            next.bind('click', function () {
                if (list.is(':animated')) {
                    return;
                }
                if (index == 5) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-520);
                showButton();
            });

            prev.bind('click', function () {
                if (list.is(':animated')) {
                    return;
                }
                if (index == 1) {
                    index = 5;
                }
                else {
                    index -= 1;
                }
                animate(520);
                showButton();
            });

            buttons.each(function () {
                 $(this).bind('click', function () {
                     if (list.is(':animated') || $(this).attr('class')=='on') {
                         return;
                     }
                     var myIndex = parseInt($(this).attr('index'));
                     var offset = -520 * (myIndex - index);

                     animate(offset);
                     index = myIndex;
                     showButton();
                 })
            });

            container.hover(stop, play);

            play();

        });




    // for(var i =0;i<navli.length;i++)
    // {
    //   navli[i].onmouseover=function(){
    //     for(var j=0;j<divshow.length;j++)
    //     {
    //       divshow[j].style.display="block";
    //     }



    //   }
    // }



}
