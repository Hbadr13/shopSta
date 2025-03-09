import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

export function TooltipHover({ TooltipTriggerContent, TooltipContentContent }: { TooltipTriggerContent: ReactNode, TooltipContentContent: ReactNode }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {TooltipTriggerContent}

                </TooltipTrigger>
                <TooltipContent>
                    {TooltipContentContent}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
