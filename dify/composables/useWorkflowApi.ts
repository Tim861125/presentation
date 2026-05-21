const BASE = 'http://localhost/v1'
const KEY = 'app-rkKYlZ4HyQmnN5Bj0EaYp9Cd'

export const headers = () => ({
  'Authorization': `Bearer ${KEY}`,
  'Content-Type': 'application/json',
})

export async function runBlocking(question: string) {
  const res = await fetch(`${BASE}/workflows/run`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      inputs: { user_question: question },
      response_mode: 'blocking',
      user: 'Tim',
    }),
  })
  return res.json()
}

export async function runStreaming(
  question: string,
  onChunk: (text: string) => void,
  onEvent: (type: string, data: any) => void,
  signal: AbortSignal,
) {
  const res = await fetch(`${BASE}/workflows/run`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      inputs: { user_question: question },
      response_mode: 'streaming',
      user: 'Tim',
    }),
    signal,
  })

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  let currentEvent = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      if (line.startsWith('event:')) { currentEvent = line.slice(6).trim(); continue }
      if (!line.startsWith('data:')) continue
      if (currentEvent === 'ping') continue
      try {
        const parsed = JSON.parse(line.slice(5).trim())
        onEvent(currentEvent, parsed)
        if (currentEvent === 'text_chunk' && parsed.data?.text) onChunk(parsed.data.text)
      } catch {}
    }
  }
}

export async function getInfo() {
  const res = await fetch(`${BASE}/info`, { headers: headers() })
  return res.json()
}

export async function getParameters() {
  const res = await fetch(`${BASE}/parameters`, { headers: headers() })
  return res.json()
}

export async function getLogs() {
  const res = await fetch(`${BASE}/workflows/logs?limit=5`, { headers: headers() })
  return res.json()
}

export async function getRun(runId: string) {
  const res = await fetch(`${BASE}/workflows/run/${runId}`, { headers: headers() })
  return res.json()
}
