import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Members from './components/Members';
import News from './components/News';
import ArticleDetails from './components/ArticleDetail';
import Articles from './components/Articles';
import JoinForm from './components/JoinForm';
import Login from './components/Login';
import Admin from './components/Admin';
import NewsForm from './components/NewsForm';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <News />
                {/* <Articles/> */}
                <Members />
                <JoinForm />
              </>
            } />
            {/* <Route path="/article/:id" element={<ArticleDetails />} /> */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/news/new"
              element={
                <PrivateRoute>
                  <NewsForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/news/:id"
              element={
                <PrivateRoute>
                  <NewsForm />
                </PrivateRoute>
              }
            />
          </Routes>
          <footer className="bg-red-700 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p>© 2024 All Nepal National Free Students Union. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;