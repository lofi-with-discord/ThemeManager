import useSWR from 'swr'
import { useRouter } from 'next/router'

import Container from '../../components/Container'
import LogoBar from '../../components/LogoBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
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

  const [auth, setAuth] = useState('')

  if (typeof data === 'undefined') return <Container id="edit">테마 #{id}를 찾는중...</Container>
  if (error) return <Container id="edit">찾는중 에러: {error}</Container>
  if (!data[0]) return <Container id="edit">테마 #{id}를 찾을 수 없음</Container>

  async function onSubmit (event) {
    event.preventDefault()

    const res = await fetch('/api/themes/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ auth })
    }).then((res) => res.json())

    if (!res.success) return alert(res.message)
    else router.push('/')
  }

  return (
    <>
      <LogoBar />
      <Container id="edit">
        <h2 className="border-b-2 border-purple-300 inline-block text-2xl pb-0.5 pl-1 pr-5 mb-5">&quot;{data[0].name}&quot;를 삭제할까요?</h2>

        <form onSubmit={onSubmit}>
          <button type="submit">
            <Button className="bg-red-400 text-white">
              <FontAwesomeIcon icon={faTrash}/> 삭제
            </Button>
          </button>

          <Link href="/">
            <Button className="bg-gray-300 inline">
              돌아가기
            </Button>
          </Link>
          <input onChange={(ev) => setAuth(ev.target.value)} placeholder="관리 암호 입력" className="w-32 px-2 m-2 border bg-white shadow-sm rounded" type="password"/>
        </form>
      </Container>
    </>
  )
}
