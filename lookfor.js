$(document).ready(function() {
	var In = document.getElementById("IN")
	var Inp = In.getElementsByTagName('input')
	
	$.getJSON("public/infor.json", function(data) {
		displayNAME(data)	
	})

//	//改变下拉框的值
//	$("a").click(function() {
//		$("#kind").html(this.innerHTML)
//	});
//	$("#save").click(function() {
//		$.post("./api/writeJson", {
//			"TITLE": Inp[0].value,
//			"ARTIST": Inp[1].value,
//			"COUNTRY": Inp[2].value,
//			"COMPANY": Inp[3].value,
//			"PRICE": Inp[4].value,
//			"YEAR": Inp[5].value,
//
//		}, function(res) {
//			$.getJSON("cd.json", function(res) {
//				displayCD(res)
//			})
//		})
//	})
//	$("#del").click(function() {
//		$.post("./api/delJson", {
//			"TITLE": Inp[0].value,
//		}, function(res) {
//			$.getJSON("cd.json", function(res) {
//				displayCD(res)
//			})
//		});
//	});
	//查询发送
	$("#lookfor").click(function() {
//		if($("#kind").html() == "TITLE") {
			$.post("./api/ooJson", {
				"NAME": $("#find").val()
			},
			function(res) {
				console.log("res");
				//searchNAME(res)
			})
//		} else {
//			$.post("./api/qaJson", {
//				"ARTIST": $("#qcon").val()
//			}, function(res) {
//				searchCD(res)
//			})
//		}

	});

})
//显示函数
function displayNAME(data) {
	var In = document.getElementById("IN")
	var Inp = In.getElementsByTagName('input')
	$("#jsonTip").html("");
	$.each(data, function(infoIndex, info) {
		var details = document.createElement("div"); // 使用 DOM 创建文本 text with DOM
		$("#jsonTip").append(details);
		$(details).addClass('btn btn-primary Cdet')
		details.innerHTML = "NAME：" + info["NAME"];
		$(details).click(function() {
			$("#mymodal").modal("toggle");
			Inp[0].value = info["NAME"]
			Inp[1].value = info["PASSWORD"]
			Inp[2].value = info["TELE"]
			Inp[3].value = info["ADDR"]			
		});
	})
}

//function searchNAME(data) {
//	$("#sear").html("");	
//		
//		var sCon = document.createElement("div"); 
//		$("#sear").append(sCon);
//		$(sCon).css({
//			"display": "block",
//			"width": "400px",		
//		})
//		sCon.innerHTML = "NAME：" + data["NAME"] + "</br>";
//		sCon.innerHTML += "PASSWORD：" +data["PASSWORD"] + "</br>";
//		sCon.innerHTML += "TELE：" + data["TELE"] + "</br>";
//		sCon.innerHTML += "ADDR：" + data["ADDR"] + "</br>";
//}