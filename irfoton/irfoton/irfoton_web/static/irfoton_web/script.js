document.addEventListener("DOMContentLoaded", function() {

	//document.getElementById("vstavi-sobo").addEventListener("submit", novaSoba);
	document.getElementById("izracunBtn").addEventListener("click", izracunPanelov);
	document.getElementById("toggle").addEventListener("click", toggleMenu);
	document.getElementById("uplImg").addEventListener("change", naloziSliko);
	window.addEventListener("resize", toggleOnResize, true);
	document.getElementById("saveImgButton").addEventListener("click", shraniWebcam);
	document.getElementById("camOnButton").addEventListener("click",odpriWebcam);
	document.getElementById('tloris-div').addEventListener('mousedown', deleteSobaData, false);
	
	startIzris();
	//izracunPanelov();
	var trenutnaSoba;
	function startIzris() {
 		var vpisMerila = document.getElementById('meritev').value;
 		var dolzinaDoc = document.getElementById("tloris-div").offsetWidth;
  		var visinaDoc = document.getElementById("tloris-div").offsetHeight;	
 		var dolzinaMerila = document.getElementById("merilo").offsetWidth;
 		var pixNaMet = merilo*dolzinaDoc; 
 		var procentMerila = dolzinaMerila/dolzinaDoc;
 		if(merilo>0){
 			document.getElementById('meritev').value =  (procentMerila/merilo).toFixed(2);
 		}
 		for(var i = 0; i<sobe.length;i++){
			var wd = sobe[i].width;
			var ht = sobe[i].height;
			var stene = sobe[i].zun_stene;		
			var namembnost = sobe[i].namembnost;
			var div=document.createElement("div");
		    div.setAttribute("id","kvadrat"+i);
		    div.setAttribute("id_soba",sobe[i].id);	    
		    div.setAttribute("class","kvadrat");
		    div.setAttribute("imeSobe",sobe[i].ime);
		    div.setAttribute("visina",ht);
		   	div.setAttribute("sirina",wd);
		   	div.setAttribute("stevilo_sten",stene);
		   	div.setAttribute("namembnost",namembnost);
		   	div.style.position ="absolute";
		    div.style.width =wd * pixNaMet+"px";
		    div.style.height =ht * pixNaMet+"px";
		    var top = sobe[i].pos_y * visinaDoc
		    var left = sobe[i].pos_x * dolzinaDoc
		    div.style.top = top +"px";
			div.style.left = left +"px";
		    div.innerHTML = div.innerHTML + sobe[i].ime;
		   	$('#tloris-div').append(div);
		   	convert_to_percentageKvadrat($('#kvadrat'+i));
		   	document.getElementById('kvadrat'+i).addEventListener('mousedown', getSobaData, false);
		   	$('#kvadrat'+i).draggable({containment: 'parent', stop:dragStopKvadrat});
		}
	}

	okrajsavaTexta();

	$("#merilo")
	.resizable({containment: 'parent',handles: "se",stop:resizeStop,resize: function(event, ui) {
		        ui.size.height = ui.originalSize.height;
		    }})
	.draggable({containment: 'parent', stop:dragStop})


	function okrajsavaTexta() {
    	if(document.documentElement.clientWidth>600){
			document.getElementById("st-sten-text").innerHTML = "Število zunanjih sten:";
		}
		else{
			document.getElementById("st-sten-text").innerHTML = "Št. zunanjih sten:";
		}
	}
$('#vstavi-sobo').submit(function(e) {
		e.preventDefault();
		var div=document.createElement("div");
		if(e.originalEvent.explicitOriginalTarget){
			console.log(e.originalEvent.explicitOriginalTarget.id);
			var id = e.originalEvent.explicitOriginalTarget.id;
		}
		else{
			console.log($(document.activeElement.id).selector);
			var id = $(document.activeElement.id).selector;
		}
		if (id == "shraniBtn") {
	 		var stKvadratov=1;
	    	while(document.getElementById('kvadrat'+stKvadratov)){
	    		stKvadratov+=1;
	    	}
	 		var vpisMerila = document.getElementById('meritev').value;
	 		var dolzinaDoc = document.getElementById("tloris-div").offsetWidth;
	 		var dolzinaMerila = document.getElementById("merilo").offsetWidth;
	 		var procentMerila = dolzinaMerila/dolzinaDoc;
	 		var ProcentNaMet = procentMerila/vpisMerila;
	 		var pixNaMet =  ProcentNaMet*dolzinaDoc; 	
	 		var id = this.id;
			var btn = $(this).find("input[type=submit]:focus");  
	 		console.log(btn);
	 		console.log($(document.activeElement.id).selector);
	        var data = $("#"+id+" :input").serializeArray();
	        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
	        console.log($('#imeSobe').val());
			var wd = $('#merax1').val();
			var ht = $('#meray1').val();
			var stene = $('#ststen1').val();		
			var namembnost = $('#namembnost1').val();	
		    div.setAttribute("id","kvadrat"+stKvadratov);
		    div.setAttribute("class","kvadrat");
		    div.setAttribute("imeSobe",$('#imeSobe').val());
		    div.setAttribute("visina",ht);
		   	div.setAttribute("sirina",wd);
		   	div.setAttribute("stevilo_sten",stene);
		   	div.setAttribute("namembnost",namembnost);
		   	div.style.position ="absolute";
		    div.style.width =wd*pixNaMet+"px";
		    div.style.height =ht*pixNaMet+"px";
		    div.style.top =20+"px";
			div.style.left =20+"px";
		    div.innerHTML = div.innerHTML + $('#imeSobe').val();
		   	$('#tloris-div').append(div);
		   	convert_to_percentageKvadrat($('#kvadrat'+stKvadratov));
		   	document.getElementById('kvadrat'+stKvadratov).addEventListener('mousedown', getSobaData, false);
		   	$('#kvadrat'+stKvadratov).draggable({containment: 'parent', stop:dragStopKvadrat});
		}
		if (id == "posodobiBtn") {
			var div = document.getElementById(trenutnaSoba);
			var vpisMerila = document.getElementById('meritev').value;
	 		var dolzinaDoc = document.getElementById("tloris-div").offsetWidth;
	 		var dolzinaMerila = document.getElementById("merilo").offsetWidth;
	 		var procentMerila = dolzinaMerila/dolzinaDoc;
	 		var ProcentNaMet = procentMerila/vpisMerila;
	 		var pixNaMet =  ProcentNaMet*dolzinaDoc; 	
	        console.log($('#imeSobe').val());
			var wd = $('#merax1').val();
			var ht = $('#meray1').val();
			var stene = $('#ststen1').val();		
			var namembnost = $('#namembnost1').val();	
		    div.setAttribute("class","kvadrat");
		    div.setAttribute("imeSobe",$('#imeSobe').val());
		    div.setAttribute("visina",ht);
		   	div.setAttribute("sirina",wd);
		   	div.setAttribute("stevilo_sten",stene);
		   	div.setAttribute("namembnost",namembnost);
		   	div.style.position ="absolute";
		    div.style.width =wd*pixNaMet+"px";
		    div.style.height =ht*pixNaMet+"px";
		    div.innerHTML = $('#imeSobe').val();
		   	convert_to_percentageKvadrat($('#kvadrat'+stKvadratov));		
		}
	   	update_soba(e,div);
});
	function update_soba(e,div) {
		if(e.originalEvent.explicitOriginalTarget){
			console.log(e.originalEvent.explicitOriginalTarget.id);
			var id = e.originalEvent.explicitOriginalTarget.id;
		}
		else{
			console.log($(document.activeElement.id).selector);
			var id = $(document.activeElement.id).selector;
		}		
		var vpisMerila = document.getElementById('meritev').value;
 		var dolzinaDoc = document.getElementById("tloris-div").offsetWidth;
 		var dolzinaMerila = document.getElementById("merilo").offsetWidth;
 		var procentMerila = dolzinaMerila/dolzinaDoc/vpisMerila;
		if (id == "shraniBtn") {
		    $.ajax({
		    	url : url, // the endpoint
		        type : "POST", // http method
		        data : { 
		        	ime : $('#imeSobe').val(),
		        	sirina : $('#merax1').val(),
		        	visina : $('#meray1').val(),
		        	st_sten : $('#ststen1').val(),
		        	namembnost : $('#namembnost1').val(),
		        	merilo: procentMerila,
		        	csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		        }, // data sent with the post request
		        cache:false,
	    		dataType: "json",

		        // handle a successful response
		        success : function(resp) {
					div.setAttribute("id_soba",resp.id);	    
		        },

		        // handle a non-successful response
		        error : function(xhr,errmsg,err) {
		            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
		        }
		    });
		} else if (id == "posodobiBtn") {
		    $.ajax({
		    	url : url_posodobi, // the endpoint
		        type : "POST", // http method
		        data : { 
		        	id: document.getElementById(trenutnaSoba).getAttribute("id_soba"),
		        	ime : $('#imeSobe').val(),
		        	sirina : $('#merax1').val(),
		        	visina : $('#meray1').val(),
		        	st_sten : $('#ststen1').val(),
		        	namembnost : $('#namembnost1').val(),
		        	csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		        }, // data sent with the post request
		        cache:false,
	    		dataType: "json",

		        // handle a successful response
		        success : function(resp) {
					//div.setAttribute("id_soba",resp.id);	    
		        },

		        // handle a non-successful response
		        error : function(xhr,errmsg,err) {
		            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
		        }
		    }); 
		}else if (id == "izbrisiBtn") {
		    $.ajax({
		    	url : url_izbrisi, // the endpoint
		        type : "POST", // http method
		        data : { 
		        	id: document.getElementById(trenutnaSoba).getAttribute("id_soba"),
		        	csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		        }, // data sent with the post request
		        cache:false,
	    		dataType: "json",

		        // handle a successful response
		        success : function(resp) {
		        },

		        // handle a non-successful response
		        error : function(xhr,errmsg,err) {
		            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
		        }
		    });
		$("#"+trenutnaSoba).remove();
		}else {
		    //no button pressed
		}
		
	};

	function getSobaData(el){        
		trenutnaSoba = this.id;
		console.log(trenutnaSoba);
 		var stKvadratov=0;
    	while(document.getElementById('kvadrat'+stKvadratov)){
    		document.getElementById('kvadrat'+stKvadratov).style.backgroundColor= "rgba(250,30,30,0.5)";
    		stKvadratov+=1;
    	}	

    	//document.getElementById("form-button").value="Ustvari novo "+ document.getElementById(this.id).getAttribute("imeSobe");
    	document.getElementById("posodobiBtn").value="Posodobi "+ document.getElementById(this.id).getAttribute("imeSobe");
    	document.getElementById("posodobiBtn").disabled = false;    	
    	document.getElementById("izbrisiBtn").value="Izbriši "+ document.getElementById(this.id).getAttribute("imeSobe");
    	document.getElementById("izbrisiBtn").disabled = false; 
		document.getElementById(this.id).style.backgroundColor = "rgba(250,20,20,0.8)";
	    document.getElementById('imeSobe').value = document.getElementById(this.id).getAttribute("imeSobe");
	    document.getElementById('merax1').value = document.getElementById(this.id).getAttribute("sirina");
	    document.getElementById('meray1').value = document.getElementById(this.id).getAttribute("visina");
	    document.getElementById('ststen1').value = document.getElementById(this.id).getAttribute("stevilo_sten");
	   	document.getElementById('namembnost1').value = document.getElementById(this.id).getAttribute("namembnost");
	}

	function deleteSobaData(el){
		if (el.target == this) { 
			trenutnaSoba = null;
	 		var stKvadratov=0;
	    	while(document.getElementById('kvadrat'+stKvadratov)){
	    		document.getElementById('kvadrat'+stKvadratov).style.backgroundColor= "rgba(250,30,30,0.5)";
	    		stKvadratov+=1;
	    	}	

	    	//document.getElementById("form-button").value="Ustvari novo "+ document.getElementById(this.id).getAttribute("imeSobe");
	    	document.getElementById("posodobiBtn").value="Posodobi sobo";
	    	document.getElementById("posodobiBtn").disabled = true;    	
	    	document.getElementById("izbrisiBtn").value="Izbriši sobo";
	    	document.getElementById("izbrisiBtn").disabled = true; 
		    document.getElementById('imeSobe').value = "";
		    document.getElementById('merax1').value = "";
		    document.getElementById('meray1').value = "";
		    document.getElementById('ststen1').value = "";
		   	document.getElementById('namembnost1').value = "";
		}
	}
  	function izracunPanelov(e){

		$("div.panel").remove();
	
    	var vpisMerila = document.getElementById('meritev').value;
 		var dolzinaMerila = document.getElementById("merilo").offsetWidth
 		var pixNaMet =  dolzinaMerila/ vpisMerila;
 		st = 0;
 		var wd = 0.8; var ht = 1.2;
 		var stPanelov = 0
    	while(document.getElementById('kvadrat'+st)){
    		var namembnostText = document.getElementById('kvadrat'+st).getAttribute("namembnost");
    		var namembnost = faktorNamembnosti(namembnostText);
    		console.log(namembnost);
    		var montazna_moc = 
    		namembnost * parseFloat(izolacija_sten) * parseFloat(izolacija_tal) *
    		parseFloat(nacin_montaze) * parseFloat(temp_primankljaj) * parseFloat(visina_stropa) *
    		parseFloat(document.getElementById('kvadrat'+st).getAttribute("visina")) *    		
    		parseFloat(document.getElementById('kvadrat'+st).getAttribute("sirina")) *
    		faktorSten(parseFloat(document.getElementById('kvadrat'+st).getAttribute("stevilo_sten")));
    		console.log(montazna_moc);
    		var rezultat = priporociPanele(montazna_moc);
    		console.log(rezultat.tip, rezultat.st);
    		var orientacija = ($('#kvadrat'+st).width() > $('#kvadrat'+st).height() ) ? 1 : 0;
 			for(var i = 0; i<rezultat.st ;i++){
				var div=document.createElement("div");
			    div.setAttribute("id","panel"+stPanelov);
			    div.setAttribute("moc",rezultat.tip);			    
			    div.setAttribute("class","panel");
			    console.log(orientacija, $('#kvadrat'+st).height(), $('#kvadrat'+st).width(), rezultat.st, rezultat.tip, paneli, i, pixNaMet);
				var pozicija = pozicijaPanelov(orientacija, $('#kvadrat'+st).height(), $('#kvadrat'+st).width(), rezultat.st, rezultat.tip, paneli, i, pixNaMet);
				console.log(pozicija.width,pozicija.height,pozicija.top,pozicija.left);
				div.style.width = pozicija.width +"px";
			    div.style.height = pozicija.height +"px";
			    div.style.top = pozicija.top +"px";
			    div.style.left = pozicija.left +"px";		    
			    div.style.position ="absolute";
			    div.innerHTML = div.innerHTML + rezultat.tip + "W";
			   	$('#kvadrat'+st).append(div);
			   	convert_to_percentagePanel($('#panel'+stPanelov));
			   	$('#panel'+stPanelov).draggable({containment: 'parent', stop:dragStopPanel});
			   	stPanelov++;
			}
		st++;
    	}
	}  

	function pozicijaPanelov(orientacija, visina_soba, sirina_soba, st_panelov, tip, paneli, st, pixNaMet){
		var sirina_panel, visina_panel, top, left;
		if (st_panelov==1){
			//ce je vodoravna soba
			if (orientacija==1){
				sirina_panel = paneli[tip].height*pixNaMet;
				visina_panel = paneli[tip].width*pixNaMet;	
				top =(visina_soba - paneli[tip].width*pixNaMet)/2.0;
				left =(sirina_soba - paneli[tip].height*pixNaMet)/2.0;			
			}
			//ce je navpicna soba
			if (orientacija==0){
				sirina_panel = paneli[tip].width*pixNaMet;
				visina_panel = paneli[tip].height*pixNaMet;	
				top =(visina_soba - paneli[tip].height*pixNaMet)/2.0;
				left =(sirina_soba - paneli[tip].width*pixNaMet)/2.0;				
			}
		}
		if (st_panelov==2){
			//ce je vodoravna soba
			if (orientacija==1){
				sirina_panel = paneli[tip].width*pixNaMet;
				visina_panel = paneli[tip].height*pixNaMet;	
				top =(visina_soba - paneli[tip].height*pixNaMet)/2.0;
				left = (st+1)*sirina_soba/3.0 - paneli[tip].width*pixNaMet/2.0;		
			}
			//ce je navpicna soba
			if (orientacija==0){
				sirina_panel = paneli[tip].height*pixNaMet;
				visina_panel = paneli[tip].width*pixNaMet;	
				top = (st+1)*visina_soba/3.0 - paneli[tip].width*pixNaMet/2.0;
				left = (sirina_soba - paneli[tip].height*pixNaMet)/2.0;					
			}
		}
		if (st_panelov==3){
			//ce je vodoravna soba
			if (orientacija==1){
				sirina_panel = paneli[tip].width*pixNaMet;
				visina_panel = paneli[tip].height*pixNaMet;	
				top =(visina_soba - paneli[tip].height*pixNaMet)/2.0;
				left = (st+1)*sirina_soba/4.0 - paneli[tip].width*pixNaMet/2.0;		
			}
			//ce je navpicna soba
			if (orientacija==0){
				sirina_panel = paneli[tip].height*pixNaMet;
				visina_panel = paneli[tip].width*pixNaMet;	
				top = (st+1)*visina_soba/4.0 - paneli[tip].width*pixNaMet/2.0;
				left = (sirina_soba - paneli[tip].height*pixNaMet)/2.0;					
			}
		}		
		if (st_panelov==4){
			//ce je vodoravna soba
			if (orientacija==1){
				sirina_panel = paneli[tip].height*pixNaMet;
				visina_panel = paneli[tip].width*pixNaMet;	
				if (st < 2){
					top = (st+1)*visina_soba/3.0 - paneli[tip].width*pixNaMet/2.0;
					left = 1*sirina_soba/3.0 - paneli[tip].height*pixNaMet/2.0;	
				}
				else{
					top = (st-1)*visina_soba/3.0 - paneli[tip].width*pixNaMet/2.0;
					left = 2*sirina_soba/3.0 - paneli[tip].height*pixNaMet/2.0;	
				}	
			}
			//ce je navpicna soba
			if (orientacija==0){
				sirina_panel = paneli[tip].width*pixNaMet;
				visina_panel = paneli[tip].height*pixNaMet;	
				if (st < 2){
					top = 1*visina_soba/4.0 - paneli[tip].height*pixNaMet/2.0;
					left = (2*(st+1)-1)*sirina_soba/4.0 - paneli[tip].width*pixNaMet/2.0;					
				}
				else{
					top = 3*visina_soba/4.0 - paneli[tip].height*pixNaMet/2.0;
					left = (2*(st-1)-1)*sirina_soba/4.0 - paneli[tip].width*pixNaMet/2.0;					
				}
			}
		}
		return {
			width: sirina_panel,
			height: visina_panel,
			top: top,
			left: left,
		};
	}

	function faktorSten(st_sten){
		var faktor;
		switch(st_sten) {
		    case 0:
		        faktor = 0.9;
		        break;
		    case 1:
		        faktor = 1;
		        break;
		    case 2:
		        faktor = 1.1;
		        break;
		    case 3:
		        faktor = 1.2;
		        break;
		    case 4:
		        faktor = 1.3;
		        break;	        
		    default:
		        faktor = 1;
		}
		return faktor;
	}

	function faktorNamembnosti(namembnost){
		var faktor;
		switch(namembnost) {
		    case 'spalnica':
		        faktor = 24;
		        break;
		    case 'hodnik':
		        faktor = 24;
		        break;
		    case 'dnevna_soba':
		        faktor = 28;
		        break;
		    case 'delovna_soba':
		        faktor = 28;
		        break;
		    case 'kuhinja':
		        faktor = 28;
		        break;
		    case 'kopalnica':
		        faktor = 36;
		        break;		        
		    default:
		        faktor = 28;
		}
		return faktor;
	}	
	function priporociPanele(montazna_moc){
		//-600, 225-700 245-900, 265-1200
		var tip; var st
		//STROP DO 225CM ---> max 600W
		if (visina_stropa<2.15){
			if (montazna_moc<200){
				tip = 200; st = 1;
			}
			else if (montazna_moc<330){		
				tip = 330; st = 1;
			}
			else if (montazna_moc<360){		
				tip = 360; st = 1;
			}
			else if (montazna_moc<600){		
				tip = 600; st = 1;
			}
			else if (montazna_moc<1200){		
				tip = 600; st = 2;
			}
			else if (montazna_moc<1800){		
				tip = 600; st = 3;
			}
			else if (montazna_moc<2400){		
				tip = 600; st = 4;
			}
			else {		
				tip = 600; st = 5;
			}
		}
		//STROP DO 245CM ---> max 720W
		else if (visina_stropa<2.55){
			if (montazna_moc<200){
				tip = 200; st = 1;
			}
			else if (montazna_moc<330){		
				tip = 330; st = 1;
			}
			else if (montazna_moc<360){		
				tip = 360; st = 1;
			}
			else if (montazna_moc<600){		
				tip = 600; st = 1;
			}
			else if (montazna_moc<720){		
				tip = 720; st = 1;
			}
			else if (montazna_moc<1200){		
				tip = 600; st = 2;
			}
			else if (montazna_moc<1450){		
				tip = 720; st = 2;
			}
			else if (montazna_moc<1800){		
				tip = 600; st = 3;
			}
			else if (montazna_moc<2170){		
				tip = 720; st = 3;
			}
			else if (montazna_moc<2400){		
				tip = 600; st = 3;
			}
			else if (montazna_moc<2800){		
				tip = 720; st = 3;
			}
			else if (montazna_moc<3100){		
				tip = 600; st = 4;
			}
			else {		
				tip = 720; st = 4;
			}
		}
		//STROP DO 265CM ---> max 900W
		else if (visina_stropa<2.75){
			if (montazna_moc<200){
				tip = 200; st = 1;
			}
			else if (montazna_moc<330){		
				tip = 330; st = 1;
			}
			else if (montazna_moc<360){		
				tip = 360; st = 1;
			}
			else if (montazna_moc<600){		
				tip = 600; st = 1;
			}
			else if (montazna_moc<720){		
				tip = 720; st = 1;
			}
			else if (montazna_moc<960){		
				tip = 960; st = 1;
			}
			else if (montazna_moc<1200){		
				tip = 600; st = 2;
			}
			else if (montazna_moc<1450){		
				tip = 720; st = 2;
			}		
			else if (montazna_moc<1850){		
				tip = 960; st = 2;
			}
			else if (montazna_moc<2170){		
				tip = 720; st = 3;
			}
			else if (montazna_moc<2400){		
				tip = 600; st = 4;
			}
			else if (montazna_moc<2880){		
				tip = 960; st = 3;
			}
			else if (montazna_moc<3840){		
				tip = 960; st = 4;
			}
			else {		
				tip = 960; st = 5;
			}
		}
		//visji 265CM---> max 1200W
		else if (visina_stropa>=2.75){
			if (montazna_moc<200){
				tip = 200; st = 1;
			}
			else if (montazna_moc<330){		
				tip = 330; st = 1;
			}
			else if (montazna_moc<360){		
				tip = 360; st = 1;
			}
			else if (montazna_moc<600){		
				tip = 600; st = 1;
			}
			else if (montazna_moc<720){		
				tip = 720; st = 1;
			}
			else if (montazna_moc<960){		
				tip = 960; st = 1;
			}
			else if (montazna_moc<1200){		
				tip = 1200; st = 1;
			}
			else if (montazna_moc<1450){		
				tip = 720; st = 2;
			}
			else if (montazna_moc<1920){		
				tip = 960; st = 2;
			}
			else if (montazna_moc<2400){		
				tip = 1200; st = 2;
			}
			else if (montazna_moc<2880){		
				tip = 960; st = 3;
			}
			else if (montazna_moc<3600){		
				tip = 1200; st = 3;
			}
			else if (montazna_moc<4800){		
				tip = 1200; st = 4;
			}
			else {		
				tip = 1200; st = 5;
			}
		}
		return {
			tip: tip,
			st: st
		};
	}

	function toggleMenu(e){
		var elem = document.getElementById("sobeDiv");
		console.log(parseInt(getComputedStyle(elem).getPropertyValue("margin-left")));
		if (parseInt(getComputedStyle(elem).getPropertyValue("margin-left"))==0){
			document.getElementById("sobeDiv").style.marginLeft=-160 +"px";
		}
		else{
			document.getElementById("sobeDiv").style.marginLeft=0+"px";
		}
	}

	function naloziSliko(e){
	    for (var i = 0; i < e.srcElement.files.length; i++) {
	        
	        var file = e.srcElement.files[i];

	        var reader = new FileReader();
	        reader.onloadend = function() {
	             document.getElementById('tloris-hidden').src=reader.result;
	             document.getElementById('tloris-div').style.backgroundImage='url('+reader.result+')';	             
	             //console.log(reader.result);
	        }
	        reader.readAsDataURL(file);
	    }		
	}

	function resizeStop(event, ui){
	    convert_to_percentage($(this));
	}

	function dragStop(event, ui){
	    convert_to_percentage($(this));
	    shraniPozicijo($(this));
	}

	function shraniPozicijo(el) {
		/*
		var dolzinaDoc = document.getElementById("tloris-div").offsetWidth;
		var visinaDoc = document.getElementById("tloris-div").offsetHeight;		
		console.log(parseInt(el.css('left'))/dolzinaDoc ,parseInt(el.css('top'))/visinaDoc)
		console.log(parseFloat(el[0].style.top)/100, parseFloat(el[0].style.left)/100);
		*/
		console.log(el.attr("id_soba"));
		
	    $.ajax({
	    	url : url_update, // the endpoint
	        type : "POST", // http method
	        data : { 
	        	id_soba: el.attr("id_soba"),
	        	pos_x : parseFloat(el[0].style.left)/100,
	        	pos_y : parseFloat(el[0].style.top)/100,
	        }, // data sent with the post request

	        // handle a successful response
	        success : function(json) {
				console.log("success");
	        },

	        // handle a non-successful response
	        error : function(xhr,errmsg,err) {
	            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	        }
	    });
		
	};

	function convert_to_percentage(el){
	    var parent = el.parent();
	    console.log(parseInt(el.css('left')),parent.width());
	    el.css({
	        left:parseInt(el.css('left'))/(parent.width()-0.0)*100.0+"%",
	        top: parseInt(el.css('top'))/(parent.height()-0.0)*100.0+"%",
	        width: (el.width()+6)/(parent.width())*100.0+"%",
	        height: (el.height())/(parent.height()+0.0)*100.0+"%"
	    });
	}

	function dragStopKvadrat(event, ui){
	    convert_to_percentageKvadrat($(this));
	    shraniPozicijo($(this));
	}
	function dragStopPanel(event, ui){
	    convert_to_percentagePanel($(this));
	}
	function convert_to_percentageKvadrat(el){
	    var parent = el.parent();
	    console.log(parseInt(el.css('left')),parent.width());
	    el.css({
	        left:parseInt(el.css('left'))/(parent.width()-0.0)*100.0+"%",
	        top: (parseInt(el.css('top'))+1)/(parent.height()-0.0)*100.0+"%",
	        width: (el.width()+4)/(parent.width())*100.0+"%",
	        height: (el.height()+4)/(parent.height()+0.0)*100.0+"%"
	    });
	}

	function convert_to_percentagePanel(el){
	    var parent = el.parent();
	    console.log(parseInt(el.css('left')),parent.width());
	    el.css({
	        left:parseInt(el.css('left'))/(parent.width()-0.0)*100.0+"%",
	        top: (parseInt(el.css('top'))+1)/(parent.height()-0.0)*100.0+"%",
	        width: (el.width()+4)/(parent.width())*100.0+"%",
	        height: (el.height()+4)/(parent.height()+0.0)*100.0+"%"
	    });
	}

	 function odpriWebcam(){

	 	var vidObj = document.getElementById("videoEle");

		errCallBack = function(error) {	// Video Error Handler 	
		console.log("Video  error: ", error.code); 
		};
		
		if(navigator.getUserMedia) { // Standard
				navigator.getUserMedia({"video": true }, function(stream) {
					vidObj.src = stream;
					vidObj.play();
				}, errCallBack);
		} else if(navigator.webkitGetUserMedia) { // For  Chrome
			/*
			console.log("a");
				document.getElementById("videoDiv").style.visibility="visible";
				var video = document.querySelector('video');
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
				navigator.oGetUserMedia;
				navigator.getUserMedia({video:true},handleVideo, videoError);
			*/
			alert("Video zajem ni podprt v tem brskalniku.")

		}
		else if(navigator.mozGetUserMedia) { // For Firefox
				console.log("b");
				document.getElementById("videoDiv").style.visibility="visible";
				navigator.mozGetUserMedia({ "video": true }, function(stream){
				vidObj.src = window.URL.createObjectURL(stream);
				vidObj.play();
			}, errCallBack);
		}
		else{
			alert("Video zajem ni podprt v tem brskalniku.")
		}
		function handleVideo(streamVid) {
		    window.stream = streamVid;
		    video.src = URL.createObjectURL(streamVid);
		    video.play();		
		}
		function videoError(e) {
		    document.write("can't use the webcam");
		}

	}


	function toggleOnResize(){
	    if (document.documentElement.clientWidth > 600) {
			document.getElementById("sobeDiv").style.marginLeft=0+"px";
			document.getElementById("toggleDivId").style.width=0+"px";
			document.getElementById("st-sten-text").innerHTML = "Število zunanjih sten:";
	    }
	    else {
			document.getElementById("sobeDiv").style.marginLeft=-160+"px";
			document.getElementById("toggleDivId").style.width=3+"rem";		
			document.getElementById("st-sten-text").innerHTML = "Št. zunanjih sten:";

	    }
	}

	function shraniWebcam(){
		var canvas = document.getElementById("c");
		var video = document.getElementById("videoEle");
		canvas.getContext("2d").drawImage(video, 0, 0, 1280, 960);
		var img = canvas.toDataURL("image/png");
		document.getElementById('tloris-hidden').src=img;
        document.getElementById('tloris-div').style.backgroundImage='url('+img+')';	
		document.getElementById("videoDiv").style.visibility="hidden";
	}

	/* -----FUNKCIJE SE ZA IMPLEMENTACIJO------
    document.getElementById("obrni").addEventListener("click", function(e) {
    	var stKvadratov=1;
		var visina = document.getElementById('kvadrat1').getAttribute("visina");
		var sirina = document.getElementById('kvadrat1').getAttribute("sirina");
		document.getElementById('kvadrat1').style.width
		document.getElementById('kvadrat1').setAttribute("visina",sirina);
		document.getElementById('kvadrat1').setAttribute("sirina",visina);
		var sir = document.getElementById('kvadrat1').style.width;
		var vis = document.getElementById('kvadrat1').style.height;
		console.log(vis);
		console.log(sir);
		document.getElementById('kvadrat1').style.width = vis;
		document.getElementById('kvadrat1').style.height = sir	

    });

	document.getElementById("vpisMerila").addEventListener("submit", function(e) {
			e.preventDefault();  //prevent form from submitting
	        var data1 = $("#vrednost :input").serializeArray();
	        //data1[0].value
	});
	*/
});