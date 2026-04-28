import { useEffect } from 'react'
import { defaultSeo } from '../content/siteContent'

type PageSeoProps = {
  title: string
  description: string
}

function getMetaDescriptionTag() {
  const existingTag = document.querySelector('meta[name="description"]')

  if (existingTag instanceof HTMLMetaElement) {
    return existingTag
  }

  const tag = document.createElement('meta')
  tag.name = 'description'
  document.head.appendChild(tag)
  return tag
}

export default function PageSeo({ title, description }: PageSeoProps) {
  useEffect(() => {
    document.title = title || defaultSeo.title
    const metaDescription = getMetaDescriptionTag()
    metaDescription.content = description || defaultSeo.description
  }, [description, title])

  return null
}
