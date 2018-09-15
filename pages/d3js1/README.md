This [block](https://bl.ocks.org/Kcnarf/4608704a70fc24e2c06ca0116830de47) is my attempt to vizualize data provided by [Makeover monday, 2017, week 29](https://trimydata.com/2017/07/17/mm-week29/), and is a continuation of [a previous block](https://bl.ocks.org/Kcnarf/9d92d095147667bae9beb6b7448820bd).

Compared to the previous block, areas of circle also encode salaries. I don't know if it's a good idea. Please let me know on [twitter](https://twitter.com/_Kcnarf/status/888052142887636993).

Pros :
 * it strengthens differences between low salaries and high salaries
 * it hiighlights the relative weight of each salary with regards to the total.

Cons :
 * the salary is encoded twice (y-axis, radius)
 * it adds some space around low salaries, which is not quite understandable; I wanted this space in order to maintain a correct distribution (eg. 10 low salaries must take the same place as 10 high salaries);


### Original readme

I use a beeswarm arrangement (cf. [d3-beeswarm plugin](https://github.com/Kcnarf/d3-beeswarm)) for several reasons. Firstly, because there is no overlapping, it allows the user to see each individual data, and hover a particular data to access to its details. Secondly, this kind of arrangement suits very well distributions. In this example, it highlights the differences between the two administrations, and shows that Trump's salaries seems to use a salary grid, as opposed to Obama's ones.

#### Acknowledgments to :
* <a href='https://d3js.org/'>D3.js</a> (v.4)
* <a href='http://blockbuilder.org'>blockbuilder.org</a>
* <a href='https://github.com/Kcnarf/d3-beeswarm'>d3-beeswarm</a> plugin
* <a href='https://trimydata.com/'>Makeover monday</a>