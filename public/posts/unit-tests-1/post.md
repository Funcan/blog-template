Unit Testing Considered Difficult
=================================

During most of my time as an OpenStack Cinder core team member, I had a
constant nagging feeling that we were doing a bad job with unit testing. I
could never point to one specific thing that was definitely wrong, but it
never felt that we were doing a good job. They always felt like a rock-fetch,
something we were adding because the 'Big Book of Software Development' said they
were a good thing, rather than something we had a clear vision of what were
doing and how we were going to do a good job of it.

Turning my vague feelings into workable actions has taken a while, and I'm far
from having answers for all of the questions, but I definitely consider myself
better educated about enabling unit tests to provide value. We had a lot of
unit tests, reasonably good coverage and fast enough runtime, so what would I
change?


We had a fair number of unit tests that had a style something like:

``` python
def frobulate(name, cost, layers):
    status = "Bad"
    if cost > 4:
        name = name + " fobulated"
    if "frozen" in layers:
        status = "Good"
    return {
        "name": name,
        "layer": layers[0],
        "status": status,
    }
```

``` python
class FrobulateTest(unittest.TestCase):
    def test_frobulate(self):
        ret = frobulate("Fred", 8, ["air", "frozen", "pie"])
        self.assertEqual("Fred fobulated", ret["name"])
        self.assertEqual("Good", ret["status"])
        self.assertEqual("air", ret["layer"])

        ret = frobulate("Fred", 2, ["air", "frozen", "pie"])
        self.assertEqual("Fred", ret["name"])

        ret = frobulate("Fred", 8, ["air"])
        self.assertEqual("Bad", ret["status"])
```

So we're getting full coverage, including all of the branches, so our metrics
look good. I don't thing this is a useful test at all though.

#### What's wrong with this?

1. Each unit test should express one, and ideally only one, intent of the code

Reading this test, I've no idea what the frobulate function does. I need to go
and read all of the code to answer that.

2. The test doesn't tell me what the corner cases are

We've a magic value of 4 in the code but no explicit testing around that value.

3. The test provides little to no protection during refactoring
If the code has to change (either through refactoring, minor requirements
change or functional enhancements) then the test has to change which means
that it doesn't do a good job of telling me whether I've broken anything.

With those points in mind, what would a better unit test look like?

``` python
class FrobulateTest(unittest.TestCase):
    def testFrobulateDictFields(self):
        ret = frobulate("Fred", 4, ["air"])
        keys = ret.keys()
        self.assertTrue("status" in keys)
        self.assertTrue("name" in keys)
        self.assertTrue("layer" in keys)

    def testFrobulate4LayersUnfrobulated(self):
        # Name should be unfrobulated for <= 4 layers
        ret = frobulate("Fred", 4, ["air"])
        self.assertEqual("Fred", ret["name"])

    def testFroblulate5LayerFrobulated(self):
        # Name should be frobulated for 5+ layers
        ret = frobulate("Fred", 5, ["air"])
        print("Debug: %s" % ret["name"])
        self.assertTrue(ret["name"].endswith("fobulated"))

    def testFroblulateFrozenGood(self):
        ret = frobulate("Fred", 1, ["water", "air", "frozen"])
        self.assertEqual(ret["status"], "Good")

    def testFrobulateNoFrozenBad(self):
        ret = frobulate("Fred", 1, ["water", "air", "melted"])
        self.assertEqual(ret["status"], "Bad")
```

We've once again got 100% coverage, but now if we change the behaviour of the
frobulate function, it is highly likely that several of these tests won't have
to change, which gives a higher confidence that we haven't broken things.

I'm quite sure that the above tests could be improved more, and the cinder
tests are in a better state than I remember them being. I hope to get time to
submit a few patches to make them better still, especially once I've had more
chance to play with my most recent discovery in the field of unit testing,
which is mutation testing, the subject of a blog post in the near future.
