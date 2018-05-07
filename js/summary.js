$(function(){
    $('#edit').editable({inlineMode: false, alwaysBlank: true})

    function summary(url,message){
	    $.post(url,{context:message},function(res){
	    	alert(res.message);
	    	document.location.reload();
	    },'json')
    }

    $.get('/erpm/experienceAction!getContext.action',function(res){
    	$('.froala-element').html(res.object);
    	$('.froala-element').attr('data-placeholder','');
    	if(res.status){
    		url = '/erpm/experienceAction!modify.action';
    		$('.submit').click(function(){
    		    var context = $('.froala-element').html();
    		    $.get('/erpm/reportAction!downloadPersonReport.action');
    		    summary(url,context);
    		})
    	}else{
    		url = '/erpm/experienceAction!addContext.action';
    		$('.submit').click(function(){
    			var context = $('.froala-element').html();
                $.get('/erpm/reportAction!downloadPersonReport.action');
    			summary(url,context);
    		})
    	}
    },'json')
    
});