public var death_system : DeathSystem;
public var death_timer : float = 0.0;
private var time_in_area : float = 0.0;
private var is_in_area : boolean = false;

function Start(){
} 

function Update(){
	if( is_in_area ){
		time_in_area += Time.deltaTime;
	}
	else{
		time_in_area = 0.0;
	}

	if( time_in_area >= death_timer ){
		death_system.MoveToCheckpoint(); //player is dead move them to checkpoint
	}
}

function OnTriggerEnter(collision : Collider){
	var object = collision.gameObject;
	// check if the tag/id/whatever of the object is player
	if (object.tag == "Player"){
		is_in_area = true;
	}
}



function OnTriggerExit(collision : Collider){
	var object = collision.gameObject;
	// check if the tag/id/whatever of the object is player
	if (object.tag == "Player"){
		is_in_area = false;
	}
}