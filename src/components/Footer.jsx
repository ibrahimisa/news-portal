import React from "react";

function Footer({ user, signOut }) {
  return (
    <div className="d-flex align-items-center justify-content-between px-4 py-1">
      <div className="d-flex align-items-center">
        <img src={user.photoURL} className="rounded-circle me-2 w-25" />
        <p>{user.displayName}</p>
      </div>
      <a href="" onClick={signOut}>
        SignOut
      </a>
    </div>
  );
}

export default Footer;
