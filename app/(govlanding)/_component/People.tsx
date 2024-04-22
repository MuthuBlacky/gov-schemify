import React from "react"

import styles from "./StyleSheet.module.css"

const People = () => {
  return (
    <div className="flex h-[70px]">
      <div className="flex">
        <div
          className={`rounded-full w-[60px] h-[60px] border-solid border-[4px] border-white`}
        >
          <img
            src={"/images/farmer1.png"}
            className={`w-full h-full rounded-full`}
          ></img>
        </div>
        <div
          className={`${styles.people_pic2} rounded-full w-[60px] h-[60px] ml-[-25px] border-solid border-[4px] border-white`}
        >
          <img
            src={"/images/farmer2.png"}
            className="w-full h-full rounded-full"
          ></img>
        </div>
        <div
          className={`${styles.people_pic3} rounded-full w-[60px] h-[60px] ml-[-25px] border-solid border-[4px] border-white`}
        >
          <img
            src={"/images/farmer3.png"}
            className="w-full h-full rounded-full"
          ></img>
        </div>
      </div>
      <p
        className={`${styles.benefits} ml-3 text-sm text-[#666666] text-muted-foreground`}
      >
        <span className="text-[#7C7C7C] text-2xl font-bold">17.1 M</span>
        <br />
        People Benefited
      </p>
    </div>
  )
}

export default People
