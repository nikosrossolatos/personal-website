var Skull = require('skull');
var Surge = require('surge');

(function() {
	// page initialization
	var skullContainer = document.getElementById('skull');
 	window.avatar = new Skull(skullContainer);

  var surge = new Surge({debug:true});

  surge.subscribe('test');
  surge.on('response',function(data){
  	avatar.say(data.response);
  });

	var inputEl = document.getElementById('input-1');
	var form = document.getElementById('typing-form');
	var contactButton = document.getElementById('contact');
	var linkedinButton = document.getElementById('linkedin');
	var behanceButton = document.getElementById('behance');

	contactButton.addEventListener('click',function(){
		avatar.response('My master\'s email is nickrossolatos@gmail.com !');
	});
	linkedinButton.addEventListener('click',function(){
		avatar.response('Go to https://gr.linkedin.com/in/nikosrossolatos');
	});
	behanceButton.addEventListener('click',function(){
		avatar.response('Go to http://behance.com/nickrossolatos ');
	});

	//TODO: need to replace Jquery Ajax 
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		var reply = inputEl.value;
		inputEl.value = ''
		$.post('/message', {message: reply}, function(data, textStatus, xhr) {
			if(data.response){
				avatar.response(false,reply);
			}
			else{
				avatar.say('...');
			}
		});
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