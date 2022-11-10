import React, { useEffect, useState } from "react";

function Msg({ msg }) {
  const [show, setShow] = useState(false);

  if(!show){
    setShow(true);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    { show } && (
      <div id="eMsg" className="alert alert-danger msg" role="alert">
        {msg}
      </div>
    )
  );
}

export default Msg;
