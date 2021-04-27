import { useRouter } from 'next/router'

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import Container from '../components/Container'
import LogoBar from '../components/LogoBar'
import Button from '../components/Button'

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
        <h2 className="border-b-2 border-purple-300 inline-block text-2xl pb-0.5 pl-1 pr-5 mb-5">테마 추가</h2>
        <form onSubmit={onSubmit}>
          <p>테마 이름:</p>
          <input onChange={(ev) => setName(ev.target.value)} className="block w-60 border bg-white shadow-sm px-2 py-1 mb-3" type="text"/>

          <p>테마 주소:</p>
          <input onChange={(ev) => setUrl(ev.target.value)} className="block w-60 border bg-white shadow-sm px-2 py-1 mb-3" type="text"/>

          <button type="submit">
            <Button className="bg-green-400 text-white">
              <FontAwesomeIcon icon={faPencilAlt}/> 추가
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
