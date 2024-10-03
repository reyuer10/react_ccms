import React, { useState } from 'react';

import Tableimg2 from '../assets/img/Table-layout.png';
import Tableimg3 from '../assets/img/Table-layout.png';
import Tableimg4 from '../assets/img/Table-layout.png';
import Tableimg5 from '../assets/img/Table-layout.png';
import Tableimg6 from '../assets/img/Table-layout.png';
import Tableimg7 from '../assets/img/Table-layout.png';
import Tableimg8 from '../assets/img/Table-layout.png';
import Tableimg9 from '../assets/img/Table-layout.png';
import Tableimg10 from '../assets/img/Table-layout.png';
import Modal from '../modal/ModalLocationTable'; // Import the Modal component

function LocationOverviewMGF() {
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
    { src: Tableimg2, text: 'MGF2' },
    { src: Tableimg3, text: 'MGF3' },
    { src: Tableimg4, text: 'MGF4' },
    { src: Tableimg5, text: 'MGF5' },
    { src: Tableimg6, text: 'MGF6' },
    { src: Tableimg7, text: 'MGF7' },
    { src: Tableimg8, text: 'MGF8' },
    { src: Tableimg9, text: 'MGF9' },
    { src: Tableimg10, text: 'MGF10' }
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

export default LocationOverviewMGF;
    