# Fonty używane na stronie michalrapala.com

## Główne fonty

- **Manrope** - Font nagłówkowy (headings)
- **Inter** - Font tekstowy (body)

## Szczegółowa tabela użycia fontów

| Sekcja | Element | Font | Waga | Rozmiar | CSS Class |
|--------|---------|------|------|---------|-----------|
| **INDEX.HTML (Gate)** |
| Podtytuł | Tekst powitalny | **Inter** | 400 | clamp(1rem, 2.5vw, 1.2rem) | `.gate__subtitle` |
| Przycisk | "Wejdź" | **Inter** | 600 | 1rem | `.gate__enter` |
| | | | | | |
| **HUB.HTML - Top Bar** |
| Kontakt | Email link | **Inter** | normal | 0.9rem | `.top-info-bar-contact a` |
| Kontakt | LinkedIn link | **Inter** | normal | 0.9rem | `.top-info-bar-contact a` |
| Status | "Otwarty na nowe projekty" | **Inter** | normal | 0.9rem | `.top-info-bar-status` |
| | | | | | |
| **HUB.HTML - Navigation** |
| Back button | "Powrót" | **Inter** | 600 | 1rem | `.hub-back-button` |
| | | | | | |
| **HUB.HTML - Pills** |
| Pill 1 | "Robotyka" | **Inter** | 600 | 0.9rem | `.hub-pill` |
| Pill 2 | "Aplikacje webowe" | **Inter** | 600 | 0.9rem | `.hub-pill` |
| Pill 3 | "Strony internetowe" | **Inter** | 600 | 0.9rem | `.hub-pill` |
| | | | | | |
| **Karty (Card Sheet)** |
| Tytuł | Nagłówek karty | **Manrope** | 700 | 2rem | `.card-title` |
| Tytuł | Nagłówek karty (hub) | **Manrope** | 700 | 2rem | `.hub-card-title` |
| Opis | Tekst opisowy | **Inter** | normal | 1rem | `.card-lead` |
| Opis | Tekst opisowy (hub) | **Inter** | normal | 1rem | `.hub-card-description` |
| CTA | Przycisk akcji | **Inter** | 600 | default | `.card-cta` |
| CTA | Link akcji (hub) | **Inter** | 600 | default | `.hub-card-link` |
| | | | | | |
| **Ogólne elementy** |
| Nagłówki | h1, h2, h3, h4, h5, h6 | **Manrope** | 700 | zmienny | `h1-h6` |
| Body | Domyślny tekst | **Inter** | normal | 16px | `body` |

## Definicje CSS

```css
:root {
    --font-heading: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
```

## Podział użycia

### Manrope (Font nagłówkowy)
- Tytuły kart (Robotyka, Aplikacje webowe, Twoja strona → online)
- Wszystkie nagłówki semantyczne (h1-h6)
- Używany dla elementów wymagających większej wagi wizualnej

### Inter (Font tekstowy)
- Wszystkie przyciski i pills
- Tekst opisowy na kartach
- Linki i elementy nawigacyjne
- Top bar (email, LinkedIn, status)
- Większość elementów UI

## Wagi fontów

- **Normal/400** - Tekst opisowy, linki
- **600** - Przyciski, pills, elementy interaktywne
- **700** - Nagłówki, tytuły kart

## Responsive

Na mniejszych ekranach (<768px):
- Pills: `font-size: 0.8rem` (zamiast 0.9rem)
- Card titles: `font-size: 1.5rem` (zamiast 2rem)
- Card descriptions: `font-size: 0.95rem` (zamiast 1rem)

## Załadowanie fontów

Fonty są załadowane z Google Fonts w pliku HTML:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Manrope:wght@700&display=swap" rel="stylesheet">
```
