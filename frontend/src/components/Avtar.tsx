

return(
    interface AvatarProps {
        name: string
        
    }
    
    export function Avtar({name}:AvatarProps) {
        return <div className='relative inline-flex items-center
        justify-center w-8 h-8  bg-gray-100 rounded-full
        dark:bg-gray-600'>
            <span className='font-small text-gray-600 dark:text-gray-300 cursor-pointer'>
                {name[0]}
            </span
        </div>
    }
)