---
squisq-outside-in: 1
squisq-output: ../rtxsparkvstheworld.html
squisq-output-format: html
squisq-updatefrommarkdown: true
squisq-html-output: static
---
## RTX Spark vs. the World


This is the first in a series of articles on testing and evaluating local models. These tests compare complete Gezel/model/engine configurations across five computers. They show useful differences in inference speed and memory capacity.

### Enter RTX Spark

Microsoft and NVIDIA recently released the RTX Spark, a Windows-based laptop version of the DGX Spark, which has been available for over a year. Because I needed it for testing Gezel (a Windows arm64 device), I acquired a Lenovo Yoga 9n 2-in-1 RTX Spark laptop. It's the 64 GB model, since that's large enough to run good models but not nearly as expensive as a 128 GB laptop. I was curious - did they do *something* to improve DGX Spark as a platform in the last year, right? The answer seems to be no, not really. Along the way, I used this as an opportunity to review AI performance across diverse devices.

### The Comparison

I wanted to compare the RTX Spark to various higher-end personal computing devices to see how they'd perform. I used a development build of Gezel with native release 0.1.54 across all devices. The llama.cpp revision matched, but the platform builds and backends differed: Metal on Mac, Vulkan on the AMD desktop, and CUDA on the NVIDIA devices, with different CUDA toolkit versions.

- RTX Spark: Lenovo Yoga 9n 2-in-1 - Windows RTX 64 GB - added a second 1 TB PCIe 4 drive - Windows arm64
- DGX Spark: ASUS Ascent GX10 (DGX Spark) - with a replaced 4 TB PCIe 5 drive - Linux arm64
- Best of Mac Laptop: MacBook Pro M5 Max 128 GB - Apple Silicon
- Classic Gaming Laptop: ASUS Zephyrus G14 w/ 12 GB RTX 5070 Ti - Windows x64
- Custom PC Build: AMD Ryzen 9 7950X3D on a Gigabyte B650M AORUS ELITE AX motherboard, 64 GB RAM, AMD Radeon AI PRO R9700 with 32 GB of RAM - Windows x64

The comparison covered the Core, Productivity, Developer, and Complex Work suites, with three repetitions per suite/scenario/model/engine -- see [How We Test Models](https://gezel.com/docs/how-we-test-models/). The R9700 desktop, DGX Spark and RTX Spark each completed 258 attempts; the G14 completed 129 Gemma attempts; and the Mac completed 516 attempts across both models and both engines. Run duration varied by device. The original Mac campaign ran from October 28 to November 2 UTC, with about 135 hours of recorded trial time.

Laptops were on full power the whole time. Laptops and the DGX Spark were put on a table, and laptops were suspended on an open stand so their undersides were also exposed.

Historically and anecdotally, I've seen that laptops are susceptible to thermal throttling, which affects performance. During these extended runs, the devices may have experienced thermal slowdown. In shorter test runs (e.g., one hour), I observe average times that are 20-25% faster, particularly on laptops. Note that the ASUS ROG Zephyrus G14 can get really hot when inference runs, as in: "you can't keep it on your lap" hot.

With Windows and arm64, you do need to make an explicit decision about how much ram to allocate to graphics (AI) vs. the CPU. (on the DGX Spark in Linux and on Mac, it's all just a shared pool). By default, the 64 GB RTX Spark is split 32 GB for GPU and 32 GB for main CPU. I changed the split to 40 GB GPU/24 GB CPU, though I don't think this impacted the testing one way or another - Qwen 3.8 should easily fit in 32 GB of RAM.

### The Punchline: AI Speed

- **The DGX Spark and RTX Spark were in a similar decode-speed range, with the DGX Spark faster on both models and showing higher prefill rates.** For the original RTX Spark configuration, decode was about 26 tok/s for Qwen and 66 tok/s for Gemma, compared with about 29 and 76 on DGX Spark. These measurements do not isolate the effects of operating system, cooling or storage. The differences could be due to Windows vs. Linux, or DGX Spark having 128gb of RAM, or DGX Spark probably having a "cooler" chassis/thermal design, or faster disks, or something else.
- **The MacBook M5 Max was comparable to the Sparks on llama.cpp decode speed, but its recorded prefill was lower.** Using the trial medians below, Qwen prefill was about 31–49% lower and Gemma prefill about 21–36% lower than the two Sparks.
- **On Mac, MLX and llama.cpp had similar Qwen decode speeds.** Qwen was about 28 tok/s on both engines, while Gemma was about 36 on MLX and 72 on llama.cpp. Gemma's MLX configuration lacked an MTP drafter. Recovered MLX prefill observations are higher numerically, but their measurement method differs from llama.cpp's, so they do not establish a directly comparable prefill advantage.
- **The ROG Zephyrus was an unexpected laptop performance leader for Gemma**, at about 1.8× the original RTX Spark configuration's decode speed. This is plausible given its Nvidia dedicated GPU hardware. The Qwen 3.8 27B Q4 configuration cannot fit entirely in its 12 GB of GPU memory, so only Gemma 4 12B was tested. I will also test a highly compressed derivative like Underdog Saluki. This run renewed my appreciation for this gaming laptop -- I want to modelmaxx its 12gb GPU for sure.
- **The R9700 desktop led the recorded decode rates for both models**, reaching about 57 tok/s for Qwen and 129 tok/s for Gemma. Qwen decoded roughly twice as fast as on the Mac and Sparks in this comparison.

| Device and engine | Qwen 3.8 27B Q4 output tok/s | Gemma 4 12B Q4 output tok/s | Qwen 3.8 27B Q4 prefill tok/s | Gemma 4 12B Q4 prefill tok/s |
| --- | --- | --- | --- | --- |
| Windows x64 desktop<br>64 GB, AMD Ryzen 9 7950X3D, AMD Radeon AI PRO R9700<br>llama.cpp + Vulkan | 57.1 | 129.4 | 803.9 | 1265.4 |
| Apple MacBook Pro<br>M5 Max, 128 GB RAM<br>MLX | 28.0 (MTP) | 36.0 (no MTP) | 547.0 (observed\*) | 1084.0 (observed\*) |
| Apple MacBook Pro<br>M5 Max, 128 GB RAM<br>llama.cpp + Metal | 28.5 (MTP) | 71.8 (MTP) | 396.7 | 986.8 |
| Windows x64 laptop<br>32 GB + 12 GB RTX 5070 Ti<br>ASUS ROG Zephyrus G14<br>llama.cpp + CUDA | Not tested: Q4 exceeds GPU memory | 121.2 | Not tested | 1845.7 |
| RTX Spark laptop<br>Lenovo Yoga 9n 2-in-1, 64 GB<br>(40 GB GPU, 24 GB CPU)<br>Windows arm64<br>llama.cpp + CUDA<br>Original configuration only | 26.4 | 66.2 | 577.7 | 1255.6 |
| DGX Spark, 128 GB<br>ASUS GX10 with 4 TB PCIe 5 SSD<br>Linux arm64<br>llama.cpp + CUDA | 28.6 | 76.3 | 779.3 | 1552.1 |

**How these rates are summarized:** Each value is the median of available per-trial rates, including failed and excluded attempts; it is not an average of suite medians or a whole-run tokens/time ratio. R9700, DGX Spark and G14 have 129 measured trials per tested model. Mac has 129 per model/engine, except Qwen MLX decode has 127 available measurements. The RTX Spark speed row uses only the original configuration: 85 Qwen and 84 Gemma attempts. Later Spark segments changed the script sandbox and are not pooled into this speed row. These are observations from different workloads and configurations, not a controlled hardware benchmark.

*\*MLX prefill is a separate kind of observation: rounded first-token diagnostic rates, summarized by taking the median within each trial and then across trials. The recovered values cover all 129 trials per model, but only the provider turns that emitted those diagnostics.*

### **Bugs in Gezel and Eval Judging**

Being a first comprehensive run across devices at one time, some setup defects, differing exclusions and inconsistent artifact judging limit what the pass rates can tell us about hardware or engine quality. The defects affected llama.cpp runs as well as MLX. Engine timings remain useful observations, but missing tools, retries and early termination can change the work performed and the context lengths being measured.

During the run, I encountered some bugs in Gezel and the eval framework:

- Problems also affected llama.cpp runs: required DocBlocks tools were missing, package-script policies prevented some developer tasks from running their tests, sandbox setup failed in some trials, and watchdogs sometimes stopped work while inference was still active. Some acceptance gates also allowed incomplete or incorrect work to pass. These issues affect pass-rate interpretation and can change the workloads behind timing summaries.
- During file recovery operations, where Gezel temporarily constrains tools to force the model to take action, the tools were not restored for Apple MLX. This prevented MLX from completing certain tasks, resulting in a higher fail rate.
- The judge model was not explicitly fixed, causing different devices to use either Codex or Sonnet for judging. This inconsistency means judge evaluations are not comparable across devices. I will fix this in future runs. Therefore, only compare judging scores within the same row.
- For developer tasks, a bug induced by tightening the security model meant some tasks could not be completed due to missing tools.
- For Gemma on Mac, no multi-token prediction (MTP) drafter was registered for MLX, so llama.cpp (with MTP) ran significantly faster than MLX (without MTP).
- For the RTX Spark, the model runner accidentally excluded using the Windows MXC sandbox for a small subset of runs

I've fixed all these for future runs. Sorry about this.

### Pass Rate and Judging

This table shows the relative pass rate of tests. In theory, pass rates for a given scenario and model should be consistent across devices, with a variance of approximately 5%. But per some of the bugs above (missing tools; tools not given to complete activities) the pass rate is a little lower than it should be (in most cases this resulted in models spinning their wheels more than is commonly the case)

|   | Model | Core<br>(%, judge) | Productivity<br>(%, judge) | Developer<br>(%, judge) | Complex Work<br>(%, judge) |
| --- | --- | --- | --- | --- | --- |
| Windows x64 Desktop<br>64 GB, AMD Ryzen 9 7950X3D, AMD Radeon AI PRO R9700<br>llama.cpp + Vulkan | gemma4 12b q4 | 81.8%<br>6.97 | 89.7%<br>5.04 | 40%<br>4.83 | 28%<br>5.53 |
| Apple MacBook Pro <br>M5 Max, 128 GB RAM<br>MLX | gemma4 12b q4 | 66.7%<br>3.42<br>* bug in tests could make these numbers low | 69.2%<br>4.53<br>* bug in tests could make these numbers low | 40%<br>3.54<br>* bug in tests could make these numbers low | 22.2%<br>4.93<br>* bug in tests could make these numbers low |
| Apple MacBook Pro <br>M5 Max, 128 GB RAM<br>llama.cpp + Metal | gemma4 12b q4 | 97%<br>4.25 | 84.6%<br>5 | 40%<br>3.91 | 34.6%<br>5 |
| Windows x64 Laptop<br>32 GB + 12 GB RTX 5070 Ti<br>ASUS ROG Zephyrus G14<br>llama.cpp + CUDA | gemma4 12b q4 | 87.9%<br>4.53 | **97.2%** [1]<br>5.09 | **71.4%** [1]<br>4.47 | 38.5%<br>4.37 |
| RTX Spark Laptop, <br>Lenovo Yoga 9n 2-in-1 64 GB<br>(40 GB gfx, 24 GB main)<br>Windows arm64<br>llama.cpp + CUDA | gemma4 12b q4 | 84.1%<br>4.625 | 84.6%<br>4.395 | 40%<br>3.745 | 43.76%<br>5.65 |
| DGX Spark, 128 GB<br>ASUS GX10 w/ 4 TB PCIe 5 SSD<br>Linux arm64<br>llama.cpp + CUDA | gemma4 12b q4 | 97%, <br>6.88 | 82.1%,<br>7.1 | 46.7% [2]<br>5.47 | 46.2%<br>4.93 |
| Apple MacBook Pro <br>M5 Max, 128 GB RAM<br>MLX | qwen 3.8 27b q4 | 93.9%<br>5.28<br>* bug in tests could make these numbers low | 74.4%<br>5.62<br>* bug in tests could make these numbers low | 63.3%<br>6.11<br>* bug in tests could make these numbers low | 50%<br>5.87<br>* bug in tests could make these numbers low |
| Apple MacBook Pro <br>M5 Max, 128 GB RAM<br>llama.cpp + Metal | qwen 3.8 27b q4 | 100%<br>5.28 | 82.1%<br>6.18 | 66.7%<br>5.72 | 70.4%<br>6.4 |
| RTX Spark Laptop, <br>Lenovo Yoga 9n 2-in-1 64 GB<br>(40 GB gfx, 24 GB main)<br>Windows arm64<br>llama.cpp + CUDA | qwen 3.8 27b q4 | 93.2%<br>5.875 | 84.6%<br>6.59 | 60%<br>5.58 | 37%<br>6.55 |
| DGX Spark, 128 GB<br>ASUS GX10 w/ 4 TB PCIe 5 SSD<br>Linux arm64<br>llama.cpp + CUDA | qwen 3.8 27b q4 | 100%<br>8.23 | 87.2%<br>8.47 | 70%<br>7.92 | 72%<br>6.47 |

**Pass-rate notes:** These percentages use the published eligibility rules for each run; the denominators are not identical across devices. They should not be interpreted as a controlled ranking of hardware or model capability.

- **[1] G14 exclusions:** Productivity is 35/36 = 97.2% after excluding three attempts without required tools; the raw result is 35/39 = 89.7%. Developer is 15/21 = 71.4% after excluding nine attempts without required execution tools; the raw result is 15/30 = 50.0%. Across all four suites, the G14 review excludes 12 tool-blocked attempts and one unevaluable model-authored gate.
- **[2] DGX developer comparison:** The published Gemma result retains nine blocked-script failures: 14/30 = 46.7%. Excluding those nine gives 14/21 = 66.7%. Qwen similarly changes from 21/30 = 70.0% to 21/21 = 100% in that diagnostic subset. These alternative denominators explain much of the apparent G14 developer advantage; they do not replace the original results or make every remaining condition equivalent.
- **R9700 productivity:** Gemma passed 35/39 attempts, giving the 89.7% shown above.
- Missing tools and other framework defects also affected the Mac and Spark runs. Raw outcomes and exclusion reasons remain in the scorecard downloads. The RTX Spark pass-rate rows still summarize segments with different sandbox conditions; unlike its original-configuration speed row above, they are not a single controlled treatment.

### Lenovo Yoga 9n 2-in-1 RTX Spark as hardware

Not that you asked for this, but a quick review of the hardware. In my opinion, I find 16-inch laptops too large, particularly when a numpad offsets the keyboard. The rounded edges give the laptop a plasticky feel, contrasting with the aluminum aesthetic of the MacBook and ASUS Zephyrus. Additionally, the side-mounted power button is easily triggered accidentally when gripping the device.

A significant drawback is the glossy, glare-prone screen. While glossy displays may offer better visual appeal in retail settings, they are less practical for everyday use.

On the positive side, although it shipped with only a 1 TB drive, the two M.2 2242 SSD slots allowed me to install the 1 TB drive from my DGX Spark (which I had upgraded to 4 TB), resulting in a total of 2 TB storage.


### Final Thoughts

I'll always come back to: the first priority should be a machine with enough RAM to run the models you want - for integrated memory machines like the RTX Spark or Macs, that would be something with 48 GB or 64 GB (32 GB is probably slightly too cramped.). For a dedicated GPU (Windows), 32 GB (like the Radeon AI PRO R9700) is ideal though that much DGPU RAM is pricey.

For that reason, if I needed to buy hardware again -- I love the 128 GB Mac (and could happily live with a 64 GB Mac).-- even if it's slower than other laptops here. In my opinion, the perfect laptop hardware pays for the slower prefill times. I also expect we'll see more people squeeze performance out of the Mac in the next 6 months.

But if you prefer the Windows ecosystem and/or All You Care About is Local AI, a 64 GB RTX Spark could be just at a price/performance sweet spot to get a very solid device for running local models. I look forward to spinning a lot of evals on what is inarguably capable hardware.
