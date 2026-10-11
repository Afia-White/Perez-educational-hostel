/* =========================================
   FEATURED CARD SCROLL ANIMATION
========================================= */

const featuredCards = document.querySelectorAll(".reveal-card");

const cardObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show-card");

            }

        });

    },
    {
        threshold: 0.15
    }
);


featuredCards.forEach(function(card) {

    cardObserver.observe(card);

});

/* =========================================
   FACILITIES SCROLL ANIMATION
========================================= */

const facilityCards =
    document.querySelectorAll(".facility-card");


const facilityCardObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "facility-visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


facilityCards.forEach(function(card) {

    facilityCardObserver.observe(card);

});

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Reveal "Why" rows ---------- */
  const whyRows = document.querySelectorAll('.why-row[data-reveal]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const i = [...whyRows].indexOf(entry.target);
        entry.target.style.transitionDelay = `${i * 90}ms`;
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  whyRows.forEach((r) => revealObs.observe(r));

  /* ---------- 2. Testimonial Slider ---------- */
  const track = document.getElementById('testiTrack');
  const cards = track.querySelectorAll('.t-card');
  const dotsWrap = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  let current = 0;
  let perView = getPerView();
  let maxIndex = Math.max(0, cards.length - perView);

  function getPerView() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  // build dots
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      if (i === current) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function update() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const offset = current * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    [...dotsWrap.children].forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function goTo(i) {
    current = Math.max(0, Math.min(i, maxIndex));
    update();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  /* ---------- Auto-play ---------- */
  let autoplay = setInterval(() => {
    current = current >= maxIndex ? 0 : current + 1;
    update();
  }, 4500);

  // pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      current = current >= maxIndex ? 0 : current + 1;
      update();
    }, 4500);
  });

  /* ---------- Rebuild on resize ---------- */
  window.addEventListener('resize', () => {
    perView = getPerView();
    maxIndex = Math.max(0, cards.length - perView);
    if (current > maxIndex) current = maxIndex;
    buildDots();
    update();
  });

  buildDots();
  update();
});

// facilities
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.fac-card[data-reveal]');

  /* ---------- 1. Staggered Reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = [...cards].indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 110}ms`;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  cards.forEach((c) => revealObserver.observe(c));

  /* ---------- 2. Subtle Parallax on Images ---------- */
  let ticking = false;
  const images = document.querySelectorAll('.fac-card img');

  const updateParallax = () => {
    images.forEach((img) => {
      const rect = img.parentElement.getBoundingClientRect();
      // only animate if in view
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2)
                     / window.innerHeight;
      // cap between -1 and 1
      const clamped = Math.max(-1, Math.min(1, offset));
      const shift = clamped * -18; // shift up to 18px

      img.style.transform = `translateY(${shift}px) scale(1.08)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  updateParallax();
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-scroll-track]');
  const cards = document.querySelectorAll('.f-card');

  /* ---------- 1. Staggered Reveal on Scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = [...cards].indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 120}ms`;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => revealObserver.observe(card));

  /* ---------- 2. Parallax Drift on Scroll ---------- */
  let ticking = false;
  const parallaxCards = document.querySelectorAll('[data-parallax]');

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxCards.forEach((card) => {
      const dir = parseFloat(card.dataset.parallax); // 1 or -1
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      // distance from center of viewport (-1 → 1 range)
      const offset = (cardCenter - viewportCenter) / window.innerHeight;
      const shift = offset * 30 * dir; // max 30px shift

      card.style.setProperty('--drift', `${shift}px`);
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();
});document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.gallery__item');
  const preview = document.getElementById('galleryPreview');
  const previewImg = document.getElementById('galleryPreviewImg');

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;

  /* ---------- Smooth follow loop (lerp) ---------- */
  const follow = () => {
    // ease toward the mouse position
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    preview.style.left = `${currentX}px`;
    preview.style.top  = `${currentY}px`;

    rafId = requestAnimationFrame(follow);
  };

  /* ---------- Attach listeners to each name ---------- */
  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const img = item.dataset.img;
      previewImg.src = img;
      preview.classList.add('is-active');

      // start following if not already
      if (!rafId) {
        currentX = mouseX;
        currentY = mouseY;
        follow();
      }
    });

    item.addEventListener('mouseleave', () => {
      preview.classList.remove('is-active');

      // stop follow loop once hidden
      setTimeout(() => {
        if (!preview.classList.contains('is-active')) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }, 400);
    });
  });

  /* ---------- Track mouse globally ---------- */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* ---------- Touch fallback (tap to preview) ---------- */
  items.forEach((item) => {
    item.addEventListener('touchstart', () => {
      previewImg.src = item.dataset.img;
      preview.classList.add('is-active');
      preview.style.left = '50%';
      preview.style.top  = '50%';
    });
  });

  document.addEventListener('touchend', () => {
    preview.classList.remove('is-active');
  });
});


const contactForm = document.getElementById("hostelContactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value.trim();
        const status = document.getElementById("contactFormStatus");

        if (!name || !email || !subject || !message) {
            status.textContent = "Please complete all required fields.";
            status.style.color = "#b42318";
            return;
        }

        status.textContent =
            "Your form has been checked, but it has not been sent yet. Connect a form service or email backend to deliver your message.";

        status.style.color = "#0b8064";
    });
}