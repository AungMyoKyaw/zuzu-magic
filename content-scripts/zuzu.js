//creating textarea for storing clipboard data;
var inputText = document.createElement('TEXTAREA');
document.body.appendChild(inputText);
inputText.style.display= "block";
inputText.style.position= "fixed";
inputText.style.left= "0";
inputText.style.top= "0";
inputText.style.width= "0";
inputText.style.height= "0";
inputText.style.border= "none";
inputText.style.overflow= "auto";
inputText.style.outline= "none";
inputText.style.resize= "none";
inputText.style.opacity= "0";

//iszg ismm
var isZg = false;
var isMM = false;

//Setting
var magic = true;
var zgFirst = false;
var uniHeader = 'Unicode';
var zgHeader = 'Zawgyi';
var disabledHeader = false;

function getSettingData(){
	//magic on/off
	chrome.storage.local.get('magic',(result)=>{
		magic = result.magic!==undefined ? result.magic : magic;
	});

	//zgFirst on/off
	chrome.storage.local.get('zgFirst',(result)=>{
		zgFirst = result.zgFirst!==undefined ? result.zgFirst : zgFirst;
	});

	//header on/off
	chrome.storage.local.get('disabledHeader',(result)=>{
		disabledHeader = result.disabledHeader!==undefined ? result.disabledHeader : disabledHeader;
	});

	//set Uni Header
	chrome.storage.local.get('uniHeader',(result)=>{
		uniHeader = result.uniHeader!==undefined ? result.uniHeader : uniHeader;
	});

	//set Zawgyi Header
	chrome.storage.local.get('zgHeader',(result)=>{
		zgHeader = result.zgHeader!==undefined ? result.zgHeader : zgHeader;
	});

	chrome.storage.local.set({
		change:false
	});
}

getSettingData();

//convertor
function convert(text){
	if(magic){
		if(isZg && isMM){//the text is zawgyi
			if(disabledHeader){
				inputText.value =
				`${inputText.value}\n\n${Rabbit.zg2uni(inputText.value)}`
			} else {
				inputText.value =
				`[${zgHeader}]\n${inputText.value}\n\n[${uniHeader}]\n${Rabbit.zg2uni(inputText.value)}`
			}
		} else if(isMM && !zgFirst){//zg first is off
				if(disabledHeader){
					inputText.value =
					`${inputText.value}\n\n${Rabbit.uni2zg(inputText.value)}`
				} else {
					inputText.value =
					`[${uniHeader}]\n${inputText.value}\n\n[${zgHeader}]\n${Rabbit.uni2zg(inputText.value)}`
				}
		} else {//zg first is on
			if(disabledHeader){
				inputText.value =
				`${Rabbit.uni2zg(inputText.value)}\n\n${inputText.value}`
			} else {
				inputText.value =
				`[${zgHeader}]\n${Rabbit.uni2zg(inputText.value)}\n\n[${uniHeader}]\n${inputText.value}`
			}
		}
	} else {
		if(isZg && isMM){
			inputText.value = `${Rabbit.zg2uni(inputText.value)}`;
		} else if(isMM){
			inputText.value = `${Rabbit.uni2zg(inputText.value)}`;
		}
	}
}

//start when user select all text
document.addEventListener('keydown',(e)=>{
	var isCtrlPressed = e.ctrlKey || e.metaKey;
	var isSelectAll = isCtrlPressed && e.keyCode===65;
	if(isSelectAll){
		// get active element
		var active = document.activeElement;

		//cut and paste to textarea clipboard
		inputText.value = '';
		// document.execCommand('selectAll');
		document.execCommand('cut');
		inputText.focus();
		document.execCommand('paste');

		//change textarea clipboard data and cut to clipboard
		isZg = isZawgyi(inputText.value);
		isMM = isMyanmar(inputText.value);

		//checking change
		chrome.storage.local.get('change',(result)=>{
			var isChanged = result.change!==undefined ? result.change : false;
			if(isChanged){
				getSettingData();
			}
		});
		//convert
		convert();

		inputText.select();
		document.execCommand('cut');

		//paste to active element
		active.focus();
		// document.execCommand('paste');
	}
});
