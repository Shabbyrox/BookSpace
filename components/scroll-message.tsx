"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function ScrollMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchQuotes = async () => {
        try {
          const res = await fetch("/api/quotes");
          const data = await res.json();

          if (Array.isArray(data) && data[0]?.q){
            setQuote(`${data[0].q} - ${data[0].a}`);
          } else {
            setQuote("Unable to fetch quote.")
          }
        } catch (error) {
          setQuote("Failed to fetch Quote.")
        }
      }
      fetchQuotes();
  }}, [isOpen]);

  return (
    <div className="relative w-full max-w-lg mx-auto py-10">
      {/* Scroll Container */}
      <div className="relative flex flex-col items-center">
        {/* Scroll wrapper with fixed size */}
        <div className="w-[400px] h-[280px] relative overflow-hidden">

          <AnimatePresence initial={false}>
            {!isOpen && (
              <motion.div
                key="closed"
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="cursor-pointer w-full h-full"
                onClick={() => setIsOpen(true)}
              >
                <Image
                  src="/closedscroll.png"
                  alt="Closed Scroll"
                  fill
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="open"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="origin-left w-full h-full relative cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src="/openscrollmessage.png"
                  alt="Open Scroll"
                  fill
                  className="object-contain"
                />

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center px-8"
                >
                  <p className="text-[#5d4037] text-center text-sm max-w-[80%] p-5">
                    {quote}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info Text */}
      {/*<p className="text-center text-white text-sm mt-4">Tap to open/close the ancient scroll</p>*/}
    </div>
  )
}
