'use client'

import {
  IconCircle0,
  IconBrandGoogleFilled,
  IconStarFilled,
  IconStarHalfFilled,
} from '@tabler/icons-react'

const Header = () => {
  return (
    <header className="flex w-full justify-center pt-6">
      <div className="flex items-center gap-2 rounded-full">
        {/* Logo */}
        <div className="flex size-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
          <IconCircle0 />
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 rounded-full bg-gray-200/70 px-6 py-3 text-sm font-medium">
          <a href="#" className="text-neutral-600 hover:text-black">
            Approach
          </a>
          <a href="#" className="text-neutral-600 hover:text-black">
            Instructor
          </a>
          <a href="#" className="text-neutral-600 hover:text-black">
            Curriculum
          </a>
          <a href="#" className="text-neutral-600 hover:text-black">
            Pricing
          </a>
        </nav>

        {/* Button */}
        <button className="rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white hover:bg-gray-800 md:text-sm">
          Enroll Now
        </button>
      </div>
    </header>
  )
}

export default function HeroSectionFive() {
  return <section></section>
}
