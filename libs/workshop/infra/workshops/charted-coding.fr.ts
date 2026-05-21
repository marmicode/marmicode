import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './charted-coding.webp';
import thumbnailUri from './charted-coding-thumbnail.webp';
import { CHARTED_CODING_FULL_COURSE_FR_ID } from './charted-coding.shared';

export const chartedCodingFullCourseFr = createWorkshop({
  id: CHARTED_CODING_FULL_COURSE_FR_ID,
  title: 'Charted Coding : Développement Assisté par IA Sans Dérive',
  shortTitle: 'Charted Coding : Développement Assisté par IA Sans Dérive',
  type: 'full',
  subheading: `Une journée pour passer d'un développement assisté par IA rapide mais fragile à des approches durables.
Cartographier le Vibe Coding et le Spec-Driven Development — puis tracer une voie compatible avec votre architecture.`,
  pictureAltText:
    'Métaphore visuelle du développement assisté par IA cartographié : un chemin clair ou une carte guidant la collaboration entre un développeur et un assistant IA.',
  pictureUri,
  thumbnailUri,
  duration: 1,
  location: 'online',
  customSessionRequestUrl: 'TODO',
  // waitlistUrl: 'TODO',
  lumaTag: 'charted-coding',
  description: `
Les assistants IA — Copilot, Cursor, Claude Code, et autres — font désormais partie du quotidien de nombreuses équipes.

**Comment en tirer parti durablement**, sans dégrader la lisibilité du code ni perdre le contrôle de votre architecture ?

**Où tracer la ligne** entre le Vibe Coding — rapide mais difficile à maintenir — et une approche plus structurée qui peut parfois sembler trop lourde ?

**Comment garder une boucle de feedback courte** avec l'agent (ou les agents) sans sacrifier la qualité du code produit ni la maintenabilité à long terme ?

Cette formation explore les principales approches du développement assisté par IA — du Vibe Coding au Spec-Driven Development — et vous fournit des **méthodes, outils et techniques agnostiques du framework** qui placent la boucle de feedback au cœur de votre collaboration avec l'agent IA.

**Au menu :** pratique des différentes approches sur un **cas d'usage unique**, identification de leurs forces et limites, puis application d'une **méthode structurée** pour produire du code maintenable, testable et conforme à votre intention.

La journée alterne **contenu théorique**, **démonstrations en direct** et **exercices pratiques**, avec pour objectif de vous rendre **autonome** dans le choix et l'application de la bonne approche pour votre contexte.
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
        "Oui. Vous pratiquerez toute la journée sur un cas d'usage commun, comparerez les approches sur le même problème, et repartirez avec une synthèse collective et un plan d'action individuel.",
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
        title: '👨🏻‍🏫 Vibe Coding',
        items: [
          'Définir le "Vibe Coding".',
          "Quand ça fonctionne (et pourquoi c'est séduisant).",
          'Les pièges classiques : dérive, problèmes de maintenabilité, illusion de productivité.',
        ],
      },
      {
        title: '💻 Exercice : Vibe Coding',
        items: [
          'Itérer en Vibe Coding sur la fonctionnalité initiale.',
          'Analyse à froid : ce qui tient, ce qui casse.',
        ],
      },
      {
        title: '👨🏻‍🏫 Spec-Driven Development & Spec Kit',
        items: [
          "L'approche Spec-Driven : Spec Kit (GitHub), BMAD, OpenSpec et alternatives.",
          'Anatomie et fonctionnement interne de Spec Kit.',
        ],
      },
      {
        title: '💻 Exercice : approche Spec-Driven',
        items: [
          "Revisiter le même cas d'usage avec un workflow spec-driven.",
          'Avantages et inconvénients — leçons apprises.',
        ],
      },
      {
        title: '👨🏻‍🏫 Analyse comparative',
        items: [
          'Forces et limites de chaque approche selon le contexte.',
          'Quand le Vibe Coding suffit — et quand il devient dangereux.',
          'Quand le Spec-Driven est rentable — et quand il devient un frein.',
        ],
      },
      {
        title:
          '👨🏻‍🏫 Principes : développement incrémental compatible avec les agents',
        items: [
          "Naviguer avec une carte plutôt que dériver : piloter l'agent en gardant le contrôle de la trajectoire.",
          'Co-construire un "Design Doc" pragmatique avec l\'agent — et orchestrer la revue par des agents spécialisés.',
          'Le cycle Scaffold → Red → Green → Refactor.',
          "Les tests comme spécification exécutable et comme boucle de feedback de l'agent IA — en quoi cela diffère du TDD classique.",
          'Compatibilité avec votre stack actuelle (Vitest, JUnit, pytest, etc.) — état d\'esprit "framework-agnostic".',
          'Introduction au Charted Coding.',
        ],
      },
      {
        title: '💻 Exercice : approche incrémentale',
        items: [
          "Itérer sur le cas d'usage commun avec la méthode incrémentale.",
        ],
      },
      {
        title: '👨🏻‍🏫 Extensions : Skills, serveurs MCP, OpenSpec',
        items: [
          'Étendre la méthode avec des Skills et des serveurs MCP.',
          'Intégration avec OpenSpec.',
        ],
      },
      {
        title: '💻 Exercice : OpenSpec',
        items: [
          "Pratiquer l'approche incrémentale avec l'intégration OpenSpec.",
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
