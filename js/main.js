$(document).ready(function(){

    var $body = $('html, body');
    var $wrapper = $('.wrapper');
    var $menuWrap = $('.menu-wrap');
    var $mainBlock = $('#main-block');
    var $contentBlock = $('.content-block');
    var $menuIcon = $('#menu_icon');
    var $menuBg = $('#menu_bg');
    var $wheelMenuItem = $('.wcircle-menu-item');
    var windowHeight = null;
    var isMenuOpen = false;
    var dataType = null;
    var itemTop = null;
    var currentMenu = null;
    var menuBgHeight = null;
    var isMenuBgActive = false;

    var init = function() {

        menuBgHeight = $menuBg.height();
        windowHeight = $(window).height() - 80 - menuBgHeight;

        $mainBlock.css('height',windowHeight);

        // font RWD
        $body.flowtype({
            minimum   : 320,
            maximum   : 1200,
            minFont   : 12,
            maxFont   : 40,
            fontRatio : 33
        });
    };

    var wheelMenuInit = function() {
        $menuIcon.WCircleMenu({
            width: '50px',
            height: '50px',
            angle_start : Math.PI/2,//-Math.PI/2,
            delay: 50,
            distance: 130,
            angle_interval: Math.PI/3,
            easingFuncShow:"easeOutBounce",
            easingFuncHide:"easeInBack",
            step:35,
            itemRotation:0,
        });
    };

    var menuBgCover = function() {
        $menuIcon.on('click', function() {

            isMenuBgActive = $menuBg.hasClass('active');

            // when menu is close
            if(!isMenuOpen && !isMenuBgActive) {

                isMenuOpen = true;
                isMenuBgActive = true;
                windowHeight = $(window).height();

                $(this).addClass('active');
                $menuBg.css('position', 'absolute');
                $menuWrap.css('position', 'fixed');
                $menuBg.animate({height: windowHeight + 'px'}, function() {
                    $wrapper.css('height', windowHeight - 280);
                    $wrapper.css('overflow','hidden');
                    $mainBlock.hide();
                    $contentBlock.hide();
                });
                $menuBg.addClass('active');
                $menuIcon.animate({'top': '50%'});

            // when menu is open
            } else{

                isMenuOpen = false;
                isMenuBgActive = false;
                windowHeight = $(window).height();

                $(this).removeClass('active');

                if(dataType === 'content') {
                    $contentBlock.show();
                    $menuWrap.css('height', '16%');
                    $menuBg.animate({height: '100%'}, function (){
                        $menuBg.css('position', 'relative');
                        $menuWrap.css('height','0');
                        $menuWrap.css('position', 'fixed');
                        $wrapper.css('height', 'auto');
                        $wrapper.css('overflow','auto');
                    });
                }
                else {
                    $mainBlock.show();
                    $menuWrap.css('height', '16%');
                    $menuWrap.css('position', 'relative');
                    $menuBg.animate({height: '100%'}, function (){
                        $menuBg.css('position', 'relative');
                        $wrapper.css('height', 'auto');
                        $wrapper.css('overflow','auto');
                    });
                }

                $menuBg.removeClass('active');
                $menuIcon.animate({'top': '-45px'});
            }
        });
    };

    var goToMenuItems = function() {
        $wheelMenuItem.off('click').on('click',function(){

            dataType = $(this).data('type');

            if(dataType === 'top') {

                currentMenu = $(this).data('menu');

                $menuBg.removeClass('content-mode');
                $mainBlock.show(function (){
                    itemTop = $('#' + currentMenu).offset().top - 40;
                    $body.scrollTop(itemTop);
                });
                $contentBlock.hide();
            }
            else if(dataType === 'content') {

                currentMenu = $(this).data('menu');

                $menuBg.addClass('content-mode');
                $mainBlock.hide();
                $contentBlock.show(function (){
                    itemTop = $('#' + currentMenu).offset().top - 40;
                    $body.animate({
                        scrollTop: itemTop
                    },800);
                });
                $wrapper.css('height', 'auto');
                $wrapper.css('overflow','auto');
            }
            else {

                $menuBg.removeClass('content-mode');
                $mainBlock.show();
                $contentBlock.hide();
            }
        });
    };

    init();
    wheelMenuInit();
    menuBgCover();
    goToMenuItems();

});