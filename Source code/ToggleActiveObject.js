public var gameObj : GameObject;
public var isActive : boolean;

function Start(){
	gameObj.SetActive(isActive);
}

function ToggleObjectActive(){
	isActive = !isActive;
	gameObj.SetActive(isActive);
}