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

//start when user select all text
document.addEventListener('keydown',(e)=>{
	var isCtrlPressed = e.ctrlKey || e.metaKey;
	var isSelectAll = isCtrlPressed && e.keyCode===65;
	if(isSelectAll){
		// get active element
		var active = document.activeElement;
		// var isEditable = active.isContentEditable;
		// console.log(isEditable,'content editable');

		//cut and paste to textarea clipboard
		inputText.value = '';
		// active.select();
		document.execCommand('cut');
		inputText.focus();
		document.execCommand('paste');

		//change textarea clipboard data and cut to clipboard
		var isZg = isZawgyi(inputText.value);
		var isMM = isMyanmar(inputText.value);
		if(isZg && isMM){//the text is zawgyi
			inputText.value =
			`[Zawgyi]\n${inputText.value}\n\n[Unicode]\n${Z1_Uni(inputText.value)}`
		} else if(isMM){
			inputText.value =
			`[Unicode]\n${inputText.value}\n\n[Zawgyi]\n${Uni_Z1(inputText.value)}`
		}
		inputText.select();
		document.execCommand('cut');

		//paste to active element
		active.focus();
		// document.execCommand('paste');
	}
})
