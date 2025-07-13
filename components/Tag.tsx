import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  asSpan?: boolean // 新增参数，控制是否渲染为 span
}

const Tag = ({ text, asSpan = false }: Props) => {
  const content = text.split(' ').join('-')
  if (asSpan) {
    return <span className="text-primary-500 mr-3 text-sm font-medium uppercase">{content}</span>
  }
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {content}
    </Link>
  )
}

export default Tag
