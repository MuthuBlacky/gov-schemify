"use client"

import axios from "axios"

const Sample = async () => {
  const message = [{ role: "system", content: "hello" }]
  console.log("hello")
  const meaningfullSchemes = await axios.post("/api/conversation", {
    messages: message,
  })
  console.log(meaningfullSchemes)
  return <div>hi</div>
}
export default Sample
