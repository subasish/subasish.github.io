library(dplyr)
library(tibble)
library(DT)

f <- list.files()
# all talk directories have format 'YYYYMMDD'
talks <- f[grepl("[0-9]{8}", f)]

# get yaml front matter fields from a given talk
get_yaml <- function(talk, fields = c("title", "venue", "type", "recording")) {
  txt <- readLines(file.path(talk, "index.Rmd"))
  sep <- which(txt == "---")
  front <- txt[seq.int(sep[1] + 1, sep[2] - 1)]
  yml <- yaml::yaml.load(paste(front, collapse = "\n"))
  yml[names(yml) %in% fields]
}
dauto <- talks %>%
  lapply(get_yaml) %>%
  bind_rows() %>%
  mutate(date = talks) %>%
  mutate(title = sprintf(
    '<a href="%s" target="_blank">%s</a>', sprintf("http://webinars.cpsievert.me/%s", date), title
  ))

dauto %>%
  mutate(date = as.Date(date, format = "%Y%m%d")) %>%
  arrange(desc(date)) %>%
  select(date, title, venue, recording) %>%
  datatable(escape = F, options = list(pageLength = 50), rownames = FALSE) %>%
  saveWidget(file = "index.html", title = "Carson's talks")

