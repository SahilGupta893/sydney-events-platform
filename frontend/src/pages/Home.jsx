// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import EventCard from "../components/EventCard";
// import TicketModal from "../components/TicketModal";

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//   axios.get("http://localhost:5002/api/events")
//     .then(res => {
//       console.log(res.data);   // 🔥 keep this temporarily
//       setEvents(res.data);
//     })
//     .catch(err => console.error(err));
// }, []);

//   const handleGetTickets = (event) => {
//     setSelectedEvent(event);
//   };

//   return (

//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Sydney Events</h1>

//       <div className="flex justify-between items-center mb-6">
//   <h1 className="text-3xl font-bold">Sydney Events</h1>

//   <a
//     href="/dashboard"
//     className="bg-black text-white px-4 py-2 rounded-lg"
//   >
//     Go to Dashboard
//   </a>
// </div>

// <div className="flex justify-between items-center mb-6">
//   <h1 className="text-3xl font-bold">Sydney Events</h1>

//   <a
//     href="http://localhost:5002/auth/google"
//     className="bg-black text-white px-4 py-2 rounded-lg"
//   >
//     Admin Login
//   </a>
// </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <EventCard
//             key={event._id}
//             event={event}
//             onGetTickets={handleGetTickets}
//           />
//         ))}
//       </div>

//       {selectedEvent && (
//         <TicketModal
//           event={selectedEvent}
//           onClose={() => setSelectedEvent(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import EventCard from "../components/EventCard";

// const Home = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5002/api/events")
//       .then(res => setEvents(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* HERO */}
//       <div className="bg-black text-white py-16 text-center">
//         <h1 className="text-4xl font-bold">
//           Discover Events in Sydney
//         </h1>
//         <p className="mt-4 text-gray-300">
//           Automatically updated from multiple sources
//         </p>

//         <a
//           href="http://localhost:5002/auth/google"
//           className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-lg font-medium"
//         >
//           Admin Login
//         </a>
//       </div>

//       {/* EVENTS GRID */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <h2 className="text-2xl font-semibold mb-8">
//           Upcoming Events
//         </h2>

//         {events.length === 0 ? (
//           <p>No events found.</p>
//         ) : (
//           <div className="grid md:grid-cols-3 gap-8">
//             {events.map(event => (
//               <EventCard
//                 key={event._id}
//                 event={event}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const eventsPerPage = 6;

//   useEffect(() => {
//     axios
//       .get("http://localhost:5002/api/events")
//       .then((res) => setEvents(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const indexOfLast = currentPage * eventsPerPage;
//   const indexOfFirst = indexOfLast - eventsPerPage;
//   const currentEvents = events.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(events.length / eventsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <div className="bg-black text-white py-10 px-8 flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Sydney Events</h1>

//         <div className="space-x-4">
//           <a
//             href="http://localhost:5002/auth/google"
//             className="bg-white text-black px-4 py-2 rounded"
//           >
//             Admin Login
//           </a>

//           <Link to="/dashboard" className="bg-gray-700 px-4 py-2 rounded">
//             Dashboard
//           </Link>
//         </div>
//       </div>

//       {/* EVENTS */}
//       <div className="max-w-6xl mx-auto p-8">
//         <h2 className="text-2xl font-semibold mb-6">All Events</h2>

//         {events.length === 0 ? (
//           <p>No events found</p>
//         ) : (
//           <div className="grid md:grid-cols-3 gap-6">
//             {events.map((event) => (
//               <div key={event._id} className="bg-white rounded-xl shadow p-4">
//                 <img
//                   src={event.imageUrl}
//                   alt={event.title}
//                   className="h-40 w-full object-cover rounded"
//                 />

//                 <h3 className="mt-3 font-semibold">{event.title}</h3>

//                 <p className="text-sm text-gray-500">
//                   {event.dateTime
//                     ? new Date(event.dateTime).toLocaleString()
//                     : "Date TBA"}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   {event.venueName || "Sydney"}
//                 </p>

//                 <p className="text-sm text-gray-600 mt-2 line-clamp-2">
//                   {event.description}
//                 </p>

//                 <a
//                   href={event.originalUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="mt-3 inline-block bg-black text-white px-4 py-2 rounded text-sm"
//                 >
//                   GET TICKETS
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="flex justify-center mt-10 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-4 py-2 rounded-lg ${
//               currentPage === i + 1 ? "bg-black text-white" : "bg-white border"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import TicketModal from "../components/TicketModal";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight">
          Discover Events in Sydney
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Automatically aggregated and updated from multiple sources
        </p>
      </div>

      {/* EVENTS GRID */}
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-8">
            {currentEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onGetTickets={(event) => setSelectedEvent(event)}
              />
            ))}
          </div>

          {/* PAGINATION (only show if more than 1 page) */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* TICKET MODAL */}
          {selectedEvent && (
            <TicketModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
