window.onload=function(){
 	!(function(){
		function $(id){
			return document.getElementById(id);
		}
		
		function ColorSelector(config){
			this.r = config.r || 0;
			this.g = config.g || 0;
			this.b = config.b || 0;
			this.colorListContainer = config.colorListContainer;
			this.colorList = config.colorList || [];
		}
		ColorSelector.prototype = {
			constructor: ColorSelector,
			
			pushColor: function(r, g, b, flag){
				this.r = r || this.r;
				this.g = g || this.g;
				this.b = b || this.b;
				
				flag && (this.colorList.push([this.r, this.g, this.b]));
			},
			//	根据 this.colorList 初始化颜色列表容器
			initList: function(){
				$("color-list").innerHTML = "";
				for(var i = 0, len = this.colorList.length; i < len; i++){
					var li = myjs.newElem("li", null, "rgb(" + this.colorList[i][0] + "," + this.colorList[i][1] + "," + this.colorList[i][2] + ")");
					var after = myjs.newElem("div", "color-list-color");
					after.style.backgroundColor = "rgb(" + this.colorList[i][0] + "," + this.colorList[i][1] + "," + this.colorList[i][2] + ")";
					li.appendChild(after);
					$("color-list").appendChild(li);
				}
			},
			//	根据this.r g b初始化颜色样条（圈）
			initBar: function(){
				myjs.delClass($("temp-color-bar"), "none");
				$("temp-color-bar").style.left = (this.r + 20) + "px";
				$("temp-color-bar").style.top = (this.g + 20) + "px";
				$("temp-color-bar").style.backgroundColor = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
			},
			removeBar: function(){
				myjs.addClass($("temp-color-bar"), "none");
			}
			
		}
		
		var config = {
			r: 0,
			g: 0,
			b: parseInt($("range").value),
			colorListContainer: $("color-list"),
			colorList: []
		}
		
		var color = new ColorSelector(config);
		
		var context = $("canvas").getContext("2d");
		var w = $("canvas").width;
		var h = $("canvas").height;
		
		function linear(g, b){
			var gradient = context.createLinearGradient(0, g, 255, g + 1);
			gradient.addColorStop(0, "rgb(0," + g + "," + b +")");
			gradient.addColorStop(1, "rgb(255," + g + "," + b +")");
			context.fillStyle = gradient;
			context.fillRect(0, g, 255, 1);
		}
		//	初始化colorSelector
		var b = parseInt($("range").value);
		for(var g = 0; g < 256; g++){
			linear(g, b);
		}
		//	b色选择条的始终聚焦
		!(function(){
			$("range").focus();
			$("range").onblur = function(){
				this.focus();
			}
		})();
		
		
		$("range").onchange = function(){
			context.clearRect(0, 0, w, h);
			var b = parseInt(this.value);
			for(var g = 0; g < 256; g++){
				linear(g, b);
			}
			color.pushColor(null, null, b);
			color.initBar();
			$("range-value").innerHTML = b;
		}
		
		
		$("canvas").onmousemove = function(event){
			var e = myjs.getEvent(event);
			var r = e.clientX;
			var g = e.clientY;
			var b = parseInt($("range").value);
			color.pushColor(r, g, b);
			color.initBar();
		}
		$("canvas").onmouseleave = function(){
			color.removeBar();
		}
		$("canvas").onclick = function(event){
			var e = myjs.getEvent(event);
			var r = e.clientX;
			var g = e.clientY;
			var b = parseInt($("range").value);
			color.pushColor(r, g, b, true);
			color.initList();
		}
	})();
	
}


