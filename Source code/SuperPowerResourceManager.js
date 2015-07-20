public var superPowersManager : SuperPowersManager;

public var maxResource : float = 10.0;
public var minResource : float = 0.0;
public var currentResource : float;
public var resourceCostPerSec : float = 2.0;
public var fireProbeCost : float = 1.0;
public var earlyBlinkCost : float = 3.0;
public var goodBlinkCost : float = 2.0;
public var lateBlinkCost : float = 5.0;

public var resourceRegenCooldown : float = 1.0;
private var currentResourceRegenCooldown : float;

private var canUsePower : boolean = true;
private var powerIsDraining : boolean = false;
private var drainRate : float = 0.0;

public var resourceSlider : UnityEngine.UI.Slider;


function Start(){
	currentResource = maxResource;
	currentResourceRegenCooldown = resourceRegenCooldown;
}

function Update(){
	if( powerIsDraining ){
		currentResource -= drainRate * resourceCostPerSec * Time.deltaTime;
	}

	var isUsingPower = superPowersManager.IsUsingFlight();
	if( isUsingPower ){
		if( currentResource > minResource ){
			currentResource -= resourceCostPerSec * Time.deltaTime;
		}
		else{
			canUsePower = false;
		}
		currentResourceRegenCooldown = resourceRegenCooldown;
	}else{
		if( currentResource > minResource ){
			canUsePower = true;
		}
		if( currentResourceRegenCooldown <= 0 ){
			if( currentResource < maxResource ){
				currentResource += Time.deltaTime;
			}
		}
		else{
			currentResourceRegenCooldown -= Time.deltaTime;
		}
	}
	currentResource = Mathf.Clamp( currentResource, 0, maxResource); // returns a nice round number when resource is min or max
	if( resourceSlider.value != currentResource ){
		resourceSlider.value = currentResource;
	}
}

function FireProbe(){
	currentResource -= fireProbeCost;
}

function BlinkToProbe( blinkCost : float ){
	currentResource -= blinkCost;
}

function SetPowerToDraining( is_draining : boolean, newDrainRate : float){
	powerIsDraining = is_draining;
	drainRate = newDrainRate;
}

function FadeSlider(){

}

function CanUsePower(){
	return canUsePower;
}

function CurrentResource(){
	return currentResource;
}

function MaxResource(){
	return maxResource;
}

function FireProbeCost(){
	return fireProbeCost;
}

function EarlyBlinkCost(){
	return earlyBlinkCost;
}

function GoodBlinkCost(){
	return goodBlinkCost;
}

function LateBlinkCost(){
	return lateBlinkCost;
}