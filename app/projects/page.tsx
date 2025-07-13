import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-4 md:space-y-5">
          <h1 className="text-4xl leading-8 font-bold tracking-tight text-gray-700 dark:text-gray-200">
            作品集
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            我参与设计的一些项目 (16 x 9)
          </p>
        </div>
        <div className="container py-10">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
