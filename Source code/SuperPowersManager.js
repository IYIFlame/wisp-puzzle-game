public var resourceManager : SuperPowerResourceManager;
public var probeManager : ProbeManager;

public var earlyBlinkTime : float = 1.0;
public var goodBlinkTime : float = 2.0;

private var usingFlight : boolean = false;
private var fireProbe : boolean = false;
private var blinkToProbe : boolean = false;
private var timeWhenProbeFired : float = 0.0;

private var axisPressed : float = 0;

function Start(){

}

function UpdateFunc(){
	var canUsePower : boolean = resourceManager.CanUsePower();

	usingFlight = false;
	if( canUsePower && Input.GetAxis("SuperPower") ){
		usingFlight = true;
	}

	// we want to only register the first frame we pull the trigger on the controller
	// 0 = have not pressed it, 1 = pressed it this frame, 2 = pressed it some previous frame
	if( Input.GetAxis("Fire1") ){
		if( axisPressed == 0 ){
			axisPressed = 1;
		}
	}
	else{
		axisPressed = 0;
	}
	
	var currentResource = resourceManager.CurrentResource();
	if( !usingFlight && (Input.GetButtonDown("Fire1") || axisPressed == 1) ){
		var fireProbeCost = resourceManager.FireProbeCost();
		if( currentResource >= fireProbeCost ){
			blinkToProbe = blinkToProbe || fireProbe; 	// this will give false first time we fire the probe and  
			fireProbe = true;							// true if we have already fired one and are trying to teleport to it
		}

		if( blinkToProbe ){
			var blinkCost = GetBlinkCost();
			if(  currentResource >= blinkCost ){
				resourceManager.BlinkToProbe( blinkCost );
				probeManager.BlinkToProbe();
				fireProbe = false;
				blinkToProbe = false;
			}
		}
		else if( fireProbe ){
			resourceManager.FireProbe();
			probeManager.ActivateProbe();
			timeWhenProbeFired = Time.time;
		}
	}

	if( axisPressed == 1 ){
		axisPressed = 2;
	}
}

function IsUsingFlight(){
	return usingFlight;
}

function GetBlinkCost(){
	var timeSinceProbeFired = Time.time - timeWhenProbeFired;
	if( timeSinceProbeFired <= earlyBlinkTime ){
		return resourceManager.EarlyBlinkCost();
	}
	else if( timeSinceProbeFired <= goodBlinkTime ){
		return resourceManager.GoodBlinkCost();
	}
	else{
		return resourceManager.LateBlinkCost();
	}
}

function GetEarlyBlinkTime(){
	return earlyBlinkTime;
}

function GetGoodBlinkTime(){
	return goodBlinkTime;
}

function NotifyOfDestruction(){
	// probe has been destroyed;
	fireProbe = false;
}