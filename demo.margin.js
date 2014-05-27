
var boxSettings = [
  {
    title: '上下切换',
    length: 5,
    rotate: 1,
    fixed: 0,
    duration: 300,
    wrap: '>ul',
    direction: 'horizontal',
    id: 'horizontal'    
  },
  {
    title: '单条-循环',
    length: 5,
    rotate: 1,
    pw: 540,
    duration: 800,
    wrap: '>ul'
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
  }
];


// boxSettings.length = 1;

var body = $( 'body' );
var ctemplate = $( '#ctpl' ).html();
var ntemplate = $( '#ntpl' ).html();

$.each(boxSettings, function( index, setting ) {
  var wrap = $( '<div class="demo"/>' );
  var _clone = $(ctemplate).clone().attr( 'id', setting.id || 'demo' + index );
  _clone.find( '.item' ).remove( '.item:nth-child(n + '+ (setting.length+1) + ')' );
  wrap.append( _clone );
  var hn = $( '<h1>' + setting.title + '</h1>' );
  wrap.prepend( hn );
  wrap.append( $(ntemplate).clone() );
  body.append( wrap );
});

$( '.box' ).each(function( index, box ) {
  $( box ).slide( '.item', boxSettings[index] );
});

$( '.demo' ).on( 'click', '#next', function(e) {
  var box = $( e.delegateTarget ).find( '.box' );
  var slide = box.data( 'slide' );
  slide.next();
});

$( '.demo' ).on( 'click', '#prev', function(e) {
  var box = $( e.delegateTarget ).find( '.box' );
  var slide = box.data( 'slide' );
  slide.prev();
});

