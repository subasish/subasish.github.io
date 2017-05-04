<!--
%\VignetteEngine{knitr::docco_linear}
%\VignetteIndexEntry{R Markdown with the Docco Linear Style}
-->

# Not Preface

R is now a <span style="color:red">large community</span>. Today we have ~~4,567~~ 6,139 R packages. My attempt here is to jot down the code snippets  based on the newer packages (by following [table of available packages, sorted by date of publication](http://cran.r-project.org/web/packages/available_packages_by_date.html)). 

***

The chunk of the codes will be taken either from the Vignette or from the main package documentation pdf. I also like to include [stack overflow threads](http://stackoverflow.com/questions/tagged/r) if there are interesting questions. These interesting and easy-to-apply codes will be applied to different data sets to develop models and assumptions. 




### Packages

Packages used in this post are:

> pander, DT, data.table 

#### pander

1. [Package pdf](http://cran.r-project.org/web/packages/pander/pander.pdf).
2. [Github](http://rapporter.github.io/pander/)
3. Last updated: 2014-XX-XX


```r
library(pander)
pandoc.table(mtcars[1:3, 1:4])
```

```
## 
## -------------------------------------------
##       &nbsp;          mpg   cyl   disp   hp
## ------------------- ----- ----- ------ ----
##    **Mazda RX4**       21     6    160  110
## 
##  **Mazda RX4 Wag**     21     6    160  110
## 
##   **Datsun 710**     22.8     4    108   93
## -------------------------------------------
```



```r
pandoc.table(mtcars[1:2, ], style = "grid", caption = "Hello caption!")
```

```
## 
## 
## +---------------------+-------+-------+--------+------+--------+-------+
## |       &nbsp;        |   mpg |   cyl |   disp |   hp |   drat |    wt |
## +=====================+=======+=======+========+======+========+=======+
## |    **Mazda RX4**    |    21 |     6 |    160 |  110 |    3.9 |  2.62 |
## +---------------------+-------+-------+--------+------+--------+-------+
## |  **Mazda RX4 Wag**  |    21 |     6 |    160 |  110 |    3.9 | 2.875 |
## +---------------------+-------+-------+--------+------+--------+-------+
## 
## Table: Hello caption! (continued below)
## 
##  
## 
## +---------------------+--------+------+------+--------+--------+
## |       &nbsp;        |   qsec |   vs |   am |   gear |   carb |
## +=====================+========+======+======+========+========+
## |    **Mazda RX4**    |  16.46 |    0 |    1 |      4 |      4 |
## +---------------------+--------+------+------+--------+--------+
## |  **Mazda RX4 Wag**  |  17.02 |    0 |    1 |      4 |      4 |
## +---------------------+--------+------+------+--------+--------+
```



```r
pander(prcomp(USArrests))
```

```
## Error in pandoc.table.return(...): Wrong number of parameters (17 instead of *5*) passed: justify
```



```r
counts <- c(18, 17, 15, 20, 10, 20, 25, 13, 12)
outcome <- gl(3, 1, 9)
treatment <- gl(3, 3)
m <- glm(counts ~ outcome + treatment, family = poisson())
```


#### DT

1. [jQuery DataTables](http://cran.r-project.org/web/packages/knitr/vignettes/datatables.html).
2. [DT Github Repo.](https://github.com/rstudio/DT)
3. [Rpubs 1: knitr と DataTables](http://rpubs.com/holidayworking/knitr_and_datatables)
4. [Rpubs 2: countrycode](http://rpubs.com/muuankarski/52544)


DT package is not on CRAN yet, and you can install it with devtools. Need to do following:

> install.packages("devtools")

> library(devtools)

> devtools::install_github('rstudio/DT')



```
## Warning in file(file, "rt"): cannot open file 'aa.csv': No such file or
## directory
```

```
## Error in file(file, "rt"): cannot open the connection
```

```
## Error in datatable(data): 'data' must be either a matrix or a data frame
```

#### data.table

1. [Package pdf](http://cran.r-project.org/web/packages/data.table/data.table.pdf).
2. [DATA ANALYSIS THE DATA.TABLE WAY](ww.datacamp.com/courses/data-analysis-the-data-table-way)


```r
library(data.table)
DF = data.frame(x=rep(c("a","b","c"),each=3), y=c(1,3,6), v=1:9)
DT = data.table(x=rep(c("a","b","c"),each=3), y=c(1,3,6), v=1:9)
DF
```

```
##   x y v
## 1 a 1 1
## 2 a 3 2
## 3 a 6 3
## 4 b 1 4
## 5 b 3 5
## 6 b 6 6
## 7 c 1 7
## 8 c 3 8
## 9 c 6 9
```

```r
DT
```

```
##    x y v
## 1: a 1 1
## 2: a 3 2
## 3: a 6 3
## 4: b 1 4
## 5: b 3 5
## 6: b 6 6
## 7: c 1 7
## 8: c 3 8
## 9: c 6 9
```


```r
data(mtcars)
head(mtcars)
```

```
##                    mpg cyl disp  hp drat    wt  qsec vs am gear carb
## Mazda RX4         21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
## Mazda RX4 Wag     21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
## Datsun 710        22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
## Hornet 4 Drive    21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
## Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
## Valiant           18.1   6  225 105 2.76 3.460 20.22  1  0    3    1
```

```r
mtcars.dt <- data.table(mtcars)
head(mtcars.dt)
```

```
##     mpg cyl disp  hp drat    wt  qsec vs am gear carb
## 1: 21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
## 2: 21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
## 3: 22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
## 4: 21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
## 5: 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
## 6: 18.1   6  225 105 2.76 3.460 20.22  1  0    3    1
```

```r
mtcars.dt1 <- data.table(mtcars, keep.rownames = TRUE)
head(mtcars.dt1)
```

```
##                   rn  mpg cyl disp  hp drat    wt  qsec vs am gear carb
## 1:         Mazda RX4 21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
## 2:     Mazda RX4 Wag 21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
## 3:        Datsun 710 22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
## 4:    Hornet 4 Drive 21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
## 5: Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
## 6:           Valiant 18.1   6  225 105 2.76 3.460 20.22  1  0    3    1
```




That's all for this docco. :)
