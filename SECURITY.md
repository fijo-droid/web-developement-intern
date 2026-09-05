# SECURITY.md

## Task 3: Security & Credential Awareness

### 1. What should never be committed to Git repositories?
Database credentials, API keys, private keys, environment configuration files containing sensitive data (`.env`), passwords, and session secrets.

### 2. How should environment variables be managed?
Environment variables should be stored locally in `.env` files, added to `.gitignore` to prevent version control tracking, and injected securely at runtime via hosting platform settings (e.g., Vercel, Netlify).

### 3. What would you do if credentials were accidentally pushed to GitHub?
1. Immediately revoke and invalidate the exposed key or password in the service provider dashboard.
2. Issue a new secret key.
3. Remove the secret from Git history using tools like `git-filter-repo` or BFG Repo-Cleaner.
4. Push the sanitized commit history to GitHub.

### 4. What is XSS?
Cross-Site Scripting (XSS) occurs when malicious JavaScript is injected into a web application and executed in the browsers of other users due to lack of input sanitization or output escaping.

### 5. Difference between Authentication and Authorization
* **Authentication**: Verifies who a user is (e.g., logging in with email and password).
* **Authorization**: Determines what a logged-in user is allowed to access or perform (e.g., checking permissions or roles).

### 6. Why is HTTPS important?
HTTPS encrypts data in transit between the browser and server, preventing eavesdropping, man-in-the-middle (MitM) attacks, and data tampering.

### 7. What is rate limiting?
Rate limiting restricts the number of requests a user or IP address can make to an API within a specific timeframe to prevent Denial-of-Service (DoS) attacks and brute-force attempts.

---

## Task 5: Secure Coding & Basic Pentesting Awareness

### Part A: Vulnerability Identification

#### Example 1: `const password = "admin123";`
* **Vulnerability**: Hardcoded Credentials.
* **Why it is dangerous**: Plaintext credentials committed to code repositories can be extracted by anyone with access to the source code or client build files.
* **Fix**: Remove hardcoded values and manage secrets via environment variables (`process.env.ADMIN_PASSWORD`).

#### Example 2: `element.innerHTML = userInput;`
* **Vulnerability**: DOM-based Cross-Site Scripting (XSS).
* **Why it is dangerous**: Executes un-sanitized user input as raw HTML/JavaScript in the browser context.
* **Fix**: Use safe text rendering like `element.textContent = userInput` or React JSX string binding `{userInput}`.

#### Example 3: `localStorage.setItem("token", jwtToken);`
* **Vulnerability**: Insecure Token Storage.
* **Why it is dangerous**: Data in `localStorage` is accessible to any script running on the same domain, making it vulnerable to token theft via XSS.
* **Fix**: Store authentication tokens in `HttpOnly`, `Secure`, and `SameSite` cookies that JavaScript cannot access.

#### Example 4: `app.use(cors());`
* **Vulnerability**: Permissive Cross-Origin Resource Sharing (CORS) Policy[cite: 1].
* **Why it is dangerous**: Allows any external domain to make requests to your API, exposing resources to cross-origin abuse[cite: 1].
* **Fix**: Restrict CORS to explicitly trusted origins:
  ```javascript
  app.use(cors({ origin: '[https://your-app-domain.com](https://your-app-domain.com)' }));