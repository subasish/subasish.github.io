---
title: "Random R Codes Part-5"
date: "2015-01-29"
output:
    html_document:
        css: bootstrap.css
        toc: true
        toc_depth: 4
        theme: cosmo
        highlight: haddock
---

### Not Preface

R is now a <span style="color:red">large community</span>. Today we have ~~4,567~~ 6,139 R packages. My attempt here is to jot down the code snippets  based on the newer packages (by following [table of available packages, sorted by date of publication](http://cran.r-project.org/web/packages/available_packages_by_date.html))[^1]. 

***

The chunk of the codes will be taken either from the Vignette or from the main package documentation pdf. I also like to include [stack overflow threads](http://stackoverflow.com/questions/tagged/r) if there are interesting questions. These interesting and easy-to-apply codes will be applied to different data sets to develop models and assumptions. 

[^1]: Compiled by [Subasish Das](http://subasish.tumblr.com)

<p align="center">
![](http://38.media.tumblr.com/d7c5eb7ca7cda33643d490ed0cc82aac/tumblr_ncirefgkm71tv4k5po1_500.gif)
</p>


> Web Scraping U Thou!!!

#### rvest

1. [Package pdf](http://cran.r-project.org/web/packages/rvest/rvest.pdf).
2. [Github](https://github.com/hadley/rvest)
3. Last updated: 2014-27-01


```r
library(rvest)
library(rvest)
lego_movie <- html("http://www.imdb.com/title/tt1490017/")

rating <- lego_movie %>% 
  html_nodes("strong span") %>%
  html_text() %>%
  as.numeric()
rating
```

```
## [1] 7.8
```

```r
cast <- lego_movie %>%
  html_nodes("#titleCast .itemprop span") %>%
  html_text()
cast
```

```
##  [1] "Will Arnett"     "Elizabeth Banks" "Craig Berry"    
##  [4] "Alison Brie"     "David Burrows"   "Anthony Daniels"
##  [7] "Charlie Day"     "Amanda Farinos"  "Keith Ferguson" 
## [10] "Will Ferrell"    "Will Forte"      "Dave Franco"    
## [13] "Morgan Freeman"  "Todd Hansen"     "Jonah Hill"
```

```r
poster <- lego_movie %>%
  html_nodes("#img_primary img") %>%
  html_attr("src")

library(rvest)
library(httr)
library(jpeg)

lego_movie <- html("http://www.imdb.com/title/tt1490017/")

poster <- lego_movie %>%
  html_nodes("#img_primary img") %>%
  html_attr("src")
```


#### Web Scraping from kiva
#### Replicating the rpubs: https://rpubs.com/aammd/kivascrape



```r
library(dplyr)
library(tidyr)
library(magrittr)
library(rvest)


site <- html("http://www.kiva.org/lend/774331")


kiva_name <- function(.site){
  .site %>%
    html_nodes("#pageHeader h2") %>%
    html_text
  }

kiva_name(site)
```

```
## [1] "Resineros De San José De Cañas Group"
```

```r
kiva_place <- function(.site){
  .site %>%
    html_nodes("#pageHeader .country") %>%
    html_text
  }

kiva_place(site)
```

```
## [1] "San José de Cañas, Mexico"
```

```r
kiva_amt <- function(.site){
.site %>%
  html_nodes(".loanExcerpt") %>%
  html_text %>%
  gsub("[^0-9.]+", "", .) %>%
  gsub("\\.*$", "", .) %>%        ## remove trailing .
  gsub("^\\.*", "", .) %>%           ## remove leading .
  as.numeric
}

kiva_amt(site)
```

```
## [1] 29050
```

```r
kiva_percent <- function(.site){
.site %>%
  html_nodes("#loanSummary .number") %>%
  html_text %>%
  gsub("[^0-9.]+", "", .) %>%
  as.numeric
}

kiva_percent(site)
```

```
## [1] 0
```

```r
kiva_funded <- function(.site){
  .site %>%
    html_nodes(".fullyFundedNotice") %>%
    html_text %>%
    identical(., character(0)) %>%
    not
}

kiva_funded(site)
```

```
## [1] TRUE
```

```r
loansum <- html(site) %>%
  html_nodes("#loanSummary dl")


loansum %>%
  html_text
```

```
## [1] "Repayment Term:\n\t\t\t\t\t\t120 months (more info)\n\t\n\t\t\t\t\t\tRepayment Schedule:\n\t\t\t\t\t\tIrregularly\n\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tPre-Disbursed:\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAug 25, 2014\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\tListed\n\t\t\t\t\t\t\tOct 21, 2014\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tCurrency Exchange Loss:\n\t\t\t\t\t\tN/A \n\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t"
```

```r
loansum %>%
  html_nodes("dt") %>%
  html_text
```

```
## [1] "Repayment Term:"         "Repayment Schedule:"    
## [3] "Pre-Disbursed:"          "Listed"                 
## [5] "Currency Exchange Loss:"
```

```r
loansum %>%
  html_nodes("dd") %>%
  html_text
```

```
## [1] "120 months (more info)" "Irregularly"           
## [3] "Aug 25, 2014"           "Oct 21, 2014"          
## [5] "N/A "
```

```r
deflist_to_df <- function(.site){
  require(rvest)
  require(dplyr)
  
deflist_xml <- .site %>%
    html_nodes("#loanSummary dl")
  
terms <- deflist_xml %>%
  html_nodes("dt") %>%
  html_text
  
defs <- loansum %>%
  html_nodes("dd") %>%
  html_text
  
names(defs) <- terms
  
data.frame(t(defs))
}

deflist_to_df(site)
```

```
##          Repayment.Term. Repayment.Schedule. Pre.Disbursed.       Listed
## 1 120 months (more info)         Irregularly   Aug 25, 2014 Oct 21, 2014
##   Currency.Exchange.Loss.
## 1                    N/A
```

```r
numvec2 <- c(786671,785489)

set.seed(5)
numvec <- sample(5000:7914, size = 10)+780000

download <- data.frame(startnum = numvec) %>%
  mutate(url = paste0("http://www.kiva.org/lend/", startnum)) %>%
  group_by(url) %>%
  do(site = failwith(NULL, html)(.$url))

clean_download <- download %>%
  mutate(test = try(kiva_name(site))) %>%
  filter(!grepl("Error", x = test))
output <- clean_download %>%
  group_by(url) %>% 
  mutate(name = kiva_name(site[[1]]),
         funded = kiva_funded(site[[1]]),
         percent = kiva_percent(site[[1]]),
         amount = kiva_amt(site[[1]]),
         place = kiva_place(site[[1]])) %>%
  #separate(place, c("city", "country"), sep = ", ") %>%
  do(data.frame(., deflist_to_df(.[["site"]][[1]]))) %>%
  select(-site)
library(knitr)
kable(as.data.frame(output[1:4]))
```



|url                             |test                 |name                 |funded |
|:-------------------------------|:--------------------|:--------------------|:------|
|http://www.kiva.org/lend/785304 |Manjurani            |Manjurani            | TRUE  |
|http://www.kiva.org/lend/785320 |Janet                |Janet                | TRUE  |
|http://www.kiva.org/lend/785583 |San Valentin Group   |San Valentin Group   | TRUE  |
|http://www.kiva.org/lend/785828 |Djiguiya Group       |Djiguiya Group       | TRUE  |
|http://www.kiva.org/lend/786535 |Hanifan              |Hanifan              | TRUE  |
|http://www.kiva.org/lend/786996 |Anonymous            |Anonymous            |FALSE  |
|http://www.kiva.org/lend/787040 |Savoeun's Group      |Savoeun's Group      | TRUE  |
|http://www.kiva.org/lend/787349 |Goutami              |Goutami              | TRUE  |
|http://www.kiva.org/lend/787670 |Marjhory Rosa Derita |Marjhory Rosa Derita | TRUE  |
|http://www.kiva.org/lend/787780 |Zenie                |Zenie                | TRUE  |

