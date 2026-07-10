export const setupSlider = (wrapperSelector, listSelector, prevSelector, nextSelector, dotsContainerSelector) => {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;

  const list = wrapper.querySelector(listSelector);
  const prevBtn = wrapper.querySelector(prevSelector);
  const nextBtn = wrapper.querySelector(nextSelector);
  const dotsContainer = wrapper.querySelector(dotsContainerSelector);

  if (!list) return;

  // Create and initialize pagination dots dynamically
  let dots = [];
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    const itemsCount = list.children.length;
    for (let i = 0; i < itemsCount; i++) {
      const li = document.createElement('li');
      li.classList.add('floraDot');
      if (i === 0) li.classList.add('is-current');
      dotsContainer.appendChild(li);
    }
    dots = dotsContainer.querySelectorAll('.floraDot');
  }

  // Disable/enable prev/next buttons based on scroll position
  const updateButtons = () => {
    if (!prevBtn && !nextBtn) return;
    const scrollPos = list.scrollLeft;
    const maxScroll = list.scrollWidth - list.clientWidth;

    if (prevBtn) prevBtn.disabled = scrollPos <= 0;
    // Add a 5px tolerance to account for sub-pixel rendering and rounding
    if (nextBtn) nextBtn.disabled = scrollPos >= maxScroll - 5;
  };

  // Scroll to a specific item by index
  const scrollToItem = (index) => {
    const items = list.children;
    if (items.length === 0 || index < 0 || index >= items.length) return;
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(list).gap) || 0;
    list.scrollTo({
      left: index * (itemWidth + gap),
      behavior: 'smooth'
    });
  };

  // Update active dot indicator based on current scroll position
  const updateDots = () => {
    if (!dots.length) return;
    
    const scrollPos = list.scrollLeft;
    const itemWidth = list.children[0].getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(list).gap) || 0;
    const fullWidth = itemWidth + gap;
    
    const index = Math.round(scrollPos / fullWidth);
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-current', i === index);
    });
  };

  // Previous button click handler
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const itemWidth = list.children[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(list).gap) || 0;
      list.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
    });
  }

  // Next button click handler
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const itemWidth = list.children[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(list).gap) || 0;
      list.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
    });
  }

  // Dot click handlers for direct navigation
  if (dots.length) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        scrollToItem(index);
      });
    });
  }

  // Update UI state during scroll
  list.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      updateDots();
      updateButtons();
    });
  });

  // Update UI state on window resize
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      updateDots();
      updateButtons();
    });
  });

  // Initial state
  updateButtons();
};

// Initialize feedback slider
setupSlider(
  '.floraReviewsSliderWrapper',
  '.floraReviewsList',
  '.floraPrevBtn',
  '.floraNextBtn',
  '.floraSliderDots'
);
