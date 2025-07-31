// Agrega un evento de clic al botón con el id 'languageButton'
document.getElementById('languageButton').addEventListener('click', function() {
    // Obtiene el icono del dropdown y el menú desplegable
    let dropdownIcon = document.getElementById('dropdownIcon');
    let languageDropdown = document.getElementById('languageDropdown');
    
    // Alterna la visibilidad del menú desplegable
    languageDropdown.classList.toggle('show');
    
    // Alterna la rotación del icono entre 180 grados y 0 grados
    if (dropdownIcon.classList.contains('rotate-180')) {
        dropdownIcon.classList.remove('rotate-180');
        dropdownIcon.classList.add('rotate-0');
    } else {
        dropdownIcon.classList.remove('rotate-0');
        dropdownIcon.classList.add('rotate-180');
    }
});

// Objeto con las traducciones
const translations = {
    SPA: {
        // Navbar
        navInicio: "Inicio",
        navSobreNosotros: "Sobre Nosotros",
        navServicios: "Servicios",
        navContacto: "Contacto",
        navTrabaja: "Trabaja con <br>Nosotros",
        navBlog: "BLOG",
        // Dropdown servicios
        dropdownDesarrollo: "Desarollo Web",
        dropdownRecursos: "Recursos Humanos",
        dropdownCapacitacion: "Capacitacion IT",
        // Secciones principales
        titleSobreNosotros: "Sobre Nosotros",
        aboutDescription: '"Somos una agencia digital internacional con presencia en México y Estados Unidos,contamos con un equipo de miembros expertos en áreas como diseño gráfico, desarrollo de software y desarrollo de medios audiovisuales."',
        titleServicios: "Servicios",
        titleClientes: "Clientes",
        // Cards de servicios
        cardDesarrollo: "Desarrollo Web",
        cardRecursos: "Recursos Humanos",
        cardCapacitacion: "Capacitación IT",
        cardMasInfo: "Mas Informacion",
        // About page específicos
        aboutHeaderTitle1: "Sobre Nosotros",
        aboutHeaderTitle2: "Conoce nuestro stack de Tecnologias",
        techCardUsage: "Uso Mundial",
        techCardUsedIn: "Usado en:",
        aboutValoresTitle: "Nuestros Valores Fundamentales",
        valorHonestidad: "Honestidad",
        valorRespeto: "Respeto",
        valorCalidad: "Calidad",
        valorResponsabilidad: "Responsabilidad",
        misionTitle: "MISIÓN",
        misionText: "Desarrollar productos y servicios de calidad, prestando atención a los resultados precisos que nuestro cliente pretende obtener para ganarse su confianza.",
        visionTitle: "VISIÓN",
        visionText: "Queremos ser una marca reconocida por hacer crecer las marcas de nuestros clientes, no sólo en ventas sino también acompañándoles en la transformación tecnológica que evoluciona día a día en las empresas de cualquier tipo y al mismo tiempo ser una marca reconocida en todo el mundo por ello.",
        // Footer
        footerInicio: "Inicio",
        footerSobreNosotros: "Sobre Nosotros",
        footerServicios: "Servicios",
        footerContacto: "Contacto",
        footerCarrers: "Carrers",
        footerBlog: "Blog",
        // Service Desarrollo Web page
        servicePageTitle: "Desarollo Web",
        serviceHeaderTitle: "DESAROLLO WEB",
        serviceHeaderSubtitle: "Contamos con paquetes desde:",
        serviceHeaderPrice: "$10,000 MXN",
        serviceHeaderBenefit1: "Solución a tu medida y presupuesto",
        serviceHeaderBenefit2: "Incrementa tu presencia en Internet",
        serviceHeaderBenefit3: "Conoce tus estadísticas y alcance de tu sitio",
        serviceHeaderBenefit4: "Eleva tu marca al siguiente nivel",
        servicePackagesTitle: "Conoce Nuestros Paquetes",
        packageSmallBusinessTitle: "NEGOCIOS PEQUEÑOS",
        packageSmallBusinessPrice: "DESDE $10,000 MXN",
        packageMediumBusinessTitle: "EMPRESAS MEDIANAS",
        packageMediumBusinessPrice: "DESDE $20,000 a $40,000 MXN",
        packageLargeBusinessTitle: "EMPRESAS GRANDES O CORPORATIVOS",
        packageLargeBusinessPrice: "DESDE $50,000 a $140,000 MXN",
        packageFeatureHosting: "Hospedaje por 2 AÑOS",
        packageFeatureMultilingual: "Sin Sitio Multibilingüe Simple",
        packageFeatureModernPlatform: "Plataforma Moderna y Funcional",
        packageFeatureOnePage: "Sitio de 1 Sola Página",
        packageFeatureFourToEightPages: "Sitio de 4 a 8 Páginas",
        packageFeatureMoreThanEightPages: "Más de 8 Páginas en el Sitio",
        packageMoreInfoBtn: "Más Información!",
        portfolioWebTitle: "Portafolio Web",
        portfolioClientsSatisfied: "Clientes Satisfechos",
        portfolioYearsExperience: "Años de Experiencia",
        portfolioLanguages: "Idiomas",
        portfolioCountries: "Paises",
        portfolioClients: "Clientes",
        portfolioFilters: {
            all: "Todas",
            beauty: "Belleza",
            architecture: "Arquitectura",
            security: "Seguridad",
            food: "Alimentos",
            health: "Salud",
            lawyers: "Abogados",
            automotive: "Automotriz"
        }
    },
    ENG: {
        // Navbar
        navInicio: "Home",
        navSobreNosotros: "About Us",
        navServicios: "Services",
        navContacto: "Contact",
        navTrabaja: "Work with <br>Us",
        navBlog: "BLOG",
        // Dropdown servicios
        dropdownDesarrollo: "Web Development",
        dropdownRecursos: "Human Resources",
        dropdownCapacitacion: "IT Training",
        // Secciones principales
        titleSobreNosotros: "About Us",
        aboutDescription: '"We are an international digital agency with a presence in Mexico and the United States, with a team of expert members in areas like graphic design, software development, and audio visual media development"',
        titleServicios: "Services",
        titleClientes: "Clients",
        // Cards de servicios
        cardDesarrollo: "Web Development",
        cardRecursos: "Human Resources",
        cardCapacitacion: "IT Training",
        cardMasInfo: "More Information",
        // About page específicos
        aboutHeaderTitle1: "About Us",
        aboutHeaderTitle2: "Discover our Technology Stack",
        techCardUsage: "Global Usage",
        techCardUsedIn: "Used in:",
        aboutValoresTitle: "Our Core Values",
        valorHonestidad: "Honesty",
        valorRespeto: "Respect",
        valorCalidad: "Quality",
        valorResponsabilidad: "Responsibility",
        misionTitle: "MISSION",
        misionText: "Develop quality products and services, paying attention to the precise results that our client intends to obtain to gain their trust.",
        visionTitle: "VISION",
        visionText: "We want to be a recognized brand for growing our clients' brands, not only in sales but also accompanying them in the technological transformation that evolves day by day in companies of any type and at the same time be a brand recognized worldwide for it.",
        // Footer
        footerInicio: "Home",
        footerSobreNosotros: "About Us",
        footerServicios: "Services",
        footerContacto: "Contact",
        footerCarrers: "Careers",
        footerBlog: "Blog",
        // Service Desarrollo Web page
        servicePageTitle: "Web Development",
        serviceHeaderTitle: "WEB DEVELOPMENT",
        serviceHeaderSubtitle: "We have packages starting from:",
        serviceHeaderPrice: "$10,000 MXN",
        serviceHeaderBenefit1: "Tailored solution to your needs and budget",
        serviceHeaderBenefit2: "Increase your presence on the Internet",
        serviceHeaderBenefit3: "Know your statistics and site reach",
        serviceHeaderBenefit4: "Take your brand to the next level",
        servicePackagesTitle: "Discover Our Packages",
        packageSmallBusinessTitle: "SMALL BUSINESSES",
        packageSmallBusinessPrice: "FROM $10,000 MXN",
        packageMediumBusinessTitle: "MEDIUM ENTERPRISES",
        packageMediumBusinessPrice: "FROM $20,000 to $40,000 MXN",
        packageLargeBusinessTitle: "LARGE ENTERPRISES OR CORPORATES",
        packageLargeBusinessPrice: "FROM $50,000 to $140,000 MXN",
        packageFeatureHosting: "Hosting for 2 YEARS",
        packageFeatureMultilingual: "No Simple Multilingual Site",
        packageFeatureModernPlatform: "Modern and Functional Platform",
        packageFeatureOnePage: "Single Page Site",
        packageFeatureFourToEightPages: "4 to 8 Pages Site",
        packageFeatureMoreThanEightPages: "More than 8 Pages on Site",
        packageMoreInfoBtn: "More Information!",
        portfolioWebTitle: "Web Portfolio",
        portfolioClientsSatisfied: "Satisfied Clients",
        portfolioYearsExperience: "Years of Experience",
        portfolioLanguages: "Languages",
        portfolioCountries: "Countries",
        portfolioClients: "Clients",
        portfolioFilters: {
            all: "All",
            beauty: "Beauty",
            architecture: "Architecture",
            security: "Security",
            food: "Food",
            health: "Health",
            lawyers: "Lawyers",
            automotive: "Automotive"
        }
    },
    JPN: {
        // Navbar
        navInicio: "ホーム",
        navSobreNosotros: "私たちについて",
        navServicios: "サービス",
        navContacto: "お問い合わせ",
        navTrabaja: "私たちと<br>働く",
        navBlog: "ブログ",
        // Dropdown servicios
        dropdownDesarrollo: "ウェブ開発",
        dropdownRecursos: "人材",
        dropdownCapacitacion: "IT研修",
        // Secciones principales
        titleSobreNosotros: "私たちについて",
        aboutDescription: '"私たちはメキシコとアメリカに拠点を持つ国際的なデジタル代理店です。グラフィックデザイン、ソフトウェア開発、オーディオビジュアルメディア開発の専門家チームを持っています。"',
        titleServicios: "サービス",
        titleClientes: "クライアント",
        // Cards de servicios
        cardDesarrollo: "ウェブ開発",
        cardRecursos: "人材",
        cardCapacitacion: "IT 研修",
        cardMasInfo: "詳細情報",
        // About page específicos
        aboutHeaderTitle1: "私たちについて",
        aboutHeaderTitle2: "技術スタックを発見",
        techCardUsage: "世界的な使用",
        techCardUsedIn: "使用されている:",
        aboutValoresTitle: "私たちの核となる価値観",
        valorHonestidad: "誠実さ",
        valorRespeto: "尊敬",
        valorCalidad: "品質",
        valorResponsabilidad: "責任",
        misionTitle: "使命",
        misionText: "クライアントが意図する正確な結果に注意を払い、信頼を得るために品質の高い製品とサービスを開発する。",
        visionTitle: "ビジョン",
        visionText: "私たちは、クライアントのブランドを成長させることで認められたブランドになりたいと思っています。売上だけでなく、あらゆるタイプの企業で日々進化する技術的変革に同行し、同時に世界中で認められたブランドになりたいと思っています。",
        // Footer
        footerInicio: "ホーム",
        footerSobreNosotros: "私たちについて",
        footerServicios: "サービス",
        footerContacto: "お問い合わせ",
        footerCarrers: "キャリア",
        footerBlog: "ブログ",
        // Service Desarrollo Web page
        servicePageTitle: "ウェブ開発",
        serviceHeaderTitle: "ウェブ開発",
        serviceHeaderSubtitle: "パッケージは以下から:",
        serviceHeaderPrice: "$10,000 MXN",
        serviceHeaderBenefit1: "あなたのニーズと予算に合わせたソリューション",
        serviceHeaderBenefit2: "インターネットでの存在感を高める",
        serviceHeaderBenefit3: "サイトの統計とリーチを把握",
        serviceHeaderBenefit4: "ブランドを次のレベルに引き上げる",
        servicePackagesTitle: "パッケージをご紹介",
        packageSmallBusinessTitle: "小規模事業",
        packageSmallBusinessPrice: "$10,000 MXNから",
        packageMediumBusinessTitle: "中規模企業",
        packageMediumBusinessPrice: "$20,000から$40,000 MXN",
        packageLargeBusinessTitle: "大企業または法人",
        packageLargeBusinessPrice: "$50,000から$140,000 MXN",
        packageFeatureHosting: "2年間のホスティング",
        packageFeatureMultilingual: "シンプル多言語サイトなし",
        packageFeatureModernPlatform: "モダンで機能的なプラットフォーム",
        packageFeatureOnePage: "1ページサイト",
        packageFeatureFourToEightPages: "4～8ページサイト",
        packageFeatureMoreThanEightPages: "8ページ以上のサイト",
        packageMoreInfoBtn: "詳細情報！",
        portfolioWebTitle: "ウェブポートフォリオ",
        portfolioClientsSatisfied: "満足したクライアント",
        portfolioYearsExperience: "年の経験",
        portfolioLanguages: "言語",
        portfolioCountries: "国",
        portfolioClients: "クライアント",
        portfolioFilters: {
            all: "すべて",
            beauty: "美容",
            architecture: "建築",
            security: "セキュリティ",
            food: "食品",
            health: "健康",
            lawyers: "弁護士",
            automotive: "自動車"
        }
    }
};

// Función para cambiar el idioma
function changeLanguage(lang) {
    const translation = translations[lang];
    
    // Remover clases de idioma anteriores del body
    document.body.classList.remove('lang-spa', 'lang-eng', 'lang-jpn');
    
    // Agregar la clase del idioma actual al body
    document.body.classList.add('lang-' + lang.toLowerCase());
    
    // Actualizar todos los elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        let translatedText;
        
        // Manejar traducciones anidadas (como portfolioFilters.all)
        if (key.includes('.')) {
            const keys = key.split('.');
            translatedText = keys.reduce((obj, k) => obj && obj[k], translation);
        } else {
            translatedText = translation[key];
        }
        
        if (translatedText) {
            if (key === 'navTrabaja') {
                element.innerHTML = translatedText;
            } else {
                element.textContent = translatedText;
            }
        }
    });
    
    // Ajustes específicos para japonés
    if (lang === 'JPN') {
        // Ajustar específicamente elementos problemáticos
        const aboutSection = document.querySelector('.about-alineacion');
        if (aboutSection) {
            aboutSection.style.fontSize = '1.6rem';
            aboutSection.style.lineHeight = '1.4';
        }
        
        // Ajustar títulos de sección
        const sectionTitles = document.querySelectorAll('.section-title h1');
        sectionTitles.forEach(title => {
            title.style.fontSize = '2.5rem';
        });
        
        // Ajustar cards de servicios
        const serviceCards = document.querySelectorAll('.service-card .card-title');
        serviceCards.forEach(card => {
            card.style.fontSize = '1.6rem';
            card.style.lineHeight = '1.3';
        });
    } else {
        // Restaurar estilos originales para otros idiomas
        const aboutSection = document.querySelector('.about-alineacion');
        if (aboutSection) {
            aboutSection.style.fontSize = '';
            aboutSection.style.lineHeight = '';
        }
        
        const sectionTitles = document.querySelectorAll('.section-title h1');
        sectionTitles.forEach(title => {
            title.style.fontSize = '';
        });
        
        const serviceCards = document.querySelectorAll('.service-card .card-title');
        serviceCards.forEach(card => {
            card.style.fontSize = '';
            card.style.lineHeight = '';
        });
    }
    
    // Guardar idioma seleccionado en localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Reinicializar AOS después del cambio de idioma para detectar correctamente los elementos
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}

// Agrega un evento de clic a cada opción del menú desplegable
document.querySelectorAll('#languageDropdown a').forEach(function(element) {
    element.addEventListener('click', function (event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace

        // Obtén el idioma seleccionado y la bandera correspondiente
        let selectedLang = this.getAttribute('data-lang');
        let flagSrc = this.getAttribute('data-flag');

        // Actualiza el texto del idioma seleccionado
        document.getElementById('selectedLanguage').textContent = selectedLang;

        // Cambia la imagen de la bandera
        document.getElementById('languageIcon').src = flagSrc;

        // Cambia el idioma del contenido
        changeLanguage(selectedLang);

        // Oculta el menú desplegable
        document.getElementById('languageDropdown').classList.remove('show');

        // Restablece la rotación del icono a 0 grados
        let dropdownIcon = document.getElementById('dropdownIcon');
        dropdownIcon.classList.remove('rotate-180');
        dropdownIcon.classList.add('rotate-0');
    });
});

// Cierra el menú si se hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('#languageButton') && !event.target.matches('#languageButton *')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                // Restablece la rotación del icono a 0 grados
                let dropdownIcon = document.getElementById('dropdownIcon');
                dropdownIcon.classList.remove('rotate-180');
                dropdownIcon.classList.add('rotate-0');
            }
        }
    }
}

//ANIMACION DE CERRAR Y ABRIR DE EL MENU DE HAMBURGESA
document.getElementById('navbar-toggler').addEventListener('click', function() {
    const hamburgerIcon = document.querySelector('.icon-hamburger');
    const closeIcon = document.querySelector('.icon-close');
    
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

////////////////////////////////////////////////////////////////////////////////!

// Función para cargar el idioma guardado al cargar la página
function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'SPA';
    const flagMap = {
        'SPA': 'icons/bandera_mex.png',
        'ENG': 'icons/bandera_usa.png',
        'JPN': 'icons/bandera_jpn.png'
    };
    
    // Actualizar el botón de idioma
    document.getElementById('selectedLanguage').textContent = savedLanguage;
    document.getElementById('languageIcon').src = flagMap[savedLanguage];
    
    // Aplicar las traducciones y estilos de idioma
    changeLanguage(savedLanguage);
}

document.addEventListener('DOMContentLoaded', () => {
    // Cargar idioma guardado
    loadSavedLanguage();
    
    // Funcionalidad de las cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => changeContent(card));
        card.addEventListener('mouseleave', () => resetContent(card));
    });
});

///Animacion de Btn Services con hover para cambio de texto y icono

function changeContent(card) {
    const title = card.querySelector('.card-title');
    const icon = card.querySelector('.icon-background');
    const currentLang = localStorage.getItem('selectedLanguage') || 'SPA';
    const translation = translations[currentLang];

    if (title.innerText === translation.cardDesarrollo) {
        title.dataset.originalText = translation.cardDesarrollo;
        title.innerText = translation.cardMasInfo;
        icon.classList.replace('fa-desktop', 'fa-arrow-right');
    } else if (title.innerText === translation.cardRecursos) {
        title.dataset.originalText = translation.cardRecursos;
        title.innerText = translation.cardMasInfo;
        icon.classList.replace('fa-users', 'fa-arrow-right');
    } else if (title.innerText === translation.cardCapacitacion) {
        title.dataset.originalText = translation.cardCapacitacion;
        title.innerText = translation.cardMasInfo;
        icon.classList.replace('fa-chalkboard-user', 'fa-arrow-right');
    }
}

function resetContent(card) {
    const title = card.querySelector('.card-title');
    const icon = card.querySelector('.icon-background');
    const currentLang = localStorage.getItem('selectedLanguage') || 'SPA';
    const translation = translations[currentLang];

    if (title.innerText === translation.cardMasInfo && title.dataset.originalText === translation.cardDesarrollo) {
        title.innerText = translation.cardDesarrollo;
        icon.classList.replace('fa-arrow-right', 'fa-desktop');
    } else if (title.innerText === translation.cardMasInfo && title.dataset.originalText === translation.cardRecursos) {
        title.innerText = translation.cardRecursos;
        icon.classList.replace('fa-arrow-right', 'fa-users');
    } else if (title.innerText === translation.cardMasInfo && title.dataset.originalText === translation.cardCapacitacion) {
        title.innerText = translation.cardCapacitacion;
        icon.classList.replace('fa-arrow-right', 'fa-chalkboard-user');
    }
}

// Tooltip para cards
function showTooltip(card) {
    // Remueve la clase 'selected' de todas las tarjetas
    document.querySelectorAll('.tech-card').forEach(function(el) {
        el.classList.remove('selected');
    });

    // Añade la clase 'selected' a la tarjeta seleccionada
    card.classList.add('selected');
}

// Evento para detectar clic fuera de las tarjetas
document.addEventListener('click', function(event) {
    const isClickInside = event.target.closest('.tech-card');

    if (!isClickInside) {
        // Remueve la clase 'selected' de todas las tarjetas si el clic es fuera de una tarjeta
        document.querySelectorAll('.tech-card').forEach(function(el) {
            el.classList.remove('selected');
        });
    }
});

/// Tooltip de Service Desarollo Web
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
/// Esta funcion permite que los elementos se activen automaticamente y no necesariamente con un hover en las banderas de paises
function animateOnScroll(selector, flagSelector) {
    const target = document.querySelector(selector);
    if (!target) return;
  
    const flags = target.querySelectorAll(flagSelector);
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          target.classList.add("active");
          flags.forEach(flag => {
            flag.classList.remove("animate__animated");
            void flag.offsetWidth;
            flag.classList.add("animate__animated", flag.dataset.animation);
          });
        } else {
          target.classList.remove("active");
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(target);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    animateOnScroll(".country-hover", ".flag");
    animateOnScroll(".idioma-hover", ".idioma-flag");
    animateOnScroll(".clientes-hover", ".flag")
  });