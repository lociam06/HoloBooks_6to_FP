import "./CusFooter.css";

function CusFooter(props){
    let styles;
    if(props.color) styles = {background: `var(--${props.color}_mid)`}
    else styles = {background: `var(--holo_dark)`}
    return(
        <footer style={styles}>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
        </footer>
    )
}

export default CusFooter;