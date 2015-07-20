public var superPowerResourceManager : SuperPowerResourceManager;

private var currentResource : float;

function Start(){
}

function Update(){
	currentResource = superPowerResourceManager.currentResource;
	var text = GetComponent(UI.Text);
	text.text = currentResource.ToString();
}