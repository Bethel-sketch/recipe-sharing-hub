// src/pages/index.js
import Slider from 'react-slick'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useSWR, { mutate } from 'swr'
import Head from 'next/head'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data: recipes, error: recipesError } = useSWR('/api/recipes', fetcher)
  const { data: countData, error: countError } = useSWR('/api/recipes/count', fetcher)

  if (recipesError || countError) return <p>Failed to load data.</p>
  if (!recipes || !countData) return <p>Loading…</p>

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  }

  const handleDelete = async (id) => {
    await fetch(`/api/recipes/${id}`, { method: 'DELETE' })
    mutate('/api/recipes')
    mutate('/api/recipes/count')
  }

  return (
    <>
      <Head>
        <title>Recipe Sharing Hub</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Recipe Sharing Hub</h1>
            <p style={{ color: '#666' }}>{countData.count} recipes total</p>
          </div>
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a>About</a>
            </Link>
            <Link href="/submit" legacyBehavior>
              <a style={{
                padding: '0.5rem 1rem',
                background: '#FFC107',
                color: '#1a1a1a',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 500,
              }}>
                ➕ Submit a Recipe
              </a>
            </Link>
          </nav>
        </header>

        {recipes.length === 0 ? (
          <p>No recipes yet. Be the first!</p>
        ) : (
          <Slider {...settings}>
            {recipes.map((r) => (
              <div key={r.id} style={{ position: 'relative', padding: '1rem' }}>
                <button
                  onClick={() => handleDelete(r.id)}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: '#e07a5f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                >
                  Delete
                </button>

                <h2 style={{ marginBottom: '0.2rem' }}>{r.title}</h2>
                <p style={{
                  fontStyle: 'italic',
                  color: '#555',
                  marginTop: '-0.5rem',
                  marginBottom: '1rem',
                }}>
                  by {r.author || 'Anonymous'}
                </p>

                {r.image_url && (
                  <img
                    src={r.image_url}
                    alt={r.title}
                    style={{
                      width: '100%',
                      maxHeight: '280px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '1rem',
                    }}
                  />
                )}

                <p><strong>Ingredients:</strong> {r.ingredients}</p>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  <strong>Instructions:</strong>{' '}
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {r.instructions}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </main>
    </>
  )
}
