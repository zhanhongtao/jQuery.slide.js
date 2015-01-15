// 基础版
var basic = $('#basic').slide('.item');

// 垂直方向基础版
var horizontal = $('#horizontal').slide('.item', {
  direction: 'horizontal'
});

// Rotate 版本
var rotate = $('#rotate').slide('.item', {
  rotate: true
});

// Auto 版本
var auto = $('#auto').slide('.item', {
  auto: true,
  rotate: true
});

// Auto 时, 指定时间间隔版本
var timeoutAuto = $('#auto-timeout').slide('.item', {
  auto: true,
  rotate: true,
  timeout: 2
});


// 组切换
var group = $('#group');
group.slide('.item', {
  per: 5,
  step: 5,
  rotate: 1,
  duration: 500
});

// 自动组切换
var autoGroup = $('#auto-group');
autoGroup.slide('.item', {
  per: 5,
  step: 5,
  rotate: 1,
  duration: 500,
  auto: 1,
  timeout: 2
});

// 组显示, 单个切换
var singleGroup = $('#single-group');
singleGroup.slide('.item', {
  step: 1,
  per: 5,
  rotate: 1,
  auto: 1,
  timeout: 3
});

// 个数不够, 组切换
var noMatchGroup = $('#nomatch-group');
noMatchGroup.slide('.item', {
  step: 5,
  per: 5,
  rotate: 1
});

// 指定一次切换个数
var fixedGroup = $('#fixed-group');
fixedGroup.slide('.item', {
  step: 2,
  per: 5,
  rotate: 1
});

// 指定一次切换个数, 但不循环
var fixedGroupManual = $('#fixed-group-manual');
fixedGroupManual.slide('.item', {
  step: 2,
  per: 5
});

// 注意获取实例方式
// 绑定方式可任意选择 - 这里参考 label[for]/input#{id} 方式
$(document).on('click', '.next', function(e) {
  var dom = $(this).data('for');
  $('#' + dom).data('slide').next();
});

$(document).on('click', '.prev', function(e) {
  var dom = $(this).data('for');
  $('#' + dom).data('slide').prev();
});

