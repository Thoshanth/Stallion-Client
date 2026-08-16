# MongoDB Connection Troubleshooting Guide

**Last Updated:** August 16, 2026  
**Current Status:** ❌ Still failing with TLS/SSL error

---

## 🔴 Current Error

```
ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR
tlsv1 alert internal error
```

**This error typically indicates:**
1. **Authentication failure** (wrong username/password)
2. **IP not whitelisted** in MongoDB Atlas
3. **Database user doesn't have proper permissions**
4. **Cluster is paused or unavailable**

---

## 📋 Connection Details

**Connection String Tried:**
```
mongodb+srv://mthoshanthreddy_db_user:Vinnu%402007@cluster0.fznt0cd.mongodb.net/?appName=Cluster0
```

**Decoded Password:** `Vinnu@2007`  
**Username:** `mthoshanthreddy_db_user`  
**Cluster:** `cluster0.fznt0cd.mongodb.net`  
**Your IP:** `103.123.136.146`

---

## ✅ Checklist for MongoDB Atlas

### 1. Verify IP Whitelist

Go to: **MongoDB Atlas → Security → Network Access**

**Check if one of these is present:**
- [ ] Your current IP: `103.123.136.146`
- [ ] "Allow Access from Anywhere": `0.0.0.0/0`

**If NOT present, add one:**
```
Click "Add IP Address"
→ Enter: 103.123.136.146
→ Or click: "Allow Access from Anywhere" (for testing)
→ Click: "Confirm"
→ Wait 1-2 minutes
```

---

### 2. Verify Database User Credentials

Go to: **MongoDB Atlas → Security → Database Access**

**Check the following:**

#### User exists:
- [ ] Username: `mthoshanthreddy_db_user` exists

#### Password is correct:
- [ ] Password is: `Vinnu@2007`
- [ ] If unsure, click "Edit" → "Edit Password" → Set new password

#### User has permissions:
- [ ] Role: `readWrite` or `atlasAdmin` (at minimum)
- [ ] Database: Should have access to your database

**If password needs to be reset:**
1. Click "Edit" next to the user
2. Click "Edit Password"
3. Set a NEW simple password (e.g., `TestPass123`)
4. Click "Update User"
5. Update `.env` file with new password
6. Restart backend

---

### 3. Verify Cluster Status

Go to: **MongoDB Atlas → Data Services → Database**

**Check:**
- [ ] Cluster shows "Active" (not "Paused")
- [ ] Cluster has green indicator
- [ ] No maintenance warnings

**If cluster is paused:**
```
Click "Resume" button
Wait for cluster to become active (~5 minutes)
```

---

### 4. Test Connection with MongoDB Compass

**Download MongoDB Compass:**
https://www.mongodb.com/try/download/compass

**Test connection:**
1. Open MongoDB Compass
2. Paste this connection string:
   ```
   mongodb+srv://mthoshanthreddy_db_user:Vinnu@2007@cluster0.fznt0cd.mongodb.net/?appName=Cluster0
   ```
3. Click "Connect"

**Results:**
- ✅ **If it connects:** Problem is with Node.js/application configuration
- ❌ **If it fails:** Problem is with MongoDB Atlas settings

---

## 🔧 Alternative Solution: Create New Database User

Sometimes the easiest fix is to create a fresh database user:

### Step 1: Create New User

Go to: **MongoDB Atlas → Security → Database Access**

1. Click "Add New Database User"
2. Choose "Password" authentication
3. Set:
   - **Username:** `stallion_user`
   - **Password:** `SimplePass123` (use a simple password first)
   - **Database User Privileges:** `Atlas admin` or `Read and write to any database`
4. Click "Add User"

### Step 2: Update .env File

```env
MONGODB_URI=mongodb+srv://stallion_user:SimplePass123@cluster0.fznt0cd.mongodb.net/?appName=Cluster0
```

### Step 3: Restart Backend

```powershell
# Stop current process
# Then:
cd backend
npm start
```

---

## 🐛 Current Error Analysis

### Error Pattern

```
Attempt 1: SSL TLS error
Attempt 2: SSL TLS error  
Attempt 3: SSL TLS error
Attempt 4: SSL TLS error
Attempt 5: (pending)
```

### What This Means

The error "tlsv1 alert internal error" during TLS handshake typically indicates:

1. **Most Common:** Wrong password or username
2. **Second Most Common:** IP not whitelisted (even though it says it could connect, TLS fails during auth)
3. **Less Common:** Database user doesn't exist or lacks permissions

---

## 🔍 Debugging Steps

### Option 1: Verify Current Settings in Atlas

1. Login to MongoDB Atlas: https://cloud.mongodb.com
2. Check **Database Access**:
   - Is `mthoshanthreddy_db_user` listed?
   - Click "Edit" to see what databases it can access
   - Check the role/permissions
3. Check **Network Access**:
   - Is your IP whitelisted?
   - Or is 0.0.0.0/0 (anywhere) allowed?
4. Check **Database → Cluster**:
   - Is it active (not paused)?

### Option 2: Get Connection String from Atlas

1. Go to your Cluster
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string shown
5. Replace `<db_password>` with your actual password
6. Compare with what's in `.env`

### Option 3: Create Brand New Test User

Follow the "Alternative Solution" above to create a fresh user with a simple password.

---

## 📝 Common Password Encoding Issues

If your password has special characters, they must be URL-encoded:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `?` | `%3F` |
| `#` | `%23` |
| `[` | `%5B` |
| `]` | `%5D` |
| `!` | `%21` |
| `$` | `%24` |
| `&` | `%26` |
| `'` | `%27` |
| `(` | `%28` |
| `)` | `%29` |
| `*` | `%2A` |
| `+` | `%2B` |
| `,` | `%2C` |
| `;` | `%3B` |
| `=` | `%3D` |

**Your current password:** `Vinnu@2007`  
**Encoded:** `Vinnu%402007` ✅ (Already correct)

---

## 🎯 Recommended Actions (In Order)

### Priority 1: Verify IP Whitelist
```
Atlas → Security → Network Access
→ Add IP: 103.123.136.146
→ Wait 2 minutes
→ Restart backend
```

### Priority 2: Verify/Reset Password
```
Atlas → Security → Database Access
→ Edit user: mthoshanthreddy_db_user
→ Edit Password → Set to: TestPass123
→ Update .env: mongodb+srv://mthoshanthreddy_db_user:TestPass123@cluster0...
→ Restart backend
```

### Priority 3: Create New User
```
Atlas → Security → Database Access
→ Add New Database User
→ Username: stallion_admin
→ Password: Admin123456
→ Role: Atlas admin
→ Update .env with new credentials
→ Restart backend
```

### Priority 4: Test with MongoDB Compass
```
Download Compass
→ Test connection
→ If works: Problem is in application
→ If fails: Problem is in Atlas settings
```

---

## 📊 What We Know

| Item | Status | Details |
|------|--------|---------|
| **Node.js Version** | ✅ v24.13.0 | Supported |
| **MongoDB Driver** | ✅ Mongoose 8.0.3 | Latest |
| **Connection String Format** | ✅ Valid | Correct format |
| **Password Encoding** | ✅ Correct | @ encoded as %40 |
| **DNS Resolution** | ✅ Working | Can resolve cluster hostname |
| **TLS Connection** | ❌ Failing | Auth failure during TLS handshake |
| **Backend Code** | ✅ Correct | No code errors |

---

## 💡 Quick Test Commands

### Test DNS Resolution
```powershell
nslookup cluster0.fznt0cd.mongodb.net
```

### Test Network Connectivity
```powershell
Test-NetConnection -ComputerName cluster0.fznt0cd.mongodb.net -Port 27017
```

### Test with curl (if available)
```powershell
curl -v telnet://cluster0.fznt0cd.mongodb.net:27017
```

---

## 🆘 If Nothing Works

### Option A: Use Local MongoDB

For development, you can temporarily use a local MongoDB instance:

```powershell
# Install MongoDB locally
# Then in .env:
MONGODB_URI=mongodb://localhost:27017/stallion-fitness
```

### Option B: Create New MongoDB Atlas Cluster

Sometimes starting fresh is easier:

1. Create a new free cluster in MongoDB Atlas
2. Create a new database user with simple password
3. Whitelist 0.0.0.0/0 (for testing)
4. Get new connection string
5. Update `.env`

---

## 📧 MongoDB Atlas Support

If you've tried everything and it still doesn't work:

**Contact MongoDB Support:**
- In Atlas: Click "Support" → "Contact Support"
- Provide: Cluster name, username, error message
- They can see server-side logs

---

## 🔄 Next Steps

**What you should do now:**

1. **Go to MongoDB Atlas** (https://cloud.mongodb.com)
2. **Check Network Access** - Whitelist your IP
3. **Check Database Access** - Verify user exists and password
4. **Check Cluster Status** - Ensure it's active
5. **Try the connection** - Restart backend after confirming all settings
6. **If still fails** - Create new user with simple password
7. **If still fails** - Test with MongoDB Compass
8. **If Compass works** - The issue is in the application
9. **If Compass fails** - The issue is in MongoDB Atlas settings

---

**The most likely issue is either:**
- ❌ IP not whitelisted in Network Access
- ❌ Wrong password
- ❌ User doesn't exist or lacks permissions

**Check these three things first!**
