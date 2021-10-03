import HeaderLogo from "../components/HeaderLogo";
import Loader from 'react-loader-spinner'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import { ProgressBar } from "react-bootstrap";
import useSubscribeDonatePost from "../hooks/useSubscribeDonatePost";
import './Fundraising.css'

// import useGetPassenger, { useGetPassengerById } from "../hooks/useGetPassenger";

export default function Fundraising() {

    const [postId, getPostId] = useState()
    const {data, loading, error} = useSubscribeDonatePost();
    const [getDonationRaised, setDonationRaised] = useState("")
    const [getDonationTotal, setDonationTotal] = useState("")
    console.log("data post", data?.donate_post)

    useEffect(() => {

        // data?.donate_post
        setDonationRaised(data?.donate_post)
        setDonationTotal(toString(data?.donate_post.Donation_Total))
    },[])

    console.log("getDonationRaised", getDonationRaised)
    
    const history = useHistory();
    const action = (ID) => {
        // getPostId(data?.donate_post.ID_POST)
        history.push(
            {
                pathname: `/detail/${ID}`,
                state: {
                    ID_POST: ID
                }
                
            }
        )
        console.log("ID_POST", ID)
    }

    return(
        <>
        <HeaderLogo/>

        <h1 className="text-center font-signika text-success mt-5">What's happening?</h1>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-5 my-5">
            {loading === false? 
                <>
                    {data?.donate_post.map((result) => (
                        <div className="col">
                            <div className="card h-100 shadow">
                                <img className="card-img-top img-head" src={result.IMAGE_URL === null? "noImage" : result.IMAGE_URL} alt="img" />
                                <div className="card-body" onClick={() => action(result.ID_POST)}>
                                    <h5 className="my-2 mx-auto text-uppercase">{result.Title}</h5>
                                </div>

                                <div className="card-footer bg-white">
                                    {/* {result.Donation_Raised > result.Donation_Total? : } */}
                                    <ProgressBar now={result.Donation_Raised} min={0} max={result.Donation_Total} variant="success" style={{height: "8px"}} className="my-2"/>
                                    <small className="text-muted"><span className="fundraising-raised text-signika fw-bold">Rp{result.Donation_Raised}  Raised </span>of Rp{result.Donation_Total}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            :
            <Loader className="text-center mx-auto" type="TailSpin" color="#528A62" height={80} width={80}/>
            }
            
        </div>
        </>
    )
}