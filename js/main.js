document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Highlight active page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Concepts carousel
    const conceptItems = document.querySelectorAll('.concept-item');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    let currentConcept = 0;

    function updateCarousel() {
        conceptItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentConcept);
        });
        prevBtn.disabled = currentConcept === 0;
        nextBtn.disabled = currentConcept === conceptItems.length - 1;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentConcept > 0) {
                currentConcept--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentConcept < conceptItems.length - 1) {
                currentConcept++;
                updateCarousel();
            }
        });

        updateCarousel();
    }
});
