## Goal
- Create a vocabulary app where a user can store words they are studying for their target language. 
- The app supports grouping words by tags created by the user that can indicate an activity, scenario, or country dialect
	- Examples: "pharmacy", "doing laundry", "nightlife", "mexico", "colombia".
- The app supports fetching translations of words from a translation API
- The app allows the user to set their own translations. 
- The app allows multiple translations
## Overview
### Frontend
#### Web Client
- Serves a UI for interacting with the language app.
- Single Page App - React
- Features:
	- Enter words with user provided translation
	- Search for translations
	- Tag words in order to group them
#### Mobile Client
 - TBD
 - Native iOS? React Native? Flutter?
### Backend
#### Perimeter API
- `zwsmith.me/api/`
	- Typescript/Node app using Express
#### Translation service:
	- Go
	- Talks to DeepL API for translations
#### Vocabulary Service
- Typescript/Node/Express
- Accepts `Translation`
	```
	Translation {
		sourceText: string,
		translatedText: string,
		sourceLanguage: string,
		targetLanguage: string,
		tags: string[]
	}
```
