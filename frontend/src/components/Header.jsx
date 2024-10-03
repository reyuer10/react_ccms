import React, { useState } from "react";

function Header() {
  const token = sessionStorage.getItem("token");
  const data = JSON.parse(token);
  const [user] = useState(data.data);

  return (
    <div className="w-full bg-secondary-background p-4 text-text-color font-inter flex justify-between">
      <div className="text-xl">Page</div>
      <div className="text-lg">
        {user.login_fullname} - {user.login_username}
      </div>
    </div>
  );
}

export default Header;
