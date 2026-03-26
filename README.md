# UTM Form Capture App

A React application with Tailwind CSS that captures UTM parameters from the URL and stores them in localStorage.

## Features

- 🎯 Automatically captures UTM parameters from URL
- 💾 Stores UTM data in localStorage
- 📋 Beautiful form with Tailwind CSS styling
- 🔍 Display/hide captured UTM parameters
- ✅ Form validation
- 📱 Responsive design

## UTM Parameters Captured

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `IntermediaryCode`
- `LeadGenerator`
- `IsZKApp`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

### Testing UTM Capture

Access the application with UTM parameters in the URL:

```
http://localhost:5173/?utm_source=zkgi-top-nav&utm_medium=top-nav&utm_campaign=Car-Secure&utm_term=Car&IntermediaryCode=4170830000&LeadGenerator=ZurichKotak&IsZKApp=1
```

### How It Works

1. When the app loads, it checks the URL for UTM parameters
2. If found, parameters are stored in localStorage under the key `utmParams`
3. The form displays the captured parameters
4. When the form is submitted, user data is combined with UTM parameters
5. Complete submission data is stored in localStorage under `formSubmissions`

### 🔗 UTM Persistence Demonstration

**Key Feature**: UTM parameters persist even when navigating to internal pages without UTM parameters!

#### Step-by-Step Demo:

1. **Initial Visit with UTM Parameters**
   - Visit: `http://localhost:5173/?utm_source=zkgi-top-nav&utm_medium=top-nav&utm_campaign=Car-Secure&utm_term=Car&IntermediaryCode=4170830000&LeadGenerator=ZurichKotak&IsZKApp=1`
   - The app captures and stores all UTM parameters in localStorage
   - You'll see the parameters displayed in the "Captured UTM Parameters" section

2. **Navigate to Internal Pages**
   - Click "Go to Home (Clean URL)" → URL becomes `http://localhost:5173/`
   - Click "Go to About Page" → URL becomes `http://localhost:5173/?page=about`
   - Click "Go to Contact Page" → URL becomes `http://localhost:5173/?page=contact`

3. **Observe Persistence**
   - Notice the URL no longer has UTM parameters
   - BUT the "Captured UTM Parameters" section still shows all the original data
   - The page header shows which page you're on (Home/About/Contact)
   - UTM data is retrieved from localStorage, not the URL

4. **Submit Form**
   - Fill out the form on any page
   - Submit it
   - Check console - the submission includes both form data AND the original UTM parameters
   - This works even though the current URL has no UTM parameters!

5. **Why This Matters for Marketing**
   - Users can navigate freely through your site
   - URLs stay clean (no UTM clutter on every page)
   - Original marketing attribution is preserved throughout the entire journey
   - Form submissions always include the source campaign data
   - Perfect for tracking lead generation and conversion funnels

#### Clear and Reset
- Use the "Clear Stored Data" button to remove all stored UTM parameters and submissions
- This redirects to a clean URL without any parameters

## LocalStorage Structure

### utmParams
```json
{
  "utm_source": "zkgi-top-nav",
  "utm_medium": "top-nav",
  "utm_campaign": "Car-Secure",
  "utm_term": "Car",
  "IntermediaryCode": "4170830000",
  "LeadGenerator": "ZurichKotak",
  "IsZKApp": "1"
}
```

### formSubmissions
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Interested in car insurance",
    "utm_source": "zkgi-top-nav",
    "utm_medium": "top-nav",
    "utm_campaign": "Car-Secure",
    "utm_term": "Car",
    "IntermediaryCode": "4170830000",
    "LeadGenerator": "ZurichKotak",
    "IsZKApp": "1",
    "timestamp": "2026-03-26T10:30:00.000Z"
  }
]
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- PostCSS
- Autoprefixer
