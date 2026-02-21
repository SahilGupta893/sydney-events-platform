import React, { useState } from "react";
import axios from "axios";

const TicketModal = ({ event, onClose }) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !consent) {
      alert("Please enter email and give consent.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5002/api/tickets",
        {
          email,
          consent,
          eventId: event._id
        }
      );

      // Redirect to original event URL
      window.location.href = event.originalUrl;

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[420px] p-8 shadow-lg">

        <h2 className="text-xl font-semibold mb-4">
          Get Tickets
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {event.title}
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-lg p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Consent */}
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="checkbox"
            checked={consent}
            onChange={() => setConsent(!consent)}
          />
          <label className="text-sm text-gray-600">
            I agree to receive event updates.
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicketModal;