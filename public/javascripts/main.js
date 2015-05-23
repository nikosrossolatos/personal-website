(function() {
   // page initialization
	skullSpeak(1600);
	var responsesArray = ['You should be ashamed !','Oh really?','Let me take a screenshot of that','Why dont you contact him?']
	var inputEl = document.getElementById('input-1');
	var form = document.getElementById('typing-form');
	var skullMessage = document.getElementById('skull-message');
	var contactButton = document.getElementById('contact');
	contactButton.addEventListener('click',function(){
		skullResponse('My master\'s email is nikos@panelsensor.com !');
	});
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		skullResponse()
	}, false);
	inputEl.addEventListener( 'focus', onInputFocus );
	inputEl.addEventListener( 'blur', onInputBlur );
	function onInputFocus( ev ) {
		inputEl.parentNode.className =  'input input--filled';
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			inputEl.parentNode.className = 'input'
		}
	}
	function skullResponse(text) {
		var clone = skullMessage.cloneNode(true);
		var response = text || responsesArray[Math.floor(Math.random() * responsesArray.length)];
		var delay = 1400;
		skullSpeak(delay);
		clone.textContent = response;
		var parent = skullMessage.parentNode;
		skullMessage.remove();
		skullMessage = clone;
		parent.appendChild(skullMessage);
	}
})();

function skullSpeak(delay){
	var skull = document.getElementById('skull-mouth');
	skull.className = 'skull-mouth speak';
	setTimeout(function(){
		skull.className = 'skull-mouth'
	}, delay)
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}