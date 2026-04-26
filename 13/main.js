/* MIRAGE — Desert Luxury | main.js */

const CARS = [
  { id:'lexus-lx', brand:'لكزس', brand_en: 'Lexus', model:'LX 600 Ultra Luxury', year:2024,
    price_usd:120000, price_iqd:157200000, hp:409, seats:7,
    condition:'جديد', condition_en: 'New', km:0, category:'SUV',
    image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85' },
  { id:'bmw-7', brand:'BMW', brand_en: 'BMW', model:'740Li M Sport', year:2024,
    price_usd:115000, price_iqd:150450000, hp:375, seats:5,
    condition:'جديد', condition_en: 'New', km:0, category:'سيدان',
    image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85' },
  { id:'merc-s', brand:'مرسيدس', brand_en: 'Mercedes-Benz', model:'S 580 Maybach', year:2024,
    price_usd:195000, price_iqd:255450000, hp:496, seats:4,
    condition:'جديد', condition_en: 'New', km:0, category:'فاخر',
    image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85' },
  { id:'range-rover', brand:'رينج روفر', brand_en: 'Range Rover', model:'Autobiography LWB', year:2024,
    price_usd:175000, price_iqd:229250000, hp:530, seats:5,
    condition:'جديد', condition_en: 'New', km:0, category:'SUV',
    image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=85' },
  { id:'audi-rs7', brand:'أودي', brand_en: 'Audi', model:'RS7 Sportback', year:2023,
    price_usd:130000, price_iqd:170300000, hp:591, seats:5,
    condition:'مستعمل', condition_en: 'Used', km:12000, category:'رياضي',
    image:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85' },
  { id:'bentley-bentayga', brand:'بنتلي', brand_en: 'Bentley', model:'Bentayga EWB', year:2024,
    price_usd:235000, price_iqd:307850000, hp:550, seats:4,
    condition:'جديد', condition_en: 'New', km:0, category:'فاخر',
    image:'https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&q=85' }
];

const TESTIMONIALS = [
  { name: 'أحمد الجابري', name_en: 'Ahmed Al-Jabri', city: 'بغداد', city_en: 'Baghdad', stars: 5, quote: 'تجربة شراء استثنائية. الاهتمام بالتفاصيل في سراب يعكس معنى الفخامة الحقيقي في العراق.', quote_en: 'An exceptional buying experience. The attention to detail at Mirage reflects the true meaning of luxury in Iraq.' },
  { name: 'سارة العبيدي', name_en: 'Sarah Al-Obaidi', city: 'البصرة', city_en: 'Basra', stars: 5, quote: 'خدمة الكونسيير كانت مذهلة. شعرت وكأنني في صالة عرض عالمية. شكراً لفريق سراب.', quote_en: 'The concierge service was amazing. I felt like I was in a global showroom. Thanks to the Mirage team.' },
  { name: 'محمد حسن', name_en: 'Mohammed Hassan', city: 'أربيل', city_en: 'Erbil', stars: 5, quote: 'أفضل معاملة وأرقى مجموعة سيارات تليق بالنخبة في مجتمعنا. أنصحكم بزيارتهم.', quote_en: 'The best treatment and the finest selection of cars worthy of the elite in our society. I recommend visiting them.' }
];

// STATE MANAGEMENT
let currentLang = 'ar';
let currentTesti = 0;
let stripIndex = 0;
let activeCurrency = 'IQD';

// DOM ELEMENTS
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const mobileBtn = document.getElementById('mobile-menu-btn');
const langToggle = document.getElementById('lang-toggle');
const masonryGrid = document.getElementById('masonry-grid');
const filterContainer = document.getElementById('inventory-filters');
const heroStrip = document.getElementById('hero-strip');
const carModal = document.getElementById('car-modal');

// INITIALIZATION
window.addEventListener('load', () => {
  // Theme init
  const savedTheme = localStorage.getItem('mirage-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeBtns(savedTheme);

  // Language init
  currentLang = localStorage.getItem('mirage-lang') || 'ar';
  applyLanguage(currentLang);

  // Data Render
  renderInventory('all');
  renderHeroStrip();
  renderTestimonials();
  initCalculator();

  // Hide Preloader
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(1.1)';
    setTimeout(() => {
      preloader.remove();
      document.body.classList.remove('loading');
      startHeroAutoScroll();
      startTestiAutoSlider();
      initScrollReveal();
    }, 500);
  }, 2500);
});

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// MOBILE MENU
mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// THEME SYSTEM
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        let appliedTheme = theme;
        if (theme === 'system') {
            appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', appliedTheme);
        localStorage.setItem('mirage-theme', theme);
        updateThemeBtns(theme);
    });
});

function updateThemeBtns(theme) {
    document.querySelectorAll('.theme-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.theme === theme);
    });
}

// LANGUAGE SYSTEM
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('mirage-lang', currentLang);
    applyLanguage(currentLang);
    renderInventory(document.querySelector('.pill.active').dataset.filter);
    renderTestimonials();
    renderHeroStrip();
});

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    langToggle.innerText = lang === 'ar' ? 'EN' : 'AR';
    
    document.querySelectorAll('[data-ar]').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    
    // Update currency labels in calculator
    updateCalculator();
}

// INVENTORY
function renderInventory(filter) {
    masonryGrid.innerHTML = '';
    const filtered = filter === 'all' ? CARS : CARS.filter(c => c.category === filter);
    
    filtered.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card reveal';
        const brand = currentLang === 'ar' ? car.brand : car.brand_en;
        const condition = currentLang === 'ar' ? car.condition : car.condition_en;
        const price = currentLang === 'ar' ? car.price_iqd.toLocaleString() + ' د.ع' : '$' + car.price_usd.toLocaleString();

        card.innerHTML = `
            <img src="${car.image}" alt="${car.model}">
            <div class="cond-chip">${condition}</div>
            <div class="card-overlay"></div>
            <div class="card-bottom">
                <div class="card-info">
                    <span class="c-brand">${brand}</span>
                    <h3 class="c-model">${car.model}</h3>
                </div>
                <div class="price-badge">${price}</div>
            </div>
            <div class="hover-overlay">
                <button class="btn-solid" onclick="openModal('${car.id}')">${currentLang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</button>
            </div>
        `;
        masonryGrid.appendChild(card);
    });
    initScrollReveal();
}

filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('pill')) {
        document.querySelector('.pill.active').classList.remove('active');
        e.target.classList.add('active');
        renderInventory(e.target.dataset.filter);
    }
});

// HERO STRIP
function renderHeroStrip() {
    heroStrip.innerHTML = '';
    CARS.slice(0, 5).forEach(car => {
        const stripItem = document.createElement('div');
        stripItem.className = 'strip-item';
        const price = currentLang === 'ar' ? car.price_iqd.toLocaleString() + ' د.ع' : '$' + car.price_usd.toLocaleString();
        
        stripItem.innerHTML = `
            <img src="${car.image}" alt="${car.model}">
            <div class="strip-label">
                <div class="s-model">${car.model}</div>
                <div class="s-price">${price}</div>
            </div>
        `;
        heroStrip.appendChild(stripItem);
    });
}

function startHeroAutoScroll() {
    setInterval(() => {
        stripIndex = (stripIndex + 1) % 5;
        const move = currentLang === 'ar' ? stripIndex * 180 : stripIndex * 180;
        // In mobile view (row) or desktop view (column), set appropriately
        if (window.innerWidth > 900) {
            heroStrip.style.transform = `translateY(-${stripIndex * 180}px)`;
        } else {
            heroStrip.style.transform = `translateX(-${stripIndex * 100}%)`;
        }
    }, 2000);
}

// MODAL
function openModal(id) {
    const car = CARS.find(c => c.id === id);
    if (!car) return;

    const brand = currentLang === 'ar' ? car.brand : car.brand_en;
    const cond = currentLang === 'ar' ? car.condition : car.condition_en;
    const priceText = currentLang === 'ar' ? car.price_iqd.toLocaleString() + ' د.ع' : '$' + car.price_usd.toLocaleString();

    document.getElementById('m-img').src = car.image;
    document.getElementById('m-brand').innerText = brand;
    document.getElementById('m-model').innerText = car.model;
    document.getElementById('m-year').innerText = car.year;
    document.getElementById('m-cond').innerText = cond;
    document.getElementById('m-price').innerText = priceText;
    document.getElementById('m-hp').innerText = car.hp;
    document.getElementById('m-seats').innerText = car.seats;
    document.getElementById('m-km').innerText = car.km.toLocaleString();

    const waMsg = encodeURIComponent(`مرحباً سراب، أود الاستفسار عن ${brand} ${car.model}`);
    document.getElementById('m-wa').href = `https://wa.me/9647700000000?text=${waMsg}`;

    carModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.querySelector('.close-modal').addEventListener('click', () => {
    carModal.classList.remove('open');
    document.body.style.overflow = '';
});

// CALCULATOR
function initCalculator() {
    const inputs = ['calc-price', 'calc-down'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', updateCalculator);
    });
    
    document.querySelectorAll('.dur-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.dur-btn.active').classList.remove('active');
            btn.classList.add('active');
            updateCalculator();
        });
    });
    
    updateCalculator();
}

function updateCalculator() {
    const price = parseInt(document.getElementById('calc-price').value);
    const downPercent = parseInt(document.getElementById('calc-down').value);
    const duration = parseInt(document.querySelector('.dur-btn.active').dataset.val);
    
    const downValue = price * (downPercent / 100);
    const loanAmount = price - downValue;
    const monthly = loanAmount / duration;

    const displayPrice = price.toLocaleString() + ' د.ع';
    const displayDown = downValue.toLocaleString() + ' د.ع (' + downPercent + '%)';
    const displayMonthly = Math.round(monthly).toLocaleString() + ' د.ع';

    document.getElementById('val-price').innerText = displayPrice;
    document.getElementById('val-down').innerText = displayDown;
    document.getElementById('res-monthly').innerText = displayMonthly;
    document.getElementById('res-total').innerText = price.toLocaleString() + ' د.ع';
}

// TESTIMONIALS
function renderTestimonials() {
    const slider = document.getElementById('testi-slider');
    const dotsContainer = document.getElementById('testi-dots');
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';

    TESTIMONIALS.forEach((t, i) => {
        const slide = document.createElement('div');
        slide.className = `testi-slide ${i === currentTesti ? 'active' : ''}`;
        const name = currentLang === 'ar' ? t.name : t.name_en;
        const city = currentLang === 'ar' ? t.city : t.city_en;
        const quote = currentLang === 'ar' ? t.quote : t.quote_en;

        slide.innerHTML = `
            <p class="testi-quote">${quote}</p>
            <div class="testi-author">${name}</div>
            <div class="testi-city">${city}</div>
            <div class="testi-stars">${'★'.repeat(t.stars)}</div>
        `;
        slider.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = `dot-item ${i === currentTesti ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTesti(i));
        dotsContainer.appendChild(dot);
    });
}

function goToTesti(index) {
    currentTesti = index;
    renderTestimonials();
}

document.getElementById('testi-prev').addEventListener('click', () => {
    currentTesti = (currentTesti - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    renderTestimonials();
});

document.getElementById('testi-next').addEventListener('click', () => {
    currentTesti = (currentTesti + 1) % TESTIMONIALS.length;
    renderTestimonials();
});

function startTestiAutoSlider() {
    setInterval(() => {
        currentTesti = (currentTesti + 1) % TESTIMONIALS.length;
        renderTestimonials();
    }, 5000);
}

// SCROLL REVEAL
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            mobileMenu.classList.remove('open');
            mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
            
            window.scrollTo({
                top: target.offsetTop - 68,
                behavior: 'smooth'
            });
        }
    });
});
