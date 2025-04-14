export const useSvgPaths = async (svgName: string): Promise<{ d: string[], viewBox: string }> => {
    try {
      const response = await fetch(`/cards/${svgName}.svg`)
      const text = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'image/svg+xml')
  
      const svg = doc.querySelector('svg')
      const viewBox = svg?.getAttribute('viewBox') || '0 0 200 200'
  
      const paths = Array.from(doc.querySelectorAll('path'))
        .map((path) => path.getAttribute('d') || '')
  
      return { d: paths, viewBox }
    } catch (err) {
      console.error(`Error loading SVG: ${svgName}`, err)
      return { d: [], viewBox: '0 0 200 200' }
    }
  }
  