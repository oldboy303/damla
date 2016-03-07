$(function() {


  $('#message').click(function() {
    $(this).hide('slow');
    $('#login').show('slow');
  });

  $('#login').submit(function(e) {
    e.preventDefault();
    var nameRegex = /^([a-z]+\s?)+$/i;
    var emailRegex = /^[\w-.+]+@[a-zA-Z0-9.-]+\.[a-zA-z0-9]{2,4}$/;
    var name = $('#name').val();
    var email = $('#email').val();
    if (!nameRegex.test(name) || name.length === 0) {
      $('#name').focus();
    } else if (!emailRegex.test(email) || email.length === 0) {
      $('#email').focus();
    }  else if (localStorage.getItem(name)) {
      $('#theme').prepend('welcome back ' + name + '! <br> please pick a theme:');

    } else {
      $('#theme').prepend(name + ', thanks for checking out damla! <br> please pick a theme:');
    }
    $(this).hide();
    $('#theme').show();
  });


});
