'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
const [position, setPosition] = useState({
x: 0,
y: 0,
})

useEffect(() => {
const handleMouseMove = (e: MouseEvent) => {
setPosition({
x: e.clientX,
y: e.clientY,
})
}


window.addEventListener('mousemove', handleMouseMove)

return () => {
  window.removeEventListener('mousemove', handleMouseMove)
}


}, [])

return (
<div
style={{
left: `${position.x}px`,
top: `${position.y}px`,
transform: 'translate(-50%, -50%)',
}}
className="pointer-events-none fixed z-[9999] h-52 w-52 rounded-full bg-[#C6A46C]/70 blur-[120px] transition-all duration-75"
/>
)
}
