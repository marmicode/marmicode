import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './pragmatic-ui-testing-with-playwright.webp';
import thumbnailUri from './pragmatic-ui-testing-with-playwright-thumbnail.webp';

export const pragmaticUiTestingWithPlaywrightFullCourseFr = createWorkshop({
  id: 'testing-ui-pragmatique-avec-playwright',
  title: 'Formation Testing UI Pragmatique avec Playwright',
  shortTitle: 'Testing UI Pragmatique avec Playwright',
  type: 'full',
  subheading: `Trois jours pour transformer le chaos des tests UI en une stratégie Playwright bien assaisonnée.
Construisez des tests qui résistent au refactoring, aux migrations et au développement assisté par IA.`,
  pictureAltText:
    'Younes en tablier tenant une marmite violette débordante de logos Playwright, Angular, React et Vue dans un décor de cuisine.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/xfv9Dae1vHVE7ZjM7',
  waitlist: {
    url: 'https://forms.gle/jNA7KXRzhXEmFWtM9',
    nextSessionMonth: '2026-10',
  },
  lumaTag: 'playwright',
  description: `
Le testing — et plus particulièrement le testing frontend — est indéniablement dans le top 3 des sujets les plus complexes associés au développement d'applications web.

Face à cette complexité, il est tentant de renoncer, mais à quel prix ?

* Certes, il est possible de développer une application sans tests UI, mais est-ce réellement plus rapide ?
* Qu'advient-il de la maintenabilité du code quelques mois — ou à peine quelques semaines — plus tard ?
* Pourrons-nous refactoriser l'application et la déployer régulièrement en toute sérénité au fur et à mesure qu'elle se complexifie et qu'elle vieillit entre nos mains ?
* Qu'en est-il des tests end-to-end ? Sont-ils suffisants ?

Cette formation présente à travers des exercices pratiques des **techniques pragmatiques de testing avec Playwright**. Vous y découvrirez également comment écrire des tests **compréhensibles, maintenables et — surtout — rentables**.

Vous apprendrez :

* à implémenter différents types de test pour vos applications **Angular, React, VueJS ou sans framework avec Playwright**,
* à implémenter des tests **maintenables et human-readable**,
* à intégrer **Playwright avec votre agent IA**,
* à choisir le **meilleur type de tests en fonction du contexte**,
* à découpler les tests du code afin de **réduire les coûts de testing et de maintenance**,
* à tester les **interactions réseau**,
* à choisir **le bon périmètre** pour vos tests,
* comment et quand utiliser des **Test Harnesses**,
* comment et quand utiliser le **Component Testing de Playwright**,
* à adopter une **stratégie de testing pragmatique et rentable** grâce à de nombreuses bonnes pratiques et astuces.

Que vous écriviez les tests vous-même ou que vos agents IA le fassent, vous aurez besoin des instincts pour distinguer ceux qui ont du sens de ceux qui vous ralentissent — et d'une stratégie de test claire pour guider votre équipe et vos outils.

Petit groupe, beaucoup de pratique, et du coaching direct pour appliquer chaque technique à votre propre codebase.

**Pas de dogme. Pas de solution miracle.** Trois jours de techniques pratiques et éprouvées pour livrer vos interfaces en toute confiance.
`,
  offer: {
    type: 'early-bird',
    price: 970,
    originalPrice: 1270,
  },
  language: 'fr',
  requiredSkills: [
    `Connaissances en développement Web : JavaScript & TypeScript`,
    `Curiosité pour les technologies Web`,
    `Fondamentaux Git (ex. : cloner, réinitialiser les changements locaux, changer de branche)`,
  ],
  benefits: [
    {
      icon: 'language',
      title: 'Tests UI Framework-Agnostic',
      description:
        'Testez vos applications Angular, React, Vue ou sans framework avec la même boîte à outils Playwright.',
    },
    {
      icon: 'visibility',
      title: 'Tests Lisibles et Maintenables',
      description:
        "Écrivez des tests qui décrivent le comportement, pas des détails d'implémentation, et qui résistent au refactoring.",
    },
    {
      icon: 'smart_toy',
      title: 'Tests Assistés par IA',
      description:
        'Connectez Playwright à votre agent IA pour la reproduction, la spécification et la correction de bugs.',
    },
    {
      icon: 'hub',
      title: 'Réseau, Auth & Maîtrise du Temps',
      description:
        "Maîtrisez l'interception de requêtes, le setup d'auth et l'API Clock de Playwright pour des tests rapides et fiables.",
    },
    {
      icon: 'science',
      title: 'Test Harnesses & Component Testing',
      description:
        'Apprenez quand et comment utiliser les Gloves, les Test Harnesses et Playwright Component Testing.',
    },
    {
      icon: 'photo_camera',
      title: 'Tests de Régression Visuelle',
      description: 'Détectez les régressions visuelles sans douleur.',
    },
    {
      icon: 'restaurant',
      title: 'Buffet de Tests Pragmatiques',
      description:
        "Profitez d'un buffet de conseils et de techniques pour adopter une stratégie de test UI scalable et rentable.",
    },
  ],
  faqs: [
    {
      question: "À qui s'adresse cette formation ?",
      answer:
        'Aux développeurs web (Angular, React, Vue ou sans framework) souhaitant écrire des tests UI efficaces, lisibles et rentables. Aux lead developers et tech leads en charge de cadrer la stratégie de testing au sein de leur équipe. Aux architectes et CTOs cherchant à industrialiser le testing frontend sans sacrifier la vélocité de livraison. Aux équipes confrontées à des tests fragiles ou ingérables et cherchant une approche structurée, scalable et adaptée au développement assisté par IA.',
    },
    {
      question: 'Quel niveau est requis ?',
      answer:
        "Vous devez être à l'aise avec les fondamentaux de JavaScript et TypeScript. Aucune expérience préalable de Playwright ou du testing n'est nécessaire — on part de zéro.",
    },
    {
      question: 'Quels outils sont nécessaires ?',
      answer:
        "Un ordinateur avec accès Internet, micro, webcam, navigateur à jour et droits d'installation. Les instructions de setup sont envoyées quelques jours avant la formation.",
    },
    {
      question: "C'est vraiment pratique ?",
      answer:
        'Très. Vous alternerez entre courtes sessions théoriques et exercices pratiques sur un cas fil rouge pendant trois jours. Les petits groupes garantissent un accompagnement direct et personnalisé.',
    },
    {
      question: 'Dois-je utiliser un framework frontend particulier ?',
      answer:
        "Non. Les techniques s'appliquent à Angular, React, Vue et aux applications sans framework. Les exercices se concentrent sur des patterns Playwright transposables d'une stack à l'autre.",
    },
    {
      question: 'Ma société peut-elle financer cette formation ?',
      answer:
        'Si vous êtes en France, cette formation est éligible au financement OPCO. Contactez-moi pour un devis et les modalités administratives.',
    },
    {
      question:
        'Quelle différence entre réserver une place et demander une session sur mesure ?',
      answer:
        '"Réserver une Place" vous inscrit à une session planifiée. "Session sur Mesure" s\'adresse aux entreprises qui souhaitent une formation privée — avec la possibilité d\'adapter le contenu, la durée ou les priorités.',
    },
    {
      question: 'Y a-t-il une garantie satisfait ou remboursé ?',
      answer:
        'Si la formation ne répond pas à vos attentes, contactez-moi dans les 7 jours et nous trouverons une solution ensemble.',
    },
  ],
  agenda: {
    sections: [
      {
        title: '👨🏻‍🏫 Introduction au Testing',
        items: [
          'Pourquoi tester ?',
          'Les différents types de tests.',
          'Les stratégies de testing : cornet de glace, pyramide vs. rayon de miel.',
        ],
      },
      {
        title: '👨🏻‍🏫 Playwright Core Features',
        items: [
          'Developer eXperience.',
          'Rapidité.',
          'Debuggabilité.',
          'Retry-ability.',
          'Cohérence et stabilité.',
          'AI-Assisted Testing.',
        ],
      },
      {
        title: '👨🏻‍🏫 Premier Test',
        items: [
          'Mise en place de Playwright.',
          'Mise en place de Playwright avec Nx.',
        ],
      },
      {
        title: '💻 Exercices pratiques : premier test',
        items: ['Implémenter et lancer un premier test Playwright.'],
      },
      {
        title: '👨🏻‍🏫 Fondamentaux Playwright',
        items: ['Les fixtures.', 'Les assertions.', 'Organisation des tests.'],
      },
      {
        title:
          '💻 Exercices pratiques : interagir avec le DOM et les formulaires',
        items: ['Interagir avec le DOM.', 'Interagir avec les formulaires.'],
      },
      {
        title: '👨🏻‍🏫 Locators',
        items: [
          'La philosophie des locators : web-first, auto-waiting, retry-ability.',
          'Locators recommandés et priorité : `getByRole`, `getByLabel`, `getByText` & co.',
          'Filtrer, chaîner et résoudre les ambiguïtés (`filter`, `nth`, strict mode).',
          "Accessibilité et testabilité : pourquoi `getByRole` est plus qu'un détail technique.",
        ],
      },
      {
        title: '💻 Exercices pratiques : locators sémantiques',
        items: ['Réécrire des tests CSS-driven en locators sémantiques.'],
      },
      {
        title: '👨🏻‍🏫 VSCode Extension & Recording',
        items: [
          "Installation et exécution des tests depuis l'IDE.",
          "Aide à l'implémentation des tests et enregistrement.",
        ],
      },
      {
        title: '💻 Exercices pratiques : enregistrement',
        items: ['Enregistrer un premier test.'],
      },
      {
        title: '👨🏻‍🏫 Debugging',
        items: [
          "UI Mode et Trace Viewer : l'expérience de développement et de debug.",
          "Anatomie d'une trace : actions, snapshots DOM, network, console.",
          '`page.pause()`, Inspector et breakpoints VSCode.',
          'Diagnostiquer la "flakiness" via les retries et les traces.',
        ],
      },
      {
        title: '💻 Exercices pratiques : diagnostiquer un test flaky',
        items: ['Diagnostiquer un test flaky à partir de sa trace.'],
      },
      {
        title: '👨🏻‍🏫 Playwright Network Testing',
        items: [
          'Avantages et inconvénients des différentes techniques.',
          'Interception de requêtes vs. sandbox.',
        ],
      },
      {
        title: '💻 Exercices pratiques : Network Testing',
        items: ['Intercepter les requêtes.', 'Utiliser une sandbox.'],
      },
      {
        title: '👨🏻‍🏫 Authentication',
        items: [
          'Le coût des connexions répétées.',
          'Le pattern `auth.setup.ts` avec project dependencies.',
          'Authentification via UI vs API : trade-offs et scénarios multi-utilisateurs.',
        ],
      },
      {
        title: "💻 Exercices pratiques : setup d'authentification",
        items: ["Mettre en place un setup d'authentification réutilisable."],
      },
      {
        title: '👨🏻‍🏫 Retour vers le futur',
        items: [
          "Fake timers et l'API Clock de Playwright.",
          "Cas d'usage : debounce, polling, animations, dates.",
          'Tester sans attendre.',
        ],
      },
      {
        title: '💻 Exercices pratiques : jouer avec le timer',
        items: ['Jouer avec le timer.'],
      },
      {
        title: '👨🏻‍🏫 DOM Distancing & Test Harnesses',
        items: [
          'Accessibilité et testabilité.',
          'Page objects : avantages et limites.',
          "L'histoire des Test Harnesses.",
          'Gloves & Test Harnesses : comment cela fonctionne.',
        ],
      },
      {
        title: '💻 Exercices pratiques : Test Harnesses',
        items: [
          'Utiliser les test harnesses.',
          'Implémenter des test harnesses.',
        ],
      },
      {
        title: '👨🏻‍🏫 Playwright Component Testing',
        items: [
          'Briser les frontières de l\'"isolated testing" avec Playwright Component Testing.',
        ],
      },
      {
        title: '💻 Exercices pratiques : Playwright Component Testing',
        items: [
          'Isoler et tester un composant avec Playwright.',
          'Réutiliser le test harness.',
        ],
      },
      {
        title: '👨🏻‍🏫 Tester les Interactions',
        items: ['Test Doubles : Dummies, Stubs, Spies, Mocks & Fakes.'],
      },
      {
        title: '💻 Exercices pratiques : Test Doubles',
        items: [
          '"Overrider" les dépendances avec l\'injection de dépendance et les fakes.',
          'Tester la communication à base de props, inputs & outputs.',
        ],
      },
      {
        title: '👨🏻‍🏫 Visual Regression Testing',
        items: [
          'Tester la présentation.',
          'Détecter les régressions visuelles.',
        ],
      },
      {
        title: '💻 Exercices pratiques : régression visuelle',
        items: [
          "Détecter une régression visuelle sur un composant avec masking d'éléments dynamiques.",
        ],
      },
      {
        title: '👨🏻‍🏫 AI-Assisted Testing',
        items: [
          "`playwright-cli` vs Playwright MCP : que choisir pour permettre à votre agent IA d'utiliser Playwright.",
          "Screencast annoté : faire produire à l'agent une vidéo de preuve, avec annotations des éléments observés sur la page.",
          'La boucle agent → test : exploration, reproduction, spécification, correction.',
        ],
      },
      {
        title: '💻 Exercices pratiques : AI-Assisted Testing',
        items: [
          "Faire reproduire un bug par l'agent et générer un screencast annoté qui l'explique.",
          'Faire générer un test qui échoue à partir de cette reproduction.',
          "Faire corriger le bug par l'agent en s'appuyant sur le test précédent.",
        ],
      },
      {
        title: '👨🏻‍🏫 Testing Pipeline',
        items: [
          'Configuration de la CI.',
          'Reporters.',
          'Parallélisation et sharding.',
        ],
      },
      {
        title: '👨🏻‍🏫 Architecture, Maintenabilité & Scaling',
        items: [
          'Comment lutter contre la "flakiness".',
          'Comment concevoir une stratégie de testing maintenable et "scalable".',
        ],
      },
    ],
  },
});
