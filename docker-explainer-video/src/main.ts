import { Video } from './engine'
import { story } from './story'

const video = new Video(document.getElementById('stage')!)
story(video)
;(window as unknown as { video: Video }).video = video
video.renderAt(Number(new URLSearchParams(location.search).get('t') ?? 0))
