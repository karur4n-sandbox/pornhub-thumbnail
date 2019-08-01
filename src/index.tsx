import React from 'react'
import ReactDOM from 'react-dom'
import image from './assets/thumbnail.png'
import movie from './assets/movie.mp4'
import styled from 'styled-components'
import { useAnimateKeyframes } from 'react-simple-animate'

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')

  ReactDOM.render(<App />, rootEl)
})

const App: React.FC = () => {
  return (
    <div className="w-64 mx-auto">
      <PornHubThumbnail />
    </div>
  )
}

const PornHubThumbnail = () => {
  const [isHover, setIsHover] = React.useState<boolean>(false)
  const [videoLoaded, setVideoLoaded] = React.useState<boolean>(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { play, style } = useAnimateKeyframes({
    keyframes: ['transform: translateX(-100%)', 'transform: translateX(0)'],
    fillMode: 'forwards',
  })

  //
  // Effect
  //
  React.useEffect(() => {
    if (isHover) {
      if (containerRef.current) {
        play(true)

        const videoEl = document.createElement('video')

        videoEl.src = movie
        videoEl.id = 'video-preview'
        videoEl.autoplay = true
        videoEl.muted = true
        videoEl.className = 'video'

        videoEl.addEventListener('canplaythrough', () => {
          if (containerRef.current) {
            containerRef.current.appendChild(videoEl)

            setVideoLoaded(true)
          }
        })

        videoEl.load()
      }
    } else {
      if (containerRef.current) {
        const videoEl = document.getElementById('video-preview')

        if (videoEl) {
          setVideoLoaded(false)
          containerRef.current.removeChild(videoEl)
        }
      }
    }
  }, [isHover])

  return (
    <Container
      width={200}
      ref={containerRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && !videoLoaded && (
        <div
          style={{
            backgroundColor: 'blue',
            transform: 'translateX(-100%)',
            height: '8px',
            width: '100%',
            ...style,
          }}
        />
      )}
      <Image src={image} />
    </Container>
  )
}

type ContainerProps = {
  width: number
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: ${(props: ContainerProps) => props.width + 'px'};
  height: ${(props: ContainerProps) => props.width * (9 / 16) + 'px'};
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
