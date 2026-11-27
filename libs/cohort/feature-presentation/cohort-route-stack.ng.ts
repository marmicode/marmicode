import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The content of `mc-cohort-route-diagram` as stacked blocks, for small screens,
 * where the drawing would be too small to read.
 *
 * It only shows on small screens, and reads its colors from the diagram's custom properties.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-route-stack',
  template: `
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
        <p>From hands on helm to autopilot.</p>
      </li>
    </ol>
  `,
  styles: `
    :host {
      display: none;
    }

    .stacked {
      display: flex;
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
      :host {
        display: block;
      }
    }
  `,
})
export class CohortRouteStack {}
