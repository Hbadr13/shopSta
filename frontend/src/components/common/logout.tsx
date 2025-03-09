import { logout } from '@/features/auth/authActions';
import { useAppDispatch } from '@/redux/redux-hooks';

const Logout = () => {
    const dispatch = useAppDispatch()
    const handelLogout = async () => {
        dispatch(logout())
    }
    return (
        <div>
            <button onClick={handelLogout} className='bg-red-400 active:bg-slate-500 active:scale-105 duration-150 mt-10 rounded-xl w-28 h-10 text-white text-xl font-semibold'>
                Logout
            </button>
        </div>
    )
}

export default Logout