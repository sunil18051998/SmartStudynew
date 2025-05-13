import express from 'express';
import {
  getGoogleAuthUrl,
  handleGoogleCallback,
  addCalendarEvent,
} from '../controllers/calendarController.js';

const router = express.Router();

router.get('/auth-url', getGoogleAuthUrl);
router.get('/callback', handleGoogleCallback);
router.post('/add-event', addCalendarEvent);

export default router;
