(function(jQuery){

		var $$ = document.querySelector;
		var $ = jQuery || (window.$={})
			$.fileUpload = function (prop){

		 			var ele = prop.ele  = ( prop.ele ? prop.ele :  document.querySelector(prop.id));
		 			if(!prop.url ||  !ele.files[0] ){  console.log(ele.files); return ;}
		 			var $prop = {
		 				success :  prop.success || function(){},
		 				error	:  prop.error 	|| function(){},
		 				abort   :  prop.abort   || function(){},
		 				data    :  prop.data    || {},
		 				type    :  prop.type    || "POST",
		 				dataType:  prop.dataType|| "text",
		 				ele     :  prop.ele     || $$(prop.id),
		 				id      :  prop.id      || null,
		 				uploadFileName : prop.uploadFileName || 'file',
		 				url	    : prop.url
		 			}

		 			var $upload_file_name = $prop.uploadFileName;
		 			var data = $prop.data;
		 			var formData  =  new  FormData();
		 				formData.append($upload_file_name , ele.files[0]);
		 				for(var i in data){
		 					if(data.hasOwnProperty(i)){
		 						formData.append(i,data[i]);
		 					}
		 				}
		 			sendRequest($prop,formData);
		 		}

		 		/* XMLHttpRequest 2 */
		 		function sendRequest(prop,formData){

		 			var xhr2 = new XMLHttpRequest();
		 			xhr2.upload.addEventListener("progress",function(v){
		 				 if(prop.progress){
		 				 	prop.progress.call(prop.ele,v);
		 				 }
		 			});

		 			xhr2.addEventListener("load",function(e){
		 				  var target = e.currentTarget || e.target;
		 				  var response = target.response;
		 				  var type = prop.dataType || "text";
		 				  if(type.toLowerCase() == "json"){
		 				  	 response = JSON.parse(response);
		 				  }
		 				  if(prop.success){
		 				  	 prop.success.call(prop.ele,response,target);
		 				  }
		 			});

		 			xhr2.addEventListener("error",function(e){
		 				if(prop.error){
		 					prop.error.call(prop.ele,e);
		 				}
		 			});
		 			xhr2.addEventListener("abort",function(e){
		 				if(prop.abort){
		 					prop.abort.call(prop.ele,e);
		 				}
		 			});
		 			xhr2.open(prop.type,prop.url);
		 			xhr2.send(formData);

		 		}

})(window.jQuery)
