// lib/search/tokenizer.ts
export function tokenize(text: string): string[] {
  const s = (text || '').toLowerCase()

  // 先按非字母数字汉字切开
  const parts = s.split(/[^0-9a-z\u4e00-\u9fa5]+/).filter(Boolean)

  const tokens: string[] = []

  for (const p of parts) {
    const hasChinese = /[\u4e00-\u9fa5]/.test(p)

    if (!hasChinese) {
      // 英文/数字：直接作为 token
      tokens.push(p)
      continue
    }

    // 中文：做 2-gram（你也可以改 3-gram）
    const chars = Array.from(p)
    if (chars.length === 1) {
      tokens.push(p)
    } else {
      for (let i = 0; i < chars.length - 1; i++) {
        tokens.push(chars[i] + chars[i + 1])
      }
    }
  }

  return tokens
}
