import React, { useRef, useState, useEffect } from 'react'
import { IoPauseSharp } from 'react-icons/io5'
import { IoMdPlay } from "react-icons/io"
import { BiSkipNext } from "react-icons/bi"
import { BiSkipPrevious } from "react-icons/bi"
import { FaVolumeUp } from "react-icons/fa"

const AudioPlayer = ({ song, audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }
    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
    }
  }, [])

  const playAudio = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pauseAudio = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100
    audioRef.current.volume = newVolume
    setVolume(newVolume)
  }

  return (
    <div key={song._id} className="bg-black fixed bottom-0 h-[10vh] w-full flex justify-between items-center">
      <audio src={song.song} ref={audioRef} className="hidden" />

      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleProgressChange} id="myinput"
        className="h-[3px] w-full accent-[#0EDD95] fixed bottom-[10vh] z-10"
      />

      <div className='flex ml-4 sm:w-max max-sm:grow overflow-hidden'>
        <img src={song.coverImage} alt="song cover" className="h-[8vh] mr-4" />
        <div className="flex flex-col justify-center mr-4">
          <div className="text-white text-nowrap sm:text-base text-sm">{song.title}</div>
          <div className="text-[#b3b3b3] text-nowrap sm:text-base text-sm">By {song.artist}</div>
        </div>
      </div>

      <div className='flex items-center justify-end sm:justify-center mr-5 sm:mr-[12vw] grow gap-2'>
        <BiSkipPrevious fill="#b3b3b3" className='text-4xl hidden sm:block'/>
        { isPlaying ?
          <div className='grid place-content-center h-[6vh] w-[6vh] rounded-full bg-[#0EDD95] cursor-pointer' onClick={pauseAudio}>
            <IoPauseSharp fill="black" size={24}/>
          </div>
          :
          <div className='grid place-content-center h-[6vh] w-[6vh] rounded-full bg-[#0EDD95] cursor-pointer' onClick={playAudio}>
            <IoMdPlay fill="black" size={24} className='ml-[2px]'/>
          </div>
        }
        <BiSkipNext fill="#b3b3b3" className='text-4xl hidden sm:block'/>
      </div>

      {/* <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={handleVolumeChange}
        className="w-24"
      /> */}
      <FaVolumeUp fill="#b3b3b3" className='text-2xl mr-6 hidden sm:block'/>
    </div>
  )
}

export default AudioPlayer
