// Agrega un evento de clic al botón con el id 'languageButton'
document.getElementById('languageButton').addEventListener('click', function () {
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

// Variables globales para tracking de idiomas extranjeros
let foreignLanguageStartTime = null;
let foreignLanguagePageViews = 0;
let foreignLanguageInteractions = 0;

// Función para trackear interacciones en idiomas extranjeros
function trackForeignLanguageInteraction(interactionType, elementType) {
    const currentLang = localStorage.getItem('selectedLanguage') || 'SPA';

    if (currentLang === 'ENG' || currentLang === 'JPN') {
        foreignLanguageInteractions++;

        gtag('event', 'foreign_language_interaction', {
            'event_category': 'Language_Engagement',
            'event_label': `${currentLang}_${interactionType}`,
            'interaction_type': interactionType,
            'element_type': elementType,
            'custom_language': currentLang,
            'total_interactions': foreignLanguageInteractions
        });
    }
}

// Función para enviar heartbeat cada 30 segundos cuando está en idioma extranjero
function startForeignLanguageHeartbeat() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'SPA';

    if (currentLang === 'ENG' || currentLang === 'JPN') {
        // Evitar múltiples intervals
        if (window.foreignLanguageInterval) {
            clearInterval(window.foreignLanguageInterval);
        }

        window.foreignLanguageInterval = setInterval(() => {
            const currentLangCheck = localStorage.getItem('selectedLanguage') || 'SPA';
            if (currentLangCheck === 'ENG' || currentLangCheck === 'JPN') {
                const startTime = sessionStorage.getItem(`${currentLangCheck}_start_time`);
                if (startTime) {
                    const currentDuration = Math.round((Date.now() - parseInt(startTime)) / 1000);

                    gtag('event', 'foreign_language_heartbeat', {
                        'event_category': 'Language_Session',
                        'event_label': currentLangCheck,
                        'custom_language': currentLangCheck,
                        'session_duration_seconds': currentDuration,
                        'interactions_count': foreignLanguageInteractions,
                        'custom_parameter_1': Math.round(currentDuration / 60) // minutos
                    });

                    // Verificar milestones de engagement
                    trackEngagementMilestones();
                }
            } else {
                // Si cambió de idioma, limpiar el interval
                clearInterval(window.foreignLanguageInterval);
            }
        }, 30000); // 30 segundos
    }
}

// Función para crear eventos personalizados de engagement
function trackEngagementMilestones() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'SPA';

    if (currentLang === 'ENG' || currentLang === 'JPN') {
        const startTime = sessionStorage.getItem(`${currentLang}_start_time`);
        if (startTime) {
            const currentDuration = Math.round((Date.now() - parseInt(startTime)) / 1000);
            const milestones = [30, 60, 120, 300, 600]; // 30s, 1m, 2m, 5m, 10m

            milestones.forEach(milestone => {
                if (currentDuration >= milestone && !sessionStorage.getItem(`${currentLang}_milestone_${milestone}`)) {
                    gtag('event', 'foreign_language_engagement_milestone', {
                        'event_category': 'Language_Engagement',
                        'event_label': `${currentLang}_${milestone}s`,
                        'custom_language': currentLang,
                        'milestone_seconds': milestone,
                        'total_interactions': foreignLanguageInteractions
                    });

                    // Marcar milestone como alcanzado
                    sessionStorage.setItem(`${currentLang}_milestone_${milestone}`, 'true');
                }
            });
        }
    }
}

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
        // Carousel
        carouselGiseaSubtitle: '"Hacemos Realidad tus Proyectos"',
        carouselWebDevTitle: "Desarollo web",
        carouselWebDevSubtitle: '"Creamos el sitio para tu compañia"',
        carouselTrainingTitle: "Capacitacion it",
        carouselTrainingSubtitle: '"Crece tus Habilidades y Conviértete en un Profesional"',
        carouselHRTitle: "Recursos Humanos",
        carouselHRSubtitle: '"Encontramos el Talento Perfecto para tu Empresa"',
        // About page específicos
        aboutHeaderTitle1: "Sobre Nosotros",
        aboutHeaderTitle2: "Conoce nuestro stack de Tecnologias",
        techCardUsage: "Uso Mundial",
        techCardUsedIn: "Usado en:",
        techCardCss3Sass: "CSS3 Y SASS",
        techCardGitGithub: "Git y Github",
        techCardLaravel: "Laravel con MySQL y PHP",
        aboutValoresTitle: "Nuestros Valores Fundamentales",
        valorHonestidad: "Honestidad",
        valorRespeto: "Respeto",
        valorCalidad: "Calidad",
        valorResponsabilidad: "Responsabilidad",
        misionTitle: "MISIÓN",
        misionText: "Desarrollar productos, servicios de calidad y manteniendo un buen servicio y satisfacción del cliente.",
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
        serviceHeaderPrice: "DESDE $3,000 MXN",
        serviceHeaderBenefit1: "Solución a tu medida y presupuesto",
        serviceHeaderBenefit2: "Incrementa tu presencia en Internet",
        serviceHeaderBenefit3: "Conoce tus estadísticas y alcance de tu sitio",
        serviceHeaderBenefit4: "Eleva tu marca al siguiente nivel",
        servicePackagesTitle: "Conoce Nuestros Paquetes",
        packageSmallBusinessTitle: "NEGOCIOS PEQUEÑOS",
        packageSmallBusinessPrice: "DESDE $3,000 MXN",
        packageMediumBusinessTitle: "EMPRESAS MEDIANAS",
        packageMediumBusinessPrice: "DESDE $6,000 MXN",
        packageLargeBusinessTitle: "EMPRESAS GRANDES O CORPORATIVOS",
        packageLargeBusinessPrice: "DESDE $9,999 MXN",
        packageFeatureHosting: "Hospedaje por 3 AÑOS",
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
        // Carousel
        carouselGiseaSubtitle: '"We Make Your Projects Reality"',
        carouselWebDevTitle: "Web Development",
        carouselWebDevSubtitle: '"We Create the Website for Your Company"',
        carouselTrainingTitle: "IT Training",
        carouselTrainingSubtitle: '"Grow Your Skills and Become a Professional"',
        carouselHRTitle: "Human Resources",
        carouselHRSubtitle: '"We Find the Perfect Talent for Your Company"',
        // About page específicos
        aboutHeaderTitle1: "About Us",
        aboutHeaderTitle2: "Discover our Technology Stack",
        techCardUsage: "Global Usage",
        techCardUsedIn: "Used in:",
        techCardCss3Sass: "CSS3 AND SASS",
        techCardGitGithub: "Git and Github",
        techCardLaravel: "Laravel with MySQL and PHP",
        aboutValoresTitle: "Our Core Values",
        valorHonestidad: "Honesty",
        valorRespeto: "Respect",
        valorCalidad: "Quality",
        valorResponsabilidad: "Responsibility",
        misionTitle: "MISSION",
        misionText: "Develop products, quality services and maintaining good service and customer satisfaction.",
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
        serviceHeaderPrice: "$3,000 MXN",
        serviceHeaderBenefit1: "Tailored solution to your needs and budget",
        serviceHeaderBenefit2: "Increase your presence on the Internet",
        serviceHeaderBenefit3: "Know your statistics and site reach",
        serviceHeaderBenefit4: "Take your brand to the next level",
        servicePackagesTitle: "Discover Our Packages",
        packageSmallBusinessTitle: "SMALL BUSINESSES",
        packageSmallBusinessPrice: "FROM $3,000 MXN",
        packageMediumBusinessTitle: "MEDIUM ENTERPRISES",
        packageMediumBusinessPrice: "FROM $6,000 MXN",
        packageLargeBusinessTitle: "LARGE ENTERPRISES OR CORPORATES",
        packageLargeBusinessPrice: "FROM $9,999 MXN",
        packageFeatureHosting: "Hosting for 3 YEARS",
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
        // Carousel
        carouselGiseaSubtitle: "「あなたのプロジェクトを現実にします」",
        carouselWebDevTitle: "ウェブ開発",
        carouselWebDevSubtitle: "「あなたの会社のサイトを作成します」",
        carouselTrainingTitle: "IT研修",
        carouselTrainingSubtitle: "「スキルを伸ばしてプロフェッショナルになりましょう」",
        carouselHRTitle: "人材",
        carouselHRSubtitle: "「あなたの会社にぴったりの人材を見つけます」",
        // About page específicos
        aboutHeaderTitle1: "私たちについて",
        aboutHeaderTitle2: "技術スタックを発見",
        techCardUsage: "世界的な使用",
        techCardUsedIn: "使用されている:",
        techCardCss3Sass: "CSS3とSASS",
        techCardGitGithub: "GitとGithub",
        techCardLaravel: "LaravelとMySQLとPHP",
        aboutValoresTitle: "私たちの核となる価値観",
        valorHonestidad: "誠実さ",
        valorRespeto: "尊敬",
        valorCalidad: "品質",
        valorResponsabilidad: "責任",
        misionTitle: "使命",
        misionText: "製品、品質の高いサービスを開発し、良いサービスと顧客満足を維持する。",
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
        serviceHeaderPrice: "$3,000 MXN",
        serviceHeaderBenefit1: "あなたのニーズと予算に合わせたソリューション",
        serviceHeaderBenefit2: "インターネットでの存在感を高める",
        serviceHeaderBenefit3: "サイトの統計とリーチを把握",
        serviceHeaderBenefit4: "ブランドを次のレベルに引き上げる",
        servicePackagesTitle: "パッケージをご紹介",
        packageSmallBusinessTitle: "小規模事業",
        packageSmallBusinessPrice: "$3,000 MXNから",
        packageMediumBusinessTitle: "中規模企業",
        packageMediumBusinessPrice: "$6,000 MXNから",
        packageLargeBusinessTitle: "大企業または法人",
        packageLargeBusinessPrice: "$9,999 MXNから",
        packageFeatureHosting: "3年間のホスティング",
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

    // Obtener idioma anterior para tracking
    const previousLang = localStorage.getItem('selectedLanguage') || 'SPA';

    // Guardar idioma seleccionado en localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Enviar el evento a Google Analytics 4 - Mejorado
    gtag('event', 'language_change', {
        'event_category': 'User_Interaction',
        'event_label': `${previousLang}_to_${lang}`,
        'previous_language': previousLang,
        'custom_language': lang,
        'value': 1
    });

    // Tracking especial para idiomas no españoles
    if (lang === 'ENG' || lang === 'JPN') {
        // Marcar el inicio de tiempo para idiomas especiales
        sessionStorage.setItem(`${lang}_start_time`, Date.now());

        // Resetear contadores de interacción
        foreignLanguageInteractions = 0;

        // Enviar evento de inicio de sesión en idioma extranjero
        gtag('event', 'foreign_language_session_start', {
            'event_category': 'Language_Session',
            'event_label': lang,
            'custom_language': lang,
            'timestamp': new Date().toISOString()
        });

        // Iniciar heartbeat para tracking continuo
        startForeignLanguageHeartbeat();
    }

    // Si cambió de un idioma extranjero a español, calcular tiempo de sesión
    if ((previousLang === 'ENG' || previousLang === 'JPN') && lang === 'SPA') {
        const startTime = sessionStorage.getItem(`${previousLang}_start_time`);
        if (startTime) {
            const sessionDuration = Math.round((Date.now() - parseInt(startTime)) / 1000); // en segundos

            gtag('event', 'foreign_language_session_end', {
                'event_category': 'Language_Session',
                'event_label': previousLang,
                'custom_language': previousLang,
                'session_duration_seconds': sessionDuration,
                'session_duration_minutes': Math.round(sessionDuration / 60),
                'value': sessionDuration
            });

            // Limpiar el tiempo guardado
            sessionStorage.removeItem(`${previousLang}_start_time`);
        }
    }

    // Reinicializar AOS después del cambio de idioma para detectar correctamente los elementos
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}

// Agrega un evento de clic a cada opción del menú desplegable
document.querySelectorAll('#languageDropdown a').forEach(function (element) {
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
window.onclick = function (event) {
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
document.getElementById('navbar-toggler').addEventListener('click', function () {
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

    // Si ya está en un idioma extranjero, inicializar tracking si no existe
    if ((savedLanguage === 'ENG' || savedLanguage === 'JPN')) {
        const startTime = sessionStorage.getItem(`${savedLanguage}_start_time`);
        if (!startTime) {
            // Si no hay tiempo de inicio, establecerlo ahora
            sessionStorage.setItem(`${savedLanguage}_start_time`, Date.now());

            gtag('event', 'foreign_language_page_load', {
                'event_category': 'Language_Session',
                'event_label': savedLanguage,
                'custom_language': savedLanguage,
                'load_type': 'page_refresh'
            });

            // Iniciar heartbeat
            startForeignLanguageHeartbeat();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Cargar idioma guardado
    loadSavedLanguage();

    // Agregar eventos a los enlaces del dropdown de idiomas
    document.querySelectorAll('#languageDropdown a').forEach(button => {
        button.addEventListener('click', (event) => {
            const lang = event.target.getAttribute('data-lang'); // Obtener el idioma del atributo data-lang
            changeLanguage(lang); // Cambiar el idioma y registrar el evento en GA4
            event.preventDefault(); // Evitar la recarga de la página al hacer clic en el enlace
        });
    });

    // Funcionalidad de las cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            changeContent(card);
            trackForeignLanguageInteraction('hover', 'service_card');
        });
        card.addEventListener('mouseleave', () => resetContent(card));
        card.addEventListener('click', () => {
            trackForeignLanguageInteraction('click', 'service_card');
        });
    });

    // Trackear clics en navegación
    document.querySelectorAll('.navbar-nav a, .footer a').forEach(link => {
        link.addEventListener('click', () => {
            const linkText = link.textContent.trim();
            trackForeignLanguageInteraction('navigation_click', linkText);
        });
    });

    // Trackear scroll para medir engagement
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > 0 && scrollPercent % 25 === 0) { // Cada 25% de scroll
                trackForeignLanguageInteraction('scroll', `${scrollPercent}_percent`);
            }
        }, 150);
    });

    // Detectar tiempo en página cuando se va a cerrar/cambiar
    window.addEventListener('beforeunload', () => {
        const currentLang = localStorage.getItem('selectedLanguage') || 'SPA';
        if (currentLang === 'ENG' || currentLang === 'JPN') {
            const startTime = sessionStorage.getItem(`${currentLang}_start_time`);
            if (startTime) {
                gtag('event', 'foreign_language_session_end', {
                    'event_category': 'Language_Session',
                    'event_label': currentLang,
                    'custom_language': currentLang,
                    'session_duration_seconds': sessionDuration,
                    'session_duration_minutes': Math.round(sessionDuration / 60),
                    'total_interactions': foreignLanguageInteractions,
                    'transport_type': 'beacon'
                });
            }
        }
    });
});///Animacion de Btn Services con hover para cambio de texto y icono

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
    document.querySelectorAll('.tech-card').forEach(function (el) {
        el.classList.remove('selected');
    });

    // Añade la clase 'selected' a la tarjeta seleccionada
    card.classList.add('selected');
}

// Evento para detectar clic fuera de las tarjetas
document.addEventListener('click', function (event) {
    const isClickInside = event.target.closest('.tech-card');

    if (!isClickInside) {
        // Remueve la clase 'selected' de todas las tarjetas si el clic es fuera de una tarjeta
        document.querySelectorAll('.tech-card').forEach(function (el) {
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