private var message : String = "";

function Start(){
}

function SetMessage( text : String ){
	message = text;
}

function Update(){
	var text = GetComponent(UI.Text);
	text.text = message;
}