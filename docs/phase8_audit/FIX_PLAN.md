# Minimal Fix Plan

No fixes are implemented by this investigation.

1. **Critical:** Version and share one feature-builder contract between training
   and serving. Expected measurable ceiling: recover the observed 20.84-point
   serving-path accuracy gap. Backward compatibility requires a versioned API.
2. **Critical:** Add season to the request contract and either preserve user
   humidity or remove it from the contract. Validate 1,000-row exact parity.
3. **High:** Enforce training-support bounds or return explicit OOD warnings.
   Validate with Monte Carlo and district/season edge cases.
4. **High:** Evaluate the actual request-to-model path in CI.
5. **Medium:** Audit data provenance and use realistic split strategy before
   considering retraining.

Retraining and dataset replacement are not justified by current evidence.
