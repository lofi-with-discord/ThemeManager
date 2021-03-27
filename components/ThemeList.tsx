import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import useSWR from 'swr'

interface ThemeData {
  id: number
  name: string
  url: string
}

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function ThemeList () {
  const { data, error }: { data?: ThemeData[], error?: any } = useSWR('/api/themes', fetcher)

  if (!data) return <div className="py-10 px-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 text-sm">잠시만 기다려 주세요</div>
  if (error) return <div className="py-10 px-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 text-sm">에러발생: {error}</div>

  return (
    <div className="py-10 px-4 xl:px-64 lg:px-32 md:px-16 sm:px-8 text-sm">
      <h3>현재 적용된 리스트:</h3>
      <table className="my-3 text-center w-full bg-gray-100 shadow rounded-lg">
        <thead>
          <tr className="font-bold">
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
                <Link href={'/edit/' + theme.id}>
                  <div className="p-2 mx-0.5 hover:shadow-none bg-blue-400 rounded shadow text-white cursor-pointer">
                    <FontAwesomeIcon icon={faEdit}/> 수정
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="mt-3">
        <Link href="/new"><span className="p-2 hover:shadow-none bg-green-400 rounded shadow text-white cursor-pointer"><FontAwesomeIcon icon={faPlus}/> 추가</span></Link>
      </div> */}
    </div>
  )
}
