
export default function Watermark( props ) {
    
    const visible = props.visible;

    return(
        <div style={{ display: visible ? "inline-block" : "none" }}>
            <p style={{ fontSize: 14 }}>
                <a href="/impressum" style={{ textDecoration: "underline" }}>Impressum</a><br/>
                &copy;DFKI, Hochschule Pforzheim 2024
            </p>
        </div>
    );
}