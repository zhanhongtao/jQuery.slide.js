jQuery.slide.js
===============

可定制化 jQuery slide 扩展

demo: http://zhanhongtao.github.io/jquery.slide.js/index.html


## 使用方法
var slide = $.slide( config );

config:
* length  {Number}  总条目数
* index   {Number}  索引
* rotate  {Boolean} 是否循环
* auto    {Boolean} 是否自动轮播
* timeout {Number}  指定 auto 时, 时间间隔
* step    {Number}  轮播时, 步长
* per     {Number}  当前显示条目长度

属性:
* debug - Boolean[default: false]

```javascript
slide.debug = true
```

方法:
* go( index )
* next()
* prev()
* auto()
* pause()
* resume()
* getConfig()

事件:
* before
* change
* after

```JavaScript
slide.on( 'before', function( e, p ) {
  // p.to                         切换到索引 to
  // p.from                       从索引 from 切换来.
  // p.direction                  切换的方向 -1/1
  // e.stopImmediatePropagation() 
  // e.stopPropagation()
});
```

@update 2014-04-21

