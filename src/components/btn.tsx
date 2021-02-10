import * as React from "react"

const Btn: React.FC<unknown> = () => {
  return (
    <button
      onClick={() => {
        console.log("click!")
      }}
    >
      click me
    </button>
  )
}

export default Btn
