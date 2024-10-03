import bacarrat_table from "../../../assets/img/baccarat_table.png"

// import React, { useState } from 'react'; // Import useState
// import { useNavigate, Outlet } from 'react-router-dom';
// import Tableimg1 from '../../../assets/img/Table-layout.png';
// import Tableimg2 from '../../../assets/img/Table-layout.png';
// import Tableimg3 from '../../../assets/img/Table-layout.png';
// import Tableimg4 from '../../../assets/img/Table-layout.png';

// const LocationOverviewPage = () => {
//   const [isVisible, setIsVisible] = useState(true); // State to control visibility
//   const navigate = useNavigate();

//   const tableImages = [
//     { src: Tableimg1, buttonText: 'MGF', route: 'locationOverviewmgf' },
//     { src: Tableimg2, buttonText: 'HIGH LIMIT', route: 'locationOverviewHL' },
//     { src: Tableimg3, buttonText: 'VIP', route: 'locationOverviewvip' },
//     { src: Tableimg4, buttonText: 'OTG', route: 'locationOverviewotg' }
//   ];

//   const handleButtonClick = (route, text) => {
//     setIsVisible(false); // Hide the parent component
//     navigate(route, { state: { buttonText: text } }); // Navigate to the corresponding route
//   };

//   return (
//     <div className="relative flex flex-col items-center h-[600px]">
//       {isVisible ? (
//         <div className="relative flex justify-center items-center w-full h-full">
//           <div className="w-3/4 h-3/4 grid grid-cols-2 gap-4 bg-opacity-50 p-4 rounded-lg">
//             {tableImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative flex items-center justify-center h-full bg-no-repeat bg-center bg-contain"
//                 style={{
//                   backgroundImage: `url(${image.src})`,
//                   width: '230px',
//                   height: '230px'
//                 }}
//               >
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <span className="text-white text-lg font-bold mb-2">{image.buttonText}</span>
//                   <button 
//                     className="px-4 py-2 text-white rounded"
//                     onClick={() => handleButtonClick(image.route, image.buttonText)}
//                   >
//                     {image.buttonText}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p> // Optional: Display a loading message or other UI while hidden
//       )}
//       <Outlet /> {/* This will render child routes */}
//     </div>
//   );
// };

// export default LocationOverviewPage;

import React from 'react'

function LocationOverviewPage() {
  return (
    <div><img src={bacarrat_table} alt="baccarat-table" className="h-[300px]" /></div>
  )
}

export default LocationOverviewPage