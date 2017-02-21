
Detta är ett memoryspel skapat av Emil Nilsson, Simon Kallio och Alex Smith, det hämtar bilder på nätet för att ha på korten, man kan använda egna söktermer för att välja bilder.

## Instruktioner
Programmet börjar från `main.js` filen.

Om man vill kompilera själv måste man:
+ Installera node.js och git (git är frivilligt)
+ Öppna en kommandotolk och gå till mappen man vill spara det i
+ Klona projektet `git clone https://github.com/emil19/Memory` eller kopiera in filerna manuellt
+ Gå till mappen i kommandotolken `cd Memory`
+ Köra `npm install`
+ Installera Gulp och Electron globalt med npm kommandot `npm install -g gulp electron`
+ Köra `npm start` för att starta programmet


## Teknologier
Detta spel ska fungerar med hjälp av olika teknologier som beskrivs här under.

### Electron

Programmet är skapat med hjälp av Electron, ett ramverk skapat av GitHub som gör så man kan programmera universella applikationer (Windows, Mac och Linux) med html, css och javascript. Det är baserat på Chromium och Node.js. Chromium är Open-Source projektet som Google Chrome är baserat på. Node.js gör så man kan köra javascript direkt på sin dator, det används ofta för att göra webbservrar, men i det här fallet används det till att kunna köra Electron.

### React

React är ett javascript-ramverk för att göra gränssnitt som uppdateras automatiskt när man ändrar ett "state". Man delar upp programmet i olika komponenter som blandar javascript och html med hjälp av filformatet JSX.
JSX kompilerar den html liknande koden till Reacts javascript-funktioner.
React är skapat av Facebook.

### Gulp

Gulp använder jag för att kompilera vissa filer innan programmet körs, de filerna som behöver kompileras är .jsx filerna som ska bli till vanliga .js filer och .scss filerna som ska bli till vanliga .css filer. Scss ger lite extra funktioner att använda i css syntaxen, men det är begränsat till vad som kan göras om till vanlig css eftersom det kompileras till det.

### Markdown

Den här texten är skriven i Markdown, markdown är till för att skriva texter som kan läsas enkelt både i en textredigerare och som html. Pluginet som konverterar markdown till html heter markdown-it.

### Flickr API

Jag använder Flickr API:n för att alla hämta bilder som används i spelet, jag valde den för den är lättanvänd och inte har så många begränsningar som vissa andra bildsöknings API:er. För att kommunicera med flickr tar jag hjälp av ett javascript-bibliotek som heter Axios, det gör det lättare att skicka http förfrågningar.
