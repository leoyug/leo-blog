import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    // max-w-2xl 和 xl:max-w-4xl 让内容区整体变窄，mx-auto 居中
    // px-4/sm:px-6/xl:px-0 控制不同屏幕下的左右内边距
    <section className="mx-auto max-w-2xl px-4 sm:px-6 xl:max-w-4xl xl:px-0">
      {children}
    </section>
  )
}
