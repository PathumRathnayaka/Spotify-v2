import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react"


const updateApitoken = (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];
}

const AuthProvider = ({children}:{ children:React.ReactNode}) =>{
    const {getToken, userId } = useAuth()
    const [loading, setLoading] = useState(true)
    const {checkAdminStatus} = useAuthStore();
    const {initSocket, disconnectSocket} = useChatStore();

    useEffect(() => {
        const initAuth =  async () =>{
            try {
                const token = await getToken();
                updateApitoken(token);
                if(token){
                    await checkAdminStatus();
                    //init socket
                    if(userId){
                        initSocket(userId);
                    }
                }
            } catch (error:any) {
                updateApitoken(null);
                console.log("Error in auth provider",error)
            } finally{
                setLoading(false);
            }
        };
        initAuth();
        return () => {
            disconnectSocket();
        }
    },[getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

    if(loading) return (
    <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
    </div>)

    return <>{children}</>
};

export default AuthProvider