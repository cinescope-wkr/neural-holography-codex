# Open Questions

This page collects unresolved questions, research tensions, and recurring gaps that appear across
the neural holography landscape. The goal is not to force one agenda, but to make it easier to see
where important problems are still under-specified, benchmarked unevenly, or split across
communities.

## Why keep this page

- to surface problems that cut across optics, algorithms, display hardware, perception, and learning
- to make open-ended research directions easier to inherit, not just finished papers
- to give contributors a place to suggest missing questions, not only missing references

## Modeling and Representation

- What should count as the most useful intermediate representation for learnable holography: fields, layers, focal stacks, 3D features, or something else?
- Which parts of the physical pipeline should remain analytic, and which parts benefit most from learned or learnable correction?
- How should we compare methods that target different compromises between fidelity, speed, calibration cost, and hardware specificity?

## Display Systems and Hardware

- Which bottlenecks matter most in practice today: SLM limitations, aberrations, etendue, coherence artifacts, power, form factor, or calibration effort?
- How far can compact holographic systems go before algorithmic compensation becomes too hardware-specific to generalize?
- What is the most meaningful way to report display capability across field of view, eyebox, depth range, brightness, and perceptual quality together?

## Perception and Evaluation

- Which reconstruction errors actually matter to human observers, and which metrics still miss those differences?
- How should accommodation, vergence, realism, comfort, and gaze-contingent behavior be evaluated together rather than in isolation?
- What would a convincing perception-aware benchmark for neural holography look like?

## Reproducibility and Benchmarks

- Which papers are genuinely comparable, and which use different data, optical assumptions, targets, or capture setups that make direct comparison misleading?
- What common tasks, datasets, calibration routines, and reporting templates would most improve reproducibility?
- Where are the biggest gaps between papers that are visually impressive and methods that are reusable by other labs?

## Software and Shared Infrastructure

- What reusable open-source layers are still missing for simulation, calibration, optimization, evaluation, and hardware-in-the-loop workflows?
- Which parts of the research stack should become codified tooling instead of being rebuilt paper by paper?
- How can the field lower the barrier for newcomers without flattening the real complexity of optics and display systems?

## Contributing Questions

If a question keeps reappearing across papers, talks, failed reproductions, or lab discussions, it
probably belongs here. Additions are welcome through the usual contribution flow, especially when
you can connect a question to specific subfields, papers, or missing evaluation practice.
