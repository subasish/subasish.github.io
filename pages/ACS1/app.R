#install.packages("acs")
#install.packages("DT")
library(shiny)
library(shinydashboard)
library(leaflet)
library(DT)
library(shinyjs)
# START from code_SEERTOOL.R - SD
require(dplyr)
require(maptools) # required for rgdal to work correctly
require(tigris)
require(acs)
require(stringr) # to pad FIPS codes
require(leaflet)
library(acs)
# END from code_SEERTOOL.R - SD


# Read CSV files
#StateCountyData = read.csv("C:/SEER_ACS_Explorer_Dashboard/Data/USCounties.csv")  
#bg_land = read.csv("C:/SEER_ACS_Explorer_Dashboard/Data/BG_land.csv")  
#state_land = read.csv("C:/SEER_ACS_Explorer_Dashboard/Data/state_land.csv")  
#tract_land = read.csv("C:/SEER_ACS_Explorer_Dashboard/Data/tract_land.csv")  
#StateNonMotorPM = read.csv("C:/SEER_ACS_Explorer/Data/State_NonMooto_Performance_Measure1_GeoID.csv")
StateCountyData = read.csv("Data/USCounties.csv")  
bg_land = read.csv("Data/BG_land.csv")  
state_land = read.csv("Data/state_land.csv")  
tract_land = read.csv("Data/tract_land.csv")  
StateNonMotorPM = read.csv("Data/State_NonMooto_Performance_Measure1_GeoID.csv")

# Create State and Initial County List
StatesList <- unique(StateCountyData$State)
StateCountyList <- subset(StateCountyData$County, StateCountyData$State == "AL")
StateCountyData$County <- as.character(StateCountyData$County)
StateNameList <- data.frame(
  unique(StateCountyData[c("State","StateID")])
)

# Set land data
bg_land$GEOID <- substr(bg_land$GEOID_Data, 8, 19)
bg_L <- bg_land[c(18, 17)]
names(state_land)[names(state_land) == 'GEOID'] <- 'GEOIDin'
state_land$GEOID <- substr(state_land$GEOID_Data, 8, 9)
state_L <- state_land[c(20, 19)]
tract_land$GEOID <- substr(tract_land$GEOID_Data, 8, 18)
tract_L <- tract_land[c(18, 17)]

# Start Creating Dashboard layout
header <- dashboardHeader(
  title = "SEER ACS Explorer"
)

body <- dashboardBody(useShinyjs(),
                      tabsetPanel(
                        tabPanel(HTML(paste(tags$span(style="font-size: 18px", "Introduction"))),
                                 tags$br(),
                                 tags$h1(tags$b("Scalable Risk Assessment Methods for Pedestrians and Bicyclists")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("The FHWA Office of Safety has initiated the Scalable Risk Assessment project to develop approaches to estimate pedestrian and ",
                                                                      "bicyclist risk, as well as the associated exposure to risk, at several different geographic scales. The Texas A&M ",
                                                                      "Transportation Institute (TTI) project team has developed an eight-step Scalable Risk Assessment process to select an ",
                                                                      "appropriate risk definition, geographic scale, exposure measure, and analytic method (i.e., site counts, demand models, ",
                                                                      "or travel survey).")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("The <b >Scalable Non-Motorized Exposure Tool</b> provided here in <b >BETA VERSION </b> is intended to make it easy for practitioners to obtain and ",
                                                                      "summarize nationwide travel survey data to estimate pedestrian and bicyclist exposure to risk at ",
                                                                      "several different areawide geographic scales.")),
                                 h2(),
                                 tags$h3(tags$b("Statewide Non-Motorized Exposure - All Trips (BETA)")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("The <b >Statewide</b> tab provides a simplified query tool to obtain statewide pedestrian and bicyclist exposure estimates for each year ",
                                                                      "between 2009 and 2015. Three statewide exposure measures are reported separately for pedestrian and bicyclist trips:")),
                                 h2(),
                                 tags$span(style="font-size: 18px", tags$ul(
                                   tags$li("Total estimated annual trips"),
                                   tags$li("Total estimated annual miles traveled"),
                                   tags$li("Total estimated annual hours traveled")
                                 )
                                 ),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("The statewide exposure estimates are based on a combination of the U.S. Census Bureau's American Community Survey (ACS) and FHWA's", 
                                                                      "2009 National Household Travel Survey (NHTS). The ACS records primary commute trips only on an annual basis, whereas NHTS records all",
                                                                      "trips about once a decade. Therefore, the NHTS total trips are adjusted to represent better the selected analysis year by using the", 
                                                                      "more current ACS population and commute travel estimates. The adjustment factors account for change in both population and the number", 
                                                                      "of commute trips per mode over time. The NHTS average trip lengths and average trip durations per state are then applied to the total", 
                                                                      "trips to estimate the number of miles and hours traveled annually per mode for each state. The exposure estimates are graphically", 
                                                                      "displayed in a color-coded map and are available for download in CSV format.")),
                                 h2(),
                                 tags$h3(tags$b("Scalable Non-Motorized Exposure - Commute Trips Only (BETA)")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("The <b >Scalable</b> tab offers more query options and provides exposure estimates at more detailed geographic scales, such as county, census tract,",
                                                                      "or census block group. Because these more detailed geographic scales are provided, the exposure estimates are based on the ACS", 
                                                                      "only (i.e., the NHTS estimates are not considered statistically reliable at these detailed geographic scales).  The query tool", 
                                                                      "provides options for one-, three-, and five-year estimates for pedestrian and bicyclist commute trips (the recommended exposure measure), total commute trips, and", 
                                                                      "total population. Note that this query tool does not perform any adjustments to the ACS trip information-it simply queries the", 
                                                                      "available ACS database. The estimates are graphically displayed in a color-coded map and are available for download in CSV format.")),
                                 tags$h3(tags$b("Acknowledgments")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("The development of these query tools was funded by the FHWA Office of Safety through the Scalable Risk Assessment project, managed ",
                                                                      "by Tamara Redmon, <a href='mailto:Tamara.Redmon@dot.gov'>Tamara.Redmon@dot.gov</a>. Gabe Rousseau of FHWA provided key input.")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("The query tools were created by the TTI project team, which includes the University of Michigan and Kimley-Horn. ",
                                                                      "L.D. White, Subasish Das, and Michael Martin at TTI developed this beta version of the Scalable Non-Motorized Exposure Tool, ",
                                                                      "and Kay Fitzpatrick of TTI provided key input and review.")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("Questions about these tools can be sent to the TTI Project Manager, Shawn Turner, <a href='mailto:s-turner@tti.tamu.edu'>s-turner@tti.tamu.edu</a>.")),
                                 h2(),
                                 div(style = "font-size: 18px;", HTML("Last updated: December 13, 2017")),
                                 tags$br(),
                                 tags$br()
                        ),
                        tabPanel(HTML(paste(tags$span(style="font-size: 18px", "Statewide (BETA)"))), id="StNmPM",
                                 tags$h1(tags$b("Statewide Non-Motorized Exposure - All Trips (BETA)")),
                                 fluidRow(
                                   column(width = 9,
                                          box(width = NULL, solidHeader = TRUE,
                                              leafletOutput("StNmPMmap", height = 600),
                                              h2(),
                                              DT::dataTableOutput('acsDTStNmPM'),
                                              h2(),tags$br(),
                                              h2(),tags$br()                                          )
                                   ),
                                   column(width = 3,
                                          box(width = NULL, status = "warning",
                                              selectInput("YearInputStNmPM","ACS Estimate Years",choices = list("2015" = 2015, "2014" = 2014, "2013" = 2013, "2012" = 2012, "2011" = 2011, "2010" = 2010, "2009" = 2009), selected = 2015),
                                              radioButtons("ModeInputStNmPM", label = "Mode", choices = list("Bike", "Walk"), inline=TRUE),
                                              h2(),
                                              radioButtons("MapDataSelectionStNmPM", label = "Map Data Selection:", choices = list('Estimated Annual Trips','Estimated Annual Miles Traveled',
                                                                                                                                   'Estimated Annual Hours Traveled'), 
                                                           selected = 'Estimated Annual Trips', inline=FALSE),
                                              h2(),
                                              actionButton(inputId = "RefreshMapStNmPM", label = "Refresh Map", class = "butt"),
                                              tags$head(tags$style(".butt{background-color:#0000FF;} .butt{color: white;}")), # background color and font color
                                              downloadButton("downloadDataStNmPM",label ="Download Data")
                                          )
                                   )
                                 ),
                                 h2(),tags$br(),
                                 h2(),tags$br()
                                 
                        ),
                        tabPanel(HTML(paste(tags$span(style="font-size: 18px", "Scalable (BETA)"))), id="ACSexplorer",
                                 tags$h1(tags$b("Scalable Non-Motorized Exposure - Commute Trips Only (BETA)")),
                                 fluidRow(
                                   column(width = 9,
                                          box(width = NULL, solidHeader = TRUE,
                                              leafletOutput("busmap", height = 600),
                                              h2(),
                                              DT::dataTableOutput('acsDT'),
                                              h2(),tags$br(),
                                              h2(),tags$br()
                                          )
                                   ),
                                   column(width = 3,
                                          box(width = NULL, status = "warning",
                                              radioButtons("TimeSpan", "ACS Selection",choices = c("5 Year ACS" = 5, "3 Year ACS" = 3, "1 Year ACS" = 1),selected = 5),
                                              htmlOutput("ACSinfoMessage"),
                                              h2(),
                                              selectInput("YearInput","ACS Estimate Years",choices = list("2011 - 2015" = 2015,"2010 - 2014" = 2014,"2009 - 2013" = 2013,
                                                                                                          "2008 - 2012" = 2012,"2007 - 2011" = 2011,"2006 - 2010" = 2010), selected = 2015),
                                              selectInput("StateInput","State",choices = StatesList),
                                              selectInput("CountyInput","County",choices = c("All Counties",StateCountyList)),
                                              radioButtons("SpatialInput", label = "Spatial", choices = list("Tract", "Block Group"), inline=TRUE),
                                              radioButtons("ModeInput", label = "Mode", choices = list("Bike", "Walk"), inline=TRUE),
                                              actionButton(inputId = "RefreshMap", label = "Refresh Map", class = "butt"),
                                              tags$head(tags$style(".butt{background-color:#0000FF;} .butt{color: white;}")), # background color and font color
                                              downloadButton("downloadData",label ="Download Data")
                                          )
                                   )
                                   
                                 ),
                                 h2(),tags$br(),
                                 h2(),tags$br()
                                 
                        )
                      )
)

# Put them together into a dashboardPage
ui <- dashboardPage(
  #header,
  dashboardHeader(disable = TRUE),
  dashboardSidebar(disable = TRUE),
  body
)

server <- function(input, output, session) {
  
  observeEvent(input$TimeSpan, 
               if(input$TimeSpan==1){
                 updateSelectInput(session, "YearInput","ACS Estimate Years",choices = list("2013" = 2013, "2012" = 2012), selected = 2013)
               }else{
                 if(input$TimeSpan==3){
                   updateSelectInput(session, "YearInput","ACS Estimate Years",choices = list("2011 - 2013" = 2013, "2010 - 2012" = 2012), selected = 2013)
                 }else{
                   updateSelectInput(session, "YearInput","ACS Estimate Years",choices = list("2011 - 2015" = 2015,"2010 - 2014" = 2014,"2009 - 2013" = 2013,
                                                                                              "2008 - 2012" = 2012,"2007 - 2011" = 2011,"2006 - 2010" = 2010), selected = 2015)
                 }
               }
  )  
  observeEvent(input$TimeSpan, 
               if(input$TimeSpan==1){
                 updateSelectInput(session, "StateInput","State",choices = "All States")
               }else{
                 if(input$TimeSpan==3){
                   updateSelectInput(session, "StateInput","State",choices = "All States")
                 }else{
                   updateSelectInput(session, "StateInput","State",choices = StatesList)
                 }
               }
  )  
  observeEvent(input$TimeSpan, 
               if(input$TimeSpan==1){
                 disable("CountyInput")
               }else{
                 if(input$TimeSpan==3){
                   disable("CountyInput")
                 }else{
                   enable("CountyInput")
                 }
               }
  )  
  
  
  observeEvent(input$StateInput, 
               StateCountyList <- as.character(subset(StateCountyData$County, StateCountyData$State == input$StateInput))
  )  
  observeEvent(input$StateInput, 
               if(input$StateInput=="All States"){
                 updateSelectInput(session, "CountyInput","County",choices = "")
               }else{
                 updateSelectInput(session, "CountyInput","County",
                                   choices = c("All Counties",
                                               subset(StateCountyData$County, StateCountyData$State == input$StateInput)))
               }
  )  
  observeEvent(input$TimeSpan, 
               if(input$TimeSpan==1){
                 disable("StateInput")
               }else{
                 if(input$TimeSpan==3){
                   disable("StateInput")
                 }else{
                   enable("StateInput")
                 }
               }
  )  
  observeEvent(input$CountyInput, 
               if(input$CountyInput==""){
                 updateRadioButtons(session, "SpatialInput", label = "Spatial", choices = list("State"))
               }else{
                 if(input$CountyInput=="All Counties"){
                   updateRadioButtons(session, "SpatialInput", label = "Spatial", choices = list("Tract"))
                 }else{
                   updateRadioButtons(session, "SpatialInput", label = "Spatial", choices = list("Block Group"))
                 }
               }
  )  
  
  output$ACSinfoMessage <- renderUI({
    HTML("Note: Selection of 5-year ACS is statistically reliable for small spatial units (tract and block group level). 
         Selection of 3-year ACS or 1-year ACS is beneficial for larger spatial units (state).")
  })
  
  output$busmap <- renderLeaflet({
    
    leaflet() %>%
      addProviderTiles("CartoDB.Positron") %>%
      setView(-98.35, 39.7, zoom = 4)
    
  })
  
  observeEvent(input$RefreshMap, {
    
    withProgress(message = 'Processing ', value = 0, {
      
      #StateInput <- "AR"
      #YearInput <- 2015
      TimeSpan <- input$TimeSpan
      YearInput <- input$YearInput
      StateInput <- input$StateInput
      CountyInput <- input$CountyInput
      SpatialInput <- input$SpatialInput
      ModeInput <- input$ModeInput
      CountyCode <- subset(StateCountyData$CountyID, StateCountyData$State == StateInput & StateCountyData$County == CountyInput)
      
      TimeSpanDesc <- ifelse(TimeSpan == 5,"5 Year ACS",ifelse(TimeSpan == 3,"3 Year ACS","1 Year ACS"))
      YearDesc <- if (TimeSpan == 5) {
        
        ifelse(YearInput == 2015,"2011 - 2015",ifelse(YearInput == 2014,"2010 - 2014",
                                                      ifelse(YearInput == 2013,"2009 - 2013",
                                                             ifelse(YearInput == 2012,"2008 - 2012",
                                                                    ifelse(YearInput == 2011,
                                                                           "2007 - 2011","2006 - 2010")
                                                             )
                                                      )
        )
        )
        
      }else{
        if (TimeSpan == 3) {
          
          ifelse(YearInput == 2013,"2011 - 2013","2010 - 2012")
          
        }else{
          
          YearInput
        }
      }
      
      TimeYearDesc <- paste(TimeSpanDesc,": ",YearDesc)
      
      if(TimeSpan == 1 || TimeSpan == 3){
        
        incProgress(1/6, detail = paste("Retrieving Geography..."))
        states <- states(cb = TRUE)
        
        incProgress(2/6, detail = paste("Retrieving Data..."))
        fetched <- acs.fetch(
          geography = geo.make(state="*"),
          endyear = YearInput, span = TimeSpan,# Package only goes to 2013, so end=2012
          table.number = "B08301", # Table showing 'Income'
          key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
          col.names = "pretty")
        
        ### names(attributes(fetched))    # see what's available
        
        ### attr(fetched, "acs.colnames") # see column names
        
        incProgress(3/6, detail = paste("Retrieving Data..."))
        fetched1 <- acs.fetch(
          geography = geo.make(state="*"),
          endyear = YearInput, span = TimeSpan,# Package only goes to 2013, so end=2012
          table.number = "B01003", # Table showing 'Income'
          key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
          col.names = "pretty")
        
        incProgress(4/6, detail = paste("Preparing Output..."))
        if(ModeInput == "Bike"){
          acs_df <- data.frame(
            paste0(
              str_pad(fetched@geography$state,  2, "left", pad="0"), 
              str_pad(fetched@geography$county, 3, "left", pad="0"), 
              str_pad(fetched@geography$tract,  6, "left", pad="0")),
            fetched@estimate[,c("Means of Transportation to Work: Total:", 
                                "Means of Transportation to Work: Bicycle")], 
            stringsAsFactors = FALSE)
          
          acs_df           <- select(acs_df, 1:3) %>% tbl_df()
          rownames(acs_df) <- 1:nrow(acs_df)
          names(acs_df)    <- c("GEOID", "total", "bike")
          acs_df$percent   <- round(100*(acs_df$bike/acs_df$total),2)
          acs_df$percent <- replace(acs_df$percent, is.na(acs_df$percent), 0)   #### to remove NaN
          #head(acs_df)
          
          acs_df1 <- data.frame(
            paste0(
              str_pad(fetched1@geography$state,  2, "left", pad="0"), 
              str_pad(fetched1@geography$county, 3, "left", pad="0"), 
              str_pad(fetched1@geography$tract,  6, "left", pad="0")),
            fetched1@estimate[,c("Total Population: Total")], 
            stringsAsFactors = FALSE)
          acs_df1           <- select(acs_df1, 1:2) %>% tbl_df()
          rownames(acs_df1) <- 1:nrow(acs_df1)
          names(acs_df1)    <- c("GEOID", "popu")
          acs_df <- merge(acs_df, acs_df1, by="GEOID")
          
          df_merged <- geo_join(states, acs_df, "GEOID", "GEOID")
          #head(df_merged)
          df_merged <- df_merged[df_merged$ALAND>0,]
          #head(df_merged)
          df_merged <- df_merged[!(is.na(df_merged$percent)),]   ###drop missing (NA) values
          
          #popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Commuters (16 Yrs and above) used Bicycle (%): ", round(df_merged$percent,2))
          #pal <- colorNumeric(
          #  palette = "YlOrRd",
          #  domain = df_merged$percent
          #)
          popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Estimated Bike/Total Commute Trips (%) - ", round(df_merged$percent,2),
                          "<br>","Estimated Total Commute Trips - ", round(df_merged$total,2),"<br>","Exposure: Estimated Bike Commute Trips - ", round(df_merged$bike,2))
          pal <- colorNumeric(
            palette = "YlOrRd",
            domain = df_merged$bike
          )
          label <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID)
          
          acsT1 <- acs_df
          acsT1$StateID <- as.numeric(acsT1$GEOID)
          acsT1 <- merge(acsT1, StateNameList, by="StateID")
          acsT1$County <- "All Counties"
          acsT1 <- merge(acsT1, state_L, by="GEOID")
          acsT2 <- acsT1[c(7,8,1,6,9,5,3,4)]
          acsT2$percent <- round(acsT2$percent, 2)
          acsDTtemp <- datatable(cbind(TimeYearDesc,acsT2),  class = 'cell-border stripe', colnames = c('Record No.','Time Period','State', 'County', 'GeoID (State)', 'Population Estimates',
                                                                                                        'Land Area in Square Mile', 
                                                                                                        'Estimated Bike/Total Commute Trips (%)', 
                                                                                                        'Estimated Total Commute Trips', 
                                                                                                        'Exposure: Estimated Bike Commute Trips')
          ) %>% formatRound('percent', 2)
          output$acsDT = DT::renderDataTable(acsDTtemp, options = list(lengthChange = FALSE))
          
          acsT2dowload <- cbind(TimeYearDesc,acsT2)
          names(acsT2dowload) <- c('Time Period','State', 'County', 'GeoID (State)', 'Population Estimates',
                                   'Land Area in Square Mile', 
                                   'Estimated Bike/Total Commute Trips (%)', 
                                   'Estimated Total Commute Trips', 
                                   'Exposure: Estimated Bike Commute Trips')
          
          incProgress(5/6, detail = paste("Writing Output..."))
        }else{
          acs_df <- data.frame(
            paste0(
              str_pad(fetched@geography$state,  2, "left", pad="0"), 
              str_pad(fetched@geography$county, 3, "left", pad="0"), 
              str_pad(fetched@geography$tract,  6, "left", pad="0")),
            fetched@estimate[,c("Means of Transportation to Work: Total:", 
                                "Means of Transportation to Work: Walked")], 
            stringsAsFactors = FALSE)
          
          acs_df           <- select(acs_df, 1:3) %>% tbl_df()
          rownames(acs_df) <- 1:nrow(acs_df)
          names(acs_df)    <- c("GEOID", "total", "walk")
          acs_df$percent   <- round(100*(acs_df$walk/acs_df$total),2)
          acs_df$percent <- replace(acs_df$percent, is.na(acs_df$percent), 0)   #### to remove NaN
          ### head(acs_df)
          
          acs_df1 <- data.frame(
            paste0(
              str_pad(fetched1@geography$state,  2, "left", pad="0"), 
              str_pad(fetched1@geography$county, 3, "left", pad="0"), 
              str_pad(fetched1@geography$tract,  6, "left", pad="0")),
            fetched1@estimate[,c("Total Population: Total")], 
            stringsAsFactors = FALSE)
          acs_df1           <- select(acs_df1, 1:2) %>% tbl_df()
          rownames(acs_df1) <- 1:nrow(acs_df1)
          names(acs_df1)    <- c("GEOID", "popu")
          acs_df <- merge(acs_df, acs_df1, by="GEOID")
          
          df_merged <- geo_join(states, acs_df, "GEOID", "GEOID")
          #head(df_merged)
          df_merged <- df_merged[df_merged$ALAND>0,]
          #head(df_merged)
          df_merged <- df_merged[!(is.na(df_merged$percent)),]   ###drop missing (NA) values
          
          
          #popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Commuters (16 Yrs and above) Walked (%): ", round(df_merged$percent,2))
          #pal <- colorNumeric(
          #  palette = "YlOrRd",
          #  domain = df_merged$percent
          #)
          popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Estimated Walk/Total Commute Trips (%) - ", round(df_merged$percent,2),
                          "<br>","Estimated Total Commute Trips - ", round(df_merged$total,2),"<br>","Exposure: Estimated Walk Commute Trips - ", round(df_merged$walk,2))
          pal <- colorNumeric(
            palette = "YlOrRd",
            domain = df_merged$walk
          )
          label <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID)
          
          acsT1 <- acs_df
          acsT1$StateID <- as.numeric(acsT1$GEOID)
          acsT1 <- merge(acsT1, StateNameList, by="StateID")
          acsT1$County <- "All Counties"
          acsT1 <- merge(acsT1, state_L, by="GEOID")
          acsT2 <- acsT1[c(7,8,1,6,9,5,3,4)]
          acsT2$percent <- round(acsT2$percent, 2)
          acsDTtemp <- datatable(cbind(TimeYearDesc,acsT2),  class = 'cell-border stripe', colnames = c('Record No.','Time Period','State', 'County', 'GeoID (State)', 'Population Estimates',
                                                                                                        'Land Area in Square Mile', 
                                                                                                        'Estimated Walk/Total Commute Trips (%)', 
                                                                                                        'Estimated Total Commute Trips', 
                                                                                                        'Exposure: Estimated Walk Commute Trips')
          ) %>% formatRound('percent', 2)
          output$acsDT = DT::renderDataTable(acsDTtemp, options = list(lengthChange = FALSE))
          
          acsT2dowload <- cbind(TimeYearDesc,acsT2)
          names(acsT2dowload) <- c('Time Period','State', 'County', 'GeoID (State)', 'Population Estimates',
                                   'Land Area in Square Mile', 
                                   'Estimated Walk/Total Commute Trips (%)', 
                                   'Estimated Total Commute Trips', 
                                   'Exposure: Estimated Walk Commute Trips')
          
          incProgress(5/6, detail = paste("Writing Output..."))
        }  
      }else{
        ### TimeSpan = 5
        if(CountyInput == "All Counties"){
          
          incProgress(1/6, detail = paste("Retrieving Geography..."))
          tracts <- tracts(state = StateInput, cb=TRUE)
          
          incProgress(2/6, detail = paste("Retrieving Data..."))
          fetched <- acs.fetch(
            geography = geo.make(state = StateInput, county="*", tract = "*"),
            endyear = YearInput, span = TimeSpan,# Package only goes to 2013, so end=2012
            table.number = "B08301", # Table showing 'Income'
            key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
            col.names = "pretty")    # Gives the full column definitions
          
          ### head(fetched)
          
          incProgress(3/6, detail = paste("Retrieving Data..."))
          fetched1 <- acs.fetch(
            geography = geo.make(state = StateInput, county="*", tract = "*"),
            endyear = YearInput, span = TimeSpan,# Package only goes to 2013, so end=2012
            table.number = "B01003", # Table showing 'Income'
            key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
            col.names = "pretty")    # Gives the full column definitions
          
          ### names(attributes(fetched))    # see what's available
          
          ### attr(fetched, "acs.colnames") # see column names
          
          incProgress(4/6, detail = paste("Preparing Output..."))
          if(ModeInput == "Bike"){
            acs_df <- data.frame(
              paste0(
                str_pad(fetched@geography$state,  2, "left", pad="0"), 
                str_pad(fetched@geography$county, 3, "left", pad="0"), 
                str_pad(fetched@geography$tract,  6, "left", pad="0")),
              fetched@estimate[,c("Means of Transportation to Work: Total:", 
                                  "Means of Transportation to Work: Bicycle")], 
              stringsAsFactors = FALSE)
            
            ### head(acs_df)
            
            ###write.csv(acs_df, "Data2.csv")
            
            acs_df           <- select(acs_df, 1:3) %>% tbl_df()
            rownames(acs_df) <- 1:nrow(acs_df)
            names(acs_df)    <- c("GEOID", "total", "bike")
            acs_df$percent   <- 100*(acs_df$bike/acs_df$total)
            acs_df$percent <- replace(acs_df$percent, is.na(acs_df$percent), 0)   #### to remove NaN
            ### head(acs_df)
            
            acs_df1 <- data.frame(
              paste0(
                str_pad(fetched1@geography$state,  2, "left", pad="0"), 
                str_pad(fetched1@geography$county, 3, "left", pad="0"), 
                str_pad(fetched1@geography$tract,  6, "left", pad="0")),
              fetched1@estimate[,c("Total Population: Total")], 
              stringsAsFactors = FALSE)
            acs_df1           <- select(acs_df1, 1:2) %>% tbl_df()
            rownames(acs_df1) <- 1:nrow(acs_df1)
            names(acs_df1)    <- c("GEOID", "popu")
            acs_df <- merge(acs_df, acs_df1, by="GEOID")
            
            df_merged <- geo_join(tracts, acs_df, "GEOID", "GEOID")
            ### head(df_merged)
            
            df_merged$StateCounty <- as.numeric(paste0(df_merged$STATEFP, df_merged$COUNTYFP))
            # head(df_merged)
            
            df_merged <- merge(df_merged, StateCountyData, by="StateCounty")
            
            # there are some tracts with no land that we should exclude
            df_merged <- df_merged[df_merged$ALAND>0,]
            ### head(df_merged)
            
            #popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Commuters (16 Yrs and above) used Bicycle (%): ", round(df_merged$percent,2))
            #pal <- colorNumeric(
            #  palette = "YlOrRd",
            #  domain = df_merged$percent
            #)
            popup <- paste0(df_merged$County, ", GeoID: ", df_merged$GEOID, "<br>", "Estimated Bike/Total Commute Trips (%) - ", round(df_merged$percent,2),
                            "<br>","Estimated Total Commute Trips - ", round(df_merged$total,2),"<br>","Exposure: Estimated Bike Commute Trips - ", round(df_merged$bike,2))
            pal <- colorNumeric(
              palette = "YlOrRd",
              domain = df_merged$bike
            )
            label <- paste0(df_merged$County, ", ", "GeoID: ", df_merged$GEOID)
            
            acsT1 <- acs_df
            acsT1$StateCounty <- as.numeric(substr(acsT1$GEOID, 1, 5))
            acsT1 <- merge(acsT1, StateCountyData, by="StateCounty")
            acsT1 <- merge(acsT1, tract_L, by="GEOID")
            acsT2 <- acsT1[c(7,10,1,6,11,5,3,4)]
            acsT2$percent <- round(acsT2$percent, 2)
            acsDTtemp <- datatable(cbind(TimeYearDesc,acsT2),  class = 'cell-border stripe', colnames = c('Record No.','Time Period','State', 'County', 
                                                                                                          'GeoID (Tract)', 'Population Estimates', 
                                                                                                          'Land Area in Square Mile', 
                                                                                                          'Estimated Bike/Total Commute Trips (%)', 
                                                                                                          'Estimated Total Commute Trips', 
                                                                                                          'Exposure: Estimated Bike Commute Trips')
            ) %>% formatRound('percent', 2)
            output$acsDT = DT::renderDataTable(acsDTtemp, options = list(lengthChange = FALSE))
            
            acsT2dowload <- cbind(TimeYearDesc,acsT2)
            names(acsT2dowload) <- c('Time Period','State', 'County', 'GeoID (Tract)', 'Population Estimates', 'Land Area in Square Mile', 
                                     'Estimated Bike/Total Commute Trips (%)', 
                                     'Estimated Total Commute Trips', 
                                     'Exposure: Estimated Bike Commute Trips')
            
            incProgress(5/6, detail = paste("Writing Output..."))
            
          }else{
            acs_df <- data.frame(
              paste0(
                str_pad(fetched@geography$state,  2, "left", pad="0"), 
                str_pad(fetched@geography$county, 3, "left", pad="0"), 
                str_pad(fetched@geography$tract,  6, "left", pad="0")),
              fetched@estimate[,c("Means of Transportation to Work: Total:", 
                                  "Means of Transportation to Work: Walked")], 
              stringsAsFactors = FALSE)
            
            ### head(acs_df)
            
            acs_df           <- select(acs_df, 1:3) %>% tbl_df()
            rownames(acs_df) <- 1:nrow(acs_df)
            names(acs_df)    <- c("GEOID", "total", "walk")
            acs_df$percent   <- 100*(acs_df$walk/acs_df$total)
            acs_df$percent <- replace(acs_df$percent, is.na(acs_df$percent), 0)   #### to remove NaN
            ### head(acs_df)
            
            acs_df1 <- data.frame(
              paste0(
                str_pad(fetched1@geography$state,  2, "left", pad="0"), 
                str_pad(fetched1@geography$county, 3, "left", pad="0"), 
                str_pad(fetched1@geography$tract,  6, "left", pad="0")),
              fetched1@estimate[,c("Total Population: Total")], 
              stringsAsFactors = FALSE)
            acs_df1           <- select(acs_df1, 1:2) %>% tbl_df()
            rownames(acs_df1) <- 1:nrow(acs_df1)
            names(acs_df1)    <- c("GEOID", "popu")
            acs_df <- merge(acs_df, acs_df1, by="GEOID")
            
            df_merged <- geo_join(tracts, acs_df, "GEOID", "GEOID")
            ### head(df_merged)
            
            df_merged$StateCounty <- as.numeric(paste0(df_merged$STATEFP, df_merged$COUNTYFP))
            # head(df_merged)
            
            df_merged <- merge(df_merged, StateCountyData, by="StateCounty")
            
            # there are some tracts with no land that we should exclude
            df_merged <- df_merged[df_merged$ALAND>0,]
            ### head(df_merged)
            
            #popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Commuters (16 Yrs and above) Walked (%): ", round(df_merged$percent,2))
            #pal <- colorNumeric(
            #  palette = "YlOrRd",
            #  domain = df_merged$percent
            #)
            popup <- paste0(df_merged$County, ", GeoID: ", df_merged$GEOID, "<br>", "Estimated Walk/Total Commute Trips (%) - ", round(df_merged$percent,2),
                            "<br>","Estimated Total Commute Trips - ", round(df_merged$total,2),"<br>","Exposure: Estimated Walk Commute Trips - ", round(df_merged$walk,2))
            pal <- colorNumeric(
              palette = "YlOrRd",
              domain = df_merged$walk
            )
            label <- paste0(df_merged$County, ", ", "GeoID: ", df_merged$GEOID)
            
            acsT1 <- acs_df
            acsT1$StateCounty <- as.numeric(substr(acsT1$GEOID, 1, 5))
            acsT1 <- merge(acsT1, StateCountyData, by="StateCounty")
            acsT1 <- merge(acsT1, tract_L, by="GEOID")
            acsT2 <- acsT1[c(7,10,1,6,11,5,3,4)]
            acsT2$percent <- round(acsT2$percent, 2)
            acsDTtemp <- datatable(cbind(TimeYearDesc,acsT2),  class = 'cell-border stripe', colnames = c('Record No.','Time Period','State', 'County', 'GeoID (Tract)', 
                                                                                                          'Population Estimates', 'Land Area in Square Mile', 
                                                                                                          'Estimated Walk/Total Commute Trips (%)', 
                                                                                                          'Estimated Total Commute Trips', 
                                                                                                          'Exposure: Estimated Walk Commute Trips')
            ) %>% formatRound('percent', 2)
            output$acsDT = DT::renderDataTable(acsDTtemp, options = list(lengthChange = FALSE))
            
            acsT2dowload <- cbind(TimeYearDesc,acsT2)
            names(acsT2dowload) <- c('Time Period','State', 'County', 'GeoID (Tract)', 'Population Estimates', 'Land Area in Square Mile', 
                                     'Estimated Walk/Total Commute Trips (%)', 
                                     'Estimated Total Commute Trips', 
                                     'Exposure: Estimated Walk Commute Trips')
            
            incProgress(4/5, detail = paste("Writing Output..."))
            
          }  
          
        }else{
          
          if(ModeInput == "Bike"){
            
            incProgress(1/6, detail = paste("Retrieving Geography..."))
            bg <- block_groups(StateInput, county=CountyCode, cb=TRUE)
            ### head(bg)
            
            
            incProgress(2/6, detail = paste("Retrieving Data..."))
            fetched <- acs.fetch(
              geography = geo.make(state = StateInput, county=CountyCode, tract = "*", block.group = "*"),
              endyear = YearInput,span=TimeSpan,# Package only goes to 2013, so end=2012
              table.number = "B08301", key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
              col.names = "pretty") 
            
            ### head(fetched)
            
            ### names(attributes(fetched))    # see what's available
            
            ### attr(fetched, "acs.colnames") # see column names
            
            incProgress(3/6, detail = paste("Retrieving Data..."))
            fetched1 <- acs.fetch(
              geography = geo.make(state = StateInput, county=CountyCode, tract = "*", block.group = "*"),
              endyear = YearInput,span=TimeSpan,# Package only goes to 2013, so end=2012
              table.number = "B01003", key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
              col.names = "pretty") 
            
            incProgress(4/6, detail = paste("Preparing Output..."))
            acs_df <- data.frame(
              paste0(
                str_pad(fetched@geography$state,  2, "left", pad="0"), 
                str_pad(fetched@geography$county, 3, "left", pad="0"), 
                str_pad(fetched@geography$tract,  6, "left", pad="0"),
                str_pad(fetched@geography$blockgroup,  1, "left", pad="0")),
              fetched@estimate[,c("Means of Transportation to Work: Total:", 
                                  "Means of Transportation to Work: Bicycle")], 
              stringsAsFactors = FALSE)
            
            ### head(acs_df)
            
            acs_df           <- select(acs_df, 1:3) %>% tbl_df()
            rownames(acs_df) <- 1:nrow(acs_df)
            names(acs_df)    <- c("GEOID", "total", "bike")
            acs_df$percent   <- 100*(acs_df$bike/acs_df$total)
            acs_df$percent <- replace(acs_df$percent, is.na(acs_df$percent), 0)   #### to remove NaN
            ### head(acs_df)
            
            ###write.csv(acs_df, "Data1.csv")
            
            acs_df1 <- data.frame(
              paste0(
                str_pad(fetched1@geography$state,  2, "left", pad="0"), 
                str_pad(fetched1@geography$county, 3, "left", pad="0"), 
                str_pad(fetched1@geography$tract,  6, "left", pad="0"),
                str_pad(fetched1@geography$blockgroup,  1, "left", pad="0")),
              fetched1@estimate[,c("Total Population: Total")], 
              stringsAsFactors = FALSE)
            acs_df1           <- select(acs_df1, 1:2) %>% tbl_df()
            rownames(acs_df1) <- 1:nrow(acs_df1)
            names(acs_df1)    <- c("GEOID", "popu")
            acs_df <- merge(acs_df, acs_df1, by="GEOID")
            
            df_merged <- geo_join(bg, acs_df, "GEOID", "GEOID")
            ### head(df_merged)
            
            df_merged$StateCounty <- as.numeric(paste0(df_merged$STATEFP, df_merged$COUNTYFP))
            # head(df_merged)
            
            df_merged <- merge(df_merged, StateCountyData, by="StateCounty")
            
            ##there are some tracts with no land that we should exclude
            df_merged2 <- df_merged[df_merged$ALAND>0,]
            ### head(df_merged2)
            
            #popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Commuters (16 Yrs and above) used Bicycle (%): ", round(df_merged$percent,2))
            #pal <- colorNumeric(
            #  palette = "YlOrRd",
            #  domain = df_merged$percent
            #)
            popup <- paste0(df_merged$County, ", GeoID: ", df_merged$GEOID, "<br>", "Estimated Bike/Total Commute Trips (%) - ", round(df_merged$percent,2),
                            "<br>","Estimated Total Commute Trips - ", round(df_merged$total,2),"<br>","Exposure: Estimated Bike Commute Trips - ", round(df_merged$bike,2))
            pal <- colorNumeric(
              palette = "YlOrRd",
              domain = df_merged$bike
            )
            label <- paste0(df_merged2$County, ", ", "GeoID: ", df_merged2$GEOID)
            
            acsT1 <- acs_df
            acsT1$StateCounty <- as.numeric(substr(acsT1$GEOID, 1, 5))
            acsT1 <- merge(acsT1, StateCountyData, by="StateCounty")
            acsT1 <- merge(acsT1, bg_L, by="GEOID")
            acsT2 <- acsT1[c(7,10,1,6,11,5,3,4)]
            acsT2$percent <- round(acsT2$percent, 2)
            acsDTtemp <- datatable(cbind(TimeYearDesc,acsT2),  class = 'cell-border stripe', colnames = c('Record No.','Time Period','State', 'County', 
                                                                                                          'GeoID (Block Group)', 'Population Estimates', 
                                                                                                          'Land Area in Square Mile', 
                                                                                                          'Estimated Bike/Total Commute Trips (%)', 
                                                                                                          'Estimated Total Commute Trips', 
                                                                                                          'Exposure: Estimated Bike Commute Trips')
            ) %>% formatRound('percent', 2)
            output$acsDT = DT::renderDataTable(acsDTtemp, options = list(lengthChange = FALSE))
            
            acsT2dowload <- cbind(TimeYearDesc,acsT2)
            names(acsT2dowload) <- c('Time Period','State', 'County', 'GeoID (Block Group)', 'Population Estimates', 'Land Area in Square Mile', 
                                     'Estimated Bike/Total Commute Trips (%)', 
                                     'Estimated Total Commute Trips', 
                                     'Exposure: Estimated Bike Commute Trips')
            
            incProgress(4/6, detail = paste("Writing Output..."))
            
            
          }else{
            
            incProgress(1/6, detail = paste("Retrieving Geography..."))
            bg <- block_groups(StateInput, county=CountyCode, cb=TRUE)
            ### head(bg)
            
            
            incProgress(2/6, detail = paste("Retrieving Data..."))
            fetched <- acs.fetch(
              geography = geo.make(state = StateInput, county=CountyCode, tract = "*", block.group = "*"),
              endyear = YearInput,span=TimeSpan,# Package only goes to 2013, so end=2012
              table.number = "B08301", key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
              col.names = "pretty") 
            
            ### head(fetched)
            
            ### names(attributes(fetched))    # see what's available
            
            ### attr(fetched, "acs.colnames") # see column names
            
            incProgress(3/6, detail = paste("Retrieving Data..."))
            fetched1 <- acs.fetch(
              geography = geo.make(state = StateInput, county=CountyCode, tract = "*", block.group = "*"),
              endyear = YearInput,span=TimeSpan,# Package only goes to 2013, so end=2012
              table.number = "B01003", key="12c55b28a8b13fd30e88db9e59bee9edd0fa8ce1",
              col.names = "pretty") 
            
            incProgress(4/6, detail = paste("Preparing Output..."))
            acs_df <- data.frame(
              paste0(
                str_pad(fetched@geography$state,  2, "left", pad="0"), 
                str_pad(fetched@geography$county, 3, "left", pad="0"), 
                str_pad(fetched@geography$tract,  6, "left", pad="0"),
                str_pad(fetched@geography$blockgroup,  1, "left", pad="0")),
              fetched@estimate[,c("Means of Transportation to Work: Total:", 
                                  "Means of Transportation to Work: Walked")], 
              stringsAsFactors = FALSE)
            
            ### head(acs_df)
            
            acs_df           <- select(acs_df, 1:3) %>% tbl_df()
            rownames(acs_df) <- 1:nrow(acs_df)
            names(acs_df)    <- c("GEOID", "total", "walk")
            acs_df$percent   <- 100*(acs_df$walk/acs_df$total)
            acs_df$percent <- replace(acs_df$percent, is.na(acs_df$percent), 0)   #### to remove NaN
            ### head(acs_df)
            
            acs_df1 <- data.frame(
              paste0(
                str_pad(fetched1@geography$state,  2, "left", pad="0"), 
                str_pad(fetched1@geography$county, 3, "left", pad="0"), 
                str_pad(fetched1@geography$tract,  6, "left", pad="0"),
                str_pad(fetched1@geography$blockgroup,  1, "left", pad="0")),
              fetched1@estimate[,c("Total Population: Total")], 
              stringsAsFactors = FALSE)
            acs_df1           <- select(acs_df1, 1:2) %>% tbl_df()
            rownames(acs_df1) <- 1:nrow(acs_df1)
            names(acs_df1)    <- c("GEOID", "popu")
            acs_df <- merge(acs_df, acs_df1, by="GEOID")
            
            df_merged <- geo_join(bg, acs_df, "GEOID", "GEOID")
            ### head(df_merged)
            
            df_merged$StateCounty <- as.numeric(paste0(df_merged$STATEFP, df_merged$COUNTYFP))
            # head(df_merged)
            
            df_merged <- merge(df_merged, StateCountyData, by="StateCounty")
            
            ##there are some tracts with no land that we should exclude
            df_merged2 <- df_merged[df_merged$ALAND>0,]
            ### head(df_merged2)
            
            #popup <- paste0(df_merged$NAME, ", GeoID: ", df_merged$GEOID, "<br>", "Commuters (16 Yrs and above) Walked (%): ", round(df_merged$percent,2))
            #pal <- colorNumeric(
            #  palette = "YlOrRd",
            #  domain = df_merged$percent
            #)
            popup <- paste0(df_merged$County, ", GeoID: ", df_merged$GEOID, "<br>", "Estimated Walk/Total Commute Trips (%) - ", round(df_merged$percent,2),
                            "<br>","Estimated Total Commute Trips - ", round(df_merged$total,2),"<br>","Exposure: Estimated Walk Commute Trips - ", round(df_merged$walk,2))
            pal <- colorNumeric(
              palette = "YlOrRd",
              domain = df_merged$walk
            )
            label <- paste0(df_merged2$County, ", ", "GeoID: ", df_merged2$GEOID)
            
            acsT1 <- acs_df
            acsT1$StateCounty <- as.numeric(substr(acsT1$GEOID, 1, 5))
            acsT1 <- merge(acsT1, StateCountyData, by="StateCounty")
            acsT1 <- merge(acsT1, bg_L, by="GEOID")
            acsT2 <- acsT1[c(7,10,1,6,11,5,3,4)]
            acsT2$percent <- round(acsT2$percent, 2)
            acsDTtemp <- datatable(cbind(TimeYearDesc,acsT2),  class = 'cell-border stripe', colnames = c('Record No.','Time Period','State', 'County', 
                                                                                                          'GeoID (Block Group)', 'Population Estimates', 
                                                                                                          'Land Area in Square Mile', 
                                                                                                          'Estimated Walk/Total Commute Trips (%)', 
                                                                                                          'Estimated Total Commute Trips', 
                                                                                                          'Exposure: Estimated Walk Commute Trips')
            ) %>% formatRound('percent', 2)
            output$acsDT = DT::renderDataTable(acsDTtemp, options = list(lengthChange = FALSE))
            
            acsT2dowload <- cbind(TimeYearDesc,acsT2)
            names(acsT2dowload) <- c('Time Period','State', 'County', 'GeoID (Block Group)', 'Population Estimates', 'Land Area in Square Mile', 
                                     'Estimated Walk/Total Commute Trips (%)', 
                                     'Estimated Total Commute Trips', 
                                     'Exposure: Estimated Walk Commute Trips')
            
            incProgress(4/5, detail = paste("Writing Output..."))
            
          }
        }  
      }  
      
      output$busmap <- renderLeaflet({
        
        if(TimeSpan == 1 || TimeSpan == 3){
          if(ModeInput == "Bike"){
            leaflet() %>%
              setView(-98.35, 39.7, zoom = 4) %>%
              addProviderTiles(providers$CartoDB.Positron) %>%
              addPolygons(data = df_merged, 
                          #fillColor = ~pal(percent), 
                          fillColor = ~pal(bike), 
                          color = "#5e6e88", # you need to use hex colors
                          fillOpacity = 0.7, 
                          weight = 1, 
                          smoothFactor = 0.30,
                          popup = popup,
                          highlightOptions = highlightOptions(color = "black", weight = 2,
                                                              bringToFront = TRUE),
                          label = label) %>%
              addLegend(pal = pal, 
                        #values = df_merged$percent, 
                        values = df_merged$bike, 
                        position = "bottomright", 
                        #title = "Commuters (%) Bike to Work",
                        #labFormat = labelFormat(suffix = "%")) 
                        title = "Commuters Bike to Work") 
          }else{
            leaflet() %>%
              setView(-98.35, 39.7, zoom = 4) %>%
              addProviderTiles(providers$CartoDB.Positron) %>%
              addPolygons(data = df_merged, 
                          #fillColor = ~pal(percent), 
                          fillColor = ~pal(walk), 
                          color = "#5e6e88", # you need to use hex colors
                          fillOpacity = 0.7, 
                          weight = 1, 
                          smoothFactor = 0.30,
                          popup = popup,
                          highlightOptions = highlightOptions(color = "black", weight = 2,
                                                              bringToFront = TRUE),
                          label = label) %>%
              addLegend(pal = pal, 
                        #values = df_merged$percent, 
                        values = df_merged$walk, 
                        position = "bottomright", 
                        #title = "Commuters (%) Walk to Work",
                        #labFormat = labelFormat(suffix = "%")) 
                        title = "Commuters Walk to Work"
              ) 
          }  
        }else{
          ### TimeSpan = 5
          if(CountyInput == "All Counties"){        
            if(ModeInput == "Bike"){
              leaflet() %>%
                addProviderTiles("CartoDB.Positron") %>%
                addPolygons(data = df_merged, 
                            #fillColor = ~pal(percent), 
                            fillColor = ~pal(bike), 
                            color = "#b2aeae", # you need to use hex colors
                            fillOpacity = 0.7, 
                            weight = 1, 
                            smoothFactor = 0.2,
                            popup = popup,
                            highlightOptions = highlightOptions(color = "black", weight = 2,
                                                                bringToFront = TRUE),
                            label = label) %>%
                addLegend(pal = pal, 
                          #values = df_merged$percent, 
                          values = df_merged$bike, 
                          position = "bottomright", 
                          #title = "Commuters (%) Bike to Work (Census Tract)",
                          #labFormat = labelFormat(suffix = "%")
                          title = "Commuters Bike to Work (Census Tract)"
                ) 
            }else{
              leaflet() %>%
                addProviderTiles("CartoDB.Positron") %>%
                addPolygons(data = df_merged, 
                            #fillColor = ~pal(percent), 
                            fillColor = ~pal(walk), 
                            color = "#b2aeae", # you need to use hex colors
                            fillOpacity = 0.7, 
                            weight = 1, 
                            smoothFactor = 0.2,
                            popup = popup,
                            highlightOptions = highlightOptions(color = "black", weight = 2,
                                                                bringToFront = TRUE),
                            label = label) %>%
                addLegend(pal = pal, 
                          #values = df_merged$percent, 
                          values = df_merged$walk, 
                          position = "bottomright", 
                          #title = "Commuters (%) Walk to Work (Census Tract)",
                          #labFormat = labelFormat(suffix = "%")
                          title = "Commuters Walk to Work (Census Tract)"
                ) 
            }  
            
          }else{
            
            if(ModeInput == "Bike"){
              leaflet() %>%
                addProviderTiles("CartoDB.Positron") %>%
                addPolygons(data = df_merged2, 
                            #fillColor = ~pal(percent), 
                            fillColor = ~pal(bike), 
                            color = "#b2aeae", # you need to use hex colors
                            fillOpacity = 0.7, 
                            weight = 1, 
                            smoothFactor = 0.2,
                            popup = popup,
                            highlightOptions = highlightOptions(color = "black", weight = 2,
                                                                bringToFront = TRUE),
                            label = label) %>%
                addLegend(pal = pal, 
                          #values = df_merged$percent, 
                          values = df_merged$bike, 
                          position = "bottomright", 
                          title = "Commuters Bike to Work (Census Block group)"
                          #title = "Commuters (%) Bike to Work (Census Block group)",
                          #labFormat = labelFormat(suffix = "%")
                ) 
              
              
            }else{
              leaflet() %>%
                addProviderTiles("CartoDB.Positron") %>%
                addPolygons(data = df_merged2, 
                            #fillColor = ~pal(percent), 
                            fillColor = ~pal(walk), 
                            color = "#b2aeae", # you need to use hex colors
                            fillOpacity = 0.7, 
                            weight = 1, 
                            smoothFactor = 0.2,
                            popup = popup,
                            highlightOptions = highlightOptions(color = "black", weight = 2,
                                                                bringToFront = TRUE),
                            label = label) %>%
                addLegend(pal = pal, 
                          #values = df_merged$percent, 
                          values = df_merged$walk, 
                          position = "bottomright", 
                          title = "Commuters Walk to Work (Census Block group)"
                          #title = "Commuters (%) Walk to Work (Census Block group)",
                          #labFormat = labelFormat(suffix = "%")
                ) 
            }
          }  
        }  
      })
      incProgress(6/6, detail = paste("Finished!"))
      
      output$downloadData <- downloadHandler(
        #filename = function() {paste("test.csv")},
        filename = function() {gsub(" ","",paste(StateInput,"_",CountyInput,"_",YearInput,"_",TimeSpan,"yr_",SpatialInput,"_",
                                                 ModeInput,".csv"))},
        content = function(file) {
          write.csv(acsT2dowload,file, row.names=FALSE)
        })
      
    })
    
  })
  
  output$StNmPMmap <- renderLeaflet({
    
    leaflet() %>%
      addProviderTiles("CartoDB.Positron") %>%
      setView(-98.35, 39.7, zoom = 4)
    
  })
  
  observeEvent(input$RefreshMapStNmPM, {
    withProgress(message = 'Processing ', value = 0, {
      
      YearInputStNmPM <- input$YearInputStNmPM
      ModeInputStNmPM <- input$ModeInputStNmPM
      
      incProgress(1/3, detail = paste("Retrieving Geography..."))
      StatePerMeasureData <- subset(StateNonMotorPM, StateNonMotorPM$Year == YearInputStNmPM )
      StatePerMeasureData <- subset(StatePerMeasureData, StatePerMeasureData$Mode == ModeInputStNmPM)
      
      StatePerMeasureData <- StatePerMeasureData[c(1,2,6,7,12,13,14)]
      StatePerMeasureData$GEOID <- str_pad(StatePerMeasureData$GEOID, 2, pad = "0")
      
      states <- states(cb = TRUE)
      df_mergedStNmPM <- geo_join(states, StatePerMeasureData, "GEOID", "GEOID")
      df_mergedStNmPM$Estimated_Annual_Trips_Million <- replace(df_mergedStNmPM$Estimated_Annual_Trips_Million, is.na(df_mergedStNmPM$Estimated_Annual_Trips_Million), 0)
      df_mergedStNmPM$Estimated_Annual_MilesTraveled_Million <- replace(df_mergedStNmPM$Estimated_Annual_MilesTraveled_Million, is.na(df_mergedStNmPM$Estimated_Annual_MilesTraveled_Million), 0)
      df_mergedStNmPM$Estimated_Annual_HoursTraveled_Million <- replace(df_mergedStNmPM$Estimated_Annual_HoursTraveled_Million, is.na(df_mergedStNmPM$Estimated_Annual_HoursTraveled_Million), 0)
      df_mergedStNmPM <- subset(df_mergedStNmPM, !(is.na(df_mergedStNmPM$State))) ###drop where State is NA (Samoa, etc.)
      df_mergedStNmPM <- subset(df_mergedStNmPM, df_mergedStNmPM$GEOID != 72)   ###drop Puerto Rico (no NHTS data)
      
      popupStNmPM <- paste0(df_mergedStNmPM$State, ", GeoID: ", df_mergedStNmPM$GEOID, "<br>", "Year: ", df_mergedStNmPM$Year, ", Mode: ", df_mergedStNmPM$Mode, "<br>",
                            "Estimated Annual Trips (Million): ", df_mergedStNmPM$Estimated_Annual_Trips_Million, "<br>",
                            "Estimated Annual Miles Traveled (Million): ", df_mergedStNmPM$Estimated_Annual_MilesTraveled_Million, "<br>",
                            "Estimated Annual Hours Traveled (Million): ",df_mergedStNmPM$Estimated_Annual_HoursTraveled_Million)
      labelStNmPM <- paste0(df_mergedStNmPM$State, ", GeoID: ", df_mergedStNmPM$GEOID)
      palStNmPM <- colorNumeric(palette = "YlOrRd", domain = df_mergedStNmPM$Estimated_Annual_Trips_Million)          
      
      
      incProgress(2/3, detail = paste("Preparing Output..."))
      StatePerMeasureDataNoPuertoRico <- subset(StatePerMeasureData, StatePerMeasureData$GEOID != 72 )
      acsDTtempStNmPM <- datatable(StatePerMeasureDataNoPuertoRico,  class = 'cell-border stripe', colnames = c('Record No.','State','GeoID (State)','Mode','Year','Estimated Annual Trips (Million)',
                                                                                                                'Estimated Annual Miles Traveled (Million)','Estimated Annual Hours Traveled (Million)')
      )
      names(StatePerMeasureDataNoPuertoRico)    <- c('State','GeoID (State)','Mode','Year','Estimated Annual Trips (Million)',
                                                     'Estimated Annual Miles Traveled (Million)','Estimated Annual Hours Traveled (Million)')
      
      observe({
        if (input$MapDataSelectionStNmPM == 'Estimated Annual Trips') {
          palStNmPM <- colorNumeric(palette = "YlOrRd", domain = df_mergedStNmPM$Estimated_Annual_Trips_Million)          
          leafletProxy("StNmPMmap") %>%
            clearControls() %>%
            clearShapes() %>%
            addProviderTiles(providers$CartoDB.Positron) %>%
            addPolygons(data = df_mergedStNmPM, 
                        fillColor = ~palStNmPM(Estimated_Annual_Trips_Million), 
                        color = "#5e6e88", # you need to use hex colors
                        fillOpacity = 0.7, 
                        weight = 1, 
                        smoothFactor = 0.30,
                        popup = popupStNmPM,
                        highlightOptions = highlightOptions(color = "black", weight = 2, bringToFront = TRUE),
                        label = labelStNmPM) %>%
            addLegend(pal = palStNmPM, 
                      values = df_mergedStNmPM$Estimated_Annual_Trips_Million, 
                      position = "bottomright", 
                      title = "Estimated Annual Trips (Million)",
                      labFormat = labelFormat(suffix = ""))
        } else {
          if (input$MapDataSelectionStNmPM == 'Estimated Annual Miles Traveled') {
            palStNmPM <- colorNumeric(palette = "YlOrRd", domain = df_mergedStNmPM$Estimated_Annual_MilesTraveled_Million)          
            leafletProxy("StNmPMmap") %>%
              clearControls() %>%
              clearShapes() %>%
              addProviderTiles(providers$CartoDB.Positron) %>%
              addPolygons(data = df_mergedStNmPM, 
                          fillColor = ~palStNmPM(Estimated_Annual_MilesTraveled_Million), 
                          color = "#5e6e88", # you need to use hex colors
                          fillOpacity = 0.7, 
                          weight = 1, 
                          smoothFactor = 0.30,
                          popup = popupStNmPM,
                          highlightOptions = highlightOptions(color = "black", weight = 2, bringToFront = TRUE),
                          label = labelStNmPM) %>%
              addLegend(pal = palStNmPM, 
                        values = df_mergedStNmPM$Estimated_Annual_MilesTraveled_Million, 
                        position = "bottomright", 
                        title = "Estimated Annual Miles Traveled (Million)",
                        labFormat = labelFormat(suffix = ""))
          } else {
            palStNmPM <- colorNumeric(palette = "YlOrRd", domain = df_mergedStNmPM$Estimated_Annual_HoursTraveled_Million)          
            leafletProxy("StNmPMmap") %>%
              clearControls() %>%
              clearShapes() %>%
              addProviderTiles(providers$CartoDB.Positron) %>%
              addPolygons(data = df_mergedStNmPM, 
                          fillColor = ~palStNmPM(Estimated_Annual_HoursTraveled_Million), 
                          color = "#5e6e88", # you need to use hex colors
                          fillOpacity = 0.7, 
                          weight = 1, 
                          smoothFactor = 0.30,
                          popup = popupStNmPM,
                          highlightOptions = highlightOptions(color = "black", weight = 2, bringToFront = TRUE),
                          label = labelStNmPM) %>%
              addLegend(pal = palStNmPM, 
                        values = df_mergedStNmPM$Estimated_Annual_HoursTraveled_Million, 
                        position = "bottomright", 
                        title = "Estimated Annual Hours Traveled (Million)",
                        labFormat = labelFormat(suffix = ""))
          }
        }
      })
      
      output$acsDTStNmPM = DT::renderDataTable(acsDTtempStNmPM, options = list(lengthChange = FALSE),
                                               rownames= FALSE)
      
      output$downloadDataStNmPM <- downloadHandler(
        filename = function() {gsub(" ","",paste("StatewideNmPerfMeas_",YearInputStNmPM,"_",ModeInputStNmPM,".csv"))},
        content = function(file) {write.csv(StatePerMeasureDataNoPuertoRico,file, row.names=FALSE)}
      )
      
      incProgress(3/3, detail = paste("Finished!"))
    })
  })
  
  
  }

shinyApp(ui, server)
