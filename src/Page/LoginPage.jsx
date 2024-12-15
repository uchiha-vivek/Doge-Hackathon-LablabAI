import React, { useState,useEffect } from "react";
import musk from '../assets/musk.jpg';
import './login.css'
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Fixing the import for FaEye and FaEyeSlash
import gov from '../assets/gov.png';
import X from '../assets/x.png';
import GoogleSvg from "../assets/icons8-google.svg";
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut,signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state to handle form validation
  const navigate = useNavigate();

  const signIn = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Password created");
      navigate("/form"); // Redirect after successful login
    } catch (err) {
      setError(err.message); // Display error if something goes wrong
    }
  };

  const signInWithGoogle = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
      navigate("/form");
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          navigate("/form");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleRedirect();
  }, []);
  

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after signing out
    } catch (error) {
      console.log(error);
    }
  };

  return (
 <div className="body-login" >
      <div className="login-main">
      <div className="login-left">
        <img src={gov} alt="Government Logo" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={X} alt="App Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <form>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="pass-input-div">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={signIn}>
                  Log In
                </button>
                <button type="button" onClick={signInWithGoogle}>
                  <img src={GoogleSvg} alt="Google Logo" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </div>
 </div>
  );
};

export default Login;
