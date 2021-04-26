import Container from './Container'

export default function Notice () {
  return (
    <Container id="notice">
      <div className="border-l-2 border-purple-300 pl-3 py-3 hover:border-purple-400">
        <h4 className="text-lg">ℹ Notice</h4>
        <p>이 봇과 이 봇의 제작자는 유튜브에서 &quot;Lofi Girl&quot;로 활동하는 &quot;ChilledCow&quot;와 아무런 관련이 없습니다.</p>
        <p>&quot;LofiGirl (이 봇)&quot;은 디스코드와 유튜브 스트리밍을 이어주는 기능만을 제공합니다.</p>
      </div>
    </Container>
  )
}
