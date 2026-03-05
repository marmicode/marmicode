import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './pragmatic-angular-testing.webp';
import thumbnailUri from './pragmatic-angular-testing-thumbnail.webp';
import { PRAGMATIC_ANGULAR_TESTING_FULL_COURSE_FR_ID } from './pragmatic-angular-testing-full-course.shared';

export const pragmaticAngularTestingFullCourseFr = createWorkshop({
  id: PRAGMATIC_ANGULAR_TESTING_FULL_COURSE_FR_ID,
  title: 'Formation Test Angular Pragmatique',
  shortTitle: 'Test Angular Pragmatique',
  type: 'full',
  subheading: `Trois jours pour transformer le chaos des tests en une stratégie bien assaisonnée. Construisez des tests qui résistent au refactoring, aux migrations et aux deadlines.`,
  pictureAltText:
    'Younes en tablier tenant une marmite violette débordante de logos Angular, Vitest, Playwright et Testronaut dans un décor de cuisine.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/FmSfiVpi7H21twwr9',
  lumaTag: 'angular-testing',
  description: `
Il y a deux façons de garder un produit stable :
**ne jamais y toucher — ou mijoter une solide stratégie de test.**

Comment tient la vôtre ?

* Un refactor et vos tests débordent de la casserole ?
* Maintenir vos mocks vous semble similaire à bricoler des fusées avec des bouts de ficelle ?
* Toujours à courir après 100 % de code coverage pendant que les bugs passent entre les mailles du filet ?
* Les tests end-to-end avaient l'air appétissants — jusqu'à ce que la flakiness et la lenteur causent une indigestion ?
* À l'approche de la release, vous sautez les tests et servez le plat cru — en croisant les doigts pour que personne ne tombe malade ?

Si ça vous parle, cette formation est votre sortie de secours.

On commence par un tour au marché pour les ingrédients clés : **Fakes**, **Object Mothers**, **Gloves**, **Vitest**, **Testronaut** pour le Playwright Component Testing, **Playwright** pour les tests end-to-end, et **WallabyJS** pour le TDD.

Puis, de retour en cuisine, on prépare un menu de tests complet et facile à maintenir, qui mûrit sur trois jours. Vous apprendrez à :

* Écrire des tests maintenables et lisibles qui **résistent au refactoring et aux migrations**.
* Préparer votre suite pour l'Angular de demain : **Zoneless-ready** et **Signal-friendly**.
* Maîtriser toutes les saveurs du **TDD** — du Progressif au "Timeboxed".
* Tester le **code asynchrone** et les "**effects**" avec confiance.
* Construire et utiliser vos propres **test harnesses** et **Gloves** pour une interaction UI résiliente.
* Détecter les **régressions visuelles** avant vos utilisateurs.
* Écrire des **tests end-to-end rapides et fiables avec Playwright** — et savoir exactement quand choisir entre e2e et component tests.
* Concevoir une **stratégie de test pragmatique** qui passe à l'échelle, et qui rapporte sur la durée — pas juste écrire de meilleurs tests.

Au fil de ces trois jours, vous n'apprendrez pas que des recettes — vous affinerez vos instincts de test, remettrez en question vos habitudes, et repartirez avec une culture de test que vous pourrez faire grandir.

Que vous écriviez les tests vous-même ou que vos agents IA le fassent, vous aurez besoin des instincts pour distinguer ceux qui ont du sens de ceux qui vous ralentissent — et d'une stratégie de test claire pour guider votre équipe et vos outils.

Petit groupe, beaucoup de pratique, et du coaching direct pour appliquer chaque technique à votre propre codebase.

**Pas de dogme. Pas de solution miracle.** Trois jours de techniques pratiques et éprouvées pour cuisiner en toute confiance — et servir du code qui reste frais bien après la formation.
`,
  offer: {
    type: 'early-bird',
    price: 970,
    originalPrice: 1270,
  },
  language: 'fr',
  requiredSkills: [
    `Concepts fondamentaux d'Angular (ex. : composants, inputs/outputs, services, signals, etc.)`,
    `Fondamentaux TypeScript (ex. : types, interfaces, génériques basiques)`,
    `Fondamentaux Git (ex. : cloner, réinitialiser les changements locaux, changer de branche)`,
  ],
  benefits: [
    {
      icon: 'psychology',
      title: 'Test-Driven Development',
      description: 'De la spécification au refactoring, apprenez à penser TDD.',
    },
    {
      icon: 'build',
      title: 'Outils de Test Modernes',
      description:
        'Maîtrisez des outils modernes comme Vitest et Playwright Component Testing avec Testronaut.',
    },
    {
      icon: 'visibility',
      title: 'Tests Lisibles et Maintenables',
      description:
        "Tests qui décrivent le comportement, pas des détails d'implémentation.",
    },
    {
      icon: 'rocket',
      title: "Des Tests à l'Épreuve du Temps",
      description:
        'Concevez des tests qui résistent aux migrations et au refactoring avec un minimum de changements.',
    },
    {
      icon: 'theater_comedy',
      title: 'Le Mocking en toute Simplicité',
      description:
        'Maîtrisez les Fakes et les Object Mothers pour simplifier le "mocking" et éviter les pièges habituels.',
    },
    {
      icon: 'language',
      title: 'Tests End-to-End',
      description:
        "Écrivez des tests end-to-end fiables avec Playwright et sachez comment choisir l'outil approprié.",
    },
    {
      icon: 'restaurant',
      title: 'Buffet de Tests Pragmatiques',
      description:
        "Profitez d'un buffet de conseils et de techniques pour adopter une stratégie de test pragmatique.",
    },
  ],
  faqs: [
    {
      question: "À qui s'adresse cette formation ?",
      answer:
        "Aux développeurs Angular qui écrivent déjà des tests — ou qui veulent s'y mettre — et qui souhaitent améliorer leurs pratiques de test. Que vous soyez confrontés à des tests instables, du code difficile à tester, ou une absence de stratégie de test — cette formation est faite pour vous.",
    },
    {
      question: 'Quel niveau est requis ?',
      answer:
        "Vous devez être à l'aise avec les fondamentaux d'Angular (composants, services, inputs/outputs), les bases de TypeScript, et Git. Aucune expérience préalable en testing n'est nécessaire — on part de zéro.",
    },
    {
      question: 'Quels outils sont nécessaires ?',
      answer:
        'Un ordinateur portable avec Node.js, Git, et votre IDE préféré. Les instructions de setup sont envoyées quelques jours avant la formation.',
    },
    {
      question: "C'est vraiment pratique ?",
      answer:
        'Très. Vous alternerez entre courtes sessions théoriques et exercices pratiques pendant trois jours. Les petits groupes garantissent un accompagnement direct et personnalisé.',
    },
    {
      question: 'Et si mon équipe utilise Jest ou Karma ?',
      answer:
        "Les principes et stratégies enseignés s'appliquent quel que soit votre test runner. Cela dit, on utilise Vitest dans les exercices — et vous risquez de ne plus vouloir revenir en arrière.",
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
        title: '👨🏻‍🏫 Introduction aux Tests',
        items: [
          'Pourquoi tester ?',
          "Qu'attend-on d'un test ?",
          'Le biais de perception du temps de développement.',
          'Les différents types de tests : Narrow & Wide vs Unit & Integration.',
        ],
      },
      {
        title: '👨🏻‍🏫 Vitest',
        items: [
          'Pourquoi Vitest plutôt que Karma, Jest ou Web Test Runner.',
          'Avantages et inconvénients.',
        ],
      },
      {
        title: '💻 Exercices pratiques : premiers tests',
        items: [
          'Test-Driven Development : origine et bénéfices.',
          'TDD progressif.',
          'Conseils et astuces pour des tests précis et maintenables.',
          'Object Mothers.',
        ],
      },
      {
        title: '💻 Exercices pratiques : tester un service Angular',
        items: [
          "Tester un service Angular avec l'approche TDD progressif.",
          'Debug avec Vitest.',
        ],
      },
      {
        title: '👨🏻‍🏫 TDD timeboxé et TCR',
        items: [
          'Refactor vs. Restructure : retour aux définitions.',
          'TDD timeboxé.',
          'Limbo.',
          'TCR : Test && Commit || Revert.',
        ],
      },
      {
        title: '👨🏻‍🏫 Tests asynchrones',
        items: [
          'Tests asynchrones.',
          'Tester les observables.',
          'Tester les "signals" et les "effects".',
          '"Fake timers".',
        ],
      },
      {
        title: '💻 Exercices pratiques : tests asynchrones',
        items: ['Pratique des tests asynchrones.'],
      },
      {
        title: '👨🏻‍🏫 Tests de composants',
        items: [
          'Tester un composant.',
          'Les différents types de tests de composants : isolated vs. shallow vs. integration.',
          'Interagir avec le DOM.',
        ],
      },
      {
        title: '💻 Exercices pratiques : tests de composants',
        items: [
          'Tests "isolated" de composants.',
          'Tests "shallow" de composants.',
          'Tests d\'"intégration" de composants.',
        ],
      },
      {
        title: '👨🏻‍🏫 Test Doubles et "Mocking"',
        items: [
          'Mocks vs Dummies vs Spies vs Stubs vs Fakes.',
          'Fake it till you Mock it!',
          'Tests "type-safe".',
          'Contract testing de "fakes".',
        ],
      },
      {
        title: '💻 Exercices pratiques : Test Doubles et "Mocking"',
        items: ['Pratique des Test Doubles.'],
      },
      {
        title: '💻 Exercices pratiques : tests de composants (suite)',
        items: [
          'Tester la communication via Inputs et Outputs.',
          'Interagir avec les formulaires.',
        ],
      },
      {
        title: '👨🏻‍🏫 Angular Testing Library vs. Vitest Browser Mode',
        items: ['Tests DOM résilients.'],
      },
      {
        title:
          '💻 Exercices pratiques : Angular Testing Library vs. Vitest Browser Mode',
        items: [
          'Pratique Angular Testing Library.',
          'Pratique Vitest Browser Mode.',
        ],
      },
      {
        title: '👨🏻‍🏫 Gloves et Angular CDK Test Harness',
        items: [
          'Gloves.',
          "L'histoire derrière Angular CDK Test Harness.",
          "Quand et comment l'utiliser.",
        ],
      },
      {
        title: '💻 Exercices pratiques : Test Harness',
        items: ['Utiliser un test harness.', 'Implémenter un test harness.'],
      },
      {
        title: '👨🏻‍🏫 Tests end-to-end avec Playwright',
        items: [
          'Quand utiliser les tests e2e vs. les tests de composants.',
          'Écrire des tests end-to-end rapides et fiables avec Playwright.',
        ],
      },
      {
        title: '💻 Exercices pratiques : tests end-to-end avec Playwright',
        items: ['Pratique des tests end-to-end avec Playwright.'],
      },
      {
        title: '👨🏻‍🏫 Playwright Component Testing avec Testronaut',
        items: [
          'Au-delà des limites du testing sans navigateur.',
          'Playwright Component Testing avec Testronaut.',
          'Debug avec Playwright et Testronaut.',
        ],
      },
      {
        title:
          '💻 Exercices pratiques : Playwright Component Testing avec Testronaut',
        items: ['Pratique Playwright Component Testing avec Testronaut.'],
      },
      {
        title: '👨🏻‍🏫 Tests de régression visuelle',
        items: [
          'Tester la présentation.',
          'Tests de régression visuelle : magie, pièges, recommandations et stratégies.',
        ],
      },
      {
        title: '💻 Exercices pratiques : tests de régression visuelle',
        items: [
          'Détecter les régressions visuelles avec Playwright et Testronaut.',
        ],
      },
      {
        title: '👨🏻‍🏫 Définir une stratégie de test pragmatique',
        items: [
          "Objectifs d'une stratégie de test.",
          'Choisir quoi tester et comment.',
          'Évaluer une stratégie de test.',
          'Introduire les tests dans une base de code legacy.',
        ],
      },
    ],
  },
});
