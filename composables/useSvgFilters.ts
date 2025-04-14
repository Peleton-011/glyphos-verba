export const useSvgFilters = () => {
    const filters: { [key: string]: string } = {
      glow: `
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      `,
      crystal: `
        <filter id="crystal" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence"/>
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      `,
      innerShadow: `
        <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="2" dy="2" result="offset"/>
          <feGaussianBlur in="offset" stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="-1" k3="1" result="innerShadow"/>
          <feMerge>
            <feMergeNode in="innerShadow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      `,
    }
  
    const getDefs = (filterList: string[]) => {
      return filterList
        .map((key) => filters[key])
        .filter(Boolean)
        .join('\n')
    }
  
    return {
      filters,
      getDefs,
    }
  }
  