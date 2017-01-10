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

//iszg ismm
var isZg = false;
var isMM = false;

//Setting
var magic = true;
var zgFirst = false;
var uniHeader = 'Unicode';
var zgHeader = 'Zawgyi';
var disabledHeader = false;

//magic on/off
chrome.storage.local.get('magic',(result)=>{
	magic = result.magic ? true : false;
});

//zgFirst on/off
chrome.storage.local.get('zgFirst',(result)=>{
	zgFirst = result.zgFirst ? true : false;
});

//header on/off
chrome.storage.local.get('disabledHeader',(result)=>{
	disabledHeader = result.disabledHeader ? true : false;
});

//set Uni Header
chrome.storage.local.get('uniHeader',(result)=>{
	uniHeader = result.uniHeader ? result.uniHeader : uniHeader;
});

//set Zawgyi Header
chrome.storage.local.get('zgHeader',(result)=>{
	zgHeader = result.zgHeader ? result.zgHeader : zgHeader;
});

//convertor
function convert(text){
	if(magic){
		if(isZg && isMM){//the text is zawgyi
			if(disabledHeader){
				inputText.value =
				`${inputText.value}\n\n${Z1_Uni(inputText.value)}`
			} else {
				inputText.value =
				`[${zgHeader}]\n${inputText.value}\n\n[${uniHeader}]\n${Z1_Uni(inputText.value)}`
			}
		} else if(isMM && !zgFirst){//zg first is off
				if(disabledHeader){
					inputText.value =
					`${inputText.value}\n\n${Uni_Z1(inputText.value)}`
				} else {
					inputText.value =
					`[${uniHeader}]\n${inputText.value}\n\n[${zgHeader}]\n${Uni_Z1(inputText.value)}`
				}
		} else {//zg first is on
			if(disabledHeader){
				inputText.value =
				`${Uni_Z1(inputText.value)}\n\n${inputText.value}`
			} else {
				inputText.value =
				`[${zgHeader}]\n${Uni_Z1(inputText.value)}\n\n[${uniHeader}]\n${inputText.value}`
			}
		}
	} else {
		if(isZg && isMM){
			inputText.value = `${Z1_Uni(inputText.value)}`;
		} else if(isMM){
			inputText.value = `${Uni_Z1(inputText.value)}`;
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
		document.execCommand('selectAll');
		document.execCommand('cut');
		inputText.focus();
		document.execCommand('paste');

		//change textarea clipboard data and cut to clipboard
		isZg = isZawgyi(inputText.value);
		isMM = isMyanmar(inputText.value);
		convert();

		inputText.select();
		document.execCommand('cut');

		//paste to active element
		active.focus();
		// document.execCommand('paste');
	}
});
