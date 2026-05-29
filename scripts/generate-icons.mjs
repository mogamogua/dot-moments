import { deflateSync } from 'zlib'
import { writeFileSync } from 'fs'

function uint32BE(n) {
  return Buffer.from([(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff])
}

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const t = Buffer.from(type)
  const crc = uint32BE(crc32(Buffer.concat([t, data])))
  return Buffer.concat([uint32BE(data.length), t, data, crc])
}

// Lerp between 3 color stops at t=[0, 0.5, 1]
function lerp3(a, b, c, t) {
  t = Math.max(0, Math.min(1, t))
  if (t < 0.5) return Math.round(a + (b - a) * t * 2)
  return Math.round(b + (c - b) * (t - 0.5) * 2)
}

function makePNG(size) {
  const raw = []
  const cx = size / 2, cy = size / 2, r = size * 0.34

  // gradient: #ce93d8 → #7b1fa2 → #311b92 (135deg = top-left to bottom-right diagonal)
  const stops = {
    r: [0xce, 0x7b, 0x31],
    g: [0x93, 0x1f, 0x1b],
    b: [0xd8, 0xa2, 0x92],
  }

  for (let y = 0; y < size; y++) {
    raw.push(0) // filter: none
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist <= r) {
        // diagonal gradient position 0→1
        const t = ((dx + dy) / (r * 2) + 0.5)
        raw.push(
          lerp3(stops.r[0], stops.r[1], stops.r[2], t),
          lerp3(stops.g[0], stops.g[1], stops.g[2], t),
          lerp3(stops.b[0], stops.b[1], stops.b[2], t),
          255,
        )
      } else {
        raw.push(0xe8, 0xe8, 0xe5, 0xff) // --bg color
      }
    }
  }

  const ihdr = Buffer.concat([uint32BE(size), uint32BE(size), Buffer.from([8, 6, 0, 0, 0])])
  const idat = deflateSync(Buffer.from(raw))

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

for (const size of [180, 192, 512]) {
  const path = `public/icon-${size}.png`
  writeFileSync(path, makePNG(size))
  console.log(`generated ${path}`)
}
