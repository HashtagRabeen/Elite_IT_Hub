// import { Route, Routes, useLocation } from "react-router-dom";
// import Home from "./Pages/Home";
// import Navbar from "./Navigation/Navbar";
// import AdminDashboard from "./Admin/AdminDashboard";
// import Courses from "./Pages/Courses";
// import CourseDescription from "./Pages/CourseDescription";
// import Footer from "./Pages/Footer";
// import Login from "./Auth/Login";
// import SuccessStory from "./Pages/SuccessStory";
// import AdminCourses from "./Admin/AdminCourses";
// import EditCourse from "./Admin/EditCourse";
// import Signup from "./Auth/Signup";
// import Protected from "./Pages/Protected";
// import Cart from "./Pages/Cart";
// import Payment from "./Pages/Payment";
// import PaymentSuccess from "./Pages/PaymentSuccess";
// import PaymentFailure from "./Pages/PaymentFailure";
// import AdminTestimonial from "./Admin/AdminTestimonial";
// import AdminSuccess from "./Admin/AdminSuccess";
// import Dashboard from "./Admin/Dashboard";
// import User from "./Admin/User";
// import EditUser from "./Admin/EditUser";
// import AdminPayments from "./Admin/AdminPayments";
// import Inquiry from "./Pages/Inquiry";
// import AdminInquiry from "./Admin/AdminInquiry";
// import Enrollment from "./Pages/Enrollment";
// import AdminEnrollment from "./Admin/AdminEnrollment";
// import AboutUs from "./Pages/AboutUs";
// import RefundPolicy from "./Pages/RefundPolicy";
// import ScrollToTop from "./Components/ScrollToTop";
// import DeletedCourses from "./Admin/DeletedCourses";
// import UpdateUsersHistory from "./Admin/UpdateUsersHistory";


// function App() {
//   const location = useLocation();

//     const hideNavbarAndFooter =
//       location.pathname.startsWith("/admindashboard") ||
//       location.pathname.startsWith("/AdminDashboard")||
//       location.pathname === "/login" || 
//       location.pathname.startsWith("/signup");

//   return (
//     <div>
//       <ScrollToTop />
//       {!hideNavbarAndFooter && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/admindashboard"
//           element={<Protected Comp={AdminDashboard} />}
//         >
//           <Route path="deleteFiles" element={<DeletedCourses/>}/>
//           <Route path="updateFiles" element={<UpdateUsersHistory/>}/>
//           {/* <Route path="dashboard" element={<Dashboard />} /> */}
//           <Route index element={<Dashboard />} />
//           <Route path="user" element={<User />} />
//           <Route path="courses" element={<AdminCourses />} />
//           <Route path="editCourse" element={<EditCourse />} />
//           <Route path="testimonial" element={<AdminTestimonial />} />
//           <Route path="inquiry" element={<AdminInquiry />} />
//           <Route path="success" element={<AdminSuccess />} />
//           <Route path="editUser" element={<EditUser />} />
//           <Route path="payments" element={<AdminPayments />} />
//           <Route path="enrollments" element={<AdminEnrollment />} />
//         </Route>
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/courseDescription/:id" element={<CourseDescription />} />
//         <Route path="/footer" element={<Footer />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/success-story" element={<SuccessStory />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/paymentSuccess" element={<PaymentSuccess />} />
//         <Route path="/paymentFailure" element={<PaymentFailure />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/inquiry" element={<Inquiry />} />
//         <Route path="/enrollment" element={<Enrollment />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/refundpolicy" element={<RefundPolicy />} />
//       </Routes>
//       {!hideNavbarAndFooter && <Footer />}
//     </div>
//   );
// }

// export default App;

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Navigation/Navbar";
import AdminDashboard from "./Admin/AdminDashboard";
import Courses from "./Pages/Courses";
import CourseDescription from "./Pages/CourseDescription";
import Footer from "./Pages/Footer";
import SuccessStory from "./Pages/SuccessStory";
import AdminCourses from "./Admin/AdminCourses";
import EditCourse from "./Admin/EditCourse";
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
import ScrollToTop from "./Components/ScrollToTop";
// import NotFound from "./Pages/NotFound";
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"

/**
 * PublicLayout
 * Wraps all public-facing routes with navigation and footer
 */
const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

/**
 * AuthLayout
 * Minimal layout for login/signup - no navigation chrome
 */
const AuthLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

/**
 * Router configuration
 * Using data router for better code splitting and loader support in the future
 */
const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDescription />,
      },
      {
        path: "/success-story",
        element: <SuccessStory />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/inquiry",
        element: <Inquiry />,
      },
      {
        path: "/enrollment",
        element: <Enrollment />,
      },
    ],
  },

  // Payment flow - keeping these separate for potential future layout changes
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/failure",
        element: <PaymentFailure />,
      },
    ],
  },

  // Auth routes - no chrome
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  // Admin panel - all routes behind auth guard
  {
    path: "/admin",
    element: <Protected Comp={AdminDashboard} />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "users/edit/:id",
        element: <EditUser />,
      },
      {
        path: "courses",
        element: <AdminCourses />,
      },
      {
        path: "courses/edit/:id",
        element: <EditCourse />,
      },
      {
        path: "testimonials",
        element: <AdminTestimonial />,
      },
      {
        path: "success-stories",
        element: <AdminSuccess />,
      },
      {
        path: "inquiries",
        element: <AdminInquiry />,
      },
      {
        path: "payments",
        element: <AdminPayments />,
      },
      {
        path: "enrollments",
        element: <AdminEnrollment />,
      },
    ],
  },

  // // Catch-all 404
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;