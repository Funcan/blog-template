Mutation Testing Tests Your Tests
=================================

How can you measure if your unit tests are any good? Are there any good metrics for unit tests? Code coverage is certainly necessary, but it is unfortunately not sufficient. It's quite possible to execute every line of code via a unit test (an exercise not entirely without value, especially with a highly dynamic language such as python where the compiler can't catch as many undefined references and similar issue as in C or Golang), but not actually be testing any of its behaviour, let alone all.

I admit to having, for a long time, somebody who considered unit tests to be low value. I've since been slowly educated on this front, and I now believe good unit tests have high value. I'm still zeroing in on a comprehensive definition of 'good' (see my last post for some initial thoughts) but one thing I've felt that should exist as a tool turns out to have existed for ages once you know the name of it: [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing).

#### What is Mutation Testing?

The concept is simple: Take your code and your tests, make random syntactically valid changes to the code, and run the tests - if no test fails then there is some part of the code's behaviour that isn't covered by the tests. Tools are available to automate this process - I've been experimenting with [go-mutesting](https://github.com/zimmski/go-mutesting) for golang, and [mutmut](https://github.com/boxed/mutmut) for python. Both are basic but work.

There's also a giant list of other mutation testing tools and libraries [here](https://github.com/theofidry/awesome-mutation-testing) covering most languages.

#### An example of what it catches

Given the source code mycode.py:

```python
def something():
    return {
        "key1": "key1",
        "key2": "key2",
        "key3": "key3"
    }
```

And given the test:

``` python
import unittest

import mycode

class SomethingTest(unittest.TestCase):
    def testSomethingKeys(self):
        thing = mycode.something()
        for key in ["key1", "key2", "key3"]:
            assert key in thing
```

mutmut gives us a status line of `⠙ 6/6  🎉 3  ⏰ 0  🤔 0  🙁 `"

This means that 6 mutations were attempted, 3 were caught and 3 were missed.  This is more clearly spelt out from the output of `mutmut results`:

```
$ mutmut results
To apply a mutant on disk:
    mutmut apply <id>

To show a mutant:
    mutmut show <id>


Survived 🙁 (3)

---- mycode.py (3) ----

2, 4, 6
```

We can view each of the failing mutations via `mutmut show`:


```diff
$ mutmut show 2
--- mycode.py
+++ mycode.py
@@ -1,6 +1,6 @@
 def something():
     return {
-        "key1": "key1",
+        "key1": "XXkey1XX",
         "key2": "key2",
         "key3": "key3"
     }

$ mutmut show 4
--- mycode.py
+++ mycode.py
@@ -1,7 +1,7 @@
 def something():
     return {
         "key1": "key1",
-        "key2": "key2",
+        "key2": "XXkey2XX",
         "key3": "key3"
     }


$ mutmut show 6
--- mycode.py
+++ mycode.py
@@ -2,6 +2,6 @@
     return {
         "key1": "key1",
         "key2": "key2",
-        "key3": "key3"
+        "key3": "XXkey3XX"
     }
```

This highlights the fact that none of our return dictionary values are validated by our tests.

Obviously this is a trivial example, and there are mutmut issue tickets open to provide better control of the mutations that are applied; I found when applying this to a large project for the first time it is easy to get swamped, so testing the most important things first (return values, logcical tests) and skipping things like mutation of constants would make it easier to know where to start.

This is only a flying introduction, but I found that the use of this tool found real bugs in my code that were missed by the tests, within a few minutes. I'd encourage any developer to look into it and add it to the set of tools at their disposal. I am doing some experimentation into how to add mutation testing to CI in a useful way, and I'll make another post about that in future.
