# Google Sheet Internship Tracker script
This script will take information about your internships from Google Sheets and create a reminder for you in your Google Calendar.

## Setup
### 1. Configure internship Google Sheet
Set up your columns in this specific way for the script to work:
  - A column titled "On GCal" that accepts values "TRUE" or "FALSE"
  - A column titled "Company"
  - A column titled "Status"
  - A column titled "OA Deadline" with dates in UTC format (Format --> Number --> Date or Date Time depending on what information you have)
  - A column titled "OA Link"
  - A column titled "Interview Date"

### 2. Open Google Apps Script
  - Open your internship sheet and click "Extensions"
  - Click "Apps Script". If it doesn't show up just Google Search the website, pasting the spreadsheet link will connect the script
  - Paste the JS code into the code editor

### 3. Input API keys
  - Create a new calendar in your Google Calendar website
  - Open advanced options and copy Calendar ID (ends in "@group.calendar.google.com")
  - Paste on the corresponding line

  - Also copy the spreadsheet URL on the corresponding line

### 4. Running the Script
 - You can run directly in the code editor if you want, but you'll have to open it every time you want to make updates
 - Otherwise, hit Deploy --> New Deployment
 - Select Web App and Add-on
 - Then, go to your spreadsheet and hit Extensions again
 - Under Macros, click Import Macro
 - Select downloadAndAddToCalendar
 - Now you'll be able to run whenever you want from the Extensions tab

## Done!
