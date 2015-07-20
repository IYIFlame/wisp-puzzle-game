@script RequireComponent(AudioSource)
public var sounds : AudioClip[];
private var axisPressed : float = 0;

function Update(){
	var audio = GetComponent.<AudioSource>();
	if( Input.GetAxis("Fire1") ){
		if( axisPressed == 0 ){
			axisPressed = 1; //mark if this is the first frame we press the button
		}
	}
	else{
		axisPressed = 0; //we have let go of button
	}

	if( (Input.GetButtonDown("Fire1") || axisPressed == 1) ){
		audio.clip = sounds[0];//play sound for SP2
		audio.Play();
	}
		
	if( axisPressed == 1 ){
		axisPressed = 2; //the first frame when we pressed the button is over
	}
}