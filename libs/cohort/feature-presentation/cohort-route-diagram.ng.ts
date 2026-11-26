import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The Charted Coding diagram, extended with what the cohort builds around it:
 * tests agents can't cheat, runtime truth, the harness, evaluated skills and the autonomy dial.
 * Each part is tagged with the week that covers it.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-route-diagram',
  template: `
    <div class="scroller">
      <svg
        role="img"
        aria-label="The workflow built during the cohort. A co-designed design doc charts waypoints (week 3). Each waypoint is navigated through scaffold, a failing test, making it pass and refactoring, then the next waypoint (week 3). That loop stands on tests agents can't cheat (week 1), reads runtime truth (week 2) and runs inside a harness (week 4). Agent trajectories feed a retrospective, skills and evals that compound back into the harness (week 5). An autonomy dial goes from hands on helm to autopilot (week 6)."
        viewBox="0 0 1240 700"
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

        <rect class="canvas" width="1240" height="700" rx="28" />

        <!-- CHART. -->
        <rect class="panel" x="30" y="30" width="290" height="350" rx="24" />
        <text class="panel-label" x="54" y="68">CHART</text>
        <g class="week" transform="translate(238 50)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 3</text>
        </g>
        <text class="caption" x="175" y="100" text-anchor="middle">
          co-designed
        </text>
        <rect class="doc" x="54" y="112" width="242" height="70" rx="12" />
        <text class="doc-title" x="175" y="143" text-anchor="middle">
          📝 DESIGN DOC
        </text>
        <text class="doc-subtitle" x="175" y="167" text-anchor="middle">
          Intent &amp; Progress
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
          WAYPOINTS
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
          width="424"
          height="26"
        />
        <text class="flow-label" x="398" y="377">
          ⚓ HARNESS · GUARDRAILS IT CAN'T BYPASS
        </text>
        <g class="week" transform="translate(746 361)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 4</text>
        </g>

        <!-- NAVIGATE. -->
        <rect class="panel" x="376" y="394" width="528" height="216" rx="20" />
        <text class="panel-label" x="396" y="424">NAVIGATE</text>
        <g class="week" transform="translate(500 408)">
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
          SCAFFOLD
        </text>

        <rect
          class="step red"
          x="560"
          y="492"
          width="150"
          height="56"
          rx="10"
        />
        <text class="step-title" x="635" y="516" text-anchor="middle">RED</text>
        <text class="step-subtitle" x="635" y="537" text-anchor="middle">
          Failing Test
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
          GREEN
        </text>
        <text class="step-subtitle" x="813" y="585" text-anchor="middle">
          Make It Pass
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
          REFACTOR
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
          NEXT TEST
        </text>

        <!-- Runtime truth. -->
        <rect class="chip" x="396" y="540" width="150" height="56" rx="10" />
        <text class="chip-title" x="471" y="564" text-anchor="middle">
          👀 RUNTIME TRUTH
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
          🧪 TESTS AGENTS CAN'T CHEAT · FAKES · CONTRACTS
        </text>
        <g class="week" transform="translate(834 629)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 1</text>
        </g>

        <!-- Next waypoint. -->
        <path
          class="flow"
          d="M888 568H950V266H304"
          marker-end="url(#cohort-arrow-mint)"
        />
        <text class="flow-label" x="630" y="254" text-anchor="middle">
          NEXT WAYPOINT
        </text>

        <!-- Autonomy dial. -->
        <rect class="panel" x="1000" y="30" width="210" height="300" rx="24" />
        <text class="panel-label" x="1022" y="68">AUTONOMY DIAL</text>
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
        <text class="small-label" x="1070" y="138">AUTOPILOT</text>
        <text class="caption start" x="1070" y="172">the Charted loop</text>
        <text class="small-label" x="1070" y="290">HANDS</text>
        <text class="small-label" x="1070" y="308">ON HELM</text>

        <!-- Prove it holds. -->
        <rect class="panel" x="1000" y="350" width="210" height="322" rx="24" />
        <text class="panel-label" x="1022" y="388">PROVE IT HOLDS</text>
        <g class="week" transform="translate(1022 400)">
          <rect width="58" height="22" rx="11" />
          <text x="29" y="15">WEEK 5</text>
        </g>
        <rect class="chip" x="1014" y="440" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="463" text-anchor="middle">
          AGENT TRAJECTORIES
        </text>
        <rect class="chip" x="1014" y="496" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="519" text-anchor="middle">
          RETROSPECTIVE
        </text>
        <rect class="chip" x="1014" y="552" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="575" text-anchor="middle">
          SKILLS
        </text>
        <rect class="chip" x="1014" y="608" width="182" height="36" rx="10" />
        <text class="chip-title" x="1105" y="631" text-anchor="middle">
          EVALS
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
    </div>
  `,
  styles: `
    :host {
      --diagram-background: #380030;
      --diagram-panel: #2a0024;
      --diagram-mint: #85f6e5;
      --diagram-pink: #ffd7ef;
      --diagram-teal: #21a293;

      display: block;
    }

    .scroller {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1rem;
      overflow-x: auto;
    }

    svg {
      display: block;
      width: 100%;
      min-width: 760px;
      height: auto;
      font-family: Roboto, 'Helvetica Neue', sans-serif;
    }

    .canvas {
      fill: var(--diagram-background);
    }

    .panel {
      fill: var(--diagram-panel);
    }

    .panel-label,
    .small-label,
    .flow-label,
    .chip-title {
      font-weight: 700;
      letter-spacing: 0.12em;
    }

    .panel-label {
      fill: var(--diagram-pink);
      font-size: 17px;
    }

    .small-label {
      fill: var(--diagram-pink);
      font-size: 12px;
    }

    .flow-label {
      fill: var(--diagram-mint);
      font-size: 13px;
    }

    .caption {
      fill: white;
      font-size: 13px;
      font-style: italic;
    }

    .caption.start {
      fill: var(--diagram-pink);
    }

    .doc {
      fill: white;
    }

    .doc-title {
      fill: #380030;
      font-size: 19px;
      font-weight: 700;
    }

    .doc-subtitle {
      fill: #6b7280;
      font-size: 14px;
      font-style: italic;
    }

    .waypoints {
      fill: rgba(255, 255, 255, 0.08);
      stroke: var(--diagram-pink);
      stroke-dasharray: 8 6;
      stroke-opacity: 0.6;
      stroke-width: 1.5;
    }

    .waypoint {
      fill: var(--diagram-panel);
      stroke: white;
      stroke-width: 1.5;
    }

    .waypoint.done {
      fill: var(--diagram-teal);
    }

    .waypoint.current {
      fill: var(--diagram-mint);
    }

    .waypoint-number {
      fill: white;
      font-size: 16px;
      font-weight: 700;
    }

    .waypoint-number.dark {
      fill: #00201c;
    }

    .waypoint-link,
    .dial {
      fill: none;
      stroke: var(--diagram-pink);
      stroke-width: 2;
    }

    .dial {
      stroke-width: 3;
    }

    .dial-knob {
      fill: var(--diagram-teal);
      stroke: var(--diagram-pink);
      stroke-width: 1.5;
    }

    .arrowhead-pink {
      fill: var(--diagram-pink);
    }

    .arrowhead-mint {
      fill: var(--diagram-mint);
    }

    .flow {
      fill: none;
      stroke: var(--diagram-mint);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 3;
    }

    .hint {
      fill: none;
      stroke: var(--diagram-mint);
      stroke-dasharray: 3 5;
      stroke-linecap: round;
      stroke-width: 2;
    }

    .harness {
      fill: none;
      stroke: var(--diagram-mint);
      stroke-dasharray: 10 8;
      stroke-width: 2;
    }

    .harness-label-background {
      fill: var(--diagram-background);
    }

    .step {
      stroke: white;
      stroke-width: 1.5;
    }

    .step.scaffold {
      fill: #00507f;
    }

    .step.red {
      fill: #ee220c;
    }

    .step.green {
      fill: #1db100;
    }

    .step.refactor {
      fill: #263238;
      stroke-dasharray: 6 5;
    }

    .step-title {
      fill: white;
      font-size: 17px;
      font-weight: 700;
    }

    .step-title.light {
      font-weight: 400;
    }

    .step-subtitle {
      fill: white;
      font-size: 14px;
      font-style: italic;
    }

    .chip {
      fill: rgba(255, 255, 255, 0.08);
      stroke: rgba(255, 215, 239, 0.4);
      stroke-width: 1;
    }

    .foundation {
      fill: rgba(133, 246, 229, 0.12);
      stroke: var(--diagram-mint);
      stroke-width: 1.5;
    }

    .chip-title {
      fill: white;
      font-size: 12px;
    }

    .week rect {
      fill: var(--diagram-mint);
    }

    .week text {
      fill: #00201c;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-anchor: middle;
    }
  `,
})
export class CohortRouteDiagram {}
