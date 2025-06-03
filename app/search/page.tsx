'use client'

import ProjectLayout from "@/components/layout/ProjectLayout"
import SearchGrid from "@/components/modules/SearchGrid/SearchGrid";
import { notFound } from 'next/navigation';

interface SearchParams {
  searchParams: {
    query?: string;
  };
}

export default async function AboutPage({ searchParams }: SearchParams){
    const query = searchParams.query;

    if (!query) return notFound();
    
    const [projectsRes] = await Promise.all([
      fetch(`https://testinscube.ru/api/projects?filters[$or][0][title][$containsi]=${encodeURIComponent(query.toUpperCase())}&filters[$or][1][title][$containsi]=${encodeURIComponent(query.toUpperCase())}&filters[$or][2][category][$containsi]=${encodeURIComponent(query.toLowerCase())}&populate=*`, { cache: 'no-store' }),
    ]);
  
    const [projectsData] = await Promise.all([
      projectsRes.json(),
    ]);
  
    const projects = projectsData.data || [];

    console.log(projects)
    return(
        <ProjectLayout>
            <SearchGrid items={projects}/>
        </ProjectLayout>
    )
}