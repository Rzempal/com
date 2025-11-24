# Oznaczenia PCB – Wyjaśnienia

Dokumentacja profesjonalnych oznaczeń (silk screen markings) użytych na płytce PCB w projekcie michalrapala.com.

---

## 📖 CO OZNACZAJĄ NAPISY NA PCB?

### **TP1, TP2, TP3 (Test Points)**

**Co to:** Punkty testowe - miejsca gdzie technik może podłączyć oscyloskop/multimetr
**Dlaczego:** Podczas debugowania/serwisu łatwo sprawdzić czy sygnał dociera
**Lokalizacja:**
- TP1: Przy node Robotyka (500, 500)
- TP2: Przy node Aplikacje (850, 350)
- TP3: Przy node WWW (600, 850)

**Real-world:** Każdy profesjonalny PCB ma test pointy dla QC (quality control)

---

### **JP1 (Jumper)**

**Co to:** Jumper - konfigurowalne połączenie zworek
**Dlaczego:** Pozwala zmienić konfigurację płytki bez lutowania
**Lokalizacja:** Przy central pad (główny junction - 500, 500)
**Real-world:** Używane do wyboru trybu pracy (np. USB/Standalone)

---

### **R1-R4 (Resistors), C1-C4 (Capacitors)**

**Co to:** Component Reference Designators - unikalne nazwy komponentów
**Dlaczego:** Każdy element ma swoją "nazwę" do dokumentacji i BOM (Bill of Materials)

**Konwencja nazewnictwa:**
- **R** = Resistor (rezystor)
- **C** = Capacitor (kondensator)
- **U** = IC (układ scalony)
- **Q** = Transistor (tranzystor)
- **D** = Diode (dioda)
- **L** = Inductor (cewka)

**Lokalizacje:**
- R1: (270, 147) - 0805 size
- R2: (370, 297) - 0805 size
- R3: (720, 347) - 0805 size
- R4: (220, 447) - 0805 size
- C1: (120, 148) - 0603 size
- C2: (420, 347) - 0603 size
- C3: (470, 497) - 0603 size
- C4: (320, 747) - 0603 size

**Real-world:** Gdy coś się zepsuje, serwisant wie "wymień R3"

---

### **H1-H4 (Mounting Holes)**

**Co to:** Hole designators - oznaczenia otworów montażowych
**Dlaczego:** Instrukcja montażu wskazuje "wkręć śrubę M3 w H1-H4"

**Lokalizacje (rogi płytki):**
- H1: Top-left (60, 60)
- H2: Top-right (940, 60)
- H3: Bottom-left (60, 940)
- H4: Bottom-right (940, 940)

**Parametry:**
- Średnica zewnętrzna: 15 jednostek (copper ring)
- Średnica wewnętrzna: 8 jednostek (drill hole)

**Real-world:** Standardowe rozmieszczenie dla 100x100mm PCB

---

### **GND (Ground)**

**Co to:** Ground zone labels - oznaczenia obszarów masy
**Dlaczego:** Pokazuje które części płytki to copper pour połączony z masą

**Lokalizacje:**
- Top-left zone: (40, 50)
- Top-right zone: (580, 50)
- Bottom zone: (40, 690)

**Real-world:** Ważne dla EMC (electromagnetic compatibility) i bezpieczeństwa. Ground planes redukują szumy elektryczne i poprawiają sygnał.

---

### **MR PCB v1.0**

**Co to:** Board identifier + version number
**Dlaczego:** Identyfikacja wersji płytki (v1.0, v1.1, v2.0...)
**Lokalizacja:** Dolny prawy róg (850, 970)

**Format:**
- "MR PCB" - Designer/manufacturer mark (Michał Rapała PCB)
- "v1.0" - Version number

**Real-world:** Każda firma ma swój format:
- Apple: "APPLE A2342"
- Arduino: "ARDUINO UNO R3"
- Raspberry Pi: "RPI 4B"

---

### **© 2025**

**Co to:** Copyright notice
**Dlaczego:** Ochrona prawna projektu
**Lokalizacja:** Dolny lewy róg (50, 985)
**Real-world:** Standard w komercyjnych PCB, chroni przed kopiowaniem projektu

---

### **+ (Polarity Marks)**

**Co to:** Oznaczenia polaryzacji kondensatorów
**Dlaczego:** Kondensatory elektrolityczne muszą być lutowane we właściwą stronę

**Lokalizacje:**
- Przy C1 (113, 152)
- Przy C2 (413, 351)

**Real-world:** Odwrotna polaryzacja = wybuch kondensatora 💥
Kondensatory elektrolityczne mają plus (+) i minus (-). Zamiana biegunów powoduje uszkodzenie.

---

### **Pin 1 Indicators (białe kropki)**

**Co to:** Małe kropki pokazujące orientację komponentów
**Dlaczego:** IC i SMD mają Pin 1 (odniesienie) - musi być we właściwym miejscu

**Lokalizacje:**
- Przy R1 (268, 147) - r=1.5
- Przy R2 (368, 297) - r=1.5

**Real-world:** Bez tego można wlutować chip tyłem = nie działa. Pin 1 to punkt odniesienia dla numeracji wszystkich pozostałych pinów (2, 3, 4...).

---

## 🎯 PROFESJONALNE STANDARDY

PCB spełnia **IPC-7351** (standard dla PCB silk screen):

- ✅ **Component designators** (R, C) - każdy komponent ma unikalną nazwę
- ✅ **Test points** (TP) - punkty do testowania sygnałów
- ✅ **Polarity indicators** (+) - oznaczenia biegunowości
- ✅ **Pin 1 marks** (dots) - orientacja komponentów
- ✅ **Board version** - identyfikacja wersji
- ✅ **Mounting hole labels** - oznaczenia otworów
- ✅ **Zone labels** - oznaczenia obszarów masy

---

## 🎨 SPECYFIKACJA WIZUALNA

### Kolory
- **Substrate (podłoże):** #0d2626 (dark teal-green, opacity 0.85)
- **Silk screen (napisy):** #ffffff (white, opacity 0.8)
- **Traces (ścieżki):** #48D2E7 (cyan) - gradient
- **Pads (pady):** #48D2E7 (cyan)
- **Via holes:** #0a1120 (very dark blue)

### Typografia
- **Font:** Monospace (standard dla PCB)
- **Rozmiary:**
  - Test Points (TP): 8px, bold
  - Jumper (JP): 7px
  - Board Info: 9px (bold) + 7px
  - Mounting labels: 6px
  - Component refs: 6px (R), 5px (C)

### Opacity levels
- **Primary text:** 0.8 (TP, JP, board info)
- **Secondary text:** 0.6-0.7 (version, jumper)
- **Tertiary text:** 0.5 (mounting holes, zones, polarity)

---

## 📚 ŹRÓDŁA I STANDARDY

- **IPC-7351:** Generic Requirements for Surface Mount Design and Land Pattern Standard
- **IPC-2221:** Generic Standard on Printed Board Design
- **IPC-A-610:** Acceptability of Electronic Assemblies

---

## 🔧 WYKORZYSTANE TECHNOLOGIE

### SVG Elements
- `<text>` - wszystkie napisy
- `<circle>` - Pin 1 indicators
- `<g>` - grupowanie elementów (silk-screen, test-points, board-info)

### CSS Properties
- `fill="#ffffff"` - biały kolor tekstu
- `opacity="0.5-0.8"` - różne poziomy przezroczystości
- `font-family="monospace"` - czcionka jak na prawdziwym PCB
- `font-weight="600-700"` - pogrubienia dla ważnych elementów

---

**Utworzono:** 2025-11-15
**Projekt:** michalrapala.com
**Wersja PCB:** v1.0
