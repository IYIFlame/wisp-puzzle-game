public var player : Transform; // when the player dies we need to teleport him to the checkpoint
private var lastCheckpoint : Transform;

function Start(){
}

function Update(){
}

function SetCheckpointActive( checkpoint : Transform ){
	lastCheckpoint = checkpoint;
}

function MoveToCheckpoint(){
	player.position = lastCheckpoint.position;
	player.forward = lastCheckpoint.forward;
}