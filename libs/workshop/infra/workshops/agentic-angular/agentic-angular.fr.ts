import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './agentic-angular.webp';
import thumbnailUri from './agentic-angular-thumbnail.webp';

export const agenticAngularFullCourseFr = createWorkshop({
  id: 'agentic-angular-fr',
  title: 'Agentic Angular : cuisiner des agents IA sans se brûler',
  shortTitle: 'Agentic Angular : cuisiner des agents IA sans se brûler',
  type: 'full',
  subheading: `Trois jours pour intégrer, dans les apps Angular que vous avez déjà, des agents qui tiennent en production.
Generative UI, human-in-the-loop, sécurité, auth — et un arbre de décision à emporter.`,
  pictureAltText:
    "Métaphore visuelle de l'intégration d'agents IA dans les apps Angular : une cocotte contenant le logo Angular, avec AG-UI, A2UI et Mastra qui y tombent comme des ingrédients.",
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl:
    'https://docs.google.com/forms/d/1NwKJemV_QX5wQ5NO7dAxZn1XHpUmnUHvZvePud_ywns/viewform',
  waitlist: {
    url: 'https://docs.google.com/forms/d/1yFLewI_0Nadd3_UeOL8PT33NoO3YxLQajjEM3skvmZk/viewform',
  },
  lumaTag: 'agentic-angular',
  description: `
L'écart entre une démo d'agent et un agent en production est bien réel : **des confirmations que l'agent ne peut pas contourner**, une identité qui atteint vraiment le runtime, des threads qui survivent à un rafraîchissement de page, des réponses qui arrivent en streaming avant que l'utilisateur n'abandonne, une facture de tokens qui ne dépasse pas la valeur de la fonctionnalité, et une réponse pour le jour où quelqu'un collera un document contenant des instructions cachées.

Cette formation est là pour **combler cet écart**. Pendant trois jours, nous partons d'une app Angular existante et y intégrons des agents avec **CopilotKit**, **AG-UI** et **A2UI** : human-in-the-loop, guardrails côté serveur et generative UI compris. Vous repartez avec du code qui tourne, des réflexes affûtés, et un arbre de décision pour savoir ce qui mérite un agent, sur quelle surface, avec quels garde-fous.

Côté agent, tout tourne sur **Mastra**, en TypeScript de bout en bout. Chaque pattern se transpose un pour un à LangGraph et consorts ; nous nommons les deux au fur et à mesure, et **AG-UI est la frontière qui rend ce choix réversible**.

**Vous repartirez capables de :**

- **Intégrer des agents IA** dans vos apps Angular existantes avec CopilotKit et AG-UI.
- **Garder l'humain aux commandes** avec des approbations, des interrupts et une confirmation côté serveur.
- **Sécuriser la frontière de l'agent** : prompt injection, scoping des tools, authentification.
- **Persister et reprendre des threads** entre sessions et après reconnexion.
- **Construire de la generative UI** avec A2UI, dans le chat comme en dehors.
- **Décider quand passer à l'agentique**, sur quelle surface, à quel niveau de risque, avec un arbre de décision que vous emportez.

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
    `Familiarité avec l'écosystème Angular (ex. créer un composant, implémenter et utiliser des inputs et outputs ; une expérience des Signals est un plus)`,
    `Aucune expérience préalable des agents ou de l'ingénierie LLM n'est requise`,
  ],
  benefits: [
    {
      icon: 'smart_toy',
      title: 'Les Bases des Agents, Vite',
      description:
        "La boucle d'agent, les fenêtres de contexte et les tokens — et pourquoi un modèle ne sait pas distinguer les instructions des données, ce qui vous rattrape plus tard.",
    },
    {
      icon: 'explore',
      title: 'Cartographier la Stack Agentique',
      description:
        'AG-UI, A2UI, MCP Apps et WebMCP : qui fait quoi, où en est chacun côté maturité et adoption, et ce qui reste un pari.',
    },
    {
      icon: 'cable',
      title: 'AG-UI Sous le Capot',
      description:
        "Events, cycle de vie d'un run, messages, tool calls et state deltas : lire le protocole avant de toucher au moindre SDK.",
    },
    {
      icon: 'integration_instructions',
      title: 'CopilotKit pour Angular',
      description:
        "Mise en place du runtime, chat prêt à l'emploi vs headless, intégration Signals & DI — dans une app que vous avez déjà, pas dans un projet jouet.",
    },
    {
      icon: 'sync_alt',
      title: 'État Partagé',
      description:
        'Synchronisation bidirectionnelle agent ↔ app, lecture seule vs lecture/écriture, et le streaming et les predictive updates qui donnent la sensation de rapidité.',
    },
    {
      icon: 'front_hand',
      title: 'Human in the Loop',
      description:
        "Boutons d'approbation, edit-before-execute et saisie structurée — et un regard lucide sur les limites de l'approbation basée sur les tools.",
    },
    {
      icon: 'pause_circle',
      title: 'Des Interrupts Qui Tiennent',
      description:
        "Suspendre le run côté agent, confirmer les arguments exacts plutôt que l'intention, et reprendre après un rafraîchissement.",
    },
    {
      icon: 'forum',
      title: 'Threads & Reprise',
      description:
        'Persister des conversations multi-sessions, reprendre après un crash ou une coupure de stream, et annuler un run proprement.',
    },
    {
      icon: 'security',
      title: "Sécuriser la Frontière de l'Agent",
      description:
        "Prompt injection, fuite d'informations sensibles, guardrails qui modèrent les streams à la volée, et scoping des tools au moindre privilège.",
    },
    {
      icon: 'key',
      title: 'Une Auth Qui Atteint le Runtime',
      description:
        "Propager l'identité de l'utilisateur jusqu'au runtime de l'agent, restreindre les tools par utilisateur et par rôle, et verrouiller l'endpoint.",
    },
    {
      icon: 'auto_awesome',
      title: 'Generative UI avec A2UI',
      description:
        "UI déclarative sous forme de données, le renderer Angular, le catalogue de confiance comme modèle de sécurité, et de l'UI pilotée par l'agent au-delà du chat.",
    },
    {
      icon: 'savings',
      title: 'Performance & Coûts',
      description:
        'Savoir où partent les tokens, puis réduire la facture et gagner en vitesse pour que le coût ne dépasse pas la valeur de la fonctionnalité.',
    },
    {
      icon: 'account_tree',
      title: 'Votre Arbre de Décision',
      description:
        "Quelles fonctionnalités méritent un agent, quelle surface pour quel cas d'usage, et à quel niveau de risque classer chaque tool. L'arbre, vous l'emportez.",
    },
  ],
  faqs: [
    {
      question: "À qui s'adresse cette formation ?",
      answer:
        "Aux développeurs Angular qui veulent intégrer des fonctionnalités agentiques dans une vraie app plutôt que de coller un chatbot à côté ; aux lead developers et tech leads qui cadrent la place de l'IA dans le produit ; et aux architectes et CTOs qui ont besoin de réponses sur la sécurité, l'authentification et les coûts avant de mettre en production.",
    },
    {
      question: 'Quel niveau est requis ?',
      answer:
        "Vous devez être familier avec l'écosystème Angular : créer un composant, implémenter et utiliser des inputs et outputs. Une expérience des Signals est un plus. La curiosité et une bonne culture web comptent davantage que l'ancienneté.",
    },
    {
      question: 'Faut-il déjà avoir travaillé avec des agents ou des LLMs ?',
      answer:
        "Non. On part du fonctionnement réel des LLMs, de la boucle d'agent et de ce que coûte un tour en tokens, puis on construit à partir de là. Si vous avez déjà mis des agents en production, les journées human-in-the-loop, sécurité et generative UI resteront du terrain neuf.",
    },
    {
      question: 'Quel framework agent utilisez-vous ?',
      answer:
        'Côté agent, tout tourne sur Mastra : la formation est donc en TypeScript de bout en bout. Chaque pattern se transpose un pour un à LangGraph et consorts, et nous nommons les deux au fur et à mesure. AG-UI est la frontière qui rend ce choix réversible.',
    },
    {
      question: 'Quels outils sont nécessaires ?',
      answer:
        "Un ordinateur avec accès Internet, micro, webcam, un navigateur à jour et les droits d'installation.",
    },
    {
      question: "C'est vraiment pratique ?",
      answer:
        "Oui. Chaque sujet se termine par un exercice : parler AG-UI en SSE brut, intégrer un agent dans une app Angular existante, imposer la confirmation côté serveur, attaquer puis durcir votre propre agent, rendre de l'A2UI avec votre design system, et enfin construire l'arbre de décision que vous emportez.",
    },
    {
      question: 'Pourquoi la capacité est-elle limitée à 10 personnes ?',
      answer:
        "Pour garder la formation interactive. Dix participants, c'est le point où chacun a encore droit à un regard sur son code et à des réponses à ses questions.",
    },
    {
      question: 'Les evals et le testing sont-ils couverts ?',
      answer:
        "Seulement en passant. Les evals, l'observabilité et le testing sont volontairement hors périmètre ici : ils sont couverts dans la formation complémentaire « Agentic Angular : tests et évals pour des agents IA fiables ».",
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
        title: '👨🏻‍🏫 Les bases des agents, vite',
        items: [
          'Comment fonctionnent les LLMs.',
          "La boucle d'agent : modèle, contexte, tools, et ce qui se passe réellement à chaque tour.",
          "Fenêtres de contexte et tokens : ce qu'ils vous coûteront plus tard.",
          "Pourquoi un modèle ne sait pas distinguer les instructions des données, et pourquoi c'est important.",
        ],
      },
      {
        title: '👨🏻‍🏫 La stack agentique',
        items: [
          'Pourquoi intégrer des agents dans vos apps, plutôt que de coller un chatbot à côté.',
          "Cartographier l'écosystème : AG-UI vs A2UI vs MCP Apps vs WebMCP.",
          'Où en est chacun : maturité, adoption, dynamique.',
        ],
      },
      {
        title: '👨🏻‍🏫 AG-UI sous le capot',
        items: [
          "Le protocole : events, cycle de vie d'un run, messages, tool calls, state deltas.",
          'Lire le protocole avant de toucher au moindre SDK.',
        ],
      },
      {
        title: '💻 Exercice : parler AG-UI en SSE brut',
        items: [
          'Piloter un run de bout en bout en server-sent events bruts, sans aucun SDK entre les deux.',
        ],
      },
      {
        title: '👨🏻‍🏫 CopilotKit pour Angular',
        items: [
          'Mise en place du runtime.',
          "Chat prêt à l'emploi vs headless.",
          'Intégration Signals & DI.',
        ],
      },
      {
        title: '💻 Exercice : intégrer un agent dans une app Angular existante',
        items: [
          "Câbler le runtime, poser une surface, et faire tourner le premier tour d'agent dans une app qui existe déjà.",
        ],
      },
      {
        title: '👨🏻‍🏫 Debugging & outils de dev',
        items: [
          "Le flux d'events est votre stack trace : lire AG-UI dans l'onglet réseau et les dev tools.",
          'Les traces de Mastra Studio.',
        ],
      },
      {
        title: '💻 Exercice : diagnostiquer un agent qui déraille',
        items: [
          "Remonter d'un run cassé jusqu'à l'event qui l'a causé, à partir du flux et des traces.",
        ],
      },
      {
        title: '👨🏻‍🏫 État partagé',
        items: [
          'Synchronisation bidirectionnelle agent ↔ app.',
          'Lecture seule vs lecture/écriture.',
          'Vitesse perçue : streaming, predictive state updates.',
        ],
      },
      {
        title: "💻 Exercice : synchroniser l'état de l'agent et celui de l'app",
        items: [
          "Partager l'état dans les deux sens, puis le rendre instantané avec le streaming et les predictive updates.",
        ],
      },
      {
        title: '👨🏻‍🏫 Frontend tools & generative UI',
        items: [
          "Exposer des tools frontend à l'agent.",
          'Rendre les tool calls sous forme de composants Angular.',
        ],
      },
      {
        title: '💻 Exercice : du tool call au composant',
        items: [
          "Exposer un tool frontend et rendre son appel comme un vrai composant Angular, plutôt qu'un mur de texte.",
        ],
      },
      {
        title: '👨🏻‍🏫 Human in the loop',
        items: [
          "La boucle la plus simple : un tool frontend qui demande à l'utilisateur.",
          "Boutons d'approbation, edit-before-execute, saisie structurée.",
          "Les limites de l'approbation basée sur les tools.",
        ],
      },
      {
        title: '💻 Exercice : human in the loop avec un tool frontend',
        items: [
          "Mettre l'utilisateur dans la boucle avec un tool frontend, puis trouver où cette approche ne suffit plus.",
        ],
      },
      {
        title: '👨🏻‍🏫 Interrupts : human in the loop durable',
        items: [
          'Suspendre le run côté agent : interrupt / suspend.',
          'Checkpoints / snapshots : où dort un run en pause.',
          "L'aller-retour : suspendre, approuver, reprendre. Survivre à un rafraîchissement.",
          "Confirmer les arguments exacts, pas l'intention.",
        ],
      },
      {
        title: '💻 Exercice : imposer la confirmation côté serveur',
        items: [
          'Déplacer la confirmation là où elle ne peut pas être contournée, et faire survivre un run en pause à un rafraîchissement de page.',
        ],
      },
      {
        title: '👨🏻‍🏫 Threads : persistance & reprise',
        items: [
          'Persistance et conversations multi-sessions.',
          'Reprendre un thread après un rafraîchissement ou un crash.',
          'Erreurs de stream : quand la connexion lâche en pleine réponse.',
          'Annulation : interrompre un run proprement.',
        ],
      },
      {
        title: '💻 Exercice : couper le stream, annuler un run, puis reprendre',
        items: [
          "Casser la connexion volontairement, annuler un run proprement, et faire repartir le thread là où il s'était arrêté.",
        ],
      },
      {
        title: "👨🏻‍🏫 Sécuriser la frontière de l'agent",
        items: [
          'Prompt injection.',
          "Fuite d'informations sensibles.",
          'Guardrails : modérer les streams à la volée.',
          'Scoping des permissions des tools : moindre privilège par utilisateur et par rôle.',
        ],
      },
      {
        title: "💻 Exercice : casser l'agent — red team, puis durcissement",
        items: [
          "Attaquer votre propre agent avec du contenu injecté, puis refermer les brèches que vous venez d'ouvrir.",
        ],
      },
      {
        title: '👨🏻‍🏫 Authentification & autorisation',
        items: [
          "Propager l'identité de l'utilisateur jusqu'au runtime de l'agent.",
          'Restreindre les tools par utilisateur.',
          "Sécuriser l'endpoint du runtime.",
        ],
      },
      {
        title: '💻 Exercice : verrouiller le runtime',
        items: [
          "Faire remonter une vraie identité jusqu'à l'agent, restreindre ses tools à cet utilisateur, et fermer l'endpoint derrière.",
        ],
      },
      {
        title: '👨🏻‍🏫 Performance & coûts',
        items: [
          'Où partent les tokens.',
          'Réduire les coûts, gagner en vitesse.',
        ],
      },
      {
        title: '💻 Exercice : optimiser coûts et performance',
        items: [
          "Mesurer où partent réellement vos tokens, puis réduire la facture sans donner l'impression que la fonctionnalité rame.",
        ],
      },
      {
        title: '👨🏻‍🏫 Generative UI avec A2UI',
        items: [
          'UI déclarative sous forme de données : streaming JSONL.',
          'Le renderer Angular.',
          'A2UI comme modèle de sécurité : catalogue de confiance, du JSON et pas du code.',
          'La boucle de récupération A2UI.',
        ],
      },
      {
        title: "💻 Exercice : rendre de l'A2UI avec votre design system",
        items: [
          "Brancher vos propres composants dans le renderer et laisser l'agent les composer.",
        ],
      },
      {
        title: '👨🏻‍🏫 Concevoir le catalogue',
        items: [
          'Granularité du catalogue : composants atomiques vs composés.',
          'UI figée vs dynamique : un cadre de décision.',
        ],
      },
      {
        title: '💻 Exercice : concevoir et exposer un catalogue',
        items: [
          "Choisir votre granularité, exposer le catalogue, et voir ce que l'agent en fait.",
        ],
      },
      {
        title: '👨🏻‍🏫 Au-delà de la surface de chat',
        items: [
          "UI pilotée par l'agent dans l'app principale.",
          "Actions : relier les interactions utilisateur à l'agent.",
        ],
      },
      {
        title: '💻 Exercice : sortir de la surface de chat',
        items: [
          "Déplacer l'UI pilotée par l'agent dans l'app principale, et y relier les interactions jusqu'à l'agent.",
        ],
      },
      {
        title: '👨🏻‍🏫 Définir votre stratégie agentique',
        items: [
          'Quelles fonctionnalités méritent un agent.',
          "Choisir la surface selon le cas d'usage : chat, embarquée, ou aucune.",
          'Classer vos tools par niveau de risque : exécution automatique, confirmation, interdiction.',
          'Un arbre de décision à emporter.',
          "Les evals, l'observabilité et le testing sont couverts dans la formation complémentaire « Agentic Angular : tests et évals pour des agents IA fiables ».",
        ],
      },
      {
        title: "💻 Exercice : construire l'arbre de décision",
        items: [
          "Quand passer à l'agentique, sur quelle surface, à quel niveau de risque — pour votre propre codebase, pas pour une app d'exemple.",
        ],
      },
    ],
  },
});
