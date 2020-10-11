$(".modal-open").click(function(){
  $("#buy_modal").addClass("is-active");
});

$(".modal-close").click(function(){
  $("#buy_modal").removeClass("is-active");
});

/* Code from github-pages-stripe-checkout sample: https://github.com/stripe-samples/github-pages-stripe-checkout/ */

// Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
var PUBLISHABLE_KEY = 'pk_test_51Hb1FsFlI70yk6Quawu646Y6RbPHIp2ngIJTKJkC3YA2UMsIeo8McApqGj2ZMpulFd5nuTKUdCCH9YHpAnsfYMZD00ZUVwlf3K';
// Replace with the domain you want your users to be redirected back to after payment
var DOMAIN = location.href.replace(/[^/]*$/, '');

var stripe = Stripe(PUBLISHABLE_KEY);

// Handle any errors from Checkout
var handleResult = function (result) {
  if (result.error) {
    var displayError = $('#error-message');
    displayError.textContent = result.error.message;
  }
};

$('.stripe-buy-button').click(function () {
    var mode = $(this).attr('data-checkout-mode');
    var priceId = $(this).attr('data-price-id');
    var items = [{ price: priceId, quantity: 1 }];

    // Make the call to Stripe.js to redirect to the checkout page
    // with the sku or plan ID.
    stripe
      .redirectToCheckout({
        mode: mode,
        lineItems: items,
        successUrl:
          DOMAIN + '#success?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl:
          DOMAIN + '#canceled?session_id={CHECKOUT_SESSION_ID}',
          shippingAddressCollection: {
            allowedCountries: ['IT'],
          }
      })
      .then(handleResult);
});


// Webhooks

$(document).ready(function() {

  if(window.location.href.indexOf('#success') != -1) {
    $("#buy_modal").addClass("is-active");
    $("#success").removeClass("is-hidden")
  }

  if(window.location.href.indexOf('#cancel') != -1) {
    $("#buy_modal").addClass("is-active");
    $("#cancel").removeClass("is-hidden")
  }
});



// // ** FadeIn function for displaying success/error messages **
// function fadeIn(el, display) {
//     el.style.opacity = 0;
//     el.style.display = display || "block";
//     (function fade() {
//         var val = parseFloat(el.style.opacity);
//         if (!((val += .1) > 1)) {
//             el.style.opacity = val;
//             requestAnimationFrame(fade);
//         }
//     })();
// };
//
// window.addEventListener( "load", function () {
//   function sendData() {
//     const XHR = new XMLHttpRequest();
//
//     // Bind the FormData object and the form element
//     const FD = new FormData( form );
//
//     // Define what happens on successful data submission
//     XHR.addEventListener( "load", function(event) {
//         var success = document.getElementById('form-success-message');
//         success.classList.remove("is-invisible");
//     } );
//
//     // Define what happens in case of error
//     XHR.addEventListener( "error", function( event ) {
//         var error = document.getElementById('form-error-message');
//         fadeIn(error);
//     } );
//
//     // Set up our request
//     XHR.open( "POST", "https://api.isagog.com/form" );
//
//     // The data sent is what the user provided in the form
//     XHR.send( FD );
//   }
//
//   // Access the form element...
//   const form = document.getElementById( "waitlist-subscribe" );
//
//   // ...and take over its submit event.
//   form.addEventListener( "submit", function ( event ) {
//     event.preventDefault();
//
//     sendData();
//   } );
// } );
