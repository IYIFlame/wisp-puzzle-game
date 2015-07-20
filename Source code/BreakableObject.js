public var tagWhichBreaksObject : String;

function BreakObject(){
	transform.gameObject.SetActive(false);
}

function OnCollisionEnter( collision : Collision ){
	var object = collision.gameObject;
	if( object.tag == tagWhichBreaksObject ){
		BreakObject();
	}
}