# Google Sheets Integration Setup Guide

**Purpose:** Store contact form submissions in Google Sheets (works without MongoDB!)

---

## 🎯 Overview

The contact form now saves submissions to **Google Sheets** automatically. This works even if MongoDB is not connected, ensuring no leads are lost.

**Benefits:**
- ✅ Works immediately (no database required)
- ✅ Easy to view submissions in Google Sheets
- ✅ Automatic backup
- ✅ Share access with your team
- ✅ Export to CSV/Excel anytime

---

## 📋 Step-by-Step Setup (10 minutes)

### Step 1: Create a Google Cloud Project

1. **Go to Google Cloud Console**
   ```
   https://console.cloud.google.com
   ```

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Name: `Stallion Fitness Forms`
   - Click "Create"

3. **Wait for project creation** (~30 seconds)

---

### Step 2: Enable Google Sheets API

1. **In your project, go to APIs & Services**
   ```
   Navigation menu → APIs & Services → Library
   ```

2. **Search for "Google Sheets API"**

3. **Click "Google Sheets API"** → Click **"Enable"**

4. **Wait for API to be enabled** (~10 seconds)

---

### Step 3: Create Service Account

1. **Go to IAM & Admin → Service Accounts**
   ```
   Navigation menu → IAM & Admin → Service Accounts
   ```

2. **Click "Create Service Account"**

3. **Fill in details:**
   - **Service account name:** `stallion-sheets-writer`
   - **Service account ID:** (auto-generated)
   - **Description:** `Service account for writing contact form data to Google Sheets`

4. **Click "Create and Continue"**

5. **Grant access (Optional):** Skip this step → Click "Continue"

6. **Grant users access (Optional):** Skip this step → Click "Done"

---

### Step 4: Create Service Account Key

1. **Click on the service account** you just created

2. **Go to "Keys" tab**

3. **Click "Add Key" → "Create New Key"**

4. **Select "JSON"** → Click "Create"

5. **Download the JSON file**
   - File will auto-download: `stallion-fitness-forms-xxxxx.json`
   - **Keep this file secure!** It contains credentials

---

### Step 5: Create Google Sheet

1. **Go to Google Sheets**
   ```
   https://sheets.google.com
   ```

2. **Create a blank spreadsheet**

3. **Rename it:** `Stallion Contact Submissions`

4. **Create a sheet named:** `Contact Submissions`
   - Right-click sheet tab → Rename → "Contact Submissions"

5. **Copy the Spreadsheet ID**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Copy the long ID between `/d/` and `/edit`
   - Example: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

6. **Share the spreadsheet with the service account**
   - Click "Share" button (top right)
   - Paste the service account email (from JSON file: `"client_email"`)
   - Example: `stallion-sheets-writer@stallion-fitness-forms.iam.gserviceaccount.com`
   - Give "Editor" permission
   - Uncheck "Notify people"
   - Click "Share"

---

### Step 6: Configure Backend

1. **Open the JSON key file** you downloaded

2. **Copy the ENTIRE JSON content**

3. **Minify the JSON** (remove line breaks)
   - Go to: https://codebeautify.org/jsonminifier
   - Paste JSON → Click "Minify" → Copy result

4. **Update `.env` file**
   
   Open `backend/.env` and add:
   
   ```env
   # Google Sheets Integration
   GOOGLE_SHEETS_SPREADSHEET_ID=YOUR_SPREADSHEET_ID_HERE
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"..."}
   ```

   **Example:**
   ```env
   GOOGLE_SHEETS_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"stallion-fitness-forms","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n","client_email":"stallion-sheets-writer@stallion-fitness-forms.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/stallion-sheets-writer%40stallion-fitness-forms.iam.gserviceaccount.com"}
   ```

5. **Important:** Make sure the JSON is on ONE line (no line breaks!)

---

### Step 7: Test the Integration

1. **Restart the backend**
   ```powershell
   cd backend
   npm start
   ```

2. **Look for confirmation message:**
   ```
   ✅ Google Sheets configured
   📊 Spreadsheet ID: 1BxiMVs0XRA5nFMd...
   ```

3. **Submit a test form** from frontend

4. **Check Google Sheets**
   - Refresh the spreadsheet
   - You should see a new row with the form data

---

## 📊 Google Sheet Structure

The sheet will have these columns:

| Timestamp | Name | Email | Phone | Preferred Branch | Message |
|-----------|------|-------|-------|-----------------|---------|
| 2026-08-16T10:30:00Z | John Doe | john@example.com | +91 9876543210 | Kukatpally | Interested in membership |

**Headers are created automatically** on first submission!

---

## 🔍 Verification Checklist

After setup, verify:

- [ ] Google Cloud project created
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Google Sheet created with name "Contact Submissions"
- [ ] Spreadsheet shared with service account email
- [ ] GOOGLE_SHEETS_SPREADSHEET_ID added to .env
- [ ] GOOGLE_SHEETS_CREDENTIALS added to .env (minified JSON)
- [ ] Backend restarted
- [ ] Test submission successful
- [ ] Data appears in Google Sheet

---

## 🚨 Troubleshooting

### Error: "403 Forbidden"

**Problem:** Service account doesn't have access to the spreadsheet

**Solution:**
1. Go to your Google Sheet
2. Click "Share"
3. Add the service account email (from JSON: `client_email`)
4. Give "Editor" permission
5. Click "Share"

---

### Error: "404 Not Found"

**Problem:** Spreadsheet ID is incorrect or sheet doesn't exist

**Solution:**
1. Verify the spreadsheet ID in URL
2. Make sure you copied the ID correctly
3. Check that the sheet is named "Contact Submissions" (exact match)

---

### Error: "400 Invalid Request"

**Problem:** JSON credentials are malformed

**Solution:**
1. Make sure JSON is on ONE line (no line breaks)
2. Make sure all quotes are properly escaped
3. Try minifying the JSON again
4. Make sure there are no extra characters

---

### No Data Appearing

**Check:**
1. Backend console for error messages
2. Sheet name is exactly "Contact Submissions"
3. Service account has "Editor" access
4. Spreadsheet ID is correct
5. Credentials JSON is valid

---

## 🔐 Security Best Practices

### DO:
- ✅ Keep the JSON key file secure
- ✅ Add `.env` to `.gitignore`
- ✅ Use environment variables (never commit credentials)
- ✅ Limit service account permissions to just Sheets API
- ✅ Share spreadsheet only with necessary people

### DON'T:
- ❌ Commit the JSON key file to Git
- ❌ Share the JSON key publicly
- ❌ Use a personal Google account for the service account
- ❌ Give unnecessary permissions to the service account
- ❌ Share the spreadsheet publicly

---

## 📝 Backend Code Changes

### New Files Created:

1. **`src/services/googleSheets.ts`**
   - Google Sheets API integration
   - Save contact form data
   - Initialize headers automatically

2. **Updated: `src/controllers/contactController.ts`**
   - Now saves to Google Sheets AND MongoDB
   - Works even if MongoDB is down
   - Returns success if either storage method works

### How It Works:

```
Contact Form Submitted
    ↓
Backend receives data
    ↓
Try to save to Google Sheets ✅ (Always works if configured)
    ↓
Try to save to MongoDB ⏳ (Works if MongoDB connected)
    ↓
Return success if EITHER saves successfully
```

---

## 🎯 Testing the Integration

### Test 1: Submit Form

1. Go to http://localhost:3000
2. Scroll to contact form
3. Fill in all fields:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 9876543210
   - Branch: Kukatpally
   - Message: This is a test submission
4. Click "Submit"
5. Should see success message

### Test 2: Check Google Sheets

1. Open your Google Sheet
2. Refresh the page
3. You should see a new row with:
   - Timestamp (ISO format)
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 9876543210
   - Branch: Kukatpally
   - Message: This is a test submission

### Test 3: Multiple Submissions

1. Submit the form 3 times with different data
2. All 3 should appear in Google Sheets
3. Each with correct timestamp
4. In chronological order

---

## 💡 Tips & Best Practices

### Organization
- Create one spreadsheet per environment (dev, staging, prod)
- Use separate sheets for different form types
- Archive old data regularly

### Monitoring
- Check the sheet daily for new submissions
- Set up Google Sheets notifications for new rows
- Export to CSV for backup

### Team Access
- Share sheet with your team members
- Give "Viewer" access to most team members
- Only admins need "Editor" access

### Data Management
- Don't delete the headers row
- Don't rename the sheet (or update code if you do)
- Archive data to a new sheet after 6 months

---

## 🔄 Alternative: Using Google Forms

If you prefer, you can also integrate with Google Forms:

1. Create a Google Form
2. Link it to a Google Sheet
3. Use the form URL instead of your custom form
4. Data automatically saves to Google Sheets

**Pros:**
- No backend code needed
- Google handles everything
- Built-in spam protection

**Cons:**
- Less control over design
- Can't integrate with your website design
- Redirects users away from your site

---

## 📊 Example Response

When a form is submitted successfully, the backend returns:

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "branch": "Kukatpally",
    "message": "Interested in membership",
    "timestamp": "2026-08-16T10:30:00.000Z"
  },
  "message": "Message sent successfully",
  "stored": {
    "googleSheets": true,
    "database": false
  }
}
```

**Note:** `stored.database` will be `true` once MongoDB is connected.

---

## 🚀 Going Live (Production)

### Before Production:

1. **Create a production Google Sheet**
   - Don't use the same sheet for dev and production

2. **Update environment variables**
   - Use production spreadsheet ID
   - Use same service account (or create a new one)

3. **Test thoroughly**
   - Submit test forms
   - Verify data appears correctly
   - Check timestamps are correct

4. **Set up monitoring**
   - Check sheet daily
   - Set up alerts for new submissions
   - Have a backup plan

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all steps were completed
3. Check backend console for error messages
4. Verify Google Sheet permissions
5. Test the credentials manually

---

## ✅ Summary

**What you need:**
1. Google Cloud Project with Sheets API enabled
2. Service Account with JSON key
3. Google Spreadsheet shared with service account
4. Environment variables configured

**What you get:**
- ✅ Automatic contact form submission storage
- ✅ Works without MongoDB
- ✅ Easy to view and manage leads
- ✅ Team collaboration enabled
- ✅ Export capabilities

**Time to set up:** ~10 minutes  
**Cost:** FREE (Google Cloud free tier)  
**Reliability:** 99.9% uptime

---

**Setup Status:** ⏳ Pending Configuration  
**Once configured:** ✅ Will work immediately  
**Backend changes:** ✅ Already deployed
