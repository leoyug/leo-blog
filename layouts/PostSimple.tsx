import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Tag from '@/components/Tag'
import Toc from '@/components/TOCinline' // 顶部引入目录组件

// 布局组件的参数类型
interface LayoutProps {
  content: CoreContent<Blog> // 文章内容对象
  children: ReactNode // 文章正文内容
  next?: { path: string; title: string } // 下一篇文章
  prev?: { path: string; title: string } // 上一篇文章
}

// 文章详情页布局组件
export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags = [], toc = [] } = content

  return (
    // 页面内容容器，控制最大宽度和居中
    <SectionContainer>
      {/* 返回顶部和评论锚点按钮 */}
      <ScrollTopAndComment />
      <article>
        {/* 主体区域左右布局：左正文，右目录 */}
        <div className="flex flex-col gap-8 xl:flex-row">
          {/* 左侧正文内容 */}
          <div className="min-w-0 flex-1">
            {/* 文章头部信息 */}
            <header>
              <div className="space-y-2 pb-0 text-left md:space-y-5">
                {/* 文章标题 */}
                <div>
                  <PageTitle>
                    <span className="text-4xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100">
                      {title}
                    </span>
                  </PageTitle>
                </div>
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    {/* 文章发布日期和标签 */}
                    <dd className="flex items-center gap-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time className="text-sm" dateTime={date}>
                        {formatDate(date, siteMetadata.locale)}
                      </time>
                      {/* 竖线分隔符 */}
                      {tags.length > 0 && <span className="select-none">｜</span>}
                      {/* 文章标签 */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </header>
            {/* 主体内容区域 */}
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
              {/* 正文内容 */}
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              </div>
              {/* 评论区（如果开启） */}
              {siteMetadata.comments && (
                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
              {/* 页脚：上一篇/下一篇导航 */}
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {/* 上一篇 */}
                  {prev && prev.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${prev.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        前一篇： {prev.title}
                      </Link>
                    </div>
                  )}
                  {/* 下一篇 */}
                  {next && next.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${next.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Next post: ${next.title}`}
                      >
                        后一篇： {next.title}
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
          {/* 右侧大纲目录，仅在 xl 及以上屏幕显示，md及以下和移动端都隐藏 */}
          {toc.length > 0 && (
            <aside className="hidden flex-shrink-0 xl:block xl:w-48">
              {/* 原 xl:w-64 改为 xl:w-48，宽度缩小 */}
              <div className="sticky top-24">
                <Toc toc={toc} />
              </div>
            </aside>
          )}
        </div>
      </article>
    </SectionContainer>
  )
}
