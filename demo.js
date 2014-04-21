
function init( box, config ) {
  var length = config.length;
  var per = config.per || 1;
  var pw = config.pw || 110;
  var fixed = config.fixed || 10;
  var wrapClassName = config.wrapClassName || 'wrap';
  var itemClassName = config['class'] || 'item';
  
  function go( p ) {
    var to = p.to, 
        from = p.from, 
        direction = p.direction;
    var tos = [], 
        froms = [];
    var toMap = {};
    
    while ( 1 ) {
      if ( tos.length === per ) {
        break;
      }
      if ( to >= length ) {
        to = 0;
      }
      tos.push( to );
      toMap[to] = 1;
      to++;
    }
    
    var l = per;
    // from.
    while ( l > 0 ) {
      if ( from >= length ) {
        from = 0;
      }
      if ( !toMap[from] ) {
        froms.push( from );
      }
      from++;
      l--;
    }

    var items = box.find( '.' + itemClassName );
    var max = pw * per + fixed;
    var min = 0;
    // from.
    $.each( froms, function( i, value ) {
      var item = items.eq(value);
      var left;
      if ( direction === 1 ) {
        left = min - (froms.length-i) * pw - fixed;
      }
      else {
        left = max + pw * i + fixed;
      }
      item.animate({
        left: left
      }, 500, function() {
        item.css({
          'z-index': 0
        });
      });
    });

    // to.
    $.each( tos, function( i, value ) {
      var item = items.eq( value );
      item.css( 'z-index', 1 );
      item.animate({
        left: i * pw + fixed
      }, 500);
    });

    $.data( box, tos );
  }

  function initItems() {
    var template = $('<div/>', {
      'class': itemClassName
    });
    var i = 0;
    var fragment = $('<div/>', {
      'class': wrapClassName
    });
    fragment.width( length * pw );
    while( i < length ) {
      var item = template.clone();
      item.text( '' + (++i) );
      item.css( 'left', (i-1) * pw + fixed );
      fragment.append( item );
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

  var setting = $.extend({
    count: length,
    onchange: function(e,p) {
      go(p);
    }
  }, config);
  var slide = $.slide( setting );

  slide.on( 'before', function( e, p ) {
    var history = $.data( box );
    var historyMap = {};
    $.each( history, function( index, value ) {
      historyMap[ value ] = true;
    });
    var to = p.to, 
        from = p.from
        direction = p.direction;
    var tos = [];
    var items = box.find( '.' + itemClassName );
    while ( 1 ) {
      if ( tos.length === per ) {
        break;
      }
      if ( to >= length ) {
        to = 0;
      }
      tos.push( to );
      to++;
    }
    var views = [];
    $.each( tos, function( index, value ) {
      if ( !historyMap[ value ] ) {
        views.push( value );
      }
    });
    
    var max = pw * per + fixed;
    var min = 0;
    var vlength = views.length;
    $.each( views, function( index, value ) {
      var item = items.eq(value);
      if ( direction === 1 ) {
        item.css( 'left', max + pw * index + fixed );
      }
      else {
        item.css( 'left', min - (pw * (vlength-index) + fixed) );
      }
    });
    
  });

  slide.on( 'before', function() {
    box.find(':animated').stop( true, true, true );
  });

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
  title: '单条可循环',
  length: 5,
  rotate: 1,
  pw: 540
}, {
  title: '显示多条, 并多条滚动循环',
  length: 10,
  per: 5,
  step: 5,
  rotate: 1  
}, {
  title: '显示多条, 并多条滚动, 但不循环',
  length: 10,
  per: 5,
  step: 5  
}, {
  title: '显示多条, 单个滚动, 但不循环',
  length: 7,
  step: 1,
  per: 5  
}, {
  title: '显示多条, 单个滚动并且循环',
  length: 7,
  step: 1,
  per: 5,
  rotate: 1
}, {
  title: '显示多条, 但总条目数不够',
  length: 8,
  step: 5,
  per: 5
}, {
  title: '显示多条, 指定滚动条目数, 循环',
  length: 8,
  step: 2,
  per: 5,
  rotate: 1
}, {
  title: '显示多条, 指定滚动条目数, 不循环',
  length: 8,
  step: 2,
  per: 5,
  rotate: 0
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

