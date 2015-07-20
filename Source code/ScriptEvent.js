public var deathSystem : DeathSystem;
private var originalPosition : Vector3;
private var eventTriggered : boolean = false;

function Start(){
	originalPosition = transform.position;
}

function Update(){
	if( eventTriggered ){
		transform.position += -transform.up*8*Time.deltaTime; //simulate gravity
	}
}

function TriggerEvent(){
	eventTriggered = true;
}

function ResetEvent(){
	transform.position = originalPosition;
	eventTriggered = false;
}

function OnCollisionEnter(collision : Collision){
	var gameObject = collision.gameObject;
	if( gameObject.tag == "Player" ){
		ResetEvent();
		deathSystem.MoveToCheckpoint();
	}
	if( gameObject.tag != "Probe" && gameObject.tag != "Ceiling" ){
		eventTriggered = false;
	}
}