			// 金额格式化
			function fmoney(s, n) {
				if(null == s || undefined == s) {
					return "";
				}
				n = n > 0 && n <= 20 ? n : 2;
				s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
				var l = s.split(".")[0].split("").reverse(),
					r = s.split(".")[1];
				t = "";
				for(i = 0; i < l.length; i++) {
					t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
				}
				return t.split("").reverse().join("") + "." + r;
			};




var echartsCustomerFunction = new Object();

echartsCustomerFunction.parseDate = function(data) {
	// 解析数据对象
//	var arrayTwo = new Array();
	var map = {};
	var obj = data[0];
	for ( var key in obj) {
		var temp = new Array();
		for (var i = 0; i < data.length; i++) {
			temp.push(data[i][key] ? data[i][key] : '-');
		}
		map[key] = temp;
//		arrayTwo.push(temp);
	}
//	return arrayTwo;
	return map;
}

/**
 * 初始化option对象 使用 
 * var myChart = echarts.init(document.getElementById(id)); 
 * var option = initOption(title, legend, xData, yData);
 * myChart.setOption(option);
 * 来展现视图数据
 * 
 * @param title
 *            标题
 * @param legend
 *            图例数组
 * @param xData
 *            X轴坐标数组
 * @param yData
 *            Y轴数据数组
 * @returns option 返回echarts option对象
 */
echartsCustomerFunction.initOption = function(title, legend, xData, yData) {
	var seriesArr = new Array();
	for (var i = 0; i < legend.length; i++) {
		var obj = new Object();
		obj.name = legend[i];
		obj.type = 'bar';
		obj.data = yData[i];
		obj.label = {
//			emphasis : {
//				show : true,
//				position : 'top'
//			}
		},
		// obj.markLine = {
		// data : [{
		// type : 'max',
		// name : '最大值'
		// }, {
		// type : 'min',
		// name : '最小值'
		// }]
		// };
		// obj.markLine = {
		// data : [{
		// type : 'average',
		// name : '平均值'
		// }]
		// };
		seriesArr[i] = obj;
	}
	var option = {
		title : {
			text : title,
			left : 30
		// ,subtext : '截止日期:' + echartsCustomerFunction.now() // '某地区蒸发量和降水量'
		},
		tooltip : {
			trigger : 'axis'
			,formatter : function(params) {
			    var result = params[0].name;
			    params.forEach(function(item) {
			        result += '<br/>';
			        result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
			        result += item.seriesName + ":";
			        if(item.seriesName.indexOf('金额') > -1 || item.seriesName.indexOf('余额') > -1){
			        	result += isNaN(item.value) ? '0.00' : fmoney(item.value, 2);
			        }else{
			        	result += isNaN(item.value) ? '0' : item.value;
			        }
			    });
			    return result;
			}
		},
		legend : {
			data : legend
		// ['蒸发量', '降水量', '降水量1']
		},
		toolbox : {
			show : true,
			feature : {
//				magicType : {
//					show : true,
//					type : ['bar']
//				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			},
			right : 20
		},
		calculable : true,
		xAxis : [{
			type : 'category',
			data : xData
//			,axisLabel:{  
//                interval:1//横轴信息全部显示  
//                rotate:0,//-30度角倾斜显示 
//				formatter:function(val){
//				     return val.split("").join("\n"); //横轴信息文字竖直显示
//				}
//           }
		// ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月', '11月',
		// '12月']
		}],
		yAxis : [{
			type : 'value'
		}],
		series : seriesArr
	}
	return option;
}



