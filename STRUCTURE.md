# Website Structure - K&Co Luxury Real Estate Portfolio

## Overview
The website has been restructured into a **property listing portal** with multiple pages.

## File Structure

### Main Pages
1. **`index.html`** - Property Listing Page (Homepage)
   - Shows all properties in a beautiful grid layout
   - Currently displays Jacob & Co. property + Coming Soon card
   - Includes About, Services, and Contact sections
   - Uses: `listing-styles.css` and `listing-script.js`

2. **`property-jacob-co.html`** - Jacob & Co. Property Detail Page
   - Full detailed page for the Jacob & Co. x M3M project
   - Complete property information, floor plans, pricing, amenities
   - Navigation includes "All Properties" link back to homepage
   - Uses: `styles.css` and `script.js`

### CSS Files
- **`listing-styles.css`** - Styles for the property listing page (index.html)
- **`styles.css`** - Styles for the property detail page (property-jacob-co.html)

### JavaScript Files
- **`listing-script.js`** - Scripts for the property listing page (index.html)
- **`script.js`** - Scripts for the property detail page (property-jacob-co.html)

## Navigation Flow

```
index.html (Property Listing)
    ↓
    [Click on Property Card or "View Details"]
    ↓
property-jacob-co.html (Property Detail)
    ↓
    [Click "All Properties" in Nav]
    ↓
Back to index.html
```

## How It Works

### Homepage (index.html)
- **Hero Section**: Luxury real estate introduction with animated stats
- **Properties Grid**: 
  - Jacob & Co. property card with full details
  - "Coming Soon" card for future properties
- **About Section**: Information about K&Co
- **Services Section**: 6 key services offered
- **CTA Section**: Call-to-action
- **Contact Form**: Lead capture with WhatsApp integration

### Property Detail Page (property-jacob-co.html)
- Complete property showcase
- Multiple sections: Hero, Mission, Project Showcase, Amenities, Location, Floor Plans, Info, Pricing, RERA, Contact
- Form submissions and popup for lead capture

## Adding New Properties

When you have more properties to add:

1. **Create a new property detail page** (e.g., `property-new-luxury-towers.html`)
2. **Add a new property card** in `index.html` in the `.properties-grid` section
3. **Link the card** to the new property detail page

### Example Property Card Template:
```html
<div class="property-card" data-aos="fade-up">
    <div class="property-image-wrapper">
        <img src="path/to/image.png" alt="Property Name">
        <div class="property-badge">NEW LAUNCH</div>
        <div class="property-overlay">
            <a href="property-new.html" class="view-property-btn">
                <span>EXPLORE PROPERTY</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
    <div class="property-content">
        <!-- Add property details here -->
    </div>
</div>
```

## Key Features

### Property Listing Page (index.html)
✅ Animated hero section with statistics
✅ Beautiful property cards with hover effects
✅ "Coming Soon" placeholder for future properties
✅ About section highlighting expertise
✅ Services grid
✅ Contact form with WhatsApp integration
✅ Fully responsive design

### Property Detail Page (property-jacob-co.html)
✅ Full property showcase
✅ Interactive floor plan viewer with zoom
✅ Video integration
✅ RERA information
✅ Lead capture popup
✅ WhatsApp integration for enquiries
✅ Fully responsive design

## Contact Form Integration

Both pages have WhatsApp integration:
- **Main enquiry form**: Sends details to +91 9760393545
- **Popup form**: Sends details to +91 9997024660

Forms generate unique enquiry/EOI numbers for tracking.

## Browser Compatibility
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive
- Touch-friendly interactions

## Next Steps

1. **Open `index.html`** in your browser to see the property listing page
2. **Click on the Jacob & Co. property card** to navigate to the detail page
3. **Test navigation** between pages
4. **Add more properties** as they become available

---

*Created by Kunwar Singh Rawat & Co. - Luxury Real Estate Advisory*

