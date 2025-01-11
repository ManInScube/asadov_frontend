'use client'
import Layout from "@/components/layout/Layout";
import Grid from "@/components/templates/grid/Grid";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [list, setList] = useState<any[]>([]);
  async function getList() {
    // const res = await fetch('http://localhost:1337/api/articles?populate=*');
    // const posts = await res.json();
    // // return { props: { posts } };
    // console.log(posts)
    // setProjects(posts.data)
    const [projectsResponse, articlesResponse] = await Promise.all([
        fetch('https://84.201.170.233/api/projects?populate=*'),
        fetch('https://84.201.170.233/api/articles?populate=*')
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