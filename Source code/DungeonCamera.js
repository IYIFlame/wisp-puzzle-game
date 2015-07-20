public var target : Transform;
public var rotateSpeed : float = 30;
private var offset : Vector3;

public var smoothTime = 0.3;
private var velocity = Vector3.zero;
private var hitDetected : boolean = false;

function Start(){
    Cursor.visible = false;
    Cursor.lockState = CursorLockMode.Locked;
    offset = target.transform.position - transform.position;
}

function LateUpdate(){
    var desiredPosition = target.transform.position - (transform.rotation * offset);
    transform.position = desiredPosition;

    var hit : RaycastHit;
    //if camera detects something behind or under it move camera to hitpoint so it doesn't go throught wall/floor
    if(Physics.Raycast(target.position,(transform.position - target.position),hit, offset.z)){
        desiredPosition = hit.point + (target.position - transform.position).normalized;
        if( hitDetected ){
            transform.position = desiredPosition; //this is why it was stuttering
        }
        hitDetected = true;
    }
    else{
        hitDetected = false;
    }

}

