
var boxSettings = [
  {
    title: '单条-循环',
    length: 5,
    rotate: 1,
    pw: 540,
    duration: 600
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

var body = $( 'body' );
var ctemplate = $( '#ctpl' ).html();
var ntemplate = $( '#ntpl' ).html();

$.each(boxSettings, function( index, setting ) {
  var _clone = $(ctemplate).clone().attr( 'id', 'demo' + index );
  _clone.find( '.item' ).remove( '.item:nth-child(n + '+ (setting.length+1) + ')' );
  var hn = $( '<h1>' + setting.title + '</h1>' );
  _clone.prepend( hn );
  _clone.append( $(ntemplate).clone() );
  body.append( _clone );
});

$( '.box' ).each(function( index, box ) {
  $( box ).slide( '.item', boxSettings[index] );
});

$( '.box' ).on( 'click', '#next', function(e) {
  var target = e.delegateTarget;
  var slide = $( target ).data( 'slide' );
  slide.next();
});

$( '.box' ).on( 'click', '#prev', function(e) {
  var target = e.delegateTarget;
  var slide = $( target ).data( 'slide' );
  slide.prev();
});


