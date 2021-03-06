import Container from '../components/Container'
import Image from 'next/image'
import Head from 'next/head'
import { config, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

export default function LogoBar () {
  return (
    <Container id="logo">
      <Head>
        <title>LofiGirl - 📻 24/7 radio player for discord</title>
        <style>{dom.css()}</style>
      </Head>
      <div className="flex gap-4">
        <div>
          <Image src="/logo.png" width="85" height="85" priority/>
        </div>
        <div>
          <h3 className="text-5xl font-bold">LofiGirl</h3>
          <h5 className="text-3xl font-thin"><FontAwesomeIcon icon={faBroadcastTower}/> 24/7 radio player for discord</h5>
        </div>
      </div>
    </Container>
  )
}
