// 为了防止变量之间的互相污染
(function() {

	// 获取元素
	var $carousel = $("#carousel");
	var $imgs = $("#imgs ul li");
	var $circles = $("#circles ol li");
	// 猫腻容器
	var $maoni = $("<li class='maoni'></li>").appendTo($("#imgs ul"));
	// width: 138.33  height: 143.66


	// 当点击叉号的时候， 蒙版淡出效果
	$(".close").click(function() {
		$(this).parent().fadeOut(1000);
	})


	// 当页面刷新的时候， 蒙版添加淡入效果
	$(".mask").eq(0).fadeOut(0).fadeIn(1000);


	// 获取拼图
	// 定义一个数组， 用于存放所有的碎图
	var arr = (function() {
		// 定义一个数组
		var temp = [];
		// 将图片分为3 * 6的格式， 以图片1为例
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 6; j++) {
				temp.push($("<div></div>").css({
					"width": 0,
					"height": 0,
					"background": "url(./images/slider-img1.jpg)" + j * -138.33 + "px " + i * -143.66 + "px",
					"position": "absolute",
					"left": j * 138.33,
					"top": i * 143.66
				}).appendTo($maoni));
			}
		}
		// 返回数组
		return temp;
	})()

	//console.log(arr);

	// 定义小圆点的信号量
	var small_idx = 0;
	// 定义大图的信号量
	var big_idx = 0;

	// 定义锁
	var lock = true;

	// 开启定时器
	var timer = setInterval(function() {
		// 改变小圆点的信号量
		small_idx++;
		// 边界判断
		if (small_idx > $circles.length - 1) {
			// 让small_idx = 0
			small_idx = 0;
		}

		// 执行change
		change.call($circles.eq(small_idx));
	}, 7000);


	// 当鼠标移入carousel的时候清除定时器
	$carousel.mouseenter(function() {
		// 清除定时器
		clearInterval(timer);
	})

	// 当鼠标离开carousel的时候要重新开启定时器
	$carousel.mouseleave(function() {
		// 设表先关
		clearInterval(timer);
		// 重新赋值timer
		timer = setInterval(function() {
		// 改变小圆点的信号量
		small_idx++;
		// 边界判断
		if (small_idx > $circles.length - 1) {
			// 让small_idx = 0
			small_idx = 0;
		}

		// 执行change
		change.call($circles.eq(small_idx));
	}, 7000);
	})

	// 添加点击事件
	$circles.click(change);

	// 定义函数， 用于小圆点事件
	function change() {
		// 函数节流
		if (!lock) {
			return;
		}

		// 把锁关闭
		lock = false;

		// 改变小圆点信号量
		small_idx = $(this).index();
		// console.log(small_idx);

		// 当小圆点的信号量与大图的信号量相等的时候， 什么也不做
		if (small_idx === big_idx) {
			// 把锁打开
			lock = true;
			return;
		}

		// 当前小圆点加上cur
		$(this).addClass("cur").siblings().removeClass("cur");
		// 对应大图信号量的蒙版要淡出
		$(".mask").eq(big_idx).fadeOut(1000);

		// 猫腻图出现，添加active
		$maoni.addClass("active");

		// 轮换猫腻图
		$.each(arr, function(index, value) {
			// value表示每一个div元素
			// console.log(value);
			// 对应小圆点的信号量的图片要出现
			value.css("backgroundImage", "url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
				"width": 138.33,
				"height": 143.66
			}, 300 + Math.random() * 3000);
		})

		// 开启延时器，保证所有的元素动画完毕之后要做的事情
		setTimeout(function() {
			// 当所有的碎图动画完毕出现之后， 碎图消失， 真图要出现
			$.each(arr, function(index, value) {
				value.css({
					"width": 0,
					"height": 0
				})
			})


			// 改变大图的信号量
			big_idx = small_idx;
			// 对应小圆点信号量的大图要出现了
			$imgs.eq(big_idx).addClass("active").siblings().removeClass("active");
			// 对应大图的蒙版添加淡入效果
			$(".mask").eq(big_idx).fadeOut(0).fadeIn(1000);

			// 当所有的事件完毕之后， 开锁
			lock = true;
		}, 3310)

	}
})()