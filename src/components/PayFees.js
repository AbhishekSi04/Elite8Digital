import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PayFees() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (!token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate payment by calling backend
    fetch("http://localhost:5000/api/profile/pay", {
      method: "POST",
      headers: { "x-auth-token": token },
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1800);
      })
      .catch(() => {
        setError("Payment failed. Please try again.");
        setLoading(false);
      });
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-100 to-white py-12 px-4">
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="mb-4 animate-bounce">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2 text-center">Payment Successful!</h2>
          <p className="text-blue-800 text-center">Your fees have been marked as paid.<br/>Redirecting to your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-100 to-white py-12 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8">
        {/* Mock Payment Gateway Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mr-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#06b6d4"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-xl font-bold text-cyan-600 tracking-wide">ElitePay Gateway</span>
        </div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Pay Your Fees</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-4 flex flex-col gap-2 mb-2 shadow-inner">
            <label className="text-blue-700 font-semibold">Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              required
              placeholder="Cardholder Name"
              className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
              value={form.cardName}
              onChange={handleChange}
            />
            <label className="text-blue-700 font-semibold mt-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              required
              placeholder="Card Number"
              maxLength={16}
              className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
              value={form.cardNumber}
              onChange={handleChange}
            />
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <label className="text-blue-700 font-semibold">Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white w-full"
                  value={form.expiry}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className="text-blue-700 font-semibold">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  required
                  placeholder="CVV"
                  maxLength={4}
                  className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white w-full"
                  value={form.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-all text-lg shadow-lg">
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PayFees; 