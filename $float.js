function $float(f) {
	 var sign = "";
	 if($$.iss(f)){
	 	 f = parseFloat(f);
	 }
	 if( isNaN(f)) { 
	 	return {
	 		toFixed : function(){ return "--" ; }
	 	}
	 }
	 if( f < 0 ){
	 		sign = "-";
	 		f = Math.abs(f);
	 }

	 var W = 10000 , Y = 10000 * W , WY = 10000 * Y;
	 var desc = [{value: 1 , unit:""},
	 			 {value: W , unit:"万"},
	 			 {value: Y , unit:"亿"},
	 			 {value: WY, unit:"万亿"}]
	 var v = f ,index = 0;
	 (function(){
	 	 for(var i = 0 ;i < desc.length; i++){
	 	 		var v1 =  f / desc[i].value;
	 	 		if( v1 > 0.999999 ){  // 修正浮点数 / 的不准确问题
	 	 			v = v1;
	 	 			index = i;
	 	 		}else{
	 	 			break;
	 	 		}
	 	 }
	 })();
	 this.toFixed = function(len){
	 	if(isNaN(len)){
	 		len = 2;
	 	}
	 	return sign +""+v.toFixed(len) +" "+desc[index].unit;
	 }
}
