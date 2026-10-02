import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './trusting-agentic-angular.webp';
import thumbnailUri from './trusting-agentic-angular-thumbnail.webp';

export const trustingAgenticAngularFullCourseFr = createWorkshop({
  id: 'trusting-agentic-angular-fr',
  title: 'Agentic Angular : tests et évals pour des agents IA fiables',
  shortTitle: 'Agentic Angular : tests et évals pour des agents IA fiables',
  type: 'full',
  subheading: `Trois jours pour retracer les frontières de test dans vos apps dopées à l'IA.
Faker le LLM là où c'est possible, evaluer le reste, et savoir exactement ce que chaque eval vous coûte.`,
  pictureAltText:
    "Métaphore visuelle du test des apps Angular dopées à l'IA : une cocotte contenant le logo Angular et une coche verte, avec AG-UI, Vitest, A2UI, Mastra et Langfuse qui y tombent comme des ingrédients.",
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl:
    'https://docs.google.com/forms/d/14aVZl47KAMST61jN0C0r5Ir6SwjWFILzpuHl65cm6hg/viewform',
  waitlist: {
    url: 'https://docs.google.com/forms/d/16y7K8Wp5HDmWSkYW692M4dMUrb_I3gqLLjempQA0v3o/viewform',
  },
  lumaTag: 'trusting-agentic-angular',
  description: `
Les fonctionnalités IA ont introduit du **comportement non déterministe** dans nos apps. Construire une stratégie de test robuste était déjà difficile avec du code déterministe — les enjeux sont maintenant plus élevés. Quelle confiance avez-vous dans ce que vous mettez en production ? Que se passe-t-il quand vous changez de LLM, ajustez les instructions d'un agent, ou mettez à jour une dépendance au milieu ?

On ne peut pas faire d'assertions strictes sur du comportement probabiliste, mais on peut le **noter** avec des evals — et il ne faut **pas evaluer ce qu'un test rapide et déterministe couvre gratuitement**.

Pendant trois jours, nous partons d'une app dopée à l'IA et construisons sa stratégie de confiance de bout en bout : retracer le **System Under Test** sur toutes les couches entre le navigateur et le LLM, faker le modèle pour des tests déterministes et rapides — y compris à la frontière **AG-UI** et pour la generative UI en **A2UI** — puis concevoir des evals — datasets, graders, LLM-as-judge — pour ce qui est réellement probabiliste. Le tout en gardant un œil sur la facture : tokens, flakiness, et boucle de feedback ralentie.

Vous repartez avec du code qui tourne, un juge calibré, des evals câblées dans la CI, et un cadre de décision pour savoir quand tester, quand evaluer, et quand une eval vaut son prix. **Sans prier.**

**Vous repartirez capables de :**

- **Retracer les frontières du System Under Test** dans des apps qui embarquent des couches LLM.
- **Faker le LLM** pour des tests rapides et déterministes — et savoir quand le fake vous ment.
- **Tester les frontends agentiques à la frontière AG-UI** : flux d'events enregistrés, sans modèle.
- **Tester la generative UI construite avec A2UI** : contrats de catalogue et assertions sur l'UI-as-data.
- **Construire des datasets d'eval** de zéro, à partir de traces de production, et de façon synthétique.
- **Concevoir et calibrer des graders** : vérifications par le code, LLM-as-judge, et revue humaine.
- **Noter les trajectoires d'agent** : choix des tools, justesse des arguments, et comportement multi-tours.
- **Câbler les evals dans la CI** sans faire exploser les coûts ni se noyer dans la flakiness.
- **Boucler la boucle avec l'observabilité** : traces, evals en ligne, et retours utilisateurs.
- **Décider quand tester, quand evaluer, et quand simplement monitorer**, avec un cadre de décision que vous emportez.

*Les exemples tournent en TypeScript de bout en bout (Vitest, Mastra, Langfuse). Chaque pattern se transpose un pour un à d'autres stacks et frameworks ; nous nommons les alternatives au fur et à mesure.*

Pour garder la formation interactive, chaque session est **limitée à 10 participants**.
`,
  offer: {
    type: 'early-bird',
    price: 1270,
    originalPrice: 1470,
  },
  language: 'fr',
  requiredSkills: [
    `De la curiosité et une bonne culture web`,
    `À l'aise avec TypeScript et les bases des tests automatisés (quel que soit le framework)`,
    `Aucune expérience préalable de l'ingénierie LLM ou des evals n'est requise`,
  ],
  benefits: [
    {
      icon: 'schema',
      title: 'Retracer le System Under Test',
      description:
        'Cartographiez les couches entre le navigateur et le LLM, et découvrez ce qui est déterministe, ce qui est probabiliste, et où se situe vraiment la frontière.',
    },
    {
      icon: 'theater_comedy',
      title: 'Faker le LLM',
      description:
        'Réponses scriptées, sorties structurées et tool calls pour des tests déterministes et rapides — avec un regard lucide sur les moments où le fake vous ment.',
    },
    {
      icon: 'cable',
      title: 'Tester à la Frontière AG-UI',
      description:
        "Utilisez le flux d'events comme couture de test : enregistrez et rejouez les streams AG-UI pour des tests frontend sans modèle et sans tokens.",
    },
    {
      icon: 'auto_awesome',
      title: 'Tester la Generative UI avec A2UI',
      description:
        "L'UI-as-data est de la donnée testable : faites vos assertions sur les payloads A2UI plutôt que sur des pixels, et vérifiez que l'UI générée reste dans le catalogue de confiance.",
    },
    {
      icon: 'fact_check',
      title: 'Les Bases des Evals',
      description:
        "Dataset, task, grader, score : de quoi une eval est faite, en quoi noter diffère d'asserter, et quand lancer les evals hors ligne ou en ligne.",
    },
    {
      icon: 'dataset',
      title: 'Des Datasets Qui Comptent',
      description:
        'Commencez par un golden dataset écrit à la main, exploitez les traces de production pour les cas réels, et générez les cas limites sans vous mentir à vous-même.',
    },
    {
      icon: 'gavel',
      title: 'Graders & LLM-as-Judge',
      description:
        "Les graders en code d'abord, puis les rubrics et la comparaison par paires — et calibrez le juge sur des labels humains avant de faire confiance à ses notes.",
    },
    {
      icon: 'timeline',
      title: "Noter les Trajectoires d'Agent",
      description:
        "Évaluez le choix des tools, la justesse des arguments et l'ordre des appels sur des conversations multi-tours, pas seulement la réponse finale.",
    },
    {
      icon: 'rocket_launch',
      title: 'Les Evals dans la CI',
      description:
        "Sampling, cache, seuils de passage vs suivi de score, et comment distinguer une eval rouge d'une vraie régression.",
    },
    {
      icon: 'savings',
      title: 'Payer le Juste Prix',
      description:
        'Connaissez le coût par run, par PR et par jour — et empêchez la taxe sur la boucle de feedback de ralentir la boucle interne.',
    },
    {
      icon: 'monitoring',
      title: 'Observabilité & Evals en Ligne',
      description:
        "Les traces comme nouvelle stack trace, les evals en ligne et les signaux de retour utilisateur, et le chemin de l'incident de production à l'entrée de dataset.",
    },
    {
      icon: 'account_tree',
      title: 'Votre Stratégie de Confiance',
      description:
        "Tester, evaluer ou monitorer — par couche, par risque et par budget. L'arbre de décision, vous l'emportez.",
    },
  ],
  faqs: [
    {
      question: "À qui s'adresse cette formation ?",
      answer:
        'Aux développeurs qui livrent des fonctionnalités IA et ne font plus confiance à leur suite de tests ; aux spécialistes QA et testing confrontés pour la première fois à du comportement non déterministe ; et aux leads, architectes et CTOs qui doivent définir ce que « assez confiant pour livrer » veut dire quand un modèle est dans la boucle.',
    },
    {
      question: 'Quel niveau est requis ?',
      answer:
        "Vous devez être à l'aise avec TypeScript et les bases des tests automatisés, quel que soit le framework. La curiosité et une bonne culture web comptent davantage que l'ancienneté.",
    },
    {
      question: 'Faut-il déjà avoir travaillé avec des LLMs ou des evals ?',
      answer:
        'Non. On part de ce que le non-déterminisme fait aux assertions, aux snapshots et à la CI, puis on construit les evals depuis les principes de base. Si vous lancez déjà des evals, les coutures de test AG-UI et A2UI, la calibration du juge et le travail sur le coût en CI resteront du terrain neuf.',
    },
    {
      question: 'Est-ce lié à une stack particulière ?',
      answer:
        "Les exemples tournent en TypeScript de bout en bout, avec Vitest, Mastra et Langfuse. Chaque pattern se transpose un pour un à d'autres stacks et frameworks, et nous nommons les alternatives au fur et à mesure — ce sont les frontières, les graders et le modèle de coût qui se transposent, pas les noms d'outils.",
    },
    {
      question: 'Quels outils sont nécessaires ?',
      answer:
        "Un ordinateur avec accès Internet, micro, webcam, un navigateur à jour et les droits d'installation.",
    },
    {
      question: "C'est vraiment pratique ?",
      answer:
        "Oui. Chaque sujet se termine par un exercice : disséquer une fonctionnalité IA pour tracer ses frontières de SUT, tester un flow agentique avec un modèle faké, rejouer un stream AG-UI, calibrer un juge LLM, noter la trajectoire d'un agent, câbler les evals dans la CI avec un budget, et enfin construire l'arbre de décision que vous emportez.",
    },
    {
      question: 'Pourquoi la capacité est-elle limitée à 10 personnes ?',
      answer:
        "Pour garder la formation interactive. Dix participants, c'est le point où chacun a encore droit à un regard sur son code et à des réponses à ses questions.",
    },
    {
      question: 'La construction des agents est-elle couverte ?',
      answer:
        "Non. L'intégration des agents, la sécurité et la generative UI sont couvertes dans la formation complémentaire « Agentic Angular : cuisiner des agents IA sans se brûler ». Celle-ci prend le relais là où l'autre s'arrête : prouver que ça marche.",
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
        title: '👨🏻‍🏫 Pourquoi votre stratégie de test vient de casser',
        items: [
          'Ce que le non-déterminisme fait aux assertions, aux snapshots et à la CI.',
          'Les modes de défaillance : hallucination, dérive, régressions de prompt, changements de modèle.',
          'Tester, evaluer ou prier : les trois postures et ce que chacune vous apporte.',
        ],
      },
      {
        title: '👨🏻‍🏫 Le nouveau System Under Test',
        items: [
          'Cartographier les couches entre le navigateur et le LLM : UI, protocole AG-UI, orchestration, tools, prompts, modèle.',
          'Ce qui est déterministe, ce qui est probabiliste, et où se situe vraiment la frontière.',
        ],
      },
      {
        title:
          '💻 Exercice : disséquer une fonctionnalité IA et tracer ses frontières de SUT',
        items: [
          "Démonter une vraie fonctionnalité couche par couche, et marquer où le déterminisme s'arrête réellement.",
        ],
      },
      {
        title: '👨🏻‍🏫 Faker le LLM',
        items: [
          'Faker à la frontière du modèle : réponses scriptées, sorties structurées, tool calls.',
          'Record & replay : quand ça aide, quand ça pourrit.',
          "Ce que les fakes peuvent prouver — et la confiance qu'ils ne peuvent pas vous donner.",
        ],
      },
      {
        title:
          '💻 Exercice : tester un flow agentique de façon déterministe avec un modèle faké',
        items: [
          'Remplacer le modèle par un fake, et mettre un flow agentique sous test rapide et reproductible.',
        ],
      },
      {
        title: '👨🏻‍🏫 Tester la coquille déterministe',
        items: [
          'Les tools ne sont que des fonctions : les tester comme vous avez toujours fait.',
          'Assemblage des prompts, construction du contexte et parsing des sorties structurées.',
          'Guardrails et couches de validation : tester le filet de sécurité, pas le modèle.',
        ],
      },
      {
        title:
          "💻 Exercice : couvrir la couche d'orchestration sans dépenser un seul token",
        items: [
          'Mettre la coquille déterministe sous test, et voir la facture de tokens rester à zéro.',
        ],
      },
      {
        title: "👨🏻‍🏫 Tester le comportement d'un agent sans vrai modèle",
        items: [
          'Scripter des conversations multi-tours et des séquences de tool calls.',
          "Simuler l'échec : timeouts, sorties malformées, refus.",
        ],
      },
      {
        title:
          '💻 Exercice : reproduire et corriger un bug avec une conversation scriptée',
        items: [
          'Transformer un rapport instable et difficile à reproduire en test déterministe qui échoue, puis le faire passer.',
        ],
      },
      {
        title: '👨🏻‍🏫 Tester à la frontière AG-UI',
        items: [
          "Le flux d'events comme couture de test : cycle de vie d'un run, messages, tool calls, state deltas.",
          'Enregistrer et rejouer les streams AG-UI : des tests frontend déterministes, sans modèle, sans tokens.',
          "Asserter sur le protocole : ce que l'agent a dit vs ce que l'UI a rendu.",
          'Cas limites du streaming : messages partiels, annulation, reconnexion.',
        ],
      },
      {
        title:
          '💻 Exercice : tester une fonctionnalité de chat sur un stream AG-UI rejoué',
        items: [
          'Enregistrer un run une fois, puis tester toute la surface de chat dessus pour toujours, gratuitement.',
        ],
      },
      {
        title: '👨🏻‍🏫 Tester la generative UI avec A2UI',
        items: [
          "L'UI-as-data est de la donnée testable : asserter sur les payloads A2UI plutôt que sur des pixels.",
          "Contrats de catalogue : vérifier que l'UI générée reste dans le catalogue de confiance.",
          'Tests de rendu : du JSONL A2UI aux composants de votre design system.',
        ],
      },
      {
        title: '💻 Exercice : verrouiller une fonctionnalité de generative UI',
        items: [
          'Figer une fonctionnalité de generative UI avec des contrats de catalogue et des tests de rendu.',
        ],
      },
      {
        title: '👨🏻‍🏫 Les bases des evals',
        items: [
          "Anatomie d'une eval : dataset, task, grader, score.",
          'Evals vs tests : noter plutôt qu’asserter.',
          'Evals hors ligne vs en ligne.',
        ],
      },
      {
        title: '💻 Exercice : écrire votre première eval',
        items: [
          'Construire un dataset, une task et un grader, et obtenir un score sur lequel vous pouvez vraiment raisonner.',
        ],
      },
      {
        title: '👨🏻‍🏫 Construire des datasets qui comptent',
        items: [
          'Commencer petit : des golden datasets écrits à la main.',
          'Exploiter les traces de production pour les cas réels.',
          'Données synthétiques : générer les cas limites sans se mentir à soi-même.',
        ],
      },
      {
        title:
          '💻 Exercice : construire un dataset à partir de traces et de cas synthétiques',
        items: [
          "Exploiter de vraies traces, générer les cas limites qui manquent, et obtenir un ensemble qui vaut la peine d'être noté.",
        ],
      },
      {
        title: '👨🏻‍🏫 Graders & LLM-as-judge',
        items: [
          'Les graders en code d’abord : exact match, contains, vérifications structurelles.',
          'LLM-as-judge : rubrics, comparaison par paires, biais connus.',
          'Calibrer le juge sur des labels humains — faire confiance au grader avant de faire confiance aux notes.',
        ],
      },
      {
        title: '💻 Exercice : construire et calibrer un juge LLM',
        items: [
          'Écrire la rubric, la confronter à des labels humains, et découvrir à quel point votre juge est fiable.',
        ],
      },
      {
        title: '👨🏻‍🏫 Evaluer les agents de bout en bout',
        items: [
          "Evals de trajectoire : noter le choix des tools, les arguments et l'ordre — pas seulement la réponse finale.",
          'Evals multi-tours : utilisateurs simulés et scoring au niveau de la conversation.',
          "Noter la generative UI : l'agent a-t-il choisi les bons composants A2UI pour la tâche ?",
        ],
      },
      {
        title:
          "💻 Exercice : noter la trajectoire d'un agent sur une tâche multi-étapes",
        items: [
          'Évaluer le chemin, pas seulement la destination : choix des tools, arguments et ordre.',
        ],
      },
      {
        title: '👨🏻‍🏫 Les evals en CI : payer le juste prix',
        items: [
          'Où partent les tokens : coût par run, par PR, par jour.',
          'Sampling, cache, et seuils de passage vs suivi de score.',
          "Gérer la variance : quand une eval rouge n'est pas une régression.",
          'La taxe sur la boucle de feedback : garder la boucle interne rapide.',
        ],
      },
      {
        title: '💻 Exercice : câbler les evals dans la CI avec un budget',
        items: [
          "Faire tourner les evals sur chaque PR sans que la facture ni l'attente ne dérapent.",
        ],
      },
      {
        title: '👨🏻‍🏫 Observabilité & evals en ligne',
        items: [
          'Les traces comme nouvelle stack trace.',
          'Evals en ligne et signaux de retour utilisateur.',
          "De l'incident de production à l'entrée de dataset : boucler la boucle.",
        ],
      },
      {
        title:
          "💻 Exercice : instrumenter l'app et transformer une trace en cas d'eval",
        items: [
          'Câbler le tracing, attraper une vraie défaillance, et la promouvoir dans votre dataset.',
        ],
      },
      {
        title: '👨🏻‍🏫 Définir votre stratégie de confiance',
        items: [
          'Le cadre de décision : tester, evaluer, monitorer — par couche, par risque.',
          'Ce qui tourne à chaque commit, chaque nuit, chaque release.',
          'Quand une eval vaut son prix — et quand elle ne le vaut pas.',
          'Un arbre de décision à emporter.',
          "L'intégration des agents, la sécurité et la generative UI sont couvertes dans la formation complémentaire : « Agentic Angular : cuisiner des agents IA sans se brûler ».",
        ],
      },
      {
        title: "💻 Exercice : construire l'arbre de décision pour votre app",
        items: [
          "Tester, evaluer ou monitorer — décidé couche par couche, pour l'app que vous livrez vraiment.",
        ],
      },
    ],
  },
});
