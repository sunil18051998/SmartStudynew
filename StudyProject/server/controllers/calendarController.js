import { oauth2Client, getAuthUrl, calendar, setCredentials } from '../services/googleAuth.js';

export const getGoogleAuthUrl = (req, res) => {
  const url = getAuthUrl();
  res.json({ url });
};

export const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  setCredentials(tokens);
  //res.json({ message: 'Google Calendar connected', tokens });

  res.redirect('http://localhost:5173/calendar-connected');
};

export const addCalendarEvent = async (req, res) => {
  const event = {
    summary: req.body.title,
    start: { dateTime: req.body.start },
    end: { dateTime: req.body.end },
  };
  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
  res.json(response.data);
};
