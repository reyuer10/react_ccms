import React from "react";

function LoginBackButton({ handleClosePopup, ScanId }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <label onClick={handleClosePopup} className="close-text">
          Back
        </label>
        
      </div>
    </div>
  );
}

export default LoginBackButton;
