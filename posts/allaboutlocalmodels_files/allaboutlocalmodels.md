---
date: 2026-10-27
squisq-outside-in: 1
squisq-output: ../allaboutlocalmodels.html
squisq-output-format: html
squisq-updatefrommarkdown: true
squisq-html-output: static
squisq-output-template: /_templates/post.html
---
## Everything You Need to Know about Local Models


The ideal is that you should never need to know much about local AI models. Apps like Gezel try to, or should try to, autoselect the best possible model for you. But if you're curious, or experimenting, you may want to know a bit more about AI models. You'll want to visit Hugging Face, an industry standard catalog of open models to see what's available.

And when you're going AI model shopping, frequently you'll see that the model name acts like a product label to let you know its technical specs. 

First, it’s key to understand that AI models are categorized as “text-to-text,” “text-to-image” (generating an image from a prompt), or “text-to-video” (generating a video from a prompt). “Text to text” means you provide text, and it returns text—whether that’s a simple answer or something complex. When you see AI doing things, like editing files or sending emails, it's really as simple as a layer on top of text generation: an AI harness like Claude instructs the model to generate formatted sentences (“tools”), and the system executes those commands and delivers the results. 

So, the AI industry boils down to this: you input questions or prompts, the AI model returns some text sentences, and software that wraps that model (a "harness") runs commands based on those sentences.


[https://www.youtube.com/watch?v=gMUBHnmHdyc](https://www.youtube.com/watch?v=gMUBHnmHdyc)

### So what's in a model name?

Take, for example, "Qwen 3.6 35B-A3B-Q4".

*Qwen* is a family of models from Alibaba, and *Qwen 3.6* is a series that came out in April. The "35B" in the name tells you the model has 35 billion parameters, while "Q4" indicates it's been quantized to 4 bits. The "A3B" part is where things get interesting: it signals that this is a "Mixture of Experts (MoE)" model rather than a "Dense" one. Dense models push every token through all of their parameters, whereas MoE models only activate a subset of parameters for each token — in this case, just 3 billion out of the 35 billion are active at any given moment. 

Local AI models tend to be released in families. 2-4 models trained from a single source, on a consistent architecture, offered at different sizes. As an example, Qwen 3.5 release is one such family, and shows us how models can span a range of sizes for different roles. As an aside, note that every model is linked to its page on Hugging Face. Hugging Face ([huggingface.co](http://huggingface.co)) is a website that hosts downloads of available open-source models (now owned by NVIDIA).

Here is the range of models in Qwen 3.5:

| Model | Size | Hardware, Roughly | Tasks passed | Quality | Performance | Memory used |
| --- | --- | --- | --- | --- | --- | --- |
| [qwen3.5-0.8b](https://huggingface.co/Qwen/Qwen3.5-0.8B) | 0.8 billion parameters | Phone | <not tested> |   |   |   |
| [qwen3.5-2b](https://huggingface.co/Qwen/Qwen3.5-2B) | 2 billion parameters | Higher end phone | 6/33 (18%) | 2.7/10 (9 pieces) | 203.3 tok/s output<br>7,605 tok/s prefill | 5.1 GB |
| [qwen3.5-4b](https://huggingface.co/Qwen/Qwen3.5-4B) | 4 billion parameters | Low to Medium PC (no dedicated GPU) | 16/33 (48%) | 5.3/10 (9 pieces) | 153 tok/s output<br>3,349 tok/s prefill | 7.2 GB |
| [qwen3.5-9b](https://huggingface.co/Qwen/Qwen3.5-9B) | 9 billion parameters | Medium PC with dedicated GPU/Mac 16gb RAM | 26/33 (79%) | 5.3/10 (9 pieces) | 122.9 tok/s output<br>2,143 tok/s prefill | 8.9 GB |
| [qwen3.5-27b](https://huggingface.co/Qwen/Qwen3.5-27B) | 27 billion parameters | High End PC with dedicated GPU/Mac 24gb RAM | 30/33 (91%) | 6.4/10 (9 pieces) | 55.9 tok/s output<br>656 tok/s prefill | 22.2 GB |

*(performance measured on a Windows 11 Ryzen 7950X3D + AMD AI Pro 9700)*

Keep in mind that frontier (cloud) models like GPT4 are 1.8 trillion tokens, GLM 5.3 is ~744 billion, Kimi K3 is 2.8T.. so there is a huge size difference between models like ChatGPT's GPT 6.1 Sol and the model that runs on your device.

As you look at this table, do notice that the pass rate of tests varies significantly between a model that can fit on your phone, to a model that can run on a higher end machine; it's the difference between 18% and 91%. Also, models have improved considerably in the past 6 months. But all this to say: even for hardware you personally own, the difference between your newest phone, which can run reasonable models, to a high-end PC (or gaming PC) - is considerable. And also: running local AI that can do things is as at least as within reach as a higher-end laptop or PC is (though unfortunately, all computer hardware is rapidly getting more expensive.)


### What do models know?

Another way to look at this is to test how much models "know" by asking them a series of questions and seeing what they do, when you tell them they have no tools (they can't search the internet, etc.). They just have to recite what's in their brain... just like if I asked you to tell me everything you know about a topic, but took your phone away.

And so I prompted Qwen 3.5 across a range of sizes: 

*Without doing any research or using search tools, can you output a bulleted list of facts and everything in your knowledge about Issaquah, Washington to a file called "*[*Issaquah.md*](http://Issaquah.md)*"?*

Here is a summary of what the models said (**bolded text** may be inaccurate)

#### **Qwen 3.5 2B** {[list]}

- Issaquah is a city in **Pierce County, Washington, USA. It is located approximately 25 miles south of Seattle** and **about 17 miles east of Spokane.**
- The city has a population of approximately **109,873 residents as of the 2020 census.**
- (Coordinates **were for Seatac Airport**)
- Racial Composition: **Approximately 68% White, 12% Asian, 9% Black or African American, 7% Hispanic or Latino**
- Major Companies: **Google (has a presence), Amazon**, Microsoft, Boeing, **and various healthcare organizations**
- Notable Attractions: Issaquah High School, the **Issaquah Community Center,** and the **Issaquah Riverfront Park**
- Hiking Trails: The **Issaquah Trail** offers scenic routes through the city, Dining: Offers a diverse culinary scene including Italian, Asian, and seafood restaurants
- Roads: Well-connected to Interstate 90 **and Interstate 84,** Median Home Price: Approximately $480,000
- Medical Centers: Various clinics and hospitals provide comprehensive medical care
- The city is divided into several neighborhoods including - **Riverfront - A popular residential area with waterfront views, Northwood - Known for family-oriented amenities, Lakeside - A historic neighborhood with a distinctive character, Greenwood - Close to the Issaquah River**

Note the completely fabricated neighborhood names, and the generic made-up things ("Issaquah Riverfront Park")

#### Qwen 3.5 4B {[list]}

- Issaquah is a city in King County, Washington, located in the Cascade Mountains of the Pacific Northwest.
- As of 2023, it has a population of approximately **56,000 residents.**
- **Mount Rainier National Park:** Located just **10 miles north of Issaquah**; one of the most popular destinations in the Pacific Northwest
- Location: Situated in the Cascade Mountains, between Seattle to the northwest and Tacoma to the southeast
- Elevation: Ranges from 150 feet along the **Duwamish River valley floor**
- The name "Issaquah" comes from the **Suquamish word for "the place of water",**
- **...first settled in the early 20th century,... The city was incorporated in 1946**
- Technology: Numerous tech companies have offices in the city, **including Amazon's headquarters in the adjacent Redmond**
- Public Transit: Served by King County Metro bus routes; the city is well-connected **via the Sound Transit Link Light Rail (the 1 Line)**
- Roads: ... Interstate 405 to **Washington State Route 525** and the **Duwamish River Parkway**
- Seasonal Festival: The **Issaquah Summer Festival** is a major annual event

#### Qwen 3.5 9B {[list]}

Here, Qwen 3.5 9B was a little more sophisticated in admitting what it didn't know, and refused to generate a list at first!

- Location: Issaquah is a city in King County, Washington state, USA, located approximately 15 miles east of Seattle.
- Geography: The city is situated in the Pacific Northwest, characterized by a temperate marine climate with mild, wet winters and warm, dry summers. It features a mix of urban development and natural landscapes including the Issaquah Creek watershed and proximity to the Cascade Mountains.
- History: Originally inhabited by the Suquamish and Duwamish people**s, Issaquah was named after Chief Issaquah of the Suquamish tribe.** The city was incorporated in 1905
- Economy: The city has a diverse economy ... several major employers including Microsoft (with its Redmond campus nearby), Boeing, and various tech startups.
- The city offers extensive outdoor recreation opportunities including ... proximity to Lake Sammamish and the Issaquah Creek Greenway.
- The **Issaquah Falls State Park** is a notable natural landmark nearby.
- Transportation: Issaquah is served by several major roadways including Interstate 90 and **State Route 200.** The city has multiple public transportation options.... **Sound Transit light rail connections to Seattle.**
- As of recent census data, Issaquah has a population exceeding 40,000 residents. The city is known for its "Issaquah Creek" which runs through downtown, providing a unique urban waterway feature.

#### **Qwen 3.5 27B** {[list]}

- Located in the Issaquah Valley in the Eastside region of the Seattle metropolitan area. **Incorporated in 1928**
- Situated at the base of the Cascade Mountains. Approximately 25 miles east of downtown Seattle. Issaquah Creek runs through the city
- **Named after the Issaquah Tribe, a Coast Salish people. The name "Issaquah" comes from the Lushootseed word meaning "watering place" or "where there is water"**
- Population around 40,000-42,000 residents (as of recent estimates) Predominantly suburban community with growing urban elements
- Home to Microsoft's Issaquah campus (one of their major facilities). Traditional retail and commercial areas along **Issaquah Parkway and NE 30th Street**
- Close proximity to Issaquah Alps (popular hiking area). Near Snoqualmie Pass and various mountain recreation areas
- Issaquah Highlands - master-planned community with parks and trails. **Creekwood Park,** Cougar Mountain Regional Wildland Park nearby
- Historic Downtown Issaquah with preserved architecture. Annual events including the **Issaquah Folk Festival** and Christmas parade
- Accessible via State Route 18 (Issaquah-Hobart Road) and Interstate 90
- Issaquah Transit Center provides bus connections. Growing light rail connectivity discussions as part of regional transit planning
- Issaquah School District serves the area. Known for highly-rated public schools in the region

#### Gemma 4 E4B {[list]}

Also: Refused to generate a list at first!

- Location: Located in King County, on the east side of Puget Sound. It is situated in the foothills of the Cascade Mountains.
- Population: As a growing suburb, its population has increased significantly over recent decades (specific current figures vary based on source and census year).
- Geography: The town is characterized by a mix of suburban development nestled against the natural terrain, including numerous wooded areas and access to mountainous regions.
- Origins: The area has historical ties to logging and mining industries common in the Pacific Northwest.
- Development: It has evolved from a smaller, more rural community into a desirable residential and commercial hub.
- Recreation: Issaquah offers extensive outdoor activities, including hiking (such as trails leading into Tiger Mountain), mountain biking, and access to the nearby mountains for skiing in winter.
- Community: It is known for its high quality of life, strong community focus, and blend of suburban comfort with natural surroundings.
- Education: The area hosts established school districts serving a diverse population.
- Transit: It is served by various local bus routes and has connections to larger metropolitan areas.
- Business: It features a growing selection of local businesses, shops, and services.
- This is a summary based on general knowledge. For the most precise or up-to-date statistics, consulting local government or recent census data is recommended.

#### Gemma 4 31B {[list]}

- Located in King County, Washington, in the Eastside region of the Seattle metropolitan area.
- **Often referred to as the "Gateway to the Cascades"** due to its position at the foot of the Cascade Mountain range.
- Situated in a valley between Tiger Mountain to the east and Squak Mountain to the west, with the Issaquah Creek running through the center of town.
- Typical Pacific Northwest climate with mild, wet winters and warm, dry summers.
- Serves as a significant commercial center for the Eastside, with various retail and service industries.
- The local economy is heavily influenced by tourism and outdoor sports, given its proximity to hiking trails and mountain resorts.
- Cougar Mountain Regional Wildland Park: A major destination for hiking, biking, and exploring old mining sites.
- Squak Mountain: Another prominent natural area offering extensive trail networks.
- Hiking Access: Provides easy access to the Snoqualmie Pass area and various alpine lakes.
- Salmon Recovery: Known for efforts to restore salmon populations in Issaquah Creek.
- Community Events: Hosts various local festivals and farmers markets that celebrate the region's agricultural roots.
- Education: Part of the Issaquah School District, which is generally well-regarded in the state.
- Infrastructure: I-90 runs directly through the city, serving as a primary artery for commuters and travelers heading toward Snoqualmie Pass.
- The Issaquah Highlands is a significant example of "New Urbanism," featuring a planned community on the plateau above the valley.
- The region has a legacy of coal mining, evident in the old shafts and ruins found within Cougar Mountain Regional Wildland Park.
- The city is served by the Issaquah School District, with Issaquah High School and Skyline High School being the primary public secondary institutions.
- The Issaquah Salmon Recovery project is a prominent local effort focused on restoring the habitat for Coho salmon in Issaquah Creek.


What can we tell from this?

- Qwen 3.5 2B and 4B didn't really have any interesting knowledge about Issaquah, Washington. On the other size, Qwen 3.5 27B did have some facts about Issaquah (Salmon, Cougar Mountain Park).
- Qwen 3.5 on the whole has a tendency to hallucinate and make up facts. For small Qwen models, it's almost charming the extent it tries to make up facts "The Issaquah River! Issaquah Trail!" and fake-real-fake suburb names.
- Google models did much better to avoid making things up; Gemma 4 E4B (sized somewhere between Qwen 3.5 4B and 9B in size) did not make up facts nearly as much; I would say this is an outcome of more modern training. Gemma 31B was respectable in terms of giving a good synopsis.


### Quantization

Another important topic for models is quantization.

Think of quantization as: how much fidelity does a model have to make fine-grained decisions? The lower the number, the coarser a model thinks. It's kind of like the difference between "regular TV", "HD TV", and "4K TV" -- all show the same picture, but regular TV is much fuzzier than 4K. It's also conceivable that the resolution of TV is so bad you can't even see details anymore. 

The same is true for models: Most models start at 16 bits of precision per parameter, but you can give them only 8 or 4 bits of quality per parameter and they will still be able to think. At 1 or 2 bits of precision, though, models stop being able to think coherently at all. They'll lose all sense of details, they may even start to make up words or repeat sentences, etc. They come incoherent. Different models become "incoherent' at different quantizations. Some work well at 2 bits of quantization, while others fall apart at 3 bits of quantization.

Savvy model tuners can apply highly customized algorithms for quantization: they can leave certain parts of the model "brain" at a higher level quantization like 4 or 6 bits, while shrinking less critical parts down to 2 bits. This is why it's rare that any quantized model is literally all 2 bits - they're typically more like 2.4 bits in size. When you visit Hugging Face, you'll often see different suffixes, like \_IQM or IQXXS. Those are different recipes that were used for quantization, and sometimes the set of assumptions around sizing that fit into those sizings.

Here is how the quantization breaks down for a model like Qwen 3.8 27B:

| **Model** | **Size** | **Tasks passed** | **Quality** | **Performance** | **Context** | **Memory used** |
| --- | --- | --- | --- | --- | --- | --- |
| IQ1 | 27B | 28/72 (39%) | 3.9/10 (25 pieces) prod | 11.1 tok/s output<br>190 tok/s prefill | 256K | 21.1 |
| Q2 | 27B | 67/72 (93%) | 7.9/10 (9 pieces) core, <br>7.3/10 (25 pieces) prod | 24.1 tok/s output<br>241 tok/s prefill | 256K | 21.1 GB |
| Q3 | 27B | 68/72 (94%) | 8/10 (9 pieces) core,<br>7.1/10 (27 pieces) prod | 22.7 tok/s output<br>239 tok/s prefill | 256K | 24.5 GB |
| Q4 | 27B | 67/72 (93%) | 7.8/10 (17 pieces) core,<br>7.3/10 (53 pieces) prod | 21.9 tok/s output<br>232 tok/s prefill | 256K | 28.4 GB |

*Mac Studio M4 Max · 64 GB · llama-cpp · 3 trials per task*

Note here that you can see that as far as this test was concerned, 2 bit quantization was just as reasonable in 4 bit quantization. I treat these results with some skepticism: I don't think Q2 is truly as good as Q4, but at least 2-bit quantizations can be worthwhile if you need to fit the model into a smaller amount of memory (like a 16GB graphics card).

The community also mixes their own recipes based on core models - for example, [Underdog Saluki](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0) is an adaptation of Qwen 3.8 27B - the 2 bit quantization - designed to fit into smaller devices while retaining the quality of Qwen 3.8 (and it tests well.)

#### Mixture of Experts Models

Mixture of experts models has a second concept – out of all the nodes that they have available, only "activate" "the right set" of experts for a given token. For example, Qwen3.6-35b-a3b means 35 billion parameters, but only 3 billion active when processing a particular token. The benefit here is really for performance: by only "pulsing" 3 billion parameters for every token, they can be much faster to process vs. dense models that need to pulse all 35 billion parameters. The downside is you need to have enough memory to hold all 35 billion parameters, even if only 3 billion are active at any one time.

Some people load these mixture of elements models into their (slow, but typically more plentiful) main system RAM  vs. their dedicated GPU RAM.  Only the performance sensitive parts might go onto the GPU. Here, the slowness of RAM (vs dedicated GPU graphics) is offset by the speed of only processing a certain number of parameters at only one time.

| **Model** | **Size** | **Tasks passed** | **Quality** | **Performance** | **Context** | **Memory used** |
| --- | --- | --- | --- | --- | --- | --- |
| qwen3.8-27b-q4 | 27B | 32/33 (97%) | 8.1/10 (18 pieces) | 31.8 tok/s output<br>681 tok/s prefill | 256K | 15.8 GB |
| qwen3.6-35b-a3b-q4 | 35B | 30/33 (91%) | 7.8/10 (9 pieces) | 131.1 tok/s output<br>2,102 tok/s prefill | 64K | 16.1 GB |

*AMD Ryzen 9 7950X3D 16-Core Processor · AMD Radeon AI PRO R9700 · 64 gigabytes*


### What does this mean for hardware?

Before we describe hardware + models, it's important to realize that there three phases for running a model to process tokens locally for the first tine:

1. Model load time
2. Prefill time (reading your prompt)
3. Token generation

Prefill time will probably catch you by surprise the first time you see it. It can take a good amount of time for a model to "prefill"/read your initial prompt. If you have a complex system prompt and a lot of tools exposed, a model may need to read 15 or 20K worth of tokens (which can be 1-3 min of time) before it even gets to your prompt.   When you use frontier/cloud models like Claude, you never see #1 and #2, because their system prompts are consistent across sessions so they can cache state from one sessoin to the next. But when you boot local models on your device, you will need to pay that tax. Gezel as a case in point puts a lot of work into trying to optimize how much prompt a given session sees, trims tool size to the bare essentials, and cache the different prompts. That's really core to the whole concept of gezel.

Local AI hardware falls into two buckets:

A device like a PC - which typically has a very fast AMD or nvidia GPU - a dedicated card for processing graphics. Previously these were primarily used for playing games. They can be very high performance for models, but the downside is that they typically don't have a lot of memory - maybe 24 or 32 gigabytes at best, which can barely run a good model like Qwen 3.8 27B memory.

Then there are unified memory machines, like Macs - where there is only one pool of memory that both the system and the AI can draw from. Here, the memory runs much more slowly than a GPU, but it's easier to find systems with 48 or 96gb of memory avaliable for models.

So with this in mind, if you want to run what is probably best local model -  Qwen 3.8 27B:

|   | **Performance** | **Context** |
| --- | --- | --- |
| AMD Windows laptop w/ 12GB GPU with Q2 (does not fit, so some part of this spills into main system memory which is why this is so slow) | 7 tok/s output<br>55 tok/s prefill<br>(I believe this  | 64K |
| DGX Spark | 32.4 tok/s output<br>777 tok/s prefill | 256K |
| Windows 7950X3D + AI Pro 9700 | 31.8 tok/s output<br>681 tok/s prefill | 256K |
| Mac M4 Max 64gb | 21.9 tok/s output<br>232 tok/s prefill | 256K |

*Note: Significant optimizations have happened since this table was made*

**A laptop comparison**

Here is a view of two laptops that could run AI - a Windows laptop with a dedicated GPU and an older Mac.


**AMD Ryzen AI 9 HX 370 w/ Radeon 890M · NVIDIA GeForce RTX 5070 Ti Laptop GPU · 31 GB · llama-cpp · 1 trial per task · 2026-09-02 · gezel 7694351b · catalog 0.1.52** — different device, different gezel build, different catalog version, different trial count

**vs.**

**M2 · Apple M2 (integrated GPU) · 16 GB · llama-cpp · 1 trial per task · 2026-09-03 · gezel a06b1070 · catalog 0.1.52** — different device, different gezel build, different catalog version, different trial count

| Model | Size | Tasks passed | Quality | Mac M2 Performance | AMD Ryzen 9 Windows Performance |
| --- | --- | --- | --- | --- | --- |
| gemma4-<br>12b-q4 (kv: f16) | 12B | 10/11 (some tasks run once — count not rate) | 6.6/10 (3 pieces) | 13.7 tok/s output<br>100 tok/s prefill | 24.6 tok/s output<br>1,495 tok/s prefill |
| ornith1.5-<br>9b-q4 (kv: f16) | 9B | 10/11 (some tasks run once — count not rate) | 6.5/10 (1 pieces) | 9.8 tok/s output<br>154 tok/s prefill | 57.7 tok/s output<br>2,230 tok/s prefill |
| qwen3.5-<br>9b-q4 (kv: f16) | 9B | 9/11 (some tasks run once — count not rate) | 3.8/10 (1 pieces) | 9.2 tok/s output<br>121 tok/s prefill | 29.9 tok/s output<br>329 tok/s prefill |

#### So what should you use?

"It depends". Qwen 3.8 27B seems like it does really well for reasoning. Gemma4 31B seems good for writing and general tasks. There are also many tweaks and different models available on [Huggingface.co](http://Huggingface.co).

#### **What should you buy?**

If you are spending under $5,000, I would just buy the Mac with the most RAM you can afford. Ideally at least 32 GB of RAM.
