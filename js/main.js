"use strict";

const menuButton = document.querySelector(".menu-toggle");
const menuLabel = menuButton.querySelector(".menu-label");
const navigation = document.querySelector("#navigation");
const smallScreen = window.matchMedia("(width < 64rem)");
const languageButton = document.querySelector(".language-toggle");
const languageMenu = document.querySelector(".language-menu");
const languageChoices = document.querySelectorAll("[data-language]");
const themeButton = document.querySelector(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const translatedElements = document.querySelectorAll("[data-i18n]");
const translatedLabels = document.querySelectorAll("[data-i18n-label]");
const translations = {
  en: {
    ...Object.fromEntries([
      ...[...translatedElements].map((element) => [element.dataset.i18n, element.textContent]),
      ...[...translatedLabels].map((element) => [element.dataset.i18nLabel, element.getAttribute("aria-label")]),
    ]),
    nightMode: "Night mode",
    menuOpen: "Menu",
    menuClose: "Close",
    switchLanguage: "Choose language",
    navigation: "Main navigation",
    description: "Personal portfolio, projects, and background.",
    emailCopied: "Email copied.",
    emailSelected: "Email selected. Use your device’s copy option.",
  },
  es: {
    portfolio: "Portafolio",
    skip: "Saltar al contenido",
    name: "Angel Gallardo",
    aboutNav: "Sobre mí",
    skillsNav: "Habilidades",
    projects: "Proyectos",
    background: "Formación",
    contact: "Contacto",
    role: "Desarrollador de aplicaciones de escritorio y full-stack",
    intro: "Desarrollo aplicaciones de escritorio y full-stack, aprendo nuevas tecnologías y mejoro mis habilidades con cada proyecto.",
    viewProjects: "Ver proyectos",
    downloadCV: "Descargar CV",
    about: "Sobre mí",
    aboutCopy: "Estudio Ingeniería en Tecnologías de la Información e Innovación Digital en la Universidad Politécnica de Sinaloa. A través de mis materias y proyectos personales, pongo en práctica lo que aprendo sobre programación, bases de datos y diseño de interfaces.",
    skills: "Habilidades técnicas",
    programming: "Lenguajes de programación",
    frontendDesktop: "Frontend y escritorio",
    backendData: "Backend y datos",
    toolsSystems: "Herramientas y sistemas",
    networking: "Fundamentos de redes",
    languages: "Idiomas",
    languagesCopy: "Inglés — Fluido (TOEFL ITP: 630)",
    spanishLevel: "Español — Nativo",
    tomojiCopy: "Una app de compañeros de escritorio inspirada en Shimeji. Importa personajes, personaliza sus animaciones y comportamiento, e interactúa con ellos en tu escritorio.",
    metricsCopy: "Un panel de finanzas personales para registrar ingresos, gastos y activos. Visualiza tendencias mensuales, revisa tus gastos y lleva el control de tu patrimonio.",
    playlixCopy: "Un lienzo visual para playlists de Spotify. Desplázate, haz zoom, organiza portadas de álbumes y exporta tus diseños en lugar de recorrer una lista de canciones.",
    playlistlyCopy: "Convierte playlists de YouTube en un lienzo con zoom. Carga videos desde el enlace de una playlist, busca y organiza sus miniaturas, y guarda o exporta tus diseños.",
    visitSite: "Visitar sitio",
    viewSource: "Ver código en GitHub",
    education: "Educación",
    degree: "Ingeniería en Tecnologías de la Información e Innovación Digital",
    graduation: "Graduación prevista: 2028 · Promedio: 9.73/10",
    coursework: "Materias: Estructuras de Datos, Bases de Datos, Programación Orientada a Objetos.",
    highSchool: "Bachillerato · 2025",
    experience: "Experiencia",
    freelance: "Soporte web freelance · 2026",
    freelanceCopy: "Actualizaciones pagadas de un sitio web mediante un constructor de sitios, con asesoría para que el personal pudiera mantenerlo de forma independiente.",
    activities: "Actividades",
    robotics: "Robótica FIRST Tech Challenge · Constructor",
    volleyball: "Equipo escolar de voleibol",
    certifications: "Certificaciones y reconocimientos",
    englishCertification: "TOEFL ITP · Puntaje: 630",
    cv: "Currículum vitae",
    email: "Correo",
    copyEmail: "Copiar correo electrónico",
    emailCopied: "Correo copiado.",
    emailSelected: "Correo seleccionado. Usa la opción de copiar de tu dispositivo.",
    backTop: "Volver al inicio",
    nightMode: "Modo nocturno",
    menuOpen: "Menú",
    menuClose: "Cerrar",
    switchLanguage: "Elegir idioma",
    navigation: "Navegación principal",
    description: "Portafolio personal, proyectos y formación.",
  },
  fr: {
    portfolio: "Portfolio",
    skip: "Aller au contenu",
    name: "Angel Gallardo",
    aboutNav: "À propos",
    skillsNav: "Compétences",
    projects: "Projets",
    background: "Parcours",
    contact: "Contact",
    role: "Développeur d’applications de bureau et full-stack",
    intro: "Je développe des applications de bureau et full-stack, découvre de nouvelles technologies et améliore mes compétences à chaque projet.",
    viewProjects: "Voir les projets",
    downloadCV: "Télécharger le CV",
    about: "À propos de moi",
    aboutCopy: "J’étudie l’ingénierie des technologies de l’information et de l’innovation numérique à l’Universidad Politécnica de Sinaloa. Mes cours et mes projets personnels me permettent de mettre en pratique ce que j’apprends en programmation, bases de données et conception d’interfaces.",
    skills: "Compétences techniques",
    programming: "Langages de programmation",
    frontendDesktop: "Frontend et applications de bureau",
    backendData: "Backend et données",
    toolsSystems: "Outils et systèmes",
    networking: "Notions fondamentales des réseaux",
    languages: "Langues",
    languagesCopy: "Anglais — Courant (TOEFL ITP : 630)",
    spanishLevel: "Espagnol — Langue maternelle",
    tomojiCopy: "Une application de compagnons de bureau inspirée de Shimeji. Importez des personnages, personnalisez leurs animations et leur comportement, et interagissez avec eux sur votre bureau.",
    metricsCopy: "Un tableau de bord de finances personnelles pour suivre les revenus, les dépenses et les actifs. Visualisez les tendances mensuelles, consultez vos dépenses et suivez votre patrimoine net.",
    playlixCopy: "Un espace visuel pour les playlists Spotify. Déplacez-vous, zoomez, organisez les pochettes d’albums et exportez vos dispositions au lieu de parcourir une simple liste de titres.",
    playlistlyCopy: "Transformez vos playlists YouTube en un espace visuel avec zoom. Chargez les vidéos à partir du lien d’une playlist, recherchez et organisez leurs miniatures, puis enregistrez ou exportez vos dispositions.",
    visitSite: "Visiter le site",
    viewSource: "Voir le code sur GitHub",
    education: "Formation",
    degree: "Ingénierie des technologies de l’information et de l’innovation numérique",
    graduation: "Diplôme prévu en 2028 · Moyenne : 9,73/10",
    coursework: "Cours : structures de données, bases de données, programmation orientée objet.",
    highSchool: "Diplôme de fin d’études secondaires · 2025",
    experience: "Expérience",
    freelance: "Maintenance de sites web en freelance · 2026",
    freelanceCopy: "Mises à jour rémunérées d’un site à l’aide d’un outil de création de sites web, avec des conseils pour permettre au personnel de le maintenir de manière autonome.",
    activities: "Activités",
    robotics: "Robotique FIRST Tech Challenge · Construction du robot",
    volleyball: "Équipe scolaire de volley-ball",
    certifications: "Certifications et distinctions",
    englishCertification: "TOEFL ITP · Score : 630",
    cv: "Curriculum vitæ",
    email: "E-mail",
    copyEmail: "Copier l’adresse e-mail",
    emailCopied: "Adresse e-mail copiée.",
    emailSelected: "Adresse e-mail sélectionnée. Utilisez l’option de copie de votre appareil.",
    backTop: "Retour en haut",
    nightMode: "Mode nuit",
    menuOpen: "Menu",
    menuClose: "Fermer",
    switchLanguage: "Choisir la langue",
    navigation: "Navigation principale",
    description: "Portfolio personnel, projets et parcours.",
  },
};
let language = "en";
let themePreference = null;
const emailAddress = document.querySelector("#footer-email");
const copyStatus = document.querySelector(".copy-status");
let copyStatusKey = null;
let copyStatusTimer;

function updateThemeLabel() {
  const label = translations[language].nightMode;
  themeButton.setAttribute("aria-label", label);
  themeButton.title = label;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
}

function updateMenuLabel() {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuLabel.textContent = translations[language][open ? "menuClose" : "menuOpen"];
}

function setLanguage(nextLanguage) {
  language = Object.hasOwn(translations, nextLanguage) ? nextLanguage : "en";
  document.documentElement.lang = language;

  translatedElements.forEach((element) => {
    element.textContent = translations[language][element.dataset.i18n];
  });

  translatedLabels.forEach((element) => {
    const label = translations[language][element.dataset.i18nLabel];
    element.setAttribute("aria-label", label);
    element.title = label;
  });

  languageButton.lang = language;
  languageButton.setAttribute("aria-label", translations[language].switchLanguage);
  languageButton.title = languageButton.getAttribute("aria-label");
  languageChoices.forEach((choice) => {
    choice.setAttribute("aria-pressed", String(choice.dataset.language === language));
  });
  navigation.setAttribute("aria-label", translations[language].navigation);
  document.querySelector('meta[name="description"]').content = translations[language].description;
  updateMenuLabel();
  updateThemeLabel();
  if (copyStatusKey) copyStatus.textContent = translations[language][copyStatusKey];

  try {
    localStorage.setItem("portfolio-language", language);
  } catch {}
}

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  updateMenuLabel();
  navigation.hidden = smallScreen.matches && !open;
}

function syncNavigation() {
  const focusInMenu = navigation.contains(document.activeElement);
  const focusOnButton = document.activeElement === menuButton;

  menuButton.hidden = !smallScreen.matches;
  setMenu(false);

  if (smallScreen.matches && focusInMenu) menuButton.focus();
  if (!smallScreen.matches && focusOnButton) navigation.querySelector("a").focus();
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (smallScreen.matches && event.target.closest("a")) {
    setMenu(false);
    menuButton.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".header-inner") && smallScreen.matches) {
    if (navigation.contains(document.activeElement)) menuButton.focus();
    setMenu(false);
  }
});

smallScreen.addEventListener("change", syncNavigation);
const dropdownMenus = document.querySelectorAll(".cv-menu, .language-menu");

dropdownMenus.forEach((menu) => {
  menu.addEventListener("toggle", () => {
    if (menu.open) dropdownMenus.forEach((other) => { if (other !== menu) other.open = false; });
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a, [data-language]")) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
});

document.addEventListener("click", (event) => {
  dropdownMenus.forEach((menu) => { if (!menu.contains(event.target)) menu.open = false; });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    dropdownMenus.forEach((menu) => {
      if (menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
  }
});

languageChoices.forEach((choice) => {
  choice.addEventListener("click", () => setLanguage(choice.dataset.language));
});

document.querySelector(".email-copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailAddress.textContent.trim());
    copyStatusKey = "emailCopied";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(emailAddress);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    emailAddress.scrollIntoView({ block: "nearest" });
    copyStatusKey = "emailSelected";
  }
  copyStatus.textContent = translations[language][copyStatusKey];
  clearTimeout(copyStatusTimer);
  copyStatusTimer = setTimeout(() => {
    copyStatus.textContent = "";
    copyStatusKey = null;
  }, copyStatusKey === "emailCopied" ? 2200 : 5000);
});

themeButton.addEventListener("click", () => {
  themePreference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(themePreference);
  try {
    localStorage.setItem("portfolio-theme", themePreference);
  } catch {}
});

systemTheme.addEventListener("change", () => {
  if (!themePreference) applyTheme(systemTheme.matches ? "dark" : "light");
});

let savedLanguage = "en";
try {
  savedLanguage = localStorage.getItem("portfolio-language") || "en";
} catch {}

try {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark" || savedTheme === "light") themePreference = savedTheme;
} catch {}

applyTheme(themePreference || (systemTheme.matches ? "dark" : "light"));
setLanguage(savedLanguage);
languageMenu.hidden = false;
themeButton.hidden = false;
syncNavigation();
