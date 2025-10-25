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
        navTrabaja: "Empleo",
        navBlog: "BLOG",
        // Dropdown servicios
        dropdownDesarrollo: "Desarollo Web",
        dropdownRecursos: "Recursos Humanos",
        dropdownCapacitacion: "Capacitacion IT",
        dropdownInfluencers: "Influencers",
        dropdownAudiovisual: "Audiovisuales",
        
        // Secciones principales
        titleSobreNosotros: "Sobre Nosotros",
        aboutDescription: 'Somos una agencia digital internacional con presencia en <strong>México, Estados Unidos y España</strong>. <br> Nos especializamos en potenciar tu negocio a través de soluciones de <strong>desarrollo de software, desarrollo web</strong> y la producción de <strong>medios audiovisuales</strong>.<br> Además, contamos con expertos en <strong>Recursos Humanos</strong> para la <strong>capacitación de programadores</strong> y la gestión de <strong>talento de influencers</strong>, garantizando el éxito de tu estrategia digital.',
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
        techTitle:"Tecnologías que Usamos",
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
        // Equipo
        equipoTitle: "Nuestro Equipo",
        portfolioButton: "Portafolio",

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
        packageSmallBusinessPrice: "DESDE $4,500 MXN",
        packageMediumBusinessTitle: "EMPRESAS MEDIANAS",
        packageMediumBusinessPrice: "DESDE $9,000 MXN",
        packageLargeBusinessTitle: "EMPRESAS GRANDES O CORPORATIVOS",
        packageLargeBusinessPrice: "DESDE $15,000 MXN",
        packageFeatureHosting: "3 años de Dominio y Hosting",
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
        },
        // Títulos de páginas
        pageTitles: {
            index: "Agencia Digital Internacional: Desarrollo Web y Soluciones IT | GISEA",
            about: "Sobre Nuestra Agencia Digital: Stack y Clientes | GISEA",
            service_desarrollo_web: "Desarrollo Web Profesional - Agencia Digital Internacional | GISEA Agency",
            capacitacion_it: "Capacitación IT: Asesorías en Lenguajes y Frameworks | GISEA",
            recursos_humanos: "Servicios de Recursos Humanos en México e Internacional | GISEA",
            influencers: "Marketing de Influencers en México e Internacional | GISEA",
            negocios_pequenos: "Desarrollo Web para Negocios Pequeños desde $3,000 MXN | GISEA",
            empresas_medianas: "Desarrollo Web para Empresas Medianas desde $6,000 MXN | GISEA",
            empresas_grandes_corp: "Desarrollo Web Corporativo para Empresas Grandes desde $9,999 MXN | GISEA",
            produccion_digital: "Producción Digital: Contenido, Video y Diseño Profesional | GISEA"
        }
    },
    ENG: {
        // Navbar
        navInicio: "Home",
        navSobreNosotros: "About Us",
        navServicios: "Services",
        navContacto: "Contact",
        navTrabaja: "Careers",
        navBlog: "BLOG",
        // Dropdown servicios
        dropdownDesarrollo: "Web Development",
        dropdownRecursos: "Human Resources",
        dropdownCapacitacion: "IT Training",
        dropdownInfluencers: "Influencers",
        dropdownAudiovisual: "Audiovisual",
        // Secciones principales
        titleSobreNosotros: "About Us",
        aboutDescription: 'We are an international digital agency with presence in <strong>Mexico, United States and Spain</strong>. <br> We specialize in empowering your business through <strong>software development, web development</strong> solutions and <strong>audiovisual media</strong> production.<br> Additionally, we have <strong>Human Resources</strong> experts for <strong>programmer training</strong> and <strong>influencer talent</strong> management, guaranteeing the success of your digital strategy.',
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
        techTitle:"Technologies We Use",
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
        // Equipo
        equipoTitle: "Our Team",
        portfolioButton: "Portfolio",


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
        packageSmallBusinessPrice: "FROM $4,500 MXN",
        packageMediumBusinessTitle: "MEDIUM ENTERPRISES",
        packageMediumBusinessPrice: "FROM $9,000 MXN",
        packageLargeBusinessTitle: "LARGE ENTERPRISES OR CORPORATES",
        packageLargeBusinessPrice: "FROM $15,000 MXN",
        packageFeatureHosting: "3 years of Domain and Hosting",
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
        },
        // Títulos de páginas
        pageTitles: {
            index: "International Digital Agency: Web Development & IT Solutions | GISEA",
            about: "About Our Digital Agency: Stack & Clients | GISEA",
            service_desarrollo_web: "Professional Web Development - International Digital Agency | GISEA Agency",
            capacitacion_it: "IT Training: Programming Languages & Frameworks Consulting | GISEA",
            recursos_humanos: "Human Resources Services in Mexico & International | GISEA",
            influencers: "Influencer Marketing in Mexico & International | GISEA",
            negocios_pequenos: "Web Development for Small Business from $3,000 MXN | GISEA",
            empresas_medianas: "Web Development for Medium Companies from $6,000 MXN | GISEA",
            empresas_grandes_corp: "Corporate Web Development for Large Companies from $9,999 MXN | GISEA",
            produccion_digital: "Digital Production: Content, Video & Professional Design | GISEA"
        }
    },
    JPN: {
        // Navbar
        navInicio: "ホーム",
        navSobreNosotros: "私たちについて",
        navServicios: "サービス",
        navContacto: "お問い合わせ",
        navTrabaja: "採用情報",
        navBlog: "ブログ",
        // Dropdown servicios
        dropdownDesarrollo: "ウェブ開発",
        dropdownRecursos: "人材",
        dropdownCapacitacion: "IT研修",
        dropdownInfluencers: "インフルエンサー",
        dropdownAudiovisual: "オーディオビジュアル",
        // Secciones principales
        titleSobreNosotros: "私たちについて",
        aboutDescription: '私たちは<strong>メキシコ、アメリカ、スペイン</strong>に拠点を持つ国際的なデジタル代理店です。<br> <strong>ソフトウェア開発、ウェブ開発</strong>ソリューション、<strong>オーディオビジュアルメディア</strong>制作を通じてお客様のビジネスを強化することを専門としています。<br> さらに、<strong>プログラマー研修</strong>と<strong>インフルエンサータレント</strong>管理のための<strong>人材</strong>専門家を擁し、お客様のデジタル戦略の成功を保証します。',
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
        techTitle:"使用している技術",
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
        // Equipo
        equipoTitle: "私たちのチーム",
        portfolioButton: "ポートフォリオ",
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
        packageSmallBusinessPrice: "$4,500 MXNから",
        packageMediumBusinessTitle: "中規模企業",
        packageMediumBusinessPrice: "$9,000 MXNから",
        packageLargeBusinessTitle: "大企業または法人",
        packageLargeBusinessPrice: "$15,000 MXNから",
        packageFeatureHosting: "3年間のドメインとホスティング",
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
        },
        // Títulos de páginas  
        pageTitles: {
            index: "国際デジタルエージェンシー: ウェブ開発とITソリューション | GISEA",
            about: "デジタルエージェンシーについて: スタックとクライアント | GISEA",
            service_desarrollo_web: "プロフェッショナルウェブ開発 - 国際デジタルエージェンシー | GISEA Agency",
            capacitacion_it: "IT研修: プログラミング言語とフレームワークコンサルティング | GISEA",
            recursos_humanos: "メキシコと国際的な人材サービス | GISEA",
            influencers: "メキシコと国際的なインフルエンサーマーケティング | GISEA",
            negocios_pequenos: "小規模事業向けウェブ開発 $3,000 MXNから | GISEA",
            empresas_medianas: "中規模企業向けウェブ開発 $6,000 MXNから | GISEA",
            empresas_grandes_corp: "大企業向けコーポレートウェブ開発 $9,999 MXNから | GISEA",
            produccion_digital: "デジタル制作: コンテンツ、ビデオ、プロフェッショナルデザイン | GISEA"
        }
    }
};

// Traducciones específicas para las cards del equipo (ESP/ENG/JPN)
const teamTranslations = {
    SPA: {
        tabs: {
            about: 'SOBRE MÍ',
            experience: 'EXPERIENCIA',
            contact: 'CONTACTO',
            collaborations: 'COLABORACIONES'
        },
        members: {
            lia: {
                jobTitle: 'Directora de Desarrollo Visual',
                aboutHtml: `Soy licenciada en ciencias de la comunicación, especializada en producción y postproducción audiovisual. Me he concentrado en realizar contenidos para medios digitales, desde animación basada en <strong>Adobe After Effects</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Adobe After Effects" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 4px;">
                        <title>Adobe After Effects - Software de composición digital y efectos visuales</title>
                        <path fill="#1F0740" d="M6.5 6.5h115v115H6.5z" />
                        <path fill="#D490C5" d="M0 0v128h128V0H0zm121.5 121.5H6.5V6.5h115v115z" />
                        <path fill="#D490C5" d="M103.5 59.2s-.6-14.6-16.5-14.6c-16 0-17.3 22-17.3 22v4.7S72.5 89.6 86 89.6s14.8-2.6 14.8-2.6v-8.1s-19.3 9.2-21.2-10h24v-9.7zm-9 2.4h-15s0-8.3 7.5-9.2c8.2 0 7.5 9.2 7.5 9.2zM50.5 29.9H38.4v3.8l-16 54.9h9.4l4.4-16.1H53l4.5 16.1h10.3L50.5 29.9zM38.2 63.1l6.4-24.5L51 63.1H38.2z" />
                    </svg>
                    y edición profesional en <strong>Adobe Premiere Pro</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Adobe Premiere Pro" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 4px;">
                        <title>Adobe Premiere Pro - Software de edición de video profesional</title>
                        <path fill="#2A0634" d="M0 0h128v128H0z"/>
                        <path fill="#E976B9" d="M0 0v128h128V0H0zm123 123H5V5h118v118z"/>
                        <path fill="#E976B9" d="M69 47.1c-.1-9.4-7.8-16.9-17.2-16.8H33.3v58.5h9.6V67.5h8.3C61 67.4 69 59.3 69 49.4v-2.3zm-9.6 3c0 5-4.1 9.1-9.1 9.1h-7.4V38.5h7.4c5 0 9.1 4.1 9.1 9.1v2.5zM77.1 88.8V48.9s10.2-5.1 20.2-3.8v8.3s-7 0-10.1 1.3v34.2H77.1z"/>
                    </svg>, hasta postproducciones estéticamente atractivas y enérgicas para medios digitales.`,
                experience: [
                    {
                        title: 'Medios de Comunicación Tradicionales',
                        text: 'Colaborando en <b>MVS Radio y TV Azteca</b>, participando en proyectos audiovisuales y de comunicación.'
                    },
                    {
                        title: 'Colaboraciones Digitales',
                        text: 'Trabajando con creadores y canales digitales como <b>Exa FM, Desansiedad y SandVox Media</b>, realizando también labores de locución.'
                    },
                    {
                        title: 'Creadora de Contenido',
                        text: 'Creadora de contenido en redes sociales con más de medio millón de seguidores en <b>TikTok</b> y más de <b>40 mil</b> en Instagram.'
                    }
                ],
                contactSubtitle: 'COLABORACIONES',
                location: 'México y todo el Mundo',
                cta: 'TRABAJEMOS JUNTOS'
            },
            rick: {
                jobTitle: 'Software Engineer',
                aboutText:
                    'Ingeniero de software especializado en desarrollo full‑stack y arquitectura de sistemas. ' +
                    'Experto en tecnologías modernas y metodologías ágiles.',
                experience: [
                    {
                        title: 'Fundador de GISEA',
                        text: 'Director de tecnologías de la información, desarrollando soluciones innovadoras y liderando el crecimiento de la empresa desde sus inicios.'
                    },
                    {
                        title: 'Profesor en SUPERPROF.mx',
                        text: 'Profesor #1 en <b>Programación</b> en la plataforma SUPERPROF.mx, brindando educación de alta calidad en tecnologías de desarrollo web y programación.'
                    },
                    {
                        title: 'Desarrollo Web y Tecnología',
                        text: '<b>Senior Frontend Developer</b> especialista en <b>desarrollo web moderno</b>, con experiencia en frameworks avanzados y arquitectura de sistemas escalables.'
                    }
                ],
                contactSubtitle: 'CONTACTO',
                location: 'Cuernavaca, Morelos',
                cta: 'COLABOREMOS'
            },
            hugo: {
                jobTitle: 'Frontend Developer',
                aboutText:
                    'Desarrollador frontend especializado en interfaces de usuario modernas y experiencias interactivas. ' +
                    'Experto en optimización y diseño responsivo.',
                experience: [
                    {
                        title: 'Frontend Developer Junior',
                        text: 'Cuento con <b>un año de experiencia</b> como desarrollador web frontend con <b>tecnologías modernas</b>.'
                    },
                    {
                        title: 'A punto de Egresar de Ingeniería en Software',
                        text: 'Estudiante avanzado de <b>Ingeniería en Software</b>, próximo a egresar con sólidos conocimientos en desarrollo de aplicaciones, metodologías ágiles y arquitectura de sistemas.'
                    },
                    {
                        title: 'Experiencia Internacional y Nivel de Inglés B1',
                        text: 'Durante mi formación profesional, realicé una estadía en <b>British Columbia, Canadá</b>. ' +
                              'Cuento con <b>nivel de inglés B1</b>, lo que me permite comunicarme efectivamente y colaborar con equipos internacionales.'
                    }
                ],
                contactSubtitle: 'CONTACTO',
                location: 'Estado de México, Ecatepec',
                cta: 'CONECTEMOS'
            }
        }
    },
    ENG: {
        tabs: {
            about: 'ABOUT ME',
            experience: 'EXPERIENCE',
            contact: 'CONTACT',
            collaborations: 'COLLABORATIONS'
        },
        members: {
            lia: {
                jobTitle: 'Audiovisual Director',
                aboutHtml: `I hold a Bachelor’s degree in Communication Sciences, specializing in audiovisual production and post‑production. I focus on creating content for digital media, from motion‑graphics animation in <strong>Adobe After Effects</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Adobe After Effects" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 4px;">
                        <title>Adobe After Effects - Digital compositing and visual effects software</title>
                        <path fill="#1F0740" d="M6.5 6.5h115v115H6.5z" />
                        <path fill="#D490C5" d="M0 0v128h128V0H0zm121.5 121.5H6.5V6.5h115v115z" />
                        <path fill="#D490C5" d="M103.5 59.2s-.6-14.6-16.5-14.6c-16 0-17.3 22-17.3 22v4.7S72.5 89.6 86 89.6s14.8-2.6 14.8-2.6v-8.1s-19.3 9.2-21.2-10h24v-9.7zm-9 2.4h-15s0-8.3 7.5-9.2c8.2 0 7.5 9.2 7.5 9.2zM50.5 29.9H38.4v3.8l-16 54.9h9.4l4.4-16.1H53l4.5 16.1h10.3L50.5 29.9zM38.2 63.1l6.4-24.5L51 63.1H38.2z" />
                    </svg>
                    and professional editing in <strong>Adobe Premiere Pro</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Adobe Premiere Pro" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 4px;">
                        <title>Adobe Premiere Pro - Professional video editing software</title>
                        <path fill="#2A0634" d="M0 0h128v128H0z"/>
                        <path fill="#E976B9" d="M0 0v128h128V0H0zm123 123H5V5h118v118z"/>
                        <path fill="#E976B9" d="M69 47.1c-.1-9.4-7.8-16.9-17.2-16.8H33.3v58.5h9.6V67.5h8.3C61 67.4 69 59.3 69 49.4v-2.3zm-9.6 3c0 5-4.1 9.1-9.1 9.1h-7.4V38.5h7.4c5 0 9.1 4.1 9.1 9.1v2.5zM77.1 88.8V48.9s10.2-5.1 20.2-3.8v8.3s-7 0-10.1 1.3v34.2H77.1z"/>
                    </svg>, delivering aesthetically appealing and energetic post‑productions for digital platforms.`,
                experience: [
                    {
                        title: 'Traditional Media',
                        text: 'Collaborating with <b>MVS Radio and TV Azteca</b>, taking part in audiovisual and communication projects.'
                    },
                    {
                        title: 'Digital Collaborations',
                        text: 'Working with creators and digital channels such as <b>Exa FM, Desansiedad and SandVox Media</b>, also doing voice‑over work.'
                    },
                    {
                        title: 'Content Creator',
                        text: 'Social media creator with over half a million followers on <b>TikTok</b> and more than <b>40k</b> on Instagram.'
                    }
                ],
                contactSubtitle: 'COLLABORATIONS',
                location: 'Mexico and worldwide',
                cta: 'LET’S WORK TOGETHER'
            },
            rick: {
                jobTitle: 'Software Engineer',
                aboutText:
                    'Software engineer specialized in full‑stack development and systems architecture. ' +
                    'Expert in modern technologies and agile methodologies.',
                experience: [
                    {
                        title: 'Founder of GISEA',
                        text: 'Head of Information Technologies, developing innovative solutions and leading the company’s growth since its inception.'
                    },
                    {
                        title: 'Teacher at SUPERPROF.mx',
                        text: '#1 <b>Programming</b> teacher on the SUPERPROF.mx platform, providing high‑quality education in web development and programming technologies.'
                    },
                    {
                        title: 'Web Development & Technology',
                        text: '<b>Senior Frontend Developer</b> specializing in <b>modern web development</b>, with experience in advanced frameworks and scalable systems architecture.'
                    }
                ],
                contactSubtitle: 'CONTACT',
                location: 'Cuernavaca, Morelos',
                cta: 'LET’S COLLABORATE'
            },
            hugo: {
                jobTitle: 'Frontend Developer',
                aboutText:
                    'Frontend developer specialized in modern user interfaces and interactive experiences. ' +
                    'Expert in optimization and responsive design.',
                experience: [
                    {
                        title: 'Junior Frontend Developer',
                        text: 'I have <b>one year of experience</b> as a frontend web developer using <b>modern technologies</b>.'
                    },
                    {
                        title: 'About to Graduate in Software Engineering',
                        text: 'Advanced student in <b>Software Engineering</b>, close to graduating with solid knowledge in application development, agile methodologies, and systems architecture.'
                    },
                    {
                        title: 'International Experience & English Level B1',
                        text: 'During my studies, I completed a stay in <b>British Columbia, Canada</b>. ' +
                              'I have <b>B1 English level</b>, which allows effective communication and collaboration with international teams.'
                    }
                ],
                contactSubtitle: 'CONTACT',
                location: 'State of Mexico, Ecatepec',
                cta: 'LET’S CONNECT'
            }
        }
    },
    JPN: {
        tabs: {
            about: '自己紹介',
            experience: '経験',
            contact: '連絡先',
            collaborations: 'コラボレーション'
        },
        members: {
            lia: {
                jobTitle: '映像制作ディレクター',
                aboutHtml: `私はコミュニケーション学の学士で、映像制作・ポストプロダクションを専門としています。<strong>Adobe After Effects</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Adobe After Effects" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 4px;">
                        <title>Adobe After Effects - デジタル合成と映像効果ソフトウェア</title>
                        <path fill="#1F0740" d="M6.5 6.5h115v115H6.5z" />
                        <path fill="#D490C5" d="M0 0v128h128V0H0zm121.5 121.5H6.5V6.5h115v115z" />
                        <path fill="#D490C5" d="M103.5 59.2s-.6-14.6-16.5-14.6c-16 0-17.3 22-17.3 22v4.7S72.5 89.6 86 89.6s14.8-2.6 14.8-2.6v-8.1s-19.3 9.2-21.2-10h24v-9.7zm-9 2.4h-15s0-8.3 7.5-9.2c8.2 0 7.5 9.2 7.5 9.2zM50.5 29.9H38.4v3.8l-16 54.9h9.4l4.4-16.1H53l4.5 16.1h10.3L50.5 29.9zM38.2 63.1l6.4-24.5L51 63.1H38.2z" />
                    </svg>
                    によるモーショングラフィックスのアニメーションや、<strong>Adobe Premiere Pro</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Adobe Premiere Pro" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin: 0 4px;">
                        <title>Adobe Premiere Pro - プロ向け動画編集ソフト</title>
                        <path fill="#2A0634" d="M0 0h128v128H0z"/>
                        <path fill="#E976B9" d="M0 0v128h128V0H0zm123 123H5V5h118v118z"/>
                        <path fill="#E976B9" d="M69 47.1c-.1-9.4-7.8-16.9-17.2-16.8H33.3v58.5h9.6V67.5h8.3C61 67.4 69 59.3 69 49.4v-2.3zm-9.6 3c0 5-4.1 9.1-9.1 9.1h-7.4V38.5h7.4c5 0 9.1 4.1 9.1 9.1v2.5zM77.1 88.8V48.9s10.2-5.1 20.2-3.8v8.3s-7 0-10.1 1.3v34.2H77.1z"/>
                    </svg>
                    によるプロフェッショナルな編集など、デジタルプラットフォーム向けに美しくエネルギッシュなコンテンツを制作しています。`,
                experience: [
                    {
                        title: '伝統的メディア',
                        text: '<b>MVS Radio</b> と <b>TV Azteca</b> にて、映像およびコミュニケーション関連のプロジェクトに参画。'
                    },
                    {
                        title: 'デジタルでのコラボレーション',
                        text: '<b>Exa FM、Desansiedad、SandVox Media</b> などのデジタルチャンネルやクリエイターと協業し、' +
                              'ナレーション（ボイスオーバー）も担当。'
                    },
                    {
                        title: 'コンテンツクリエイター',
                        text: 'SNS で <b>TikTok</b> に50万人以上、Instagramに <b>4万人以上</b> のフォロワーを持つコンテンツ制作者。'
                    }
                ],
                contactSubtitle: 'コラボレーション',
                location: 'メキシコおよび世界各地',
                cta: '一緒に働きましょう'
            },
            rick: {
                jobTitle: 'ソフトウェアエンジニア',
                aboutText:
                    'フルスタック開発とシステムアーキテクチャに特化したソフトウェアエンジニア。' +
                    '最新技術とアジャイル手法に精通。',
                experience: [
                    {
                        title: 'GISEA の創業者',
                        text: '情報技術の責任者として、革新的なソリューションを開発し、創業時から会社の成長を牽引。'
                    },
                    {
                        title: 'SUPERPROF.mx の講師',
                        text: 'SUPERPROF.mx プラットフォームで <b>プログラミング</b> 分野のトップ講師として、' +
                              'Web 開発およびプログラミング技術の高品質な教育を提供。'
                    },
                    {
                        title: 'Web 開発とテクノロジー',
                        text: '<b>シニア・フロントエンド・デベロッパー</b> として <b>モダンな Web 開発</b> を専門に、' +
                              '高度なフレームワークとスケーラブルなシステム設計に経験を有する。'
                    }
                ],
                contactSubtitle: '連絡先',
                location: 'クエルナバカ（モレロス州）',
                cta: 'コラボしましょう'
            },
            hugo: {
                jobTitle: 'フロントエンド・デベロッパー',
                aboutText:
                    'モダンなユーザーインターフェースとインタラクティブな体験を専門とするフロントエンド開発者。' +
                    '最適化およびレスポンシブデザインに精通。',
                experience: [
                    {
                        title: 'ジュニア・フロントエンド・デベロッパー',
                        text: '<b>1年の実務経験</b> があり、<b>最新技術</b> を用いたフロントエンド開発に従事。'
                    },
                    {
                        title: 'ソフトウェア工学の卒業見込み',
                        text: '<b>ソフトウェア工学</b> を専攻する上級生で、アプリ開発、アジャイル手法、システムアーキテクチャに関する確かな知識を有する。'
                    },
                    {
                        title: '海外経験 ＆ 英語レベル B1',
                        text: '<b>カナダ・ブリティッシュコロンビア州</b> での滞在経験あり。<b>B1 レベルの英語力</b> を有し、国際的なチームとの円滑なコミュニケーションと協業が可能。'
                    }
                ],
                contactSubtitle: '連絡先',
                location: 'メキシコ州・エカテペック',
                cta: 'つながりましょう'
            }
        }
    }
};

// Aplica las traducciones a las cards del equipo
function updateTeamCards(lang) {
    const t = teamTranslations[lang];
    if (!t) return;

    // Utilidades locales
    const setText = (selector, text) => {
        const el = document.querySelector(selector);
        if (el && typeof text === 'string') el.textContent = text;
    };
    const setHTML = (selector, html) => {
        const el = document.querySelector(selector);
        if (el && typeof html === 'string') el.innerHTML = html;
    };

    // Obtener la card del miembro sin depender del data-state actual
    const getMemberCard = (memberId) => {
        const aboutEl = document.querySelector(`#about-${memberId}`);
        if (aboutEl) return aboutEl.closest('.profile-card');
        const expEl = document.querySelector(`#experience-${memberId}`);
        if (expEl) return expEl.closest('.profile-card');
        const contactEl = document.querySelector(`#contact-${memberId}`);
        if (contactEl) return contactEl.closest('.profile-card');
        return null;
    };

    // Tabs (botones inferiores) por card
    const applyTabsLabels = (memberId, contactLabelOverride) => {
        const card = getMemberCard(memberId);
        if (!card) return;
        const buttons = card.querySelectorAll('.profile-card-buttons button');
        buttons.forEach(btn => {
            const section = btn.getAttribute('data-section');
            if (section === `#about-${memberId}`) btn.textContent = t.tabs.about;
            else if (section === `#experience-${memberId}`) btn.textContent = t.tabs.experience;
            else if (section === `#contact-${memberId}`) btn.textContent = contactLabelOverride || t.tabs.contact;
        });
    };

    // Subtítulos de sección por card
    const applySectionSubtitles = (memberId, customContactSubtitle) => {
        setText(`#about-${memberId} .profile-card-subtitle`, t.tabs.about);
        setText(`#experience-${memberId} .profile-card-subtitle`, t.tabs.experience);
        setText(`#contact-${memberId} .profile-card-subtitle`, customContactSubtitle || t.tabs.contact);
    };

    // Localización (texto junto al ícono) en sección de contacto
    const setContactLocation = (memberId, location) => {
        const locDiv = document.querySelector(`#contact-${memberId} .profile-card-contact`);
        if (locDiv) {
            const icon = locDiv.querySelector('svg');
            const iconHTML = icon ? icon.outerHTML : '';
            locDiv.innerHTML = `${iconHTML} ${location}`;
        }
    };

    // Botón CTA de contacto
    const setContactCTA = (memberId, cta) => {
        const card = getMemberCard(memberId);
        if (!card) return;
        const btn = card.querySelector('.profile-contact-me');
        if (btn && typeof cta === 'string') btn.textContent = cta;
    };

    // Experiencia: títulos y párrafos sin tocar los logos/iconos
    const setExperienceItems = (memberId, items) => {
        const expItems = document.querySelectorAll(`#experience-${memberId} .experience-item`);
        items.forEach((it, idx) => {
            const container = expItems[idx];
            if (!container) return;
            const h4 = container.querySelector('h4');
            const p = container.querySelector('p');
            if (h4) h4.textContent = it.title;
            if (p) p.innerHTML = it.text;
        });
    };

    // Job title (para miembros sin data-translate en el H2)
    const setJobTitle = (memberId, title) => {
        const card = getMemberCard(memberId);
        if (!card) return;
        const h2 = card.querySelector('.profile-card-jobtitle');
        if (h2 && typeof title === 'string') h2.textContent = title;
    };

    // LIA
    if (t.members?.lia) {
        applyTabsLabels('lia', t.members.lia.contactSubtitle);
        applySectionSubtitles('lia', t.members.lia.contactSubtitle);
        setHTML('#about-lia .profile-card-desc', t.members.lia.aboutHtml);
        setExperienceItems('lia', t.members.lia.experience);
        setContactLocation('lia', t.members.lia.location);
        setContactCTA('lia', t.members.lia.cta);
        setJobTitle('lia', t.members.lia.jobTitle);
    }

    // RICK
    if (t.members?.rick) {
        applyTabsLabels('rick');
        applySectionSubtitles('rick', t.members.rick.contactSubtitle);
        setText('#about-rick .profile-card-desc', t.members.rick.aboutText);
        setExperienceItems('rick', t.members.rick.experience);
        setContactLocation('rick', t.members.rick.location);
        setContactCTA('rick', t.members.rick.cta);
        setJobTitle('rick', t.members.rick.jobTitle);
    }

    // HUGO
    if (t.members?.hugo) {
        applyTabsLabels('hugo');
        applySectionSubtitles('hugo', t.members.hugo.contactSubtitle);
        setText('#about-hugo .profile-card-desc', t.members.hugo.aboutText);
        setExperienceItems('hugo', t.members.hugo.experience);
        setContactLocation('hugo', t.members.hugo.location);
        setContactCTA('hugo', t.members.hugo.cta);
        setJobTitle('hugo', t.members.hugo.jobTitle);
    }
}

// Función para actualizar el estado de los elementos del menú de idiomas
function updateLanguageMenuState(selectedLang) {
    document.querySelectorAll('#languageDropdown a').forEach(function (element) {
        const elementLang = element.getAttribute('data-lang');
        
        if (elementLang === selectedLang) {
            // Deshabilitar el idioma seleccionado
            element.style.pointerEvents = 'none';
            element.style.opacity = '0.5';
            element.style.cursor = 'not-allowed';
            element.classList.add('disabled');
        } else {
            // Habilitar otros idiomas
            element.style.pointerEvents = 'auto';
            element.style.opacity = '1';
            element.style.cursor = 'pointer';
            element.classList.remove('disabled');
        }
    });
}

// Función para actualizar el título de la página según el idioma
function updatePageTitle(lang) {
    const translation = translations[lang];
    
    // Determinar qué página es actualmente basándose en la URL
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    let pageKey = '';
    
    // Mapear los nombres de archivo a las claves de título
    if (fileName === '' || fileName === 'index.html' || currentPath === '/' || currentPath.endsWith('/')) {
        pageKey = 'index';
    } else if (fileName === 'about.html') {
        pageKey = 'about';
    } else if (fileName === 'service_desarollo_web.html') {
        pageKey = 'service_desarrollo_web';
    } else if (fileName === 'capacitacion_it.html') {
        pageKey = 'capacitacion_it';
    } else if (fileName === 'recursos_humanos.html') {
        pageKey = 'recursos_humanos';
    } else if (fileName === 'influencers.html') {
        pageKey = 'influencers';
    } else if (fileName === 'negocios_pequenos.html') {
        pageKey = 'negocios_pequenos';
    } else if (fileName === 'empresas_medianas.html') {
        pageKey = 'empresas_medianas';
    } else if (fileName === 'empresas_grandes_corp.html') {
        pageKey = 'empresas_grandes_corp';
    } else if (fileName === 'produccion_digital.html') {
        pageKey = 'produccion_digital';
    }
    
    // Actualizar el título si existe una traducción
    if (pageKey && translation.pageTitles && translation.pageTitles[pageKey]) {
        document.title = translation.pageTitles[pageKey];
        console.log('✅ Título actualizado:', fileName, '→', translation.pageTitles[pageKey], '(', lang, ')'); // Debug temporal
        
        // También actualizar el meta tag lang del HTML
        document.documentElement.lang = lang === 'SPA' ? 'es' : 
                                      lang === 'ENG' ? 'en' : 
                                      lang === 'JPN' ? 'ja' : 'es';
    } else {
        console.log('❌ No se encontró título para:', fileName, 'pageKey:', pageKey, 'lang:', lang); // Debug temporal
    }
}

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
            if (key === 'navTrabaja' || key === 'aboutDescription') {
                element.innerHTML = translatedText;
            } else {
                element.textContent = translatedText;
            }
        }
    });

    // Actualizar el título de la página dinámicamente
    updatePageTitle(lang);

    // Aplicar traducciones específicas de las cards del equipo
    if (typeof updateTeamCards === 'function') {
        updateTeamCards(lang);
    }

    // Obtener idioma anterior para tracking
    const previousLang = localStorage.getItem('selectedLanguage') || 'SPA';

    // Guardar idioma seleccionado en localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Forzar un reflow del DOM para asegurar que los estilos CSS se apliquen correctamente
    document.body.offsetHeight;

    // Actualizar el estado del menú de idiomas para deshabilitar el idioma seleccionado
    updateLanguageMenuState(lang);

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

        // Verificar si el elemento está deshabilitado
        if (this.classList.contains('disabled')) {
            return; // No hacer nada si está deshabilitado
        }

        // Obtén el idioma seleccionado y la bandera correspondiente
        let selectedLang = this.getAttribute('data-lang');
        let flagSrc = this.getAttribute('data-flag');

        // Actualiza el texto del idioma seleccionado
        document.getElementById('selectedLanguage').textContent = selectedLang;

        // Cambia la imagen de la bandera
        document.getElementById('languageIcon').src = flagSrc;

        // Cambia el idioma del contenido inmediatamente
        changeLanguage(selectedLang);

        // Oculta el menú desplegable
        document.getElementById('languageDropdown').classList.remove('show');

        // Restablece la rotación del icono a 0 grados
        let dropdownIcon = document.getElementById('dropdownIcon');
        dropdownIcon.classList.remove('rotate-180');
        dropdownIcon.classList.add('rotate-0');

        // Asegurar que los cambios se apliquen completamente
        setTimeout(() => {
            // Forzar un reflow suave para asegurar la aplicación de estilos CSS
            document.documentElement.scrollTop = document.documentElement.scrollTop;
        }, 50);
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
// Función global para generar rutas dinámicas según la profundidad de carpetas
window.getRelativePath = function(resourcePath) {
    const currentPath = window.location.pathname;
    
    // Normalizar la ruta removiendo barras duplicadas y espacios
    const normalizedPath = currentPath.replace(/\/+/g, '/').trim();
    
    // Dividir la ruta en partes, excluyendo elementos vacíos y archivos HTML
    const pathParts = normalizedPath.split('/').filter(part => {
        return part !== '' && 
               part !== '.' && 
               part !== '..' && 
               !part.endsWith('.html') && 
               !part.endsWith('.htm');
    });
    
    // Detectar si estamos en GitHub Pages o local
    const isGitHubPages = normalizedPath.includes('github.io') || window.location.hostname.includes('github.io');
    
    // Para GitHub Pages, ajustar el conteo de niveles
    let actualLevels = pathParts.length;
    if (isGitHubPages) {
        // En GitHub Pages, el primer nivel suele ser el nombre del repositorio
        actualLevels = Math.max(0, pathParts.length - 1);
    }
    
    // Si ya tiene '../' al inicio, verificar si es correcto para el nivel actual
    if (resourcePath.startsWith('../')) {
        // Si estamos en la raíz (nivel 0), remover el '../'
        if (actualLevels === 0) {
            return resourcePath.replace('../', '');
        }
        // Si no, mantener la ruta tal como está
        return resourcePath;
    }
    
    // Casos especiales para rutas en la raíz
    if (normalizedPath === '/' || normalizedPath === '' || actualLevels === 0) {
        return resourcePath; // Estamos en la raíz, usar ruta directa
    }
    
    // Generar '../' por cada nivel de carpeta
    const pathPrefix = '../'.repeat(actualLevels);
    
    // Remover barra inicial del resourcePath si existe para evitar rutas duplicadas
    const cleanResourcePath = resourcePath.startsWith('/') ? resourcePath.slice(1) : resourcePath;
    
    return pathPrefix + cleanResourcePath;
};

function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'SPA';
    
    // Usar la función global para generar rutas dinámicas
    const flagMap = {
        'SPA': window.getRelativePath('icons/bandera_mex.png'),
        'ENG': window.getRelativePath('icons/bandera_usa.png'),
        'JPN': window.getRelativePath('icons/bandera_jpn.png')
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

// Función para inicializar tooltips de banderas
window.initializeTooltips = function() {
    // Títulos de las banderas aqui se hace el cambio de los nombres en los tooltips
    const flagTitles = {
        'bandera_usa.png': 'Little Rock, Arkansas,<br> LA California',
        'bandera_venezuela.png': 'Maracay', 
        'bandera_mex.png': 'MTY, CDMX, GDL<br>EDOMEX, Cancun, TJ',
        'bandera_jpn.png': 'Shibuya',
        'bandera_esp.png': 'Mayorca,Malaga <br> Islas Canarias',
        'bandera_argentina.png': 'Buenos Aires',
        'bandera_brazil.png': 'Porto Alegre',
        'bandera_australia.png': 'Sidney',
        'bandera_italia.png': 'Milan',
        'bandera_canada.png': 'Vancouver'
    };
    
    // Buscar banderas en la sección de clientes
    const clientSection = document.querySelector('.clientes-hover');
    if (clientSection) {
        const flags = clientSection.querySelectorAll('.flag');
        
        flags.forEach((flag) => {
            const src = flag.getAttribute('src') || flag.src;
            
            // Encontrar el título correcto basado en el src
            let correctTitle = null;
            for (const [fileName, title] of Object.entries(flagTitles)) {
                if (src && src.includes(fileName)) {
                    correctTitle = title;
                    break;
                }
            }
            
            if (correctTitle) {
                // Limpiar clases undefined
                const classList = flag.className.replace(/undefined/g, '').replace(/\s+/g, ' ').trim();
                flag.className = classList;
                
                // Configurar atributos del tooltip
                flag.setAttribute('data-bs-toggle', 'tooltip');
                flag.setAttribute('title', correctTitle);
                
                // Crear tooltip
                try {
                    const existingTooltip = bootstrap.Tooltip.getInstance(flag);
                    if (existingTooltip) {
                        existingTooltip.dispose();
                    }
                    
                    // Detectar dispositivo móvil
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
                    
                    const tooltip = new bootstrap.Tooltip(flag, {
                        trigger: isMobile ? 'manual' : 'hover focus',
                        placement: 'top',
                        animation: true,
                        delay: isMobile ? 0 : { "show": 200, "hide": 100 },
                        html: true,
                        container: 'body',
                        title: correctTitle,
                        template: '<div class="tooltip flag-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                    });
                    
                    if (isMobile) {
                        // Eventos para móvil
                        flag.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Cerrar otros tooltips
                            document.querySelectorAll('.flag').forEach(otherFlag => {
                                if (otherFlag !== flag) {
                                    const otherTooltip = bootstrap.Tooltip.getInstance(otherFlag);
                                    if (otherTooltip) {
                                        otherTooltip.hide();
                                    }
                                }
                            });
                            
                            // Toggle tooltip actual
                            const tooltipElement = document.querySelector('.tooltip.flag-tooltip');
                            if (tooltipElement && tooltipElement.classList.contains('show')) {
                                tooltip.hide();
                            } else {
                                tooltip.show();
                            }
                        });
                        
                        // Cerrar al hacer click fuera
                        document.addEventListener('click', (e) => {
                            if (!flag.contains(e.target) && !e.target.closest('.tooltip.flag-tooltip')) {
                                tooltip.hide();
                            }
                        });
                        
                        // Cerrar al hacer scroll
                        window.addEventListener('scroll', () => {
                            tooltip.hide();
                        });
                    }
                    
                } catch (error) {
                    console.error('Error creando tooltip:', error);
                }
            }
        });
    }
    
    // Inicializar otros tooltips (portafolio, etc.)
    const otherTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]:not(.flag)');
    otherTooltips.forEach(element => {
        const title = element.getAttribute('title');
        if (title) {
            try {
                new bootstrap.Tooltip(element);
            } catch (error) {
                console.error('Error en tooltip:', error);
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', function () {
    // Verificar si Bootstrap está disponible
    if (typeof bootstrap === 'undefined' || typeof bootstrap.Tooltip === 'undefined') {
        console.error('Bootstrap Tooltip no está disponible');
        return;
    }

    // Inicializar tooltips después de 3 segundos para permitir que terminen las animaciones
    setTimeout(() => {
        window.initializeTooltips();
    }, 3000);

    // CSS SOLO para banderas, con soporte móvil mejorado
    const style = document.createElement('style');
    style.textContent = `
        /* SOLO para tooltips de banderas con clase flag-tooltip */
        .tooltip.flag-tooltip {
            z-index: 99999 !important;
            pointer-events: none !important;
            position: absolute !important;
        }
        
        .tooltip.flag-tooltip.show {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .tooltip.flag-tooltip .tooltip-inner {
            background-color: #000 !important;
            color: #fff !important;
            border-radius: 4px !important;
            padding: 8px 12px !important;
            font-size: 14px !important;
            font-weight: normal !important;
            text-align: center !important;
            white-space: normal !important;
            max-width: 250px !important;
            word-wrap: break-word !important;
            line-height: 1.4 !important;
            min-width: fit-content !important;
        }
        
        .tooltip.flag-tooltip .tooltip-arrow {
            position: absolute !important;
            width: 0 !important;
            height: 0 !important;
            border: 5px solid transparent !important;
        }
        
        .tooltip.flag-tooltip.bs-tooltip-top .tooltip-arrow {
            bottom: 0 !important;
            border-top-color: #000 !important;
        }
        
        /* Banderas con mejor soporte táctil */
        .flag {
            pointer-events: auto !important;
            cursor: pointer !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Mejorar tooltips en móvil */
        @media (max-width: 768px) {
            .tooltip.flag-tooltip .tooltip-inner {
                font-size: 16px !important;
                padding: 10px 14px !important;
                min-height: 40px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                max-width: 220px !important;
                white-space: normal !important;
                line-height: 1.3 !important;
            }
            
            .flag {
                min-width: 44px !important;
                min-height: 44px !important;
                cursor: pointer !important;
            }
        }
        
        /* NO modificar otros tooltips - mantener estilos de Bootstrap originales */
    `;
    document.head.appendChild(style);
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
                flags.forEach((flag, index) => {
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
    animateOnScroll(".clientes-hover", ".flag");
    
    // Inicializar el estado del menú de idiomas y aplicar idioma guardado
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'SPA';
    updateLanguageMenuState(savedLanguage);
    
    // Aplicar el idioma guardado incluyendo el título
    if (savedLanguage !== 'SPA') {
        changeLanguage(savedLanguage);
    } else {
        // Si es español, solo actualizar el título
        updatePageTitle('SPA');
    }
});

// === FUNCIÓN SCROLL TO TOP ===
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    const footer = document.querySelector('.footer');
    
    // Mostrar/ocultar el botón basado en el scroll y detectar footer
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const footerRect = footer.getBoundingClientRect();
        
        // 1. Mostrar u ocultar el botón
        if (scrollPosition > 200) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
            scrollToTopButton.classList.remove('in-footer');
            return;
        }
        
        // 2. Detectar si el footer está visible en pantalla
        const footerVisible = footerRect.top < windowHeight;
        
        if (footerVisible) {
            // Footer visible: mover botón al footer
            scrollToTopButton.classList.add('in-footer');
            if (scrollToTopButton.parentNode !== footer) {
                footer.appendChild(scrollToTopButton);
            }
        } else {
            // Footer no visible: mantener botón fijo
            scrollToTopButton.classList.remove('in-footer');
            if (scrollToTopButton.parentNode !== document.body) {
                document.body.appendChild(scrollToTopButton);
            }
        }
    });
    
    // Función para hacer scroll suave hacia arriba
    scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Scroll suave hacia arriba
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Tracking opcional de Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_to_top', {
                'event_category': 'Navigation',
                'event_label': 'Scroll to Top Button'
            });
        }
    });
});

// === FUNCIONALIDAD BOTONES RECURSOS HUMANOS ===
// JavaScript para efectos de botones y scroll suave en la página de recursos humanos
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de recursos humanos
    const isRecursosHumanosPage = window.location.pathname.includes('recursos_humanos.html');
    
    if (isRecursosHumanosPage) {
        // Seleccionar todos los botones de puestos
        const buttons = document.querySelectorAll('.btn-puesto');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Remover clase 'clicked' de todos los botones
                buttons.forEach(btn => btn.classList.remove('clicked'));
                
                // Agregar clase 'clicked' al botón actual
                this.classList.add('clicked');
                
                // Si es un enlace ancla (como #frontend-section)
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault(); // Prevenir el comportamiento por defecto
                    
                    // Esperar un momento para que se vea el efecto del clic
                    setTimeout(() => {
                        const targetSection = document.querySelector(href);
                        if (targetSection) {
                            // Scroll suave personalizado
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            // Mantener el estado activo por más tiempo
                            setTimeout(() => {
                                this.classList.remove('clicked');
                            }, 2000); // Mantener el estado por 2 segundos
                        }
                    }, 200); // Esperar 200ms antes del scroll
                } else {
                    // Para botones sin enlace ancla, solo mantener el estado visual
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 1500); // Mantener el estado por 1.5 segundos
                }
            });
            
            // Soporte táctil mejorado para móviles
            button.addEventListener('touchstart', function() {
                this.classList.add('clicked');
            });
            
            button.addEventListener('touchend', function() {
                // Mantener el estado un poco más en móviles
                setTimeout(() => {
                    if (!this.getAttribute('href') || !this.getAttribute('href').startsWith('#')) {
                        this.classList.remove('clicked');
                    }
                }, 300);
            });
        });
    }
});

// ==================== PROFILE CARDS FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar profile cards cuando el DOM esté listo
    initProfileCards();
});

function initProfileCards() {
    const profileCards = document.querySelectorAll('.profile-card');
    
    profileCards.forEach(card => {
        const buttons = card.querySelectorAll('.profile-card-buttons button');
        const sections = card.querySelectorAll('.profile-card-section');
        
        const handleButtonClick = (e) => {
            const targetSection = e.target.getAttribute('data-section');
            const section = card.querySelector(targetSection);
            
            // Cambiar estado de la card
            if (targetSection.includes('about')) {
                card.classList.remove('is-active');
            } else {
                card.classList.add('is-active');
            }
            
            card.setAttribute('data-state', targetSection);
            
            // Remover clases activas
            sections.forEach(s => s.classList.remove('is-active'));
            buttons.forEach(b => b.classList.remove('is-active'));
            
            // Agregar clases activas
            e.target.classList.add('is-active');
            if (section) {
                section.classList.add('is-active');
            }
            
            // Tracking para analytics
            if (typeof trackForeignLanguageInteraction === 'function') {
                trackForeignLanguageInteraction('profile_card_tab_click', 'team_member');
            }
        };
        
        // Agregar event listeners a los botones
        buttons.forEach(btn => {
            btn.addEventListener('click', handleButtonClick);
        });
    });
}
