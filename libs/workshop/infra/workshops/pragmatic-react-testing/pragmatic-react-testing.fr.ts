import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './pragmatic-react-testing.webp';
import thumbnailUri from './pragmatic-react-testing-thumbnail.webp';

export const pragmaticReactTestingFullCourseFr = createWorkshop({
  id: 'test-react-pragmatique',
  title: 'Formation Test React Pragmatique',
  shortTitle: 'Test React Pragmatique',
  type: 'full',
  subheading: `Trois jours pour transformer le chaos des tests en une stratégie bien assaisonnée. Construisez des tests qui résistent au refactoring, aux migrations et aux deadlines.`,
  pictureAltText:
    'Younes en tablier tenant une marmite violette débordante de logos React, Vitest, Playwright et Testronaut dans un décor de cuisine.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/csDdUN9A8yS1Q9oq7',
  waitlistUrl: 'https://forms.gle/LeusQt3TnA5vMWa69',
  lumaTag: 'react-testing',
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

On commence par un tour au marché pour les ingrédients clés : **Fakes**, **Object Mothers**, **Gloves**, **Vitest**, **Vitest Browser Mode**, **Testronaut** pour le Playwright Component Testing, **Playwright** pour les tests end-to-end, et **WallabyJS** pour le TDD.

Puis, de retour en cuisine, on prépare un menu de tests complet et facile à maintenir, qui mûrit sur trois jours. Vous apprendrez à :

* Écrire des tests maintenables et lisibles qui **résistent au refactoring et aux migrations**.
* Maîtriser toutes les saveurs du **TDD** — du Progressif au "Timeboxed".
* Tester le **code asynchrone**, les "**effects**" et les **hooks** (comme React Query de Tanstack) avec confiance.
* Construire et utiliser vos propres **Page Objects** et **Gloves** pour une interaction UI résiliente.
* Détecter les **régressions visuelles** avant vos utilisateurs.
* Écrire des **tests end-to-end rapides et fiables avec Playwright** — et savoir exactement quand choisir entre e2e et component tests.
* Concevoir une **stratégie de test pragmatique** qui passe à l'échelle, et qui rapporte sur la durée — pas juste écrire de meilleurs tests.
* Adapter votre stratégie au **développement assisté par IA** — et savoir quand les tests servent de filet de sécurité pour les humains vs. de boucle de feedback pour les agents.
* Faire de votre suite de tests le **harnais le plus solide** d'un développement assisté par IA efficace — et non une taxe supplémentaire.

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
    `Concepts fondamentaux de React (ex. : composants, props, state, hooks, context)`,
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
        'Maîtrisez le meilleur de Vitest, Vitest Browser Mode et Playwright Component Testing avec Testronaut.',
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
    {
      icon: 'smart_toy',
      title: "Stratégie de Test à l'Ère de l'IA",
      description: 'Adaptez votre stratégie au développement assisté par IA.',
    },
  ],
  testimonials: [
    {
      authorName: 'Bastien M.',
      quote:
        'Super formateur, très dynamique et très compétent sur le sujet, merci !',
    },
    {
      authorName: 'Sylvain L.',
      quote:
        "Très intéressant, Younes connaît parfaitement son sujet et anime très bien la formation. J'ai beaucoup apprécié",
    },
    {
      authorName: 'Benoit B.',
      quote: 'Excellent formateur - passionné par le sujet.',
    },
  ],
  faqs: [
    {
      question: "À qui s'adresse cette formation ?",
      answer:
        "Aux développeurs React qui écrivent déjà des tests — ou qui veulent s'y mettre — et qui souhaitent améliorer leurs pratiques de test. Que vous soyez confrontés à des tests instables, du code difficile à tester, ou une absence de stratégie de test — cette formation est faite pour vous.",
    },
    {
      question: 'Quel niveau est requis ?',
      answer:
        "Vous devez être à l'aise avec les fondamentaux de React (composants, props, state, hooks), les bases de TypeScript, et Git. Aucune expérience préalable en testing n'est nécessaire — on part de zéro.",
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
      question: 'Et si mon équipe utilise Jest ou Mocha ?',
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
          'Pourquoi Vitest plutôt que Jest, Mocha ou Web Test Runner.',
          'Avantages et inconvénients.',
        ],
      },
      {
        title: '💻 Exercices pratiques : premiers tests',
        items: ['Conseils et astuces pour des tests précis et maintenables.'],
      },
      {
        title: '👨🏻‍🏫 Object Mothers',
        items: [
          'Object Mothers.',
          'Créer des données de test réutilisables.',
          'Réduire la duplication dans les tests.',
        ],
      },
      {
        title: '👨🏻‍🏫 Tests asynchrones',
        items: [
          'Tests asynchrones.',
          'Tester les mises à jour de state et les "effects".',
          'Tester les hooks asynchrones (ex. : React Query de Tanstack).',
        ],
      },
      {
        title: '💻 Exercices pratiques : tests asynchrones',
        items: ['Pratique des tests asynchrones.'],
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
        title: '👨🏻‍🏫 Tests de composants : les différentes saveurs',
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
        title: '👨🏻‍🏫 React Testing Library vs. Vitest Browser Mode',
        items: ['Tests DOM résilients.', 'Tests dans un vrai navigateur.'],
      },
      {
        title:
          '💻 Exercices pratiques : React Testing Library et Vitest Browser Mode',
        items: [
          'Pratique React Testing Library.',
          'Pratique Vitest Browser Mode.',
        ],
      },
      {
        title: '👨🏻‍🏫 Browser Mode « Partial » vs. « Full »',
        items: ['Compromis entre Browser Mode « Partial » et « Full ».'],
      },
      {
        title: '👨🏻‍🏫 TDD',
        items: [
          'Test-Driven Development : origine et bénéfices.',
          'TDD progressif.',
        ],
      },
      {
        title: '💻 Exercices pratiques : tester un custom hook',
        items: [
          "Tester un custom hook React avec l'approche TDD progressif.",
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
        title: '👨🏻‍🏫 Tester les Props et Callbacks',
        items: [
          'Tester les props des composants.',
          'Tester les callbacks des composants.',
        ],
      },
      {
        title: '💻 Exercices pratiques : Props, Callbacks et formulaires',
        items: [
          'Tester la communication via Props et Callbacks.',
          'Interagir avec les formulaires.',
        ],
      },
      {
        title: '👨🏻‍🏫 Contrôle du temps',
        items: [
          'Utiliser les "fake timers".',
          'Avancer le temps rapidement.',
          'Tester un comportement dépendant du temps.',
        ],
      },
      {
        title: '👨🏻‍🏫 Gloves et Page Objects',
        items: [
          'Gloves.',
          'Le pattern Page Object pour les composants React.',
          'Quand et comment les utiliser.',
        ],
      },
      {
        title: '💻 Exercices pratiques : Gloves et Page Objects',
        items: ['Utiliser un Page Object.', 'Implémenter un Page Object.'],
      },
      {
        title: '👨🏻‍🏫 Tester le routing',
        items: [
          'Tester la logique de routage.',
          'Tester les data loaders et les routes protégées.',
          'Tester les flux de navigation.',
        ],
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
        title: '👨🏻‍🏫 Construire une stratégie de test pragmatique',
        items: [
          "Objectifs d'une stratégie de test.",
          'Choisir quoi tester et comment.',
          'Évaluer une stratégie de test.',
          'Introduire les tests dans une base de code legacy.',
        ],
      },
      {
        title: "👨🏻‍🏫 Stratégie de test à l'ère de l'IA",
        items: [
          'Ce qui change — et ce qui ne change pas — quand les agents écrivent le code ou les tests.',
          "Les tests comme boucle de feedback pour l'agent vs. comme filet de sécurité pour les humains — et pourquoi ces deux rôles tirent la même suite dans des directions différentes.",
          'Les défis du développement assisté par IA : Cognitive Debt, Review Fatigue et Context Switching Tax — et comment une stratégie de test solide les contient.',
          'Quoi choisir et quand : Vibe Coding vs. Spec-Driven Development vs. Charted Coding.',
        ],
      },
    ],
  },
});
