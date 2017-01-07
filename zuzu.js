//creating textarea for storing clipboard data;
var inputText = document.createElement('TEXTAREA');
document.body.appendChild(inputText);
inputText.style.display= "block";
inputText.style.width = "0px";
inputText.style.height = "0px";

//start when user copy text
document.addEventListener('copy',(e)=>{
	//get active element
	var active = document.activeElement;

	//cut and paste to textarea clipboard
	inputText.value = '';
	document.execCommand('cut');
	inputText.focus();
	document.execCommand('paste');

	//change textarea clipboard data and cut to clipboard
	var isZg = isZawgyi(inputText.value);
	if(isZg){//the text is zawgyi
		inputText.value =
		`[zawgyi]\n${inputText.value}\n\n[unicode]\n${Z1_Uni(inputText.value)}
		`
	} else {
		inputText.value =
		`[unicode]\n${inputText.value}\n\n[zawgyi]\n${Uni_Z1(inputText.value)}
		`
	}
	inputText.select();
	document.execCommand('cut');

	//paste to active element
	active.focus();
	// document.execCommand('paste');
})
