$(document).ready(function() {
    $('.vstavi-sobo').on('submit', function(e) { //use on if jQuery 1.7+
 		var vpisMerila = document.getElementById('testna_vrednost').value;
 		var dolzinaDoc = document.getElementById("tloris").offsetWidth
 		var dolzinaMerila = document.getElementById("resizable").offsetWidth
 		var pixNaMet =  dolzinaMerila/ vpisMerila;

 		console.log(vpisMerila, dolzinaDoc,dolzinaMerila, pixNaMet);

 		var id = this.id;   	
        e.preventDefault();  //prevent form from submitting
        var data = $("#"+id+" :input").serializeArray();
        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
        console.log(data[0].value);
		var wd = data[1].value;
		var ht = data[2].value;	
		var div=document.createElement("div");
	    div.setAttribute("id","kvadrat"+id);
	    div.setAttribute("class","kvadrat");
	    div.style.width =wd*pixNaMet+"px";
	    div.style.height =ht*pixNaMet+"px";
	    div.innerHTML = div.innerHTML + data[0].value;
	   	$('.palette').append(div);
        $( ".kvadrat" ).draggable();
	});

    $('#izracunBtn').on('click', function(e) { //use on if jQuery 1.7+
    	var st = 1;
    	var vpisMerila = document.getElementById('testna_vrednost').value;
 		var dolzinaMerila = document.getElementById("resizable").offsetWidth
 		var pixNaMet =  dolzinaMerila/ vpisMerila;
 		var wd = 1; var ht = 1;
    	while(document.getElementById('kvadrat'+st)){
			var div=document.createElement("div");
		    div.setAttribute("id","panel"+st);
		    div.setAttribute("class","panel");
		    div.style.width =wd*pixNaMet+"px";
		    div.style.height =ht*pixNaMet+"px";
		    div.innerHTML = div.innerHTML + "700W";
		   	document.getElementById('kvadrat'+st).append(div);
		   	st++;
		$( ".panel" ).draggable();
    	}
    });

    $('.potrdi-meritev').on('submit', function(e) { //use on if jQuery 1.7+
		e.preventDefault();  //prevent form from submitting
        var data1 = $("#vrednost :input").serializeArray();
        //data1[0].value
	});

	$("#uplImg").change(function(e) {

	    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
	        
	        var file = e.originalEvent.srcElement.files[i];
	        
	        var img = document.createElement("img");
	        img.setAttribute("id","tlorisSlika");
	        var reader = new FileReader();
	        reader.onloadend = function() {
	             img.src = reader.result;
	        }
	        reader.readAsDataURL(file);
	        img.style.maxWidth = "100%";
	        img.style.maxHeight = "100%";
	        $("#uplImg").after(img);

	    }
	});
	/*-----TEST
	$('#resizable').draggable({
        revert: 'invalid',
        cursor: 'move'
    });
    $('.content').droppable({
        accept: '#resizable div, .content div',
        drop: function (event, ui) {
            var parent = ui.draggable.parent();
            var draggedElement = $(ui.draggable);
            var dropZone = $(this);

            var leftOffset = Math.abs(parent.offset().left - dropZone.offset().left);
            var topOffset = dropZone.offset().top - parent.offset().top;

            draggedElement.detach().appendTo(dropZone);

            draggedElement.css('left', draggedElement.position().left - leftOffset);
            draggedElement.css('top', draggedElement.position().top - topOffset);

            draggedElement.draggable('option', 'containment', 'parent');
        }

    });
	*/
	/*
	$(function () {
            $("#resizable")
                .resizable({ handles: "all", autoHide: true })
                .parent()
                    .draggable(); 
                size.height = originalSize.height;          
    });
	*/
	/*
	$(function () {
            $("#resizeDiv")
                .resizable({ handles: "all", autoHide: true }).parent().draggable(); 
           	$("#resizeDiv").draggable();      
    });
	$("#resizeDiv").resizable({
	    resize: function(event, ui) {
	        ui.size.height = ui.originalSize.height;

	    }
	});
	*/
	$('.box')
	.resizable({containment: 'parent', 
		handles: "se", create: setContainerResizer, stop:resizeStop, 
		resize: function(event, ui) {
	        ui.size.height = ui.originalSize.height;
	    }})
	.draggable({containment: 'parent', stop:dragStop});

	function resizeStop(event, ui){
	    convert_to_percentage($(this));
	}

	function dragStop(event, ui){
	    convert_to_percentage($(this));
	}

	function setContainerResizer(event, ui) {
	    console.log($(this)[0]);
	    //$($(this)[0]).children('.ui-resizable-handle').mouseover(setContainerSize);
	}

	function convert_to_percentage(el){
	    var parent = el.parent();
	    var visina;
	    if (document.getElementById('tlorisSlika') ){
	    	console.log(document.getElementById('tlorisSlika').height/document.getElementById('tlorisSlika').height);
	    	visinaSlike = document.getElementById('tlorisSlika').height;
	    	visina = parseFloat(el.css('top'))/parent.height()*100.0-2+"%";
	    }
	    else{
	    	visina = parseFloat(el.css('top'))/parent.height()*100.0-2+"%";
	    }
	    el.css({
	        left:parseFloat(el.css('left'))/parent.width()*100.0-2+"%",
	        top: visina,
	        width: el.width()/parent.width()*100.0-1.5+"%",
	        height: el.height()/parent.height()*100.0+"%"
	    });
	    parent.css('height', 'auto');
	}
	
	function setContainerSize(el) {
	    var parent = $(el.target).parent().parent();
	    parent.css('height', parent.height() + "px");

	}
	/*
	function recalc(){
       var width, height;
       width = $('#tlorisSlika').width();
       height = $('#tlorisSlika').height();
       //console.log($(".box").css('top'),$('#tlorisSlika').css('top'),$('#tlorisSlika').height() );
       max = $('#tlorisSlika').height() + $('#tlorisSlika').css('top');
       min = $('#tlorisSlika').css('top');
       pos = $(".box").css('top');
       visina = pos/height* height;
       console.log(pos,visina);
       $(".box").css({"position":"absolute","top": visina + "px"});
       //$("#foo").css({"position":"absolute","top": width + "px"});

    }

    $(window).load(function(){ recalc();});

    $(window).resize(function () { recalc();});

	*/


	var resizeTime = 100;     // total duration of the resize effect, 0 is instant
	var resizeDelay = 100;    // time to wait before checking the window size again
	                          // the shorter the time, the more reactive it will be.
	                          // short or 0 times could cause problems with old browsers.
	                          
	$('img').mapster({
	    mapKey: 'state'
	});

	// Resize the map to fit within the boundaries provided

	function resize(maxWidth,maxHeight) {
	     var image =  $('img'),
	        imgWidth = image.width(),
	        imgHeight = image.height(),
	        newWidth=0,
	        newHeight=0;

	    if (imgWidth/maxWidth>imgHeight/maxHeight) {
	        newWidth = maxWidth;
	    } else {
	        newHeight = maxHeight;
	    }
	    image.mapster('resize',newWidth,newHeight,resizeTime);   
	}

	// Track window resizing events, but only actually call the map resize when the
	// window isn't being resized any more

	function onWindowResize() {
	    
	    var curWidth = $(window).width(),
	        curHeight = $(window).height(),
	        checking=false;
	    if (checking) {
	        return;
	            }
	    checking = true;
	    window.setTimeout(function() {
	        var newWidth = $(window).width(),
	           newHeight = $(window).height();
	        if (newWidth === curWidth &&
	            newHeight === curHeight) {
	            resize(newWidth,newHeight); 
	        }
	        checking=false;
	    },resizeDelay );
	}

	$(window).bind('resize',onWindowResize);



	
	/* Debug Info 
	var myVar=setInterval(function(){
	    $('.info').html('LEFT : '+$('.box')[0].style.left + '<br />TOP:  '+$('.box')[0].style.top + '<br />WIDTH: '+$('.box')[0].style.width + '<br />HEIGHT: '+$('.box')[0].style.height);
	},10);
	/*
	$("#resizable").resizable({
	    resize: function(event, ui) {
	        //ui.size.height = ui.originalSize.height;
	    }
	});
	*/
	//$("#resizable").draggable();


});