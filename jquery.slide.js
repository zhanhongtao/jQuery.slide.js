;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function( $ ) {
  $.slide = function( setting ) {
    var config = $.extend( {}, $.slide.setting, setting );
    // 实例化 slide.
    var slide = $({}), timer, noop = $.noop, stop = 0;
    // 支持 stopPropagation 和 stopImmediatePropagation.
    // stopPropagation 不再执行后续事件.
    // stopImmediatePropagation 不再执行当前其它事件函数和后续事件.
    var key = '__slide' + $.guid + $.now();
    var supportEvents = [ 'before', 'change', 'after' ];
    var eventMap = {
      before: [],
      change: [],
      after: []
    };
    var flag = {
      sp: false,
      sip: false
    };
    var stopImmediatePropagation = function() {
      flag.sip = flag.sp = true;
    };
    var stopPropagation = function() {
      flag.sp = true;
    };
    $.each( supportEvents, function( index, name ) {
      var events = eventMap[ name ];
      slide.on( key, function( e ) {
        var _arguments = arguments;
        // 还原 type 值!
        e.type = name;
        var _stopImmediatePropagation = e.stopImmediatePropagation;
        e.stopPropagation = stopPropagation;
        e.stopImmediatePropagation = stopImmediatePropagation;
        $.each( events, function( index, cb ) {
          cb.apply( slide, _arguments );
          if ( flag.sip === true ) {
            flag.sip = false;
            return false;
          }
        });
        if ( flag.sp === true ) {
          _stopImmediatePropagation.call(e);
          flag.sp = false;
        }
      });
    });

    slide.on = function( name, cb ) {
      var method = eventMap[ name ];
      if ( method ) {
        method.push( cb );
      }
      return this;
    };
    slide.off = function( name, cb ) {
      var method = eventMap[ name ];
      var list = [];
      $.each( method, function( index, self ) {
        if ( cb === self ) {
          list.push( index );
        }
      });
      $.each( list.reverse(), function( i, index ) {
        method.splice( index, 1 );
      });
      return this;
    };

    // 导航.
    slide.go = function( to, from ) {
      if ( timer ) {
        clearTimeout( timer );
        timer = null;
      }
      to = ~~to;
      from = typeof from == 'undefined' ? config.index : ~~from;
      var direction = to === from ? 0 : to > from ? 1 : -1;
      var rotate = config.rotate;
      var max = rotate ? config.length - 1 : Math.max(0, config.length-config.per);
      var o = to;
      // to.
      if ( rotate ) {
        to = to > max ? to - max - 1 : to < 0 ? to + max + 1 : to;
      }
      else {
        to = to > max ? max : to < 0 ? 0 : to;
      }
      var index = config.index = to;
      slide.trigger( key, {
        o: o,
        to: to,
        from: from,
        direction: direction
      });
      if ( index === max && !rotate ) {
        if ( timer ) clearTimeout( timer );
      }
      else if ( !stop && config.auto ) {
        slide.play();
      }
      return this;
    };
    slide.next = function() {
      var from = config.index,
          to = from + config.step;
      slide.go( to, from );
      return this;
    };
    slide.prev = function() {
      var from = config.index,
          to = from - config.step;
      slide.go( to, from );
      return this;
    };

    // 停止 + 继续
    slide.pause = function() {
      if ( timer ) clearTimeout( timer );
      stop = 1;
      return this;
    };
    slide.resume = function() {
      stop = 0;
      slide.play();
      return this;
    };
    slide.play = function() {
      timer = setTimeout(function() {
        slide.next();
      }, config.timeout * 1000 );
      return this;
    };
    slide.getConfig = function() {
      return config;
    };

    // 对外提供 before/change/after 事件.
    // 使用者可绑定任意执行操作.
    $.each( supportEvents, function( index, method ) {
      slide.on( method, config[ 'on' + method ] || noop );
    });
    if ( config.auto ) {
      slide.play();
    }
    slide.go( config.index );
    return slide;
  };
  $.slide.setting = {
    index: 0,
    rotate: 0,
    timeout: 5,
    auto: 0,
    step: 1,
    per: 1
  };
  return $;
});
