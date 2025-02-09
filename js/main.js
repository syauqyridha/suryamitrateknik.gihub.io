// Toggle Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan tombol hamburger menu untuk mobile
    const header = document.querySelector('.header');
    const navLinks = document.querySelector('.nav-links');
    
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    header.querySelector('.nav-container').insertBefore(hamburger, navLinks);
    
    // Toggle menu saat hamburger diklik
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scroll untuk semua link anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Tutup menu mobile jika terbuka
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Fungsi untuk menampilkan semua item dengan animasi yang lebih halus
    const showAllItems = () => {
        portfolioItems.forEach((item, index) => {
            // Tambahkan delay bertahap untuk setiap item
            setTimeout(() => {
                item.style.display = 'block';
                // Gunakan timeout terpisah untuk opacity dan transform
                requestAnimationFrame(() => {
                    item.classList.add('show');
                    item.classList.remove('hide');
                });
            }, index * 100); // Delay 100ms untuk setiap item
        });
    };

    // Fungsi untuk filter items dengan animasi yang lebih halus
    const filterItems = (filterValue) => {
        portfolioItems.forEach((item, index) => {
            const isItemFiltered = item.classList.contains(filterValue);
            
            if (filterValue === 'all' || isItemFiltered) {
                // Tunda menampilkan item yang sesuai filter
                setTimeout(() => {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.classList.add('show');
                        item.classList.remove('hide');
                    });
                }, index * 100);
            } else {
                // Sembunyikan item yang tidak sesuai filter
                item.classList.remove('show');
                item.classList.add('hide');
                // Tunggu animasi selesai sebelum mengubah display
                setTimeout(() => {
                    if (item.classList.contains('hide')) {
                        item.style.display = 'none';
                    }
                }, 500); // Sesuaikan dengan durasi transisi CSS
            }
        });
    };

    // Event listener untuk buttons dengan debounce
    let filterTimeout;
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Prevent multiple rapid clicks
            if (filterTimeout) {
                clearTimeout(filterTimeout);
            }
            
            filterTimeout = setTimeout(() => {
                // Remove active class from all buttons
                filterButtons.forEach(button => button.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                filterItems(filterValue);
            }, 200); // Delay untuk mencegah spam klik
        });
    });

    // Show all items on page load dengan animasi bertahap
    setTimeout(() => {
        showAllItems();
        // Set 'All' button as active by default
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    }, 500); // Tunggu sebentar setelah halaman dimuat

    // Scroll reveal animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const scrollReveal = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check for elements in view
    scrollReveal();
    
    // Check on scroll
    window.addEventListener('scroll', scrollReveal);

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai form
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Animasi loading pada tombol submit
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulasi pengiriman (ganti dengan actual API call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Tampilkan pesan sukses
                alert('Thank you for your message! We will get back to you soon.');
                
                // Kembalikan tombol ke kondisi awal
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const portfolioImages = document.querySelectorAll('.portfolio-item');
    
    // Open lightbox
    portfolioImages.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            const img = item.querySelector('img');
            const caption = item.querySelector('.portfolio-overlay h3').textContent;
            
            lightboxImage.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Navigate through images
    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
        updateLightboxImage();
    });
    
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
        updateLightboxImage();
    });
    
    function updateLightboxImage() {
        const currentItem = portfolioImages[currentImageIndex];
        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('.portfolio-overlay h3').textContent;
        
        lightboxImage.src = img.src;
        lightboxCaption.textContent = caption;
    }
    
    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
    
    // Smooth reveal animation for statistics
    const stats = document.querySelectorAll('.stat-item h3');
    
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                animateValue(target, 0, endValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 1000);
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hero Section Animation
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero');
    
    // Fungsi untuk menjalankan animasi
    const animateHero = () => {
        // Reset dengan menghapus class animate
        heroContent.classList.remove('animate');
        // Force reflow
        void heroContent.offsetWidth;
        // Tambahkan kembali class animate
        heroContent.classList.add('animate');
    };

    // Jalankan animasi saat halaman dimuat
    animateHero();

    // Observer untuk hero section
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateHero();
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: "0px" 
    });

    heroObserver.observe(heroSection);

    // Tambahkan event listener untuk menu Home
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            heroSection.scrollIntoView({ behavior: 'smooth' });
            // Jalankan animasi setelah scroll selesai
            setTimeout(animateHero, 800);
        });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const sliderDots = document.querySelector('.slider-dots');
    let currentTestimonial = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        sliderDots.appendChild(dot);
    });

    function showTestimonial(index) {
        testimonials.forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        document.querySelectorAll('.dot')[index].classList.add('active');
        currentTestimonial = index;
    }

    // Show first testimonial
    showTestimonial(0);

    // Auto slide
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
});
