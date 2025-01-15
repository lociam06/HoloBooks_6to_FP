import "./Banner.css"
function Banner(){
    const styles = {
        backgroundImage: "url(../../../public/Images/exampleImage2.jpg)"
    }
    return(
        <div className="banner" style={ styles }></div>
    )
}

export default Banner;