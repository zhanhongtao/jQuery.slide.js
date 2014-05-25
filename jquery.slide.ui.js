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
  var getid = (function() {
    var id = 0;
    return function() {
      return id++;
    };
  })();
  var slidekey = '__slide';
  $.fn.slide = function( selector, config ) {
    config = $.extend( {}, $.fn.slide.setting, config );
    return this.each(function( index ) {
      var _id = getid();
      var box = $(this).data( slidekey, _id );
      // 准备工作.
      var items = box.find( selector );
      var pw = items.width();
      var fixed = config.fixed;
      var fixedWidth = pw + fixed;
      var wrapClassName = config.wrapClassName;
      var length = items.length;

      // 修正节点长度.
      if ( config.rotate ) {
        items.parent().append( items.clone() );
        items = box.find( selector);
      }
      
      // 添加 wrap 节点.
      var fragment = $('<div/>', { 'class': wrapClassName });
      fragment.width( ( config.rotate ? 2 : 1 ) * length * fixedWidth );
      
      var parent = items.parent();
      ( parent.data( slidekey ) === _id ? items : parent ).wrapAll(fragment);
      
      // 切换.
      function onChange( e, p ) {
        box.find( '.' + wrapClassName ).animate({
          'margin-left': -1 * p.to * fixedWidth
        }, config.duration, config.effect );
      }

      // 做相应 fix.
      function onBefore(e, p) {
        var setting = this.getConfig();
        var per = setting.per;
        var step = setting.step;
        var direction = p.direction, to = p.to;
        var wrap = box.find( '.' + wrapClassName );
        wrap.stop( true, !!config.dumptoend );
        var left = false;
        if ( !setting.rotate ) {
          return;
        }
        // 初始化 - 放到中间.
        if ( direction === 0 ) {
          left = length * fixedWidth;
          setting.index = p.to = length;
        }

        var o = p.o;
        // 修正 margin-left
        // 修正 setting.index
        // 修正 p.to
        if ( o + per >= length * 2 ) {
          left = ( p.from - length ) * fixedWidth;
          setting.index = p.to = p.from - length + step;
        }
        else if ( o < 0 ) {
          left = ( p.from + length ) * fixedWidth;
          setting.index = p.to = p.from + length - step;
        }

        if ( left !== false ) {
          wrap.css( 'margin-left', -1 * left );
        }
      }

      var setting = $.extend( config, { length: config.rotate ? length * 2 : length });
      var slide = $.slide( setting );
      
      var go = slide.go;
      slide.go = function( id ) {
        var index = id;
        if ( typeof index === 'string' ) {
          index = box.find( selector ).filter( '#' + id ).index();
          if ( index === -1 ) return;
        }
        go( index );
      };
      
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
    duration: 400,
    dumptoend: true
  };

  return $;
});

