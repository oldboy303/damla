$(function() {

  var theme = '';

  var playerFound = false;

  var currentPlayer = {};

  var Player = function(name, email) {
    this.name = name;
    this.email = email;
    this.lastScore = 0;
  };

  var getImage = function() {
    $.ajax({
      url: 'http://api.pixplorer.co.uk/image?word=hi-res' + theme + '&amount=1&size=l',
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        $('#main').css({
          'background': 'url("' + res.images[0].imageurl + '") no-repeat center'
        });
        $('#main').css({
          'background-size': 'cover'
        });
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
    } else if ((!emailRegex.test(email) || email.length === 0)) {
      $('#email').focus();
    }else if (localStorage.getItem(name)) {
      currentPlayer = JSON.parse(localStorage.getItem(name));
      $('#theme').prepend('welcome back ' + name + '! <br> please pick a theme:');
      $(this).hide('slow');
      $('#theme').show('slow');
      playerFound = true;
    } else {
      currentPlayer = new Player(name, email);
      $('#theme').prepend(name + ', thanks for checking the game out! <br> please pick a theme:');
      $(this).hide('slow');
      $('#theme').show('slow');
    }
  });

  $('.themes').click(function() {
    theme = $(this).val();
    $('#theme').hide('slow');
    setTimeout(function() {
      damla.startGame();
    }, 3000)
    if (theme === 'space') {
      theme = 'galaxy';
      $('#main, #go, body, input').css({'background': 'black','color': 'white'});
    } else {
      $('#main, #go, body, input').css({'background': 'green','color': 'white'});
    }
    getImage();
    $('#main').show('slow');
  });

  var damla = {
    level: 1,
    seq: [],
    userSeq: [],

    startGame: function() {
      $('#below').show('slow');
      $('#user').text('user : ' + currentPlayer.name);
      $('#level').text('level : ' + this.level);
      $('#go').off('click');
      $('#go').hide('slow');
      this.seq = [];
      this.userSeq = [];
      this.seqGen();
    },

    seqGen: function() {
      for (var i = 0; i < this.level; i++) {
        var random = Math.floor(Math.random() * 7);
        (this.seq).push([1, 2, 3, 4, 5, 6, 7][random]);
      }
      this.displaySeq();
    },

    displaySeq: function() {
      var seqArr = $(this.seq);
      var i = 0;
      var self = this;
      var intervalId = setInterval(function() {
        if (seqArr[i]) {
          $('.orb[data-orb=' + seqArr[i] + ']').animate({
            'opacity': '1'
          }).delay(300).animate({
            'opacity': '.5'
          });
          self.tones(seqArr[i]);
          i++;
        } else {
          window.clearInterval(intervalId);
          self.userInput();
        }
      }, 1200);
    },

    userInput: function() {
      var self = this;
      $('.orb').on('click', function() {
        $(this).animate({
          'opacity': '1'
        });
        $(this).animate({
          'opacity': '.5'
        });
        self.tones($(this).data('orb'));
        (self.userSeq).push($(this).data('orb'));
        if ((self.userSeq).length === (self.seq).length) {
          $('.orb').off('click');
          self.compareSeq();
        };
      });
    },

    compareSeq: function() {
      $(".orb").off('click');
      if ((this.seq).join('') === (this.userSeq).join('')) {
        this.levelUp();
      } else {
        this.gameOver();
      }
    },

    levelUp: function() {
      this.level += 1;
      this.seq = [];
      this.userSeq = [];
      $('#level').text('level : ' + this.level);
      getImage();
      setTimeout(function() {
        damla.seqGen();
      }, 3000);
    },

    gameOver: function() {
      var self = this;
      $('#main').hide();
      $('#below').hide();
      $('#go').show('slow').text('great job ' + 'san' + '! you made it to level ' + this.level + ' last time you made it to level ' + currentPlayer.lastScore + '. click this message to play again');
      currentPlayer.lastScore = this.level;
      this.level = 1;
      localStorage.setItem(currentPlayer.name, JSON.stringify(currentPlayer));
      $('#go').click(function() {
        getImage();
        $('#main').show('slow')
        $(this).hide('slow');
        setTimeout(function(){
          self.startGame();
        }, 3000)
      })
    },

    tones: function(orb) {
      var tone = $('<audio autoplay></audio>');
      tone.append('<source src="sounds/' + theme + '/' + orb + '.ogg" type="audio/ogg" />');
      tone.append('<source src="sounds/' + theme + '/' + orb + '.mp3" type="audio/mp3" />');
      $('[data-orb = ' + orb + ']').html(tone);
    },

  };

});
