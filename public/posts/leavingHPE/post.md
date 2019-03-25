Leaving HPE
===========

This week is my last week at HPE, Galway. I've been here just shy of
8 years, worked on 3 major projects, met some fantastic people and learnt
a lot. Here's a quick look back at those projects, and a few musings about
each one:

#### Public Cloud

This was the project I signed up for, specifically the block storage
component.

The amount of change I saw during this project and the transformations
within the individual teams was tremendous. During the interview, I heard
all about the plan to launch a public cloud based on HP Labs-developed
proprietary technologies that were in their final production hardening
phase. Within my first or second week in the office, our new VP had
decided to pivot to the then-very-new [OpenStack](www.openstack.org)
technology stack and stand up a prototype in a very short period of
time. When we had a working demo something in the order of six weeks
later, I was extremely proud of what we'd accomplished - most of the
OpenStack code base was, at that point fragile, suffering major
scalability and reliability issues, and missing many basic features, but
we'd gotten it stood up.

In order to get a production-ready cloud in a reasonable timescale, the
decision was made at some point shortly after this to effectively create
an in-house fork of chunks of the OpenStack code base, especially Nova.
There were good arguments for doing this - working upstream was slow, we
weren't well integrated into the community and our priority for getting
a working production cloud 'right now' was not well aligned with an
upstream core who were mostly not actually trying to run the code. On the
other hand, this created bad feeling in the community, meant that many of
our internal changes (including customer-facing API changes) were not
suitable for upstream inclusion in the form we deployed them, and reduced
the amount of testing and steering we were doing on the new upstream code
to a minimal level. Getting back to running upstream code was painful and
time-consuming. I'm not sure what the right call was here, and hindsight
always makes things seem obvious, but certainly it was an interesting if
frustrating thing to see play out.

I was lucky to be at the San Francisco summit and part of the decision to
form Cinder. Rackspace's Lunr project, which was touted as the future of
OpenStack block storage, was delayed again. A bunch of us were stuck
waiting for it; we had no code, no design documentation and rapidly
reducing faith in its timely delivery. John Griffith proposed we do it
ourselves, and Cinder was born.

I worked on Cinder as a core developer basically full time for about
5 years - splitting my time between a proprietary backend called 'Bock'
that we were using in HP, and the core code. Initially, I was the only
person on the core team actually running a production instance of cinder,
which gave me a different set of priorities to most of the core team, who
were vendors trying to develop new features. I think this tension was
a very healthy thing to have in the team; we make lots of jokes about some
of the arguments that happened over the years, and I like to think my soft
skills matured a great deal in this period, but ultimately we got on well
as a team, produced mostly good code and tended to learn from our
mistakes... except on the subject of replication. Nobody should mention
replication, to the point where we ended up referring to the third attempt
to get that code right as Cheesecake in order to get around the almost
Pavlovian reaction some of us had to the word by that point... but hey,
you can't win them all.

Ultimately, the HP public cloud was not a commercial success. I think
there were a bunch of drivers for this:

 * Going head to head with a massively entranced partner like AWS takes
   more investment that HP were prepared for

 * HP sales team were not set up to effectively sell a cloud offering. The
   incentives for the sales teams were not there, and the ability to sell
   what we had rather than what we hoped to have in future ("Selling what
   we have on the truck" as some senior manager put it) was not developed

 * Ultimately, OpenStack was a little too immature to build a public cloud
   out of, and most of our teams never really got slick and smooth with
   supporting a 24/7 production product. Technical debt, disputes about
   ownership and responsibilities between teams, and the difficulties of
   transitioning to an effective DevOps style of working all factored in
   here

While it didn't work out in the end, I think we achieved a lot, learnt
a great deal, improved our ability to work with an open-source community
and had some fun along the way.

#### Helion Life-cycle Manager

This was a pivot back towards what HPE knows better: On-premise enterprise
software. We initially attempted to base the product around the very new
Triple-O (OpenStack On OpenStack) upstream code base; the immaturity of
this project together with some fundamental technical disagreements
between that project's core team and our architects led to us using
a different approach for HLM v2. Version 1 was very much an alpha product,
not suitable for more than tire kicking and getting feedback. Version
2 was a beta demo and provided a useful platform for customers to evaluate
our approach. By the time we got to our third major version, we had
a solid product that was definitely suitable for doing real work on.

Sadly, greater corporate tides worked against us. HP had already split
into HP and HPE, and then when the Microfocus spin-merge happened, HLM
went to Microfocus. We finished release 4, which was definitely a product
I'm happy to stand behind. We had big plans for future improvements, we
had happy customers and a steadily growing customer base, with some bit
deals starting to come in when most of the team were moved off the product
with all new development happening at Microfocus instead. This obviously
took the wind out of the sails of the product going forward and I don't
think it has or ever will recover.

#### OneSphere

Cloud was clearly still a vital market for HPE, and there was a period of
soul searching and experimentation before yet another attempt to bring
a product into that space. OneSphere is a SaaS-based product to do
vending, metering and compliance across public and private clouds. It has
undergone several pivots and refocusing over the couple of years I've been
working on it, and while I think there's the core of a solid idea in
there, I've never really found a niche within it that suites me. I worked
on a few storage options initially, and ended up in the operations team.
Turning that into a more SRE (Site Reliability Engineer, a Google
vernacular for a combination of operations automation, monitoring and
metrics, and DevOps push-down / good practice evangelising) role would
have been my continued goal had I decided to stay, but I instead decided
that it was time for me to more my career on.

#### Onwards and Upwards

After a fair amount of hunting round, I'm therefore off to join
[Groupon](https://www.groupon.ie/) in their infrastructure team. I'll be
working on migrating live production workloads onto Kubernetes, which
should bring some new and interesting challenges. I wish all my former
colleagues well and look forward to staying in touch and hearing how
things go. Finding somewhere to rent in Dublin appears to be a herculean
task, but that's my next short term challenge.
