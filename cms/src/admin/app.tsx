import MenuLogo from "../extensions/BC_Logo.png";

export default {
  config: {
    locales: [
      'en'
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    notificiations: {
      releases: false
    },
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "BCMI Dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Mines Digital Services",
        "app.components.HomePage.welcome": "Welcome to the BCMI Content Management System!",
        "app.components.HomePage.welcome.again": "Welcome back to the BCMI Content Management System 👋",
        "app.components.HomePage.welcomeBlock.content": "To edit content select 'Content Manager' from the left menu.",
        "app.components.HomePage.welcomeBlock.content.again": "To edit content select 'Content Manager' from the left menu.",
      }
    },
    menu: { // Replace the Strapi logo in the main navigation
      logo: MenuLogo,
    },
  },
  
  bootstrap(app) {
    console.log(app);
  },
};
