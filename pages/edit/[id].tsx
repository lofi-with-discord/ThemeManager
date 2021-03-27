import useSWR from 'swr'
import { useRouter } from 'next/router'

import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import Link from 'next/link'

interface ThemeData {
  id: number
  name: string
  url: string
}

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function EditPage () {
  const router = useRouter()
  const { id } = router.query
  const { data, error }: { data?: ThemeData[], error?: any } = useSWR('/api/themes/' + id, fetcher)

  const [name, setName] = useState(data?.[0]?.name)
  const [url, setUrl] = useState(data?.[0]?.url)
  const [auth, setAuth] = useState('')

  if (typeof data === 'undefined') return <h1>테마 #{id}를 찾는중...</h1>
  if (error) return <h1>찾는중 에러: {error}</h1>
  if (!data[0]) return <h1>테마 #{id}를 찾을 수 없음</h1>

  async function onSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { success, message } = await fetch('/api/themes/' + id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        auth, name: name || data[0].name, url: url || data[0].url
      })
    }).then((res) => res.json())

    alert(message)
    if (success) router.push('/')
  }

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold">&quot;{data[0].name}&quot; 테마 편집</h1>
      <form onSubmit={onSubmit}>
        <p>고유 번호:</p>
        <input className="block w-60 px-2 mb-2 border bg-gray-100 shadow-sm rounded" type="text" value={data[0].id} disabled/>

        <p>테마 이름:</p>
        <input onChange={(ev) => setName(ev.target.value)} className="block w-60 px-2 mb-2 border bg-white shadow-sm rounded" type="text" value={name || data[0].name}/>

        <p>테마 주소:</p>
        <input onChange={(ev) => setUrl(ev.target.value)} className="block w-60 px-2 mb-2 border bg-white shadow-sm rounded" type="text" value={url || data[0].url}/>

        <button type="submit" className="p-2 mx-0.5 hover:shadow-none bg-blue-400 rounded shadow text-white cursor-pointer">
          <FontAwesomeIcon icon={faEdit}/> 적용
        </button>

        <Link href="/">
          <button className="p-2 mx-0.5 hover:shadow-none bg-gray-400 rounded shadow text-white cursor-pointer">
            돌아가기
          </button>
        </Link>
        <input onChange={(ev) => setAuth(ev.target.value)} placeholder="관리 암호 입력" className="w-32 px-2 m-2 border bg-white shadow-sm rounded" type="password"/>
      </form>
    </div>
  )
}
