import { app, BrowserWindow, ipcMain } from 'electron';
import { isDevelopmentMode } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import loginRequest from './backend/auth/login.js';
import {
  getAllWorkshops,
  getWorkshop,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  trackAttendance,
  submitFeedback,
  getWorkshopEnrollments,
  getAttendanceReport,
  getFeedbackReport,
  exportAttendanceReportPDF,
  exportFeedbackReportPDF,
} from './backend/workshop/workshops.js';
import {
  getAllResources,
  addResource,
  getPendingBookings,
  updateBookingStatus,
  getResourceStats
} from './backend/resources/resources.js';
import {
  getAllMentors,
  addMentor,
  deleteMentor, 
  assignMentorToWorkshop 
} from './backend/mentors/mentors.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: true,
  });
  if (isDevelopmentMode()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(getUIPath());
  }
  ipcMain.handle('auth:login', async (_event, credentials) => {
    return await loginRequest(credentials);
  });

  // Workshop IPC Handlers
  ipcMain.handle('get-workshops', async () => {
    return await getAllWorkshops();
  });

  ipcMain.handle('get-workshop', async (_event, id) => {
    return await getWorkshop(id);
  });

  ipcMain.handle('create-workshop', async (_event, workshopData) => {
    return await createWorkshop(workshopData);
  });

  ipcMain.handle('update-workshop', async (_event, id, workshopData) => {
    return await updateWorkshop(id, workshopData);
  });

  ipcMain.handle('delete-workshop', async (_event, id) => {
    return await deleteWorkshop(id);
  });

  ipcMain.handle('track-attendance', async (_event, enrollmentId, attended) => {
    return await trackAttendance(enrollmentId, attended);
  });

  ipcMain.handle('submit-feedback', async (_event, enrollmentId, feedbackData) => {
    return await submitFeedback(enrollmentId, feedbackData);
  });

  ipcMain.handle('get-workshop-enrollments', async (_event, workshopId) => {
    return await getWorkshopEnrollments(workshopId);
  });

  ipcMain.handle('get-attendance-report', async () => {
    return await getAttendanceReport();
  });

  ipcMain.handle('get-feedback-report', async () => {
    return await getFeedbackReport();
  });

  ipcMain.handle('export-attendance-report', async () => {
    return await exportAttendanceReportPDF();
  });

  ipcMain.handle('export-feedback-report', async () => {
    return await exportFeedbackReportPDF();
  });

  ipcMain.handle('resources:get-all', async () => {
    return await getAllResources();
  });

  ipcMain.handle('resources:add', async (_event, data) => {
    return await addResource(data);
  });

  ipcMain.handle('bookings:get-pending', async () => {
    return await getPendingBookings();
  });

  ipcMain.handle('bookings:update-status', async (_event, data) => {
    return await updateBookingStatus(data);
  });

  ipcMain.handle('resources:get-stats', async () => {
    return await getResourceStats();
  });

  ipcMain.handle('mentors:get-all', async () => {
    return await getAllMentors();
  });

  ipcMain.handle('mentors:add', async (_event, data) => {
    return await addMentor(data);
  });

  ipcMain.handle('mentors:delete', async (_event, id) => {
    return await deleteMentor(id);
  });

  ipcMain.handle('mentors:assign-workshop', async (_event, { mentorId, workshopId }) => {
    return await assignMentorToWorkshop(mentorId, workshopId);
  });
  
  handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow) {
  let willClose = false;
  mainWindow.on('close', (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  });
}