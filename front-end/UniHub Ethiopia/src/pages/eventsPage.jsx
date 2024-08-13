// function EventsPage() {
//   return (
//     <div>
//       <h1>Events</h1>
//       {/* Add your content here */}
//     </div>
//   );
// }

export default EventsPage;

// export default function EventsPage() {
//   return (
//     <div className="relative">
//       {/* Banner Section */}
//       <div className="h-64 bg-banner-image bg-cover bg-center relative">
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-0">
//           <h1 className="text-white text-4xl font-bold">
//             Festivals of Black Arts & Ideas 2024 Schedule
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// }
function EventsPage() {
  return (
    <div>
      <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg')" }}>
        <h1 className="absolute bottom-0 left-0 p-8 text-4xl font-bold text-white">Festivals of Black Arts & Ideas 2024 Schedule</h1>
      </div>
      
      <div className="pt-16">
        {/* Your events list here */}
      </div>
    </div>
  );
}

