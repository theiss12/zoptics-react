import "./style.scss";

function Contact() {
    return (
        <section className="screen-contact">
            <div className="container">
                <iframe 
                    className="contact__map"
                    // width="100%" 
                    height="600" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sopron+(Zoptics)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                    {/* <a href="https://www.gps.ie/">gps tracker sport</a> */}
                </iframe>
                <div className="contact__wrapper">
                    <h2 className="contact__headline">Elérhetőség</h2>
                    <div className="contact__details">
                        <p className="contact__details-label">Cégnév:</p><p className="contact__details-info">Zoptics Kft.</p>
                        <p className="contact__details-label">Telefonszám:</p><a className="contact__details-info" href="tel:+4733378901">+47 333 78 901</a>
                        <p className="contact__details-label">Email:</p><a className="contact__details-info" href="mailto:tamas.zeiss@gmail.com">tamas.zeiss@gmail.com</a>
                        <p className="contact__details-label">Cím:</p><p className="contact__details-info">Túl Az Operencián 2</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;