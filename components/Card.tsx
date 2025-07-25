import Image from './Image'
import Link from './Link'

// 卡片组件，接收标题、描述、图片、链接作为参数
const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    {/* 卡片主体加 group 类 */}
    <div
      className={`group ${imgSrc ? 'h-full' : ''} overflow-hidden rounded-2xl border-2 border-gray-200/60 transition-shadow hover:shadow-lg dark:border-gray-700/60 dark:hover:border-gray-200/50`}
    >
      {/* 图片区域，添加 group-hover:scale-105 和 transition-transform */}
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      {/* 卡片内容区域，内边距 */}
      <div className="p-6">
        {/* 标题 */}
        <h2 className="hover:text-primary-500 dark:hover:text-primary-400 mb-3 text-2xl leading-8 font-bold tracking-tight text-gray-700 transition-colors duration-150 dark:text-gray-200">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        {/* 描述文本 */}
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {/* Learn more 按钮 */}
        {href && (
          <Link
            href={href}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
