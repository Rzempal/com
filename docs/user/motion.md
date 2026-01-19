Oto rozszerzony, wysoce techniczny prompt dla agenta LLM. Skupia się on wyłącznie na **dynamice, kinetyce i fizyce ruchu**, których nie oddają statyczne obrazy, a które stanowią o "premium feel" Twojego portfolio.

---

# Motion & Interaction Logic: The "Kinetic Portfolio" Context

Twoim zadaniem jest zaimplementowanie zaawansowanego systemu animacji opartego na **Framer Motion** oraz **Lenis** (smooth scroll), aby odtworzyć płynność i głębię z załączonego filmu. Skoncentruj się na "interpolacji między stanami", a nie tylko prostych wejściach elementów.

## 1. The "Canvas Shrink" Orchestration (Hero-to-Content)

To najważniejsza animacja filmu (0:00-0:02). Hero nie jest po prostu przewijane – ono zapada się w głąb strony.

* **Logic**: Wykorzystaj `useScroll` i `useTransform` do powiązania postępu scrolla z transformacją kontenera.
* **Parameters**:
* `scale`: Z `1` do `0.92`.
* `borderRadius`: Z `0px` do `48px`.
* `y`: Subtelne przesunięcie w górę, ale wolniejsze niż natywny scroll (efekt paralaksy).
* **Interpolation**: Użyj `ease: [0.32, 0.72, 0, 1]` (custom cubic-bezier) dla efektu "mięsistego", ciężkiego ruchu.



## 2. Staggered Content "Float-In"

Zwróć uwagę na sekcję "Choose Your Adventure" (0:03). Karty nie wyskakują; one wypływają z różną prędkością.

* **Orchestration**: Zastosuj `variants` z `staggerChildren`.
* **Motion Path**: Elementy powinny zaczynać od `y: 40` i `opacity: 0`, ale z dodatkowym `rotateX: 10deg`, co nada im efekt trójwymiarowego obrotu przy "wstawaniu".
* **Physics**: Zamiast standardowego `tween`, użyj `type: "spring"` z parametrami: `stiffness: 80, damping: 20, mass: 1`.

## 3. Dynamic UI "Teleportation" (AI Delegate Effect)

W sekcji "GenAI will execute..." (0:07) widać ruchome elementy UI (karty zadań przenoszące się do "AI Delegated").

* **Layout Animations**: Użyj propa `layout` od Framer Motion (Shared Layout Animations). Przy zmianie stanu (np. `isDelegated`), element powinien płynnie przemieścić się między kontenerami, zmieniając rozmiar i kolor obramowania bez "skakania".
* **Path Animation**: Strzałka łącząca procesy musi być animowana za pomocą `pathLength` (z `0` do `1`) z efektem "rysowania" zsynchronizowanym z pojawieniem się karty.

## 4. Deep Layer Parallax (Background Depth)

Film sugeruje, że tło jest głębiej niż treść.

* **Floating Meshes**: Rozmyte punkty świetlne (glows) w tle muszą poruszać się niezależnie od scrolla. Zastosuj `useTransform` z odwróconym wektorem (gdy user przewija w dół, światła unoszą się minimalnie w górę z mnożnikiem `0.2`).
* **Grain Movement**: Nałóż subtelną animację `background-position` na warstwę szumu (noise), aby tło "żyło" nawet w statyce.

## 5. Global Smooth Scroll (Lenis/Locomotive)

Całość musi być osadzona w systemie Smooth Scrolling.

* **Inertia**: Scroll musi mieć bezwładność. Zatrzymanie przewijania nie może być natychmiastowe – musi nastąpić miękkie wyhamowanie.
* **Sync**: Wszystkie animacje `useScroll` muszą być zsynchronizowane z instancją Lenis, aby uniknąć jitteringu (szarpania).

## 6. Hover Micro-Kinetic

Każdy interaktywny element (karta, przycisk) musi reagować na mysz:

* **Tilt Effect**: Delikatne nachylenie (maks 5 stopni) w stronę kursora przy użyciu `useSpring`.
* **Magnetic Buttons**: Przyciski powinny "przyciągać" kursor, gdy ten znajdzie się w promieniu 30px (efekt luksusowego interfejsu).

---

### Krytyczna instancja dla Agenta:

> "Nie generuj standardowych animacji `initial/animate`. Skup się na **scroll-linked interactions**. Każdy piksel ruchu na ekranie musi wynikać z pozycji scrolla użytkownika lub subtelnej fizyki spring, aby uniknąć wrażenia 'taniej' strony internetowej."

**Czy chciałbyś, abym teraz przygotował implementację konkretnego hooka `useParallaxScroll`, który zarządza tym efektem "zapadania się" sekcji Hero?**