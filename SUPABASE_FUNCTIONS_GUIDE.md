# Supabase Edge Function Integration Guide (`rapid-action`)

This guide explains how the **Right Parking** frontend communicates with the Supabase Edge Function to handle secure asset management (Cloudinary uploads/deletions) and database operations.

## 🏗 Architecture Overview

1.  **Frontend**: Collects user input and files.
2.  **Supabase Client**: Invokes the `rapid-action` Edge Function.
3.  **Edge Function**: Receives the request, verifies logic, performs Cloudinary operations using the **API Secret**, and updates the Supabase Database using the **Service Role Key**.
4.  **Security**: No sensitive Cloudinary keys are exposed to the browser.

---

## 📡 Communication Protocol

The frontend uses `supabase.functions.invoke('rapid-action', { body })`.

### 1. Simple Metadata (JSON)
For actions like "delete", a standard JSON object is sent.
- **Content-Type**: `application/json`

### 2. File Uploads (FormData)
For uploading files, the system uses `multipart/form-data`.
- **Content-Type**: Automatically set by the browser.
- **Fields**:
    - `action`: The string action (e.g., `"upload-file"`)
    - `payload`: A JSON string containing metadata.
    - `file`: The raw binary file.

---

## 🛠 Supported Actions & Payloads

### 1. `upload-file`
Uploads a file to Cloudinary and creates a record in the `project_files` table.

**Frontend Call:**
```javascript
import { uploadProjectFile } from 'lib/supabase';
await uploadProjectFile(projectId, 'photo', file);
```

**Payload (Inside FormData):**
```json
{
  "projectId": "UUID",
  "fileType": "photo | video | document",
  "userId": "UUID"
}
```

---

### 2. `delete-file`
Deletes a single asset from Cloudinary and its record from the database.

**Frontend Call:**
```javascript
import { deleteProjectFile } from 'lib/supabase';
await deleteProjectFile(fileId);
```

**JSON Body:**
```json
{
  "action": "delete-file",
  "payload": {
    "fileId": "UUID"
  }
}
```

---

### 3. `delete-project`
A cascading delete that removes all project files from Cloudinary and then deletes the project record from Supabase.

**Frontend Call:**
```javascript
import { deleteProject } from 'lib/supabase';
await deleteProject(projectId);
```

**JSON Body:**
```json
{
  "action": "delete-project",
  "payload": {
    "projectId": "UUID"
  }
}
```

---

### 4. `super-function`
Sends an enquiry email via Brevo when the contact form is submitted.

**Frontend Call:**
```javascript
const { data, error } = await supabase.functions.invoke('super-function', {
  body: {
    full_name,
    email,
    enquiry_type,
    project_details
  }
});
```

---

## 🚀 Deployment & Configuration

### Deployment Command
Because we use custom FormData parsing or specific external fetch logic, it's safer to deploy with the `--no-verify-jwt` flag if you aren't sending an auth token:
```bash
npx supabase functions deploy super-function --no-verify-jwt
```

### Required Secrets
The `super-function` requires the following secrets for Brevo:
```bash
npx supabase secrets set BREVO_API_KEY=your_brevo_key
npx supabase secrets set FROM_EMAIL=your_sender_email
npx supabase secrets set CONTACT_TO_EMAIL=your_admin_email
```

---

## 🧪 Manual Testing (Curl)

### Testing a Delete Action:
```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/rapid-action' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{"action": "delete-project", "payload": {"projectId": "123"}}'
```
