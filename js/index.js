//create  by kongjunyao at 2018/11/8

;(function(){
    //找对象
    var header = document.querySelector(".jd_header");
    //注册滚动监听事件
    window.addEventListener('scroll',function(){
        //获取卷曲的高度
        var scrollTop = window.pageYOffset;
        //console.log(scrollTop);
        var opacity = 0;
        //判断卷曲高度  设置透明度
        if( scrollTop > 600){
           opacity = 0.9
        }else{
            opacity = scrollTop / 600 * 0.9
        }
        //将透明度设置给背景色
        header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")"
    })
})();




;(function(){
    //找对象
    var ul = document.querySelector(".seckill_product ul");
    var lis = ul.children;
    var liWidth = lis[0].offsetWidth;

     //ul的宽度 = li的长度 * li的宽度 + px
    ul.style.width = lis.length * liWidth +"px";
})();




;(function(){
    //找对象
    var spans = document.querySelectorAll(".seckill_title .time span:nth-child(2n+1)");
    //首先调用一次setTime
    setTime();
    //设置定时器
    var timer = setInterval( setTime, 1000 );

       //构造函数
    function setTime(){
        //获取当前时间和秒杀时间
        var nowTime = new Date();
        var seckillTime = new Date(2018, 10, 8, 19, 30, 0);
        //计算得到倒计时时间
        var time =  parseInt( (seckillTime - nowTime) /1000 );
         //如果time 为0 则time=0 清除定时器
        if(time <= 0){
            time = 0;
            clearInterval(timer)
        }
        //计算倒计时时间的 时 分 秒
        var hours = parseInt(time / 3600);
        var minutes = parseInt(time / 60 % 60);
        var seconds = parseInt(time %60);

         //将计算得到的时分秒渲染到页面
        spans[0].innerHTML =   addZero(hours);
        spans[1].innerHTML =  addZero(minutes);
        spans[2].innerHTML =  addZero(seconds);



            function addZero(n){
                return n < 10 ? "0" + n : n;
            }
    }
})();



;(function(){
    //找对象
    var ul = document.querySelector(".jd_news .info ul");
    var lis =  ul.children;
    var liHeight = lis[0].offsetHeight;
     //声明一个下标y
    var index =  0;

    setInterval(function(){
        //如果 index  大于等于最后一个  则index=0  清除过渡   清除移动
        if(index >= lis.length -1){
            index = 0;
            ul.style.transition =  "none";
            ul.style.webkitTransition =  "none";

            ul.style.transform =  "translateY(0px)";
            ul.style.webkitTransform =  "translateY(0px)";
        }

        ul.offsetWidth;

        index++;
         //设置过渡和移动
        ul.style.transition =  "all .5s";
        ul.style.webkitTransition =  "all .5s";


        ul.style.transform =  "translateY(-"+ index*liHeight +"px)";
        ul.style.webkitTransform =  "translateY(-"+ index*liHeight +"px)";
    },1000)
})();



//京东轮播图
;(function(){
   //找对象
   var banner = document.querySelector(".jd_banner");

    var ul = banner.querySelector("ul");
    var ol = banner.querySelector("ol");
    var ullis = ul.querySelectorAll("li");
    var ollis = ol.querySelectorAll("li");

    var width =  banner.offsetWidth;

    var index = 1;
    //设置定时器 每隔四秒钟转换一张图片
    var timer = setInterval(function(){
       index++;
       addTransition();
        setTranslateX( -index * width );
    },4000);
    //添加过渡结束时间 如果到达最后一张图片  则瞬间切换到第一张图片
    //如果到达第一张图片则瞬间切换到第一张图片
    ul.addEventListener('transitionend',function(){
        if(index >=  9){
            index = 1;
        }
        if(index <= 0){
          index = ullis.length - 2 ;
        }
        //遍历ollis   给所有的li元素移除类now  给index-1 的li 添加类
        ollis.forEach(function(v){
            v.classList.remove('now');
        });
          ollis[index-1].classList.add('now');
        //移除过渡
        removeTransition();
        //添加移动
        setTranslateX( -index * width );
    }) ;



//添加手指触摸轮播事件
    var startX;
    var startTime;

   //添加手指触摸开始事件
    ul.addEventListener('touchstart',function(e){
        //当触摸开始时关闭定时器
        clearInterval(timer);
        //获取开始触摸点与视口的位置
        startX = e.touches[0].clientX;
        //获取触摸开始的时间
        startTime = new Date();
    });
    //添加手指触摸移动事件
     ul.addEventListener('touchmove',function(e){
         //获取触摸的相对位移
         var distanceX =  e.touches[0].clientX - startX;
         //移除过渡
          removeTransition();
         //设置width
          setTranslateX(-index * width + distanceX);
     }) ;
    //添加手指触摸结束事件
      ul.addEventListener('touchend',function(e){
          //计算触摸事件
          var time = new Date() - startTime;
          //计算触摸过程的相对位移
          //注意touchend事件中 不能用e.touches 因为结束的时候没有手指在屏幕上
          var distanceX =  e.changedTouches[0].clientX - startX;
          //如果相对位移 大于屏幕的 三分之一    或者    触摸时间小于 200毫秒  并且位移大于50px
          if(distanceX > width / 3 || time <= 200 && distanceX > 50){
              index--;
          }
          //相反
          if(distanceX < -width / 3 || time <= 200 && distanceX < -50){
              index++;
          }
           //添加过渡和位移
           addTransition();
           setTranslateX(-index * width );
           //设置定时器
           timer = setInterval(function(){
               index++;
               addTransition();
               setTranslateX(-index * width );
           },4000)
      });
        //给windows添加resize时间  窗口可视区域重置 重新获取width
        window.addEventListener('resize',function(){
            width = banner.offsetWidth;
            removeTransition();
            setTranslateX(-index * width );
        }) ;



    //封装位移函数
    function setTranslateX(value){
        ul.style.transform = "translateX(" + value + "px)";
        ul.style.webkitTransform = "translateX(" + value + "px)";
    }


     //封装添加过渡函数
    function addTransition(){
        ul.style.transition =  "all .5s";
        ul.style.webkitTransition =  "all .5s";
    }
     //封装移除过渡函数
     function removeTransition(){
         ul.style.transition =  "none";
         ul.style.webkitTransition =  "none";
     }

})();

