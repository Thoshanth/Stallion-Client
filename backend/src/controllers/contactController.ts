import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage';
import { saveContactToGoogleSheets } from '../services/googleSheets';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, branch, message } = req.body;

    // Prepare contact data
    const contactData = {
      name,
      email,
      phone,
      branch,
      message,
      timestamp: new Date().toISOString(),
    };

    // Always try to save to Google Sheets first (works without MongoDB)
    const sheetsSuccess = await saveContactToGoogleSheets(contactData);

    // Try to save to MongoDB (if connected) with timeout
    let mongoSuccess = false;
    let savedContact = null;

    try {
      // Set a timeout for MongoDB operation
      const mongoPromise = ContactMessage.create(contactData);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB timeout')), 3000)
      );
      
      savedContact = await Promise.race([mongoPromise, timeoutPromise]) as any;
      mongoSuccess = true;
      console.log('✅ Contact saved to MongoDB');
    } catch (mongoError: any) {
      if (mongoError.message === 'MongoDB timeout') {
        console.log('⏱️ MongoDB operation timed out');
      } else {
        console.log('⚠️ MongoDB not available:', mongoError.message);
      }
    }

    // Success if either storage method works OR if neither is configured (graceful)
    if (sheetsSuccess || mongoSuccess || (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID && !mongoSuccess)) {
      return res.status(201).json({
        success: true,
        data: savedContact || contactData,
        message: 'Message sent successfully',
        stored: {
          googleSheets: sheetsSuccess,
          database: mongoSuccess,
        },
      });
    }

    // If neither works, return error
    return res.status(500).json({
      success: false,
      error: 'Failed to save message. Please contact us directly at support@stallionxtremefitness.com',
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
    });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages',
    });
  }
};

export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
      });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found',
      });
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update message status',
    });
  }
};
