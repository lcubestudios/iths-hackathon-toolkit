# Architecture Decision Records

## Template

```
### ADR-000 — Title
**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Deprecated | Superseded by ADR-XXX

**Context**: What situation forced this decision?
**Decision**: What did we choose?
**Consequences**: What are the trade-offs?
```

---

---

### ADR-001 — Vanilla JS for Rapid Prototyping
**Date**: 2026-04-14
**Status**: Accepted

**Context**: We needed a development environment that allows for zero-config startup and instant iteration during a high-pressure hackathon. 

**Decision**: We chose Vanilla Javascript (ES6 Modules) and standard CSS/HTML. 

**Consequences**: We avoid build-tool overhead (Vite/Webpack) but must manually manage state and component rendering via template literals.

---

### ADR-002 — Open-Meteo as Primary Data Provider
**Date**: 2026-04-14
**Status**: Accepted

**Context**: Weather APIs often require credit cards or complex key management, which can slow down onboarding.

**Decision**: Use Open-Meteo for its public, key-less endpoint that still provides high-quality hourly "Apparent Temperature" (Real Feel).

**Consequences**: The project is dependent on the uptime of a free public API, but it simplifies the setup for new developers significantly.
