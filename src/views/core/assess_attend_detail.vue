<template>
  <div style="padding:20px;height:100%;">
    <div
      class = "tableBox"
      style = "background:#fff;padding:5px;"
    >
      <div
        el-col
        span  = "24"
        style = "text-align:left;"
      >
        <el-button
          type   = "primary"
          icon   = "el-icon-back"
          size   = "small"
          @click = "back"
        >返回</el-button>
        <div class="grid-content bg-purple-dark"></div>
      </div>
      <div style="margin-top:10px;">
          签到地图信息展示
          <div style="width:697px;height:550px;border:#ccc solid 1px;" id="dituContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {

    };
  },
  methods: {
    back() {
    //   // 跳转回主页面时，分页会出错，所以回去前要置为空
    //   (this.$store.state.orderNoInfo = ""),
    //     (this.$store.state.selectStatus = ""),
    //     (this.$store.state.appleyUserName = ""),
    //     (this.appleyUserName = null),
    //     (this.$store.state.contactName = ""),
    //     (this.$store.state.idcard = ""),
    //     (this.$store.state.assessNameLike = ""),
    //     (this.$store.state.addressLike = ""),
        this.$router.push({ path: "/assess_attend_count" });
    },



  },
  mounted() {
    //  window.localStorage.getItem('cbrJbId');
    //   this.$axios({
    //       url: `${
    //     this.$store.state.globalRouter
    //   }/auth/ins_user/pagination`,
    //       method: 'get'
    //   }).then(res=>{
    //       console.log(res)
    //   })\
    // 参考原来的展示方法
var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(116.395645,39.929986);//定义一个中心点坐标
        map.centerAndZoom(point,12);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局

// initMap(longitudeIn,latitudeIn,longitudeOut,latitudeOut,attendanceStatusIn,attendanceStatusOut,appointedLongitude,appointedLatidude);//创建和初始化地图
// //标注点数组
// 	    var markerArr;

// 		//创建和初始化地图函数：
// 		function initMap(longitudeIn,latitudeIn,longitudeOut,latitudeOut,attendanceStatusIn,attendanceStatusOut,appointedLongitude,appointedLatidude){
// 			var iconText;
// 			switch(attendanceStatusIn){
// 	    		case "1":
// 	    			iconText = {w:23,h:25,l:0,t:21,x:9,lb:12};
// 	    			break;
// 	    		case "2":
// 	    			iconText = {w:23,h:25,l:46,t:21,x:9,lb:12};
// 	    			break;
// 	    		default:
// 	    			break;
// 	    	}
// 			switch(attendanceStatusOut){
// 				case "1":
// 	    			iconText = {w:23,h:25,l:0,t:21,x:9,lb:12};
// 	    			break;
// 	    		case "2":
// 	    			iconText = {w:23,h:25,l:46,t:21,x:9,lb:12};
// 	    			break;
// 	    		default:
// 	    			break;
// 	    	}
// 			var appointedIconText = {w:23,h:25,l:69,t:21,x:9,lb:12};

// 		    createMap(longitudeIn,latitudeIn,longitudeOut,latitudeOut);//创建地图
// 		    setMapEvent();//设置地图事件
// 		    addMapControl();//向地图添加控件
// 		    if(longitudeIn == longitudeOut && latitudeIn == latitudeOut){
// 		    	//标注点数组
// 			    markerArr = [{title:"签到地址和签出地址",content:"签到地址和签出地址在同一点<br/>经度："+longitudeIn+"<br/>纬度："+latitudeIn,point:longitudeIn+"|"+latitudeIn,isOpen:0,icon:iconText}
// 				 			,{title:"上门地点",content:"经度："+appointedLongitude+"<br/>纬度："+appointedLatidude,point:appointedLongitude+"|"+appointedLatidude,isOpen:0,icon:appointedIconText}
// 				];
// 		    } else {
// 				//标注点数组
// 			    markerArr = [{title:"签到地址",content:"经度："+longitudeIn+"<br/>纬度："+latitudeIn,point:longitudeIn+"|"+latitudeIn,isOpen:0,icon:iconText}
// 				 			,{title:"签出地址",content:"经度："+longitudeOut+"<br/>纬度："+latitudeOut,point:longitudeOut+"|"+latitudeOut,isOpen:0,icon:iconText}
// 				 			,{title:"上门地点",content:"经度："+appointedLongitude+"<br/>纬度："+appointedLatidude,point:appointedLongitude+"|"+appointedLatidude,isOpen:0,icon:appointedIconText}
// 				];
// 		    }
// 		    addMarker();//向地图中添加marker
// 		}

// 		//创建地图函数：
// 		function createMap(longitudeIn,latitudeIn,longitudeOut,latitudeOut){
// 		    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
// 		    var point = new BMap.Point(longitudeIn,latitudeIn);//定义一个中心点坐标
// 		    map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
// 		    window.map = map;//将map变量存储在全局
// 		}

// 		//地图事件设置函数：
// 		function setMapEvent(){
// 		    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
// 		    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
// 		    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
// 		    map.enableKeyboard();//启用键盘上下左右键移动地图
// 		}

// 		 //地图控件添加函数：
// 	    function addMapControl(){
// 	        //向地图中添加缩放控件
// 			var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
// 			map.addControl(ctrl_nav);
// 		}



// 	    //创建marker
// 	    function addMarker(){
// 	        for(var i=0;i<markerArr.length;i++){
// 	            var json = markerArr[i];
// 	            var p0 = json.point.split("|")[0];
// 	            var p1 = json.point.split("|")[1];
// 	            var point = new BMap.Point(p0,p1);
// 				var iconImg = createIcon(json.icon);
// 	            var marker = new BMap.Marker(point,{icon:iconImg});
// 				var iw = createInfoWindow(i);
// 				var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
// 				marker.setLabel(label);
// 	            map.addOverlay(marker);
// 	            label.setStyle({
// 	                        borderColor:"#808080",
// 	                        color:"#333",
// 	                        cursor:"pointer"
// 	            });

// 				(function(){
// 					var index = i;
// 					var _iw = createInfoWindow(i);
// 					var _marker = marker;
// 					_marker.addEventListener("click",function(){
// 					    this.openInfoWindow(_iw);
// 				    });
// 				    _iw.addEventListener("open",function(){
// 					    _marker.getLabel().hide();
// 				    })
// 				    _iw.addEventListener("close",function(){
// 					    _marker.getLabel().show();
// 				    })
// 					label.addEventListener("click",function(){
// 					    _marker.openInfoWindow(_iw);
// 				    })
// 					if(!!json.isOpen){
// 						label.hide();
// 						_marker.openInfoWindow(_iw);
// 					}
// 				})()
// 	        }
// 	    }
// 	    //创建InfoWindow
// 	    function createInfoWindow(i){
// 	        var json = markerArr[i];
// 	        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
// 	        return iw;
// 	    }
// 	    //创建一个Icon
// 	    function createIcon(json){
// 	        var icon = new BMap.Icon("<@sp.ctx />/img/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
// 	        return icon;
// 	    }
  }
};
</script>

<style scoped>

</style>


