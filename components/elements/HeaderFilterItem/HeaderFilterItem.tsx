
interface IHeaderFilterItem{
    type: string
    name: string
    value: string
    title: string
    isChecked?: boolean
    handler: (args?:any)=>void
}

const HeaderFilterItem = ({type, name, value, title, isChecked, handler}:IHeaderFilterItem) =>{
    return(
        <label htmlFor={value}>
            <input type={type} checked={isChecked} name={name} id={value} value={value}  onChange={()=>handler(value)}/>
            <span>{title}</span>
            <span className="border"></span>
        </label>
    )
}

export default HeaderFilterItem