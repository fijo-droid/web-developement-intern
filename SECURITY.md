### File 3: `SECURITY.md`

```markdown
# Web Security Analysis & Vulnerability Report

This document outlines key web security considerations, potential vulnerabilities identified within the initial code structure, and recommended mitigation strategies for production readiness.

---

## Identified Vulnerabilities & Mitigation Strategies

### 1. Hardcoded Client-Side Credentials
- **Issue**: Client-side authentication checks rely on local state without server verification.
- **Risk**: Hardcoded credentials or client-only checks can be inspected and bypassed using browser developer tools.
- **Mitigation**: Implement standard HTTP-only cookie-based authentication or JSON Web Tokens (JWT) verified via a secure backend API over HTTPS.

### 2. Lack of In-Memory State Cleansing
- **Issue**: Sensitive state data (user inputs, login session flags) remains unencrypted in browser memory during execution.
- **Risk**: Potential exposure via Cross-Site Scripting (XSS) if unmanaged third-party libraries are imported.
- **Mitigation**: Sanitize all state inputs, enforce strict Content Security Policy (CSP) headers, and clear state explicitly upon user sign-out.

### 3. Permissive CORS (Cross-Origin Resource Sharing) Policy
- **Issue**: Default API configurations on deployment platforms can accidentally expose endpoints to unrestricted origins.
- **Risk**: Cross-origin requests could allow unauthorized domains to make requests on behalf of users.
- **Mitigation**: Explicitly specify allowed origins in backend header configurations rather than using wildcard (`*`) permissions.

### 4. Secret & Token Management Best Practices
- **Guideline**: Never commit API keys, database URLs, or private tokens to Git repositories.
- **Implementation**: Utilize `.env` files for local