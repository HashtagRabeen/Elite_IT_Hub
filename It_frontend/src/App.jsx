import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Navigation/Navbar";
import AdminDashboard from "./Admin/AdminDashboard";
import Navigation from "./Navigation/Navigation";
import Courses from "./Pages/Courses";
import Location from "./Pages/Location";
import Anjan from "./Pages/Anjan";
import CourseDescription from "./Pages/CourseDescription";
import Footer from "./Pages/Footer";
import Try from "./Pages/try";
import Login from "./Pages/Login";
import SuccessStory from "./Pages/SuccessStory";
import AdminCourses from "./Admin/AdminCourses";
import EditCourse from "./Admin/EditCourse";
import Signup from "./Pages/Signup";
import Protected from "./Pages/Protected";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailure from "./Pages/PaymentFailure";
import AdminTestimonial from "./Admin/AdminTestimonial";
import AdminSuccess from "./Admin/AdminSuccess";
import Dashboard from "./Admin/Dashboard";
import User from "./Admin/User";
import EditUser from "./Admin/EditUser";
import AdminPayments from "./Admin/AdminPayments";
import Inquiry from "./Pages/Inquiry";
import AdminInquiry from "./Admin/AdminInquiry";
import Enrollment from "./Pages/Enrollment";
import AdminEnrollment from "./Admin/AdminEnrollment";
import AboutUs from "./Pages/AboutUs";
import RefundPolicy from "./Pages/RefundPolicy";
function App() {
  const location = useLocation();

  const hideNavbarAndFooter =
    location.pathname.startsWith("/admindashboard") ||
    location.pathname === "/login" ||
    location.pathname.startsWith("/signup");

  return (
    <div>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admindashboard"
          element={<Protected Comp={AdminDashboard} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="editCourse" element={<EditCourse />} />
          <Route path="testimonial" element={<AdminTestimonial />} />
          <Route path="inquiry" element={<AdminInquiry />} />
          <Route path="success" element={<AdminSuccess />} />
          <Route path="editUser" element={<EditUser />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="enrollments" element={<AdminEnrollment />} />
        </Route>
        <Route path="/courses" element={<Courses />} />
        <Route path="/location" element={<Location />} />
        <Route path="/anjan" element={<Anjan />} />
        <Route path="/courseDescription/:id" element={<CourseDescription />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/try" element={<Try />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success-story" element={<SuccessStory />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/paymentFailure" element={<PaymentFailure />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
