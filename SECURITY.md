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
* **Vulnerability**: Permissive Cross-Origin Resource Sharing (CORS) Policy.
* **Why it is dangerous**: Allows any external domain to make requests to your API, exposing resources to cross-origin abuse.
* **Fix**: Restrict CORS to explicitly trusted origins:
  ```javascript
  app.use(cors({ origin: 'https://your-app-domain.com' }));
  ```

### Part B: Security Awareness Questions

#### 1. What is XSS?
Cross-Site Scripting (XSS) is a vulnerability where an attacker injects malicious scripts into trusted websites, which are then executed by the victim's browser.

#### 2. What is CSRF?
Cross-Site Request Forgery (CSRF) is an attack that forces an authenticated user to execute unwanted actions on a web application in which they are currently authenticated.

#### 3. Difference between Authentication and Authorization
Authentication verifies identity (who you are), while authorization verifies permissions (what you are allowed to do).

#### 4. Why should secrets not be exposed in frontend applications?
Frontend code is visible to the client. Any secrets (like API keys or passwords) embedded in frontend code can be easily extracted by users, leading to unauthorized access or abuse of services.

#### 5. What is rate limiting?
Rate limiting is a technique used to control the amount of incoming traffic to a network or application to prevent abuse, such as DoS attacks or brute-forcing.

#### 6. Why is HTTPS important?
HTTPS ensures that data transmitted between a user's browser and the web server is encrypted, protecting sensitive information from interception and tampering.

#### 7. What is SQL Injection?
SQL Injection is a code injection technique where malicious SQL statements are inserted into entry fields for execution, allowing attackers to access, modify, or delete database data.

#### 8. What is the OWASP Top 10?
The OWASP Top 10 is a standard awareness document for developers and web application security that represents a broad consensus about the most critical security risks to web applications.

### Part C: Secure Development Practices

#### 1. API keys
Store API keys in server-side environment variables and never expose them in client-side code. Use proxy endpoints on your backend to handle requests requiring API keys.

#### 2. User authentication
Implement robust mechanisms using secure, proven libraries rather than rolling your own. Enforce strong password policies and use Multi-Factor Authentication (MFA) when possible.

#### 3. Password storage
Never store plaintext passwords. Hash passwords using strong, slow hashing algorithms with a unique salt per user (e.g., bcrypt, Argon2).

#### 4. Form validation
Always perform validation on the server side, even if client-side validation is present, to ensure that bypassed frontend checks do not compromise the system. Validate input types, lengths, and formats.

#### 5. File uploads
Validate file types (using magic numbers, not just extensions), enforce file size limits, scan for malware if possible, and store uploaded files outside the web root or on a separate domain.

#### 6. JWT/session handling
Store JWTs or session IDs in `HttpOnly` and `Secure` cookies to mitigate XSS attacks. Ensure tokens have reasonable expiration times and implement a secure token revocation strategy.