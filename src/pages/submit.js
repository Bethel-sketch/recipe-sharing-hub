// src/pages/submit.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Submit() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!title || !ingredients || !instructions) {
      setError('Please fill in title, ingredients, and instructions.')
      return
    }
    setLoading(true)
    try {
      // fire-and-forget POST; assume success if no network error
      await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          ingredients,
          instructions,
          image_url: imageUrl,
          author: author || 'Anonymous'
        })
      })
      // redirect immediately
      router.push('/')
    } catch (err) {
      console.error('Network error:', err)
      setError('Submit failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }  

  return (
    <>
      <Head>
        <title>Submit a New Recipe</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'Inter, sans-serif', background: '#FEF7EC' }}>
        <p><Link href="/">&larr; Back to Home</Link></p>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Submit a New Recipe</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Title */}
          <label style={{ display: 'block', marginBottom: '.75rem' }}>
            Title
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="🍰 My Epic Cake"
              style={{ width: '100%', padding: '.5rem', marginTop: '.25rem' }}
            />
          </label>

          {/* Ingredients */}
          <label style={{ display: 'block', marginBottom: '.75rem' }}>
            Ingredients
            <textarea
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              placeholder="List each ingredient on its own line"
              rows={4}
              style={{ width: '100%', padding: '.5rem', marginTop: '.25rem' }}
            />
          </label>

          {/* Instructions */}
          <label style={{ display: 'block', marginBottom: '.75rem' }}>
            Instructions
            <textarea
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="Step by step..."
              rows={4}
              style={{ width: '100%', padding: '.5rem', marginTop: '.25rem' }}
            />
          </label>

          {/* Image URL */}
          <label style={{ display: 'block', marginBottom: '.75rem' }}>
            Image URL (optional)
            <input
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{ width: '100%', padding: '.5rem', marginTop: '.25rem' }}
            />
          </label>

          {/* Author */}
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Your Name (optional)
            <input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="e.g. Jane Doe"
              style={{ width: '100%', padding: '.5rem', marginTop: '.25rem' }}
            />
          </label>

          {error && <p style={{ color: '#d64545', marginBottom: '1rem' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '.75rem 1.5rem',
              background: '#FFC107',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Submitting…' : 'Submit Recipe'}
          </button>
        </form>
      </main>
    </>
  )
}
