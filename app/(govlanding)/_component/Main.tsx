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
    <div className="grid grid-cols-1">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-2 sm:grid-cols-1 justify-between w-[40%]">
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
          Government of Tamil Nadu
        </p>
        <br />
        <p className={`${styles.ele} text-[#888888] text-sm`}>
          The government is not your salvation. The government is not your road
          to prosperity. Hard work, education will take you far beyond what any
          government program can ever promise
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
