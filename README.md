jQuery.slide.js
===============

可定制化 jQuery slide 扩展

demo: http://zhanhongtao.github.io/jQuery.slide.js/index.html


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
* debug   {Boolean} 是否显示 $.slide 中的日志信息

属性:
* debug - Boolean[default: false]

```javascript
slide.debug = true
```

方法:
* getConfig()  获取配置信息, 可手动更新 index, rotate, auto 等信息.
* go( index )
* next()
* prev()
* auto()       手动设置开启 auto 时, 需要手动调用一次.
* pause()      auto 开启时, 停止 auto.
* resume()     auto 开启时, 继续 auto.

事件:
* 'before'
* 'change'
* 'after'
* '_slide' + $.GUID + $.now() 为内部事件.

```JavaScript
slide.on( 'before', function( e, p ) {
  // p.to                         切换到索引 to
  // p.from                       从索引 from 切换来.
  // p.direction                  切换的方向 -1/1
  // p.o                          切换到索引的原始值. to 为处理过的值.
  // e.stopImmediatePropagation() 
  // e.stopPropagation()
});
```

@update 2014-04-22

