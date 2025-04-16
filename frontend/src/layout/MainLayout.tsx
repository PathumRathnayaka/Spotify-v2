import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './component/LeftSidebar';
import FriendsActivity from './component/FriendsActivity';
import AudioPlayer from './component/AudioPlayer';
import {PlaybackControls} from "@/layout/component/PlaybackControls.tsx";

const MainLayout = () => {

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
        <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
            <AudioPlayer/>
            {/* lest sidebar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ?0: 10} maxSize={30}>
                
                <LeftSidebar/>
            </ResizablePanel>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>
            {/* Main content */}
            <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                <Outlet/>
            </ResizablePanel>
            {!isMobile && (
                <>
                    <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>
                    {/* Right sidebar */}
                    <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                        <FriendsActivity/>
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
        <PlaybackControls/>
    </div>
  )
}

export default MainLayout