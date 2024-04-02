"use client"

import React, { useEffect, useState } from "react"

import { trpc } from "@/app/_trpc/client"

const Schemes = () => {
  const [scheme, setScheme] = useState<string[]>([])
  const getScheme = trpc.scheme.getSchemes.useQuery()
  const allSchemes = getScheme.data
  useEffect(() => {
    const schemify = () => {
      setScheme(allSchemes == undefined ? [] : allSchemes!)
    }
    schemify()
  }, [allSchemes])
  return <div>{scheme.toString()}</div>
}

export default Schemes
