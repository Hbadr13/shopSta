import { useEffect } from "react";
import { useAppDispatch } from "@/redux/redux-hooks";
import { setWindowWidth } from "@/features/global/windowProps";
const WindowProps = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const updateWindowWidth = () => {
            dispatch(setWindowWidth(window.innerWidth))
        };

        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, []);
    return <div className=""></div>
}
export default WindowProps