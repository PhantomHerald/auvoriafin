import React from 'react'
import { Raleway } from 'next/font/google';
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  style: ["normal", "italic"],
});

const aboutspace = () => {
  return (
    <section className="section-2 mt-80 ">
       {/*    <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <div className="section-2-h1 col-span-2 text-center mb-8">
          <h2 className={`${raleway.className} text-[clamp(24px,5vw,72px)] h-100dvh w-100dvw` }>
            </h2>
          </div>
        </div>*/}
      </section>
  )
}

export default aboutspace;