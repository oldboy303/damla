$(function() {

  var Player = function(name, email) {
    this.name = name;
    this.email = email;
    this.lastScore = 0;
  };

  var user = {};

  var theme = '';

  var getImage = function() {
    $.ajax({
      url: 'http://api.pixplorer.co.uk/image?word=' + 'hi-res landscape' + '&amount=1&size=l',
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        $('#main').css({'background':'url("' +res.images[0].imageurl + '") no-repeat center'});
        $('#main').css({'background-size':'cover'});
      }
    });
  };
  
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
    } else if (localStorage.getItem(name)) {
      user = localStorage.getItem(name);
    } else {
      user = new Player (name, email);
      localStorage.setItem(name, JSON.stringify(user));
    }
    $(this).hide();
    $('#theme').show();
  });

  $('#theme').click(function(){
    damla.startGame();
  });


  var damla = {
    level: 1,
    seq: [],
    userSeq: [],

    startGame: function() {

    },
  };

});
