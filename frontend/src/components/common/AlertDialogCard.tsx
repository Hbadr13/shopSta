import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react"
interface IAlertDialogDemo {
    handelPressAction: () => void,
    cancelButton: ReactNode,
    actionButton: ReactNode,
    title: ReactNode | string,
    description: ReactNode | string
    triggerButton: ReactNode
}

export function AlertDialogDemo({ cancelButton, actionButton, title, description, triggerButton, handelPressAction }: IAlertDialogDemo) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggerButton}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                    {/* 
                    */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {cancelButton}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handelPressAction}>
                        {actionButton}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
