private var originalIntensity : float;
public var frequency : float = 1.0;
public var colorBlue : Color;
public var colorPink : Color;
public var character : SimpleCharacterMovement;
public var resourceManager : SuperPowerResourceManager;

private var outerLight: Light;
private var lensFlare: LensFlare;

private var particles : ParticleSystem;
private var originalEmissionRate : float;

function Start () {
	outerLight = GetComponent.<Light>();
	lensFlare = GetComponent.<LensFlare>();
	originalIntensity = outerLight.intensity;

	particles = GetComponent.<ParticleSystem>();
	originalEmissionRate = particles.emissionRate;
}


function Update () {
	var color0 = GetCurrentColor();

	outerLight.color = color0;
	var currentResource : float = resourceManager.CurrentResource();
	var maxResource : float = resourceManager.MaxResource();
	//here we use the cubic function f(x) = y*z^3 as it produces a curve with a much better effect in-game than a linear function
	//x - current light intensity, y - original intensity, z - how much resource the character has left in regard to maximum amount
	outerLight.intensity = originalIntensity * currentResource/maxResource * currentResource/maxResource * currentResource/maxResource;

	if( lensFlare ){ 
		var t : float = Mathf.PingPong(Time.time*0.5, frequency-0.85) / frequency;
		lensFlare.brightness = 0.35 + t * currentResource/maxResource;	
	}
	else{ 
		var tt : float = Mathf.PingPong(Time.time*0.5, frequency-0.85) / frequency;
		outerLight.intensity = originalIntensity * 2 * tt * currentResource/maxResource;
	}

	if( particles ){
		updateParticles(currentResource, maxResource);
	}
}

function updateParticles(currentResource : float, maxResource : float){
	//in this case a quadratic function yields better results than a cubic one
	particles.emissionRate = originalEmissionRate * currentResource/maxResource * currentResource/maxResource;
}

function GetCurrentColor(){
	if( character.IsUsingFlight() ){
		return colorPink;
	}
	return colorBlue;
}