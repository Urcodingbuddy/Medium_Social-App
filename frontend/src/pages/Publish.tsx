// import React, { useRef, useEffect, useState } from 'react';
// import { Appbar } from "../components/Appbar";
// import textbtn from '../assets/textbtn.svg';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ExpandingTextarea: React.FC<{ value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement>; placeholder: string; style?: React.CSSProperties; rows?: number; }> = ({ value,onChange, placeholder, style, rows }) => {
//     const textareaRef = useRef<HTMLTextAreaElement>(null);


//     useEffect(() => {
//         const textarea = textareaRef.current;
//         if (textarea) {
//             textarea.style.height = "auto"; // Reset height
//             textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match scroll height
//         }
//     }, [value]); // Update when value changes

//     const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const textarea = e.target;
//         textarea.style.height = "auto"; // Reset height to adjust for new content
//         textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match scroll height
//     };



//     return (
//         <textarea
//             ref={textareaRef}
//             value={value}
//             placeholder={placeholder}
//             style={{
//                 overflow: "hidden", // Prevent scrollbar
//                 resize: "none", // Prevent manual resizing
//                 ...style
//             }}
//             rows={rows}
//             onChange={onChange}
//             onInput={handleInput} // Adjust height based on content
//             className="focus:outline-none text-black placeholder:text-gray-400 mt-5 ml-2 "
//         />
//     );
// };

// export const Publish: React.FC = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [isPublishEnabled, setIsPublishEnabled] = useState(false);
//     const backendUrl = import.meta.env.VITE_MEDIUM_BACKEND;
//     const navigate = useNavigate();

//     const wordCount = (text: string) => {
//         return text.trim().split(/\s+/).length;
//     };

//     useEffect(() => {
//         const isTitleValid = wordCount(title) >= 3;
//         const isContentValid = wordCount(content) >= 10;
//         setIsPublishEnabled(isTitleValid && isContentValid); // Enable button only if both are valid
//     }, [title, content]);

//     console.log("Title: ",title)
//     console.log("Content:",content)
//     console.log({Authorization: localStorage.getItem('token')})
    
//     const handlePublish = async () => {
//         try {
//             const res = await axios.post(
//                 `${backendUrl}/post`, 
//                 { title, content }, // Request body
//                 {
//                     headers: {
//                         Authorization: localStorage.getItem('token'),
//                         'Content-Type': 'application/json' // Optional, but good to include
//                     }
//                 }
//             );
//             navigate(`/post/${res.data.id}`);
//         } catch (error) {
//             console.error("Error publishing the post:", error);
//         }
//     }
//     const commonStyle = {
//         fontFamily: "medium-content-title-font, Georgia, Cambria, 'Times New Roman', Times, serif",
//         fontWeight: 400,
//         fontSize: 45,
//         padding: "10px", // Add padding for consistency
//         borderRadius: "4px", // Optional: Add border radius for a consistent look
//     };

//     return (
//         <div>
//             <Appbar showPublish={true} isPublishEnabled={isPublishEnabled} onPublish={handlePublish} />
//             <div className="flex justify-center m-0 w-full h-[100vh]">
//                         <img className='h-16 mt-8 inline' src={textbtn} alt="Text Button" />
//                 <div className="w-3/5 flex ">
//                     <div className="w-full text-wrap flex flex-col">
//                         <ExpandingTextarea
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder="Title"
//                             style={{
//                                 ...commonStyle,
//                                 fontSize: 45, // Title font size
//                             }}
//                             rows={1}
//                         />
//                         <ExpandingTextarea
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             placeholder="Tell your story…"
//                             style={{
//                                 ...commonStyle,
//                                 fontSize: 25, // Content font size
//                             }}
//                             rows={3}
//                         />

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


import React, { useRef, useEffect, useState } from 'react';
import { Appbar } from "../components/Appbar";
import textbtn from '../assets/textbtn.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpandingTextarea: React.FC<{ value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement>; placeholder: string; style?: React.CSSProperties; rows?: number; }> = ({ value, onChange, placeholder, style, rows }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match scroll height
        }
    }, [value]); // Update when value changes

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = "auto"; // Reset height to adjust for new content
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match scroll height
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            placeholder={placeholder}
            style={{
                overflow: "hidden", // Prevent scrollbar
                resize: "none", // Prevent manual resizing
                ...style
            }}
            rows={rows}
            onChange={onChange}
            onInput={handleInput} // Adjust height based on content
            className="focus:outline-none text-black placeholder:text-gray-400 mt-5 ml-2"
        />
    );
};

export const Publish: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublishEnabled, setIsPublishEnabled] = useState(false);
    const [titleFontSize, setTitleFontSize] = useState(45); // Default font size for title
    const [contentFontSize, setContentFontSize] = useState(25); // Default font size for content
    const backendUrl = import.meta.env.VITE_MEDIUM_BACKEND;
    const navigate = useNavigate();

    const wordCount = (text: string) => {
        return text.trim().split(/\s+/).length;
    };

    useEffect(() => {
        const isTitleValid = wordCount(title) >= 3;
        const isContentValid = wordCount(content) >= 10;
        setIsPublishEnabled(isTitleValid && isContentValid); // Enable button only if both are valid
    }, [title, content]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // Screen width threshold for small screens
                setTitleFontSize(30); // Smaller font for smaller screens
                setContentFontSize(20); // Adjust content font size for smaller screens
            } else {
                setTitleFontSize(45); // Larger font for larger screens
                setContentFontSize(25); // Reset content font size
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Adjust on window resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup listener
        };
    }, []);

    const handlePublish = async () => {
        try {
            const res = await axios.post(
                `${backendUrl}/post`, 
                { title, content }, // Request body
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        'Content-Type': 'application/json' // Optional, but good to include
                    }
                }
            );
            navigate(`/post/${res.data.id}`);
        } catch (error) {
            console.error("Error publishing the post:", error);
        }
    }

    const commonStyle = {
        fontFamily: "medium-content-title-font, Georgia, Cambria, 'Times New Roman', Times, serif",
        fontWeight: 400,
        padding: "10px", // Add padding for consistency
        borderRadius: "4px", // Optional: Add border radius for a consistent look
    };

    return (
        <div>
            <Appbar showPublish={true} isPublishEnabled={isPublishEnabled} onPublish={handlePublish} />
            <div className="flex justify-center m-0  h-[100vh]">
                <img className='h-16 mt-8 inline' src={textbtn} alt="Text Button" />
                <div className="w-5/6 flex">
                    <div className="w-full text-wrap flex flex-col">
                        <ExpandingTextarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            style={{
                                ...commonStyle,
                                fontSize: titleFontSize, // Title font size is dynamic
                            }}
                            rows={1}
                        />
                        <ExpandingTextarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Tell your story…"
                            style={{
                                ...commonStyle,
                                fontSize: contentFontSize, // Content font size is dynamic
                            }}
                            rows={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
