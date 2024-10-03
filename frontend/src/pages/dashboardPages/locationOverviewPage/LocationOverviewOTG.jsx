import React, { useState } from 'react';

import Tableimg1 from '../assets/img/Table-layout.png';
import Tableimg2 from '../assets/img/Table-layout.png';
import Tableimg3 from '../assets/img/Table-layout.png';
import Tableimg4 from '../assets/img/Table-layout.png';
import Tableimg5 from '../assets/img/Table-layout.png';
import Tableimg6 from '../assets/img/Table-layout.png';
import Tableimg7 from '../assets/img/Table-layout.png';
import Tableimg8 from '../assets/img/Table-layout.png';
import Tableimg9 from '../assets/img/Table-layout.png';
import Modal from '../modal/ModalLocationTable'; // Import the Modal component

function LocationOverviewOTG() {
  // State for modal visibility and content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // Click handler for buttons
  const handleButtonClick = (buttonText) => {
    setModalContent({
      title: buttonText,
      description: `Used 10 and Unused 10 for ${buttonText}`
    });
    setIsModalOpen(true); // Show the modal
  };

  // Click handler for closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Hide the modal
  };

  // Array of images and button text
  const tableImages = [
    { src: Tableimg1, text: 'OTG1' },
    { src: Tableimg2, text: 'OTG2' },
    { src: Tableimg3, text: 'OTG3' },
    { src: Tableimg4, text: 'OTG4' },
    { src: Tableimg5, text: 'OTG5' },
    { src: Tableimg6, text: 'OTG6' },
    { src: Tableimg7, text: 'OTG7' },
    { src: Tableimg8, text: 'OTG8' },
    { src: Tableimg9, text: 'OTG9' },
  ];

  return (
    <div className="relative space-y-4 font-Inter w-[980px] mx-auto">
      <div className="flex">
        {/* Right Side with Grid Layout */}
        <div className="w-[740px] h-[800px] p-4 ml-1 grid grid-cols-4 grid-rows-4 gap-x-72 gap-y-20">
          {tableImages.map((image, index) => (
            <button
              key={index}
              className="relative flex items-center justify-center bg-no-repeat bg-center bg-cover w-[220px] h-[220px]"
              style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
              onClick={() => handleButtonClick(image.text)}
            >
              <span className="absolute text-white text-lg font-bold">
                {image.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={modalContent}
      />
    </div>
  );
}

export default LocationOverviewOTG;
    