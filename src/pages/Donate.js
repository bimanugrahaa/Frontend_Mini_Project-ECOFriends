import { useHistory } from "react-router-dom";
import HeaderLogo from '../components/HeaderLogo'
import './Donate.css'

export default function Donate() {
    const history = useHistory();
    const goHome = () => {
        history.goBack()
    }

    return (
        <div className="jumbotron donate-background ">
            
            <div className="row">
                <div className="col-md-5 my-auto">
                    <p className="donate-quotes font-signika">“No matter how much you donate,
                        it will mean a lot to our environment.”</p>

                </div>
                <div className="col-md-7 mx-0 my-0 card-donate card">
                    <div className="row">
                        <div className="col-md-1 my-auto">
                            <i onClick={goHome} className="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
                        </div>
                        <div className="col-md-11 mx-auto">
                            <HeaderLogo/>
                        </div>
                    </div>
                    <p className="nominal-text-first font-signika mx-auto">Choose one below</p>
                    <button className="btn btn-nominal mt-2 mx-auto font-signika">Rp 5000</button>
                    <button className="btn btn-nominal mt-3 mx-auto font-signika">Rp 10000</button>
                    <button className="btn btn-nominal mt-3 mx-auto font-signika">Rp 20000</button>
                    <button className="btn btn-nominal mt-3 mx-auto font-signika">Rp 50000</button>
                    <button className="btn btn-nominal mt-3 mx-auto font-signika">Rp 100000</button>
                    <h6 className="font-signika mx-auto my-2">OR</h6>
                    <h5 className="font-signika my-1 mx-auto">Another nominal</h5>
                    <div className="form-nominal form-control mx-auto">
                        <span className="font-signika text-rp">Rp</span>
                        <input name='nominal' type="tel" className="ms-2 input-nominal font-signika" placeholder="0" id="validationDefault02" required/>
                    </div>
                    <button className="btn btn-donate mt-3 mx-auto font-signika">DONATE</button>
                </div>

            </div>
        </div>
    )
}