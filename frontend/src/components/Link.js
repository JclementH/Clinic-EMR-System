import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";

function Link({to, children, className, activeClassName}){
    const { navigate, currentPath } = useNavigation();

    const classes = classNames('font-bold rounded-lg p-3 ml-5 hover:bg-sky-600', currentPath === to && activeClassName, className);

    const handleClick = (event) => {
        if (event.metaKey || event.ctrlKey){
            return;
        }
        event.preventDefault();

        navigate(to);
        
    };
    return (<a  className = {classes} href={to} onClick={handleClick} >{children}</a>);
}

export default Link; 