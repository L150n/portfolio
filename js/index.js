$(window).on('load',function(){
  gsap.to('#loader',1,{y:"-100%"});
  gsap.to('#loader',1,{opacity:0});
  gsap.to('#loader',0,{display:"none",delay:1});
  gsap.to('#header',0,{display:"block",delay:1})
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{display:"flex",delay:1});
})
$(function(){
  $('.color-panel').on("click",function(e) {
    e.preventDefault();
    $('.color-changer').toggleClass('color-changer-active');
});
$('.colors a').on("click",function(e) {
  e.preventDefault();
  var attr = $(this).attr("title");
  console.log(attr);
  $('head').append('<link rel="stylesheet" href="css/'+attr+'.css">');
});
});
$(function(){
     $('.menubar').on('click',function(){
         gsap.to('#navigation-content',.6,{y:0});
     })
     $('.navigation-close').on('click',function(){
        gsap.to('#navigation-content',.6,{y:"-100%"});
    });
   }); 

$(function(){
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 200 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 100;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666 ; }";
        document.body.appendChild(css);
      };
})
$(function(){

    $('#about-link').on('click',function(){
      gsap.to('#navigation-content',0,{display:"none",delay:.7});
      gsap.to('#navigation-content',0,{y:'-100%',delay:.7});
  gsap.to('#header',0,{display:"none"});
gsap.to('#blog',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
   gsap.to('#breaker',0,{display:"block"});
   gsap.to('#breaker-two',0,{display:"block",delay:.1});
gsap.to('#contact',0,{display:"none"});
   gsap.to('#breaker',0,{display:"none",delay:2});
   gsap.to('#breaker-two',0,{display:"none",delay:2});
   gsap.to('#about',0,{display:"block",delay:.7});
   gsap.to('#navigation-content',0,{display:'flex',delay:2});
 })
 $('#contact-link').on('click',function(){
   gsap.to('#navigation-content',0,{display:"none",delay:.7});
   gsap.to('#navigation-content',0,{y:'-100%',delay:.7});
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#blog',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block",delay:.1});
gsap.to('#breaker',0,{display:"none",delay:2});
gsap.to('#breaker-two',0,{display:"none",delay:2});
gsap.to('#contact',0,{display:"block",delay:.7});
gsap.to('#navigation-content',0,{display:'flex',delay:2});
})
$('#portfolio-link').on('click',function(){
  gsap.to('#navigation-content',0,{display:"none",delay:.7});
  gsap.to('#navigation-content',0,{y:'-100%',delay:.7});
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#contact',0,{display:"none"});
gsap.to('#blog',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block",delay:.1});
gsap.to('#breaker',0,{display:"none",delay:2});
gsap.to('#breaker-two',0,{display:"none",delay:2});
gsap.to('#portfolio',0,{display:"block",delay:.7});
gsap.to('#navigation-content',0,{display:'flex',delay:2});
})
$('#blog-link').on('click',function(){
  gsap.to('#navigation-content',0,{display:"none",delay:.7});
  gsap.to('#navigation-content',0,{y:'-100%',delay:.7});
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
gsap.to('#contact',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block",delay:.1});
gsap.to('#breaker',0,{display:"none",delay:2});
gsap.to('#breaker-two',0,{display:"none",delay:2});
gsap.to('#blog',0,{display:"block",delay:.7});
gsap.to('#navigation-content',0,{display:'flex',delay:2});
})
$('#home-link').on('click',function(){
  gsap.to('#navigation-content',0,{display:"none",delay:.7});
  gsap.to('#navigation-content',0,{y:'-100%',delay:.7});
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
gsap.to('#contact',0,{display:"none"});
gsap.to('#blog',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block",delay:.1});
gsap.to('#breaker',0,{display:"none",delay:2});
gsap.to('#breaker-two',0,{display:"none",delay:2});
gsap.to('#header',0,{display:"block",delay:.7});
gsap.to('#navigation-content',0,{display:'flex',delay:2});
})

})
$(function(){
 var body =  document.querySelector('body');
 var $cursor = $('.cursor')
   function cursormover(e){
    
    gsap.to( $cursor, {
      x : e.clientX ,
      y : e.clientY,
      stagger:.002
     })
   }
   function cursorhover(e){
    gsap.to( $cursor,{
     scale:1.4,
     opacity:1
    })
    
  }
  function cursor(e){
    gsap.to( $cursor, {
     scale:1,
     opacity:.6
    }) 
  }
  $(window).on('mousemove',cursormover);
  $('.menubar').hover(cursorhover,cursor);
  $('a').hover(cursorhover,cursor);
  $('.navigation-close').hover(cursorhover,cursor);

})
$(function() {
  // Configuration
  const CONFIG = {
      animations: {
          error: {
              duration: 0.4,
              shake: [-10, 10, -10, 10, 0],
              errorColor: 'rgba(255,0,0,0.1)'
          },
          success: {
              duration: 0.3,
              successColor: 'rgba(0,255,0,0.1)'
          },
          reset: {
              duration: 0.3
          }
      },
      messages: {
          required: 'This field is required',
          email: {
              format: 'Email format is wrong',
              required: 'Email is required'
          },
          success: 'Form submitted successfully!'
      }
  };

  // Utility functions
  function isValidEmail(email) {
      // More comprehensive email validation regex
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
  }

  function createTooltip(field, message) {
      const $tooltip = $('<div>')
          .addClass('validation-tooltip')
          .text(message)
          .css({
              position: 'absolute',
              background: 'rgba(255,0,0,0.8)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              opacity: 0,
              zIndex: 1000
          });

      $(field).parent().css('position', 'relative').append($tooltip);

      const fieldOffset = $(field).position();
      $tooltip.css({
          top: fieldOffset.top + $(field).outerHeight() + 5,
          left: fieldOffset.left
      });

      gsap.to($tooltip, {
          opacity: 1,
          y: 5,
          duration: 0.3
      });

      return $tooltip;
  }

  function resetFieldStyle(field) {
      const $tooltip = $(field).parent().find('.validation-tooltip');
      if ($tooltip.length) {
          gsap.to($tooltip, {
              opacity: 0,
              duration: CONFIG.animations.reset.duration,
              onComplete: () => $tooltip.remove()
          });
      }

      gsap.to(field, {
          backgroundColor: 'transparent',
          duration: CONFIG.animations.reset.duration
      });
  }

  function displayError(field, message) {
      createTooltip(field, message);
      
      gsap.to(field, {
          x: CONFIG.animations.error.shake,
          duration: CONFIG.animations.error.duration,
          backgroundColor: CONFIG.animations.error.errorColor
      });
  }

  function displaySuccess(field) {
      gsap.to(field, {
          backgroundColor: CONFIG.animations.success.successColor,
          duration: CONFIG.animations.success.duration
      });
  }

  function validateEmail(field) {
      const $field = $(field);
      const value = $field.val();

      if (!value) {
          displayError(field, CONFIG.messages.email.required);
          return false;
      }

      if (!isValidEmail(value)) {
          displayError(field, CONFIG.messages.email.format);
          return false;
      }

      displaySuccess(field);
      return true;
  }

  function validateField(field) {
      const $field = $(field);
      const value = $field.val();

      if (!value) {
          displayError(field, CONFIG.messages.required);
          return false;
      }

      displaySuccess(field);
      return true;
  }

  // Real-time email validation
  $('#email').on('input', function() {
      const $field = $(this);
      const value = $field.val();
      
      if (value && !isValidEmail(value)) {
          displayError(this, CONFIG.messages.email.format);
      } else {
          resetFieldStyle(this);
      }
  });

  // Attach reset style to other input fields
  $('#name, #subject, #body').on('input', function() {
      resetFieldStyle(this);
  });

  // Form submission handler
  $('#submit').on('click', function(e) {
      e.preventDefault();

      // Gather form data
      const formData = {
          name: $('#name').val(),
          email: $('#email').val(),
          subject: $('#subject').val(),
          message: $('#body').val()
      };

      // Validation
      let isValid = true;
      isValid = validateField('#name') && isValid;
      isValid = validateEmail('#email') && isValid;
      isValid = validateField('#subject') && isValid;
      isValid = validateField('#body') && isValid;

      if (!isValid) return;

      // Show success message
      const $successMessage = $('<div>')
          .addClass('success-message')
          .text(CONFIG.messages.success)
          .css({
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'rgba(0,255,0,0.8)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              opacity: 0,
              zIndex: 1000
          })
          .appendTo('body');

      // Animate success message
      gsap.timeline()
          .to($successMessage, {
              opacity: 1,
              x: -20,
              duration: 0.5
          })
          .to($successMessage, {
              opacity: 0,
              x: 20,
              duration: 0.5,
              delay: 2,
              onComplete: () => $successMessage.remove()
          });

      // Here you would typically send the form data to your server
      //console.log('Form submitted:', formData);
      
      // Reset form
      $('#name, #email, #subject, #body').val('').each(function() {
          resetFieldStyle(this);
      });
  });
});
