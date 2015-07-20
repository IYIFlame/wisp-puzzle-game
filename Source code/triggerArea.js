public var displayAnnouncement : boolean = false;
public var announcement : Announcement;
public var text : String;

public var notifyTrickWalls : boolean = false;
public var trickWalls : TrickWall[];

public var triggersEvent : boolean = false;
public var scriptEvent : ScriptEvent;

public var isDeathzone : boolean = false;
public var death_system : DeathSystem;
public var death_timer : float = 0.0;
private var time_in_area : float = 0.0;
private var is_in_area : boolean = false;

function Start(){
}

function Update(){
	if( !isDeathzone ){
		return;
	}

	if( is_in_area ){
		time_in_area += Time.deltaTime;
	}
	else{
		time_in_area = 0.0;
	}

	if( time_in_area >= death_timer ){
		death_system.MoveToCheckpoint();
	}
}

function OnTriggerEnter(collider : Collider){
	if( collider.gameObject.tag != "Player" ){
		return;
	}

	if( displayAnnouncement ){
		announcement.SetMessage( text );
	}
	if( notifyTrickWalls ){
		for (var i = 0; i < trickWalls.length; i++) {
			trickWalls[i].SetPlayerIsInArea(true);
		}
	}
	if( isDeathzone ){
		is_in_area = true;
	}
	if( triggersEvent ){
		scriptEvent.TriggerEvent();
	}
}

function OnTriggerExit(collider : Collider){
	if( collider.gameObject.tag != "Player" ){
		return;
	}

	if( displayAnnouncement ){	
		announcement.SetMessage( "" );
	}
	if( notifyTrickWalls ){
		for (var i = 0; i < trickWalls.length; i++) {
			trickWalls[i].SetPlayerIsInArea(false);
		}
	}
	if( isDeathzone ){
		is_in_area = false;
	}
}