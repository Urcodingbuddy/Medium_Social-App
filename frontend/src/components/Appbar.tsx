import medium from '../assets/medium.svg'
import PostAdd from '../assets/PostAdd.svg'
import logout from '../assets/logout.svg'
import { Avtar } from './PostCard'
import { SearchBar } from './SearchBar'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { searchQueryState } from '../state/searchState';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

interface AppbarProps {
    showSearchBar?: boolean;
    showPublish?: boolean;
    showAddPost?: boolean;
    isPublishEnabled?: boolean; // New prop to control button state
    onPublish?: () => void;
    showDropDown?: boolean;// New prop for publish button action
}

export const Appbar: React.FC<AppbarProps> = ({
    showSearchBar = false,
    showPublish = false,
    showAddPost = false,
    isPublishEnabled = false,  // Add default value for isPublishEnabled
    onPublish,
    // Add onPublish function prop
}) => {
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);  // Toggle dropdown state on click
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase())
    }
    const name = localStorage.getItem('name');
    const navigate = useNavigate();
    return (

        <nav className="relative border-black border-b-2 flex justify-between px-5 py-3 items-center">
            <div className="flex items-center gap-5">
                <span className="w-28">
                    <Link to={'/posts'}>
                        <img src={medium} alt="medium" />
                    </Link>
                </span>
                {showSearchBar && <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />}
            </div>

            <div className="flex items-center gap-5 pr-3 pl-5 sm:gap-10 sm:pl-3">
                {showPublish && (
                    <button
                        onClick={isPublishEnabled ? onPublish : undefined}
                        type="button"
                        className={`flex justify-center text-white font-medium rounded-full text-sm px-5 py-2.5 text-center ${isPublishEnabled
                                ? 'bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Publish
                    </button>
                )}

                {showAddPost && (
                    <Link to={'/publish'}>
                        <div className='w-12 flex justify-center'>
                            <img className="cursor-pointer w-8 md:w-5 sm:w-6 lg:w-7 " src={PostAdd} alt="Add Post" />
                        </div>
                    </Link>
                )}

                {/* Avatar with dropdown toggle */}
                <div className="relative">
                    <div onClick={toggleDropdown} className="cursor-pointer">
                        <Avtar name={name || 'Anonymous'} />
                    </div>

                    {/* Dropdown menu */}
                    {isDropdownVisible && (
                        <div className="absolute right-0 mt-2 py-2 w-28 bg-white rounded-lg shadow-xl z-20">
                            {/* <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Profile
                            </Link>
                            <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Settings
                            </Link> */}
                            <button className="flex px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    window.location.reload()
                                    navigate('/signin')
                                }}
                            >
                                <img src={logout} alt="" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>

    )
}
