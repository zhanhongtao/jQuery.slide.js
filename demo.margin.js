
function init( box, config ) {

  var length = config.length;
  var per = config.per || 1;
  var step = config.step || 1;
  var pw = config.pw || 100;
  var fixed = config.fixed || 10;
  var wrapClassName = config.wrapClassName || 'wrap';
  var itemClassName = config['class'] || 'item';

  function initItems() {
    var template = $('<div/>', {
      'class': itemClassName
    });
    var fragment = $('<div/>', {
      'class': wrapClassName
    });
    var t = config.rotate ? 2 : 1;
    fragment.width( t * length * (pw+fixed) );
    while ( t > 0 ) {
      var i = 0;
      while( i < length ) {
        var item = template.clone();
        item.text( /*t + */'' + (++i) );
        fragment.append( item );
      }
      t--;
    }
    box.append( fragment );
  }

  function initNavigator() {
    var fragment = $('<div class="navigate" />' );
    var prev = $( '<button id="prev" />' ).text( '上一个' );
    var next = $( '<button id="next" />' ).text( '下一个' );
    fragment.append( prev, next );
    box.append( fragment );
  }

  initItems();
  initNavigator();

  function onChange(e, p) {
    go(p);
  }

  function go( p ) {
    var to = p.to;
    var wrap = box.find( '.' + wrapClassName );
    var left = to * ( pw + fixed );
    wrap.animate({
      'margin-left': -1 * left
    }, 500);
  }

  function onBefore(e, p) {
    var config = this.getConfig();
    // 停止当前动画.
    box.find(':animated').stop( true, true, true );
    var direction = p.direction, to = p.to;
    var wrap = box.find( '.' + wrapClassName );
    var left = false;

    if ( !config.rotate ) {
      return;
    }

    // 初始化 - 放到中间.
    if ( direction === 0 ) {
      left = length * (pw+fixed);
      config.index = p.to = length;
    }

    var o = p.o;
    // 修正 margin-left
    // 修正 config.index
    // 修正 p.to
    if ( o + per >= length * 2 ) {
      left = ( p.from - length ) * ( pw + fixed );
      config.index = p.to = p.from - length + step;
    }
    else if ( o < 0 ) {
      left = ( p.from + length ) * ( pw + fixed );
      config.index = p.to = p.from + length - step;
    }

    if ( left !== false ) {
      wrap.css( 'margin-left', -1 * left );
    }

  }

  var setting = $.extend({
    onbefore: onBefore,
    onchange: onChange
  }, config, {
    length: config.rotate ? length * 2 : length
  });

  var slide = $.slide( setting );

  box.on( 'click', 'button', function(e) {
    var target = e.target;
    switch(target.id) {
      case 'next':
        slide.next();
        break;
      case 'prev':
        slide.prev();
        break;
      default: ;
    };
  });

  return slide;
}

var settings = [{
  title: '单条-循环',
  length: 5,
  rotate: 1,
  pw: 540
}, {
  title: '单条-循环-自动(2s)',
  length: 5,
  rotate: 1,
  pw: 540,
  auto: 1,
  timeout: 2
}, {
  title: '切换组 - 循环',
  length: 10,
  per: 5,
  step: 5,
  rotate: 1
}, {
  title: '切换组 - 循环 - 自动(5s)',
  length: 10,
  per: 5,
  step: 5,
  rotate: 1,
  auto: 1
}, {
  title: '切换组 - 不循环',
  length: 10,
  per: 5,
  step: 5
}, {
  title: '切换单条 - 循环',
  length: 7,
  step: 1,
  per: 5,
  rotate: 1
},{
  title: '切换单条 - 循环 - 自动(3s)',
  length: 7,
  step: 1,
  per: 5,
  rotate: 1,
  auto: 1,
  timeout: 3
}, {
  title: '切换单条 - 不循环',
  length: 7,
  step: 1,
  per: 5
}, {
  title: '切换组 - 循环 - 总数不够',
  length: 8,
  step: 5,
  per: 5,
  rotate: 1
}, {
  title: '切换指定组长 - 循环',
  length: 8,
  step: 2,
  per: 5,
  rotate: 1
}, {
  title: '切换指定组长 - 不循环',
  length: 8,
  step: 2,
  per: 5
}];

var slides = [];
var body = $( 'body' );

for ( var i = 0, l = settings.length; i < l; i++ ) {
  var element = $('<div />', {id: 'demo'+i, 'class': 'box'});
  var h = $('<h1/>').text( settings[i].title || '' );
  element.append( h );
  slides[i] = init( element, settings[i] );
  body.append( element );
}

