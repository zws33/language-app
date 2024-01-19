## Goal
- Create a vocabulary app where a user can store words they are studying for their target language. 
- The app supports grouping words by tags created by the user that can indicate an activity, scenario, or country dialect
	- Examples: "pharmacy", "doing laundry", "nightlife", "mexico", "colombia".
- The app supports fetching translations of words from a translation API
- The app allows the user to set their own translations. 
- The app allows multiple translations
## Overview

### Running the app locally:
The app uses docker for building and deployment. To run the app locally:
- clone the repo
- Install [Docker](https://docs.docker.com/get-docker/) 
- Run the following command: `docker-compose -f docker-compose.yaml up -d`
- Open `localhost:3000/` in the browser to test the UI
- The API can be tested at `localhost:3001/`

### Diagram
```mermaid
graph TD
    languageLearner(Language Learner)
    reverseProxy(Reverse Proxy)
    webClient("Web Client (React Spa)")
    mobileClient("Mobile Client (TBD)")
    translationApp("Translation App (node)")
    translationApi{Translation Api}
    translationService("Translation Service (go)")

    postgres[(Postgres)]
    
    languageLearner -->|uses| reverseProxy
    languageLearner -->|uses| webClient
    languageLearner -->|uses| mobileClient
        
    webClient --> |calls| reverseProxy    
    
    mobileClient --> reverseProxy
    
    reverseProxy --> translationApp
    reverseProxy --> |Delivers| webClient    
    
    translationApp --> translationService
    translationApp --> translationStore
    
    translationService --> translationApi
    
    translationStore --> postgres
```
### Frontend
#### Web Client
- Domain: `zwsmith.me/`
- Serves a UI for interacting with the language app.
- Single Page App - React
- Features:
	- Enter words with user provided translation
	- Search for translations
	- Set tags for words in order to group them
	- View entered words by tag

#### Mobile Client
 - TBD
 - Native iOS? React Native? Flutter?

### Backend
#### Vocab API
- Domain: `zwsmith.me/api/`
- Typescript/Node app using Express
- Stores words in different languages
- Stores translations which relates two words of different langauges
- Keeps track of tags set by users and their associated word

#### Translation service:
- Web server written in Go
- Is basically a wrapper around [DeepL API](https://www.deepl.com/docs-api) which is used for fetching translations
