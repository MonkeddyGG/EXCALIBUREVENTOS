document.addEventListener('DOMContentLoaded', () => {

    // 1. Efecto Scroll en Navbar
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Menú Móvil
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // 3. Animaciones Reveal al hacer scroll
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); // Disparo inicial

    // 4. Animación de los Contadores (Estadísticas)
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Ajustar velocidad

            const updateCount = () => {
                const targetValue = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = targetValue / speed;

                if (count < targetValue) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = targetValue + (targetValue > 1000 ? "+" : "");
                }
            };
            updateCount();
        });
    }

    // Activar contadores cuando la sección es visible
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection && !hasCounted) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                runCounters();
                hasCounted = true;
            }
        }
    });

    // 5. Accordion FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Cerrar otros
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Alternar actual
            item.classList.toggle('active');
        });
    });

    // 6. Simulación de Formulario
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerHTML = 'Procesando...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Cotización enviada exitosamente. Un asesor de Excalibur Eventos te contactará.');
                quoteForm.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 1500);
        });
    }
});