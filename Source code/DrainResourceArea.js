public var resourceManager : SuperPowerResourceManager;
public var drainRate : float = 4.0;

function OnTriggerEnter(collider : Collider){
	var object = collider.gameObject;
	// check if the tag/id/whatever of the object is player
	if (object.tag == "Player"){
		resourceManager.SetPowerToDraining(true, drainRate);
	}
}

function OnTriggerExit(collider : Collider){
	var object = collider.gameObject;
	// check if the tag/id/whatever of the object is player
	if (object.tag == "Player"){
		resourceManager.SetPowerToDraining(false, 0.0);
	}
}