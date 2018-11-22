//// 手指滑动思路整理
//(function() {
//
//  var ul = document.querySelector(".jd_content_left ul");
//  var jd_content_left = document.querySelector(".jd_content_left");
//
//  // 注册touch事件
//  // 记录手指开始位置, 是用来计算手指滑动的距离的
//  var startY;
//  // 记录当前的位置
//  var currentY = 0;
//
//  var max = 100;
//  var min = jd_content_left.offsetHeight - ul.offsetHeight - 100;
//
//  ul.addEventListener("touchstart", function( e ) {
//    startY = e.touches[0].clientY;
//  })
//  ul.addEventListener("touchmove", function( e ) {
//    var distanceY = e.touches[0].clientY - startY;
//    var tempY = currentY + distanceY;
//
//    // 设置给ul即可, 不要动画
//    removeTransition();
//    // 根据 distanceY 设置位置, 还要相对于原来的位置进行设置
//    setTranslateY( tempY )
//  })
//
//  // 在 end 中记录 currentY
//  ul.addEventListener("touchend", function( e ) {
//    currentY += e.changedTouches[0].clientY - startY;
//
//    if ( currentY > 0 ) {
//      // 需要回弹, 需要过渡
//      currentY = 0;
//    }
//
//    if ( currentY < jd_content_left.offsetHeight - ul.offsetHeight ) {
//      currentY = jd_content_left.offsetHeight - ul.offsetHeight;
//    }
//
//    addTransition();
//    setTranslateY( currentY );
//  });
//
//
//  function removeTransition() {
//    ul.style.transition = "none";
//    ul.style.webkitTransition = "none";
//  }
//
//  function setTranslateY( value ) {
//    ul.style.transform = "translateY(" + value +"px)";
//    ul.style.webkitTransform = "translateY(" + value +"px)";
//  }
//
//  function addTransition() {
//    ul.style.transition = "all .5s";
//    ul.style.webkitTransition = "all .5s";
//  }
//
//})();


// 区域滚动的要求
// 1. 必须要有一个父容器, 包着一个子容器
// 2. 子容器必须高度大于父容器
// 3. 只能有一个子容器, 如果子容器多了, 后面的子容器会被忽略
window.addEventListener("load", function() {
  new IScroll(".jd_content_left", {
    // 表示是否启用 横向滚动
    scrollX: false,
    // 表示是否启用 纵向滚动
    scrollY: true
  });

  new IScroll(".jd_content_right")
})


