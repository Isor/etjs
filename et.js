/*
	为什么写这个呢 ?  据说 facebook成员觉得用Angularjs不够酷, 然后创造了reactjs. 
	我可以说我在 Angularjs 和 reactjs 中我更喜欢 Angularjs 不？ 
	理由呢？ 我就是想简化下内容生成,用的这么招么?
	所以, 我就自己写了一个啦.
	说明
	   1 Angularjs 和 Reactjs 是mvc的魔法. 我写的只是个简单的小工具.  
	   2 Et  大家就当是童年的小玩具吧.


*/
(function($){
	
	var $param = window.$param = {};
	var $window = window, $location = $window.location;
	var $tos = Object.prototype.toString;
	var $$ = {
		isf :function(func){ 	return $tos.call(func)  === '[object Function]';  },
		isa :function(array){   return $tos.call(array) === '[object Array]'   ;  },
		iso :function(obj){     return $tos.call(obj)   === '[object Object]'  ;  },
		iss :function(str){     return $tos.call(obj)   === '[object String]'  ;  }
	};
	var $assert = function(v, message){
		if(!v) {
			throw (message || "the expression value must be true");
		}
	}
	var Et = { fMaps:{}} , fMaps = Et.fMaps; 


	var $reg = window.$reg = function(path , func){
			$assert($$.iss(path) && $$.isf(func));
			if(fMaps[path]){
				throw 'Controller of "'+path +'" is exist .';
			}
			fMaps[path] = func;
	}

	var $et = window.$et  = {};
	$et.id = function(data,parent,filter){
				$assert($$.iso(data));
				if($$.isf(parent)){
					filter = parent;
					parent = document;
				}				
				for(var i in data ){
					if( data.hasOwnProperty (i) ){						
						var ele = $("#"+i, parent)[0];
						if(!ele){ continue;}
						if(ele.nodeName == "INPUT"){
			 			 		ele.value = data[i];
			 			 }else{
			 			 		ele.innerHTML=data[i];
			 			 }	
					}
				}
	};
	$et.eg=function(data,parent,filter){
				$assert($$.iso(data));
				if($$.isf(parent)){
					filter = parent;
					parent = document;
				}	
				for(var i in data ){
					if(data.hasOwnProperty(i) ){
						var ele = $("[eg-prop="+i+"]",parent)[0];
						if(!ele){ continue;}
						if(ele.nodeName == "INPUT"){
			 			 		ele.value = data[i];
			 			 }else{
			 			 		ele.innerHTML=data[i];
			 			 }	
					}
				}
	};
	$et.list=function(array,target,filter){
			 $assert(target!=null && $$.isa(array));
			 target = $(target)[0];
			 console.log(target);
			 if(!target){ return ;}
			 var template =$("[eg-template]",target)[0];
			 console.log(template);
			 if(template){
			 	for(var i = 0 ; i < array.length ; i++){
			 		var node = template.cloneNode();
			 			node.innerHTML = template.innerHTML;			 	
			 			node.removeAttribute("eg-template");
			 			if(node.style && node.style.display =='none'){ node.style.display="block";}			 			
			 			$et.eg(array[i],node,filter);
			 			target.appendChild(node);			 			
			 	}
			 }
			 
	}

})(window.jQuery);