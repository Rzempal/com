// common-scripts.js v1.001 - naprawa ukrywania sekcji CTA na zrzucie JPG

console.log("common-scripts.js: Skrypt załadowany.");

// Funkcja do wczytywania HTML z pliku i wstawiania do elementu
async function loadHTMLTemplate(url, elementId) {
    console.log(`common-scripts.js: Próba załadowania szablonu z ${url} do elementu #${elementId}`);
    try {
        const response = await fetch(url);
        console.log(`common-scripts.js: Status odpowiedzi dla ${url}: ${response.status}`);
        if (!response.ok) {
            throw new Error(`Nie udało się załadować szablonu: ${url}, status: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = text;
            console.log(`common-scripts.js: Szablon ${url} pomyślnie załadowany do #${elementId}.`);
        } else {
            console.warn(`common-scripts.js: Nie znaleziono elementu o ID: ${elementId} do załadowania szablonu ${url}`);
        }
    } catch (error) {
        console.error(`common-scripts.js: Błąd podczas ładowania szablonu HTML (${url}):`, error);
        if (window.location.protocol === 'file:') {
            console.warn("common-scripts.js: Wygląda na to, że otwierasz stronę bezpośrednio z systemu plików (file:///). Może to powodować problemy z ładowaniem szablonów z powodu ograniczeń bezpieczeństwa przeglądarki (CORS). Spróbuj uruchomić stronę przez lokalny serwer WWW.");
        }
    }
}

// Funkcja do inicjalizacji animacji przy przewijaniu
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length === 0) {
        // console.log("common-scripts.js: Nie znaleziono elementów do animacji przy przewijaniu.");
        return;
    }
    console.log(`common-scripts.js: Znaleziono ${revealElements.length} elementów do animacji przy przewijaniu.`);

    const revealObserverOptions = {
        root: null, // Względem viewportu dokumentu
        rootMargin: '0px',
        threshold: 0.1 // Element jest uważany za widoczny, gdy co najmniej 10% jego wysokości jest w viewportcie
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                console.log(`common-scripts.js: Element ${entry.target.id || entry.target.tagName} stał się widoczny.`);
                observer.unobserve(entry.target); // Przestań obserwować element po tym, jak stał się widoczny
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


// Główna funkcja inicjalizująca po załadowaniu DOM
async function initializePage() {
    console.log("common-scripts.js: initializePage() rozpoczęte.");

    await loadHTMLTemplate('navbar-template.html', 'navbar-placeholder');
    await loadHTMLTemplate('footer-template.html', 'footer-placeholder');
    
    console.log("common-scripts.js: Szablony nawigacji i stopki powinny być załadowane. Inicjalizacja pozostałych skryptów...");

    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        console.log("common-scripts.js: Inicjalizacja menu mobilnego.");
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    } else {
        console.warn("common-scripts.js: Nie znaleziono przycisku menu mobilnego lub samego menu.");
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith('#')) { 
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if(targetElement) {
                    e.preventDefault();
                    let headerTotalOffset = 0;
                    const stickyHeader = document.querySelector('header.sticky'); 
                    if (stickyHeader && getComputedStyle(stickyHeader).position === 'sticky') {
                         headerTotalOffset += stickyHeader.offsetHeight;
                    }
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerTotalOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }
        });
    });

    const currentYearFooterElement = document.getElementById('current-year-footer');
    if (currentYearFooterElement) {
        console.log("common-scripts.js: Ustawianie roku w stopce.");
        currentYearFooterElement.textContent = new Date().getFullYear();
    } else {
        console.warn("common-scripts.js: Nie znaleziono elementu 'current-year-footer'.");
    }
    
    // Inicjalizacja animacji przy przewijaniu
    initializeScrollAnimations();

    // Pozostałe skrypty specyficzne dla stron
    if (document.querySelector('.gallery-placeholder')) {
        console.log("common-scripts.js: Inicjalizacja galerii.");
        document.querySelectorAll('.gallery-placeholder img.gallery-image').forEach(img => {
            const placeholderDiv = img.parentElement;
            const showPlaceholderText = () => { 
                if (!placeholderDiv.querySelector('.error-message')) {
                    while (placeholderDiv.firstChild && placeholderDiv.firstChild !== img) { placeholderDiv.removeChild(placeholderDiv.firstChild); }
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'text-xs text-red-500 error-message';
                    errorSpan.textContent = `Błąd ładowania: ${img.alt.replace('Realizacja ','')}.jpg`;
                    placeholderDiv.insertBefore(errorSpan, img);
                }
                placeholderDiv.style.display = 'flex'; placeholderDiv.style.alignItems = 'center'; placeholderDiv.style.justifyContent = 'center';
                placeholderDiv.style.border = '1px dashed #d1d5db'; placeholderDiv.style.backgroundColor = '#f3f4f6'; img.style.display = 'none';
            };
            const showImage = () => { 
                 placeholderDiv.style.display = 'block'; 
                 Array.from(placeholderDiv.childNodes).forEach(node => { if (node !== img) { placeholderDiv.removeChild(node); } });
                 placeholderDiv.style.border = 'none'; placeholderDiv.style.backgroundColor = 'transparent'; img.style.display = 'block'; 
            };
            img.onerror = showPlaceholderText;
            if (img.complete) { (img.naturalWidth === 0) ? showPlaceholderText() : showImage(); }
            else { img.onload = showImage; setTimeout(() => { if (!img.complete || (img.complete && img.naturalWidth === 0) ) { showPlaceholderText(); } }, 3000); }
        });
    }

    if (document.getElementById('imageLightbox')) {
        console.log("common-scripts.js: Inicjalizacja Lightboxa.");
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const galleryImages = document.querySelectorAll('.gallery-image');
        const closeLightboxBtn = lightbox.querySelector('.lightbox-close');
        galleryImages.forEach(image => { 
            const clickableParent = image.closest('.gallery-placeholder');
            if (clickableParent) {
                clickableParent.addEventListener('click', () => {
                    if (image.style.display === 'block' && image.src && lightbox && lightboxImg) {
                        lightbox.style.display = 'block'; lightboxImg.src = image.src; document.body.style.overflow = 'hidden'; 
                    }
                });
            }
        });
        if (closeLightboxBtn) { closeLightboxBtn.onclick = () => { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; }; }
        window.addEventListener('click', (event) => { if (event.target === lightbox) { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; } });
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox.style.display === 'block') { lightbox.style.display = 'none'; document.body.style.overflow = 'auto'; } });
    }

    if (document.querySelector('.faq-item')) {
        console.log("common-scripts.js: Inicjalizacja FAQ.");
        document.querySelectorAll('.faq-item').forEach(item => { 
            const question = item.querySelector('.faq-question');
            if (question) { question.addEventListener('click', () => { item.classList.toggle('active'); }); }
        });
    }

    // Logika pobierania cennika jako JPG (html2canvas)
    if (document.getElementById('downloadPricelistBtn')) {
        console.log("common-scripts.js: Inicjalizacja pobierania cennika.");
        const downloadPricelistBtn = document.getElementById('downloadPricelistBtn');
        
        downloadPricelistBtn.addEventListener('click', () => { 
            const pricelistSectionContent = document.getElementById('pricelist-capture-area');
            // Zmieniony selektor: ukrywamy cały kontener z przyciskiem dropdown
            const sectionToHide = document.getElementById('download-section-container');
            
            if (pricelistSectionContent && typeof html2canvas === 'function') {
                console.log("common-scripts.js: Ukrywanie sekcji CTA przed generowaniem zrzutu...");
                
                // Ukryj całą sekcję z przyciskiem i dropdown przed generowaniem
                if (sectionToHide) {
                    sectionToHide.style.visibility = 'hidden';
                }
                
                html2canvas(pricelistSectionContent, { 
                    allowTaint: true, 
                    useCORS: true, 
                    scale: 2, 
                    backgroundColor: '#ffffff' 
                })
                .then(canvas => {
                    console.log("common-scripts.js: Zrzut wygenerowany, tworzenie linku do pobrania...");
                    const image = canvas.toDataURL('image/jpeg', 0.9); 
                    const link = document.createElement('a'); 
                    link.href = image; 
                    link.download = 'cennik-be-clean-and-pure.jpg'; 
                    document.body.appendChild(link); 
                    link.click(); 
                    document.body.removeChild(link);
                    console.log("common-scripts.js: Plik JPG pobrany pomyślnie.");
                })
                .catch(err => { 
                    console.error('common-scripts.js: Błąd generowania obrazu cennika:', err); 
                })
                .finally(() => { 
                    // Przywróć widoczność sekcji po wygenerowaniu zrzutu
                    if (sectionToHide) {
                        sectionToHide.style.visibility = 'visible';
                        console.log("common-scripts.js: Sekcja CTA przywrócona po zrzucie.");
                    }
                });
            } else { 
                console.error("common-scripts.js: Nie znaleziono elementu cennika lub html2canvas."); 
            }
        });
    }
    
    console.log("common-scripts.js: initializePage() zakończone.");
}

document.addEventListener('DOMContentLoaded', initializePage);
