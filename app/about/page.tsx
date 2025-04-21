'use client'

import Layout from "@/components/layout/Layout"
import ProjectLayout from "@/components/layout/ProjectLayout"
import About from "@/components/modules/About/About"
import Project from "@/components/modules/Project/Project"

export default function AboutPage(){
    return(
        <ProjectLayout>
            <About />
        </ProjectLayout>
    )
}