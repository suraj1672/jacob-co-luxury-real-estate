# Google Analytics 4 Integration Guide

## ✅ What's Implemented

Google Analytics 4 (GA4) has been fully integrated across your website with comprehensive form tracking and conversion measurement.

**Measurement ID**: `G-C595NDQMDS`

## 📊 What's Being Tracked

### 1. **Page Views** (Automatic)
Every page visit is automatically tracked with:
- Page URL
- Page title
- Referrer (where visitor came from)
- User location
- Device type
- Browser type

**Pages Tracked:**
- Homepage (K&Co Properties - Homepage)
- Jacob & Co. x M3M Property Page
- Experion 151 Property Page

### 2. **Form Views** (Custom Event)
Tracked when forms are loaded and displayed to users.

**Event Name:** `form_view`

**Tracked Forms:**
- Homepage Contact Form
- Jacob & Co. EOI Form
- Experion 151 EOI Form

**Parameters:**
```javascript
{
  form_name: "homepage_contact_form",
  form_location: "homepage",
  property_name: "Property Name",
  event_category: "engagement",
  event_label: "Form Viewed"
}
```

### 3. **Form Submissions** (Custom Event)
Tracked when forms are successfully submitted.

**Event Name:** `form_submission`

**Tracked Submissions:**
- Homepage Contact Form
- Property Detail Page EOI Forms
- Priority Access Popup Forms

**Parameters:**
```javascript
{
  form_name: "form_identifier",
  form_location: "page_location",
  property_name: "Property Name",
  enquiry_number: "ENQ-12345678",
  property_interest: "jacob-co",
  budget_range: "10-15cr",
  tower_type: "3bhk",
  event_category: "conversion",
  event_label: "Form Submitted",
  value: 1
}
```

### 4. **Conversions** (Custom Event)
Tracked as high-value conversion events for lead generation.

**Event Name:** `conversion`

**Parameters:**
```javascript
{
  send_to: "G-C595NDQMDS",
  event_category: "lead_generation",
  event_label: "Lead Generated - Property Name"
}
```

## 📈 Key Metrics You Can Measure

### 1. **Form Conversion Rate**
**Formula**: (Form Submissions ÷ Form Views) × 100

**How to View in GA4:**
1. Go to Google Analytics Dashboard
2. Navigate to: **Reports** → **Engagement** → **Events**
3. Look for events:
   - `form_view` (total form impressions)
   - `form_submission` (total submissions)
4. Calculate: (form_submission count ÷ form_view count) × 100

**Example:**
- Form Views: 1,000
- Form Submissions: 50
- Conversion Rate: 5%

### 2. **Lead Source Tracking**
Automatically tracked by GA4 through UTM parameters and default source tracking.

**Where to View:**
1. Go to: **Reports** → **Acquisition** → **Traffic Acquisition**
2. See traffic sources:
   - **Organic Search** (Google, Bing, etc.)
   - **Paid Search** (Google Ads)
   - **Social** (Facebook, Instagram, LinkedIn)
   - **Direct** (typing URL directly)
   - **Referral** (from other websites)
   - **Email** (from email campaigns)

**What You'll See:**
- Which source brings most visitors
- Which source has best conversion rate
- Cost per lead (if using paid ads)

### 3. **Property-Specific Performance**
Track which property gets more interest.

**How to View:**
1. Go to: **Reports** → **Engagement** → **Events**
2. Click on `form_submission` event
3. Add secondary dimension: `property_name`
4. See which property generates more leads

### 4. **Form Performance Comparison**
Compare different forms' performance.

**Metrics Available:**
- Homepage Contact Form vs Property EOI Forms
- Main Form vs Priority Popup
- Jacob & Co. vs Experion 151

### 5. **User Journey Analysis**
Track how users navigate before submitting forms.

**What You Can See:**
1. **Path Analysis**: Pages visited before form submission
2. **Time to Convert**: How long before they submit
3. **Bounce Rate**: % leaving without engaging
4. **Session Duration**: Time spent on site

## 🎯 Custom Reports to Create

### Report 1: Form Performance Dashboard

**Metrics to Include:**
- Total Form Views
- Total Form Submissions
- Conversion Rate
- Form Views by Page
- Submissions by Property

**How to Create:**
1. Go to: **Explore** → **Blank**
2. Add dimensions: `event_name`, `form_name`, `property_name`
3. Add metrics: `event_count`
4. Apply filters: `event_name = form_view OR form_submission`

### Report 2: Lead Source ROI

**Metrics to Include:**
- Users by Source
- Conversions by Source
- Conversion Rate by Source
- Average Engagement Time by Source

**How to Create:**
1. Go to: **Explore** → **Free Form**
2. Add dimension: `session_source`
3. Add metrics: `conversions`, `active_users`
4. Create calculated metric: Conversion Rate

### Report 3: Property Comparison

**Metrics to Include:**
- Page Views by Property
- Form Views by Property
- Submissions by Property
- Conversion Rate by Property

## 📊 Reading Your Analytics Data

### Daily Check (5 minutes)
1. Open Google Analytics
2. Go to: **Reports** → **Realtime**
3. Check:
   - Current active users
   - Recent form submissions
   - Traffic sources

### Weekly Review (30 minutes)
1. **Traffic Summary**
   - Total users
   - New vs returning users
   - Top traffic sources

2. **Form Performance**
   - Form views vs submissions
   - Conversion rate trend
   - Best performing forms

3. **Property Performance**
   - Jacob & Co. leads
   - Experion 151 leads
   - Property page engagement

### Monthly Analysis (1 hour)
1. **Traffic Trends**
   - Month-over-month growth
   - Seasonal patterns
   - Source performance

2. **Conversion Optimization**
   - Which pages convert best
   - Where users drop off
   - Form improvements needed

3. **ROI Calculation**
   - Cost per lead by source
   - Quality of leads by source
   - Best performing campaigns

## 🔍 Key Reports Locations in GA4

### 1. **Traffic Sources**
Path: **Reports** → **Acquisition** → **Traffic Acquisition**

**What You'll See:**
- Organic Search: 45%
- Direct: 25%
- Paid Search: 15%
- Social: 10%
- Referral: 5%

### 2. **Form Events**
Path: **Reports** → **Engagement** → **Events**

**Events to Monitor:**
- `page_view` - Page visits
- `form_view` - Form impressions
- `form_submission` - Form submissions
- `conversion` - Lead conversions

### 3. **User Demographics**
Path: **Reports** → **User** → **Demographics**

**What You'll See:**
- Age groups
- Gender
- Interests
- Location (cities, countries)

### 4. **Device Usage**
Path: **Reports** → **Tech** → **Overview**

**What You'll See:**
- Desktop vs Mobile vs Tablet
- Browser usage
- Screen resolutions
- Operating systems

## 🎯 Setting Up Conversion Goals

### Step 1: Mark Events as Conversions
1. Go to: **Configure** → **Events**
2. Find event: `conversion`
3. Toggle **"Mark as conversion"** ON

### Step 2: Create Conversion Funnel
1. Go to: **Explore** → **Funnel Exploration**
2. Add steps:
   - Step 1: Page View (any page)
   - Step 2: Form View (`form_view`)
   - Step 3: Form Submission (`form_submission`)
3. Analyze drop-off at each step

## 📧 Setting Up Alerts

### Important Alerts to Create:

1. **Daily Form Submissions**
   - Email yourself daily form submission count
   - Path: **Configure** → **Custom Insights**

2. **Conversion Rate Drop**
   - Alert if conversion rate drops below threshold
   - Path: **Configure** → **Custom Insights**

3. **Traffic Spike**
   - Alert on unusual traffic increase
   - Helpful for detecting viral content or issues

## 🔗 UTM Parameters for Campaign Tracking

### What are UTM Parameters?
Special tags added to URLs to track marketing campaigns.

### Format:
```
https://yourwebsite.com/?utm_source=facebook&utm_medium=social&utm_campaign=experion_launch
```

### Parameters:
- **utm_source**: Where traffic comes from (google, facebook, newsletter)
- **utm_medium**: Type of traffic (cpc, social, email, banner)
- **utm_campaign**: Campaign name (summer_sale, experion_launch)
- **utm_content**: Specific ad/link (ad1, banner2)
- **utm_term**: Keywords (luxury-apartments, 3bhk-noida)

### Example URLs:

**Google Ads:**
```
https://yoursite.com/property-experion-151.html?utm_source=google&utm_medium=cpc&utm_campaign=experion_prelaunch
```

**Facebook Ads:**
```
https://yoursite.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=experion_benefits
```

**Email Newsletter:**
```
https://yoursite.com/?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_update
```

**Instagram Story:**
```
https://yoursite.com/?utm_source=instagram&utm_medium=story&utm_campaign=property_showcase
```

### UTM Builder Tool:
Use Google's Campaign URL Builder:
https://ga-dev-tools.google/campaign-url-builder/

## 📊 Sample Questions You Can Answer

### Traffic Questions:
- ✅ How many people visit my site daily?
- ✅ Which page is most popular?
- ✅ Where do my visitors come from?
- ✅ What devices do they use?
- ✅ Which cities have most visitors?

### Form Questions:
- ✅ How many people see my forms?
- ✅ What's my form conversion rate?
- ✅ Which form converts best?
- ✅ Which property gets more inquiries?
- ✅ What budget range is most common?

### Marketing Questions:
- ✅ Which marketing channel works best?
- ✅ What's my cost per lead by source?
- ✅ Which campaign generates most leads?
- ✅ Do Facebook ads or Google ads perform better?
- ✅ What's my ROI by traffic source?

### User Behavior Questions:
- ✅ How long do users spend on site?
- ✅ Which pages do they visit before submitting?
- ✅ Where do users drop off?
- ✅ Do mobile users convert differently?
- ✅ What time of day has most conversions?

## 🎓 Learning Resources

### Google Analytics Academy:
- **GA4 Basics**: https://analytics.google.com/analytics/academy/
- **Advanced Measurement**: Free courses on GA Academy

### YouTube Channels:
- **Google Analytics**: Official channel
- **Measure School**: GA4 tutorials
- **Analytics Mania**: Advanced tracking

### Documentation:
- **GA4 Help Center**: https://support.google.com/analytics
- **Event Reference**: List of all standard events

## ⚡ Quick Start Checklist

- [x] ✅ Google Analytics installed on all pages
- [x] ✅ Form view tracking enabled
- [x] ✅ Form submission tracking enabled
- [x] ✅ Conversion events configured
- [x] ✅ Property-specific tracking added
- [ ] ⏳ Create custom dashboard (do this in GA4)
- [ ] ⏳ Set up email reports (do this in GA4)
- [ ] ⏳ Mark conversions in GA4 settings
- [ ] ⏳ Create UTM parameters for campaigns
- [ ] ⏳ Set up conversion funnels

## 🔧 Troubleshooting

### Issue: No data showing
**Solution:**
1. Check if GA4 script is loading (F12 → Network tab)
2. Wait 24 hours for data to appear
3. Use Realtime report to see immediate data

### Issue: Events not tracking
**Solution:**
1. Open browser console (F12)
2. Submit a form
3. Check for errors
4. Verify `gtag` function exists

### Issue: Wrong conversion numbers
**Solution:**
1. Check if ad blockers are enabled (affects tracking)
2. Verify Firebase is saving data correctly
3. Cross-reference with Firebase submissions

## 📞 Support

**Google Analytics Help:**
- https://support.google.com/analytics

**Community Forum:**
- https://support.google.com/analytics/community

---

**Status**: ✅ Fully Implemented & Active
**Measurement ID**: G-C595NDQMDS
**Last Updated**: October 5, 2025

**Next Steps:**
1. Wait 24-48 hours for data to accumulate
2. Check GA4 dashboard
3. Create custom reports
4. Set up email alerts
5. Start tracking ROI by source

🎉 **Your analytics is now live and tracking!**
