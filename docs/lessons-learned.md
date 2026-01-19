# 🧠 Lessons Learned

> **Powiązane:** [Standardy](standards/conventions.md) | [Roadmap](roadmap.md)

---

## 2026-01-19: Separacja Dokumentacji (Standards vs Live)

### Problem
Dokumentacja "żywa" (opisująca konkretny projekt) mieszała się ze standardami firmowymi (Code Review, Konwencje) w jednym katalogu `docs/`, co utrudniało nawigację i zrozumienie co można edytować.

### Rozwiązanie
Wydzielono podkatalog `docs/standards/` dla dokumentów reużywalnych.
- **Project Specific (`docs/*.md`)**: Edytowalne, specyficzne dla projektu.
- **Standards (`docs/standards/*.md`)**: Read-only (chyba że zmieniamy standard globalny).

---

## 2026-01-15: Separacja procesu Review

### Problem
Mieszanie uwag dotyczących logiki biznesowej ("Code Review") z uwagami wizualnymi ("Design Review") powodowało szum informacyjny i rozmycie odpowiedzialności.

### Rozwiązanie
Zastosowano standard branżowy rozdzielający te dwa procesy:
1. **Code Review:** Skupia się na architekturze, bezpieczeństwie i logice (styl Linusa).
2. **Design Review:** Skupia się na UI, UX i zgodności z Design Systemem (pixel-perfect).

### Wnioski
- Pozwala to na precyzyjniejsze dobieranie reviewerów (Backend dev vs Frontend/Designer).
- Zwiększa jakość warstwy wizualnej poprzez dedykowaną checklistę.

---
