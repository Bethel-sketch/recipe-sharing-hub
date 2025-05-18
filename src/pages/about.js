// src/pages/about.js
import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Recipe Sharing Hub</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
        <p><Link href="/"><a>&larr; Back to Home</a></Link></p>
        <h1>About Recipe Sharing Hub</h1>
        <p>
          Recipe Sharing Hub is a community‐driven gallery built with Next.js and Supabase.
          Browse, submit, and delete recipes — no account required.  
          Markdown formatting, image support, and real‐time count make it fun and interactive.
        </p>
        <h2>Why we built this</h2>
        <ul>
          <li>Give everyone a simple way to share family recipes</li>
          <li>Learn modern full‐stack with Next.js + Supabase</li>
          <li>Experiment with client‐side fetching, API routes, and CSS styling</li>
        </ul>
      </main>
    </>
  )
}
