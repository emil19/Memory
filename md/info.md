# Information

Detta är ett memoryspel skapat av Emil Nilsson, det hämtar bilder på nätet för att ha på korten, man kan använda egna söktermer för att välja bilder.


## Teknologier
För att detta spel ska fungera har jag tagit hjälp olika teknologier som är jag beskriver här under.

### Electron

Programmet är skapat med hjälp av Electron, ett ramverk skapat av GitHub som gör så man kan programmera universella applikationer (Windows, Mac och Linux) med html, css och javascript. Det är baserat på Chromium och Node.js. Chromium är Open-Source projektet som Google Chrome är baserat på. Node.js gör så man kan köra javascript direkt på sin dator, det används ofta för att göra webbservrar, men i det här fallet används det till att kunna köra Electron.

### React

React är ett javascript-ramverk för att göra gränssnitt som uppdateras automatiskt när man ändrar ett "state". Man delar upp programmet i olika komponenter som blandar javascript och html med filformatet JSX.
React är skapat av facebook.

### Gulp

Gulp använder jag för att kompilera vissa filer innan programmet körs, de filerna som behöver kompileras är .jsx filerna som ska bli till vanliga .js filer och .scss filerna som ska bli till vanliga .css filer. Scss ger lite extra funktioner att använda i css syntaxen, men det är begränsat till vad som kan göras om till vanlig css.

### Markdown

Den här texten är skriven i Markdown, markdown är till för att skriva texter som kan läsas enkelt både i en textredigerare och som html.

### Flickr API

Jag använder Flickr API:n för att alla hämta bilder som används i spelet, jag valde den för den är lättanvänd och inte har så många begränsningar som vissa andra bildsök API:er. För att kommunicera med flickr tar jag hjälp av ett javascript-bibliotek som heter Axios, det gör det lättare att skicka http förfrågningar.
