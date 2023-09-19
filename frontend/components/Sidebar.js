import Link from "./Link";
import { AiOutlineMenu, AiOutlineHome, AiOutlineProfile, AiOutlineReconciliation} from "react-icons/ai";
import className from "classnames";
const ICON_SIZE = "mr-1"

function Sidebar({sidebarState, ...rest}){
    const links = [
        {label: 'Home', path: '/', icon: <AiOutlineHome className={ICON_SIZE} fontSize={30}/> },
        {label: 'Document', path: '/Document', icon: <AiOutlineProfile className={ICON_SIZE} fontSize={30}/>},
        {label: 'Billing', path: '/Billing', icon: <AiOutlineHome className={ICON_SIZE} fontSize={30}/>},
        {label: 'Records', path: '/Records', icon: <AiOutlineReconciliation className={ICON_SIZE} fontSize={30}/>}
    ];

    const renderedLinks = links.map((link) => {
        const sidebarLink = sidebarState ? '' : link.label

        return <Link activeClassName="text-white" className="mb-3 flex" key={link.label} to={link.path} > 
            {link.icon}
            {sidebarLink}
        </Link>
    });

    const sidebarName =  className("mt-2 mr-1 cursor-pointer", sidebarState ? 'ml-[19%]': 'ml-[8%]');

    return (
    <div >
        <div className='bg-sky-500 flex items-center text-white pt-6 pb-6'> 
            <AiOutlineMenu {...rest} className={sidebarName} fontSize={40} />  
            <div className="font-bold text-3xl"> {sidebarState ? '' : 'Attethant'} </div>
        </div>
        <div className="bg-sky-500 pr-7 h-screen flex flex-col items-start text-2xl"> {renderedLinks} </div>
    </div>
    
    );
}

export default Sidebar;