setwd("C:/Users/Subasish/Downloads")
bt_tw1 <- read.csv("drdixon.csv")
head(bt_tw1)
names(bt_tw1)


#### for NOLA
require(tm)
mydata.corpus <- Corpus(VectorSource(bt_tw1$Abstract))
# make each letter lowercase
mydata.corpus <- tm_map(mydata.corpus, tolower) 
# remove punctuation 
mydata.corpus <- tm_map(mydata.corpus, removePunctuation, preserve_intra_word_dashes=TRUE)
# remove generic and custom stopwords
my_stopwords <- c(stopwords('german'),"the", "due", "are", "not", "for", "this", "and", 
"that", "there", "with" , "beyond", "time", "from","research" , "these" , "study", "been", "both", "than", "has","now", "until", "all", "use", "two" )
mydata.corpus <- tm_map(mydata.corpus, removeWords, my_stopwords)
mydata.corpus <- tm_map(mydata.corpus, removeNumbers)


# build a term-document matrix
mydata.dtm <- TermDocumentMatrix(mydata.corpus)
mydata.dtm
dim(mydata.dtm)
# inspect the document-term matrix
#mydata.dtm
# inspect most popular words
findFreqTerms(mydata.dtm, lowfreq=100)
findAssocs(mydata.dtm, 'traffic', 0.1)

mydata.dtm2 <- removeSparseTerms(mydata.dtm, sparse=0.97)
dim(mydata.dtm2)
inspect(mydata.dtm2[1:10,1:10])

library(slam)

TDM.dense <- as.matrix(mydata.dtm2)
TDM.dense
object.size(mydata.dtm2)
object.size(TDM.dense)

library(reshape2)
TDM.dense = melt(TDM.dense, value.name = "count")
head(TDM.dense)



#inspect frequent words
(freq.terms <- findFreqTerms(mydata.dtm, lowfreq=15))

term.freq <- rowSums(as.matrix(mydata.dtm))
term.freq <- subset(term.freq, term.freq >=15)
df <- data.frame(term = names(term.freq), freq = term.freq)
library(ggplot2)

ggplot(df, aes(x=term, y=freq)) + geom_bar(stat = "identity") + 
xlab("Terms") + ylab("Count") +coord_flip()


aes(x=reorder(term, -table(term)[term]) + geom_bar()


ggplot(df, aes(x = reorder(term, -freq), y = freq)) + geom_bar(stat = "identity") + 
xlab("Terms") + ylab("Count") +coord_flip()+theme_bw()+ labs(title = "Dr. Dixon's TRR Papers")

library(topicmodels)


dtm <- as.DocumentTermMatrix(mydata.dtm)
library(topicmodels)
lda <- LDA(dtm, k = 6) # find 8 topics
term <- terms(lda,5) # first 4 terms of every topic
term

term <- apply(term, MARGIN = 2, paste, collapse = ", ")

# first topic identified for every document (tweet)
require(data.table) #fore IDate

topic <- topics(lda, 1)
topics <- data.frame(date=bt_tw1$Year, topic)
qplot(date, ..count.., data=topics, geom="density",
      fill=term[topic], position="stack")




