# ExecPlan Specification

<mission>
An ExecPlan is a self-contained execution specification that allows a stateless coding agent or a human novice to implement, validate, and resume a feature or system change using only:
- the current working tree, and
- the ExecPlan file itself.

The reader must not need prior plans, prior chat context, architecture documents, or external links to succeed.
</mission>

<core_requirements>
Every ExecPlan must satisfy all of the following:

1. Self-contained
   - It contains all context, definitions, assumptions, instructions, and validation steps required to complete the work.
   - If knowledge is required, explain it in the plan in plain language.
   - Do not rely on external blogs, docs, or prior conversation.

2. Novice-guiding
   - Treat the reader as unfamiliar with the repository.
   - Name repository-relative file paths, modules, functions, commands, and expected outputs explicitly.
   - Define every non-ordinary technical term immediately in plain language.

3. Outcome-focused
   - The plan must produce demonstrably working behavior, not merely code changes.
   - Describe what a user can do after the change that they could not do before.
   - Describe exactly how to observe the behavior working.

4. Living document
   - The plan must be updated as work progresses, discoveries occur, and decisions are made.
   - At every stopping point, the plan must reflect current reality.
   - A future contributor must be able to restart using only the latest version of the ExecPlan.

5. Behavior-verifiable
   - The plan must include exact commands to run, where to run them, and what to expect.
   - Acceptance must be phrased as observable behavior, not internal implementation details.
     </core_requirements>

<relationship_to_plans_md>
If `PLANS.md` exists in the repository, read it fully before authoring or executing an ExecPlan.
The ExecPlan must:

- reference the repository-relative path to `PLANS.md`,
- state that the plan must be maintained in accordance with it,
- incorporate any required conventions directly into the ExecPlan where needed for self-containment.

Do not assume the reader has separately read `PLANS.md`.
If a rule from `PLANS.md` matters for correct execution, restate it in the ExecPlan.
</relationship_to_plans_md>

<authoring_rules>
When authoring an ExecPlan:

- Start from the canonical skeleton in this specification.
- Read the relevant source files thoroughly before writing the plan.
- Re-read source material when uncertainty remains.
- Prefer concrete repository evidence over guesswork.
- Resolve ambiguity in the plan instead of outsourcing decisions to the reader.
- Prefer the smallest correct implementation path unless the work explicitly requires broader restructuring.
- When requirements are risky or unclear, include prototyping milestones that prove feasibility before full implementation.

When the plan depends on an earlier checked-in ExecPlan:

- reference it by repository-relative path, and
- restate all required context in the current plan unless the referenced file is guaranteed to remain available and sufficient to a novice reader.

If the earlier plan is not checked in, include all relevant context directly.
</authoring_rules>

<execution_rules>
When implementing from an ExecPlan:

- Do not ask for “next steps”; continue to the next milestone.
- Keep the plan up to date continuously.
- Update `Progress` at every stopping point.
- Split partially completed work into explicit done/remaining entries instead of leaving status ambiguous.
- Resolve ambiguities autonomously and record the resolution in `Decision Log`.
- Commit frequently when working in a version-controlled repository.
- Keep the document self-contained after every revision, not just at the end.
  </execution_rules>

<discussion_and_revision_rules>
When discussing or revising an ExecPlan:

- Record substantive decisions in `Decision Log`.
- Record unexpected findings in `Surprises & Discoveries`.
- Record major outcomes and remaining gaps in `Outcomes & Retrospective`.
- When the plan changes, update all affected sections so the document remains internally consistent.
- Add a note at the bottom of the plan describing what changed and why.

A plan is invalid if one section reflects a newer understanding than the others.
</discussion_and_revision_rules>

<format_contract>
Formatting is strict.

If the ExecPlan is being presented inline in chat, it must be emitted as exactly one fenced code block labeled `md`.

If the ExecPlan is being written to a `.md` file whose entire contents are the ExecPlan, omit the outer triple backticks.

Inside the ExecPlan:

- do not nest triple-backtick fences,
- use indented blocks for commands, transcripts, patches, examples, and code,
- use Markdown headings with `#`, `##`, and deeper levels as needed,
- place two blank lines after every heading,
- use valid ordered and unordered list syntax.

Style rules:

- write in plain prose,
- prefer prose over long bullet lists,
- avoid tables unless they materially improve clarity,
- avoid checklists except in `Progress`, where checkboxes are mandatory.
  </format_contract>

<writing_rules>
Use plain English and define jargon immediately.

If you use a term such as:

- daemon,
- middleware,
- RPC,
- gateway,
- filter graph,
  or any repository-specific abstraction,
  you must:
- define it in simple language,
- explain where it appears in this repository,
- name the relevant files, commands, or modules.

Do not write:

- “as defined previously,”
- “see the architecture doc,”
- “follow the existing pattern” without naming the pattern precisely.

Repeat important assumptions instead of relying on reader memory.
</writing_rules>

<anti_failure_rules>
Avoid these common failure modes:

- Do not write a plan that only describes code edits without describing user-visible effects.
- Do not rely on undefined jargon.
- Do not leave key design choices for the reader to make.
- Do not make acceptance depend only on successful compilation.
- Do not point vaguely to “the service layer” or “the model” without exact file/module names.
- Do not omit recovery steps for risky or partially repeatable operations.
- Do not assume the executing agent remembers earlier milestones or prior plans.
  </anti_failure_rules>

<observable_outcomes>
Anchor the plan in observable behavior.

The plan must explain:

- what the user can do after implementation,
- what exact commands to run,
- what outputs, logs, responses, or UI behavior to observe,
- how to distinguish success from failure.

Preferred acceptance examples are behavioral, such as:

- starting the server and receiving HTTP 200 with a specific response body,
- running a CLI command and seeing a specific line in output,
- executing a test that fails before the change and passes after it.

If the change is internal, explain how its effect is still demonstrated:

- through tests,
- through a small end-to-end scenario,
- through logs or output,
- through a reproducible before/after comparison.
  </observable_outcomes>

<repository_context_rules>
Repository context must be explicit.

For every meaningful change:

- name files by full repository-relative path,
- name modules, classes, functions, handlers, routes, or scripts precisely,
- state where new files should be created,
- explain how touched areas relate to each other when multiple subsystems are involved.

For commands:

- provide the working directory,
- provide the exact command line,
- state environment assumptions,
- provide alternatives when environment-specific variation is likely.

Do not use vague directions such as:

- “update the backend,”
- “modify the parser,”
- “add tests in the usual place.”
  </repository_context_rules>

<safety_and_idempotence>
ExecPlans must be safe to execute repeatedly where practical.

- Prefer additive, testable steps.
- If a step is idempotent, say so.
- If a step may partially fail, explain how to retry safely.
- If a step is destructive, explain backups, rollback, or safe fallback behavior.
- Keep the environment clean after completion whenever possible.

The reader should know how to recover from interruption without guessing.
</safety_and_idempotence>

<validation_requirements>
Validation is mandatory.

Every ExecPlan must include:

- test commands,
- system startup or execution instructions when applicable,
- a concrete scenario that exercises the change,
- expected outputs or observations,
- failure signals that indicate the implementation is incomplete or wrong.

Testing guidance must be specific to the project’s toolchain.
Where useful, state:

- the exact new test names,
- which tests fail before the change,
- which tests pass after the change,
- what a successful test summary looks like.
  </validation_requirements>

<evidence_requirements>
Capture concise proof.

When commands produce useful evidence, include short indented examples of:

- terminal output,
- HTTP requests/responses,
- logs,
- file-scoped diffs,
- critical code excerpts.

Examples must be:

- short,
- focused on proving correctness,
- reproducible from the instructions in the plan.

Do not paste large blobs when a small excerpt proves the point.
</evidence_requirements>

<milestone_rules>
Milestones are narrative and independently verifiable.

Each milestone must describe:

- the goal,
- what new capability will exist after the milestone,
- the files and edits involved,
- the commands to run,
- the acceptance evidence to observe.

Each milestone must incrementally advance the overall goal.
A milestone is not valid unless a reader can complete it and verify it on its own.

Milestones and progress are different:

- milestones tell the implementation story,
- progress tracks fine-grained completion status.

Both must exist.
</milestone_rules>

<prototyping_rules>
Prototyping milestones are encouraged when they reduce risk.

Acceptable prototypes include:

- toy implementations,
- isolated feasibility spikes,
- temporary low-level adapters,
- parallel implementations used to compare behavior or performance.

Prototype rules:

- clearly label the milestone as prototyping,
- describe exactly how to run and observe it,
- state the criteria for keeping, promoting, or discarding it,
- keep prototypes additive and testable.

Parallel implementations are acceptable during migration if they reduce risk.
If both old and new paths coexist temporarily, the plan must describe:

- how to validate each path,
- how to retire the old path safely,
- what tests protect the transition.
  </prototyping_rules>

<required_sections>
Every ExecPlan must contain all of the following sections, with these exact names:

- `Purpose / Big Picture`
- `Progress`
- `Surprises & Discoveries`
- `Decision Log`
- `Outcomes & Retrospective`
- `Context and Orientation`
- `Plan of Work`
- `Concrete Steps`
- `Validation and Acceptance`
- `Idempotence and Recovery`
- `Artifacts and Notes`
- `Interfaces and Dependencies`

These sections are mandatory.
</required_sections>

<section_requirements>

## Purpose / Big Picture

Explain in a few sentences:

- why the work matters,
- what a user can do after the change,
- how to see it working.

This section must be outcome-first, not implementation-first.

## Progress

This section must use checkboxes and timestamps.

Requirements:

- every stopping point must be recorded,
- partial work must be split into completed vs remaining parts,
- the section must always reflect the actual current state.

Example format:

- [x] (2025-10-01 13:00Z) Added request parsing to `server/http/health.ts`.
- [ ] Add end-to-end validation for `/health`.
- [ ] Partial: wired route registration; remaining: response body assertion and docs update.

## Surprises & Discoveries

Record unexpected findings that materially shaped implementation, such as:

- hidden constraints,
- optimizer behavior,
- library quirks,
- test flakiness,
- undocumented repository conventions,
- surprising runtime behavior.

Each entry should include concise evidence.

Example format:

- Observation: The cache layer bypasses middleware for HEAD requests.
  Evidence: `pnpm test cache-head.spec.ts` fails before route normalization and passes after.

## Decision Log

Record each substantive design or implementation decision.

Required format:

- Decision: Use route-local validation instead of a shared parser.
  Rationale: The shared parser assumes JSON payloads, but this endpoint accepts plain text.
  Date/Author: 2025-10-01 / agent-name

If implementation changes direction, record the change and why.

## Outcomes & Retrospective

At major milestones and at completion, summarize:

- what was achieved,
- what remains,
- what was learned,
- how the result compares with the original purpose.

This section must help a future contributor understand current status quickly.

## Context and Orientation

Assume the reader knows nothing.

Describe:

- the current architecture relevant to this task,
- the important files and modules,
- how the touched parts interact,
- any repository-specific terminology needed to follow the plan.

Do not refer to earlier plans for essential context.

## Plan of Work

Describe the intended implementation sequence in prose.

For each meaningful edit:

- name the file,
- name the location within the file when possible,
- describe what to add, remove, or modify,
- explain why that edit is necessary.

Keep it concrete and minimal.

## Concrete Steps

Provide exact commands and working directories.

When useful, include short expected transcripts as indented examples.

This section must be updated as work proceeds if the implementation path changes.

## Validation and Acceptance

Describe exactly how to verify success.

Acceptance must be framed as observable behavior with concrete inputs and outputs.

When tests are involved, state the exact commands and expected summary.

Example:

- run `pnpm test health.spec.ts` from repository root,
- expect the new test `returns OK from /health` to fail before the implementation and pass after,
- after starting the app, visiting `http://localhost:8080/health` returns HTTP 200 with body `OK`.

## Idempotence and Recovery

Explain:

- which steps are safe to repeat,
- how to recover from half-completed work,
- how to roll back or retry risky steps.

## Artifacts and Notes

Include the most important short snippets that prove correctness:

- command transcripts,
- representative diffs,
- short log excerpts,
- tiny code fragments.

Keep this section concise.

## Interfaces and Dependencies

Be prescriptive.

Name the required:

- libraries,
- modules,
- services,
- types,
- interfaces,
- traits,
- function signatures,
- routes,
- commands,
  or other external/internal contracts that must exist at the end.

Prefer stable fully qualified names when possible.
Examples:

- `crate::planner::Planner`
- `app/server/routes/health.ts`
- `package.submodule.Interface`
  </section_requirements>

<canonical_skeleton>
Use this skeleton when drafting a new ExecPlan:

    # <Short, action-oriented title>

    This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

    If `PLANS.md` exists, this plan must cite its repository-relative path and remain consistent with it.

    ## Purpose / Big Picture

    Explain what the user gains, why it matters, and how to observe it working.

    ## Progress

    - [ ] (YYYY-MM-DD HH:MMZ) Initial placeholder entry.
    - [ ] Add implementation steps here as work progresses.

    ## Surprises & Discoveries

    - Observation: None yet.
      Evidence: N/A.

    ## Decision Log

    - Decision: Initial plan drafted.
      Rationale: Establish a self-contained implementation path before editing code.
      Date/Author: YYYY-MM-DD / <author>

    ## Outcomes & Retrospective

    Note major outcomes, remaining gaps, and lessons learned here.

    ## Context and Orientation

    Describe the current repository context as if the reader is entirely new to it.

    ## Plan of Work

    Describe the intended sequence of edits in prose, naming files and code locations precisely.

    ## Concrete Steps

    State the exact commands to run, from which working directory, and what they should output.

    ## Validation and Acceptance

    Describe the exact observable behavior, test results, and user-facing evidence required for acceptance.

    ## Idempotence and Recovery

    Explain which steps are safe to repeat and how to recover from failures or partial completion.

    ## Artifacts and Notes

    Include concise transcripts, diffs, code excerpts, or logs that prove success.

    ## Interfaces and Dependencies

    Specify the required interfaces, modules, services, libraries, and function signatures that must exist by the end.

</canonical_skeleton>

<revision_rule>
Whenever an ExecPlan is revised:

- update all affected sections for consistency,
- preserve self-containment,
- add a note at the bottom describing what changed and why.

The plan must explain not only what to do, but why those steps are correct.
</revision_rule>

<quality_bar>
The standard is not “good enough to compile.”
The standard is:

A single stateless agent or a human novice can read the ExecPlan from top to bottom, perform the work, verify the result, recover from interruptions, and continue later without any hidden context.

That is the bar:

- self-contained,
- self-sufficient,
- novice-guiding,
- outcome-focused,
- behavior-verifiable.
  </quality_bar>
