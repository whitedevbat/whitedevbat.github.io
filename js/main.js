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
        if (!conceptItems.length || !prevBtn || !nextBtn) {
            console.error('Erro: Elementos do carrossel não encontrados.');
            return;
        }
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

    // Contact form validation (for sobre.html)
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                formFeedback.textContent = 'Por favor, preencha todos os campos.';
                formFeedback.style.color = '#ff5555';
            } else if (!emailRegex.test(email)) {
                formFeedback.textContent = 'Por favor, insira um e-mail válido.';
                formFeedback.style.color = '#ff5555';
            } else {
                formFeedback.textContent = 'Mensagem enviada com sucesso! O EncryptedLab entrará em contacto em breve.';
                formFeedback.style.color = '#40c4ff';
                contactForm.reset();
            }
        });
    }
});