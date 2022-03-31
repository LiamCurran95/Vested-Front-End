import { useState } from "react";

export default function Collapse ({children}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((visibility) => {return  !visibility})
  }

  return (
    <>
    <button className="collapse" onClick={handleClick}> {isVisible? "Hide portfolios" : "Show portfolios"} </button>
    {isVisible && children}
    </>
  )


}