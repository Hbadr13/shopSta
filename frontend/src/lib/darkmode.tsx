import { checkAuth } from "@/features/auth/authActions";
import { useAppDispatch } from "@/redux/redux-hooks";
import { RootState } from "@/redux/store";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminNavbar = ({ children }: { children: ReactNode }) => {
    const { isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);


    const [theme, setTheme] = useState('light'); // Default theme

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme); // Save theme to localStorage
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.body.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    if (isLoading) return <div className="w-full bg-blue-400 h-[60px]" />;

    return (
        <div>
            <h1 className="text-3xl font-bold">Dynamic Theming with Tailwind</h1>
            <button
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md shadow-md hover:bg-muted hover:text-muted-foreground"
                onClick={toggleTheme}
            >
                Toggle Theme
            </button>
            <div className="text-4xl p-20 text-muted-foreground font-semibold bg-da2ira">hello</div>
            {children}

        </div>
    );
}

export default AdminNavbar
