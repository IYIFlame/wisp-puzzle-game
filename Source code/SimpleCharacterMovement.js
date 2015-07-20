public var speed : float = 8.0;
public var rotateSpeed : float = 80.0;
public var cam : Transform;
public var self : GameObject;
public var jumpSpeed : float = 5;
public var superPowersManager : SuperPowersManager;
private var currentSpeed : float = 0.0;
private var wantedSpeed : float = 0.0;
private var gravity : float = 20.0;

private var isUsingPower : boolean = false;
private var playerIsFlipped : float = 0;

private var slideDir : Vector3 = Vector3.zero;
private var moveDirection : Vector3 = Vector3.zero;

private var rb: Rigidbody;

function Start() {
	rb = GetComponent.<Rigidbody>();
}

function Update() {
	superPowersManager.UpdateFunc();

	var isUsingFlight : boolean = IsUsingFlight();
	var controller : CharacterController = GetComponent(CharacterController);


	if( isUsingFlight ){ //is using SP1
		rb.mass = 10;
		slideDir = Vector3.zero;
		moveDirection = Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= GetCurrentSpeed( moveDirection );
	}
	else {
		rb.mass = 0.01;
		if( controller.isGrounded ){
			moveDirection = Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= GetCurrentSpeed( moveDirection );
			
			if (Input.GetButton ("Jump")) {
				moveDirection.y = jumpSpeed;
			}
		}
		// Apply gravity
		moveDirection.y -= gravity * Time.deltaTime;
	}

	if( slideDir != Vector3.zero ){
		controller.Move(slideDir *2* speed * Time.deltaTime);
		slideDir = Vector3.zero;
	}
	else{
		controller.Move(moveDirection * Time.deltaTime);
	}

}

private var vec : Vector3 = Vector3.zero;
function LateUpdate(){
	if( playerIsFlipped == 0 ){
		var horizontal : float = Input.GetAxis("Mouse X") * rotateSpeed * Time.smoothDeltaTime;
	    transform.RotateAround (transform.position, Vector3.up, horizontal);
	}
		var vertical : float = Input.GetAxis("Mouse Y") * rotateSpeed * Time.smoothDeltaTime;
	    transform.RotateAround (transform.position, transform.right, vertical);   

	Debug.Log(transform.eulerAngles.z);
	if( transform.eulerAngles.z >= 170 ){ //check if player is close to inverting the camera
		if( playerIsFlipped == 0 ){
			vec = transform.forward;
			playerIsFlipped = 2;
		}
	}
	else{
		playerIsFlipped = 0;
	}

	if( playerIsFlipped == 2 ){
		transform.RotateAround (transform.position, vec, Mathf.Lerp(0, 180.0, 0.04));
		
	}
}

function GetCurrentSpeed( moveDirection : Vector3 ){// adds acceleration to character movement
	if( moveDirection == Vector3.zero ){
		wantedSpeed = 0;
	}
	else{
		wantedSpeed = speed;
	}
	currentSpeed = Mathf.Lerp( currentSpeed, wantedSpeed, 3*Time.deltaTime );
	return currentSpeed;
}

function IsUsingFlight(){
	return superPowersManager.IsUsingFlight();
}

function OnControllerColliderHit (hit : ControllerColliderHit) { //detects hitting steep slopes
	slideDir = Vector3.zero;
	if( Vector3.Angle(hit.normal,Vector3.up) >= 45 ){
		slideDir = hit.normal - transform.position.up;
	}
}