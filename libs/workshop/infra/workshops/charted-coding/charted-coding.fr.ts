import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './charted-coding.webp';
import thumbnailUri from './charted-coding-thumbnail.webp';

export const chartedCodingFullCourseFr = createWorkshop({
  id: 'charted-coding-fr',
  title: 'Charted Coding : Développement Assisté par IA Sans Dérive',
  shortTitle: 'Charted Coding : Développement Assisté par IA Sans Dérive',
  type: 'full',
  subheading: `Deux jours pour passer d'un développement assisté par IA rapide mais fragile à une approche que vous pourrez tenir dans la durée.
Cartographier le paysage, tracer une méthode compatible avec votre architecture, puis construire le « harness » qui garde vos agents sur la trajectoire.`,
  pictureAltText:
    'Métaphore visuelle du développement assisté par IA cartographié : un chemin clair ou une carte guidant la collaboration entre un développeur et un assistant IA.',
  pictureUri,
  thumbnailUri,
  duration: 2,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/uCFadpa7J578H6zQ6',
  // waitlist: { url: 'https://forms.gle/Ds8TSxkBkSiJddnk7' },
  lumaTag: 'charted-coding',
  description: `
Les agents de développement (Claude Code, Cursor, Copilot, et autres) font désormais partie du quotidien de nombreuses équipes. **Comment en tirer parti durablement**, sans dégrader la lisibilité du code, perdre le contrôle de votre architecture, ou se noyer dans la fatigue de revue ?

Entre le **Vibe Coding**, rapide mais difficile à maintenir, et le **Spec-Driven Development**, qui troque souvent une grosse revue de code contre une revue Markdown tout aussi grosse, il existe un workflow qui garde la boucle de feedback courte *et* l'architecture robuste. C'est la trajectoire que trace cette formation, sur deux jours, des principes de base jusqu'à un « harness » que vous pourrez utiliser dès lundi.

**Vous repartirez capables de :**

- **Choisir la bonne approche pour chaque contexte** : prototype, fonctionnalité en production, greenfield, brownfield ou legacy.
- **Garder l'agent sur la trajectoire** avec des boucles de feedback courtes et des tests comme spécification exécutable.
- **Diagnostiquer et corriger le context rot** (sycophancy, context clash, confusion, instruction drift et poisoning) grâce à l'isolation et à la réduction du contexte.
- **Écrire vos propres skills** pour encapsuler le jugement de votre équipe et capitaliser sur ce que vous apprenez en pilotant l'agent.
- **Câbler une couche de vérification déterministe**, une gate ladder qui va des hooks à la CI, que l'agent ne peut pas contourner en silence.
- **Travailler la boucle, pas seulement le prompt** : déclencher automatiquement la bonne étape au bon moment, appliquer de la backpressure pour garder l'agent sur les rails, et faire intervenir un humain quand c'est nécessaire.

La méthode tient en trois étapes : **Cartographier l'intention** (co-construire un Design Doc pragmatique), **Tracer les waypoints** (un plan de PRs ordonné, en tranches fines et relisables), **Piloter le cycle** (Scaffold → Red → Green → Refactor avec revue progressive).

Tout au long, la formation alterne **contenu théorique**, **démonstrations en direct** et **exercices pratiques**, le tout **agnostique du framework** avec des exercices en TypeScript, avec pour objectif de vous rendre **autonome** dans le choix de la bonne approche et le câblage de la couche déterministe qui la rend durable.
`,
  offer: {
    type: 'early-bird',
    price: 870,
    originalPrice: 1070,
  },
  language: 'fr',
  requiredSkills: [
    `À l'aise avec TypeScript ; les exercices et l'outillage (Vitest, ESLint) viennent de l'écosystème JavaScript`,
    `Familiarité avec les tests automatisés`,
    `Utilisation préalable d'un assistant IA pour générer du code (Claude, Cursor, Copilot, etc.) ; un usage occasionnel suffit`,
  ],
  benefits: [
    {
      icon: 'psychology',
      title: 'Cartographier le Paysage',
      description:
        "Comparez le Vibe Coding, le Spec-Driven Development (Spec Kit, BMAD, OpenSpec, etc.) et le Charted Coding, et reliez chacun aux problèmes qu'il résout ou qu'il crée.",
    },
    {
      icon: 'tune',
      title: 'La Bonne Approche au Bon Contexte',
      description:
        'Choisissez un workflow assisté par IA adapté aux prototypes, fonctionnalités en production, projets greenfield, brownfield ou code legacy.',
    },
    {
      icon: 'hub',
      title: 'Context Engineering',
      description:
        'Diagnostiquez le context rot (sycophancy, context clash, confusion, instruction drift, poisoning) et corrigez-le avec des sub-agents, des handoff docs, la compaction et la progressive disclosure.',
    },
    {
      icon: 'article',
      title: 'Design Docs Pragmatiques',
      description:
        'Rédigez des design documents qui fonctionnent à la fois pour les humains et les agents, sans tomber dans la sur-spécification.',
    },
    {
      icon: 'autorenew',
      title: 'Boucles de Feedback Courtes',
      description:
        "Alignez votre intention sur le code produit grâce à des cycles d'itération serrés.",
    },
    {
      icon: 'diversity_3',
      title: 'Chorus Programming',
      description:
        'Gardez la propriété collective du code : codez en direct avec votre équipe et vos agents sur une branche partagée, avec de petits commits et une revue continue et peu coûteuse.',
    },
    {
      icon: 'construction',
      title: 'Harness Engineering',
      description:
        "Mettez en place skills, hooks, tests, Nx boundaries et règles ESLint comme couche de vérification déterministe que l'agent ne peut pas contourner en silence.",
    },
    {
      icon: 'speed',
      title: 'Hooks, Backpressure & Gate Ladder',
      description:
        "Calez chaque vérification sur son risque et sa latence, des hooks à l'écriture aux git hooks, à la CI et aux agentic workflows, pour attraper les mauvais changements avant qu'ils ne s'accumulent.",
    },
    {
      icon: 'auto_awesome',
      title: 'Écrire Vos Propres Skills',
      description:
        'Utilisez skill-creator pour transformer un entretien en skill réutilisable, à progressive disclosure, qui encapsule le jugement de votre équipe.',
    },
    {
      icon: 'trending_up',
      title: 'Le Pilotage Capitalise',
      description:
        'Capturez les corrections que vous répétez et promouvez-les en skills, pour que la session suivante démarre plus affûtée.',
    },
    {
      icon: 'health_and_safety',
      title: 'Éviter les Pièges Classiques',
      description:
        "Évitez la dérive, la perte de contrôle, l'over-engineering, la fatigue de revue et la distraction du multitâche.",
    },
    {
      icon: 'savings',
      title: 'Maîtriser les Coûts',
      description:
        "Le coût des tokens n'est que la partie émergée. Comparez les workflows sur le temps de revue et le coût de pilotage, pas seulement sur la facture.",
    },
  ],
  faqs: [
    {
      question: "À qui s'adresse cette formation ?",
      answer:
        "Aux développeurs qui utilisent ou souhaitent utiliser efficacement les assistants IA ; aux lead developers et tech leads en charge de cadrer l'usage de l'IA ; aux architectes et CTOs cherchant à industrialiser le développement assisté par IA sans sacrifier la qualité ; et aux équipes confrontées à la dérive du code généré qui cherchent une approche structurée et reproductible.",
    },
    {
      question: 'Quel niveau est requis ?',
      answer:
        "Vous devez être à l'aise avec TypeScript, familier avec les tests automatisés, et avoir déjà essayé un assistant IA au moins occasionnellement.",
    },
    {
      question: 'Quels outils sont nécessaires ?',
      answer:
        "Un ordinateur avec accès Internet, micro, webcam, navigateur à jour, droits d'installation et un assistant IA fonctionnel (Claude Code, Cursor, Copilot ou équivalent).",
    },
    {
      question: "C'est vraiment pratique ?",
      answer:
        "Oui. Après une comparaison cours + démo des principales approches, vous pratiquez le workflow Charted Coding sur un cas d'usage commun (Cartographier l'intention, Tracer les waypoints, Piloter le cycle), puis vous écrivez votre propre skill et câblez un « harness » (hooks, verification gates, Nx boundaries). Vous repartez avec une synthèse collective et un plan d'action individuel.",
    },
    {
      question: 'Est-ce lié à un framework particulier ?',
      answer:
        "Non. Les principes s'appliquent à toutes les stacks et à tous les langages, et c'est bien l'intérêt : le workflow, le context engineering et le « harness » se transposent à ce que vous construisez. Les exercices sont en TypeScript, cela dit, et certains s'appuient sur l'outillage de l'écosystème JavaScript (Vitest, ESLint, Nx) — ce sont ces exemples que vous transposerez à votre propre toolchain, pas les idées derrière.",
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
        '"Réserver une Place" vous inscrit à une session planifiée. "Session sur Mesure" s\'adresse aux entreprises qui souhaitent une formation privée, avec la possibilité d\'adapter le contenu, la durée ou les priorités.',
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
        title: '👨🏻‍🏫 Capitaine, on dérive',
        items: [
          'Définir le "Vibe Coding" : quand ça fonctionne, pourquoi c\'est séduisant, et les pièges classiques (dérive, dette cognitive / deskilling, décisions isolées et inconscientes, pas assez de points de contrôle).',
          'Spec-Driven Development : Spec Kit (GitHub), BMAD, OpenSpec et alternatives ; anatomie et fonctionnement de Spec Kit.',
          "Démo en direct : le même cas d'usage sous les deux approches, ce qui tient et ce qui casse.",
          'Analyse comparative en narratif : forces et limites selon le contexte ; quand chacune est rentable, et quand elle devient un frein.',
          'Boucles de feedback lentes, taxe du context switching et coût de pilotage : nommer les coûts cachés du développement assisté par IA.',
        ],
      },
      {
        title: '💻 Exercice : Fatigue de revue',
        items: [
          'Dix minutes pour trouver les contradictions dans le dossier qui vous est attribué : un Design Doc ou un dossier Spec Kit pour la même fonctionnalité.',
          "Sans agent, sans aller voir l'autre dossier : une expérience directe de la fatigue de revue et des limites d'une spec statique.",
        ],
      },
      {
        title: '👨🏻‍🏫 Context Engineering',
        items: [
          'Context rot : comment la précision se dégrade bien avant que la fenêtre de contexte soit pleine.',
          'Les symptômes à reconnaître : sycophancy, context clash / contradiction, confusion, instruction drift, distraction, poisoning.',
          "Context isolation : sub-agents et handoff docs plutôt qu'une seule conversation tentaculaire.",
          'Context reduction : compaction, compute offloading et réduction de la verbosité des outils.',
          "Progressive disclosure, et arbitrages CLI vs. MCP pour les définitions d'outils.",
        ],
      },
      {
        title: '👨🏻‍🏫 Agent Skills',
        items: [
          "Anatomie d'une skill : SKILL.md, references/, scripts/, assets/, et pourquoi la progressive disclosure garde le contexte léger.",
          'Petit historique : CLAUDE.md, AGENTS.md, Claude Skills, Agent Skills.',
          'Gérer les skills comme des packages npm : `npx skills add / install / update / remove`.',
        ],
      },
      {
        title: '💻 Exercice : Skill Unfolding',
        items: [
          'Lancer le même prompt deux fois : une fois sans skill installée, une fois avec `angular-developer` installée.',
          "Noter quels fichiers de référence l'agent ouvre à chaque tour : la progressive disclosure, observée directement.",
        ],
      },
      {
        title:
          '👨🏻‍🏫 Tracer la route : développement incrémental compatible avec les agents',
        items: [
          "Naviguer avec une carte plutôt que dériver : piloter l'agent en gardant le contrôle de la trajectoire.",
          "Cartographier l'intention : co-construire un Design Doc pragmatique avec l'agent, couvrant objectifs, comportement, design et stratégie de tests.",
          "Tracer les waypoints : transformer l'intention en un plan de PRs ordonné et relisable (tranches fines qui ne cassent jamais la mainline).",
          'Piloter le cycle : Scaffold → Red → Green → Refactor, avec revue progressive après chaque tranche, pas une mega-revue en fin de course.',
          "Les tests comme spécification exécutable et comme boucle de feedback de l'agent IA : en quoi cela diffère du TDD classique.",
          'Compatibilité avec votre stack actuelle (Vitest, JUnit, pytest, etc.) : un état d\'esprit "framework-agnostic".',
          'Coût et délai comparés, étape par étape, à un flow Spec Kit "classique".',
        ],
      },
      {
        title: '💻 Exercice : Charted Design',
        items: [
          'Installer les skills Charted Coding avec `npx skills add marmicode/skills`.',
          "Co-construire le Design Doc d'un planificateur de repas hebdomadaire avec `/charted-design` : le plus dur, c'est la stratégie de tests et le plan de PRs ordonné, pas la liste des fonctionnalités.",
          "Répondre aux questions de l'agent et éditer le doc au fur et à mesure. Pas encore d'implémentation.",
        ],
      },
      {
        title: '👨🏻‍🏫 Chorus Programming',
        items: [
          "Pourquoi le pair programming dérive vers l'isolement et le mob programming vers le tunnel, et ce que les deux perdent : la propriété collective.",
          'Limbo : programmation partagée en direct ("how low can you go?"), de petits commits qui ne cassent jamais le build.',
          "Les règles : communication en direct, un chorus de 2 (3 max), co-design, et une personne libre de se concentrer sur le comportement pendant que les autres s'occupent de la structure.",
          'Résultat : une revue moins coûteuse parce que tout le monde a déjà vu la majeure partie du code, un développement plus rapide et une dérive détectée tôt.',
        ],
      },
      {
        title: '💻 Exercice : Charted Implementation',
        items: [
          'Implémenter le planificateur de repas avec `/charted-scaffold`, `/charted-red`, `/charted-green` ou `/charted-continue`.',
          "L'objectif est de ressentir la bonne granularité des étapes : des tranches fines, PR après PR.",
        ],
      },
      {
        title: '👨🏻‍🏫 Piloter le navire : Harness Engineering',
        items: [
          'Le « harness » comme système : modèle, contexte, outils, contraintes, boucle de feedback, orchestration, mémoire (skills, ADRs) et human in the loop.',
          "Skills et hooks : encapsuler le jugement pour que l'agent suive le playbook de votre équipe.",
          "Verification gates : boucles de feedback courtes que l'agent doit passer avant d'avancer.",
          'Stratégie de tests comme « harness » : spécifications (réellement) exécutables qui empêchent la dérive.',
          "Nx module boundaries : murs architecturaux que l'agent ne peut pas franchir en silence.",
        ],
      },
      {
        title: '👨🏻‍🏫 Skill Authoring',
        items: [
          "Utiliser `/skill-creator` pour transformer un entretien en skill packagée et réutilisable plutôt qu'en prompt jetable.",
          "Pousser l'agent à mener l'entretien avec `AskUserQuestion` plutôt qu'en conversation libre.",
          "Rédiger le design doc au fil de la création de la skill, pour pouvoir le relire, l'éditer et le commiter en cours de route.",
        ],
      },
      {
        title: '💻 Exercice : Skill de design sur mesure',
        items: [
          'Installer `skill-creator` et construire une skill `codesign` sur mesure, de zéro, à partir de vos seules réponses.',
          'Essayer la nouvelle skill sur une fonctionnalité de votre choix.',
        ],
      },
      {
        title: '👨🏻‍🏫 Hooks, Backpressure & Gate Ladder',
        items: [
          "Backpressure : attraper les changements mauvais ou superflus avant qu'ils ne s'accumulent, plutôt qu'après une revue en big bang.",
          "La gate ladder, calée sur la latence et le risque : hooks à l'écriture et git hooks (~secondes), CI et agentic workflows (~minutes), revue humaine (~minutes à heures).",
          'Les hooks en pratique : UserPromptSubmit, PreToolUse / PostToolUse, Stop, et pourquoi il n\'y a pas encore de "standard" (et les couches de compatibilité qui existent).',
          "Loop engineering : câbler une done-condition (ex. `nx affected -t lint,test` sort avec le code 0) pour que l'agent itère sans surveillance, plutôt qu'un `/goal` manuel et du polling.",
        ],
      },
      {
        title: '💻 Exercice : Feedback rapide',
        items: [
          "Écrire un hook `PostToolUse` ESLint, typé avec les types du SDK Claude, qui renvoie les erreurs de lint directement à l'agent.",
          "Comparer le même prompt avant et après le câblage du hook : le voir se corriger tout seul au lieu d'attendre la revue.",
        ],
      },
      {
        title: '👨🏻‍🏫 Architecture Boundaries avec Nx',
        items: [
          'Librairies implicites : tout `index.ts` devient un projet taggé (platform / scope / type) sans fichier `project.json` écrit à la main.',
          "Faire respecter les module boundaries avec des dependency constraints pour qu'un agent ne puisse pas franchir un mur architectural en silence.",
        ],
      },
      {
        title: '💻 Exercice : Feedback architectural',
        items: [
          'Configurer `depConstraints` pour que les modules de type `ui` ne puissent pas importer les modules de type `infra`.',
          'Pointer ESLint sur le graphe de dépendances et voir le même prompt respecter la frontière au lieu de simplement se la faire énoncer.',
        ],
      },
      {
        title: "👨🏻‍🏫 Jeter l'ancre : le pilotage capitalise",
        items: [
          "Une correction que vous avez faite deux fois est une skill que vous n'avez pas encore écrite.",
          'Capturer : un hook repère la correction et la note pendant que vous êtes encore dedans.',
          'Promouvoir : la note devient une skill, et la session suivante démarre plus affûtée.',
        ],
      },
      {
        title: '💻 Exercice : Capturer le pilotage',
        items: [
          "Implémenter un hook `UserPromptSubmit` qui détecte le pilotage dans vos prompts et l'ajoute à un fichier de learnings.",
          'Implémenter un hook `Stop` qui vous rappelle de lancer `/save-learnings` dès que des learnings sont en attente.',
        ],
      },
      {
        title: "👨🏻‍🏫 Stratégie d'adoption : votre lundi",
        items: [
          "Intégrer la méthode dans le workflow d'une équipe existante, et les patterns de collaboration : qui écrit les tests, qui pilote l'IA, qui relit.",
          'Construire votre propre skill "let\'s cook" qui branche selon la tâche (spike, correction de bug, petit changement ou grosse fonctionnalité) et déroule un workflow différent pour le code legacy.',
          "Templates de Design Doc et d'ADR déterministes : markdown + cases à cocher + emojis vérifiables par un script, pas par un humain.",
          "Mettre en place des hooks de feedback rapide : lint à l'écriture, `nx affected` ou `vitest --changed` sur Stop.",
        ],
      },
      {
        title: "👨🏻‍🏫 Synthèse et plan d'action",
        items: [
          'Cheatsheet : hooks typés, traiter les skills tierces comme des packages npm (risque supply chain et prompt injection), progressive disclosure, et capitaliser les learnings en skills relues et évaluées.',
          'Choisir la bonne approche pour la tâche à accomplir.',
          'Questions / réponses et retours des participants.',
        ],
      },
    ],
  },
});
