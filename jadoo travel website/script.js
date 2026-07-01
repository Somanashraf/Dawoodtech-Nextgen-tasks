const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
  navMenu.classList.toggle('is-open');
});

navMenu.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navMenu.classList.remove('is-open');
  });
});

// close nav when clicking outside
document.addEventListener('click', function(e) {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('is-open');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

var likeBtn = document.querySelector('.like-btn');
if (likeBtn) {
  likeBtn.addEventListener('click', function() {
    this.classList.toggle('liked');
    var icon = this.querySelector('i');
    if (this.classList.contains('liked')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  });
}

document.querySelectorAll('.testi-dots .dot').forEach(function(dot) {
  dot.addEventListener('click', function() {
    document.querySelectorAll('.testi-dots .dot').forEach(function(d) {
      d.classList.remove('active');
    });
    this.classList.add('active');
  });
});

var subBtn   = document.getElementById('subBtn');
var subEmail = document.getElementById('subEmail');

if (subBtn && subEmail) {
  subBtn.addEventListener('click', function() {
    var email = subEmail.value.trim();
    if (email && email.indexOf('@') > -1) {
      subBtn.textContent = 'Subscribed!';
      subBtn.style.background = '#22c55e';
      subEmail.value = '';
      setTimeout(function() {
        subBtn.textContent = 'Subscribe';
        subBtn.style.background = '';
      }, 3000);
    } else {
      // highlight empty/invalid email field
      subEmail.style.outline = '2px solid red';
      setTimeout(function() {
        subEmail.style.outline = '';
      }, 2000);
    }
  });
}

window.addEventListener('scroll', function() {
  var header = document.querySelector('.header');
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.09)';
  } else {
    header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
  }
});
