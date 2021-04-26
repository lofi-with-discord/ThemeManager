export default function Button ({ onClick = () => {}, className = '', children }: { onClick?: () => void, className: string, children: any }) {
  return (
    <div onClick={onClick} className={'p-2 mx-0.5 hover:shadow-lg shadow cursor-pointer ' + className}>
      {children}
    </div>
  )
}
