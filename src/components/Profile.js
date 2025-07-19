import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [authTab, setAuthTab] = useState("login"); // 'login' or 'register'
  const navigate = useNavigate();

  // Fetch profile if token exists
  useEffect(() => {
    if (token) {
      setLoading(true);
      fetch("http://localhost:5000/api/profile", {
        headers: { "x-auth-token": token },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Invalid or expired token");
          return res.json();
        })
        .then((data) => {
          setProfile(data);
          setForm({ name: data.name, email: data.email, password: "" });
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
          setToken("");
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          setLoginError(data.msg || "Login failed");
        }
        setLoading(false);
      })
      .catch(() => {
        setLoginError("Login failed");
        setLoading(false);
      });
  };

  // Handle register
  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");
    setLoading(true);
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          setRegisterError(data.msg || "Registration failed");
        }
        setLoading(false);
      })
      .catch(() => {
        setRegisterError("Registration failed");
        setLoading(false);
      });
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setEditMode(false);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to update profile");
        setLoading(false);
      });
  };

  // Handle pay fees
  const handlePayFees = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/profile/pay", {
      method: "POST",
      headers: { "x-auth-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Payment failed");
        setLoading(false);
      });
  };

  // Handle logout
  const handleLogout = () => {
    setToken("");
    setProfile(null);
    localStorage.removeItem("token");
  };

  // UI
  if (!token) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-100 to-white py-12 px-4">
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 font-bold rounded-t-lg transition-all ${authTab === 'login' ? 'bg-cyan-500 text-white' : 'bg-cyan-100 text-blue-800'}`}
              onClick={() => setAuthTab('login')}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 font-bold rounded-t-lg transition-all ml-2 ${authTab === 'register' ? 'bg-cyan-500 text-white' : 'bg-cyan-100 text-blue-800'}`}
              onClick={() => setAuthTab('register')}
            >
              Register
            </button>
          </div>
          {authTab === 'login' ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                required
                placeholder="Email"
                className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={loginForm.email}
                onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
              />
              {loginError && <div className="text-red-500 text-sm text-center">{loginError}</div>}
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-all">
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Name"
                className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={registerForm.name}
                onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={registerForm.email}
                onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={registerForm.password}
                onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
              />
              {registerError && <div className="text-red-500 text-sm text-center">{registerError}</div>}
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-all">
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (loading && !profile) {
    return <div className="min-h-[80vh] flex items-center justify-center text-blue-600 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-[80vh] flex items-center justify-center text-red-500 text-lg">{error}</div>;
  }

  if (!profile) {
    return <div className="min-h-[80vh] flex items-center justify-center text-blue-800 text-lg">No profile data found.</div>;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-br from-blue-50 via-cyan-100 to-white">
      <div className="w-full max-w-lg bg-white/90 rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Profile</h2>
          <button onClick={handleLogout} className="text-cyan-500 hover:underline font-semibold">Logout</button>
        </div>
        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
            <input
              type="text"
              required
              placeholder="Name"
              className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="New Password (optional)"
              className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-all flex-1">Save</button>
              <button type="button" onClick={() => setEditMode(false)} className="bg-gray-200 hover:bg-gray-300 text-blue-800 font-bold py-2 rounded-lg transition-all flex-1">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <span className="block text-blue-700 font-semibold">Name:</span>
              <span className="block text-lg font-bold text-blue-900">{profile.name}</span>
            </div>
            <div>
              <span className="block text-blue-700 font-semibold">Email:</span>
              <span className="block text-lg font-bold text-blue-900">{profile.email}</span>
            </div>
            <div>
              <span className="block text-blue-700 font-semibold">Fees Paid:</span>
              {profile.feesPaid ? (
                <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold ml-2">Yes</span>
              ) : (
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold ml-2">No</span>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setEditMode(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-all flex-1">Edit Profile</button>
              {!profile.feesPaid && (
                <button onClick={() => navigate('/pay-fees')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all flex-1">
                  {loading ? "Processing..." : "Pay Fees"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile; 