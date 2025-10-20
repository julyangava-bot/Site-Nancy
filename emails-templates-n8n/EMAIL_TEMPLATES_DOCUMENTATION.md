# 📧 PinkDog Email Templates Documentation

## Overview
This documentation explains how the PinkDog Pet Resort email templates work, specifically focusing on the email reply system with conversation history functionality.

## 📁 Template Files

### Client Email Templates (3 files)
1. **Pet Hotel**: `/petHotel/hotel-Client-FormEmail.html`
2. **PinkVan**: `/pinkVan/PinkVanClientFormEmail.html`
3. **Daycare**: `/daycare/Daycare-Client-FormEmail.html`

### Store Email Templates (3 files)
1. **Pet Hotel**: `/petHotel/hotel-Store-FormEmail.html`
2. **PinkVan**: `/pinkVan/PinkVanStoreFormEmail.html`
3. **Daycare**: `/daycare/Daycare-Store-FormEmail.html`

---

## 🔄 Email Reply System with History

### How It Works

When a user clicks on any email link in the templates, the system automatically:
1. Opens their default email client
2. Pre-fills the subject line with "Re: [Service Type] Request - [Client Name]"
3. Includes the original booking details in the email body as conversation history
4. Maintains a thread of communication

### Technical Implementation

#### Mailto Link Structure
```html
<a href="mailto:pinkdogpetresort@gmail.com?subject=[SUBJECT]&body=[BODY]">
  pinkdogpetresort@gmail.com
</a>
```

#### URL Encoding
Special characters must be URL encoded:
- Space = `%20`
- Line break = `%0D%0A`
- @ = `%40`
- : = `%3A`

### Example Implementation

```html
<!-- Email link with pre-filled history -->
<a href="mailto:pinkdogpetresort@gmail.com?subject=Re:%20Pet%20Hotel%20Booking%20Request%20-%20{{ clientName }}&body=%0D%0A%0D%0A%0D%0A------ Original Booking Request ------%0D%0AClient: {{ clientName }}%0D%0APet Name: {{ petName }}%0D%0ABreed: {{ petBreed }}%0D%0ASpecial Notes: {{ observations }}%0D%0ARequest Date: {{ date }}">
  pinkdogpetresort@gmail.com
</a>
```

---

## 📊 N8N Variables Used

### Common Variables (All Templates)
| Variable | Description | Example |
|----------|-------------|---------|
| `{{ $('Booking - PinkDogResort-Web').item.json.body.clientName }}` | Client's full name | "John Smith" |
| `{{ $('Booking - PinkDogResort-Web').item.json.body.clientEmail }}` | Client's email | "john@email.com" |
| `{{ $('Booking - PinkDogResort-Web').item.json.body.clientPhone }}` | Client's phone | "(978) 123-4567" |
| `{{ $('Booking - PinkDogResort-Web').item.json.body.petName }}` | Pet's name | "Max" |
| `{{ $('Booking - PinkDogResort-Web').item.json.body.petBreed }}` | Pet's breed | "Golden Retriever" |
| `{{ $('Booking - PinkDogResort-Web').item.json.body.numberOfPets }}` | Number of pets | "1" |
| `{{ $('Booking - PinkDogResort-Web').item.json.body.observations }}` | Special notes | "Needs medication" |

### Service-Specific Variables

#### PinkVan Only
| Variable | Description |
|----------|-------------|
| `{{ ...body.address }}` | Pick-up/Drop-off address |
| `{{ ...body.serviceNeeded }}` | Type: 'both', 'pickup', 'dropoff' |
| `{{ ...body.serviceType }}` | For which service (daycare/hotel) |

#### Pet Hotel Only
| Variable | Description |
|----------|-------------|
| `{{ ...body.checkIn }}` | Check-in date/time |
| `{{ ...body.checkOut }}` | Check-out date/time |

---

## 🎨 Design Structure

### Color Scheme with Dark Mode Protection
```css
/* All colors use !important to prevent dark mode override */
background-color: #ffffff !important;
color: #333333 !important;
```

### Key Design Elements
1. **Header**: Logo + Service title
2. **Important Notice**: Yellow warning box with no-reply message
3. **Request Details**: Table format with service badge
4. **Two-Column Layout**: Info and Next Steps side-by-side
5. **Footer**: Contact info + PetQuantic branding

### Important Notice Box Structure
```html
<div style="background-color: #FFF9E6 !important; border-left: 3px solid #F59E0B !important;">
  <p>⚠️ IMPORTANT – Your booking is pending approval</p>
  <p>📌 Please note: This is an automated message — do not reply to this email.</p>
  <p>👉 To reply to this request, click here:</p>
  <a href="mailto:...">pinkdogpetresort@gmail.com</a>
</div>
```

---

## 🔧 How to Modify Templates

### Adding New Variables
1. Add the variable in N8N workflow
2. Reference it in template: `{{ $('Booking - PinkDogResort-Web').item.json.body.YOUR_VARIABLE }}`
3. Include in mailto body if needed for history

### Updating Email History
The email history is built in the `body` parameter of the mailto link:
```
body=%0D%0A%0D%0A%0D%0A
------ Original [Service] Request ------
%0D%0AClient: {{ clientName }}
%0D%0APet Name: {{ petName }}
[Add more fields as needed]
```

### Testing Email Threading
1. Send a test booking through the form
2. Click the email link in the received email
3. Verify that:
   - Subject has "Re:" prefix
   - Body contains original booking details
   - All special characters display correctly

---

## 📌 Important Notes

### Email Client Compatibility
- Tested with: Gmail, Outlook, Apple Mail, Thunderbird
- Mobile clients: iOS Mail, Gmail App, Outlook App
- Some clients may have character limits for mailto URLs

### Character Limits
- Subject line: ~78 characters recommended
- Body: ~2000 characters for maximum compatibility
- Total URL: ~2048 characters (browser limit)

### Security Considerations
- Never include sensitive data (passwords, credit cards)
- All data is visible in the URL
- Use HTTPS for the website hosting these templates

---

## 🚀 Deployment

### N8N Workflow Integration
1. Templates are triggered by form submission
2. N8N processes the data and populates variables
3. Email is sent using the HTML template
4. Client receives formatted email with reply functionality

### Update Process
1. Edit HTML template file
2. Test locally with sample data
3. Deploy to N8N workflow
4. Test end-to-end with real form submission

---

## 📞 Support

For questions about these templates:
- **Email**: pinkdogpetresort@gmail.com
- **Phone**: (978) 772-4242
- **Developer**: Powered by PetQuantic

---

## 📝 Changelog

### Version 1.0 (Current)
- Modern, compact design
- Email threading with history
- Dark mode color protection
- Two-column layout for information
- Automated no-reply warnings
- Pre-filled mailto links with booking context

---

*Last Updated: {{ new Date().toLocaleDateString() }}*