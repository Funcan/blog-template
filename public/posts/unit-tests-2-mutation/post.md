Mutation Testing Tests Your Tests
=================================

Are there any good metrics for unit tests? Code coverage is certainly necessary, but it is unfortuunately not sufficient. It's quite possible to execute every line of code via a unit test (an exercise not entirely without value, especially with a highly dynamic language such as python where the compiler can't catch as many undefined references and similar issue as in C or Golang), but not actually be testing any of its behaviour.
