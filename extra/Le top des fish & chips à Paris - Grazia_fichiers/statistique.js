
<!--
var wsd=new Date();

var wstb,wsdjid,wsvudj;
var wsv="";
var wscli="";
var wspage="";
var wsprof="";
var wscpt="";


var wsref;
var wscook=ws_isCookAccept();
var wsecr=ws_getScreenSize();
var wsdjcook=0;

wstb=ws_readCook();

if (wstb.length>0) {
	wsdjcook=1;
}

wscook=ws_majCook(wscook);
wsv=3;


function wysistatRedirect(url,cib) {
	window.open(url,cib);
}

function ws_isCookTedemis() {
	var tcook,allcook;

	allcook = document.cookie.split("; ");

	for(i=0; i<allcook.length; i++) {
		tcook=allcook[i].split("=");
		if (tcook[0]=='wsuserid') {
			return true;
		}
	}
	return false;
}


function stat(cli,frm,prm,ce,page,roi,prof,cpt) {
	wysistat(cli,frm,prm,ce,page,roi,prof,cpt);
}

// Fonction d'audit (Alias) / changement entête pour la vidéo
function wysistat(cli,frm,prm,ce,page,roi,prof,cpt) {
	//if (!ws_isCookTedemis()){
	//	return;
	//}
	var date=new Date();

	if (wsv>=2) {
		ws_writeCook(wstb);
	}

	if (!frm){var frm=0;}
	if (!prm){var prm=0;}
	if (!ce){var ce=0;}
	if (!page){var page=0;}
	else {page=escape(page);}
	if (!roi){var roi=0;}
	if (!prof){var prof = 0;}
	else{prof=escape(prof);}
	if (!cpt){var cpt = 0;}
	else{cpt=escape(cpt);}
	if (!wsref){wsref="";}

	var proto=ws_getProto();
	var dns=ws_getDNS();

	var url=proto+'://'+dns
	+'/images/'+cli+'/'+'compteur.php'
	+'?nom='+cli
	+'&tps='+date.getSeconds()+date.getMinutes()
	+'&ecran='+wsecr
	+'&origine='+escape(document.referrer)
	+'&origine_force='+escape(wsref)
	+'&frame='+frm
	+'&ParaWysistat='+prm
	+'&CompteurExtranet='+ce
	+'&ParaPage='+page
	+'&ParaProfiling='+prof
	+'&ParaCompte='+cpt
	+'&ParaRoi='+roi
	+'&ojd_version=2'
	+'&cookie='+wscook
	+'&deja_cookie='+wsdjcook;
	if (wsv>=2) {
		url+='&version='+wsv
		+'&id='+wstb[0]
		+'&id_int='+wstb[5]
		+'&compteur_mois='+wstb[1]
		+'&compteur_jour='+wstb[3]
		+'&deja_id='+wsdjid
		+'&vu_diff_jour='+wsvudj
		+'&vu_time_prec='+wstb[4];
	}


	var page_location = escape(location.href);

	if( (url.length + page_location.length) > 2000){
		var tabTemp = page_location.split("%3F");
		url+='&page_js='+tabTemp[0];
	}else{
		url+='&page_js='+page_location;
	}


	var c=new Image(1,1);
	c.src=url;
	c.onload=function() {ws_retVide();}
	c.setAttribute("ALT","Tracker Wysistat");

	wscli=cli;
	wsprof=prof;
	wscpt=cpt;
	wspage=page;

}

function wysistatSetReferer(referer) {
	wsref=referer;
}

function ws_getScreenSize() {
	if (document.layers) {
		return window.innerWidth;
	}
	else {
		return scr=screen.width;
	}
}

function ws_getDNS() {
	return "dc1w64.wysistat.com";
}

function ws_getProto() {
		var p='http';
		if (document.URL.substr(0,5).toLowerCase()=='https') {
			p='https';
		}
		return p;
}

function ws_retVide() { return; }

function ws_writeCook(tab) {
	var i,de,v;

	de=new Date(wsd.getTime()+2592000000);

	v="";
	for (i=0; i<tab.length; i++) {
		if (i>0) {v+="§";}
		v+=tab[i];
	}
	document.cookie='Wysistat'+"="+escape(v)+";expires="+de.toGMTString()+";path=/;";
}

function ws_readCook() {
	var cook,tcook,allcook,tab;

	cook = "";
	allcook = document.cookie.split("; ");

	for(i=0; i<allcook.length; i++) {
		tcook=allcook[i].split("=");
		if (tcook[0]=='Wysistat') {
			cook=tcook[1];
			i=allcook.length;
		}
	}
	tab = new Array();
	if (cook) {
		cook=unescape(cook);
		tab=cook.split("§");
	}
	return tab;
}

function ws_majCook(acc) {
	wsdjid=wsvudj=0;
	var off=wsd.getTimezoneOffset()*60;
	var tms=wsd.getTime();
	var t=Math.floor(tms/1000);
	var tvu=0;
	var rand=Math.random()+"_"+tms;

	if (wstb.length>0){
		acc=1;

		var d=new Date();
		d.setTime(wstb[2]);

		if (wstb[4]) {tvu=wstb[4];}

		if (d.getMonth()==wsd.getMonth()){
			if (d.getDate()==wsd.getDate()){
				if (tms>(d.getTime()+1800000)){
					wstb[1]++;wstb[3]++;wstb[0]=rand;
				}
				else{
					wsdjid="1";
				}
			}
			else{
				wstb[1]++;wstb[3]=1;wstb[0]=rand;wstb[4]=t;
			}
		}
		else{
			wstb[1]=1;wstb[3]=1;wstb[0]=rand;wstb[4]=t;
		}
	}
	else{
		wstb[1]=1;wstb[3]=1;wstb[0]=rand;wstb[4]=t;
	}
	wstb[2]=tms;

	if (wstb[1]>1000){wstb[1]="1";}
	if (!wstb[0]){wstb[0]=rand;}
	if (!wstb[4]){wstb[4]=0;}
	if (tvu!=0){wsvudj=Math.floor((t-off)/3600/24)-Math.floor((tvu-off)/3600/24);}

	if (!wstb[5] && acc){wstb[5]=wstb[0];}
	else if (!wstb[5]){wstb[5]=0;}

	return acc;
}

function ws_isCookAccept() {
	var acc=0;
	var n="WysistatAC";
	var v=escape("WysistatAC");
	var da=new Date();
	var de=new Date(da.getTime()+2592000000);

	document.cookie=n+"="+v+";expires="+de.toGMTString()+";path=/;";
	var test=document.cookie.indexOf(n+'='+v);
	if (test>=0){acc=1;}

	de=new Date(da.getTime()-8760);
	document.cookie=n+"="+";expires="+de.toGMTString()+";path=/;";

	return acc;
}






wysi=valeur=1;
//-->
