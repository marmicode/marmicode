import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The Charted Coding diagram, extended with what the cohort builds around it:
 * tests agents can't cheat, runtime truth, the harness, evaluated skills and the autonomy dial.
 * Each part is tagged with the week that covers it.
 *
 * It is drawn straight on a dark page section, without a frame of its own.
 * Small screens get the same content as stacked blocks, as the drawing would be too small to read.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-route-diagram',
  template: `
    <div class="diagram">
      <svg
        role="img"
        aria-label="The workflow built during the cohort. A co-designed design doc charts waypoints (week 3). Each waypoint is navigated through scaffold, a failing test, making it pass and refactoring, then the next waypoint (week 3). That loop stands on tests agents can't cheat (week 1), reads runtime truth (week 2) and runs inside a harness (week 4). Agent trajectories feed a retrospective, skills and evals that compound back into the harness (week 5). An autonomy dial goes from hands on helm to autopilot (week 6)."
        viewBox="30 30 1180 642"
      >
        <defs>
          <marker
            id="cohort-arrow-mint"
            markerHeight="8"
            markerWidth="8"
            orient="auto-start-reverse"
            refX="7"
            refY="4"
          >
            <path class="arrowhead-mint" d="M0 0L8 4L0 8z" />
          </marker>
          <marker
            id="cohort-arrow-pink"
            markerHeight="7"
            markerWidth="7"
            orient="auto-start-reverse"
            refX="6"
            refY="3.5"
          >
            <path class="arrowhead-pink" d="M0 0L7 3.5L0 7z" />
          </marker>
        </defs>

        <!-- CHART. -->
        <rect
          class="panel"
          x="30.5"
          y="30.5"
          width="289"
          height="349"
          rx="16"
        />
        <text class="panel-label" x="54" y="68">Chart</text>
        <g class="week" transform="translate(238 50)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 3</text>
        </g>
        <text class="caption" x="175" y="100" text-anchor="middle">
          co-designed
        </text>
        <rect class="doc" x="54" y="112" width="242" height="70" rx="12" />
        <text class="doc-title" x="175" y="143" text-anchor="middle">
          📝 Design doc
        </text>
        <text class="doc-subtitle" x="175" y="167" text-anchor="middle">
          Intent &amp; progress
        </text>
        <rect
          class="waypoints"
          x="54"
          y="196"
          width="242"
          height="160"
          rx="14"
        />
        <path
          class="waypoint-link"
          d="M121 258L154 242"
          marker-end="url(#cohort-arrow-pink)"
        />
        <path
          class="waypoint-link"
          d="M121 274L154 290"
          marker-end="url(#cohort-arrow-pink)"
        />
        <path
          class="waypoint-link"
          d="M193 241L226 257"
          marker-end="url(#cohort-arrow-pink)"
        />
        <path
          class="waypoint-link"
          d="M193 291L226 275"
          marker-end="url(#cohort-arrow-pink)"
        />
        <circle class="waypoint done" cx="104" cy="266" r="18" />
        <text class="waypoint-number" x="104" y="272" text-anchor="middle">
          1
        </text>
        <circle class="waypoint current" cx="175" cy="232" r="18" />
        <text class="waypoint-number dark" x="175" y="238" text-anchor="middle">
          2
        </text>
        <circle class="waypoint" cx="175" cy="300" r="18" />
        <text class="waypoint-number" x="175" y="306" text-anchor="middle">
          3
        </text>
        <circle class="waypoint" cx="246" cy="266" r="18" />
        <text class="waypoint-number" x="246" y="272" text-anchor="middle">
          4
        </text>
        <text class="small-label" x="175" y="346" text-anchor="middle">
          Waypoints
        </text>

        <!-- HARNESS. -->
        <rect
          class="harness"
          x="360"
          y="372"
          width="560"
          height="300"
          rx="28"
        />
        <rect
          class="harness-label-background"
          x="388"
          y="359"
          width="344"
          height="26"
        />
        <text class="flow-label" x="398" y="377">
          ⚓ Harness · guardrails it can't bypass
        </text>
        <g class="week" transform="translate(664 361)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 4</text>
        </g>

        <!-- NAVIGATE. -->
        <text class="panel-label" x="396" y="424">Navigate</text>
        <g class="week" transform="translate(486 408)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 3</text>
        </g>

        <rect
          class="step scaffold"
          x="396"
          y="440"
          width="140"
          height="50"
          rx="10"
        />
        <text class="step-title" x="466" y="472" text-anchor="middle">
          Scaffold
        </text>

        <rect
          class="step red"
          x="560"
          y="492"
          width="150"
          height="56"
          rx="10"
        />
        <text class="step-title" x="635" y="516" text-anchor="middle">Red</text>
        <text class="step-subtitle" x="635" y="537" text-anchor="middle">
          Failing test
        </text>

        <rect
          class="step green"
          x="738"
          y="540"
          width="150"
          height="56"
          rx="10"
        />
        <text class="step-title" x="813" y="564" text-anchor="middle">
          Green
        </text>
        <text class="step-subtitle" x="813" y="585" text-anchor="middle">
          Make it pass
        </text>

        <rect
          class="step refactor"
          x="738"
          y="424"
          width="150"
          height="50"
          rx="10"
        />
        <text class="step-title light" x="813" y="455" text-anchor="middle">
          Refactor
        </text>

        <path
          class="flow"
          d="M175 380C175 440 280 465 388 465"
          marker-end="url(#cohort-arrow-mint)"
        />
        <path
          class="flow"
          d="M466 490C466 512 510 520 552 520"
          marker-end="url(#cohort-arrow-mint)"
        />
        <path
          class="flow"
          d="M635 548C640 566 690 568 730 568"
          marker-end="url(#cohort-arrow-mint)"
        />
        <path
          class="flow"
          d="M813 540V482"
          marker-end="url(#cohort-arrow-mint)"
        />
        <path
          class="flow"
          d="M738 449C690 449 635 452 635 484"
          marker-end="url(#cohort-arrow-mint)"
        />
        <text class="flow-label" x="640" y="440" text-anchor="middle">
          next test
        </text>

        <!-- Runtime truth. -->
        <rect class="chip" x="396" y="540" width="150" height="56" rx="10" />
        <text class="chip-title" x="471" y="564" text-anchor="middle">
          👀 Runtime truth
        </text>
        <g class="week" transform="translate(442 572)">
          <rect width="58" height="20" rx="10" />
          <text x="29" y="14">WEEK 2</text>
        </g>
        <path class="hint" d="M546 556L566 548" />

        <!-- Tests. -->
        <rect
          class="foundation"
          x="376"
          y="620"
          width="528"
          height="40"
          rx="12"
        />
        <text class="chip-title" x="396" y="645">
          🧪 Tests agents can't cheat · fakes · contracts
        </text>
        <g class="week" transform="translate(834 629)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 1</text>
        </g>

        <!-- Next waypoint. -->
        <path
          class="flow"
          d="M888 568H934a16 16 0 0 0 16-16V282a16 16 0 0 0-16-16H304"
          marker-end="url(#cohort-arrow-mint)"
        />
        <text class="flow-label" x="630" y="254" text-anchor="middle">
          next waypoint
        </text>

        <!-- Autonomy dial. -->
        <rect
          class="panel"
          x="1000.5"
          y="30.5"
          width="209"
          height="299"
          rx="16"
        />
        <text class="panel-label" x="1022" y="68">Autonomy dial</text>
        <g class="week" transform="translate(1022 80)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 6</text>
        </g>
        <path
          class="dial"
          d="M1046 128V306"
          marker-end="url(#cohort-arrow-pink)"
          marker-start="url(#cohort-arrow-pink)"
        />
        <circle class="dial-knob" cx="1046" cy="166" r="12" />
        <text class="small-label" x="1070" y="138">Autopilot</text>
        <text class="caption start" x="1070" y="172">the Charted loop</text>
        <text class="small-label" x="1070" y="304">Hands on helm</text>

        <!-- Learn from the drift. -->
        <rect
          class="panel"
          x="1000.5"
          y="350.5"
          width="209"
          height="321"
          rx="16"
        />
        <text class="panel-label" x="1022" y="388">Learn from the drift</text>
        <g class="week" transform="translate(1022 400)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 5</text>
        </g>
        <rect class="chip" x="1014" y="440" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="463" text-anchor="middle">
          Agent trajectories
        </text>
        <rect class="chip" x="1014" y="496" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="519" text-anchor="middle">
          Retrospective
        </text>
        <rect class="chip" x="1014" y="552" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="575" text-anchor="middle">
          Skills
        </text>
        <rect class="chip" x="1014" y="608" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="631" text-anchor="middle">
          Evals
        </text>
        <path
          class="waypoint-link"
          d="M1105 476V492"
          marker-end="url(#cohort-arrow-pink)"
        />
        <path
          class="waypoint-link"
          d="M1105 532V548"
          marker-end="url(#cohort-arrow-pink)"
        />
        <path
          class="waypoint-link"
          d="M1105 588V604"
          marker-end="url(#cohort-arrow-pink)"
        />
        <path
          class="waypoint-link"
          d="M1014 626H928"
          marker-end="url(#cohort-arrow-pink)"
        />
        <text class="caption" x="972" y="616" text-anchor="middle">
          compound
        </text>
      </svg>

      <ol class="stacked">
        <li class="block">
          <header>
            <h3>Chart</h3>
            <span class="week-tag">Week 3</span>
          </header>
          <p>A design doc, co-designed with the agent, charts the waypoints.</p>
        </li>
        <li class="block harness">
          <header>
            <h3>⚓ Harness</h3>
            <span class="week-tag">Week 4</span>
          </header>
          <p>Guardrails it can't bypass.</p>
          <div class="part">
            <header>
              <h4>Navigate</h4>
              <span class="week-tag">Week 3</span>
            </header>
            <ol class="steps">
              <li class="scaffold">Scaffold</li>
              <li class="red">Red</li>
              <li class="green">Green</li>
              <li class="refactor">Refactor</li>
            </ol>
            <p>Next test, then next waypoint.</p>
          </div>
          <div class="part">
            <header>
              <h4>👀 Runtime truth</h4>
              <span class="week-tag">Week 2</span>
            </header>
          </div>
          <div class="part foundation">
            <header>
              <h4>🧪 Tests agents can't cheat</h4>
              <span class="week-tag">Week 1</span>
            </header>
            <p>Fakes · contracts</p>
          </div>
        </li>
        <li class="block">
          <header>
            <h3>Learn from the drift</h3>
            <span class="week-tag">Week 5</span>
          </header>
          <ol class="steps">
            <li>Agent trajectories</li>
            <li>Retrospective</li>
            <li>Skills</li>
            <li>Evals</li>
          </ol>
          <p>They compound back into the harness.</p>
        </li>
        <li class="block">
          <header>
            <h3>Autonomy dial</h3>
            <span class="week-tag">Week 6</span>
          </header>
          <p>From hands on helm to autopilot: the Charted loop.</p>
        </li>
      </ol>
    </div>
  `,
  styles: `
    :host {
      --diagram-background: var(--marmicode-primary-color);
      --diagram-mint: var(--marmicode-accent-bright-color);
      --diagram-pink: #ffd7ef;
      --diagram-teal: var(--marmicode-accent-color);
      --diagram-scaffold: #3b6fb3;
      --diagram-red: #cf2f4a;
      --diagram-green: #15825a;
      --diagram-surface: rgba(255, 255, 255, 0.06);
      --diagram-outline: rgba(255, 255, 255, 0.16);
      --diagram-ink: white;
      --diagram-flow: var(--diagram-mint);
      --diagram-flow-text: var(--diagram-mint);
      --diagram-link: var(--diagram-pink);
      --diagram-link-text: var(--diagram-pink);
      --diagram-foundation: color-mix(
        in srgb,
        var(--diagram-mint) 12%,
        transparent
      );
      --diagram-tag-background: rgba(20, 30, 35, 0.35);
      --diagram-tag-outline: color-mix(
        in srgb,
        var(--diagram-mint) 40%,
        transparent
      );
      --diagram-tag-text: var(--diagram-mint);

      display: block;
    }

    .diagram {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      font-family: Roboto, 'Helvetica Neue', sans-serif;
    }

    .panel {
      fill: var(--diagram-surface);
      stroke: var(--diagram-outline);
      stroke-width: 1;
    }

    .panel-label {
      fill: var(--diagram-ink);
      font-size: 20px;
      font-weight: 700;
    }

    .small-label,
    .flow-label,
    .chip-title {
      font-size: 14px;
      font-weight: 500;
    }

    .small-label {
      fill: var(--diagram-link-text);
    }

    .flow-label {
      fill: var(--diagram-flow-text);
    }

    .caption {
      fill: var(--diagram-ink);
      font-size: 14px;
      font-style: italic;
    }

    .caption.start {
      fill: var(--diagram-link-text);
    }

    .doc {
      fill: white;
      stroke: var(--diagram-outline);
      stroke-width: 1;
    }

    .doc-title {
      fill: var(--marmicode-primary-color);
      font-size: 19px;
      font-weight: 700;
    }

    .doc-subtitle {
      fill: #6b7280;
      font-size: 14px;
    }

    .waypoints {
      fill: none;
      stroke: var(--diagram-link);
      stroke-dasharray: 8 6;
      stroke-opacity: 0.5;
      stroke-width: 1.5;
    }

    .waypoint {
      fill: var(--diagram-background);
      stroke: var(--diagram-ink);
      stroke-width: 1.5;
    }

    .waypoint.done {
      fill: var(--diagram-teal);
    }

    .waypoint.current {
      fill: var(--diagram-mint);
    }

    .waypoint-number {
      fill: var(--diagram-ink);
      font-size: 16px;
      font-weight: 700;
    }

    .waypoint-number.dark {
      fill: #00201c;
    }

    .waypoint-link,
    .dial {
      fill: none;
      stroke: var(--diagram-link);
      stroke-width: 2;
    }

    .dial {
      stroke-width: 3;
    }

    .dial-knob {
      fill: var(--diagram-teal);
      stroke: var(--diagram-link);
      stroke-width: 1.5;
    }

    .arrowhead-pink {
      fill: var(--diagram-link);
    }

    .arrowhead-mint {
      fill: var(--diagram-flow);
    }

    .flow {
      fill: none;
      stroke: var(--diagram-flow);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2.5;
    }

    .hint {
      fill: none;
      stroke: var(--diagram-flow);
      stroke-dasharray: 3 5;
      stroke-linecap: round;
      stroke-width: 2;
    }

    .harness {
      fill: none;
      stroke: var(--diagram-flow);
      stroke-dasharray: 10 8;
      stroke-opacity: 0.7;
      stroke-width: 1.5;
    }

    .harness-label-background {
      fill: var(--diagram-background);
    }

    .step.scaffold {
      fill: var(--diagram-scaffold);
    }

    .step.red {
      fill: var(--diagram-red);
    }

    .step.green {
      fill: var(--diagram-green);
    }

    .step.refactor {
      fill: var(--diagram-surface);
      stroke: var(--diagram-ink);
      stroke-dasharray: 6 5;
      stroke-opacity: 0.7;
      stroke-width: 1.5;
    }

    .step-title {
      fill: white;
      font-size: 17px;
      font-weight: 700;
    }

    .step-title.light {
      fill: var(--diagram-ink);
      font-weight: 500;
    }

    .step-subtitle {
      fill: white;
      font-size: 14px;
    }

    .chip {
      fill: var(--diagram-surface);
      stroke: var(--diagram-outline);
      stroke-width: 1;
    }

    .foundation {
      fill: var(--diagram-foundation);
      stroke: var(--diagram-flow);
      stroke-width: 1.5;
    }

    .chip-title {
      fill: var(--diagram-ink);
    }

    /* The week tags look like the pill of the banner. */
    .week rect {
      fill: var(--diagram-tag-background);
      stroke: var(--diagram-tag-outline);
      stroke-width: 1;
    }

    .week text {
      fill: var(--diagram-tag-text);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-anchor: middle;
    }

    /* The same content as stacked blocks, for small screens. */
    .stacked {
      display: none;
      flex-direction: column;
      gap: 2.25rem;
      max-width: 520px;
      margin: 0 auto;
      padding: 0;
      color: var(--diagram-ink);
      list-style: none;
    }

    .block,
    .part {
      border: 1px solid var(--diagram-outline);
      border-radius: 16px;
      background: var(--diagram-surface);
    }

    .block {
      position: relative;
      padding: 1rem 1.1rem 1.1rem;
    }

    /* An arrow from each block to the next. */
    .block + .block::before {
      position: absolute;
      top: -1.9rem;
      left: 50%;
      transform: translateX(-50%);
      color: var(--diagram-flow);
      content: '↓';
      font-size: 1.25rem;
    }

    .block.harness {
      border: 1.5px dashed
        color-mix(in srgb, var(--diagram-flow) 70%, transparent);
      background: none;
    }

    .part {
      margin-top: 0.75rem;
      padding: 0.75rem 0.9rem;
      border-radius: 12px;
    }

    .part.foundation {
      border-color: var(--diagram-flow);
      background: var(--diagram-foundation);
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    h3,
    h4 {
      margin: 0;
      font-weight: 700;
      line-height: 1.3;
    }

    h3 {
      font-size: 1.15rem;
    }

    h4 {
      font-size: 1rem;
    }

    p {
      margin: 0.5rem 0 0;
      font-size: 0.95rem;
      line-height: 1.5;
      opacity: 0.85;
    }

    .week-tag {
      flex: none;
      padding: 0.2rem 0.6rem;
      border: 1px solid var(--diagram-tag-outline);
      border-radius: 9999px;
      background: var(--diagram-tag-background);
      color: var(--diagram-tag-text);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .steps {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1.5rem;
      margin: 0.75rem 0 0;
      padding: 0;
      list-style: none;
    }

    .steps li {
      position: relative;
      padding: 0.35rem 0.7rem;
      border: 1px solid var(--diagram-outline);
      border-radius: 8px;
      background: var(--diagram-surface);
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* The arrow follows its step, so that a wrapped line never starts with one. */
    .steps li:not(:last-child)::after {
      position: absolute;
      right: -1.3rem;
      color: var(--diagram-flow);
      content: '→';
    }

    .steps li.scaffold {
      border-color: transparent;
      background: var(--diagram-scaffold);
      color: white;
    }

    .steps li.red {
      border-color: transparent;
      background: var(--diagram-red);
      color: white;
    }

    .steps li.green {
      border-color: transparent;
      background: var(--diagram-green);
      color: white;
    }

    .steps li.refactor {
      border-style: dashed;
      border-color: color-mix(in srgb, var(--diagram-ink) 70%, transparent);
    }

    @media (max-width: 899.98px) {
      svg {
        display: none;
      }

      .stacked {
        display: flex;
      }
    }
  `,
})
export class CohortRouteDiagram {}
