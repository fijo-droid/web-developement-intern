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

### Task 5 — Part A: Vulnerability Identification

#### Example 1: `const password = "admin123";`
* **Vulnerability**: Hardcoded Credentials.
* **Why it is dangerous**: Plaintext credentials committed to code repositories can be extracted by anyone with access to the source code or client build files.
* **How to fix it**: Remove hardcoded values and manage secrets via environment variables (`process.env.ADMIN_PASSWORD`).

#### Example 2: `element.innerHTML = userInput;`
* **Vulnerability**: DOM-based Cross-Site Scripting (XSS).
* **Why it is dangerous**: Executes un-sanitized user input as raw HTML/JavaScript in the browser context.
* **How to fix it**: Use safe text rendering like `element.textContent = userInput` or React JSX string binding `{userInput}`.

#### Example 3: `localStorage.setItem("token", jwtToken);`
* **Vulnerability**: Insecure Token Storage.
* **Why it is dangerous**: Data in `localStorage` is accessible to any script running on the same domain, making it vulnerable to token theft via XSS.
* **How to fix it**: Store authentication tokens in `HttpOnly`, `Secure`, and `SameSite` cookies that JavaScript cannot access.

#### Example 4: `app.use(cors());`
* **Vulnerability**: Permissive Cross-Origin Resource Sharing (CORS) Policy.
* **Why it is dangerous**: Allows any external domain to make requests to your API, exposing resources to cross-origin abuse.
* **How to fix it**: Restrict CORS to explicitly trusted origins:
  ```javascript
  app.use(cors({ origin: 'https://your-app-domain.com' }));
  ```

---

### Task 5 — Part B: Security Awareness Questions

#### 1. What is XSS?
Cross-Site Scripting (XSS) is a vulnerability where an attacker injects malicious client-side scripts into web pages viewed by other users, allowing attackers to hijack sessions, steal cookies, or manipulate page content.

#### 2. What is CSRF?
Cross-Site Request Forgery (CSRF) is an attack that tricks an authenticated user into executing unwanted actions on a trusted web application where they are currently logged in, without their knowledge or consent.

#### 3. Difference between Authentication and Authorization
* **Authentication**: Confirms identity—verifying *who* a user is (e.g., username/password, OTP, biometrics).
* **Authorization**: Determines privileges—verifying *what* an authenticated user is permitted to do or access (e.g., admin vs. standard user permissions).

#### 4. Why should secrets not be exposed in frontend applications?
All frontend assets (JavaScript bundles, HTML, local state) are downloaded and fully visible to the client browser. Any secret (private API keys, database passwords, signing keys) stored in frontend code can be easily inspected, extracted, and abused by bad actors.

#### 5. What is rate limiting?
Rate limiting is a technique used to restrict the number of requests a user, IP address, or API token can execute within a specific time window, defending against brute-force attacks, credential stuffing, and Denial-of-Service (DoS).

#### 6. Why is HTTPS important?
HTTPS encrypts communication between the client's browser and the web server via TLS/SSL. This guarantees data confidentiality, integrity, and authenticity, preventing eavesdropping and Man-in-the-Middle (MitM) attacks.

#### 7. What is SQL Injection?
SQL Injection (SQLi) occurs when untrusted user input is directly concatenated into database queries instead of using parameterized queries or prepared statements, enabling attackers to view, modify, or delete database records.

#### 8. What is the OWASP Top 10?
The OWASP Top 10 is a globally recognized awareness document outlining the ten most critical web application security risks (such as Broken Access Control, Cryptographic Failures, and Injection), serving as an industry benchmark for secure web development.

---

### Task 5 — Part C: Secure Development Practices

#### 1. API Keys
Store API keys exclusively on the backend in environment variables. Avoid exposing sensitive keys in frontend code; instead, implement backend proxy endpoints to securely interact with third-party APIs.

#### 2. User Authentication
Utilize established, battle-tested authentication libraries or services. Enforce strong password complexity, implement Multi-Factor Authentication (MFA), and protect endpoints against brute-force attempts with account lockouts or rate limits.

#### 3. Password Storage
Never store plaintext passwords. Use robust, salted cryptographic hashing algorithms designed for passwords, such as bcrypt, Argon2, or PBKDF2 with sufficient work factors.

#### 4. Form Validation
Apply client-side validation for improved user experience and responsive feedback, but **always** enforce strict server-side validation and schema sanitization, as client-side checks can be bypassed easily.

#### 5. File Uploads
Validate file types against an explicit whitelist using MIME type and file signature (magic numbers) verification rather than file extensions alone. Restrict file sizes, generate random filenames, and store uploaded files outside the web root or on isolated object storage (e.g., AWS S3).

#### 6. JWT / Session Handling
Store sensitive JWTs or session identifiers in `HttpOnly`, `Secure`, and `SameSite` cookies to safeguard them against XSS-based theft. Set appropriate token expiration times and establish token invalidation / revocation mechanisms upon logout.

---

