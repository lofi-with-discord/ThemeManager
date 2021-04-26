import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEdit, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useRouter } from 'next/router'
import useSWR from 'swr'
import Button from './Button'
import Container from './Container'

interface ThemeData {
  id: number
  name: string
  url: string
}

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function ThemeList () {
  const router = useRouter()
  const { data, error }: { data?: ThemeData[], error?: any } = useSWR('/api/themes', fetcher)

  if (!data) return <div className="py-10 px-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 text-sm">잠시만 기다려 주세요</div>
  if (error) return <div className="py-10 px-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 text-sm">에러발생: {error}</div>

  return (
    <Container id="table">
      <h2 className="border-b-2 border-purple-300 inline-block text-2xl pb-0.5 pl-1 pr-5 mb-5">Theme Manager.</h2>
      <table className="text-center w-full">
        <thead>
          <tr className="font-bold border-gray-300 border-b">
            <th className="p-2">#</th>
            <th className="p-2">테마명</th>
            <th className="p-2">스트림주소</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((theme, key) => (
            <tr key={key} className="hover:bg-gray-200">
              <td className="p-2">{theme.id}</td>
              <td className="p-2">
                <a className="hover:text-blue-700 hover:underline" href={theme.url}>{theme.name}</a>
              </td>
              <td className="p-2">
                <a className="hover:text-blue-700 hover:underline" href={theme.url}>
                  <FontAwesomeIcon icon={faYoutube}/> {theme.url.replace('https://www.youtube.com/watch?v=', '')}
                </a>
              </td>
              <td>
                <div className="flex">
                  <div className="flex-auto">
                    <Button onClick={() => router.push('/edit/' + theme.id)} className="bg-blue-300 text-white">
                      <FontAwesomeIcon icon={faEdit}/> 수정
                    </Button>
                  </div>
                  <div className="flex-auto">
                    <Button onClick={() => router.push('/del/' + theme.id)} className="bg-red-300 text-white">
                      <FontAwesomeIcon icon={faTrash}/> 삭제
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4}>
              <div className="flex">
                <div className="flex-auto">
                  <Button onClick={() => router.push('/add')} className="mt-3 bg-green-300 text-white">
                    <FontAwesomeIcon icon={faPencilAlt}/> 추가
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
