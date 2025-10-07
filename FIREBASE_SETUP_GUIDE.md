# Firebase Setup Guide - K&Co Real Estate

## ✅ What's Been Done

All forms have been integrated with Firebase Firestore to store submissions. WhatsApp integration has been removed.

### Changes Made:

1. ✅ Created `firebase-config.js` - Firebase configuration file
2. ✅ Updated `listing-script.js` - Homepage contact form now saves to Firebase
3. ✅ Updated `script.js` - Property detail page forms (EOI + Popup) now save to Firebase
4. ✅ Added Firebase SDK to all HTML files (index.html, property-jacob-co.html, property-experion-151.html)
5. ✅ Removed all WhatsApp integration code

## 🔥 Firebase Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `kco-real-estate` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Set Up Firestore Database

1. In Firebase Console, click **"Firestore Database"** in left sidebar
2. Click **"Create Database"**
3. Select **"Start in production mode"** (we'll configure rules next)
4. Choose your preferred region (e.g., `asia-south1` for India)
5. Click **"Enable"**

### Step 3: Configure Firestore Rules

1. In Firestore Database, go to **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public writes to enquiries collection
    match /enquiries/{document=**} {
      allow read: if false; // Nobody can read
      allow write: if true; // Anyone can write
    }
    
    // Allow public writes to EOI submissions collection
    match /eoi-submissions/{document=**} {
      allow read: if false; // Nobody can read
      allow write: if true; // Anyone can write
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project Settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** `</>` to add a web app
5. Enter app nickname: `K&Co Website`
6. **Don't** check "Also set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the `firebaseConfig` object shown

### Step 5: Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:xxxxxxxxxxxx"
};
```

3. Save the file

## 📊 Firestore Collections Structure

### Collection: `enquiries`
Stores general enquiries from the homepage contact form.

**Fields:**
```javascript
{
  enquiryNumber: "ENQ-12345678",      // Auto-generated
  fullName: "John Doe",               // User input
  email: "john@example.com",          // User input
  phone: "+919876543210",             // User input
  interest: "jacob-co",               // User selection
  budget: "10-15cr",                  // User selection
  message: "Interested in 4 BHK",    // User input (optional)
  source: "Portfolio Website - Homepage", // Auto
  status: "new",                      // Auto (new/contacted/qualified/closed)
  submittedAt: "2025-10-05T10:30:00Z", // Auto
  timestamp: Firestore Timestamp      // Auto
}
```

### Collection: `eoi-submissions`
Stores Expression of Interest submissions from property detail pages.

**Fields:**
```javascript
{
  eoiNumber: "EOI-12345678",          // Auto-generated
  fullName: "Jane Smith",             // User input
  email: "jane@example.com",          // User input
  phone: "+919876543210",             // User input
  tower: "3bhk",                      // User selection
  budget: "7-10cr",                   // User selection (optional)
  message: "Want site visit",         // User input (optional)
  nationality: "Indian",              // User selection (popup only)
  interest: "3 BHK - 2,500 sq.ft",   // User selection (popup only)
  property: "Jacob & Co. x M3M",      // Auto-detected
  source: "Main EOI Form",            // Auto (Main EOI Form/Priority Access Popup)
  status: "new",                      // Auto
  submittedAt: "2025-10-05T10:30:00Z", // Auto
  timestamp: Firestore Timestamp      // Auto
}
```

## 🔍 Viewing Submitted Data

### In Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **"Firestore Database"** in left sidebar
4. You'll see two collections:
   - `enquiries` - Homepage contact form submissions
   - `eoi-submissions` - Property detail page EOI submissions
5. Click on a collection to view all documents
6. Click on a document ID to see full details

### Data Organization:
```
Firestore Database
├── enquiries/
│   ├── [auto-id-1]
│   │   ├── enquiryNumber: "ENQ-12345678"
│   │   ├── fullName: "John Doe"
│   │   ├── email: "john@example.com"
│   │   ├── phone: "+919876543210"
│   │   ├── interest: "jacob-co"
│   │   ├── budget: "10-15cr"
│   │   ├── message: "..."
│   │   ├── source: "Portfolio Website - Homepage"
│   │   ├── status: "new"
│   │   ├── submittedAt: "2025-10-05T10:30:00Z"
│   │   └── timestamp: Firestore Timestamp
│   └── [auto-id-2]
│       └── ...
│
└── eoi-submissions/
    ├── [auto-id-1]
    │   ├── eoiNumber: "EOI-12345678"
    │   ├── fullName: "Jane Smith"
    │   ├── email: "jane@example.com"
    │   ├── phone: "+919876543210"
    │   ├── property: "Jacob & Co. x M3M"
    │   ├── tower: "3bhk"
    │   ├── source: "Main EOI Form"
    │   ├── status: "new"
    │   ├── submittedAt: "2025-10-05T10:30:00Z"
    │   └── timestamp: Firestore Timestamp
    └── [auto-id-2]
        └── ...
```

## 🧪 Testing the Integration

### Step 1: Test Homepage Contact Form

1. Open `index.html` in your browser
2. Scroll to the contact form
3. Fill in all required fields:
   - Full Name
   - Email Address
   - Phone Number
   - Interest (select from dropdown)
   - Budget Range
   - Check terms and conditions
4. Click **"SEND ENQUIRY"**
5. You should see a success notification with an enquiry number
6. Check Firebase Console → Firestore Database → `enquiries` collection
7. You should see a new document with your submission

### Step 2: Test Property Detail Page (Main Form)

1. Open `property-jacob-co.html` or `property-experion-151.html`
2. Scroll to the contact form
3. Fill in all required fields:
   - Full Name
   - Email Address
   - Phone Number
   - Residence Type
   - Budget Range
   - Check terms and conditions
4. Click **"SUBMIT ENQUIRY"**
5. You should see a success notification with an EOI number
6. Check Firebase Console → Firestore Database → `eoi-submissions` collection
7. You should see a new document with your submission

### Step 3: Test Priority Access Popup

1. Open any property detail page
2. Wait 3 seconds for the popup to appear (or trigger manually)
3. Fill in all fields:
   - Full Name
   - Email
   - Phone
   - Nationality
   - Property Interest
4. Click **"GET PRIORITY ACCESS"**
5. You should see an alert with EOI number
6. Check Firebase Console → Firestore Database → `eoi-submissions` collection
7. You should see a new document with source: "Priority Access Popup"

## 📱 Form Locations

### Homepage (`index.html`)
- **Contact Form** → Saves to `enquiries` collection
- Fields: Name, Email, Phone, Interest, Budget, Message

### Jacob & Co. Page (`property-jacob-co.html`)
- **Main Contact Form** → Saves to `eoi-submissions` collection
- **Priority Popup** → Saves to `eoi-submissions` collection

### Experion 151 Page (`property-experion-151.html`)
- **Main Contact Form** → Saves to `eoi-submissions` collection
- **Priority Popup** → Saves to `eoi-submissions` collection

## 🔐 Security Notes

**Current Setup:**
- ✅ Public write access to specific collections only
- ✅ No read access (data can only be viewed by admin in Firebase Console)
- ✅ No authentication required
- ✅ Data is stored securely in Firestore

**Recommended for Production:**
- Add rate limiting (Firebase App Check)
- Add data validation rules
- Set up Cloud Functions for email notifications
- Add reCAPTCHA for spam prevention

## 📧 Optional: Email Notifications

To receive email notifications when forms are submitted:

### Option 1: Firebase Cloud Functions (Recommended)

1. Set up Firebase Cloud Functions
2. Create a function that triggers on new document creation
3. Use SendGrid or Nodemailer to send emails
4. See Firebase documentation for setup

### Option 2: Third-party Services

- Use Zapier to connect Firestore to Gmail
- Use Make.com (formerly Integromat)
- Use n8n for automation

## ❌ What Was Removed

1. ✅ WhatsApp URL generation and opening
2. ✅ Email mailto links
3. ✅ All WhatsApp-related code
4. ✅ Debug console logs for WhatsApp

## ✅ What Was Added

1. ✅ Firebase SDK scripts in all HTML files
2. ✅ `firebase-config.js` configuration file
3. ✅ `saveToFirestore()` function for data storage
4. ✅ `generateEnquiryNumber()` function for unique IDs
5. ✅ Proper error handling with user notifications
6. ✅ Form reset after successful submission
7. ✅ Loading states during submission

## 🚀 Deployment

### Before Going Live:

1. ✅ Update `firebase-config.js` with your actual Firebase credentials
2. ✅ Test all forms thoroughly
3. ✅ Verify data is being saved to Firestore
4. ✅ Set up Firestore rules correctly
5. ✅ Consider adding Firebase App Check for security
6. ✅ Set up email notifications (optional)

### Files Modified:
- `firebase-config.js` (NEW)
- `listing-script.js` (UPDATED)
- `script.js` (UPDATED)
- `index.html` (UPDATED)
- `property-jacob-co.html` (UPDATED)
- `property-experion-151.html` (UPDATED)

## 📞 Support

If you need help:
1. Check Firebase Console for errors
2. Check browser console (F12) for JavaScript errors
3. Verify Firestore rules are published
4. Ensure Firebase config is correct
5. Test with a simple submission first

---

**Status**: ✅ Integration Complete
**Date**: October 5, 2025
**Ready for**: Configuration & Testing

## Quick Start Checklist

- [ ] Create Firebase project
- [ ] Enable Firestore Database
- [ ] Configure Firestore rules
- [ ] Get Firebase configuration
- [ ] Update `firebase-config.js` with your credentials
- [ ] Deploy website
- [ ] Test homepage contact form
- [ ] Test property detail page forms
- [ ] Test priority access popup
- [ ] Verify data in Firebase Console
- [ ] Set up email notifications (optional)

**After completing the checklist, your forms will be fully functional!** 🎉
