# SIH 2026 - Testing Plan

## 1. Login Test

### Test Case: Successful Login

**Purpose:**  
Check whether a registered user can successfully log in with valid credentials.

**Input:**
- Email: Registered user's email
- Password: Correct password

**Expected Result:**
- Login should be successful.
- Backend should return a JWT token.
- User should be authenticated.

**Status:** Not Tested


## 2. Invalid Login Test

### Test Case: Login with Incorrect Password

**Purpose:**  
Check whether the system rejects a login attempt when the password is incorrect.

**Input:**
- Email: Registered user's email
- Password: Incorrect password

**Expected Result:**
- Login should fail.
- Backend should NOT return a valid JWT token.
- User should not be authenticated.
- An appropriate error message should be returned.

**Status:** Not Tested


## 3. RBAC Test

### Test Case: Role-Based Access Control

**Purpose:**  
Check whether users can access only the features permitted for their role.

**Test 1: Citizen Access**
- Login as a CITIZEN.
- Try to access the citizen dashboard.
- Expected: Access allowed.

**Test 2: Citizen Access to Admin Dashboard**
- Login as a CITIZEN.
- Try to access the admin dashboard.
- Expected: Access denied.

**Test 3: Admin Access**
- Login as an ADMIN.
- Try to access the admin dashboard.
- Expected: Access allowed.

**Expected Result:**
- Users should only access resources allowed for their role.
- Unauthorized requests should be rejected.

**Status:** Not Tested


## 4. Consent Test

### Test Case: Department Data Access with Consent

**Purpose:**  
Check whether department data can be accessed only when the citizen has given consent.

**Test 1: Consent Granted**
- Login as a CITIZEN.
- Grant consent to access the required department data.
- Request the department data.
- Expected: Access allowed.

**Test 2: Consent Not Granted**
- Login as a CITIZEN.
- Do not grant consent.
- Request the department data.
- Expected: Access denied.

**Test 3: Consent Revoked**
- Login as a CITIZEN.
- Grant consent and then revoke it.
- Request the department data again.
- Expected: Access denied.

**Expected Result:**
- Data access should be allowed only when valid consent exists.
- Revoked or missing consent should block access.
- The access attempt should be recorded in the audit log.

**Status:** Not Tested


## 5. Application Workflow Test

### Test Case: Business Licence Application

**Purpose:**  
Check whether a business licence application follows the correct workflow.

**Steps:**
1. Login as a CITIZEN.
2. Create a new Business Licence application.
3. Submit the application.
4. Check the application status.
5. Verify the required department information.
6. Complete the verification process.
7. Check the final application status.

**Expected Result:**
- New application should start with `DRAFT`.
- After submission, status should become `SUBMITTED`.
- During verification, status should become `UNDER_VERIFICATION`.
- If all required checks pass, status should become `APPROVED`.
- If verification fails, status should become `REJECTED`.
- Every important action should be recorded in the audit log.

**Status:** Not Tested


## 6. API Integration Test

### Test Case: Department API Integration

**Purpose:**  
Check whether the Interoperability Hub can successfully communicate with the connected department services.

**Test 1: Identity Service**
- Send a request to the Identity API.
- Provide a valid citizen ID.
- Expected: Identity information is returned successfully.

**Test 2: Property Service**
- Send a request to the Property API.
- Provide a valid citizen/property reference.
- Expected: Property information is returned successfully.

**Test 3: Revenue Service**
- Send a request to the Revenue API.
- Provide a valid taxpayer ID.
- Expected: Revenue/tax information is returned successfully.

**Test 4: Invalid Department Request**
- Send a request using an invalid ID.
- Expected: The system should return an appropriate error.
- The failure should be recorded in the audit log.

**Expected Result:**
- The Interoperability Hub should communicate correctly with all connected services.
- Data should be transformed into the common format expected by the hub.
- Failed requests should be handled safely and logged.

**Status:** Not Tested


## 7. Audit Log Test

### Test Case: Audit Logging

**Purpose:**  
Check whether important system actions are recorded correctly in the audit log.

**Test 1: Successful Login**
- Login with valid credentials.
- Expected: A successful login event is recorded.

**Test 2: Failed Login**
- Attempt login with an incorrect password.
- Expected: A failed login event is recorded.

**Test 3: Data Access**
- Access department data after valid consent.
- Expected: The data access event is recorded.

**Test 4: Consent Change**
- Grant or revoke consent.
- Expected: The consent action is recorded.

**Test 5: Application Action**
- Create, submit, approve, or reject an application.
- Expected: The action is recorded.

**Expected Result:**
- Important security and application events should be recorded.
- Each log should contain relevant information such as the user, action, resource, status, and timestamp.
- Audit records should not be casually modified or deleted through normal application operations.

**Status:** Not Tested