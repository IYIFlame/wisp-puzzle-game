public var collides : boolean;
public var collidesChanges : boolean;
public var materials : Material[];
public var player : SimpleCharacterMovement;

private var playerIsInArea : boolean = false;
private var collidesByDefault : boolean;

function Start(){
	collidesByDefault = collides;
	GetComponent(Renderer).material = materials[0];
}

function Update(){
	if( !playerIsInArea ){
		return;
	}

	var material = materials[0];
	if( player.IsUsingFlight() ){

		if( collidesChanges ){
			collides = !collidesByDefault;
		}
		material = materials[1];

	}
	else{
		collides = collidesByDefault;
		material = materials[0];
	}

	GetComponent(Renderer).material = material;
	gameObject.GetComponent.<Collider>().enabled = collides;
}

function SetPlayerIsInArea( isInArea : boolean ){
	playerIsInArea = isInArea;

	if( !isInArea ){ // if player has left the area make sure we reset the trick wall
		collides = collidesByDefault;
		GetComponent(Renderer).material = materials[0];
		gameObject.GetComponent.<Collider>().enabled = collides;
	}
}