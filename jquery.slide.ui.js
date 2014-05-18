/*!
  @NOTE: 
  依赖 jQuery.slide.js (http://github.com/zhanhongtao/jQuery.slide.js)
*/

/**
  html 结构.
  <div class="slide">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>

  使用方法:
  $( '.slide' ).slide( '.item' );
  var slide = $( '.slide' ).data( 'slide' );
*/

;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery.slide'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery.slide'));
  } else {
    factory(jQuery);
  }
})(function( $ ) {

  $.fn.slide = function( selector, config ) {
    config = $.extend( {}, $.fn.slide.setting, config );
    return this.each(function() {
      var box = $(this);
      var items = box.find( selector );
      var length = items.length;
      var pw = items.width();
      var fixed = config.fixed;
      var wrapClassName = config.wrapClassName;
      var fragment = $('<div/>', { 'class': wrapClassName });
      if ( config.rotate ) {
        box.append( items.clone() );
        items = box.find( selector);
      }
      fragment.width( (config.rotate ? 2 : 1 ) * length * (pw+fixed) );
      items.wrapAll( fragment );
      
      function onChange( e, p ) {
        var to = p.to;
        var wrap = box.find( '.' + wrapClassName );
        var left = to * ( pw + fixed );
        wrap.animate({
          'margin-left': -1 * left
        }, config.duration, config.effect );
      }

      function onBefore(e, p) {
        var setting = this.getConfig();
        var per = setting.per;
        var step = setting.step;
        // 停止当前动画.
        box.find(selector + ':animated').stop( true, true, true );
        var direction = p.direction, to = p.to;
        var wrap = box.find( '.' + wrapClassName );
        var left = false;
        if ( !setting.rotate ) {
          return;
        }
        // 初始化 - 放到中间.
        if ( direction === 0 ) {
          left = length * (pw+fixed);
          setting.index = p.to = length;
        }

        var o = p.o;
        // 修正 margin-left
        // 修正 setting.index
        // 修正 p.to
        if ( o + per >= length * 2 ) {
          left = ( p.from - length ) * ( pw + fixed );
          setting.index = p.to = p.from - length + step;
        }
        else if ( o < 0 ) {
          left = ( p.from + length ) * ( pw + fixed );
          setting.index = p.to = p.from + length - step;
        }

        if ( left !== false ) {
          wrap.css( 'margin-left', -1 * left );
        }
      }

      var setting = $.extend( config, { length: config.rotate ? length * 2 : length });
      var slide = $.slide( setting );
      slide.on( 'before', onBefore ).on( 'change', onChange );
      box.data( 'slide', slide );
      
    });
  };

  $.fn.slide.setting = {
    // 插件包条目时指定的类名
    wrapClassName: 'wrap',
    // 默认找元素下的 item
    item: 'item',
    // 对屏之间间距修正
    fixed: 10,
    // 可扩展 jQuery.easing. https://github.com/danro/jquery-easing
    effect: 'swing',
    duration: 400
  };

  return $;
});

