import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAuthUrl = () =>
  oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent',
  });

export const setCredentials = (tokens) => {
  oauth2Client.setCredentials(tokens);
};

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
