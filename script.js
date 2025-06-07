document.addEventListener('DOMContentLoaded', function() {
  // Hero animation: Ascent in unique languages (no language tags, no repeats)
  const ascentWords = [
    // 'Aarohan', // Nepali
    'Ascent', // English
    '昇進', // Japanese
    'Восхождение', // Russian
    '파익', // Korean
    '升华', // Chinese
    // 'Yükseliş', // Turkish
    // 'Ανάβαση', // Greek
    // 'صعود', // Arabic
    'Подъем', // Russian (alt)
    'आरोहण', // Sanskrit
    'Ascenso', // Spanish
    'Uppgång', // Swedish
    'Ascension', // French
    'Aufstieg', // German
    'Ascesa', // Italian
    'Stijging', // Dutch
    'Tırmanış', // Turkish (alt)
    'Kiipeäminen', // Finnish
    'Wspinaczka', // Polish
    'Alzata', // Italian (alt)
    'Yükselme', // Turkish (alt2)
    'Elevación', // Spanish (alt)
    'Montée', // French (alt)
    'Pendakian', // Indonesian
    'Pendakian', // Malay
    'Escalada', // Portuguese
    'Escalade', // French (alt2)
    'Arrampicata', // Italian (alt2)
    'Climbing', // English (alt2)
    'Klatring', // Danish
    'Klatring', // Norwegian
    'Kletterei', // German (alt2)
    'Escale', // Catalan
    'Escalada', // Galician
    'Pāiki', // Maori
    'Fiakarana', // Malagasy
    'Kupanda', // Swahili
    'Ukukhuphuka', // Zulu
    'Igunya', // Yoruba
    'Ugwu', // Igbo
    'Pendakian', // Filipino

  ];
  let ascentIdx = 0;
  const ascentElem = document.getElementById('ascent-anim');
  let ascentInterval;
  if (ascentElem) {
    function animateAscentWord(word) {
      // Clear existing content
      ascentElem.innerHTML = '';
      
      // Create spans for each character
      const chars = word.split('');
      const charSpans = [];
      chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block'; // Required for transform animations
        span.style.opacity = 0; // Start invisible
        span.style.filter = 'blur(5px)'; // Start blurred
        ascentElem.appendChild(span);
        charSpans.push(span);
      });

      // Animate in (more dynamic/glitchy)
      gsap.fromTo(charSpans, {
        opacity: 0,
        filter: 'blur(8px)',
        x: (i, target) => (Math.random() - 0.5) * 50, // Random X offset
        y: (i, target) => (Math.random() - 0.5) * 50, // Random Y offset
        rotation: (i, target) => (Math.random() - 0.5) * 60, // Random rotation
        scale: (i, target) => 0.8 + Math.random() * 0.4, // Random scale between 0.8 and 1.2
      }, {
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: {
          each: 0.02, // Optimal: 0.02 (fast) | Slower: 0.04-0.08 | Faster: 0.005-0.01
          from: "random", // Start stagger from a random point
        },
        duration: 0.2, // Optimal: 0.2s (fast) | Slower: 0.3-0.5s | Faster: 0.05-0.1s
        ease: "power3.out", // More impactful ease
        onComplete: () => {
          // Only set up animate out if not the final Sanskrit word
          if (word !== 'आरोहण') {
            gsap.to(charSpans, {
              opacity: 0,
              filter: 'blur(8px)',
              x: (i, target) => (Math.random() - 0.5) * 50, // Random X offset
              y: (i, target) => (Math.random() - 0.5) * 50, // Random Y offset
              rotation: (i, target) => (Math.random() - 0.5) * 60, // Random rotation
              scale: (i, target) => 0.8 + Math.random() * 0.4,
              stagger: {
                each: 0.015, // Optimal: 0.015 (fast) | Slower: 0.03-0.06 | Faster: 0.005-0.01
                from: "random",
              },
              duration: 0.15, // Optimal: 0.15s (fast) | Slower: 0.2-0.4s | Faster: 0.04-0.08s
              ease: "power3.in",
              delay: 0.5, // Optimal: 0.5s | Slower: 0.8-1.2s | Faster: 0.2-0.4s
              onComplete: () => {
                ascentIdx = (ascentIdx + 1) % ascentWords.length;
                if (ascentWords[ascentIdx] !== 'आरोहण') {
                  animateAscentWord(ascentWords[ascentIdx]);
                } else {
                  animateAscentWord('आरोहण'); // Re-run for the Sanskrit word to make it permanent
                }
              }
            });
          }
        }
      });
    }

    // Start the animation
    animateAscentWord(ascentWords[ascentIdx]);
  }

  // Handle scroll-to-top button
  const scrollTopButton = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopButton.style.display = 'block';
    } else {
      scrollTopButton.style.display = 'none';
    }
  });
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const contactBanner = document.querySelector('.contact-banner');
  const contactHeading = document.getElementById('contact-heading');

  if (contactForm && contactBanner) {
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent default form submission

      const form = event.target;
      const formData = new FormData(form);
      const alias = formData.get('alias');

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
              'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Display success message
          contactForm.style.display = 'none';
          if (contactHeading) {
            contactHeading.style.display = 'none';
          }

          const successMessageHtml = `
            <div id="success-feedback" style="text-align: center; opacity: 0;">
              <h2 class="sent-message-anim">Message Sent! <span class="checkmark">✔</span></h2>
              <p class="sent-message-anim" style="margin-top: 1rem;">Thank you for your message, ${alias}!</p>
              <button id="send-another-btn" style="
                  background: #181818;
                  color: #fff;
                  border: 0.1px solid white;
                  border-style:groove;
                  border-radius: 6px;
                  padding: 0.7rem 1.5rem;
                  font-size: 1rem;
                  font-weight: bold;
                  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
                  font-family: 'Roboto Mono', monospace;
                  margin-top: 1.5rem;
              ">Send Another Message</button>
            </div>
          `;
          contactBanner.insertAdjacentHTML('afterbegin', successMessageHtml);

          setTimeout(() => {
              const successFeedback = document.getElementById('success-feedback');
              if (successFeedback) {
                  successFeedback.style.opacity = '1';
                  successFeedback.style.transition = 'opacity 0.6s ease-out';
              }
          }, 100);

          const sendAnotherBtn = document.getElementById('send-another-btn');
          if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', () => {
              const successFeedback = document.getElementById('success-feedback');
              if (successFeedback) {
                successFeedback.remove();
              }
              contactForm.reset();
              contactForm.style.display = 'flex';
              if (contactHeading) {
                contactHeading.style.display = 'block';
              }
            });
          }
        } else {
          // Handle non-OK responses (e.g., validation errors from Formspree)
          alert('Oops! There was a problem submitting your form. Please try again later.');
          console.error('Formspree submission error:', response.statusText);
        }
      } catch (error) {
        // Handle network errors
        alert('Network error. Please check your internet connection and try again.');
        console.error('Fetch error:', error);
      }
    });
  }
}); 