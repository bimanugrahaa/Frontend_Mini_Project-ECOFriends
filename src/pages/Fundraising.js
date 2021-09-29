import HeaderLogo from "../components/HeaderLogo";
import Loader from 'react-loader-spinner'
import { useState } from 'react';
import { useHistory } from "react-router-dom"
import useSubscribeDonatePost from "../hooks/useSubscribeDonatePost";

// import useGetPassenger, { useGetPassengerById } from "../hooks/useGetPassenger";

export default function Fundraising() {

    const [postId, getPostId] = useState()
    const {data, loading, error} = useSubscribeDonatePost();
    console.log("data post", data?.donate_post)

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

        <h1>What's happening?</h1>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-5 my-5">
            {data?.donate_post.map((result) => (
                
                <div className="col">
                    <div className="card h-100 shadow">
                        <img className="card-img-top img-head mb-2" src={result.IMAGE_URL === null? "noImage" : result.IMAGE_URL} alt="img" />
                        {/* <a style={{color:"black"}} href={result.Title} className="card-body text-decoration-none">
                            <p className="card-title text-title">{result.Subtitle}</p>
                        </a> */}
                        <div>{result.ID_POST}</div>
                        
                        <div onClick={() => action(result.ID_POST)}>{result.Title}</div>
                        <div className="card-footer">
                            <small className="text-muted">Created on : {result.Description}</small>
                        </div>
                    </div>
                </div>
        ))}
        </div>
        </>
    )
}