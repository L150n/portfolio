$(window).on("load", function () {
  gsap.to("#loader", 1, { y: "-100%" });
  gsap.to("#loader", 1, { opacity: 0 });
  gsap.to("#loader", 0, { display: "none", delay: 1 });
  gsap.to("#header", 0, { display: "block", delay: 1 });
  gsap.to("#navigation-content", 0, { display: "none" });
  gsap.to("#navigation-content", 0, { display: "flex", delay: 1 });
  
  // Lock scrolling on Home page by default
  document.body.style.overflowY = "hidden";
});
$(function () {
  $(".color-panel").on("click", function (e) {
    e.preventDefault();
    $(".color-changer").toggleClass("color-changer-active");
  });
  $(".colors a").on("click", function (e) {
    e.preventDefault();
    var attr = $(this).attr("title");
    console.log(attr);
    $("head").append('<link rel="stylesheet" href="css/' + attr + '.css">');
  });
});
$(function () {
  $(".menubar").on("click", function () {
    gsap.to("#navigation-content", 0.6, { y: 0 });
  });
  $(".navigation-close").on("click", function () {
    gsap.to("#navigation-content", 0.6, { y: "-100%" });
  });
});

$(function () {
  var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 100;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-rotate");
      var period = elements[i].getAttribute("data-period");
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
});
$(function () {
  // Liquid glass page transition
  function navigateTo(showSection, sectionLabel) {
    const transition = document.getElementById("page-transition");
    const transitionText = transition.querySelector(".transition-text");
    const allSections = [
      "#header",
      "#about",
      "#portfolio",
      "#contact",
      "#blog",
    ];

    // Set label
    transitionText.textContent = sectionLabel;

    // Close nav
    gsap.to("#navigation-content", 0, { display: "none", delay: 0.3 });
    gsap.to("#navigation-content", 0, { y: "-100%", delay: 0.3 });

    // Show transition overlay
    transition.classList.add("active");

    // After overlay fades in, swap sections
    setTimeout(() => {
      allSections.forEach((id) => {
        gsap.set(id, { display: "none" });
      });
      gsap.set(showSection, { display: "block" });
      window.scrollTo(0, 0);

      // Manage scrolling: locked on Home, auto elsewhere
      if (showSection === "#header") {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }, 400);

    // Fade out overlay
    setTimeout(() => {
      transition.classList.remove("active");
    }, 800);

    // Re-enable nav
    gsap.to("#navigation-content", 0, { display: "flex", delay: 1.2 });
  }

  $("#about-link").on("click", function () {
    navigateTo("#about", "About");
  });
  $("#contact-link").on("click", function () {
    navigateTo("#contact", "Contact");
  });
  $("#portfolio-link").on("click", function () {
    navigateTo("#portfolio", "Projects");
  });
  $("#blog-link").on("click", function () {
    navigateTo("#blog", "Blog");
  });
  $("#home-link").on("click", function () {
    navigateTo("#header", "Home");
  });
});
$(function () {
  var body = document.querySelector("body");
  var $cursor = $(".cursor");
  function cursormover(e) {
    gsap.to($cursor, {
      x: e.clientX,
      y: e.clientY,
      stagger: 0.002,
    });
  }
  function cursorhover(e) {
    gsap.to($cursor, {
      scale: 1.4,
      opacity: 1,
    });
  }
  function cursor(e) {
    gsap.to($cursor, {
      scale: 1,
      opacity: 0.6,
    });
  }
  $(window).on("mousemove", cursormover);
  $(".menubar").hover(cursorhover, cursor);
  $("a").hover(cursorhover, cursor);
  $(".navigation-close").hover(cursorhover, cursor);
});
$(function () {
  // Configuration
  const CONFIG = {
    animations: {
      error: {
        duration: 0.4,
        shake: [-10, 10, -10, 10, 0],
        errorColor: "rgba(255,0,0,0.1)",
      },
      success: {
        duration: 0.3,
        successColor: "rgba(0,255,0,0.1)",
      },
      reset: {
        duration: 0.3,
      },
    },
    messages: {
      required: "This field is required",
      email: {
        format: "Email format is wrong",
        required: "Email is required",
      },
      success: "Form submitted successfully!",
    },
  };

  // Utility functions
  function isValidEmail(email) {
    // More comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  function createTooltip(field, message) {
    const $tooltip = $("<div>")
      .addClass("validation-tooltip")
      .text(message)
      .css({
        position: "absolute",
        background: "rgba(255,0,0,0.8)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        opacity: 0,
        zIndex: 1000,
      });

    $(field).parent().css("position", "relative").append($tooltip);

    const fieldOffset = $(field).position();
    $tooltip.css({
      top: fieldOffset.top + $(field).outerHeight() + 5,
      left: fieldOffset.left,
    });

    gsap.to($tooltip, {
      opacity: 1,
      y: 5,
      duration: 0.3,
    });

    return $tooltip;
  }

  function resetFieldStyle(field) {
    const $tooltip = $(field).parent().find(".validation-tooltip");
    if ($tooltip.length) {
      gsap.to($tooltip, {
        opacity: 0,
        duration: CONFIG.animations.reset.duration,
        onComplete: () => $tooltip.remove(),
      });
    }

    gsap.to(field, {
      backgroundColor: "transparent",
      duration: CONFIG.animations.reset.duration,
    });
  }

  function displayError(field, message) {
    createTooltip(field, message);

    gsap.to(field, {
      x: CONFIG.animations.error.shake,
      duration: CONFIG.animations.error.duration,
      backgroundColor: CONFIG.animations.error.errorColor,
    });
  }

  function displaySuccess(field) {
    gsap.to(field, {
      backgroundColor: CONFIG.animations.success.successColor,
      duration: CONFIG.animations.success.duration,
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
  $("#email").on("input", function () {
    const $field = $(this);
    const value = $field.val();

    if (value && !isValidEmail(value)) {
      displayError(this, CONFIG.messages.email.format);
    } else {
      resetFieldStyle(this);
    }
  });

  // Attach reset style to other input fields
  $("#name, #subject, #body").on("input", function () {
    resetFieldStyle(this);
  });

  // Form submission handler
  $("#submit").on("click", function (e) {
    e.preventDefault();

    // Gather form data
    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      subject: $("#subject").val(),
      message: $("#body").val(),
    };

    // Validation
    let isValid = true;
    isValid = validateField("#name") && isValid;
    isValid = validateEmail("#email") && isValid;
    isValid = validateField("#subject") && isValid;
    isValid = validateField("#body") && isValid;

    if (!isValid) return;

    // Show success message
    const $successMessage = $("<div>")
      .addClass("success-message")
      .text(CONFIG.messages.success)
      .css({
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "rgba(0,255,0,0.8)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "4px",
        opacity: 0,
        zIndex: 1000,
      })
      .appendTo("body");

    // Animate success message
    gsap
      .timeline()
      .to($successMessage, {
        opacity: 1,
        x: -20,
        duration: 0.5,
      })
      .to($successMessage, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        delay: 2,
        onComplete: () => $successMessage.remove(),
      });

    // Here you would typically send the form data to your server
    //console.log('Form submitted:', formData);

    // Reset form
    $("#name, #email, #subject, #body")
      .val("")
      .each(function () {
        resetFieldStyle(this);
      });
  });
});

// Magnetic Buttons
$(function () {
  const magneticElements = document.querySelectorAll(
    ".social-media, .cv button, .button button, .color-panel img",
  );

  magneticElements.forEach((elem) => {
    elem.addEventListener("mousemove", (e) => {
      const pos = elem.getBoundingClientRect();
      const x = e.clientX - pos.left - pos.width / 2;
      const y = e.clientY - pos.top - pos.height / 2;

      gsap.to(elem, {
        x: x * 0.3,
        y: y * 0.3,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    elem.addEventListener("mouseleave", () => {
      gsap.to(elem, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });
});

// Section Entrance Animations
// The site toggles sections via display:none/block — ScrollTrigger won't work.
// Instead, we use a MutationObserver to detect when a section becomes visible,
// then animate its child elements with staggered GSAP tweens.
$(function () {
  const sectionAnimations = {
    "#about": [
      { selector: ".about-header", y: 40, delay: 0 },
      { selector: ".about-first-paragraph", y: 40, delay: 0.2 },
      { selector: ".skill", y: 30, delay: 0.1, stagger: true },
    ],
    "#portfolio": [
      { selector: ".portfolio-header", y: 40, delay: 0 },
      { selector: ".portfolio", y: 30, delay: 0.15, stagger: true },
    ],
    "#contact": [
      { selector: ".contact-header", y: 40, delay: 0 },
      { selector: ".contact-form", y: 40, delay: 0.2 },
      { selector: ".contact-info", y: 40, delay: 0.3 },
    ],
  };

  function animateSection(sectionId) {
    const config = sectionAnimations[sectionId];
    if (!config) return;

    config.forEach((item) => {
      const elements = document.querySelectorAll(
        sectionId + " " + item.selector,
      );
      if (!elements.length) return;

      if (item.stagger) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: item.y },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: item.delay + 0.3,
            ease: "power2.out",
          },
        );
      } else {
        gsap.fromTo(
          elements,
          { opacity: 0, y: item.y },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: item.delay + 0.3,
            ease: "power2.out",
          },
        );
      }
    });
  }

  // Observe each section for display changes
  const sectionsToWatch = ["#about", "#portfolio", "#contact"];

  sectionsToWatch.forEach((sectionId) => {
    const el = document.querySelector(sectionId);
    if (!el) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          const computedDisplay = window.getComputedStyle(el).display;
          if (computedDisplay !== "none") {
            animateSection(sectionId);
          }
        }
      });
    });

    observer.observe(el, { attributes: true, attributeFilter: ["style"] });
  });
});


// Load Dynamic Data
$(function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate About
            if (data.about) {
                $('#about-role').text(' ' + data.about.role);
                $('#about-desc').text(data.about.description);
            }

            // Populate Skills
            if (data.skills && document.getElementById('skills-container')) {
                let skillsHtml = '';
                data.skills.forEach(skill => {
                    // Rating is out of 10, convert to percentage
                    let widthPercent = skill.rating * 10;
                    skillsHtml += `
                    <div class="skill-html skill">
                        <div class="skill-text">
                            <div class="html">${skill.name}</div>
                        </div>
                        <div class="html-prog wow prog">
                            <div class="skill-progress-bar wow" style="width: ${widthPercent}%;"></div>
                        </div>
                    </div>`;
                });
                $('#skills-container').html(skillsHtml);
            }

            // Populate Projects
            if (data.projects && document.querySelector('.portfolio-dynamic-container')) {
                let projectsHtml = '';
                data.projects.forEach((proj, idx) => {
                    // alternate between portfolio-first, portfolio-second, portfolio-third for slight variations
                    const classes = ['portfolio-first', 'portfolio-second', 'portfolio-third'];
                    const cardClass = classes[idx % classes.length];
                    
                    let linkHtml = '';
                    if (proj.link) {
                        linkHtml = `
                        <div class="button">
                            <a href="${proj.link}" target="_blank">
                                <button><span class="index">View Project<i class="gg-arrow-right"></i></span></button>
                            </a>
                        </div>`;
                    }

                    projectsHtml += `
                    <div class="portfolio ${cardClass}">
                        <div class="portfolio-image">
                            <img src="${proj.image}" alt="${proj.title}">
                        </div>
                        <div class="portfolio-text">
                            <h2>${proj.title}</h2>
                            <p>${proj.description}</p>
                            ${linkHtml}
                        </div>
                    </div>`;
                });
                $('.portfolio-dynamic-container').html(projectsHtml);
            }
        })
        .catch(err => console.error("Error loading data.json:", err));
});
