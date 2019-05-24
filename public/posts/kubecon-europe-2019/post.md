Kubecon Europe 2019
===================

4 days, 8000 attendees, 103 listed sponsors, 18 lightening talks, 26 keynotes,
something like 400 talks, 3 official parties. So what were my initial takeaway
points from [the event](https://events.linuxfoundation.org/events/kubecon-cloudnativecon-europe-2019/)?

### Security

This was definitely a major topic. Both access control (RBAC and OPA being the
major topics of discussion) and network security (network policies) had several
sessions each dedicated to them. Several pen-testing and capture-the-flag
sessions. Lots of vendors are in this space, doing container scanning and live
system behaviour monitoring.

Kubernetes started off being single tenant and with a trusted internal network,
but projects to fix this are going from alpha to being-used-in-production in
timescales of 12 months or less.

### Monitoring, logging, tracing and metrics

There is wide acceptance that this is not trivial to roll your own solution,
and lots of vendors are ffering to take care of a lot of it for you. I didn't
see that much to differentiate their offerings to be honest, though I was only
looking at sales materials and demos rather than digging deeply. If you want a
dashboard full of graphs, there are lots of people to do it for you. If you
need searchable logs aggregating, then the same. There are a range of options
for tracing, from hosted to managed to install-it-yourself, all taking
advantage of the [opentracing](https://opentracing.io/) standard.

### Managed services

Standing up a production grade K8s system is definitely not for the faint
hearted. There are a lot of moving parts, a great deal changes from release to
release, and there are a myriad of ways of shooting yourself in the foot.

There are plenty of vendors offering to take this work off your hands. All of
the big cloud players have an offering, various traditional virtual hosting
providers have offerings and there are as-a-service offerings that are cross-
platform, both on prem and across various public clouds.

Given how this space is maturing, it starts to become more sensible to question
the wisdom of having an in-house K8s operations team. I'd be interested to see
what sorts of SLA and other support levels are provided, and get off-the-record
customer stories.

### War Stories

Some of the most popular sessions I saw (with queues out of the door in several
cases) were war stories or practical best practice. I heard other people
talking about the exact same issues we've found and solved, and there is a huge
value to sharing this knowledge to prevent us all having to reinvent the wheel.

### Conclusion

This was my first big conference in a couple of years, my first in my new role
at Groupon, and a hugely valuable experience. From meeting several of my
international colleagues face-to-face for the first time, to catching up with
what the various folks from the Openstack world are now up to, to getting a
feel for what's hot and not in the world of Kubernetes, it has been a week well
spent.

I intend to write up some of my session notes, record some demos to make sure
I understand some new things, and I'll post as much as I can to this blog over
the coming weeks, so please feel free to come back, or find an RSS link on the
left sidebar.

Any questions, comments or other feedback, please do reach out to me via
[duncan.thomas@gmail.com](mailto:duncan.thomas@gmail.com). Thanks for reading!

