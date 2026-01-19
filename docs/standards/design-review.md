# BRUTAL DESIGN REVIEW

> **Powiązane:** [Design System](../docs/design.md) | [Konwencje](conventions.md)
**Data**: 2026-01-19
**Audytor**: Antigravity (Strict UX/UI)
**Status**: KRYTYCZNY

## 1. Hero Section & ScrollWrapper
**Werdykt**: BŁĄD PROJEKTOWY (Design Flaw)

- **Problem 1: Clipping (Ucinanie treści)**
  - `ScrollWrapper` animuje `borderRadius` do `40px`.
  - `Hero` ma padding `px-4` (16px).
  - **Matematyka**: 16px < 40px. Treść (tekst, przyciski) w rogach ekranu zostanie bezlitośnie ucięta przez zaokrąglenie w trakcie przewijania na urządzeniach mobilnych.
  - **Naprawa**: Zwiększyć padding kontenera lub zmniejszyć `borderRadius` na mobile. Treść musi być odsunięta od krawędzi o >40px (bezpieczny margines).

- **Problem 2: Fixed Height (Sztywna wysokość)**
  - Treść Hero jest pozycjonowana absolutnie (`absolute inset-0`) w kontenerze `h-screen`.
  - Jeśli użytkownik otworzy stronę na telefonie w poziomie (landscape) lub na małym ekranie, treść wyższa niż ekran zostanie ucięta (poza viewportem).
  - **Naprawa**: Zmienić `flex-center` na `min-h-screen` z `padding-top/bottom` dla bezpieczeństwa treści.

## 2. WorkSection (Sekcja Projektów)
**Werdykt**: AMATORSKI LAYOUT

- **Problem 3: Misalignment (Rozjeżdżanie się elementów)**
  - Użyto: `flex flex-col md:flex-row justify-between items-end`.
  - **Efekt na Mobile**: `flex-col` + `items-end` powoduje, że nagłówek i opis (domyślnie `text-left`) są "przyklejone" do prawej krawędzi kontenera, ale tekst wewnątrz nich jest wyrównany do lewej. Wygląda to jak błąd CSS.
  - **Naprawa**: Na mobile musi być `items-start`. `items-end` tylko dla `md:flex-row`.

## 3. Page Layout (Nakładanie sekcji)
**Werdykt**: RYZYKOWNE Z-INDEXY

- **Problem 4: Sekcja "Services" nakłada się na Hero**
  - Margines `-mt-[15vh]` jest efektowny, ale ryzykowny.
  - Na wysokich ekranach OK. Na niskich ekranach sekcja "Services" wjedzie na przyciski CTA w Hero lub scroll indicator zanim użytkownik zdąży w nie kliknąć.
  - **Naprawa**: Dodać warunek lub zwiększyć odstęp.

## Plan Naprawczy (Natychmiastowy)
1. **Hero**: Zwiększ padding (`px-4` -> `px-6 md:px-12`) i dodaj `safe-area`.
2. **ScrollWrapper**: Zmniejsz `borderRadius` na mobile (np. do 20px).
3. **WorkSection**: Popraw wyrównanie flexboxa (`items-start` zamiast `items-end` na mobile).
4. **Responsywność**: Dodaj klasy `break-words` dla długich nagłówków.
