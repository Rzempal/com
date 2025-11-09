# Fonty używane na stronie michalrapala.com

## Główny font

- **Montserrat** - Font używany dla wszystkich elementów (headings + body)

## Szczegółowa tabela użycia fontów

| Sekcja | Element | Font | Waga | Rozmiar | CSS Class |
|--------|---------|------|------|---------|-----------|
| **INDEX.HTML (Gate)** |
| Podtytuł | Tekst powitalny | **Montserrat** | 400 | clamp(1rem, 2.5vw, 1.2rem) | `.gate__subtitle` |
| Przycisk | "Wejdź" | **Montserrat** | 600 | 1rem | `.gate__enter` |
| | | | | | |
| **HUB.HTML - Top Bar** |
| Kontakt | Email link | **Montserrat** | 400 | 0.9rem | `.top-info-bar-contact a` |
| Kontakt | LinkedIn link | **Montserrat** | 400 | 0.9rem | `.top-info-bar-contact a` |
| Status | "Otwarty na nowe projekty" | **Montserrat** | 400 | 0.9rem | `.top-info-bar-status` |
| | | | | | |
| **HUB.HTML - Navigation** |
| Back button | Ikona strzałki | **Montserrat** | 600 | 1.25rem | `.hub-back-button` |
| | | | | | |
| **HUB.HTML - Pills** |
| Pill 1 | "Robotyka" | **Montserrat** | 600 | 0.9rem | `.hub-pill` |
| Pill 2 | "Aplikacje webowe" | **Montserrat** | 600 | 0.9rem | `.hub-pill` |
| Pill 3 | "Strony internetowe" | **Montserrat** | 600 | 0.9rem | `.hub-pill` |
| | | | | | |
| **Karty (Card Sheet)** |
| Tytuł | Nagłówek karty | **Montserrat** | 700 | 2rem | `.card-title` |
| Tytuł | Nagłówek karty (hub) | **Montserrat** | 700 | 2rem | `.hub-card-title` |
| Opis | Tekst opisowy | **Montserrat** | 400 | 1rem | `.card-lead` |
| Opis | Tekst opisowy (hub) | **Montserrat** | 400 | 1rem | `.hub-card-description` |
| CTA | Przycisk akcji | **Montserrat** | 600 | default | `.card-cta` |
| CTA | Link akcji (hub) | **Montserrat** | 600 | default | `.hub-card-link` |
| | | | | | |
| **Ogólne elementy** |
| Nagłówki | h1, h2, h3, h4, h5, h6 | **Montserrat** | 700 | zmienny | `h1-h6` |
| Body | Domyślny tekst | **Montserrat** | 400 | 16px | `body` |

## Definicje CSS

```css
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('../assets/fonts/montserrat-latin-400-normal.woff2') format('woff2');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('../assets/fonts/montserrat-latin-600-normal.woff2') format('woff2');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('../assets/fonts/montserrat-latin-700-normal.woff2') format('woff2');
}

:root {
    --font-heading: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
    --font-body: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
```

## Podział użycia wag

### Montserrat 400 (Regular)
- Tekst opisowy na kartach
- Linki kontaktowe w top bar
- Status "Otwarty na nowe projekty"
- Podtytuł na stronie głównej
- Domyślny tekst body

### Montserrat 600 (Semi-Bold)
- Wszystkie przyciski (Wejdź, Powrót, CTA)
- Pills (Robotyka, Aplikacje webowe, Strony internetowe)
- Elementy interaktywne

### Montserrat 700 (Bold)
- Nagłówki semantyczne (h1-h6)
- Tytuły kart (Robotyka, Aplikacje webowe, Twoja strona → online)
- Elementy wymagające większej wagi wizualnej

## Responsive

Na mniejszych ekranach (<768px):
- Pills: `font-size: 0.8rem` (zamiast 0.9rem)
- Card titles: `font-size: 1.5rem` (zamiast 2rem)
- Card descriptions: `font-size: 0.95rem` (zamiast 1rem)

## Załadowanie fontów

Fonty są załadowane lokalnie z katalogu `/assets/fonts/` jako self-hosted pliki `.woff2`:

- `montserrat-latin-400-normal.woff2` - Regular (400)
- `montserrat-latin-600-normal.woff2` - Semi-Bold (600)
- `montserrat-latin-700-normal.woff2` - Bold (700)

Zalety lokalnego hostowania:
- ✅ Szybsze ładowanie (brak zewnętrznych requestów)
- ✅ Lepsza prywatność (bez Google Fonts tracking)
- ✅ Pełna kontrola nad wersjami fontów
- ✅ Działanie offline
- ✅ GDPR compliance

## Pliki fontów

Upewnij się że następujące pliki znajdują się w `/assets/fonts/`:
```
assets/fonts/
├── montserrat-latin-400-normal.woff2
├── montserrat-latin-600-normal.woff2
└── montserrat-latin-700-normal.woff2
```
