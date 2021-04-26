import { useRouter } from 'next/router'

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import Container from '../components/Container'
import LogoBar from '../components/LogoBar'

export default function EditPage () {
  const router = useRouter()

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [auth, setAuth] = useState('')

  async function onSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { success, message } = await fetch('/api/themes', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        auth, name, url
      })
    }).then((res) => res.json())

    alert(message)
    if (success) router.push('/')
  }

  return (
    <>
      <LogoBar />
      <Container id="edit">
        <h1 className="text-lg font-bold">테마 추가</h1>
        <form onSubmit={onSubmit}>
          <p>테마 이름:</p>
          <input onChange={(ev) => setName(ev.target.value)} className="block w-60 px-2 mb-2 border bg-white shadow-sm rounded" type="text"/>

          <p>테마 주소:</p>
          <input onChange={(ev) => setUrl(ev.target.value)} className="block w-60 px-2 mb-2 border bg-white shadow-sm rounded" type="text"/>

          <button type="submit" className="p-2 mx-0.5 hover:shadow-none bg-blue-400 rounded shadow text-white cursor-pointer">
            <FontAwesomeIcon icon={faPencilAlt}/> 추가
          </button>

          <Link href="/">
            <button className="p-2 mx-0.5 hover:shadow-none bg-gray-400 rounded shadow text-white cursor-pointer">
              돌아가기
            </button>
          </Link>
          <input onChange={(ev) => setAuth(ev.target.value)} placeholder="관리 암호 입력" className="w-32 px-2 m-2 border bg-white shadow-sm rounded" type="password"/>
        </form>
      </Container>
    </>
  )
}
