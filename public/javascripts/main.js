var Skull = require('skull');
(function() {
   // page initialization
  	var skullContainer = document.getElementById('skull');
   	var avatar = new Skull(skullContainer);
   	
	var inputEl = document.getElementById('input-1');
	var form = document.getElementById('typing-form');
	var contactButton = document.getElementById('contact');
	var linkedinButton = document.getElementById('linkedin');
	var facebookButton = document.getElementById('facebook');

	contactButton.addEventListener('click',function(){
		avatar.response('My master\'s email is nikos@panelsensor.com !');
	});
	linkedinButton.addEventListener('click',function(){
		avatar.response('Go to https://gr.linkedin.com/in/nikosrossolatos');
	});
	facebookButton.addEventListener('click',function(){
		avatar.response('Oh no no. Facebook is private. Unless you are a girl ;) ');
	});
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		var reply = inputEl.value;
		inputEl.value = ''
		avatar.response(false,reply);
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