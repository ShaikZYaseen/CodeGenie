import { Forward, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";

export default function Hero(){
    return (
        <div className="w-full">
            <p className="text-center text-bold text-4xl">
            Turn Ideas into Apps with AI
            </p>
            <p className="text-center text-xl mt-2">Describe your app, let AI do the rest</p>
            <div className="w-full flex justify-center items-center mt-8">
            <Textarea placeholder="Create a chess aplication.." className="w-1/2" />
            <Forward className="ml-4 cursor-pointer hover:text-gray-800"/>
            {/* <Send className="ml-4 cursor-pointer"/> */}


            </div>
        </div>
    )
}