import { useEffect, useState } from 'react';
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <button onClick={toggleTheme}>
     {theme === 'light' ? <IoSunnySharp className='w-8 h-8 text-teal-950' /> : <IoMoonSharp className='w-8 h-8 text-teal-50' />} 
    </button>
  );
}
