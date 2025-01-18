import { ReactElement } from "react"
import Header from "../modules/HeaderNew/Header"
import Footer from "../modules/Footer/Footer"
import HeaderProject from "../modules/HeaderProject/HeaderProject"

interface ILayoutProps{
    children: ReactElement
}
const ProjectLayout = ({children}:ILayoutProps) =>{
    return(
        <>
            <HeaderProject/>
                <div className="container">
                    {children}
                </div>
            <Footer/>
        </>

    )
}

export default ProjectLayout