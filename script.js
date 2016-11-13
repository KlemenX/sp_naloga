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

	$("#resizable").resizable({
	    resize: function(event, ui) {
	        ui.size.height = ui.originalSize.height;
	    }
	});
	$("#resizable").draggable();


});