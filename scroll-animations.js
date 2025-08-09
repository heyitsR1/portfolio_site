// Scroll-triggered animations
class ScrollAnimations {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Add animation classes to elements
    this.addAnimationClasses();
    
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements
    this.elements.forEach(el => this.observer.observe(el));
    
    // Add parallax effect
    this.addParallaxEffect();
  }

  addAnimationClasses() {
    // Project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
      item.classList.add('scroll-animate');
      item.style.animationDelay = `${index * 0.1}s`;
      this.elements.push(item);
    });

    // Work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
      item.classList.add('scroll-animate');
      item.style.animationDelay = `${index * 0.1}s`;
      this.elements.push(item);
    });

    // Section headers
    const headers = document.querySelectorAll('.projects-intro, .work-intro, .about-section-header h2');
    headers.forEach(header => {
      header.classList.add('scroll-animate');
      this.elements.push(header);
    });

    // About visuals
    const aboutVisuals = document.querySelectorAll('.about-coffee-man, .about-blog-card, .about-note');
    aboutVisuals.forEach((visual, index) => {
      visual.classList.add('scroll-animate');
      visual.style.animationDelay = `${index * 0.2}s`;
      this.elements.push(visual);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        this.observer.unobserve(entry.target);
      }
    });
  }

  addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.intro-video-background, .hero-video-background');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }
}

// Initialize scroll animations
new ScrollAnimations();