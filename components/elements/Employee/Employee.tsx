import { useState } from 'react'
import ExpandButton from '../ExpandButton/ExpandButton'
import styles from './Employee.module.scss'

interface IEmployee{
    avatarPath: string
    name: string
    position: string
    info?: string
    isManager?: boolean
}

const Employee = ({avatarPath,name,position, isManager, info}:IEmployee) =>{
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className={styles.employee}>
            <img src={avatarPath !==null ? avatarPath : '/avatar.png'} alt="" />
            <p>{name}</p>
            <p>{position}</p>
            {isExpanded && info}
            {isManager && 
                <ExpandButton
                    handler={toggleExpand}
                    isExpanded={isExpanded}
                    expandText='подробнее'
                    collapseTest='скрыть описание'
                />
            }
        </div>
    )
}

export default Employee;