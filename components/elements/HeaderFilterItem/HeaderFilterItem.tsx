
interface IHeaderFilterItem{
    type: string
    name: string
    value: string
    title: string
    isChecked?: boolean
    handler: (args?:any)=>void
    ref: any
    onClick: ()=>void
}

const HeaderFilterItem = ({type, name, value, title, isChecked, handler, ref, onClick}:IHeaderFilterItem) =>{
    return(
        <label htmlFor={value} ref={ref} onClick={()=>onClick}>
            <input type={type} checked={isChecked} name={name} id={value} value={value}  onChange={()=>handler(value)}/>
            <span>{title?.toUpperCase()}</span>
            <span className="border"></span>
        </label>
    )
}

export default HeaderFilterItem