var Skull = require('skull');
(function() {
   // page initialization
  	var skullContainer = document.getElementById('skull');
   	var avatar = new Skull(skullContainer);
   	
	var inputEl = document.getElementById('input-1');
	var form = document.getElementById('typing-form');
	var contactButton = document.getElementById('contact');
	contactButton.addEventListener('click',function(){
		avatar.response('My master\'s email is nikos@panelsensor.com !');
	});
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		inputEl.value = ''
		avatar.response()
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
})();