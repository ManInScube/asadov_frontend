import { ReactElement } from "react"
import Header from "../modules/HeaderNew/Header"
import Footer from "../modules/Footer/Footer"
import HeaderAbout from "../modules/HeaderAbout/HeaderAbout"

interface ILayoutProps{
    children: ReactElement
    scrollHandler: (args)=>void
}
const AboutLayout = ({children, scrollHandler}:ILayoutProps) =>{
    return(
        <>
            <HeaderAbout scrollHandler={scrollHandler}/>
                <div className="container">
                    {children}
                </div>
            <Footer/>
        </>

    )
}

export default AboutLayout