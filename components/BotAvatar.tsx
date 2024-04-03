"use client"

import React from "react"
import Image from "next/image"

import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8 items-center justify-center bg-gray-300">
      <img src="/images/logoRound.png" alt="logo" className="w-full h-full"  />
    </Avatar>
  )
}
