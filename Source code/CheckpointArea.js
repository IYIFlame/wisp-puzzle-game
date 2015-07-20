public var self : Transform;
public var announcement : Announcement;
public var text : String = "";
public var death_system : DeathSystem;

function OnTriggerEnter(collider : Collider){
	var object = collider.gameObject;
	// check if the tag/id/whatever of the object is player
	if (object.tag == "Player"){
		announcement.SetMessage(text);
		death_system.SetCheckpointActive(self);
	}
}

 function OnTriggerExit(collider : Collider){
 	var object = collider.gameObject;
	// check if the tag/id/whatever of the object is player
	if (object.tag == "Player"){
		announcement.SetMessage("");
	}
 }