

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
	/* 元素值赋值 */
	var set = $et.set = function(ele,value){
			$assert(ele && ele.nodeName);
			if(ele.nodeName == "INPUT"){
				if(ele.type  == "checkbox" || ele.type == "radio") {
						ele.checked = value ? true : false;	
				}else{
						ele.value = value;
				}				
			}else if(ele.type == "SELECT"){
				var ops = ele.options;
				var values = {};
				for(var i = 0 ;i<op.length; i++){
					values[ops[i].value] = ops[i].index +1 ;
				}
				if(values[value]){
					ele.value = value;
				}
			}else{
				ele.innerHTML = value;
			}
	}
	/* 
		抽取了部分代码,搞了个 类似策略的接口代码.
	*/
	function $etInternal(data,parent,selector, filter){			
			$assert($$.iso(data));
			if($$.isf(parent)){
				filter = parent;
				parent = document;
			}
			if($$.isf(filter)){
				var oldData = data;
					data = filter.call(null,data);
					data = data || oldData;						 
			}		
			for(var i in data ){				
				if( data.hasOwnProperty (i) ){						
					var ele = selector.call(null,i)
					if(!ele){ continue;}
					var valueAfterFilter =  data[i];								
					set(ele , valueAfterFilter);						
				}
			}
	}
	$et.id = function(data,parent,filter){			
			$etInternal(data,parent, function(prop){
				return $("#"+prop, parent)[0];
			},filter);
	};
	$et.eg=function(data,parent,filter){			
			$etInternal(data,parent, function(prop){
				return $("[eg-prop="+prop+"]",parent)[0];
			},filter);
	};
	$et.list=function(array,target,filter){
			 $assert(target!=null && $$.isa(array));
			 target = $(target)[0];
			 console.log(target);
			 if(!target){ return ;}
			 var template =$("[eg-template]",target)[0];
			
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