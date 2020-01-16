# climate-log

## Project description

This is a two-page web app that polls a public API and shows the data returned in tabular form (page1) and visual form (page2), with internal routing between the pages. Each page presents the same data, but in a different way. The app is configured to show historical temperature and precipitation data for Balkan countries.

Data source:
https://datahelpdesk.worldbank.org/knowledgebase/articles/902061

Example request that fetches monthly temperature data for Croatia from 1920-1939:
curl http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/tas/1920/1939/HRV.json 

The is build in Vue.js


## Project setup
1. Ensure that you have the latest versons of Node and npm
2. Download the repo from GitHub
3. cd into the repo folder
4. Install npm packages:
```
npm install
```
5. Run the app
```
npm run serve
```
