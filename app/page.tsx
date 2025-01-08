'use client'
import Layout from "@/components/layout/Layout";
import Grid from "@/components/templates/grid/Grid";
import { useEffect, useState } from "react";

export default function Home() {
  const [list, setList] = useState<any[]>([]);
  async function getList() {
    const [projectsResponse, articlesResponse] = await Promise.all([
        fetch('http://84.201.170.233:1337/api/projects?populate=*'),
        fetch('http://84.201.170.233:1337/api/articles?populate=*')
    ])

    const projects = await projectsResponse.json();
    const articles = await articlesResponse.json();

    const combined = [...projects.data, ...articles.data].sort(
        //@ts-ignore
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    console.log(combined)
    setList(combined)
  }

  useEffect(()=>{
    getList()
  },[])
    return (
    <Layout>
        <Grid items={list}/>
    </Layout>
    );
  }