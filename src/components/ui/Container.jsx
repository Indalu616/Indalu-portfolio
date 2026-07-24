import { cn } from '../../utils/cn'

/** Centers and constrains content width with consistent horizontal padding across breakpoints. */
export default function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 2xl:max-w-[1600px]', className)} {...props}>
      {children}
    </Tag>
  )
}
