'use client'

import AboutLayout from "@/components/layout/AboutLayout"
import About from "@/components/modules/About/About"
import { Suspense, useEffect, useRef } from "react"

export default function AboutPage(){
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    const scrollToSection = (section) =>{
        sectionsRef.current[section]?.scrollIntoView({behavior: 'smooth'})
    }

    return(
        <Suspense fallback={<div>Loading...</div>}>
            <AboutLayout scrollHandler={scrollToSection}>
                <About sectionsRef={sectionsRef} />
            </AboutLayout>
        </Suspense>
    )
}