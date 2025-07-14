'use client' // Next.js 13+ 的指令，声明该组件只在客户端渲染

import { useEffect, useRef } from 'react'
// 引入 React 的 Hook

import { init, type WalineInstance, type WalineInitOptions } from '@waline/client'
// 引入 Waline 评论系统的初始化方法和类型

import '@waline/client/style'
// 引入 Waline 的样式

export type WalineOptions = Omit<WalineInitOptions, 'el'>
// 定义 WalineOptions 类型，等同于 WalineInitOptions 但去掉了 el 属性（el 由组件内部处理）

const WalineComment = (props: WalineOptions) => {
  // 用于保存 waline 实例的 ref
  const walineInstanceRef = useRef<WalineInstance | null>(null)
  // 用于获取评论容器 div 的 ref
  const containerRef = useRef<HTMLDivElement>(null)

  // 初始化 Waline 实例，只在组件挂载时执行一次
  useEffect(() => {
    walineInstanceRef.current = init({
      ...props, // 传入所有外部参数
      el: containerRef.current, // 挂载点为当前 div
      dark: '.dark', // 适配暗色模式，匹配 class 为 dark 的父元素
      requiredMeta: ['nick'], // 必填项，昵称
      pageview: process.env.NODE_ENV === 'production' // 仅生产环境统计浏览量
    })

    // 组件卸载时销毁 waline 实例，防止内存泄漏
    return () => walineInstanceRef.current?.destroy()
  }, [])

  // 当 props 变化时，更新 waline 配置
  useEffect(() => {
    walineInstanceRef.current?.update(props)
  }, [props])

  // 渲染评论容器，ref 绑定到 containerRef
  // @ts-ignore 忽略类型检查（通常是因为 Waline 的类型定义不完善）
  return <div id="waline" ref={containerRef} />
}

export default WalineComment