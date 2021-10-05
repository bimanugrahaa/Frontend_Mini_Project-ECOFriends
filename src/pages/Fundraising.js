import { useHistory } from "react-router-dom"
import { Dropdown, ProgressBar } from "react-bootstrap";
import NumberFormat from "react-number-format";
import Loader from 'react-loader-spinner'
import useSubscribeDonatePost from "../hooks/useSubscribeDonatePost";
import Logo from '../components/Logo'
import '../css/Fundraising.css'
import DropdownItem from "@restart/ui/esm/DropdownItem";
import { useEffect, useState } from "react";
import { useGetTrendingDonatePost } from "../hooks/useGetDonatePost";

export default function Fundraising() {

    /* Subscribe post */
    const {data, loading, error} = useSubscribeDonatePost();
    const {getTrending, trendingData, trendingLoading, trendingError} = useGetTrendingDonatePost();
    
    const history = useHistory();
    const action = (ID) => {
        history.push(
            {
                pathname: `/detail/${ID}`,
                state: {
                    ID_POST: ID
                }
            }
        )
    }

    const [dropdownInput, setDropdownInput] = useState('ALL')
    const trendingPost = () => {
        // console.log('trendingpost')
        // getTrending()
        // console.log(dataTrending)
        // try{
        //     await getTrending();
        //     console.log("detail", errorTrending)
        // } catch (error) {
        //     console.log("error fetch detail", error)
        // }
    }

    const [dataList, getDataList] = useState([])
    const handleChange = async (e) => {
        const value = e.target.value;
        getTrending()
        setDropdownInput(value)
        if (value === "TRENDING") {
            try{
                await getTrending();
                getDataList(trendingData)
                console.log("detail", trendingData)
            } catch (error) {
                console.log("error fetch detail", error)
            }
            // await getTrending()
            // await getDataList(trendingData)
            // console.log(trendingData)
        } 
        if (value === "ALL") {
            await getDataList(data)
            console.log("data")
            console.log(data)
        }
        // getDataList(trendingData)
    }

    console.log("trendingData", trendingData)
    console.log("data", data)
    console.log("dataList", dataList)

    return(
        <>
        <header className="shadow-sm p-2">
            <Logo />
        </header>
        <h1 className="text-center font-signika text-success mt-5">What's happening?</h1>
        {/* <Dropdown className="d-inline mt-5 ms-5 me-4 justify-content-center p-auto font-signika">
            <Dropdown.Toggle id="dropdown-autoclose-true" variant="success" className="sign-out mt-5">{dropdownInput}</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item 
                    onChange={(e) => setDropdownInput(e.target.value)}
                    value="ALL"
                    active>ALL</Dropdown.Item>
                <Dropdown.Item value="RECOMMENDATION" onChange={(e) => setDropdownInput(e.target.value)} active>RECOMMENDATION</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> */}
        <div className="mx-5 mt-5 mb-2 select-filter">
            <select value={dropdownInput} onChange={(e) => handleChange(e)} name="class" class="form-select" required>
                <option defaultValue value="ALL" >ALL</option>
                <option value="TRENDING" onSelect={trendingPost}>TRENDING</option>
            </select>
        </div>
        
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mx-5 mt-2 mb-5">
            {loading === false? 
                <>
                    {data?.donate_post_aggregate?.nodes.map((result) => (
                        <div className="col">
                            <div className="card h-100 shadow">
                                <img className="card-img-top img-head" src={result.IMAGE_URL === null? "noImage" : result.IMAGE_URL} alt="img" />
                                <div className="card-body" onClick={() => action(result.ID_POST)}>
                                    <h5 className="my-2 mx-auto text-uppercase">{result.Title}</h5>
                                </div>

                                <div className="card-footer bg-white">
                                    <div className="row">
                                        <span className="font-signika text-success col-auto"> {result.Donates} Donates</span>
                                        <span className="font-signika text-success col-auto">{result.comments_aggregate.aggregate.count} Comments</span>
                                    </div>
                                    <ProgressBar now={result.Donation_Raised} min={0} max={result.Donation_Total} variant="success" style={{height: "8px"}} className="my-2"/>
                                    <small className="text-muted">
                                        <span className="fundraising-raised text-signika fw-bold">
                                            <NumberFormat
                                                className="donation-raised font-signika"
                                                thousandsGroupStyle="thousand"
                                                value={result?.Donation_Raised}
                                                prefix="Rp"
                                                decimalSeparator=""
                                                displayType="text"
                                                type="tel"
                                                thousandSeparator={true}
                                                allowNegative={false} /> Raised 
                                        </span> of 
                                            <NumberFormat
                                                className=" font-signika"
                                                thousandsGroupStyle="thousand"
                                                value={result?.Donation_Total}
                                                prefix=" Rp"
                                                decimalSeparator=""
                                                displayType="text"
                                                type="tel"
                                                thousandSeparator={true}
                                                allowNegative={false} />
                                    </small>
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