import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './charted-coding.webp';
import thumbnailUri from './charted-coding-thumbnail.webp';

export const chartedCodingFullCourseFr = createWorkshop({
  id: 'charted-coding-fr',
  title: 'Charted Coding : Développement Assisté par IA Sans Dérive',
  shortTitle: 'Charted Coding : Développement Assisté par IA Sans Dérive',
  type: 'full',
  subheading: `Une journée pour passer d'un développement assisté par IA imprévisible à des approches durables.
Cartographier le paysage, tracer une méthode compatible avec votre architecture — puis configurer vos harnesses pour garder les agents sur la trajectoire.`,
  pictureAltText:
    'Métaphore visuelle du développement assisté par IA cartographié : un chemin clair ou une carte guidant la collaboration entre un développeur et un assistant IA.',
  pictureUri,
  thumbnailUri,
  duration: 1,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/uCFadpa7J578H6zQ6',
  waitlist: {
    url: 'https://forms.gle/Ds8TSxkBkSiJddnk7',
    nextSessionMonth: '2026-09',
  },
  lumaTag: 'charted-coding',
  description: `
Les assistants IA — Copilot, Cursor, Claude Code, et autres — font désormais partie du quotidien de nombreuses équipes.

**Comment en tirer parti durablement**, sans dégrader la lisibilité du code ni perdre le contrôle de votre architecture ?

**Où tracer la ligne** entre le Vibe Coding — rapide mais difficile à maintenir — et une approche plus structurée qui peut parfois sembler trop lourde ?

**Comment garder une boucle de feedback courte** avec l'agent (ou les agents) sans sacrifier la qualité du code produit ni la maintenabilité à long terme ?

Cette formation explore les principales approches du développement assisté par IA — du Vibe Coding au Spec-Driven Development — et vous fournit des **méthodes, outils et techniques agnostiques du framework** qui placent la boucle de feedback au cœur de votre collaboration avec l'agent IA.

**Au menu :** une comparaison du Vibe Coding et du Spec-Driven Development, puis le workflow Charted Coding sur un cas d'usage commun — **Cartographier l'intention**, **Tracer les waypoints**, **Piloter le cycle** — et un bloc **Harness Engineering** : skills, hooks, verification gates, stratégie de tests, Nx boundaries et règles ESLint comme garde-fous que l'agent ne peut pas contourner en silence.

La journée alterne **contenu théorique**, **démonstrations en direct** et **exercices pratiques**, avec pour objectif de vous rendre **autonome** dans le choix de la bonne approche et le câblage de la couche déterministe qui la rend durable.
`,
  offer: {
    type: 'early-bird',
    price: 390,
    originalPrice: 490,
  },
  language: 'fr',
  requiredSkills: [
    `Expérience de développement dans un langage typé (TypeScript, Java, C#, Python avec types, etc.) — les exercices utilisent TypeScript`,
    `Familiarité avec les tests automatisés`,
    `Utilisation préalable d'un assistant IA pour générer du code (Copilot, Cursor, Claude, etc.) — un usage occasionnel suffit`,
  ],
  benefits: [
    {
      icon: 'psychology',
      title: 'Cartographier le Paysage',
      description:
        'Comparez le Vibe Coding et le Spec-Driven Development (Spec Kit, BMAD, OpenSpec, etc.) et reliez-les à une approche structurée et test-driven.',
    },
    {
      icon: 'tune',
      title: 'La Bonne Approche au Bon Contexte',
      description:
        'Choisissez un workflow assisté par IA adapté aux prototypes, fonctionnalités en production, projets greenfield, brownfield ou code legacy.',
    },
    {
      icon: 'article',
      title: 'Design Docs Pragmatiques',
      description:
        'Rédigez des design documents qui fonctionnent à la fois pour les humains et les agents — sans tomber dans la sur-spécification.',
    },
    {
      icon: 'autorenew',
      title: 'Boucles de Feedback Courtes',
      description:
        "Alignez votre intention sur le code produit grâce à des cycles d'itération serrés.",
    },
    {
      icon: 'construction',
      title: 'Ingénierie du Harness',
      description:
        "Mettez en place skills, hooks, tests, Nx boundaries et règles ESLint comme couche de vérification déterministe que l'agent ne peut pas contourner en silence.",
    },
    {
      icon: 'health_and_safety',
      title: 'Éviter les Pièges Classiques',
      description:
        "Évitez la dérive, la perte de contrôle, l'over-engineering, la fatigue de revue et la distraction du multitâche.",
    },
    {
      icon: 'groups',
      title: 'Adapter à Votre Équipe',
      description:
        'Intégrez ces pratiques dans le quotidien et clarifiez les patterns de collaboration autour des tests, du prompting et de la revue.',
    },
    {
      icon: 'savings',
      title: 'Maîtriser les Coûts',
      description:
        "Le coût des tokens n'est que la partie émergée. Réduisez les coûts cachés : piloter, relire et rejeter le code généré par l'IA.",
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
        "Vous devez être à l'aise dans un langage typé (les exercices sont en TypeScript), familier avec les tests automatisés, et avoir déjà essayé un assistant IA au moins occasionnellement.",
    },
    {
      question: 'Quels outils sont nécessaires ?',
      answer:
        "Un ordinateur avec accès Internet, micro, webcam, navigateur à jour, droits d'installation et un assistant IA fonctionnel (Copilot, Cursor, Claude Code ou équivalent).",
    },
    {
      question: "C'est vraiment pratique ?",
      answer:
        "Oui. Après une comparaison cours + démo des principales approches, vous pratiquez le workflow Charted Coding sur un cas d'usage commun — Cartographier l'intention, Tracer les waypoints, Piloter le cycle — puis vous câblez les harnesses (skills, vérification, boundaries). Vous repartez avec une synthèse collective et un plan d'action individuel.",
    },
    {
      question: 'Est-ce lié à un framework particulier ?',
      answer:
        "Non. Les principes s'appliquent à toutes les stacks ; les tests comme spécification exécutable sont illustrés avec des patterns compatibles avec Vitest, JUnit, pytest et runners similaires.",
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
        title: '👨🏻‍🏫 Cartographier le paysage',
        items: [
          'Définir le "Vibe Coding" : quand ça fonctionne, pourquoi c\'est séduisant, et les pièges classiques (dérive, maintenabilité, illusion de productivité).',
          'Spec-Driven Development : Spec Kit (GitHub), BMAD, OpenSpec et alternatives — anatomie et fonctionnement de Spec Kit.',
          "Démo : le même cas d'usage sous les deux approches — ce qui tient, ce qui casse.",
          'Analyse comparative en narratif : forces et limites selon le contexte ; quand chacune est rentable — et quand elle devient un frein.',
        ],
      },
      {
        title:
          '👨🏻‍🏫 Principes : développement incrémental compatible avec les agents',
        items: [
          "Naviguer avec une carte plutôt que dériver : piloter l'agent en gardant le contrôle de la trajectoire.",
          "Cartographier l'intention : co-construire un Design Doc pragmatique avec l'agent — objectifs, comportement, design, stratégie de tests.",
          "Tracer les waypoints : transformer l'intention en un plan de PRs ordonné et relisable (tranches fines qui ne cassent jamais la mainline).",
          'Piloter le cycle : Scaffold → Red → Green → Refactor, avec revue progressive après chaque tranche — pas une mega-revue en fin de course.',
          "Les tests comme spécification exécutable et comme boucle de feedback de l'agent IA — en quoi cela diffère du TDD classique.",
          'Compatibilité avec votre stack actuelle (Vitest, JUnit, pytest, etc.) — état d\'esprit "framework-agnostic".',
          'Introduction au Charted Coding.',
        ],
      },
      {
        title: "💻 Exercice : Cartographier l'intention",
        items: [
          "Co-rédiger un Design Doc pragmatique avec l'agent sur le cas d'usage commun.",
          "Figer les objectifs, les non-objectifs, le comportement souhaité et le design de haut niveau avant d'écrire du code.",
        ],
      },
      {
        title: '💻 Exercice : Tracer les waypoints',
        items: [
          'Transformer le Design Doc en un plan de PRs ordonné : tranches fines, indépendamment relisables et mergeables.',
          'Identifier le scaffolding, les pre-tidy-ups et les waypoints fonctionnels qui gardent la trajectoire sous contrôle.',
        ],
      },
      {
        title: '💻 Exercice : Piloter le cycle',
        items: [
          'Implémenter le premier waypoint avec Scaffold → Red → Green → Refactor.',
          'Revue progressive : corriger le cap après chaque étape plutôt que de se noyer dans un diff tardif et volumineux.',
        ],
      },
      {
        title: '👨🏻‍🏫 Ingénierie du harness',
        items: [
          "Skills et hooks : encapsuler le jugement pour que l'agent suive le playbook de votre équipe.",
          "Portes de vérification : boucles de feedback courtes que l'agent doit passer avant d'avancer.",
          'Stratégie de tests comme harness : spécifications (réellement) exécutables qui empêchent la dérive.',
          "Nx module boundaries : murs architecturaux que l'agent ne peut pas franchir en silence.",
        ],
      },
      {
        title: '💻 Exercice : Brancher le harness',
        items: [
          "Mettre en place ou étendre des skills/hooks pour le cas d'usage commun.",
          "Ajouter ou renforcer une porte de vérification (tests, boundaries ou lint) et observer l'agent la respecter.",
        ],
      },
      {
        title: "👨🏻‍🏫 Stratégie d'adoption",
        items: [
          "Intégrer la méthode dans le workflow d'une équipe existante.",
          "Patterns de collaboration : qui écrit les tests, qui pilote l'IA, qui relit.",
        ],
      },
      {
        title: "👨🏻‍🏫 Synthèse et plan d'action",
        items: [
          'Choisir la bonne approche pour la tâche à accomplir.',
          'Questions / réponses et retours des participants.',
        ],
      },
    ],
  },
});
