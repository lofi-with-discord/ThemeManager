interface Props {
  children: any
  id: string
}

export default function Container ({ children, id }: Props) {
  return (
    <section id={id} className="py-10 px-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 text-sm">
      { children }
    </section>
  )
}
