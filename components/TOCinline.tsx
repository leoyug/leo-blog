'use client'

import React, { useEffect, useState } from 'react'

// 目录项类型定义
interface TocItem {
  value: string // 标题文本
  url: string // 跳转锚点
  depth: number // 层级（2=二级标题，3=三级标题等）
  children?: TocItem[] // 子级目录
}

// 组件 props 类型
interface TocProps {
  toc: TocItem[] // 目录数据数组
}

// 获取所有 toc 的 url 扁平化
function flattenToc(toc: TocItem[]): string[] {
  let urls: string[] = []
  toc.forEach((item) => {
    urls.push(item.url)
    if (item.children) {
      urls = urls.concat(flattenToc(item.children))
    }
  })
  return urls
}

const Toc: React.FC<TocProps> = ({ toc }) => {
  const [activeHash, setActiveHash] = useState<string>('')

  useEffect(() => {
    if (!toc || toc.length === 0) return

    // 获取所有锚点
    const headings = flattenToc(toc)
      .map((url) => document.getElementById(url.replace(/^#/, '')))
      .filter(Boolean) as HTMLElement[]

    function onScroll() {
      let currentId = ''
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i]
        // 这里的 120 可根据你的布局适当调整
        if (heading.getBoundingClientRect().top - 120 <= 0) {
          currentId = heading.id
        } else {
          break
        }
      }
      setActiveHash(currentId ? `#${currentId}` : '')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // 初始化

    return () => window.removeEventListener('scroll', onScroll)
  }, [toc])

  // 递归渲染目录
  const renderToc = (items: TocItem[]) => (
    <ul className="border-l border-gray-200 pl-2 dark:border-gray-700">
      {items.map((item) => {
        const isActive = activeHash === item.url
        return (
          <li
            key={item.url}
            className="mb-2"
            style={{
              marginLeft: `${(item.depth - 2) * 8}px`, // depth=2无缩进，depth=3缩进16px，依次类推
            }}
          >
            <a
              href={item.url}
              className={`max-w block truncate text-sm ${
                isActive
                  ? 'text-primary-500 font-bold'
                  : item.depth === 2
                    ? 'font-bold'
                    : 'font-normal'
              } hover:text-primary-500`}
              style={
                item.depth > 2
                  ? {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                    }
                  : undefined
              }
              title={item.value}
            >
              {item.value}
            </a>
            {/* 递归渲染子目录 */}
            {item.children && item.children.length > 0 && renderToc(item.children)}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav aria-label="页面目录" className="text-sm text-gray-700 dark:text-gray-300">
      <div className="mb-3 font-semibold">目录</div>
      {renderToc(toc)}
    </nav>
  )
}

export default Toc
