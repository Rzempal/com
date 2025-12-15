# Plan Refaktoryzacji: twoja-strona.online (Vibrant & Business Logic)

## Cel
Zachować styl "No boring sites allowed" (Vibrant Block Maximalist), ale zmienić narrację z "tworzenia stron" na "dostarczanie infrastruktury sprzedaży" w modelu abonamentowym.

## 1. Refaktoryzacja `oferta.html`

### A. Sekcja Hero
* **Design:** Pozostaje bez zmian (duża typografia, mocne kolory).
* **Copy:** Zmiana z "Nowoczesne strony internetowe" na **"Strony, które nie nudzą. Biznes, który działa."**
* **Podtytuł:** "Łączymy odważny design z inżynierską stabilnością. Ty zajmujesz się firmą, my technologią."

### B. Sekcja "Co oferuję?" -> Transformacja w "Pakiety Korzyści"
Zamiast luźnych kafelków (RWD, SEO, Szybkość), tworzymy 3 wyraźne karty produktowe (zgodnie z modelem biznesowym).

**Karta 1: Wizytówka (Starter)**
* *Cel:* Obecność w sieci.
* *Model:* Niska opłata startowa + niski abonament.
* *Treść:* One-page, domena, hosting, certyfikat SSL, szybki kontakt.
* *Styl:* Kolor `card-icon-yellow`.

**Karta 2: Firma (Core - Rekomendowany)**
* *Cel:* Budowanie wizerunku i oszczędność czasu.
* *Model:* Średnia opłata startowa + abonament z opieką (The Janitor).
* *Treść:* Do 5 podstron, CMS (opcjonalnie), **1h prac programistycznych w cenie/mc** (kluczowe!), raporty miesięczne.
* *Styl:* Kolor `card-icon-purple` (wyróżniony).

**Karta 3: Sprzedaż (Growth)**
* *Cel:* Pozyskiwanie leadów.
* *Model:* Wycena indywidualna + wyższy abonament (analityka).
* *Treść:* Landing page sprzedażowy, integracja z CRM, zaawansowane SEO, podpięcie Google Ads/Analytics.
* *Styl:* Kolor `card-icon-green`.

### C. Sekcja "Proces Współpracy" -> "Cykl Życia Strony"
Zmiana narracji z liniowej (koniec po wdrożeniu) na cykliczną.

1.  **Analiza & Vibe** (zamiast Rozmowa): Ustalamy cel biznesowy i styl, który wyróżni Cię z tłumu.
2.  **Budowa (Sprint)**: Szybkie wdrożenie wersji MVP (korzystamy z AI, by ciąć koszty, nie jakość).
3.  **Launch**: Uruchomienie i testy.
4.  **Opieka (Maintenance)**: To nas różni od innych. Nie znikamy. Co miesiąc dbamy o aktualizacje i drobne zmiany.

### D. Sekcja CTA
* **Hasło:** "Przestań płacić za strony, które nic nie robią."
* **Przyciski:**
    * Główny: "Wybierz swój Pakiet" (link do cennika).
    * Drugi: "Zobacz szalone projekty" (link do realizacji).

---

## 2. Analiza i dostosowanie pozostałych podstron

### `cennik-kalkulator.html` (KRYTYCZNE)
* **Stan obecny:** Prawdopodobnie prosty cennik/kalkulator jednorazowy.
* **Wymagana zmiana:** Musi jasno rozdzielać **Opłatę Wdrożeniową** (Setup Fee) od **Opłaty Miesięcznej** (Monthly Retainer).
* **UI:** Suwaki są OK, ale muszą pokazywać: "Inwestycja na start: X zł" ORAZ "Twój święty spokój: Y zł/mc".

### `realizacje.html`
* **Stan obecny:** Galeria projektów.
* **Wymagana zmiana:** Dodanie etykiet "Utrzymywane przez nas".
* **Storytelling:** Przy każdym projekcie krótka adnotacja: "Klient od 2 lat, w tym czasie wdrożyliśmy 14 aktualizacji w cenie abonamentu". To buduje zaufanie do modelu.

### `index.html` (Strona główna)
* **Wymagana zmiana:** W sekcji "O mnie" lub wstępie warto wspomnieć o `ResztaToKod`.
* **Przykład:** "Powered by ResztaToKod logic". To pozycjonuje `twoja-strona.online` jako kreatywny front solidnego zaplecza.

### `kontakt.html`
* **Formularz:** Dodaj pole wyboru: "Interesuje mnie: A) Jednorazowy projekt B) Stała opieka i rozwój". Domyślnie zaznacz B.

## 3: Analiza Cenowa  
## Model WaaS (Website as a Service) w warunkach PL

Model biznesowy zakłada odejście od jednorazowej sprzedaży typu *„sprzedaj i zapomnij”* na rzecz modelu subskrypcyjnego **WaaS – Website as a Service**.

---

## Założenia cenowe (adaptacja do realiów PL)

Na podstawie pliku `Model biznesowy strony.md`:

- **Setup (Digital Renovation)**  
  $750 – $1000 → **3000 – 4500 PLN**

- **Hosting / Opieka (Rent the Land)**  
  $30 → **120 – 150 PLN netto / miesiąc**

- **Drobne zmiany (Janitor)**  
  Zawarte w **wyższym pakiecie**

---

## Porównanie finansowe  
### Symulacja dla 1 klienta

| Element | Stary model (typowa agencja) | Nowy model (Twoja Strona + ResztaToKod) |
|------|-----------------------------|-----------------------------------------|
| Opłata startowa | 2500 PLN (jednorazowo) | 1500 – 2000 PLN (niższy próg wejścia) |
| Utrzymanie roczne | 300 PLN (tylko hosting) | 1800 PLN (150 PLN × 12 miesięcy) |
| Przychód po 1 roku | 2800 PLN | 3300 – 3800 PLN |
| Przychód po 2 latach | 2800 PLN (klient wraca rzadko) | 5100 – 5600 PLN (rosnący LTV) |
| Korzyść dla klienta | Strona jest jego, ale „pleśnieje” | Strona aktualna, bezpieczna, zmiany w cenie |

---

## Wniosek

W nowym podejściu:
- zarabiasz **mniej na starcie** (*Build*),
- ale budujesz **stabilny, powtarzalny dochód** (*Run*).

Przy **20 klientach**:
- ~**3000 PLN / miesiąc** stałego przychodu,
- realne **bezpieczeństwo finansowe** i przewidywalność cashflow.