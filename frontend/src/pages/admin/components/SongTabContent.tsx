import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Music} from "lucide-react";
import {SongsTable} from "@/pages/admin/components/SongsTable.tsx";
import AddSongDialog from "./AddSongDialog";

export const SongTabContent = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='flex items-center gap-2'>
                            <Music className='size-5 text-emerald-500'/>
                            Song Library
                        </CardTitle>
                        <CardDescription>
                            Manage your Music tracks
                        </CardDescription>
                    </div>
                    <AddSongDialog/>
                </div>
            </CardHeader>
            <CardContent>
                <SongsTable/>
            </CardContent>
        </Card>
    );
};