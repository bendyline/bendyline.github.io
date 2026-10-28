---
squisq-outside-in: 1
squisq-output: ../allaboutlocalmodels.html
squisq-output-format: html
squisq-updatefrommarkdown: true
squisq-html-output: static
---
## Everything You Need to Know about Local Models

### What's in a model name

Take, for example, "Qwen 3.6 35B-A3B-Q4".

Qwen is a family of models from Alibaba, and Qwen 3.6 is a series that came out in April. The "35B" in the name tells you the model has 35 billion parameters, while "Q4" indicates it's been quantized to 4 bits. The "A3B" part is where things get interesting: it signals that this is a "Mixture of Experts (MoE)" model rather than a dense one. Dense models push every token through all of their parameters, whereas MoE models only activate a subset for each token — in this case, just 3 billion out of the 35 billion are active at any given moment. Those parameters are essentially the "size of the brain," so the distinction matters a lot for both memory usage and speed.

| Model | Hardware, Roughly | Size | Tasks passed | Quality | Performance | Memory used |
| --- | --- | --- | --- | --- | --- | --- |
| qwen3.5-2b | Phone | 2B | 6/33 (18%) | 2.7/10 (9 pieces) | 203.3 tok/s output<br>7,605 tok/s prefill | 5.1 GB |
| qwen3.5-4b | Low to Medium PC (no DGPU) | 4B | 16/33 (48%) | 5.3/10 (9 pieces) | 153 tok/s output<br>3,349 tok/s prefill | 7.2 GB |
| qwen3.5-9b | Medium PC with DGPU/Mac 16gb RAM | 9B | 26/33 (79%) | 5.3/10 (9 pieces) | 122.9 tok/s output<br>2,143 tok/s prefill | 8.9 GB |
| qwen3.5-27b | High End PC with DGPU/Mac 24gb RAM | 27B | 30/33 (91%) | 6.4/10 (9 pieces) | 55.9 tok/s output<br>656 tok/s prefill | 22.2 GB |

*(performance measured on a Windows 11 Ryzen 7950X3D + AMD AI Pro 9700)*

**Historical Models**

GPT4 is ~1.8T, GLM 5.3 is ~744B, Kimi is ~K3 2.8T

What do models know?

Without doing any research or using search tools, can you output a bulleted list of facts and everything in your knowledge about Issaquah, Washington to a file called "[Issaquah.md](http://Issaquah.md)"?

### **Qwen 3.5 2B** {[list]}

- Issaquah is a city in **Pierce County, Washington, USA. It is located approximately 25 miles south of Seattle and about 17 miles east of Spokane.**
- The city has a population of approximately **109,873 residents as of the 2020 census.**
- Coordinates **were for Seatac Airport)**
- Racial Composition: **Approximately 68% White, 12% Asian, 9% Black or African American, 7% Hispanic or Latino**
- Major Companies: **Google (has a presence), Amazon**, Microsoft, Boeing, and various healthcare organizations
- Notable Attractions: Issaquah High School, the **Issaquah Community Center,** and the Issaquah Riverfront Park
- Hiking Trails: The **Issaquah Trail** offers scenic routes through the city, Dining: Offers a diverse culinary scene including Italian, Asian, and seafood restaurants
- Roads: Well-connected to Interstate 90 **and Interstate 84,** Median Home Price: Approximately $480,000
- Medical Centers: Various clinics and hospitals provide comprehensive medical care
- The city is divided into several neighborhoods including - Riverfront - A popular residential area with waterfront views, Northwood - Known for family-oriented amenities, Lakeside - A historic neighborhood with a distinctive character, Greenwood - Close to the Issaquah River

### Qwen 3.5 4B {[list]}

- Issaquah is a city in King County, Washington, located in the Cascade Mountains of the Pacific Northwest.
- As of 2023, it has a population of approximately **56,000 residents.**
- **Mount Rainier National Park:** Located just 10 miles north of Issaquah; one of the most popular destinations in the Pacific Northwest
- Location: Situated in the Cascade Mountains, **between Seattle to the northwest** and **Tacoma to the southeast**
- Elevation: Ranges from 150 feet along the Duwamish River valley floor
- The name "Issaquah" comes from the Suquamish word for "the place of water",
- ...first settled in the early 20th century,... The city was incorporated in 1946
- Technology: Numerous tech companies have offices in the city, **including Amazon's headquarters in the adjacent Redmond**
- Public Transit: Served by King County Metro bus routes; the city is well-connected **via the Sound Transit Link Light Rail (the 1 Line)**
- Roads: ... Interstate 405 to **Washington State Route 525** and the **Duwamish River Parkway**
- Seasonal Festival: The **Issaquah Summer Festival** is a major annual event ...

### Qwen 3.5 9B {[list]}

Also: Refused to generate a list at first!

- Location: Issaquah is a city in King County, Washington state, USA, located approximately 15 miles east of Seattle.
- Geography: The city is situated in the Pacific Northwest, characterized by a temperate marine climate with mild, wet winters and warm, dry summers. It features a mix of urban development and natural landscapes including the Issaquah Creek watershed and proximity to the Cascade Mountains.
- History: Originally inhabited by the Suquamish and Duwamish people**s, Issaquah was named after Chief Issaquah of the Suquamish tribe.** The city was incorporated in 1905
- Economy: The city has a diverse economy ... several major employers including Microsoft (with its Redmond campus nearby), Boeing, and various tech startups.
- The city offers extensive outdoor recreation opportunities including ... proximity to Lake Sammamish and the Issaquah Creek Greenway.
- The **Issaquah Falls State Park** is a notable natural landmark nearby.
- Transportation: Issaquah is served by several major roadways including Interstate 90 and **State Route 200.** The city has multiple public transportation options.... **Sound Transit light rail connections to Seattle.**
- As of recent census data, Issaquah has a population exceeding 40,000 residents. The city is known for its "Issaquah Creek" which runs through downtown, providing a unique urban waterway feature.

### **Qwen 3.5 27B** {[list]}

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

### Gemma 4 E4B {[list]}

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

### Gemma 4 31B {[list]}

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

Quantization

Think of quantization as: how much fidelity does a model have to make fine-grained decisions? The lower the number, the coarser a model thinks. It's kind of like the difference between "regular TV", "HD TV", and "4K TV". Most models start at 16 bits of precision, but you can give them only 8 or 4 bits of "room to reason" and they will still be able to think. At 1 or 2 bits of precision, though, models stop being able to think coherently at all; they'll repeat themselves, etc.

| **Model** | **Size** | **Tasks passed** | **Quality** | **Performance** | **Context** | **Memory used** |
| --- | --- | --- | --- | --- | --- | --- |
| IQ1 | 27B | 28/72 (39%) | 3.9/10 (25 pieces) prod | 11.1 tok/s output<br>190 tok/s prefill | 256K | 21.1 |
| Q2 | 27B | 67/72 (93%) | 7.9/10 (9 pieces) core, <br>7.3/10 (25 pieces) prod | 24.1 tok/s output<br>241 tok/s prefill | 256K | 21.1 GB |
| Q3 | 27B | 68/72 (94%) | 8/10 (9 pieces) core,<br>7.1/10 (27 pieces) prod | 22.7 tok/s output<br>239 tok/s prefill | 256K | 24.5 GB |
| Q4 | 27B | 67/72 (93%) | 7.8/10 (17 pieces) core,<br>7.3/10 (53 pieces) prod | 21.9 tok/s output<br>232 tok/s prefill | 256K | 28.4 GB |

*Mac Studio M4 Max · 64 GB · llama-cpp · 3 trials per task*

Note: when you visit Hugging Face, you'll often see different suffixes, like \_IQM or IQXXS. Those are different algorithms that were used for quantization, and sometimes the set of assumptions around sizing that fit into those sizings.

Mixture of Experts Models

Mixture of experts models has a second concept – out of all the nodes that they have available, only "activate" "the right set" of experts for a given token. For example, Qwen3.6-35b-a3b means 35 billion parameters, but only 3 billion active when processing a particular token.

| **Model** | **Size** | **Tasks passed** | **Quality** | **Performance** | **Context** | **Memory used** |
| --- | --- | --- | --- | --- | --- | --- |
| qwen3.8-27b-q4 | 27B | 32/33 (97%) | 8.1/10 (18 pieces) | 31.8 tok/s output<br>681 tok/s prefill | 256K | 15.8 GB |
| qwen3.6-35b-a3b-q4 | 35B | 30/33 (91%) | 7.8/10 (9 pieces) | 131.1 tok/s output<br>2,102 tok/s prefill | 64K | 16.1 GB |

*AMD Ryzen 9 7950X3D 16-Core Processor · AMD Radeon AI PRO R9700 · 64 gigabytes*

What does this mean for hardware?

There's an important distinction between unified memory machines (Mac) and dedicated graphics (PC). Dedicated graphics (e.g., an Nvidia 4080 GPU) tops out, realistically, at 32 GB. Unified memory machines could have a lot of RAM (48, 64 GB!) but that memory is typically 1/4th the speed of dedicated.

**If you want to run Qwen 3.8 27B:**

|   | **Performance** | **Context** |
| --- | --- | --- |
| AMD Windows laptop w/ 12GB GPU with Q2 (DOES NOT FIT) | 7 tok/s output<br>55 tok/s prefill | 64K |
| DGX Spark | 32.4 tok/s output<br>777 tok/s prefill | 256K |
| Windows 7950X3D + AI Pro 9700 | 31.8 tok/s output<br>681 tok/s prefill | 256K |
| Mac M4 Max 64gb | 21.9 tok/s output<br>232 tok/s prefill | 256K |

*Note: Significant optimizations have happened since this table was made*

**A laptop comparison**

**AMD Ryzen AI 9 HX 370 w/ Radeon 890M · NVIDIA GeForce RTX 5070 Ti Laptop GPU · 31 GB · llama-cpp · 1 trial per task · 2026-09-02 · gezel 7694351b · catalog 0.1.52** — different device, different gezel build, different catalog version, different trial count

**vs.**

**M2 · Apple M2 (integrated GPU) · 16 GB · llama-cpp · 1 trial per task · 2026-09-03 · gezel a06b1070 · catalog 0.1.52** — different device, different gezel build, different catalog version, different trial count

| Model | Size | Tasks passed | Quality | Mac M2 Performance | AMD Ryzen 9 Windows Performance |
| --- | --- | --- | --- | --- | --- |
| gemma4-<br>12b-q4 (kv: f16) | 12B | 10/11 (some tasks run once — count not rate) | 6.6/10 (3 pieces) | 13.7 tok/s output<br>100 tok/s prefill | 24.6 tok/s output<br>1,495 tok/s prefill |
| ornith1.5-<br>9b-q4 (kv: f16) | 9B | 10/11 (some tasks run once — count not rate) | 6.5/10 (1 pieces) | 9.8 tok/s output<br>154 tok/s prefill | 57.7 tok/s output<br>2,230 tok/s prefill |
| qwen3.5-<br>9b-q4 (kv: f16) | 9B | 9/11 (some tasks run once — count not rate) | 3.8/10 (1 pieces) | 9.2 tok/s output<br>121 tok/s prefill | 29.9 tok/s output<br>329 tok/s prefill |

So what should you use? {[factCard]}

"It depends". Qwen 3.8 27B seems like it does really well for reasoning. Gemma4 31B seems good for writing and general tasks. There are also many tweaks and different models available on [Huggingface.co](http://Huggingface.co).

**What should you buy?**

If you are spending under $5,000, I would just buy the Mac with the most RAM you can afford. Ideally at least 32 GB of RAM.
