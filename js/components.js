class LayoutManager {
    constructor() {
        this.basePath = this.detectBasePath();
        this.lang = localStorage.getItem('ancestral_lang') || 'en';
        this.revealBody(); // Reveal early
        this.initTailwind();
        this.renderNavbar();
        this.renderFooter();
        this.applyTranslations();
    }

    detectBasePath() {
        const path = window.location.pathname;
        const subdirs = ['/rutina/', '/comunidad/', '/nosotros/', '/blog/', '/contacto/'];
        const isSubdir = subdirs.some(subdir => path.includes(subdir));
        if (isSubdir) return '../';
        return './';
    }

    initTailwind() {
        const script = document.createElement('script');
        script.src = "https://cdn.tailwindcss.com";
        script.onload = () => {
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            bone: '#F5F5F5',
                            moss: '#2D3B2D',
                            carbon: '#1A1A1A',
                            glacial: '#A2D2FF',
                            terracotta: '#B35A38',
                        },
                        fontFamily: {
                            sans: ['Inter', 'sans-serif'],
                            serif: ['Playfair Display', 'serif'],
                        }
                    }
                }
            };
        };
        document.head.appendChild(script);
    }

    applyTranslations() {
        if (!window.translations) return;
        const t = window.translations[this.lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.getAttribute('placeholder')) el.setAttribute('placeholder', t[key]);
                } else {
                    el.innerText = t[key];
                }
            }
        });
        const titleKey = document.body.getAttribute('data-title-i18n');
        if (titleKey && t[titleKey]) document.title = t[titleKey];
    }

    toggleLanguage() {
        this.lang = this.lang === 'en' ? 'es' : 'en';
        localStorage.setItem('ancestral_lang', this.lang);
        location.reload();
    }

    revealBody() {
        document.body.style.transition = 'opacity 0.4s ease-in-out';
        document.body.style.opacity = '1';
        setTimeout(() => { document.body.style.opacity = '1'; }, 100);
    }

    renderNavbar() {
        const navbar = document.getElementById('navbar-container');
        if (!navbar || !window.translations) return;
        const t = window.translations[this.lang];
        navbar.innerHTML = `
            <nav class="glass-nav fixed w-full z-50 transition-all duration-300">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-20">
                        <div class="flex-shrink-0 flex items-center">
                            <a href="${this.basePath}index.html" class="font-serif text-2xl font-bold text-moss">ANCESTRAL.</a>
                        </div>
                        <div class="hidden md:flex space-x-8 items-center">
                            <a href="${this.basePath}index.html" class="text-carbon hover:text-moss">${t.nav_home}</a>
                            <a href="${this.basePath}rutina/index.html" class="text-carbon hover:text-moss">${t.nav_routine}</a>
                            <a href="${this.basePath}nosotros/index.html" class="text-carbon hover:text-moss">${t.nav_philosophy}</a>
                            <button id="lang-toggle-btn" class="border border-moss/20 px-2 py-1 rounded text-xs font-bold">${this.lang.toUpperCase()}</button>
                            <a href="${this.basePath}contacto/index.html" class="bg-moss text-white px-6 py-2 rounded-full">${t.nav_contact}</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        const langBtn = document.getElementById('lang-toggle-btn');
        if (langBtn) langBtn.addEventListener('click', () => this.toggleLanguage());
    }

    renderFooter() {
        const footer = document.getElementById('footer-container');
        if (!footer || !window.translations) return;
        const t = window.translations[this.lang];
        footer.innerHTML = `
            <footer class="bg-moss text-bone py-12 border-t border-gray-700">
                <div class="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2026 Ancestral Skincare. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
}
document.addEventListener('DOMContentLoaded', () => { new LayoutManager(); });