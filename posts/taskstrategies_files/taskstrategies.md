---
squisq-outside-in: 1
squisq-output: ../taskstrategies.html
squisq-output-format: html
squisq-updatefrommarkdown: true
squisq-html-output: static
squisq-transform: dynamic-slides
---

## Building a Couch: Lessons in AI Organizational Design

[Gezel](https://gezel.com) is based on the idea of putting people in control of their AI by harnessing the power of local models. While frontier models are powerful and can do very sophisticated work, local models have a noticeably lower plateau on the complexity of tasks they can undertake. Nevertheless, local models have a number of advantages over frontier models (cost; privacy; control). We believe, with the right set of supports, local models are good enough to do many common knowledge worker tasks (e.g., reviewing docs; transcribing audio; monitoring inboxes; data analysis). In a recent test of [local models for document tasks](https://bendyline.com/posts/docbench.html), they are more than capable for tasks like review.

To maximize capabilities of local models, there is a role for a "local oriented" harness with specific support for local models, with more infrastructure and support to add "catch up" capability to local models. [Gezel](https://gezel.com) is one such local oriented harness. As part of this, we've been trying multiple different ideas ([knowledge](https://bendyline.com/posts/introducingknowledge.html), [night shift](http://bendyline.com/posts/indexingandnightshift.html)) to accommodate these limitations, and with good success. But this essay is about the windy road of the main local-AI facilitating idea: Highly Structured Tasks.

## The Hypothesis: Highly Structured Tasks

One major hypothesis for "local model" support infrastructure is well-thought-through plans - called "craftbooks" in Gezel - for common knowledge worker tasks that are more structured and rigorous equivalents of freeform "skill.md" files. These craftbooks center around a number of phases, with static validation gates, where each phase is a structured session by itself.

For an example, let's take the task of "Write a research document about superconductors". A craftbook breaks down that request into a "recipe" of several steps:

1. Assemble sources and review the research
2. Build an outline of the research document
3. Write the document based on the outline
4. Review the document (fact check)
5. Export the document to a finalized package

For each of these steps, Gezel will assign an agent of human-esque roles for these: a "researcher" for step 1, a "writer" for steps 2 and 3, a "reviewer "for step 4, and back to the writer for step 5. Each step is its own independent session so that context can be kept narrow. Having independent roles allows us to keep models very focused on task - a researcher only needs to find quality sources and produce summarizations; the writer only needs to focus on coherent prose; the reviewer only needs to find bugs. This makes the prompt (system prompt + toolset) for these models very tight and focused, and workable in small context sizes (32K tokens, say).

On top of this, craftbooks layer on a concept of step gates (static checks) to keep models honest - for example, a model couldn't pass the Outline phase until it had a file called [outline.md](http://outline.md) that was at least, say, 3kb large (i.e., it had some substance.) A model was sent back to the drawing board within the phase if it didn't meet fixed criteria from a growing library of criteria.

There are two obvious downsides to this structure: "wall clock time" to get jobs complete could rise significantly because of per-step rework (spinning in a step). Also, for local models, reloading a prompt (prefill) at every step change can add 1-3 minutes per step before any results are delivered. The other downside: it would take a lot of tweaking and testing to build a system of step gates (exit criteria) that did more help than harm. But if it improves product quality by, say, 20%, maybe these tradeoffs are worth it.

On paper, this seemed like good working hypothesis for a system that can boost local model efficacy. Also, this is not a new idea; in 2024/early 2025 similar "role based frameworks" were built for frontier models but that were left by the wayside as models like Opus became more... omniscient. However, maybe local models running in less than 32gb of RAM, by virtue of size, are closer to that early 2025 world than the frontier of late 2026.

So "stepwise, crew design" is (spoilers: was) a core part of the design of Gezel.

We've been way overdue to test this strategy out. Now is the time to see: does this step by step framework produce better results? Does it earn its place? Is it a load bearing assumption that bears the load?

## What we compared

To test this, we outlined several different strategies for achieving medium to large tasks. These strategies differ in terms of how tasks are divided up, and where they are tested. Running tasks "step by step", with roles per step, is/was the default of Gezel based on the logic above.

Before we describe these strategies, we should introduce the concept of a "contract". A contract is a specification of what the final outputs should be oriented around: the goal, the deliverables, and a quality bar of criteria the runtime can check (e.g., a section exists, the tests pass, every cited figure appears in its source).

Here is what an example contract looks like for a "build a runbook" task (where a "runbook" is an engineering checklist+manual):

> Goal: An on-call runbook a tired engineer can follow literally: when to use it and when not to, prerequisites, numbered copy-pasteable steps that each say what to expect and how to verify it, warnings before risky steps, a rollback, and an escalation path.
>
> Deliverables: `runbook.md` — The runbook, in Markdown.
>
> Quality bar: The runbook is a complete document organized under headings
> [checked] · It says when to use it and when not to
> [checked] · It lists prerequisites (access, tools, safety checks) before the procedure
> [checked] · The procedure is written as numbered steps
> [checked] · Commands are written out exactly in code formatting
> [checked] · It has a rollback section
> [checked] · It has an escalation section
> [checked] · Steps say what output to expect and how to verify each one worked
> [checked] · Risky or destructive steps carry a warning before them
> [checked] · Nothing is left unfinished: no TBD, TODO or FIXME
> [checked] · Each step is unambiguous and in order
> […] · Commands, thresholds, names and contacts come from what the person supplied […]
>
> The runtime checks the [checked] items before the task can finish and names anything unmet.


As an analogy, you could compare these strategies to paths for assembling Ikea furniture: you buy furniture (e.g., a couch) and it comes "assembly required" in a tight flatpack box. You need to assemble it from dozens of assorted pieces (wood crossbars and slats; screws, dowels).

In the real world, this Ikea furniture is also accompanied by a picture on the box and dimensions (you know what the end goal looks like) -- the "contract", if you will -- and it also has a multi-step instruction guide. You can see in the table below how each strategy analogizes to a strategy for assembling Ikea furniture.

| Strategy | Who works | What the model is told | What is checked | Analogy as an Ikea couch assembly scenario |
| --- | --- | --- | --- | --- |
| Step by step <br>(the Gezel default) | A specialist per step (e.g., a planner, writer, reviewer), each in a fresh conversation | One step's instructions at a time | Each step's own gate, then a final review | A team of experts - dowel fitters, screwdriver masters, and so on - reads an Ikea manual and divides up the work. After each step, the results are tested for conformance. The final couch is also tested. |
| One owner, whole recipe | One gezel (with a general role type and a union of tools), one conversation | Every step, in order | Every step's gate | An individual reads and sticks to the Ikea manual and does all the steps by them self. After each step, the results are tested for conformance. |
| Goal, recipe as advice | One gezel, one conversation | The end-state contract, plus the recipe as optional advice | The end-state contract only | An individual is shown a picture of the finished product, and is shown the manual. They don't need to follow the manual, though. The final product is tested and judged. |
| Goal only | One gezel, one conversation | The end-state contract | The end-state contract only | An individual is shown a picture of the finished couch. The final product is tested and judged. |
| Request only ("just a prompt") | One gezel, one conversation | The person's request; no contract | Nothing until grading | An individual is just told to build a couch. The final product is judged |
| Contract shown, not checked ("just a prompt + expected end state) | One gezel, one conversation | The end-state contract | Nothing until grading | An individual is given the manual. The final product is judged |
| pi | pi 1.4.0, an outside agent tool | The request, and the project's description and objectives | Nothing until grading | pi is told to build a couch. The final couch is judged |
| OpenCode | OpenCode 1.19.4, an outside agent tool | The request, and the project's description and objectives | Nothing until grading | OpenCode is told to build a couch. The final couch is judged |


## Strategy Results

For the primary round, we measured 18 craftbooks across research, coding, data, and multi-deliverable areas, across four strategies and three models, for a total of 504 trials. This was run on an nvidia DGX Spark using llama.cpp. Models ran with at least 128k context size, and no test hit that limit.

| Model | Strategy | Passed | Criteria met | Quality | Wall Clock Time (median min) |
| --- | --- | --- | --- | --- | --- |
| Gemma 4 E4B | step by step (old Gezel default) | 17/36 | 0.83 | 4.75 | 4.6 |
|   | one owner, whole recipe | 12/36 | 0.81 | 4.89 | 3.8 |
|   | goal, recipe as advice | 18/36 | 0.88 | 5.58 | 2.5 |
|   | goal only (new Gezel default) | 18/36 | 0.89 | 5.47 | 1.6 |
| Qwen 3.5 9B | step by step<br>(old Gezel default) | 16/36 | 0.94 | 5.41 | 6.0 |
|   | one owner, whole recipe | 23/36 | 0.96 | 5.87 | 4.4 |
|   | goal, recipe as advice | 18/36 | 0.95 | 5.64 | 1.9 |
|   | goal only (new Gezel default) | 23/36 | 0.96 | 5.93 | 1.6 |
| Qwen 3.8 27B | step by step (old Gezel default) | 50/54 | 0.99 | 7.92 | 13.8 |
|   | one owner, whole recipe | 44/54 | 0.99 | 7.83 | 15.8 |
|   | goal, recipe as advice | 47/54 | 0.99 | 8.03 | 5.8 |
|   | goal only(new Gezel default) | 50/54 | 0.99 | 7.90 | 4.4 |


Here are some of the (surprising) results:

- **On small on-device models, giving the model the goal and the quality bar beats walking it through the steps.** Pooled over every round, Qwen 3.5 9B finished 59 of 90 tasks this way against 39 of 90 step by step (+22 points, 95% interval +9 to +36). Gemma 4 E4B went from 33 to 42 of 78. Judged quality rose by 0.6 to 0.9 points out of 10, with intervals above zero.
- **On a larger model, quality is the same either way, and the goal-only run is three times faster.** Qwen 3.8 27B passed 56 of 60 against 55 of 60, with judged quality within ±0.3 points, at 0.34× the wall time.
- **Across all three models, 157 of 228 tasks passed goal-only against 127 step by step** (+13 points, 95% interval +5 to +22). The gain sits in code, data and multi-deliverable work. On research documents and operations writing, quality was the same either way overall. Two books went the other way: the slide deck, where small models without the recipe often never produced the PowerPoint file, and the press release.
- **Every on-device model was faster without the recipe:** 0.16× to 0.35× the wall time of step-by-step runs, reading a fifth to a quarter of the input tokens.
- **The quality bar is what helps, not the recipe.** Hiding the bar and giving only the request cost 22 to 31 points of pass rate and about one judged point on every model. Handing over the recipe as advice on top of the bar added nothing measurable, and made runs 1.3 to 1.4 times slower.


**Why does less structure help a small model?** The trial records point to four things:

- A step-by-step run is a relay: each step starts a fresh conversation that knows only what earlier steps wrote to files, so a fact the planner noted but the writer never opened is lost.
- Each step also has its own gate with a limited number of attempts before the task is judged a failure, and small models blow through those attempts quickly, frequently on minutiae (getting a file name slightly wrong). In some cases, these gates were bugged or just too strict (but we've been evolving gates over many months, pointing at how hard it is to get the balance of helpful-but-not-too-strict just right)
- Every hand-off costs a full system prompt and tool list again, which is where the extra time and tokens go.
- A goal-based owner keeps everything in one conversation and stops when the contract is met.


## Moving to a new strategy for Gezel

Based on the results above, we're moving away from "stepwise" task completion and onto a simpler goal/"contract evaluation" format form models, across the board. We still think there is a strong role for "craftbooks" as a repository of canonical "contracts" for common tasks coupled with prompts; the recipe of a structured set of steps to accomplish goals is less useful. So, we've begun retrofitting all craftbooks with good, tested contract definitions.

One other note where "role-based" execution can still come into play is review. Having an explicit review phase after significant work is done (writing content; doing coding tasks) can help improve overall outcomes. While we're converting most models to use the "one giant end to end session" to complete tasks, we're still considering and adding an explicit "review phase" at the end, where a model can provide feedback to itself and iterate further. We're also testing whether those review sessions should just be additional steps at the end (within a session, ask the model to review itself) or "fresh eyes" evaluations (spin up a separate independent session for a model to review and judge, then send feedback to the original session). We're still testing, but finding that reviews within a session can still be helpful for tasks.


## Against raw harnesses

One question then: does "just" having a strong goal/contract evaluation really pose a significant value against a "bare harness"? For "bare harness", we consider a mode where a prompt is passed and the results are subjectively judged (e.g., a person decides they like or don't like what the AI model produced) for correctness. This becomes a referendum on the value of Gezel compared to other harnesses which act in that "bare" mode.

So we tested Gezel in "bare harness" mode and compared that with the new goal/strategy mode: just processing prompts the user passes in + some basic context in the form of a system prompt. In addition, we tested similar open harnesses pi and OpenCode that also inherently operate in this bare mode.

**We also tested two other popular harnesses, pi and OpenCode, on how they handle the same request as the message.** To make the comparison equivalent between gezel and OpenCode/pi equivalent, we also had a "+ book description" variant that appended to the tool's own system prompt: the project's description, its mission objectives, and the list of input files and required deliverables that every Gezel arm also gets, in plain words without Gezel's tool names.

| Model | Arm | Passed | Criteria met | Quality | Quality Δ vs goal only | Quality Δ vs request only | Wall (median min) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Qwen 3.5 9B | Gezel, goal only | 12/14 | 0.98 | 6.58 | (control) | +0.48 [−0.04, +1.22] | 1.3 |
|   | Gezel, bare harness | 7/14 | 0.92 | 6.10 | −0.48 [−1.22, +0.04] | (control) | 1.2 |
|   | pi | 8/14 | 0.80 | 5.88 | −0.70 [−2.29, +0.33] | −0.23 [−1.09, +0.37] | 0.7 |
|   | pi + book description | 6/14 | 0.83 | 5.41 | −1.17 [−2.17, −0.21] | −0.69 [−1.70, +0.05] | 1.3 |
|   | OpenCode | 5/14 | 0.69 | 4.64 | −1.94 [−3.27, −0.68] | −1.46 [−2.58, −0.36] | 1.3 |
|   | OpenCode + book description | 6/14 | 0.87 | 6.02 | −0.56 [−1.74, +0.31] | −0.08 [−0.58, +0.45] | 1.4 |
| Qwen 3.8 27B | Gezel, goal only | 13/14 | 0.97 | 7.68 | (control) | +0.14 [−0.71, +0.82] | 4.7 |
|   | Gezel, bare harness | 10/14 | 0.95 | 7.54 | −0.14 [−0.82, +0.71] | (control) | 5.3 |
|   | pi | 10/14 | 0.84 | 7.01 | −0.67 [−1.91, +0.39] | −0.53 [−1.46, +0.30] | 2.4 |
|   | pi + book description | 9/14 | 0.92 | 7.46 | −0.23 [−0.89, +0.58] | −0.08 [−0.29, +0.14] | 4.4 |
|   | OpenCode | 10/14 | 0.89 | 6.99 | −0.70 [−1.86, +0.43] | −0.55 [−1.33, +0.07] | 3.6 |
|   | OpenCode + book description | 9/14 | 0.92 | 7.45 | −0.23 [−0.91, +0.65] | −0.09 [−0.36, +0.13] | 6.2 |

What this shows:

- **Gezel's new "goal tested" default passed more tasks than either outside tool on both models:** 12 of 14 on the 9B against 5 to 8, and 13 of 14 on the 27B against 9 or 10. On the 9B every outside arm's pass-rate interval lies below zero (−29 to −50 points); on the 27B the intervals cross zero. With 14 pairs per cell, no pass/fail difference survives the Holm correction, so as registered this reading is descriptive.
- **With the craftbook's description, the outside tools matched Gezel given only the request on judged quality, except pi on the 9B.** On the 27B both came within a tenth of a point, with narrow intervals; on the 9B OpenCode did too (−0.08), and pi trailed by 0.69 [−1.70, +0.05]. They met slightly fewer of the criteria (0.03 to 0.09 fewer, every interval below zero).
- **Without the description, they trailed further:** pi by 0.23 and 0.53 points, OpenCode by 1.46 and 0.55. The plain arms wrote the invoices as JSON, Markdown or plain text (one run gave its text files a `.pdf` name), where the contract asks for HTML, and on the 9B none of the four plain runs wrote the run summary.
- **The 9B's worst outside-tool failures came from losing track of file paths.** Under OpenCode, one runbook run invented a `/workspace/` folder, failed its one write there, and then read the missing file 228 times until it stopped. A codemod run copied the project's folder path with one word missing, so every edit of the rename missed, and then reported "Done" with nothing changed. Under pi with the description, one run saved the runbook as `source/runbook.md` instead of `runbook.md`. The judge scored these three 0.0 to 0.1. No Gezel trial in this comparison scored below 3.0.
- **pi was the fastest:** 0.58× and 0.51× the goal-only wall time on the 9B and 27B. Plain OpenCode took 1.11× and 0.66×. With the project context description, both tools worked longer on the 27B (0.71× and 1.15×). Decode speed was the same in every arm (63 to 66 tokens a second on the 9B, 28 to 32 on the 27B), so these are differences in work, not in the engine. pi's largest prompt was a third to a half the size of Gezel's (4.6k to 8.2k tokens against 13.5k to 16.6k); OpenCode's was 10.5k to 14.2k.

## A frontier model: Claude Sonnet 5.5

We also ran this test with Claude Sonnet. Gezel ran Sonnet through its own Anthropic API provider; pi and OpenCode each ran it through their own built-in Anthropic provider with their default settings, so nothing of Gezel sat in their path. Gezel ran cloud models "one owner, whole recipe" by default at the time, so that is the control. Passing counts each code book's tests on the final folder, as above.

| Arm | Passed | Criteria met | Quality | Quality Δ vs one owner | Wall (median min) | Cost per task (median) |
| --- | --- | --- | --- | --- | --- | --- |
| Gezel, step by step | 14/14 | 1.00 | 8.11 | −0.05 [−0.25, +0.12] | 2.7 | $0.60 |
| Gezel, one owner, whole recipe | 13/14 | 1.00 | 8.17 | (control) | 1.6 | $0.56 |
| Gezel, recipe as advice | 13/14 | 1.00 | 8.10 | −0.07 [−0.38, +0.27] | 0.8 | $0.13 |
| Gezel, goal only | 14/14 | 1.00 | 8.17 | +0.00 [−0.35, +0.38] | 0.7 | $0.12 |
| Gezel, request only | 10/14 | 0.94 | 7.82 | −0.35 [−0.72, −0.05] | 0.6 | $0.10 |
| pi | 8/14 | 0.83 | 6.90 | −1.26 [−2.73, −0.07] | 0.4 | $0.03 |
| pi + book description | 10/14 | 0.94 | 7.86 | −0.30 [−0.65, −0.02] | 0.4 | $0.03 |
| OpenCode | 9/14 | 0.86 | 7.49 | −0.67 [−1.68, +0.01] | 0.4 | $0.06 |
| OpenCode + book description | 8/14 | 0.92 | 8.07 | −0.10 [−0.34, +0.11] | 0.5 | $0.07 |

Costs are from each tool's own token counts, priced at the rates pi and OpenCode both carry for Sonnet 5.5 ($2 per million input tokens, $2.50 cache writes, $0.10 cache reads, $10 output). Gezel does not separate cache writes from other uncached input, so its figures are upper bounds.

What this shows:

- **On a frontier model the strategy barely matters for quality.** All four Gezel strategies passed 13 or 14 of 14 and scored 8.1 to 8.2. Goal only matched the current cloud default on quality at 0.37× the time and about a fifth of the cost, because a single conversation with only the contract in it reads far less (median 26k uncached input tokens against 161k).
- **Having an output contract matters even here.** Without it, Gezel+Sonnet 5.5 passed 10 of 14 and lost 0.35 points.
- **Given the same information, the outside tools match Gezel without the contract.** With the book description, pi tied Gezel's request-only arm exactly on passes (10 of 14 each) and on quality (+0.04 [−0.27, +0.33]). OpenCode scored a little higher (+0.25 [+0.02, +0.48]) and passed two fewer. Without the description, both trailed: pi by 0.92 points [−2.08, +0.04], OpenCode by 0.33 [−1.38, +0.38].
- **What none of them could do was meet a format only the contract states.** Every failure of Gezel's request-only arm and of pi with the description was a named section the request never asks for: the retrospective's six headings, and a "Skipped clients" heading in the invoice summary. Without the description, the outside tools also wrote the invoices as Markdown; the request names no format, and the contract asks for HTML.
- **The outside tools are much cheaper per task.** Gezel's standing prompt (its character, project and tool descriptions) is large; pi's is small. A goal-only Gezel task cost about $0.12 against pi's $0.03.


## Summary

Asking models to perform tasks in a step-by-step manner, with careful step prescriptions and numerous end-of-step checks, was maybe a good idea but turns out to be too fussy to get right. For small models like Qwen 3.5 9b, step by step presents more opportunities for models to get confused and trip over themselves which outweigh any structured benefits. With higher end models like Qwen 3.8 27B and Sonnet, they can work in any mode and overcome the "paperwork" of step by step mode, but the resultant quality is about the same and it just takes 2-3x "wall clock time".

What does help is having a contract - a specification of what the final outputs should be oriented around including goal, the deliverables, and a quality bar of criteria the runtime can check. Even with more advanced models like Sonnet, it can be a 10+% boost in model efficacy. Having statically and subjectively evaluated contracts and/or an explicit model review phase can still give overall benefits for model outcomes.

In Gezel, future directions are that craftbooks can and will be a conveyance for these contracts.


