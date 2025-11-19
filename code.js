

        // --- 1. SMOOTH SCROLL ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // --- 2. FADE-IN ON SCROLL ---
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = {
            threshold: 0.1, /* Thoda pehle dikhe */
            rootMargin: "0px 0px -50px 0px" 
        };
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target); 
                }
            });
        }, appearOptions);
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });

        // --- 3. DARK/LIGHT MODE TOGGLE ---
        const toggleButton = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme');
        const iconSpan = toggleButton.querySelector('.icon');

        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'light-theme') {
                iconSpan.textContent = '☀️';
                toggleButton.style.color = '#f59e0b'; // Sun icon color
            } else {
                iconSpan.textContent = '🌙';
            }
        }

        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');

            let theme = 'dark-theme';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light-theme';
                iconSpan.textContent = '☀️'; // Change to Sun
                toggleButton.style.color = '#f59e0b';
            } else {
                theme = 'dark-theme';
                iconSpan.textContent = '🌙'; // Change to Moon
                toggleButton.style.color = 'var(--icon-color)';
            }
            localStorage.setItem('theme', theme);
        });
        
