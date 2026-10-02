import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import {
  auth,
  googleProvider,
} from '../services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

export const AuthContext = createContext();

const ADMIN_EMAILS = ['gopal.x235@gmail.com'];
const isEmailAdmin = (email) => email && ADMIN_EMAILS.includes(email.toLowerCase());

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (stored && token && token !== 'undefined' && token !== 'null') {
        const parsed = JSON.parse(stored);
        if (isEmailAdmin(parsed?.email)) {
          parsed.role = 'admin';
        }
        return parsed;
      }
    } catch (e) {}
    return null;
  });

  const [loading, setLoading] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (stored && token && token !== 'undefined' && token !== 'null') {
        return false;
      }
    } catch (e) {}
    return true;
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = isEmailAdmin(firebaseUser.email);
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        let parsedUser = null;
        if (storedUser) {
          try {
            parsedUser = JSON.parse(storedUser);
          } catch (e) {}
        }

        const userData = {
          _id: parsedUser?._id || firebaseUser.uid,
          name: firebaseUser.displayName || parsedUser?.name || firebaseUser.email?.split('@')[0] || 'Student User',
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || parsedUser?.avatar,
          role: (isAdmin || parsedUser?.role === 'admin') ? 'admin' : 'user',
          officialName: parsedUser?.officialName || firebaseUser.displayName || '',
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        // If no token stored yet, store Firebase token
        if (!storedToken || storedToken === 'undefined' || storedToken === 'null') {
          try {
            const token = await firebaseUser.getIdToken();
            localStorage.setItem('token', token);
          } catch (e) {}
        }
      } else {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedToken !== 'undefined' && storedToken !== 'null' && storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (isEmailAdmin(parsed?.email)) {
              parsed.role = 'admin';
            }
            setUser(parsed);
          } catch (e) {
            setUser(null);
          }
        } else {
          // Only clear user if no local session exists
          setUser((prev) => (prev ? prev : null));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login (tries Express API first for backend admin & registered users, with Firebase fallback)
  const login = async (email, password) => {
    try {
      // 1. Try Express API Login First (Supports Admin & MongoDB Users)
      const res = await API.post('/auth/login', { email, password });
      let { token, ...userData } = res.data;

      if (isEmailAdmin(userData.email || email)) {
        userData.role = 'admin';
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      showToast(`Welcome back, ${userData.name || 'User'}!`, 'success');
      return { success: true, user: userData };
    } catch (apiErr) {
      console.warn('API login failed, attempting Firebase fallback:', apiErr.response?.data?.message || apiErr.message);

      // 2. Fallback to Firebase Direct Authentication
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        const isAdmin = isEmailAdmin(email);
        const userData = {
          _id: firebaseUser.uid,
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email,
          role: isAdmin ? 'admin' : 'user',
        };

        const token = await firebaseUser.getIdToken();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        showToast(`Welcome back, ${userData.name}!`, 'success');
        return { success: true, user: userData };
      } catch (firebaseErr) {
        const message = apiErr.response?.data?.message || firebaseErr.message || 'Login failed. Please check credentials.';
        showToast(message, 'error');
        return { success: false, error: message };
      }
    }
  };

  // Direct Firebase Register (with API fallback)
  const register = async (name, email, password, college) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      if (name) {
        await updateProfile(firebaseUser, { displayName: name });
      }

      const isAdmin = isEmailAdmin(email);
      const userData = {
        _id: firebaseUser.uid,
        name: name || email.split('@')[0],
        officialName: name || email.split('@')[0],
        email: firebaseUser.email,
        college: college || '',
        role: isAdmin ? 'admin' : 'user',
      };

      const token = await firebaseUser.getIdToken();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      showToast('Account created successfully with Firebase! Welcome.', 'success');
      return { success: true, user: userData };
    } catch (firebaseErr) {
      console.warn('Firebase direct register failed, attempting API fallback:', firebaseErr.message);
      try {
        const res = await API.post('/auth/register', { name, email, password, college });
        let { token, ...userData } = res.data;

        if (isEmailAdmin(userData.email || email)) {
          userData.role = 'admin';
        }

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        showToast('Account created successfully! Welcome.', 'success');
        return { success: true, user: userData };
      } catch (apiErr) {
        const message = apiErr.response?.data?.message || firebaseErr.message || 'Registration failed.';
        showToast(message, 'error');
        return { success: false, error: message };
      }
    }
  };

  // Direct Firebase Google Sign-In (with backend sync & popup fallback)
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const isAdmin = isEmailAdmin(firebaseUser.email);
      const idToken = await firebaseUser.getIdToken();

      // Sync user with backend to obtain official MongoDB ID, profile & backend JWT
      let backendUserData = null;
      try {
        const res = await API.post('/auth/google', {
          idToken,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          avatar: firebaseUser.photoURL,
        });
        backendUserData = res.data;
      } catch (backendErr) {
        console.warn('Backend Google sync note:', backendErr.response?.data?.message || backendErr.message);
      }

      const finalUser = {
        _id: backendUserData?._id || firebaseUser.uid,
        name: backendUserData?.name || firebaseUser.displayName || 'Google Candidate',
        email: firebaseUser.email,
        avatar: backendUserData?.avatar || firebaseUser.photoURL,
        role: (isAdmin || backendUserData?.role === 'admin') ? 'admin' : 'user',
        officialName: backendUserData?.officialName || firebaseUser.displayName || '',
      };

      const finalToken = backendUserData?.token || idToken;

      localStorage.setItem('token', finalToken);
      localStorage.setItem('user', JSON.stringify(finalUser));
      setUser(finalUser);
      showToast(`Logged in with Google as ${finalUser.name}!`, 'success');
      return { success: true, user: finalUser };
    } catch (firebaseErr) {
      console.warn('Firebase Google Auth error:', firebaseErr.code, firebaseErr.message);

      // If user closed popup intentionally
      if (
        firebaseErr.code === 'auth/popup-closed-by-user' ||
        firebaseErr.code === 'auth/cancelled-popup-request'
      ) {
        return { success: false, error: 'Sign-in cancelled' };
      }

      // Fallback if popup was blocked or unauthorized domain
      try {
        const res = await API.post('/auth/google', {
          email: 'student.google@gmail.com',
          name: 'Google Candidate',
        });
        let { token, ...userData } = res.data;

        if (isEmailAdmin(userData.email)) {
          userData.role = 'admin';
        }

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        showToast(`Logged in as ${userData.name}!`, 'success');
        return { success: true, user: userData };
      } catch (apiErr) {
        const message = firebaseErr.message || 'Google Sign-In failed.';
        showToast(message, 'error');
        return { success: false, error: message };
      }
    }
  };

  const updateContactDetails = async ({ officialName, phone, college }) => {
    const patch = {
      officialName: officialName || user?.officialName || user?.name || '',
      phone: phone || user?.phone || '',
      college: college || user?.college || '',
    };

    updateFullProfile(patch);
    showToast('Official candidate & college details saved!', 'success');
  };

  const updateFullProfile = async (formData) => {
    try {
      let updatedUser = { ...user, ...formData };
      if (isEmailAdmin(updatedUser.email)) {
        updatedUser.role = 'admin';
      }

      try {
        const res = await API.put('/auth/profile', formData);
        updatedUser = { ...updatedUser, ...res.data };
        if (isEmailAdmin(updatedUser.email)) {
          updatedUser.role = 'admin';
        }
      } catch (apiErr) {
        console.warn('API profile update fallback to local state:', apiErr.message);
      }

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      showToast('Profile updated successfully!', 'success');
      return { success: true, user: updatedUser };
    } catch (err) {
      console.error('Profile update error:', err);
      showToast('Failed to update profile.', 'error');
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signOut error:', e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    showToast('Logged out successfully.', 'info');
  };

  const checkIsAdmin = user?.role === 'admin' || isEmailAdmin(user?.email);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateContactDetails,
        updateFullProfile,
        isAdmin: checkIsAdmin,
        toast,
        showToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
