import React from "react";

const EventCard = ({ event, onGetTickets }) => {

  const formatDate = (date) => {
    if (!date) return "Date TBA";
    return new Date(date).toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <img
        src={event.imageUrl || "https://via.placeholder.com/400"}
        alt={event.title}
        className="h-56 w-full object-cover"
      />

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">
          {event.title}
        </h3>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-1">
          📅 {formatDate(event.dateTime)}
        </p>

        {/* Venue */}
        <p className="text-sm text-gray-500 mb-3">
          📍 {event.venueName || "Sydney"}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
          {event.description}
        </p>

        {/* Footer */}
        <div className="mt-5 flex justify-between items-center">
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
            {event.sourceWebsite}
          </span>

          <button
            onClick={() => onGetTickets(event)}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
          >
            GET TICKETS
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventCard;