import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './api/routes/auth.route.js';
import profileUpdateRoutes from './api/routes/profile.update.route.js';
import profileDataRoutes from './api/routes/profile.data.route.js';
import userRegistrationRoutes from './api/routes/user.registration.route.js';
import courseEnrollmentRoutes from './api/routes/course.enrollment.admin.route.js';
import studentPaymentRoutes from './api/routes/student.payment.route.js';
import studentAttendaceRoutes from './api/routes/studnet.attendance.route.js'
import dashboardInfoRoutes from './api/routes/dashboard.info.route.js';
import userDataRoutes from './api/routes/user.data.route.js';
import incomeExpenseRoutes from './api/routes/incomeExpense.route.js';
import timeTableRoutes from './api/routes/timetable.routes.js';
import { verifyToken } from './api/utils/verifyUser.js';
import loanRequestsRoutes from './api/routes/loan.requests.routes.js';
import hallBookingRoutes from './api/routes/hall.bookings.route.js';
import adminNoticesRoutes from './api/routes/admin.notices.routes.js';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { initializeAzureStorage, testAzureConnection } from './api/config/azureStorage.js';
import registrationrouter from "./api/routes/register.student.routes.js";
import courseRegistrationRouter from "./api/routes/course.registration.student.routes.js";
import studentPaymentRouter from "./api/routes/student.payment.student.routes.js";
import getStudentPaymentDetailsRouter from "./api/routes/student.payement.details.student.routes.js";
import setStudentPaymentDetailsRouter from "./api/routes/student.payment.details.fetch.student.routes.js";
// import setTimeTablesRouter from "./routes/timetables.student.routes.js";
import getCourseEnrollmentRouter from "./api/routes/course.enrollement.student.routes.js";
import getCourseView from "./api/routes/course.view.student.routes.js";
import getStudentPaymentByIdRouter from "./api/routes/getPaymentHistory.student.routes.js";
import getStudentProfileUpdateRouter from "./api/routes/student.profile.update.student.routes.js";
import getStudentProfileDataRouter from "./api/routes/student.profiledata.student.routes.js";
import courseViewRouter from "./api/routes/course.view.student.routes.js";
import scheduleRouter from "./api/routes/class.schedule.student.routes.js"; // Importing the schedule router
import virtualClasses from "./api/routes/virtual.class.student.routes.js"
import azureBlobRoutes from "./api/routes/azure.file.student.routes.js";
import getTeacherCoursesRouter from "./api/routes/course.teacher.student.routes.js";
import materialRoutes from "./api/routes/course.material.student.routes.js";
import studentCourseRoutes from "./api/routes/student.course.student.routes.js";
import { authenticateToken, requireRole } from "./api/utils/authMiddleware.js";
import eventRoutes from "./api/routes/student.event.student.routes.js";
import dashboardRoutes from "./api/routes/student.dashboard.metrics.student.routes.js";
import announcementRoutes from "./api/routes/student.announcement.student.routes.js";
import studentResultsRoutes from "./api/routes/student.results.student.routes.js";
import quizStudentRoutes from "./api/routes/quiz.stu.student.routes.js";
import getTutorProfileDataRouter from "./api/routes/tutor.profile.data.tutor.routes.js";
import updateTutorProfileDataRouter from "./api/routes/tutor.profile.data.update.tutor.routes.js";
import getTutorEnrolledCoursesRouter from "./api/routes/tutor.courses.tutor.routes.js";
import getTutorAnnouncementRouter from "./api/routes/tutor.announcement.tutor.routes.js";
import setAnnouncementPublish from "./api/routes/announcement.publisher.tutor.routes.js";
import getVirtualClasses from "./api/routes/virtual.class.tutor.routes.js";
import announcementUpdate from "./api/routes/announcment.update.tutor.route.js";
import announcementDelete from "./api/routes/announcement.deletion.tutor.routes.js";
import getStudentProfileData from "./api/routes/student.profile.data.tutor.routes.js";
import getCourseEnrollmentByID from "./api/routes/course.enrollement.tutor.routes.js";
import tutorEarningsCalculationRouter from "./api/routes/tutor.earnings.calculations.tutor.route.js";
import getTutorDashboardDataRouter from "./api/routes/tutor.dashboard.controller.tutor.route.js";
import getAllStudentMarksRouter from "./api/routes/tutor.grading.tutor.route.js";

import quizRoutes from "./api/routes/quiz.routes.js";
import quizAnalyticsRoutes from "./api/routes/quiz.analytics.routes.js"; // Adjust path according to your project structure


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(morgan('combined'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later'
  }
});
app.use('/api/', limiter);


app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});


//admin routes

// main auth route
app.use('/api/auth', authRoutes);

// admin profile update route
app.use('/api/profile', profileUpdateRoutes);

// admin profile data route
app.use('/api/profileData', profileDataRoutes);

// admin user registration route
app.use('/api/register',userRegistrationRoutes);

// admin course enrollment route
app.use('/api/courses', courseEnrollmentRoutes);

// admin student payment route
app.use('/api/payments',studentPaymentRoutes);

// admin student attendance route
app.use('/api/attendance',studentAttendaceRoutes);

// admin dashboard info route
app.use('/api/dashboard', dashboardInfoRoutes);

// admin user data route
app.use('/api/userData', userDataRoutes);

// admin income and expense route
app.use('/api/incomeExpense', incomeExpenseRoutes);

// admin time table route
app.use('/api/timetables', timeTableRoutes);

// admin loan requests route
app.use('/api/loanRequests',loanRequestsRoutes);

// admin hall booking route
app.use('/api/hallBookings', hallBookingRoutes);

// admin notices route
app.use('/api/notices',adminNoticesRoutes);

// student routes

// Registration Route
app.use("/api/registration", registrationrouter);

// Course Registration Route
app.use("/api/course_registration", courseRegistrationRouter);

//student payment Route
app.use("/api/student_payment", studentPaymentRouter);

//student payment details Route
app.use("/api/student_payment_details", getStudentPaymentDetailsRouter);

//set student payment details Route
app.use("/api/update_student_payment", setStudentPaymentDetailsRouter);

//set timetable Route
//app.use("/api/set", setTimeTablesRouter);

//get course enrollment Route
app.use("/api/get_course_enrollment", getCourseEnrollmentRouter);

// Course View Route
app.use("/api/course_view", getCourseView);

//get student payment details by id Route
app.use("/api/get_student_payment_details_byId", getStudentPaymentByIdRouter);

//get student profile update Route
app.use("/api/get_profile_update", getStudentProfileUpdateRouter);

//get student profile data Route
app.use("/api/get_student_profile_data", getStudentProfileDataRouter);

// Course View Route
app.use("/api/course_view", courseViewRouter);

// Importing the schedule router
app.use('/api/schedules', scheduleRouter);

app.use('/api/virtual-classes', virtualClasses)

app.use('/api/files', authenticateToken, requireRole(['teacher']), azureBlobRoutes);

app.use('/api/courses', authenticateToken, requireRole(['teacher', 'admin']), getTeacherCoursesRouter);
app.use('/api/materials', authenticateToken, requireRole(['teacher', 'admin']), materialRoutes);

app.use('/api/student-courses', authenticateToken, studentCourseRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/announcements/students', announcementRoutes);

app.use('/api/student-results', studentResultsRoutes);

app.use('/api/quiz', quizStudentRoutes);

//Tutor routes

// Get student profile data Route
app.use("/api/get.student.profile.data.routes", getStudentProfileData);


// Update tutor profile data Route
app.use("/api/update.tutor.profile.data", updateTutorProfileDataRouter);

// Get tutor profile data Route
app.use("/api/get_tutor_profile_data", getTutorProfileDataRouter);

// Get tutor enrolled courses Route
app.use("/api/getTutorcoursesGetByTutorId", getTutorEnrolledCoursesRouter);

// Get tutor announcement Route
app.use("/api/getTutorAnnouncement", getTutorAnnouncementRouter);

// Set announcement publish Route
app.use("/api/PublishAnnouncement", setAnnouncementPublish);

// Update announcement Route
app.use("/api/updateAnnouncements", announcementUpdate);

// Delete announcement Route
app.use("/api/deleteAnnouncements", announcementDelete);

// Uncomment if needed
 app.use("/api/getAllVirtualClasses", getVirtualClasses);

 //Get course enrollments of all students
app.use("/api/get_course_enrollment", getCourseEnrollmentByID);

// Get tutor earnings calculations Route
app.use("/api/get_tutor_earnings", tutorEarningsCalculationRouter);

// Get tutor dashboard data Route
app.use("/api/get_tutor_dashboard_data", getTutorDashboardDataRouter);

//get all student marks Route

app.use("/api/get_all_student_marks", getAllStudentMarksRouter);

app.use("/api", quizRoutes);

app.use('/api/quiz-analytics', quizAnalyticsRoutes);

app.use('/api/quiz', quizStudentRoutes);



app.get('/api/health', async (req, res) => {
  const azureConnected = await testAzureConnection(); // ← Used here
  
  res.json({
    services: {
      azureBlob: azureConnected ? 'Connected' : 'Disconnected'
    }
  });
});



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});