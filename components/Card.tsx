import Image from './Image'
import Link from './Link'

// 卡片组件，接收标题、描述、图片、链接作为参数
const Card = ({ title, description, imgSrc, href }) => (
  // 外层容器，设置最大宽度、内边距和响应式宽度
  <div className="md max-w-[544px] p-4 md:w-1/2">
    {/* 卡片主体，带圆角、边框、溢出隐藏 */}
    <div
      className={`${
        imgSrc && 'h-full'
      } overflow-hidden rounded-2xl border-2 border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg dark:hover:border-gray-200/50 transition-shadow`}
    >
      {/* 如果有图片，优先渲染图片区域 */}
      {imgSrc &&
        (href ? (
          // 如果有链接，图片可点击
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          // 没有链接时，图片不可点击
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      {/* 卡片内容区域，内边距 */}
      <div className="p-6">
        {/* 标题，2xl字号，粗体，紧跟下方有间距 */}
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            // 有链接时，标题可点击
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            // 没有链接时，普通文本
            title
          )}
        </h2>
        {/* 描述文本，灰色，底部有间距 */}
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {/* 如果有链接，显示 Learn more 按钮 */}
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
