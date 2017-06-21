;(function($){
	$.fn.extend({
		"myBanner":function(type){
			var box = this;
			var item = box.children(".item");//获取直接的子元素
			var btnL = box.children(".btn_left");
			var btnR = box.children(".btn_right");
			var w = item.outerWidth();//获取一个item的宽度
			var h = item.outerHeight();//获取一个item的宽度
			var itemList = $("<div class='itemlist'></div>");//创建一个新的div 
			var index = 0;
			var len = item.length;
			if(type == "fade"){
				fadeInit();
				btnR.bind("click",fadeR);
				btnL.bind("click",fadeL);
				autoPlay();
			}else{
				scrollInit()
				btnR.bind("click",scrollR);
				btnL.bind("click",scrollL);
				autoPlay();
			}
			//淡入淡出公共
			function fadeInit(){
				item.css({"display":"none","position":"absolute"});
				item.eq(0).css("display","block");
				var t = h - btnL.outerHeight();
				btnL.css({"position":"absolute","left":"10px","top":t  + "px"});
				btnR.css({"position":"absolute","left":w - 95 + "px","top":t + "px"});
			}
			//点击下一张
			function fadeR(){
				index++;
				if(index > item.length - 1){
					index = 0;
				}
				item.eq(index).fadeIn(500).siblings(".item").fadeOut(500);
				$dot.children().eq(index).addClass("now").siblings().removeClass("now");
			}
			//点击前一张
			function fadeL(){
				index--;
				if(index < 0){
					index = item.length - 1;
				}
				item.eq(index).fadeIn(500).siblings(".item").fadeOut(500);
				$dot.children().eq(index).addClass("now").siblings().removeClass("now");
			}
			
			//点击下一张
			function scrollR(){
				index++;
				if(index > item.length - 1){   //如果索引号大于item的总个数-1时
					index = 0;    //把索引号设置为0
					$(".itemlist").css("left",- w * index + "px"); //同时把left值设置为初始的0
					index++;   //索引号继续进行叠加
				}
				$(".itemlist").stop().animate({"left":- w * index + "px"},500);  //left值改变的动画
				var dotIndex = index;
				if(dotIndex == item.length - 1){
					var dotIndex = 0;
				}
				$dot.children().eq(dotIndex).addClass("now").siblings().removeClass("now");
			}
			//点击上一张
			function scrollL(){
				index--;
				if(index < 0 ){
					index = item.length - 1;
					$(".itemlist").css("left",- w * index + "px");
					index--;
				}
				$(".itemlist").stop().animate({"left":- w * index + "px"},500);
				$dot.children().eq(index).addClass("now").siblings().removeClass("now");
			}
			//改变位移的公共
			function scrollInit(){
				item.wrapAll(itemList);  //把所有的item用新创建的itemlist包裹起来
				var newClone = item.eq(0).clone();//克隆第一个item
				$(".itemlist").append(newClone);   //把新克隆的item追加到itemlist里
				item = box.find(".item");  //修改item 此时找到的item数量已经改变
				var len = item.length;//得到最终item的个数
				$(".itemlist").css({"width":len * w + "px","position":"relative"}); //设置itemlist的width，使他足够盛下所有的item
				item.css("display","inline-block");//让所有的item在一排显示
				box.css("overflow","hidden");
				var t = h - btnL.outerHeight();
				btnL.css({"position":"absolute","left":"10px","top":t / 2 + "px"});
				btnR.css({"position":"absolute","left":w - 95 + "px","top":t / 2 + "px"});
			}
			//自动运行
			function autoPlay(){
				var timer = setInterval(function(){
					btnR.trigger("click");
				},1000);
				box.hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(function(){
						btnR.trigger("click");
					},1000);
				});
			}
			var $dot = $("<div>");
			$dot.attr("id","dot");
			for(var k = 0;k < len;k++){
				var $span = $("<span>");
				$span.css({"width":"24px","height":"6px","background-color":"#ccc","display":"inline-block","margin":"3px"})
				$dot.append($span);
			}
			$dot.children().first().addClass("now");
			var $sW = $span.eq(0).outerWidth();
			var $sH = $span.eq(0).outerHeight();
			$dot.css({"position":"absolute","left":0+"px","top":497+ "px"});//(w - $sW*item.length)/2 h - $sH 
			this.append($dot);
			$dot.children().click(function(){
				var $index = $(this).index();
//				console.log($index)
				index = $index;
				$dot.children().eq(index).addClass("now").siblings().removeClass("now");
				if(type == "fade"){
					item.eq(index).fadeIn(500).siblings(".item").fadeOut(500);
				}else{
					$(".itemlist").stop().animate({"left":- w * index + "px"},500);
				}
			});
		}
	});
})(jQuery);
