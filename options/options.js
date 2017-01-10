var magicSwitch = document.getElementsByClassName('magic')
var magicOn = document.getElementById('magicon');
var magicOff = document.getElementById('magicoff');
var MagicOption = document.getElementById('MagicOption');
var zgFirstElement = document.getElementById('zgFirst');
var uniHeaderElement =	document.getElementById('uniHeader');
var zgHeaderElement = document.getElementById('zgHeader');
var disabledHeaderElement = document.getElementById('disabledHeader');
var header = document.getElementById('header');

var magic = true;
var zgFirst = false;
var uniHeader = 'Unicode';
var zgHeader = 'Zawgyi';
var disabledHeader = false;

//setting data
chrome.storage.local.get('magic',(result)=>{
	//get magic on off data
	magic = result.magic ? result.magic : false;
	//set checked
	if(magic){//magic on
		magicOn.setAttribute('checked',true);
		MagicOption.style.display = 'block';
	} else {
		magicOff.setAttribute('checked',true);
		MagicOption.style.display = 'none';
	}
});

chrome.storage.local.get('zgFirst',(result)=>{
	zgFirst = result.zgFirst ? true : false;
	if(zgFirst){
		zgFirstElement.setAttribute('checked',true);
	} else {
		zgFirstElement.removeAttribute('checked');
	}
});

chrome.storage.local.get('uniHeader',(result)=>{
	uniHeader = result.uniHeader ? result.uniHeader : 'Unicode';
	uniHeaderElement.setAttribute('placeholder',uniHeader);
});

chrome.storage.local.get('zgHeader',(result)=>{
	zgHeader = result.zgHeader ? result.zgHeader : 'Zawgyi';
	zgHeaderElement.setAttribute('placeholder',zgHeader);
});

//magic switch on/off
magicOn.addEventListener('click',(e)=>{
	chrome.storage.local.set({
		magic:true
	});
	MagicOption.style.display = 'block';
});
magicOff.addEventListener('click',(e)=>{
	chrome.storage.local.set({
		magic:false
	});
	MagicOption.style.display = 'none';
});

//zg First On/Off
zgFirstElement.addEventListener('click',(e)=>{
	var ison = e.target.getAttribute('checked');
	if(ison){
		chrome.storage.local.set({
			zgFirst:false
		});
		e.target.removeAttribute('checked');
	} else {
		chrome.storage.local.set({
			zgFirst:true
		});
		e.target.setAttribute('checked',true)
	}
});

//header on/off
chrome.storage.local.get('disabledHeader',(result)=>{
	disabledHeader = result.disabledHeader ? true : false;
	if(disabledHeader){
		disabledHeaderElement.setAttribute('checked',true);
		header.style.display = 'none';
	} else {
		header.style.display = 'block';
	}
});

//set header
MagicOption.addEventListener('submit',(e)=>{
	uniHeader = uniHeaderElement.value ? uniHeaderElement.value : uniHeader;
	zgHeader = zgHeaderElement.value ? zgHeaderElement.value : zgHeader;
	chrome.storage.local.set({
		uniHeader:uniHeader,
		zgHeader:zgHeader
	});
});

//set disable header
disabledHeaderElement.addEventListener('click',(e)=>{
	var isdisable = e.target.getAttribute('checked');
	if(isdisable){
		chrome.storage.local.set({
			disabledHeader:false
		});
		header.style.display = 'block';
		e.target.removeAttribute('checked');
	} else {
		chrome.storage.local.set({
			disabledHeader:true
		});
		header.style.display = 'none';
		e.target.setAttribute('checked',true);
	}
})
