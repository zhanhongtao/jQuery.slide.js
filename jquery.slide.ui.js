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
    return this.each(function() {
      var _id = getid();
      var box = $(this).data( slidekey, _id );
      var direction = config.direction;
      var style = {};

      // 准备工作.
      var items = box.find( selector );
      var length = items.length;
      
      if ( direction === 'horizontal' ) {
        style.direction = 'height';
        style.margin = 'margin-top';
        style.size   = items.outerHeight();
        style.fixed  = style.size + config.fixed;
      }
      else {
        style.direction = 'width';
        style.margin = 'margin-left';
        style.size   = items.outerWidth();
        style.fixed  = style.size + config.fixed;
      }

      // 设置 wrap 节点.
      var fragment = box.find( config.wrap );
      var parent = items.parent();
      if ( fragment.length === 0 ) {
        var wrapClassName = config.wrapClassName;
        fragment = $('<div/>', { 'class': wrapClassName });
        ( parent.data( slidekey ) === _id ? items : parent ).wrapAll(fragment);
        fragment = box.find( '.' + wrapClassName );
      }
      fragment.css( style.direction, ( config.rotate ? 2 : 1 ) * length * style.fixed );
      
      // 修正节点长度.
      if ( config.rotate ) {
        parent.append( items.clone() );
        items = box.find( selector);
      }

      // 切换.
      function onChange( e, p ) {
        var _config = {};
        _config[ style.margin ] = -1 * p.to * style.fixed;
        fragment.animate( _config, config.duration, config.effect );
      }

      // 做相应 fix.
      function onBefore(e, p) {
        var setting = this.getConfig();
        var per = setting.per;
        var step = setting.step;
        var direction = p.direction;
        fragment.stop( true, !!config.dumptoend );
        
        var padding = false;
        if ( !setting.rotate ) {
          return;
        }
        
        // 初始化 - 放到中间.
        if ( direction === 0 ) {
          padding = length * style.fixed;
          setting.index = p.to = length;
        }

        var o = p.o;
        // 修正 margin-left
        // 修正 setting.index
        // 修正 p.to
        if ( o + per >= length * 2 ) {
          padding = ( p.from - length ) * style.fixed;
          setting.index = p.to = p.from - length + step;
        }
        else if ( o < 0 ) {
          padding = ( p.from + length ) * style.fixed;
          setting.index = p.to = p.from + length - step;
        }

        if ( padding !== false ) {
          fragment.css( style.margin, -1 * padding );
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
    wrapClassName: 'wrap',    // 插件包条目时指定的类名
    item: 'item',             // 默认找元素下的 item
    fixed:  10,               // 对屏之间间距修正
    effect: 'swing',          // 可扩展 jQuery.easing. https://github.com/danro/jquery-easing
    duration: 400,            // 切换所需时长
    dumptoend: true,          // jQuery.stop() 第二个参数.
    wrap: null,               // 可手动指定 wrap 元素 - selector/dom/jQueryObject
    direction: 'vertical'     // 左右/上下方向切换
  };

  return $;
});

