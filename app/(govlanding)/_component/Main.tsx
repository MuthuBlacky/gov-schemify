import React from "react"
import Image from "next/image"
import Link from "next/link"

import { currentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"

import People from "./People"
import styles from "./StyleSheet.module.css"

const Main = async () => {
  const user = await currentUser()
  return (
    <div>
      <div className="flex justify-between w-[37%]">
        <Image
          src={"/images/womens.jpg"}
          width={200}
          height={200}
          alt="womens"
          className={`${styles.women}`}
        ></Image>
        <People />
      </div>
      <div className="w-6/12 mt-14">
        <p
          className={`${styles.scheme_desc} text-[#474747] text-3xl font-semibold`}
        >
          Dui elit nascetur enim feugiat in nibh at amet.
        </p>
        <br />
        <p className={`${styles.ele} text-[#888888] text-sm`}>
          Imperdiet ultrices vitae aliquet vitae tortor viverra. Et tellus cras
          amet quis lacus ullamcorper elit mi sit. Non sed urna diam tempor et
          diam. Imperdiet ultrices vitae aliquet vitae tortor viverra. Et tellus
          cras amet quis lacus ullamcorper elit mi sit. Non sed urna diam tempor
          et diam.
        </p>
      </div>
      <div
        className={`${styles.big_farmer} w-[70%] h-[85vh] bg-cover bg-no-repeat absolute bg-center top-24 right-8`}
      >
        <img className="w-full h-full" src="/images/cowWithFarmer.png"></img>
      </div>
      <div className="absolute bottom-7 right-[22%]">
        <Image
          src={"/images/grandfather.png"}
          width={250}
          height={250}
          alt="grandfather"
          className={`${styles.ele}`}
        ></Image>
      </div>
    </div>
  )
}

export default Main
