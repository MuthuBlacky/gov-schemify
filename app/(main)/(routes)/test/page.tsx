"use client"

import React from "react"
import { usePromptStore } from "@/store"

const page = () => {
  const promt = usePromptStore().prompt
  return <div>{promt}</div>
}

export default page
