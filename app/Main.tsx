import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="text-gray-700 dark:text-gray-300">
        一个正在学代码的设计🐶的博客
        <span className="ml-2">
          <Link
            href={'https://photos.incessantleo.com'}
            target="_blank"
            className="animate-bounce text-primary-500 underline underline-offset-2 hover:text-primary-600 hover:no-underline dark:text-primary-500 dark:hover:text-primary-400"
          >
             &rarr;简历传送门
          </Link>
        </span>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-4">
        <div className="space-y-2 pt-6 pb-4 md:space-y-5">
          <h1 className="text-4xl  leading-8 font-bold tracking-tight text-gray-700 dark:text-gray-200">
            最近文章
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="mt-2">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  className="block p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/20 group transition-transform duration-150 transform hover:scale-101"
                >
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      {/* 左侧：时间 */}
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      {/* 右侧：内容 */}
                      <div className="space-y-2 xl:col-span-3">
                        <div className="space-y-2">
                          <div>
                            <h2 className="text-2xl text-gray-700 dark:text-gray-300 leading-8 font-bold tracking-tight group-hover:text-primary-500 transition-colors duration-150">
                              {title}
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} asSpan />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            全部文章 &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
