(function() {

function isValidEmail( email ) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email );
}

function getYDistance( node, parent ) {
  var curr = node;
  var offsetY = 0;
  while( curr !== parent ) {
    offsetY += curr.offsetTop;
    curr = curr.offsetParent;
    if( curr === document ) {
      break;
    }
  }
  return offsetY;
}

function isVisible( node, body ) {
  var distFromBottom = body.offsetHeight - ( getYDistance( node, body ) - body.scrollTop );
  return ( distFromBottom > node.offsetHeight / 2 );
}

document.addEventListener( "DOMContentLoaded", function( e ) { 

  var form = document.getElementById( "email-submit" );
  var button = document.getElementById( "email-submit-button" );
  var email = document.getElementById( "learn-more-email" );
  var error = document.getElementById( "error-message" );

  email.addEventListener( "focus", function( e ) {
    form.classList.remove( "error" );
  });

  email.addEventListener( "invalid", function( e ) {
    e.preventDefault();
  });

  form.addEventListener( "submit", function( e ) {
    e.preventDefault();
  });

  button.addEventListener( "click", function( e ) {

    e.preventDefault();
    form.classList.remove( "error" );
    form.classList.remove( "success" );

    if( !isValidEmail( email.value ) ) {
      error.innerText = "Please enter a valid email address.";
      form.classList.add( "error" );
      return;
    }

    var formData = new FormData();
    formData.append( "email", email.value );
    var xhr = new XMLHttpRequest();
    xhr.open( "POST", "https://formspree.io/muskmuskcologne@gmail.com" );
    xhr.setRequestHeader( "Accept", "application/json" );
    xhr.onreadystatechange = function () {
      if( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
        form.classList.add( "success" );
      } else {
        error.innerText = "There was an error submitting your email address. Please try again."
        form.classList.add( "error" );
      }
    };
    xhr.send( formData );
  });

  var pbody = document.getElementById("parallax-body");
  var images = document.querySelectorAll("img");
  pbody.addEventListener( "scroll", function() {
    for( var i = 0; i < images.length; i++ ) {
      if( !images[i].classList.contains( "visible" ) && isVisible( images[i], pbody ) ) {
        images[i].classList.add( "visible" );
      }
    }

  });


});

})();