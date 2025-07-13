import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

// 头部导航栏组件
const Header = () => {
  // 设置头部样式类，包含背景色、内边距等
  let headerClass = 'flex items-center w-full bg-white dark:bg-midnight justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50' // 如果开启吸顶导航，增加 sticky 和 z-index
  }

  return (
    <header className={headerClass}>
      {/* 左侧 Logo 和标题 */}
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {/* 如果标题是字符串则显示，否则直接渲染（支持自定义节点） */}
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block text-gray-700 dark:text-gray-200" >
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      {/* 右侧导航链接、搜索、主题切换、移动端菜单 */}
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        {/* 导航链接区域，超出可横向滚动，响应式最大宽度 */}
        <div className="no-scrollbar hidden max-w-80 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/') // 过滤掉首页链接
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-bold text-gray-700 dark:text-gray-200"
              >
                {link.title}
              </Link>
            ))}
        </div>
        {/* 搜索按钮 */}
        <SearchButton />
        {/* 主题切换按钮 */}
        <ThemeSwitch />
        {/* 移动端菜单 */}
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
