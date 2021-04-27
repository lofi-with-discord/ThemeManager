import useSWR from 'swr'
import { useRouter } from 'next/router'

import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import Container from '../../components/Container'
import LogoBar from '../../components/LogoBar'
import Button from '../../components/Button'

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

  if (typeof data === 'undefined') return <Container id="edit">테마 #{id}를 찾는중...</Container>
  if (error) return <Container id="edit">찾는중 에러: {error}</Container>
  if (!data[0]) return <Container id="edit">테마 #{id}를 찾을 수 없음</Container>

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
    <>
      <LogoBar />
      <Container id="edit">
        <h2 className="border-b-2 border-purple-300 inline-block text-2xl pb-0.5 pl-1 pr-5 mb-5">&quot;{data[0].name}&quot; 테마 편집</h2>
        <form onSubmit={onSubmit}>
          <p>고유 번호:</p>
          <input className="block w-60 px-2 py-1 mb-3 border bg-gray-100 shadow-sm" type="text" value={data[0].id} disabled/>

          <p>테마 이름:</p>
          <input onChange={(ev) => setName(ev.target.value)} className="block w-60 px-2 py-1 mb-3 border bg-white shadow-sm" type="text" value={name || data[0].name}/>

          <p>테마 주소:</p>
          <input onChange={(ev) => setUrl(ev.target.value)} className="block w-60 px-2 py-1 mb-3 border bg-white shadow-sm" type="text" value={url || data[0].url}/>

          <button type="submit">
            <Button className="bg-blue-400 text-white">
              <FontAwesomeIcon icon={faEdit}/> 적용
            </Button>
          </button>

          <Link href="/">
            <Button className="bg-gray-300 inline">
              돌아가기
            </Button>
          </Link>
          <input onChange={(ev) => setAuth(ev.target.value)} placeholder="관리 암호 입력" className="w-32 px-2 m-2 border bg-white shadow-sm" type="password"/>
        </form>
      </Container>
    </>
  )
}
