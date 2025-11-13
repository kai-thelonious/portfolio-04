[Deployed Site](https://kai-thelonious.github.io/portfolio-04/)
 
 # Chinook dataset analysis 

 Group: Kai, Sebastian, Noah


Gruppe kontrakt
- [x] Dan en 'historie' fra dataet - Alle tre
- [x] Donut chart side + setup - Kai
- [x] Main charts + chart data - Noah
- [x] Chart layout + animation - Sebastian
- [x] HTML og CSS layout / design - Kai
- [x] Text og titler osv - Noah
- [x] Organiser filer og dokumentation osv - Sebastian og Noah

## Data Analyse 
Vi har analyseret datasættet chinook, hvilket er en butik. Der har vi haft fokus is selve musikken. Sådan noget som hvor langt et track er, en genres indtægt på præstation,
top 10 artister i forhold til indtjening og hvor mange der er per genre. 

Vi fandt ud af at der var en del null værdier i sættet. 
f.eks:
<img width="1985" height="258" alt="image" src="https://github.com/user-attachments/assets/25fdc918-c58e-495a-9a52-411ab87e74ff" />
Her kan man se under kolonnen "company" and der er nogle null værdier. Det kan skyldes at der er enkelte personer der har købt noget og ikke et firma.



### Budskab og målgruppe

### Primær Målgruppe

Websitets primære målgruppe er nye medarbejdere hos Chinook, der er i gang med deres onboarding-proces. Disse medarbejdere kommer fra forskellige baggrunde og kan have varierende erfaring med musikbranchen, dataanalyse, og forretningsstrategi. Websitet skal derfor fungere som både en introduktion til virksomheden og et værktøj til at udvikle strategisk forretningsforståelse.

### Primære Budskaber

**1. Virksomhedskultur og Værdier**

Det første og mest fundamentale budskab kommunikerer Chinooks kerneværdier: passion for musik og engagement i lydkvalitet. Dette budskab etablerer den følelsesmæssige forbindelse mellem medarbejderen og virksomheden og skaber grundlaget for at forstå hvorfor Chinook eksisterer ud over blot at sælge musik.

**2. "Meet Our Team" - Vi er et Team**

Gennem medarbejderprofilerne kommunikeres budskabet om teamwork og samarbejde på tværs af afdelinger. Ved at præsentere hele teamet fra General Manager til IT Staff viser vi, at hver rolle er vigtig, og at nye medarbejdere bliver en del af et etableret, dedikeret team. Dette skaber tryghed og tilhørsforhold.

**3. Data-Drevet Beslutningstagning**

Visualiseringerne sender et klart signal om, at Chinook er en dataorienteret organisation. Nye medarbejdere skal forstå, at beslutninger baseres på fakta og analyse, ikke kun på mavefornemmelser. Dette professionaliserer virksomhedens image og sætter forventninger til arbejdskulturen.

**4. Strategisk Tænkning og Innovation**

Det mest centrale budskab er, at alle medarbejdere - uanset rolle - forventes at tænke kritisk og bidrage med idéer til forretningsudvikling. Ved at præsentere data sammen med åbne spørgsmål ("Hvad kan du tænke over?") inviteres medarbejdere til at se muligheder for vækst og forbedring. Dette demokratiserer innovation og giver medarbejdere ejerskab over virksomhedens succes.

**5. Transparens og Åbenhed**

Ved at dele detaljerede salgsdata, katalogsammensætning, og performance metrics kommunikerer Chinook et budskab om transparens. Nye medarbejdere får indsigt i virksomhedens faktiske performance - både styrker og svagheder - hvilket signalerer tillid og åbenhed.

<br>


<img width="480" height="568" alt="image" src="https://github.com/user-attachments/assets/02ea9457-bf9e-4921-be22-eb39324c49da" />
<br>
Database Struktur Analyse - Chinook ER Diagram (Entitet Relation Diagram)
<br>
Chinook databasen er designet som en relationel database der modellerer en digital musikbutiks forretning. Diagrammet viser 11 primære entiteter der er forbundet gennem et velstruktureret netværk af relationer, hvilket muliggør effektiv datahåndtering.
<br>
### Relationstyper og Kardinalitet

**One-to-Many relationer:**

- Artist → Album (én kunstner kan have mange albums)
- Album → Track (ét album kan have mange tracks)
- Genre → Track (én genre kan omfatte mange tracks)
- MediaType → Track (ét mediaformat kan bruges til mange tracks)
- Customer → Invoice (én kunde kan have mange fakturaer)
- Employee → Customer (én medarbejder kan betjene mange kunder)

**Many-to-Many relationer:**

- Track ↔ Playlist (gennem PlaylistTrack junction table)
- Track ↔ Invoice (gennem InvoiceLine junction table)
<br>
<br>
<br>
<img width="284" height="126" alt="image" src="https://github.com/user-attachments/assets/0abea4b8-e946-43b0-bd69-1e6af89ded3c" />
<br>
Vi vælger alle rækker fra employee tablen med denne query.
<br>
Vi har brugt denne query til at oprette vores employee-table.json fil, som vi har brugt til at lave vores sektion på siden der hedder meet our team. Her kan man se navnene på hver medarbejder og lidt information om hvad de laver i virksomheden og hvor mange år de har været der.
<br>
<br>
<img width="1336" height="248" alt="image" src="https://github.com/user-attachments/assets/fedc2885-e901-4e62-a43b-d91277539b17" />
<br>
Her har vi lavet en query der beregner den gennemsnitlige track længde for hver genre. Vi starter med at tage gennemsnittet af Milliseconds kolonnen fra Track tabellen. Derefter konverterer vi millisekunder til minutter ved at dividere med 1000 (for at få sekunder) og derefter med 60 (for at få minutter). Vi bruger ROUND funktionen til at runde resultatet til 2 decimaler, så det er lettere at læse. Så joiner vi Track tabellen med Genre tabellen for at få genre navnet frem. Derefter grupperer vi på genre navnet, så vi får én gennemsnitlig længde per genre. Til sidst laver vi en ORDER BY på track_length_m i DESC (descending) rækkefølge, så vi får de genrer med de længste gennemsnitlige tracks først.
<br>
<br>
<br>
<img width="1128" height="206" alt="image" src="https://github.com/user-attachments/assets/cc3135ec-4c63-4144-8e6c-042f5b69bcbd" />
<br>
I denne query ville vi finde summen af salg for hver måned. Der har vi brugt DATE_FORMAT for at konvetere en dato om til en string. Så sørger vi for at den kun viser måned og årstal. Så tager vi summen af total kolonnen for at få det totale salg af hver invoice
i hver gruppe. Så gruppere vi hver invoice så de vil tilhøre den samme måned. Til sidst sortere vi resultatet.
<br>
<br>
<br>
<img width="1062" height="298" alt="image" src="https://github.com/user-attachments/assets/afb657b7-950a-4ea9-8ea0-f710bb8f909e" />
<br>
Her beregner vi omsætningen indtjent per genre ved at lave en query der tager summen af UnitPrice og Quantity. Disse to kolonner ganges sammen hvor resultatet så bliver skrevet på 'revenue' kollonen. Dette bliver grupperet ved kolonnen 'name'. Da vores data er delt op i forskellige tabeller bliver vi nødt til at joine tre tabeller for at finde ud af hvilken genre en sang har og hvor mange salg den enkelte sang har, for derefter at kunne beregne summen af sangene indenfor hver genre. 
<br>
<br>
<br>
<img width="1224" height="374" alt="image" src="https://github.com/user-attachments/assets/425d6f4c-dfa4-4404-ac3d-2b07aec0a053" />
<br>
Her har vi lavet en query der tager summen af Unitprice og Quantity. Dem ganger vi med hinanden så vi får en samlet sum af de to kolonner. Så joiner vi tre tables sammen med InvoiceLine så vi kan få hver artist frem. 
Så gruppere vi på navnet og laver en order by på den sum vi får og sørger for at vi får det højeste tal først. Til sidst laver vi et limit på 10 for at få de 10 artister frem som har lavet de højeste omsætninger
<br>
<br>
<br>
<img width="914" height="254" alt="image" src="https://github.com/user-attachments/assets/92516957-c80e-4ce7-bc91-fb779ad62a7f" />
<br>
Her har vi lavet en query der tager antallet af tracks per genre. Der har vi brugt COUNT() funktionen for at få returneret antallet af track id's. Så har vi joinet track sammen med genre id så vi kan få det samlet antal
tracks per genre. Så gruppere vi ud fra genrens navn og sorterer genre_tracks i faldene for at få højeste til laveste.
<br>
<br>
<br>

### Notion AI prompt til tekst på sitet.
I opgaven vi har for med data visualisering skal vi bruge en masse tekst til at udfylde siden, og skrive hvad vores data visualiseringer viser og hvor vi præcist har valgt dem.
Vores målgruppe for hjemmesiden er nye folk der er ved eller er blevet ansat hos Chinook.
Det vi gerne vil med vores visualiseringer er at de skal bruges til er at få nye medarbejdere til at begynde at tænke over hvilke punkter der kan forbedres i forretningen. For eksempel begynde at kigge ind i nye markeder for eksempel genre som ikke er på hylderne, eller artister der ikke er på top 10. Eller prøve at oppe salget og/eller lave events, der targetter en bestemt målgruppes genre. 
Der ud over laver vi også et site der hedder meet our team hvor der skal være lidt tekst om hver employee i virksomheden, hvem der og hvad de laver til dagligt.
Der ud over skal der være et afsnit med Chinnoks(virksomheden) værdier og hvad det står for, og hvad de vil udrette ved at sælge musik. for eksempel at musik er deres helt store passion og god lyd som der er på deres filer, giver en helt speciel følelse inden i dem.
Jeg kunne rigtig godt tænke mig at du hjælper mig med at skrive det her tekst til siden her under vil jeg lige tilføje nogle billeder af siden, så du kan se hvordan det ser ud indtil videre. Du får også vores employee tabel så du kan skrive noget om hver medarbejder.
Har der udover også prompted den med billeder af vores datavisualiseringer, og employee-table.json.
















