import { google } from 'googleapis';

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  branch?: string;
  message?: string;
  timestamp?: string;
}

/**
 * Get Google Sheets API client
 */
async function getGoogleSheetsClient() {
  try {
    // Check if credentials are provided
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      console.warn('⚠️ Google Sheets credentials not configured. Contact form data will not be saved to Google Sheets.');
      return null;
    }

    // Parse credentials from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    // Create sheets API client
    const sheets = google.sheets({ version: 'v4', auth });
    
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    return null;
  }
}

/**
 * Save contact form data to Google Sheets
 */
export async function saveContactToGoogleSheets(data: ContactFormData): Promise<boolean> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    if (!sheets) {
      console.log('📝 Google Sheets not configured. Skipping save.');
      return false;
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      console.warn('⚠️ Google Sheets Spreadsheet ID not configured.');
      return false;
    }

    // Prepare row data
    const timestamp = data.timestamp || new Date().toISOString();
    const row = [
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.branch || 'Not specified',
      data.message || 'No message',
    ];

    // Append to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Contact Submissions!A:F', // Sheet name and range
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Contact form data saved to Google Sheets:', response.data.updates?.updatedRows || 0, 'row(s)');
    return true;
  } catch (error: any) {
    console.error('❌ Error saving to Google Sheets:', error.message);
    
    // Provide helpful error messages
    if (error.code === 404) {
      console.error('💡 Tip: Make sure the spreadsheet ID is correct and the sheet "Contact Submissions" exists.');
    } else if (error.code === 403) {
      console.error('💡 Tip: Make sure the service account has edit access to the spreadsheet.');
    }
    
    return false;
  }
}

/**
 * Initialize Google Sheets (create headers if needed)
 */
export async function initializeGoogleSheets(): Promise<boolean> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    if (!sheets) {
      return false;
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      return false;
    }

    // Check if headers exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Contact Submissions!A1:F1',
    });

    // If no data, add headers
    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Preferred Branch',
        'Message',
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Contact Submissions!A1:F1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });

      console.log('✅ Google Sheets headers initialized');
    }

    return true;
  } catch (error: any) {
    if (error.code === 404) {
      console.log('💡 Creating "Contact Submissions" sheet...');
      // Sheet doesn't exist, that's okay - it will be created on first write
    }
    return false;
  }
}
