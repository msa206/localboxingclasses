import React from 'react'

export default function MarkdownContent({ content }: { content: string }) {
  // Split content by lines for processing
  const lines = content.trim().split('\n')
  const elements: React.JSX.Element[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | null = null
  let key = 0

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType
      elements.push(
        <ListTag key={`list-${key++}`} className={ListTag === 'ul' ? 'list-disc list-inside text-gray-600 space-y-2 mb-6' : 'list-decimal list-inside text-gray-600 space-y-2 mb-6'}>
          {currentList.map((item, i) => {
            // Handle bold text within list items
            if (item.includes('**')) {
              const parts = item.split('**')
              const content = parts.map((part, j) => {
                if (j % 2 === 1) {
                  return <strong key={j} className="font-bold text-black">{part}</strong>
                }
                return part
              })
              return <li key={i}>{content}</li>
            }
            return <li key={i}>{item}</li>
          })}
        </ListTag>
      )
      currentList = []
      listType = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip empty lines
    if (!line.trim()) {
      flushList()
      continue
    }

    // H1
    if (line.startsWith('# ')) {
      flushList()
      elements.push(
        <h1 key={`h1-${key++}`} className="text-4xl font-bold text-black mb-6 mt-12 first:mt-0">
          {line.slice(2)}
        </h1>
      )
    }
    // H2
    else if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={`h2-${key++}`} className="text-2xl font-bold text-black mb-4 mt-8">
          {line.slice(3)}
        </h2>
      )
    }
    // H3
    else if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={`h3-${key++}`} className="text-xl font-bold text-black mb-3 mt-6">
          {line.slice(4)}
        </h3>
      )
    }
    // List items
    else if (line.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      currentList.push(line.slice(2))
    }
    // Bold text paragraphs
    else if (line.includes('**')) {
      flushList()
      const parts = line.split('**')
      const content = parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="font-bold text-black">{part}</strong>
        }
        return part
      })
      elements.push(
        <p key={`p-${key++}`} className="text-gray-600 mb-4">
          {content}
        </p>
      )
    }
    // Regular paragraphs
    else {
      flushList()
      elements.push(
        <p key={`p-${key++}`} className="text-gray-600 mb-4">
          {line}
        </p>
      )
    }
  }

  // Flush any remaining list
  flushList()

  return (
    <div className="prose max-w-none">
      {elements}
    </div>
  )
}