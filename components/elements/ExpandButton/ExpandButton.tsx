import styles from './ExpandButton.module.scss'

interface IExpandButton{
    isExpanded: boolean,
    expandText?: string,
    collapseTest?: string 
    handler: ()=>void
}

const ExpandButton = ({isExpanded, handler, expandText, collapseTest}: IExpandButton) => {

    return(
        <button onClick={()=>handler()} className={styles.expandButton}>
            {isExpanded ? collapseTest : expandText}
        </button>
    )
}

export default ExpandButton;