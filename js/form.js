// ** FadeIn function for displaying success/error messages **
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

window.addEventListener( "load", function () {
  function sendData() {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData( form );

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
        var success = document.getElementById('form-success-message');
        success.classList.remove("is-invisible");
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
        var error = document.getElementById('form-error-message');
        fadeIn(error);
    } );

    // Set up our request
    XHR.open( "POST", "https://api.isagog.com/form" );

    // The data sent is what the user provided in the form
    XHR.send( FD );
  }

  // Access the form element...
  const form = document.getElementById( "waitlist-subscribe" );

  // ...and take over its submit event.
  form.addEventListener( "submit", function ( event ) {
    event.preventDefault();

    sendData();
  } );
} );
