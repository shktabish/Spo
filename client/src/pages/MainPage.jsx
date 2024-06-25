import { useState, useEffect, useRef } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Upload from "../components/modals/Upload"
import MainSection from './../components/MainSection';
import AudioPlayer from './../components/AudioPlayer';

const MainPage = () => {
    const [songPlaying, setSongPlaying] = useState(null)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const audioRef = useRef(null)

  return (
    <div className="flex bg-black w-full min-h-screen p-2">
      <Sidebar setIsUploadOpen={setIsUploadOpen} />
      <div className="bg-gradient-to-b from-[#1e1e1e] to-black w-full sm:w-[calc(100%-256px)] sm:ml-2 rounded-xl">
        <Navbar />
        <MainSection setSongPlaying={setSongPlaying} audioRef={audioRef}/>
      </div> 
      {songPlaying && <AudioPlayer song={songPlaying} audioRef={audioRef}/>}
      <Upload isUploadOpen={isUploadOpen} setIsUploadOpen={setIsUploadOpen} />
    </div>
  )
}

export default MainPage