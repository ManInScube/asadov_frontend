import styles from './Employee.module.scss'

interface IEmployee{
    avatarPath: string
    name: string
    position: string
}

const Employee = ({avatarPath,name,position}:IEmployee) =>{
    return(
        <div className={styles.employee}>
            <img src={avatarPath} alt="" />
            <p>{name}</p>
            <p>{position}</p>
        </div>
    )
}

export default Employee;