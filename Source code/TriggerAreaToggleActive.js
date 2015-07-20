public var isPermanent : boolean;
public var toggleActiveObject : ToggleActiveObject;
private var hasEntered : boolean = false;
private var hasExited : boolean = false;

function Start(){}

function Update(){
}

function OnTriggerEnter(collision : Collider){
	if(hasEntered) return;

 	hasEntered = true;
 	hasExited = false;
	toggleActiveObject.ToggleObjectActive();

}

function OnTriggerExit(collision : Collider){
	if(hasExited) return;
	
	hasExited = true;
	hasEntered = false;
	if( !isPermanent ){
		toggleActiveObject.ToggleObjectActive();
	}
}