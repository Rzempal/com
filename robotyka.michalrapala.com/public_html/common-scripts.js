// common-scripts.js

const translations = {
    navAboutMe: { pl: "O mnie", en: "About Me", de: "Über mich", cs: "O mně" },
    navExperience: { pl: "Doświadczenie", en: "Experience", de: "Erfahrung", cs: "Zkušenosti" },
    navProjects: { pl: "Projekty", en: "Projects", de: "Projekte", cs: "Projekty" },
    navContact: { pl: "Kontakt", en: "Contact", de: "Kontakt", cs: "Kontakt" },
    pageTitleIndex: {
        pl: "Robotyka - Michał Rąpała AI - Solutions",
        en: "Robotics - Michał Rąpała AI - Solutions",
        de: "Robotik - Michał Rąpała AI - Solutions",
        cs: "Robotika - Michał Rąpała AI - Solutions"
    },
    pageTitleDoswiadczenie: {
        pl: "Robotyka - Michał Rąpała - Doświadczenie, Umiejętności i Certyfikaty",
        en: "Robotics - Michał Rąpała - Experience, Skills & Certifications",
        de: "Robotik - Michał Rąpała - Erfahrung, Fähigkeiten & Zertifikate",
        cs: "Robotika - Michał Rąpała - Zkušenosti, Dovednosti a Certifikáty"
    },
    pageTitleProjekty: {
        pl: "Robotyka - Michał Rąpała - Projekty",
        en: "Robotics - Michał Rąpała - Projects",
        de: "Robotik - Michał Rąpała - Projekte",
        cs: "Robotika - Michał Rąpała - Projekty"
    },
    pageTitleKontakt: {
        pl: "Robotyka - Michał Rąpała - Kontakt",
        en: "Robotics - Michał Rąpała - Contact",
        de: "Robotik - Michał Rąpała - Kontakt",
        cs: "Robotika - Michał Rąpała - Kontakt"
    },
    heroMainText: { 
        pl: "Jestem inżynierem robotyki z doświadczeniem w projektach automotive. Specjalizuję się w symulacjach w Process Simulate i programowaniu robotów. Szukam prostych, skutecznych rozwiązań – także z pomocą AI.",
        en: "I am a robotics engineer with experience in automotive projects. I specialize in Process Simulate simulations and robot programming. I look for simple, effective solutions – also with the help of AI.",
        de: "Ich bin ein Robotik-Ingenieur mit Erfahrung in Automobilprojekten. Ich spezialisiere mich auf Process Simulate Simulationen und Roboterprogrammierung. Ich suche einfache, effektive Lösungen – auch mit Hilfe von KI.",
        cs: "Jsem robotický inženýr se zkušenostmi v automobilových projektech. Specializuji se na simulace v Process Simulate a programování robotů. Hledám jednoduchá a efektivní řešení – také s pomocí AI."
    },
    heroCtaButtonIndex: {
        pl: "Sprawdź moje doświadczenie",
        en: "Check my experience",
        de: "Meine Erfahrung prüfen",
        cs: "Prohlédnout mé zkušenosti"
    },
    heroCtaButton: { 
        pl: "Zobacz moje projekty",
        en: "See my projects",
        de: "Meine Projekte ansehen",
        cs: "Prohlédnout mé projekty"
    },
    heroProjectsText: {
        pl: "Od BMW po Volkswagena – realizowałem symulacje i programowanie robotów dla kluczowych graczy branży automotive. Różne standardy, jeden cel: sprawny i gotowy do wdrożenia proces.",
        en: "From BMW to Volkswagen – I have carried out simulations and robot programming for key players in the automotive industry. Different standards, one goal: an efficient process ready for implementation.",
        de: "Von BMW bis Volkswagen – ich habe Simulationen und Roboterprogrammierungen für Schlüsselakteure der Automobilindustrie durchgeführt. Unterschiedliche Standards, ein Ziel: ein effizienter und implementierungsbereiter Prozess.",
        cs: "Od BMW po Volkswagen – realizoval jsem simulace a programování robotů pro klíčové hráče v automobilovém průmyslu. Různé standardy, jeden cíl: efektivní proces připravený k implementaci."
    },
    heroCtaButtonContact: {
        pl: "Skontaktuj się",
        en: "Contact me",
        de: "Kontakt aufnehmen",
        cs: "Kontaktujte mě"
    },
    heroExperienceText: { 
        pl: "Ponad dekada doświadczenia w automatyzacji procesów produkcyjnych.",
        en: "Over a decade of experience in automating production processes.",
        de: "Über ein Jahrzehnt Erfahrung in der Automatisierung von Produktionsprozessen.",
        cs: "Více než desetiletí zkušeností s automatizací výrobních procesů."
    },
    jobTitle: { pl: "Robot Simulation Engineer", en: "Robot Simulation Engineer", de: "Robotersimulationsingenieur", cs: "Inženýr simulace robotů" },
    aboutMeTitle: { pl: "O mnie", en: "About Me", de: "Über mich", cs: "O mně" },
    aboutMeTextNew1: {
        pl: "Od ponad dekady pracuję jako inżynier robotyki w przemyśle motoryzacyjnym. Specjalizuję się w przygotowywaniu symulacji procesów produkcyjnych w środowisku Process Simulate, zgodnie z wymaganiami klientów takich jak BMW, Volkswagen, Magna, JLR czy Volvo.",
        en: "For over a decade, I have been working as a robotics engineer in the automotive industry. I specialize in preparing production process simulations in the Process Simulate environment, in accordance with the requirements of clients such as BMW, Volkswagen, Magna, JLR, and Volvo.",
        de: "Seit über einem Jahrzehnt arbeite ich als Robotik-Ingenieur in der Automobilindustrie. Ich spezialisiere mich auf die Vorbereitung von Produktionsprozesssimulationen in der Process Simulate-Umgebung gemäß den Anforderungen von Kunden wie BMW, Volkswagen, Magna, JLR und Volvo.",
        cs: "Více než deset let pracuji jako robotický inženýr v automobilovém průmyslu. Specializuji se na přípravu simulací výrobních procesů v prostředí Process Simulate v souladu s požadavky klientů jako BMW, Volkswagen, Magna, JLR či Volvo."
    },
    aboutMeTextNew2: {
        pl: "Od kilku lat pełnię rolę lidera zespołów projektowych w obszarze symulacji – prowadzę projekty od etapu pre-engineeringu, koordynując zadania, standardy klienta i jakość modeli. Pracowałem zarówno w mniejszych zespołach (3–5 osób), jak i w większych strukturach (do 10 osób), odpowiadając za przebieg całego obszaru symulacyjnego.",
        en: "For several years, I have been a project team leader in the simulation area – managing projects from the pre-engineering stage, coordinating tasks, client standards, and model quality. I have worked in both smaller teams (3–5 people) and larger structures (up to 10 people), responsible for the entire simulation area.",
        de: "Seit einigen Jahren fungiere ich als Leiter von Projektteams im Simulationsbereich – ich leite Projekte von der Vorentwicklungsphase an, koordiniere Aufgaben, Kundenstandards und die Qualität der Modelle. Ich habe sowohl in kleineren Teams (3–5 Personen) als auch in größeren Strukturen (bis zu 10 Personen) gearbeitet und war für den gesamten Simulationsbereich verantwortlich.",
        cs: "Několik let působím jako vedoucí projektových týmů v oblasti simulace – vedu projekty od fáze předběžného inženýrství, koordinuji úkoly, standardy klienta a kvalitu modelů. Pracoval jsem jak v menších týmech (3–5 osob), tak ve větších strukturách (až 10 osob) a zodpovídal za průběh celé simulační oblasti."
    },
    aboutMeTextNew3: {
        pl: "Doświadczenie zdobywałem także przy programowaniu online robotów przemysłowych – głównie KUKA (certyfikat P1) oraz ABB – co pozwala mi w fazie projektowej lepiej przewidywać ograniczenia i optymalizować procesy jeszcze przed wdrożeniem.",
        en: "I also gained experience in online programming of industrial robots – mainly KUKA (P1 certificate) and ABB – which allows me to better anticipate limitations and optimize processes in the design phase even before implementation.",
        de: "Erfahrungen sammelte ich auch bei der Online-Programmierung von Industrierobotern – hauptsächlich KUKA (P1-Zertifikat) und ABB – was es mir ermöglicht, in der Projektphase Einschränkungen besser vorherzusehen und Prozesse noch vor der Implementierung zu optimieren.",
        cs: "Zkušenosti jsem získával také při online programování průmyslových robotů – hlavně KUKA (certifikát P1) a ABB – což mi umožňuje v projektové fázi lépe předvídat omezení a optimalizovat procesy ještě před implementací."
    },
    aboutMeTextNew4: {
        pl: "Cenię sobie praktyczne podejście, jasną komunikację i dobrze zorganizowaną współpracę. W pracy coraz częściej wykorzystuję narzędzia oparte na AI, które usprawniają analizę danych, przygotowanie dokumentacji czy automatyzację powtarzalnych zadań inżynierskich.",
        en: "I value a practical approach, clear communication, and well-organized collaboration. In my work, I increasingly use AI-based tools that streamline data analysis, documentation preparation, and the automation of repetitive engineering tasks.",
        de: "Ich schätze einen praktischen Ansatz, klare Kommunikation und eine gut organisierte Zusammenarbeit. Bei meiner Arbeit setze ich zunehmend KI-basierte Werkzeuge ein, die die Datenanalyse, die Dokumentationserstellung und die Automatisierung sich wiederholender Ingenieuraufgaben vereinfachen.",
        cs: "Cením si praktického přístupu, jasné komunikace a dobře organizované spolupráce. V práci stále častěji využívám nástroje založené na AI, které zefektivňují analýzu dat, přípravu dokumentace či automatizaci opakujících se inženýrských úkolů."
    },
    experienceTitle: { pl: "Doświadczenie zawodowe", en: "Professional Experience", de: "Berufserfahrung", cs: "Pracovní zkušenosti" },
    exp1Title: { pl: "Senior Simulation Robotics Engineer", en: "Senior Simulation Robotics Engineer", de: "Senior Robotersimulationsingenieur", cs: "Senior inženýr simulace robotů" },
    exp1Company: { pl: "Chropynska Polska | Maj 2023 – Obecnie", en: "Chropynska Polska | May 2023 – Present", de: "Chropynska Polska | Mai 2023 – Heute", cs: "Chropynska Polska | Květen 2023 – Současnost" },
    exp1Intro: { 
        pl: "W ramach pracy na stanowisku inżyniera ds. symulacji robotów realizuję zadania związane z przygotowaniem, prowadzeniem i optymalizacją projektów w fazie engineeringu dla branży automotive. Do moich obowiązków należy m.in.:",
        en: "As a robotics simulation engineer, I perform tasks related to the preparation, management, and optimization of projects in the engineering phase for the automotive industry. My responsibilities include, among others:",
        de: "Im Rahmen meiner Tätigkeit als Robotik-Simulationsingenieur realisiere ich Aufgaben im Zusammenhang mit der Vorbereitung, Durchführung und Optimierung von Projekten in der Engineering-Phase für die Automobilindustrie. Zu meinen Aufgaben gehören unter anderem:",
        cs: "V rámci práce na pozici inženýra robotické simulace realizuji úkoly spojené s přípravou, vedením a optimalizací projektů ve fázi engineeringu pro automobilový průmysl. Mezi mé povinnosti patří mimo jiné:"
    },
    exp1RespNew1: { 
        pl: "prowadzenie zespołu projektowego,",
        en: "leading a project team,",
        de: "leitung eines Projektteams,",
        cs: "vedení projektového týmu,"
    },
    exp1RespNew2: {
        pl: "tworzenie i prowadzenie symulacji stacji zrobotyzowanych w Process Simulate zgodnie ze standardami klienta,",
        en: "creating and managing simulations of robotic stations in Process Simulate according to client standards,",
        de: "erstellung und Durchführung von Simulationen von Roboterstationen in Process Simulate gemäß Kundenstandards,",
        cs: "tvorba a vedení simulací robotizovaných stanic v Process Simulate v souladu se standardy klienta,"
    },
    exp1RespNew3: {
        pl: "programowanie offline robotów przemysłowych (KUKA, ABB, Fanuc),",
        en: "offline programming of industrial robots (KUKA, ABB, Fanuc),",
        de: "offline-Programmierung von Industrierobotern (KUKA, ABB, Fanuc),",
        cs: "offline programování průmyslových robotů (KUKA, ABB, Fanuc),"
    },
    exp1RespNew4: {
        pl: "dobór urządzeń i narzędzi pod kątem założeń procesowych,",
        en: "selection of equipment and tools based on process assumptions,",
        de: "auswahl von Geräten und Werkzeugen unter Berücksichtigung der Prozessvorgaben,",
        cs: "výběr zařízení a nástrojů s ohledem na procesní předpoklady,"
    },
    exp1RespNew5: {
        pl: "rozwiązywanie problemów procesowych oraz kontrola jakości projektowanych procesów,",
        en: "solving process problems and quality control of designed processes,",
        de: "lösung von Prozessproblemen sowie Qualitätskontrolle der entworfenen Prozesse,",
        cs: "řešení procesních problémů a kontrola kvality navrhovaných procesů,"
    },
    exp1RespNew6: {
        pl: "komunikacja z klientem i dostawcami – raportowanie postępów, doprecyzowanie zakresu prac.",
        en: "communication with the client and suppliers – reporting progress, clarifying the scope of work.",
        de: "kommunikation mit dem Kunden und Lieferanten – Berichterstattung über Fortschritte, Präzisierung des Arbeitsumfangs.",
        cs: "komunikace s klientem a dodavateli – reportování pokroku, upřesnění rozsahu prací."
    },
    exp2Title: { pl: "Unit Leader / Robotics Engineer", en: "Unit Leader / Robotics Engineer", de: "Unit Leader / Robotik-Ingenieur", cs: "Vedoucí jednotky / Robotický inženýr" },
    exp2Company: { pl: "QT Swiss Engineering | Maj 2014 – Kwiecień 2023 (ponad 10 lat)", en: "QT Swiss Engineering | May 2014 – April 2023 (over 10 years)", de: "QT Swiss Engineering | Mai 2014 – April 2023 (über 10 Jahre)", cs: "QT Swiss Engineering | Květen 2014 – Duben 2023 (přes 10 let)" },
    exp2Role1: { pl: "Unit Leader: Styczeń 2017 – Kwiecień 2023", en: "Unit Leader: January 2017 – April 2023", de: "Unit Leader: Januar 2017 – April 2023", cs: "Vedoucí jednotky: Leden 2017 – Duben 2023" },
    exp2Role2: { pl: "Robotics Engineer: Maj 2014 – Styczeń 2017", en: "Robotics Engineer: May 2014 – January 2017", de: "Robotik-Ingenieur: Mai 2014 – Januar 2017", cs: "Robotický inženýr: Květen 2014 – Leden 2017" },
    exp2Desc: { pl: "Odpowiedzialny za różnorodne projekty symulacyjne i programowanie robotów dla klientów z branży motoryzacyjnej.", en: "Responsible for various simulation projects and robot programming for automotive industry clients.", de: "Verantwortlich für diverse Simulationsprojekte und Roboterprogrammierung für Kunden aus der Automobilindustrie.", cs: "Zodpovědný za různé simulační projekty a programování robotů pro klienty v automobilovém průmyslu." },
    
    projectsTitle: { pl: "Projekty", en: "Projects", de: "Projekte", cs: "Projekty" },
    filterByTag: { pl: "Filtruj po:", en: "Filter by:", de: "Filtern nach:", cs: "Filtrovat podle:" }, // Zmieniono etykietę
    filterAll: { pl: "Wszystkie", en: "All", de: "Alle", cs: "Všechny" },
    // Nowe etykiety dla grup filtrów
    filterGroupPosition: { pl: "Stanowisko", en: "Position", de: "Position", cs: "Pozice" },
    filterGroupStandardSoftware: { pl: "Standard i Oprogramowanie", en: "Standard & Software", de: "Standard & Software", cs: "Standard a Software" },
    filterGroupRobotsTechnology: { pl: "Roboty i Technologie", en: "Robots & Technology", de: "Roboter & Technologien", cs: "Roboty a Technologie" },

    projectCardPositionLabel: { pl: "Stanowisko:", en: "Position:", de: "Position:", cs: "Pozice:" },
    projectCardStandardSoftwareLabel: { pl: "Standard i Oprogramowanie:", en: "Standard & Software:", de: "Standard & Software:", cs: "Standard a Software:" },
    projectCardRobotsTechnologyLabel: { pl: "Roboty i Technologie:", en: "Robots & Technology:", de: "Roboter & Technologien:", cs: "Roboty a Technologie:" },

    // Tłumaczenia dla projektów (pełna lista)
    projNameMagnaForseven: { pl: "Magna Forseven", en: "Magna Forseven", de: "Magna Forseven", cs: "Magna Forseven" },
    projDateMagnaForseven: { pl: "Mar 2025 – Obecnie (Chropynska Polska)", en: "Mar 2025 – Present (Chropynska Polska)", de: "Mär 2025 – Heute (Chropynska Polska)", cs: "Bře 2025 – Současnost (Chropynska Polska)" },
    projPosMagnaForseven: { pl: "Simulation leader (<10)", en: "Simulation leader (<10)", de: "Simulation leader (<10)", cs: "Simulation leader (<10)" },
    projStdSwMagnaForseven: { pl: "Magna • Process Simulate", en: "Magna • Process Simulate", de: "Magna • Process Simulate", cs: "Magna • Process Simulate" },
    projRobTechMagnaForseven: { pl: "KUKA Robots • Zgrzewanie (Alu/Stal) • Zgrzewanie kołków (Alu/Stal) • Klejenie • FDS • Nitowanie • Skręcanie", en: "KUKA Robots • Spot welding (Alu/Steel) • Stud welding (Alu/Steel) • Adhesive • FDS • Riveting • Screwing", de: "KUKA Roboter • Punktschweißen (Alu/Stahl) • Bolzenschweißen (Alu/Stahl) • Kleben • FDS • Nieten • Schrauben", cs: "KUKA Roboty • Bodové svařování (Alu/Ocel) • Svařování čepů (Alu/Ocel) • Lepení • FDS • Nýtování • Šroubování" },

    projNameBmwJ0xOxford: { pl: "BMW J0x Oxford", en: "BMW J0x Oxford", de: "BMW J0x Oxford", cs: "BMW J0x Oxford" },
    projDateBmwJ0xOxford: { pl: "Lut 2024 – Lip 2024 (Chropynska Polska)", en: "Feb 2024 – Jul 2024 (Chropynska Polska)", de: "Feb 2024 – Jul 2024 (Chropynska Polska)", cs: "Úno 2024 – Čvc 2024 (Chropynska Polska)" },
    projPosBmwJ0xOxford: { pl: "Simulation leader (<10)", en: "Simulation leader (<10)", de: "Simulation leader (<10)", cs: "Simulation leader (<10)" },
    projStdSwBmwJ0xOxford: { pl: "BMW v7 • Process Simulate", en: "BMW v7 • Process Simulate", de: "BMW v7 • Process Simulate", cs: "BMW v7 • Process Simulate" },
    projRobTechBmwJ0xOxford: { pl: "ABB Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "ABB Robots • Spot welding • Adhesive • Stud welding", de: "ABB Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "ABB Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameBmwNcarDebrecen: { pl: "BMW NCAR Debrecen", en: "BMW NCAR Debrecen", de: "BMW NCAR Debrecen", cs: "BMW NCAR Debrecen" },
    projDateBmwNcarDebrecen: { pl: "Maj 2023 – Obecnie (Chropynska Polska)", en: "May 2023 – Present (Chropynska Polska)", de: "Mai 2023 – Heute (Chropynska Polska)", cs: "Kvě 2023 – Současnost (Chropynska Polska)" },
    projPosBmwNcarDebrecen: { pl: "Simulation leader (<5) • Simulation engineer", en: "Simulation leader (<5) • Simulation engineer", de: "Simulation leader (<5) • Simulation engineer", cs: "Simulation leader (<5) • Simulation engineer" },
    projStdSwBmwNcarDebrecen: { pl: "BMW v8 • Process Simulate", en: "BMW v8 • Process Simulate", de: "BMW v8 • Process Simulate", cs: "BMW v8 • Process Simulate" },
    projRobTechBmwNcarDebrecen: { pl: "Fanuc Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "Fanuc Robots • Spot welding • Adhesive • Stud welding", de: "Fanuc Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "Fanuc Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameGKlasseMagna: { pl: "G-Klasse MAGNA", en: "G-Class MAGNA", de: "G-Klasse MAGNA", cs: "G-Třída MAGNA" },
    projDateGKlasseMagna: { pl: "Lis 2017 - Kwi 2023 (QT Swiss) (postoje letnie i zimowe)", en: "Nov 2017 - Apr 2023 (QT Swiss) (summer and winter shutdowns)", de: "Nov 2017 - Apr 2023 (QT Swiss) (Sommer- und Winterstillstände)", cs: "Lis 2017 - Dub 2023 (QT Swiss) (letní a zimní odstávky)" },
    projPosGKlasseMagna: { pl: "Programowanie robotów online • Lider linii", en: "Online robot programming • Line leader", de: "Online-Roboterprogrammierung • Linienführer", cs: "Online programování robotů • Vedoucí linky" },
    projStdSwGKlasseMagna: { pl: "Magna • KUKA Work Visual", en: "Magna • KUKA Work Visual", de: "Magna • KUKA Work Visual", cs: "Magna • KUKA Work Visual" },
    projRobTechGKlasseMagna: { pl: "KUKA Robots • Zgrzewanie • Zgrzewanie kołków • Klejenie", en: "KUKA Robots • Spot welding • Stud welding • Adhesive", de: "KUKA Roboter • Punktschweißen • Bolzenschweißen • Kleben", cs: "KUKA Roboty • Bodové svařování • Svařování čepů • Lepení" },

    projNameVwWob: { pl: "VW - WOB", en: "VW - WOB", de: "VW - WOB", cs: "VW - WOB" },
    projDateVwWob: { pl: "Lis 2017 - Kwi 2023 (QT Swiss)", en: "Nov 2017 - Apr 2023 (QT Swiss)", de: "Nov 2017 - Apr 2023 (QT Swiss)", cs: "Lis 2017 - Dub 2023 (QT Swiss)" },
    projPosVwWob: { pl: "Simulation leader (<3) • Simulation engineer • Wsparcie online", en: "Simulation leader (<3) • Simulation engineer • Online support", de: "Simulation leader (<3) • Simulation engineer • Online-Support", cs: "Simulation leader (<3) • Simulation engineer • Online podpora" },
    projStdSwVwWob: { pl: "VW • Process Simulate", en: "VW • Process Simulate", de: "VW • Process Simulate", cs: "VW • Process Simulate" },
    projRobTechVwWob: { pl: "KUKA Robots • Zgrzewanie • Zgrzewanie kołków • Klejenie", en: "KUKA Robots • Spot welding • Stud welding • Adhesive", de: "KUKA Roboter • Punktschweißen • Bolzenschweißen • Kleben", cs: "KUKA Roboty • Bodové svařování • Svařování čepů • Lepení" },

    projNameGlassExtrusion: { pl: "GLASS Extrusion line", en: "GLASS Extrusion line", de: "GLASS Extrusion line", cs: "GLASS Extrusion line" },
    projDateGlassExtrusion: { pl: "Lut 2022 - Gru 2022 (QT Swiss)", en: "Feb 2022 - Dec 2022 (QT Swiss)", de: "Feb 2022 - Dez 2022 (QT Swiss)", cs: "Úno 2022 - Pro 2022 (QT Swiss)" },
    projPosGlassExtrusion: { pl: "Simulation engineer", en: "Simulation engineer", de: "Simulation engineer", cs: "Simulation engineer" },
    projStdSwGlassExtrusion: { pl: "N/A • Process Simulate", en: "N/A • Process Simulate", de: "N/A • Process Simulate", cs: "N/A • Process Simulate" },
    projRobTechGlassExtrusion: { pl: "ABB Robots • Klejenie", en: "ABB Robots • Adhesive", de: "ABB Roboter • Kleben", cs: "ABB Roboty • Lepení" },

    projNameOpelRusselsheim: { pl: "OV512/eDPE OPEL Russelsheim", en: "OV512/eDPE OPEL Russelsheim", de: "OV512/eDPE OPEL Russelsheim", cs: "OV512/eDPE OPEL Russelsheim" },
    projDateOpelRusselsheim: { pl: "Kwi 2020 - Lut 2022 (QT Swiss)", en: "Apr 2020 - Feb 2022 (QT Swiss)", de: "Apr 2020 - Feb 2022 (QT Swiss)", cs: "Dub 2020 - Úno 2022 (QT Swiss)" },
    projPosOpelRusselsheim: { pl: "Simulation leader (<3) • Simulation engineer", en: "Simulation leader (<3) • Simulation engineer", de: "Simulation leader (<3) • Simulation engineer", cs: "Simulation leader (<3) • Simulation engineer" },
    projStdSwOpelRusselsheim: { pl: "OPEL Legacy • Process Simulate", en: "OPEL Legacy • Process Simulate", de: "OPEL Legacy • Process Simulate", cs: "OPEL Legacy • Process Simulate" },
    projRobTechOpelRusselsheim: { pl: "Fanuc Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "Fanuc Robots • Spot welding • Adhesive • Stud welding", de: "Fanuc Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "Fanuc Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameIneosGrenadier: { pl: "INEOS GRENADIER", en: "INEOS GRENADIER", de: "INEOS GRENADIER", cs: "INEOS GRENADIER" },
    projDateIneosGrenadier: { pl: "Mar 2021 - Maj 2021 (QT Swiss)", en: "Mar 2021 - May 2021 (QT Swiss)", de: "Mär 2021 - Mai 2021 (QT Swiss)", cs: "Bře 2021 - Kvě 2021 (QT Swiss)" },
    projPosIneosGrenadier: { pl: "Simulation leader (<5) • Simulation engineer", en: "Simulation leader (<5) • Simulation engineer", de: "Simulation leader (<5) • Simulation engineer", cs: "Simulation leader (<5) • Simulation engineer" },
    projStdSwIneosGrenadier: { pl: "N/A • Process Simulate", en: "N/A • Process Simulate", de: "N/A • Process Simulate", cs: "N/A • Process Simulate" },
    projRobTechIneosGrenadier: { pl: "KUKA Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "KUKA Robots • Spot welding • Adhesive • Stud welding", de: "KUKA Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "KUKA Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameJlrX391: { pl: "JLR x391", en: "JLR x391", de: "JLR x391", cs: "JLR x391" },
    projDateJlrX391: { pl: "Mar 2019 - Kwi 2020 (QT Swiss)", en: "Mar 2019 - Apr 2020 (QT Swiss)", de: "Mär 2019 - Apr 2020 (QT Swiss)", cs: "Bře 2019 - Dub 2020 (QT Swiss)" },
    projPosJlrX391: { pl: "Simulation leader (<3) • Simulation engineer", en: "Simulation leader (<3) • Simulation engineer", de: "Simulation leader (<3) • Simulation engineer", cs: "Simulation leader (<3) • Simulation engineer" },
    projStdSwJlrX391: { pl: "JLR • Robcad", en: "JLR • Robcad", de: "JLR • Robcad", cs: "JLR • Robcad" },
    projRobTechJlrX391: { pl: "Fanuc Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków • Nitowanie", en: "Fanuc Robots • Spot welding • Adhesive • Stud welding • Riveting", de: "Fanuc Roboter • Punktschweißen • Kleben • Bolzenschweißen • Nieten", cs: "Fanuc Roboty • Bodové svařování • Lepení • Svařování čepů • Nýtování" },

    projNameJlrX540Magna: { pl: "JLR x540 Magna", en: "JLR x540 Magna", de: "JLR x540 Magna", cs: "JLR x540 Magna" },
    projDateJlrX540Magna: { pl: "Mar 2016 - Lis 2017 (QT Swiss)", en: "Mar 2016 - Nov 2017 (QT Swiss)", de: "Mär 2016 - Nov 2017 (QT Swiss)", cs: "Bře 2016 - Lis 2017 (QT Swiss)" },
    projPosJlrX540Magna: { pl: "Simulation leader (<3) • Simulation engineer", en: "Simulation leader (<3) • Simulation engineer", de: "Simulation leader (<3) • Simulation engineer", cs: "Simulation leader (<3) • Simulation engineer" },
    projStdSwJlrX540Magna: { pl: "Magna • Process Simulate", en: "Magna • Process Simulate", de: "Magna • Process Simulate", cs: "Magna • Process Simulate" },
    projRobTechJlrX540Magna: { pl: "KUKA Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "KUKA Robots • Spot welding • Adhesive • Stud welding", de: "KUKA Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "KUKA Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameVwCrafter: { pl: "VW Crafter VN54x", en: "VW Crafter VN54x", de: "VW Crafter VN54x", cs: "VW Crafter VN54x" },
    projDateVwCrafter: { pl: "Sty 2016 - Mar 2016 (QT Swiss)", en: "Jan 2016 - Mar 2016 (QT Swiss)", de: "Jan 2016 - Mär 2016 (QT Swiss)", cs: "Led 2016 - Bře 2016 (QT Swiss)" },
    projPosVwCrafter: { pl: "Programowanie offline robotów", en: "Offline robot programming", de: "Offline-Roboterprogrammierung", cs: "Offline programování robotů" },
    projStdSwVwCrafter: { pl: "VW • Process Simulate", en: "VW • Process Simulate", de: "VW • Process Simulate", cs: "VW • Process Simulate" },
    projRobTechVwCrafter: { pl: "KUKA Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "KUKA Robots • Spot welding • Adhesive • Stud welding", de: "KUKA Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "KUKA Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameAudi49x: { pl: "Audi 49x", en: "Audi 49x", de: "Audi 49x", cs: "Audi 49x" },
    projDateAudi49x: { pl: "Paź 2015 - Gru 2015 (QT Swiss)", en: "Oct 2015 - Dec 2015 (QT Swiss)", de: "Okt 2015 - Dez 2015 (QT Swiss)", cs: "Říj 2015 - Pro 2015 (QT Swiss)" },
    projPosAudi49x: { pl: "Programowanie offline robotów", en: "Offline robot programming", de: "Offline-Roboterprogrammierung", cs: "Offline programování robotů" },
    projStdSwAudi49x: { pl: "VW • Robcad", en: "VW • Robcad", de: "VW • Robcad", cs: "VW • Robcad" },
    projRobTechAudi49x: { pl: "Fanuc Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "Fanuc Robots • Spot welding • Adhesive • Stud welding", de: "Fanuc Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "Fanuc Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameVolvoV54x: { pl: "Volvo v54x", en: "Volvo v54x", de: "Volvo v54x", cs: "Volvo v54x" },
    projDateVolvoV54x: { pl: "Cze 2015 - Paź 2015 (QT Swiss)", en: "Jun 2015 - Oct 2015 (QT Swiss)", de: "Jun 2015 - Okt 2015 (QT Swiss)", cs: "Čvn 2015 - Říj 2015 (QT Swiss)" },
    projPosVolvoV54x: { pl: "Programowanie offline robotów", en: "Offline robot programming", de: "Offline-Roboterprogrammierung", cs: "Offline programování robotů" },
    projStdSwVolvoV54x: { pl: "Volvo • Process Simulate", en: "Volvo • Process Simulate", de: "Volvo • Process Simulate", cs: "Volvo • Process Simulate" },
    projRobTechVolvoV54x: { pl: "ABB Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "ABB Robots • Spot welding • Adhesive • Stud welding", de: "ABB Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "ABB Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameBmwOld: { pl: "BMW", en: "BMW", de: "BMW", cs: "BMW" },
    projDateBmwOld: { pl: "Kwi 2015 - Cze 2015 (QT Swiss)", en: "Apr 2015 - Jun 2015 (QT Swiss)", de: "Apr 2015 - Jun 2015 (QT Swiss)", cs: "Dub 2015 - Čvn 2015 (QT Swiss)" },
    projPosBmwOld: { pl: "Simulation engineer", en: "Simulation engineer", de: "Simulation engineer", cs: "Simulation engineer" },
    projStdSwBmwOld: { pl: "BMW • Process Simulate", en: "BMW • Process Simulate", de: "BMW • Process Simulate", cs: "BMW • Process Simulate" },
    projRobTechBmwOld: { pl: "ABB Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "ABB Robots • Spot welding • Adhesive • Stud welding", de: "ABB Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "ABB Roboty • Bodové svařování • Lepení • Svařování čepů" },

    projNameDaimlerBr213: { pl: "Daimler BR213", en: "Daimler BR213", de: "Daimler BR213", cs: "Daimler BR213" },
    projDateDaimlerBr213: { pl: "Cze 2014 - Kwi 2015 (QT Swiss)", en: "Jun 2014 - Apr 2015 (QT Swiss)", de: "Jun 2014 - Apr 2015 (QT Swiss)", cs: "Čvn 2014 - Dub 2015 (QT Swiss)" },
    projPosDaimlerBr213: { pl: "Simulation engineer", en: "Simulation engineer", de: "Simulation engineer", cs: "Simulation engineer" },
    projStdSwDaimlerBr213: { pl: "Daimler (Integra V5) • Delmia V5", en: "Daimler (Integra V5) • Delmia V5", de: "Daimler (Integra V5) • Delmia V5", cs: "Daimler (Integra V5) • Delmia V5" },
    projRobTechDaimlerBr213: { pl: "KUKA Robots • Zgrzewanie • Klejenie • Zgrzewanie kołków", en: "KUKA Robots • Spot welding • Adhesive • Stud welding", de: "KUKA Roboter • Punktschweißen • Kleben • Bolzenschweißen", cs: "KUKA Roboty • Bodové svařování • Lepení • Svařování čepů" },
    
    skillsTitle: { pl: "Umiejętności", en: "Skills", de: "Fähigkeiten", cs: "Dovednosti" }, 
    skillsTechTitle: { pl: "Techniczne:", en: "Technical:", de: "Technisch:", cs: "Technické:" },
    skillsSimTitle: { pl: "Oprogramowanie symulacyjne:", en: "Simulation Software:", de: "Simulationssoftware:", cs: "Simulační software:" },
    skillsRobotTitle: { pl: "Programowanie robotów:", en: "Robot Programming:", de: "Roboterprogrammierung:", cs: "Programování robotů:" },
    skillsStandardsTitle: { pl: "Standardy motoryzacyjne:", en: "Automotive Standards:", de: "Automobilstandards:", cs: "Automobilové standardy:" },
    skillsSoftTitle: { pl: "Umiejętności miękkie:", en: "Soft Skills:", de: "Soft Skills:", cs: "Měkké dovednosti:" },
    skillProblemSolving: { pl: "Rozwiązywanie problemów", en: "Problem Solving", de: "Problemlösung", cs: "Řešení problémů" },
    skillConflictMgmt: { pl: "Zarządzanie konfliktem", en: "Conflict Management", de: "Konfliktmanagement", cs: "Řízení konfliktů" },
    skillEmpathy: { pl: "Empatia", en: "Empathy", de: "Empathie", cs: "Empatie" },
    skillsTeamMgmtTitle: { pl: "Zarządzanie zespołem:", en: "Team Management:", de: "Teammanagement:", cs: "Týmové řízení:" },
    skillPlanning: { pl: "Planowanie i harmonogramowanie", en: "Planning and Scheduling", de: "Planung und Terminierung", cs: "Plánování a rozvrhování" },
    skillDelegation: { pl: "Delegowanie zadań", en: "Task Delegation", de: "Aufgabendelegierung", cs: "Delegování úkolů" },
    skillPrioritization: { pl: "Priorytetyzacja zadań", en: "Task Prioritization", de: "Priorisierung von Aufgaben", cs: "Prioritizace úkolů" },
    skillTimeMgmt: { pl: "Zarządzanie czasem", en: "Time Management", de: "Zeitmanagement", cs: "Time management" },
    skillMonitoring: { pl: "Monitorowanie postępów", en: "Progress Monitoring", de: "Fortschrittsüberwachung", cs: "Sledování pokroku" },
    certsTitle: { pl: "Certyfikaty", en: "Certifications", de: "Zertifizierungen", cs: "Certifikace" }, 
    certKuka: { pl: "KUKA Robot Programming 1", en: "KUKA Robot Programming 1", de: "KUKA Roboterprogrammierung 1", cs: "KUKA Robot Programming 1" },
    certVass: { pl: "VASS-AUDI AG", en: "VASS-AUDI AG", de: "VASS-AUDI AG", cs: "VASS-AUDI AG" },
    certOnlineKuka: { pl: "Doświadczenie Online: KUKA", en: "Online Experience: KUKA", de: "Online-Erfahrung: KUKA", cs: "Online zkušenosti: KUKA" },
    certOnlineAbb: { pl: "Doświadczenie Online: ABB", en: "Online Experience: ABB", de: "Online-Erfahrung: ABB", cs: "Online zkušenosti: ABB" },
    contactTitle: { pl: "Kontakt", en: "Contact", de: "Kontakt", cs: "Kontakt" },
    contactEmailText: {
        pl: "kontakt@michalrapala.com",
        en: "contact@michalrapala.com",
        de: "kontakt@michalrapala.com",
        cs: "kontakt@michalrapala.com"
    },
    footerText: { pl: "", en: "", de: "", cs: "" }
};

const projectData = [
    {
        id: "magnaForseven",
        nameKey: "projNameMagnaForseven",
        dateCompanyKey: "projDateMagnaForseven",
        positionKey: "projPosMagnaForseven",
        standardSoftwareKey: "projStdSwMagnaForseven",
        robotsTechnologyKey: "projRobTechMagnaForseven",
        tags: ["Magna", "Process_Simulate", "KUKA_Robots", "Spot_Welding", "Alu", "Steel", "Stud_Welding", "Adhesive", "FDS", "Riveting", "Screwing", "Simulation_Leader", "Chropynska_Polska"]
    },
    {
        id: "bmwJ0xOxford",
        nameKey: "projNameBmwJ0xOxford",
        dateCompanyKey: "projDateBmwJ0xOxford",
        positionKey: "projPosBmwJ0xOxford",
        standardSoftwareKey: "projStdSwBmwJ0xOxford",
        robotsTechnologyKey: "projRobTechBmwJ0xOxford",
        tags: ["BMW", "BMW_v7", "Process_Simulate", "ABB_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Simulation_Leader", "Chropynska_Polska"]
    },
    {
        id: "bmwNcarDebrecen",
        nameKey: "projNameBmwNcarDebrecen",
        dateCompanyKey: "projDateBmwNcarDebrecen",
        positionKey: "projPosBmwNcarDebrecen",
        standardSoftwareKey: "projStdSwBmwNcarDebrecen",
        robotsTechnologyKey: "projRobTechBmwNcarDebrecen",
        tags: ["BMW", "BMW_v8", "Process_Simulate", "Fanuc_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Simulation_Leader", "Simulation_Engineer", "Chropynska_Polska"]
    },
    {
        id: "gKlasseMagna",
        nameKey: "projNameGKlasseMagna",
        dateCompanyKey: "projDateGKlasseMagna",
        positionKey: "projPosGKlasseMagna",
        standardSoftwareKey: "projStdSwGKlasseMagna",
        robotsTechnologyKey: "projRobTechGKlasseMagna",
        tags: ["Magna", "KUKA_Work_Visual", "KUKA_Robots", "Spot_Welding", "Stud_Welding", "Adhesive", "Steel", "Online_Robot_Programming", "Line_Leader", "QTSwiss"]
    },
    {
        id: "vwWob",
        nameKey: "projNameVwWob",
        dateCompanyKey: "projDateVwWob",
        positionKey: "projPosVwWob",
        standardSoftwareKey: "projStdSwVwWob",
        robotsTechnologyKey: "projRobTechVwWob",
        tags: ["VW", "Process_Simulate", "KUKA_Robots", "Spot_Welding", "Stud_Welding", "Steel", "Adhesive", "Simulation_Leader", "Simulation_Engineer", "Online_Support", "QTSwiss"]
    },
    {
        id: "glassExtrusion",
        nameKey: "projNameGlassExtrusion",
        dateCompanyKey: "projDateGlassExtrusion",
        positionKey: "projPosGlassExtrusion",
        standardSoftwareKey: "projStdSwGlassExtrusion", // Zawiera "N/A"
        robotsTechnologyKey: "projRobTechGlassExtrusion",
        tags: ["Process_Simulate", "ABB_Robots", "Adhesive", "Simulation_Engineer", "QTSwiss", "Glass_Industry"] // Dodano tag dla branży
    },
    {
        id: "opelRusselsheim",
        nameKey: "projNameOpelRusselsheim",
        dateCompanyKey: "projDateOpelRusselsheim",
        positionKey: "projPosOpelRusselsheim",
        standardSoftwareKey: "projStdSwOpelRusselsheim",
        robotsTechnologyKey: "projRobTechOpelRusselsheim",
        tags: ["Opel", "OPEL_Legacy", "Process_Simulate", "Fanuc_Robots", "Spot_Welding", "Steel", "Adhesive", "Stud_Welding", "Simulation_Leader", "Simulation_Engineer", "QTSwiss"]
    },
    {
        id: "ineosGrenadier",
        nameKey: "projNameIneosGrenadier",
        dateCompanyKey: "projDateIneosGrenadier",
        positionKey: "projPosIneosGrenadier",
        standardSoftwareKey: "projStdSwIneosGrenadier", // Zawiera "N/A"
        robotsTechnologyKey: "projRobTechIneosGrenadier",
        tags: ["Ineos", "Process_Simulate", "KUKA_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Simulation_Leader", "Simulation_Engineer", "QTSwiss"]
    },
    {
        id: "jlrX391",
        nameKey: "projNameJlrX391",
        dateCompanyKey: "projDateJlrX391",
        positionKey: "projPosJlrX391",
        standardSoftwareKey: "projStdSwJlrX391",
        robotsTechnologyKey: "projRobTechJlrX391",
        tags: ["JLR", "Robcad", "Fanuc_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Riveting", "Alu", "Simulation_Leader", "Simulation_Engineer", "QTSwiss"]
    },
    {
        id: "jlrX540Magna",
        nameKey: "projNameJlrX540Magna",
        dateCompanyKey: "projDateJlrX540Magna",
        positionKey: "projPosJlrX540Magna",
        standardSoftwareKey: "projStdSwJlrX540Magna",
        robotsTechnologyKey: "projRobTechJlrX540Magna",
        tags: ["JLR", "Magna", "Process_Simulate", "KUKA_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Simulation_Leader", "Simulation_Engineer", "QTSwiss"]
    },
    {
        id: "vwCrafter",
        nameKey: "projNameVwCrafter",
        dateCompanyKey: "projDateVwCrafter",
        positionKey: "projPosVwCrafter",
        standardSoftwareKey: "projStdSwVwCrafter",
        robotsTechnologyKey: "projRobTechVwCrafter",
        tags: ["VW", "Process_Simulate", "KUKA_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Offline_Robot_Programming", "QTSwiss"]
    },
    {
        id: "audi49x",
        nameKey: "projNameAudi49x",
        dateCompanyKey: "projDateAudi49x",
        positionKey: "projPosAudi49x",
        standardSoftwareKey: "projStdSwAudi49x",
        robotsTechnologyKey: "projRobTechAudi49x",
        tags: ["Audi", "VW", "Robcad", "Fanuc_Robots", "Spot_Welding", "Steel", "Adhesive", "Stud_Welding", "Offline_Robot_Programming", "QTSwiss"]
    },
    {
        id: "volvoV54x",
        nameKey: "projNameVolvoV54x",
        dateCompanyKey: "projDateVolvoV54x",
        positionKey: "projPosVolvoV54x",
        standardSoftwareKey: "projStdSwVolvoV54x",
        robotsTechnologyKey: "projRobTechVolvoV54x",
        tags: ["Volvo", "Process_Simulate", "ABB_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Offline_Robot_Programming", "QTSwiss"]
    },
    {
        id: "bmwOld",
        nameKey: "projNameBmwOld",
        dateCompanyKey: "projDateBmwOld",
        positionKey: "projPosBmwOld",
        standardSoftwareKey: "projStdSwBmwOld",
        robotsTechnologyKey: "projRobTechBmwOld",
        tags: ["BMW", "Process_Simulate", "ABB_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Simulation_Engineer", "QTSwiss"]
    },
    {
        id: "daimlerBr213",
        nameKey: "projNameDaimlerBr213",
        dateCompanyKey: "projDateDaimlerBr213",
        positionKey: "projPosDaimlerBr213",
        standardSoftwareKey: "projStdSwDaimlerBr213",
        robotsTechnologyKey: "projRobTechDaimlerBr213",
        tags: ["Daimler", "Integra_V5", "Delmia_V5", "KUKA_Robots", "Spot_Welding", "Adhesive", "Stud_Welding", "Steel", "Simulation_Engineer", "QTSwiss"]
    }
];


async function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        try {
            const response = await fetch('navbar-template.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const navbarHTML = await response.text();
            navbarPlaceholder.innerHTML = navbarHTML;
            initializeNavbarFeatures();
        } catch (error) {
            console.error("Could not load navbar:", error);
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = "<p class='text-red-500 text-center p-4'>Nie udało się załadować paska nawigacyjnego.</p>";
            }
        }
    }
}

async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const response = await fetch('footer-template.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const footerHTML = await response.text();
            footerPlaceholder.innerHTML = footerHTML;
        } catch (error) {
            console.error("Could not load footer:", error);
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = "<p class='text-red-500 text-center p-4'>Nie udało się załadować stopki.</p>";
            }
        }
    }
}


function initializeNavbarFeatures() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        const hamburgerIcon = hamburgerButton.querySelector('i');
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                if(hamburgerIcon) {
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars');
                }
            } else {
                if(hamburgerIcon) {
                    hamburgerIcon.classList.remove('fa-bars');
                    hamburgerIcon.classList.add('fa-times');
                }
            }
        });
    }

    createLangButtons();
    setActiveNavLink();
}

function createLangButtons() {
    const languages = [
        { code: 'pl', name: 'PL' }, { code: 'en', name: 'EN' },
        { code: 'de', name: 'DE' }, { code: 'cs', name: 'CS' }
    ];
    const desktopSwitcher = document.getElementById('language-switcher-desktop');
    const mobileSwitcher = document.getElementById('language-switcher-mobile');

    if (desktopSwitcher) desktopSwitcher.innerHTML = '';
    if (mobileSwitcher) mobileSwitcher.innerHTML = '';

    languages.forEach(lang => {
        const buttonHTML = `<button data-lang="${lang.code}">${lang.name}</button>`;
        if (desktopSwitcher) desktopSwitcher.insertAdjacentHTML('beforeend', buttonHTML);
        if (mobileSwitcher) mobileSwitcher.insertAdjacentHTML('beforeend', buttonHTML);
    });

    const langButtonSelectors = '#language-switcher-desktop button, #language-switcher-mobile button';
    document.querySelectorAll(langButtonSelectors).forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.lang;
            switchLanguage(selectedLang);
        });
    });
}

const baseSwitchLanguage = (lang) => {
    document.documentElement.lang = lang;
    const translatableElements = document.querySelectorAll('[data-lang-key]');

    translatableElements.forEach(el => {
        const key = el.dataset.langKey;
        if (translations[key] && translations[key][lang] !== undefined) {
            const translation = translations[key][lang];
            if (key.startsWith('aboutMeTextNew') || key === 'heroProjectsText' || key === 'exp1Intro' || 
                key.startsWith('projPos') || key.startsWith('projStdSw') || key.startsWith('projRobTech') || key.startsWith('projDate') || key.startsWith('projName')) { 
                el.innerHTML = translation.replace(/\n/g, '<br>');
            } else if (key === 'footerText' && translation === "") {
               el.style.display = 'none';
           } else {
               el.style.display = '';
               el.innerText = translation;
           }
        } else if (translations[key] && typeof translations[key] === 'object' && translations[key][lang] === undefined) {
            const fallbackTranslation = translations[key]['pl'];
            if (fallbackTranslation !== undefined) {
                if (key.startsWith('aboutMeTextNew') || key === 'heroProjectsText' || key === 'exp1Intro' || 
                    key.startsWith('projPos') || key.startsWith('projStdSw') || key.startsWith('projRobTech') || key.startsWith('projDate') || key.startsWith('projName')) {
                    el.innerHTML = fallbackTranslation.replace(/\n/g, '<br>');
                } else {
                    el.innerText = fallbackTranslation;
                }
            }
        }
    });

    const langButtonSelectors = '#language-switcher-desktop button, #language-switcher-mobile button';
    document.querySelectorAll(langButtonSelectors).forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const pageName = document.body.dataset.pageName || "Index";
    const pageTitleKey = `pageTitle${pageName === "Index" ? "Index" : pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/\s+/g, '')}`;


    if (translations[pageTitleKey] && translations[pageTitleKey][lang]) {
        document.title = translations[pageTitleKey][lang];
    } else {
        if (pageName === "Doswiadczenie") {
             const fallbackKey = "pageTitleDoswiadczenie";
             if (translations[fallbackKey] && translations[fallbackKey][lang]) {
                 document.title = translations[fallbackKey][lang];
             }
        }
    }
};

window.switchLanguage = (lang) => {
    baseSwitchLanguage(lang);
    localStorage.setItem('preferredLang', lang);

    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
};

function setActiveNavLink() {
    let currentPageFile = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    if (currentPageFile === "" || currentPageFile === "/" || currentPageFile === "Index.html") {
        currentPageFile = "index.html";
    }

    const navLinks = document.querySelectorAll('#main-navbar .nav-link');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            link.classList.add('text-gray-300'); 
            if (link.getAttribute('data-page') === currentPageFile) {
                link.classList.add('nav-link-active');
            }
        });
    }
}

function initializeAnimateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) {
        return; 
    }
    if (window.scrollObserverInstance) {
        animatedElements.forEach(el => {
            // Upewnij się, że element nie jest już obserwowany przed ponownym dodaniem
            window.scrollObserverInstance.unobserve(el);
            el.classList.remove('is-visible'); // Zresetuj stan widoczności dla ponownej animacji
        });
    }

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    };

    window.scrollObserverInstance = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => window.scrollObserverInstance.observe(el));
}


// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleButtons(theme);
    localStorage.setItem('theme', theme);
}

function updateToggleButtons(theme) {
    const icons = document.querySelectorAll('.theme-toggle-icon');
    const texts = document.querySelectorAll('.theme-toggle-text');
    icons.forEach(icon => {
        icon.textContent = theme === 'light' ? '◑' : '◐';
    });
    texts.forEach(text => {
        text.textContent = theme === 'light' ? 'Dark' : 'Light';
    });
}

window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
};

// Initialize theme immediately to prevent flash
(function() {
    applyTheme(getPreferredTheme());
})();

document.addEventListener('DOMContentLoaded', () => {
    // Apply theme after DOM is ready
    applyTheme(getPreferredTheme());

    Promise.all([loadNavbar(), loadFooter()]).then(() => {
        // Update theme toggle buttons after navbar loads
        updateToggleButtons(getPreferredTheme());

        let currentLang = localStorage.getItem('preferredLang') || 'pl';
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && ['pl', 'en', 'de', 'cs'].includes(langParam)) {
            currentLang = langParam;
        }

        if (typeof renderProjectCards === 'function' && document.getElementById('project-cards-grid')) {
            renderProjectCards(currentLang);
        }
        if (typeof initializeProjectFiltersLocal === 'function' && document.getElementById('project-filters')) {
            initializeProjectFiltersLocal(currentLang);
        }
        switchLanguage(currentLang);
        initializeAnimateOnScroll();
    });

    window.addEventListener('popstate', () => {
        if (document.getElementById('navbar-placeholder') && document.getElementById('navbar-placeholder').innerHTML !== "" &&
            document.getElementById('footer-placeholder') && document.getElementById('footer-placeholder').innerHTML !== "") {
            let currentLang = localStorage.getItem('preferredLang') || 'pl';
            
            if (typeof renderProjectCards === 'function' && document.getElementById('project-cards-grid')) {
                renderProjectCards(currentLang);
            }
            if (typeof initializeProjectFiltersLocal === 'function' && document.getElementById('project-filters')) {
                initializeProjectFiltersLocal(currentLang);
            }
            switchLanguage(currentLang);
            setActiveNavLink();
            initializeAnimateOnScroll();
        }
    });
     document.addEventListener('languageChanged', (event) => {
        const newLang = event.detail.language;
        if (typeof renderProjectCards === 'function' && document.getElementById('project-cards-grid')) {
            renderProjectCards(newLang);
        }
        if (typeof initializeProjectFiltersLocal === 'function' && document.getElementById('project-filters')) {
            // Przekazanie nowego języka do inicjalizacji filtrów
            initializeProjectFiltersLocal(newLang); 
        }
        initializeAnimateOnScroll(); 
    });
});
