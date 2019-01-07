function navBar(strData) {
	function doUrl(url) {
		var newurl = "";
		var finance = "";
		if(url != "") {
			var a = url.split('/');
			var b = url.split('.');
			if(a.length == 1) {
				newurl = 'page/' + b[0] + '/' + url
			} else {
				var al = a.length;
				var c = a[al - 1];
				for(var i = 0; i < a.length; i++) {
					if(i < al - 1) {
						finance += a[i] + '/'
					}
				}
				newurl += 'page/' + finance + c
			}
		}
		return newurl;
	}
	var data;
	var pull = '<i class="fa fa-angle-right pull-right"></i>'
	if(typeof(strData) == "string") {
		var data = JSON.parse(strData); //部分用户解析出来的是字符串，转换一下
	} else {
		data = strData;
	};
	data = data.data;
	var ulHtml = "";
	ulHtml += '<ul class="sidebar-menu" style="width:208px">';
	for(var a = 0; a < data.length; a++) {
		ulHtml += '<li class="treeview">'
		ulHtml += '<a href="#">'
		ulHtml += '<i class="fa fa-reorder"></i> <cite>' + data[a].name + '</cite>'
		ulHtml += pull;
		ulHtml += '</a>'
		if(data[a].children != null) {
			var bData = data[a].children
			ulHtml += '<ul class="treeview-menu">';
			for(var b = 0; b < bData.length; b++) {
				ulHtml += '<li class="treeview">'
				ulHtml += '<a href="#" data-url=' + doUrl(bData[b].url) + '>'
				ulHtml += '<i class="fa fa-reorder"></i> <cite>' + bData[b].name + '</cite>'
				if(bData[b].children != null) {
					ulHtml += pull;
					ulHtml += '</a>'
					var cData = bData[b].children;
					ulHtml += '<ul class="treeview-menu">';
					for(var c = 0; c < cData.length; c++) {
						ulHtml += '<li class="treeview">'
						ulHtml += '<a href="#" data-url=' + doUrl(cData[c].url) + '>'
						ulHtml += '<i class="fa fa-reorder"></i> <cite>' + cData[c].name + '</cite>'
						if(cData[c].children != null) {
							ulHtml += pull;
							ulHtml += '</a>'
							var dData = cData[c].children;
							ulHtml += '<ul class="treeview-menu">';
							for(var d = 0; d < dData.length; d++) {
								ulHtml += '<li class="treeview">'
								ulHtml += '<a href="#" data-url=' + doUrl(dData[d].url) + '>'
								ulHtml += '<i class="fa fa-reorder"></i> <cite>' + dData[d].name + '</cite>'
								if(dData[d].children != null) {
									ulHtml += pull;
									ulHtml += '</a>'
									var eData = dData[d].children;
									ulHtml += '<ul class="treeview-menu">';
									
									for(var e = 0; e < eData.length; e++) {
										ulHtml += '<li class="treeview">'
										ulHtml += '<a href="#" data-url=' + doUrl(eData[e].url) + '>'
										ulHtml += '<i class="fa fa-reorder"></i> <cite>' + eData[e].name + '</cite>'
										if(eData[e].children != null){
											ulHtml += pull;
											ulHtml += '</a>'
											var fData = eData[e].children;
											ulHtml += '<ul class="treeview-menu">';
											for(var f = 0; f < fData.length; f++) {
												ulHtml += '<li class="treeview">'
												ulHtml += '<a href="#" data-url=' + doUrl(fData[f].url) + '>'
												ulHtml += '<i class="fa fa-reorder"></i> <cite>' + fData[f].name + '</cite>'
												if(fData[f].children != null){
													ulHtml += pull;
													ulHtml += '</a>'
													var gData = fData[f].children;
													ulHtml += '<ul class="treeview-menu">';
													for(var g = 0; g < gData.length; g++) {
														ulHtml += '<li><a href="#" data-url=' + doUrl(gData[g].url) + '><i class="fa fa-circle-o"></i><cite>' + gData[g].name + '</cite></a></li>';
													}
													ulHtml += '</ul>'
												}
											}
											ulHtml += '</li>';
											ulHtml += '</ul>';
										}
									}

									ulHtml += '</li>';
									ulHtml += '</ul>';
								}

							}

							ulHtml += '</li>';
							ulHtml += '</ul>';
						}

					}
					ulHtml += '</li>';
					ulHtml += '</ul>';
				}

			}

			ulHtml += '</li>';
			ulHtml += '</ul>';
		}
	}

	ulHtml += '</li>';
	ulHtml += '</ul>';

	return ulHtml;
}