// Custom cursor with trailing effects
class CursorEffects {
  constructor() {
    this.cursor = null;
    this.trail = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.createCursor();
    this.bindEvents();
    this.animate();
  }

  createCursor() {
    // Create custom cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);

    // Create trail elements
    for (let i = 0; i < 8; i++) {
      const trailElement = document.createElement('div');
      trailElement.className = 'cursor-trail';
      trailElement.style.animationDelay = `${i * 0.05}s`;
      document.body.appendChild(trailElement);
      this.trail.push({
        element: trailElement,
        x: 0,
        y: 0
      });
    }
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .work-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('cursor-hover');
        this.trail.forEach(trail => trail.element.classList.add('trail-hover'));
      });
      
      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('cursor-hover');
        this.trail.forEach(trail => trail.element.classList.remove('trail-hover'));
      });
    });
  }

  animate() {
    // Update cursor position
    this.cursor.style.left = this.mouse.x + 'px';
    this.cursor.style.top = this.mouse.y + 'px';

    // Update trail
    this.trail.forEach((trail, index) => {
      const delay = (index + 1) * 0.1;
      trail.x += (this.mouse.x - trail.x) * (0.3 - delay * 0.02);
      trail.y += (this.mouse.y - trail.y) * (0.3 - delay * 0.02);
      
      trail.element.style.left = trail.x + 'px';
      trail.element.style.top = trail.y + 'px';
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize cursor effects
document.addEventListener('DOMContentLoaded', () => {
  new CursorEffects();
});