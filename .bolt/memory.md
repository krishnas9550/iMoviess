# Project memory

## Product intent & audience

- Local recreation of the referenced IMovies online cinema/booking experience.
- Audience: moviegoers browsing current films, checking showtimes, selecting seats, and completing a booking.
- Core journey: discover/search movies → inspect movie details → choose showtime → select seats → confirm booking.

## Brand personality & voice

- Cinematic, polished, immersive, and production-ready rather than generic.
- Interface copy should be concise and action-oriented, supporting fast browsing and booking.
- The experience should feel like a modern cinema dashboard with clear progression through the reservation flow.

## Visual design & UX direction

- Dark cinema-themed foundation with amber/gold highlights for primary actions and emphasis.
- Prominent hero area followed by browsable movie-card content.
- Movie cards should support title discovery and lead naturally into detail/showtime views.
- Include responsive navigation, search, movie details, showtimes, seat selection, and booking confirmation states.
- Preserve a clear visual hierarchy between browsing content, selected movie/session information, available seats, and final confirmation.
- Use responsive layouts suitable for desktop and smaller screens; booking controls and seat choices should remain usable on touch devices.
- Prefer familiar iconography and compact controls, with strong contrast and visible selected/disabled states.
- Keep the dark palette readable and accessible; do not rely on color alone to communicate seat availability or booking state.

## Decisions, constraints & rationale

- The target experience is based on the supplied live IMovies URL and should remain visually and behaviorally aligned with that reference.
- The recreated app currently includes movie browsing, title search, details, showtimes, seat selection, and booking confirmation.
- Existing implementation is a Vite/React project; preserve the established project structure and conventions.
- Use the project’s existing styling and icon tooling rather than adding unnecessary UI dependencies.
- The page has been reported as building successfully; avoid regressions to the completed flow when making future changes.
- Treat movie/showtime/seat content as local recreation data unless a future request explicitly requires a backend or live data source.

## Open questions & assumptions

- Exact parity with the reference site’s full content, routes, account behavior, and backend persistence has not been verified.
- It is assumed that the current scope is the primary cinema browsing and booking experience, not a complete authenticated ticketing platform.
- It is unclear whether future work should prioritize pixel-level comparison, additional films/showtimes, payment integration, or accessibility refinement.