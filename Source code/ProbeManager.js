public var player : Transform;
public var superPowersManager : SuperPowersManager;
public var probeDuration : float = 3.0;
public var probeSpeed : float = 14.0;
private var probeTimeSoFar : float = 0.0;
public var probe : GameObject;
public var probeSlider : UnityEngine.UI.Slider;
public var fill : UnityEngine.UI.Image;
private var fillNormalColor : Color;

private var forwardVector : Vector3;


function Start () {
	fillNormalColor = fill.color;
}

function Update(){
	if( !probe ){
		return;
	}

	if( probeTimeSoFar >= probeDuration ){
		DeactivateProbe();
		return;
	}
	probeTimeSoFar += Time.deltaTime;
	probe.transform.position += probe.transform.forward * probeSpeed * Time.deltaTime;

	UpdateSlider();
}

function UpdateSlider(){
	var value = probeSlider.maxValue * probeTimeSoFar/probeDuration;
	probeSlider.value = value;

	if( probeTimeSoFar <= superPowersManager.GetEarlyBlinkTime() ){
		fill.color = Color.Lerp(Color.clear, Color.yellow, 5);
	}
	else if( probeTimeSoFar <= superPowersManager.GetGoodBlinkTime() ){
		fill.color = Color.green;
	}
	else{
		fill.color = Color.red;
	}
}

function ActivateProbe(){
	probe.SetActive(true);
	probe.transform.position = player.position + player.forward * 2;
	probe.transform.forward = player.forward;
	probeTimeSoFar = 0.0;
}

function DeactivateProbe(){
	probe.SetActive(false);
	probeSlider.value = probeSlider.maxValue;
	fill.color = fillNormalColor;
	superPowersManager.NotifyOfDestruction();
}

function BlinkToProbe(){
	player.position = probe.transform.position;
	player.forward = probe.transform.forward;
	DeactivateProbe();
}

function OnCollisionEnter(collision : Collision){
	var object = collision.gameObject;
	if (object.tag == "Player"){ //discard hitting the player
	}
	else{
		DeactivateProbe();
	}
}

function OnTriggerEnter(collider : Collider){
	var object = collider.gameObject;
	if (object.tag == "DeathZone" || object.tag == "Ceiling" ){
		DeactivateProbe();
	}
}
