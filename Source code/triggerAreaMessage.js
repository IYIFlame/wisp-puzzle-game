public var text : String;
public var announcement : Announcement;

function Start(){}

function Update(){
}

function OnTriggerEnter(collision : Collider){
	announcement.SetMessage( text );
}

function OnTriggerExit(collision : Collider){
	announcement.SetMessage( "" );
}