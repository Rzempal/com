# Deployment

> **Powiązane:** [Architektura](architecture.md) | [Contributing](standards/contributing.md)

---

## Platforma

Projekt hostowany na **Vercel** z automatycznym CI/CD.

| Element | Wartość |
|---------|---------|
| Hosting | Vercel |
| Framework | Next.js 16 (auto-detected) |
| Domena produkcyjna | michalrapala.com (DNS via hostido.pl) |
| Preview deployments | Automatyczne z każdego brancha/PR |
| Build command | `npm run build` (Next.js default) |
| Output directory | `.next` (auto-detected) |
| Node.js | 20.x |

---

## Proces wdrożenia

### Production (main branch)

1. Push/merge do `main`
2. Vercel automatycznie uruchamia build
3. Build przechodzi → deploy na produkcję
4. Build failuje → deployment zablokowany, powiadomienie

### Preview (feature branches)

1. Push na dowolny branch / otwarcie PR
2. Vercel tworzy preview deployment z unikalnym URL
3. URL dostępny w komentarzu PR na GitHub
4. Preview aktualizuje się z każdym pushem na branch

### Rollback

Vercel utrzymuje historię deploymentów. Rollback do poprzedniej wersji:
**Vercel Dashboard → Deployments → wybierz wersję → Promote to Production**

---

## Zmienne środowiskowe

Brak zmiennych środowiskowych wymaganych dla buildu. Projekt jest statyczną stroną portfolio
bez backendu, baz danych ani zewnętrznych API.

---

## Checklist przed deploy na production

- [ ] `npm run build` przechodzi lokalnie bez błędów
- [ ] Preview deployment wygląda poprawnie
- [ ] Tłumaczenia (PL/EN) są kompletne
- [ ] Animacje działają płynnie (60 FPS na desktop)
- [ ] Responsywność: mobile, tablet, desktop zweryfikowane

---

> 📅 **Ostatnia aktualizacja:** 2026-02-07
