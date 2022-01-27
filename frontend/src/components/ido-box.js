import ido_logos from "../assets/images/ido-logos.png"
import crowdsale from "../assets/images/crowdsale.png"




function IdoBox(props){

    return(

        <>
        
            <div className="ido-box">

                {
                    props.status == "Live" &&
                    <p className="live">
                    <i class="fa-solid fa-circle"></i>
                    {props.status}</p>
                }
                
                {
                    props.status == "Soon" &&
                    <p className="soon">
                    <i class="fa-solid fa-circle"></i>
                    {props.status}</p>
                }

                {
                    props.status == "Closed" &&
                    <p className="closed">
                    <i class="fa-solid fa-circle"></i>
                    {props.status}</p>
                }

                <div className="ido"> 

                    <img src={ido_logos} />

                    <div className="ido-details">

                        <h4>DotOracles(DTO)</h4>

                        <ul className="ido-ul">

                            <li><a href="#"><i class="fa-brands fa-medium"></i></a></li>
                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fa-brands fa-telegram"></i></a></li>
                            <li><a href="#"><i class="fa-solid fa-globe"></i></a></li>

                        </ul>
                    </div>

                </div>

                <p>Video game Bad Days gives you the chance to collect,
                    own, breed, and battle as your favourite heroes and
                    villains by Stan Lee!</p>

                <div className="ido-cap my-5">

                    <span >
                        <p>Softcap</p>
                        <h4>18.999BNB</h4>
                    </span>

                    <span className="text-center">
                        <p>Softcap</p>
                        <h4>18.999BNB</h4>
                    </span>

                    <span className="text-end">
                        <p>Softcap</p>
                        <h4>18.999BNB</h4>
                    </span>

                </div>

                <div className="ido"> 

                    <img src={crowdsale} />

                    <div className="ido-details">

                        <p>Aunction Type</p>
                        <h5>DotOracles(DTO)</h5>

                    </div>

                </div>

            </div>

        </>

    )

}

export default IdoBox;