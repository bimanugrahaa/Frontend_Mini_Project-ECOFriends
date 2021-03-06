import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSearchDonatePost, useGetTrendingDonatePost } from "../hooks/useGetDonatePost";
import { ProgressBar } from "react-bootstrap";
import NumberFormat from "react-number-format";
import Loader from 'react-loader-spinner'
import useSubscribeDonatePost from "../hooks/useSubscribeDonatePost";
import '../css/Fundraising.css'
import Header from "../components/Header";


export default function Fundraising() {
    /* useState */
    const [dropdownInput, setDropdownInput] = useState('ALL')
    const [dataList, getDataList] = useState([])
    const [searchInput, setSearchInput] = useState()
    const [searchState, setSearchState] = useState(false)

    /* Get fetch donate post */
    const {data, loading, error} = useSubscribeDonatePost();
    const {getTrending, trendingData, trendingLoading, trendingError} = useGetTrendingDonatePost();
    const {getSearch, searchData, searchLoading} = useGetSearchDonatePost(searchInput);
    
    const history = useHistory();

    /* Go to specific page */
    const action = (ID, Title) => {
        const urlTitle = Title.replace(/\s/g,"-")
        history.push(`/detail/${ID}/${urlTitle}`)
    }

    /* Handle search button */
    const handleSearch = async() => {
        setSearchState(true)
        try {
            await getSearch(searchInput);
            await getDataList(searchData);
            setSearchState(false)
        } catch (error) {
            console.log("search error", error)
        }
    }

    useEffect(() => {
        if (searchState === false && dropdownInput === "ALL") {
            getDataList(data)
        }
        if (searchState === false && dropdownInput === "TRENDING") {
            getTrending()
            getDataList(trendingData)
        }
        if (searchState) {
            getSearch(searchInput)
            getDataList(searchData)
        }
    }, [dropdownInput, data, trendingData, searchData])

    return(
        <>
        <Header/>
        <h1 className="text-center font-signika text-success mt-5">What's happening?</h1>
        <div className="row">
            <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 mx-5 mt-5 mb-2 select-filter">
                <select value={dropdownInput} onChange={(e) => setDropdownInput(e.target.value)} name="class" className="form-select select-fundraising" required>
                    <option defaultValue value="ALL" >ALL</option>
                    <option value="TRENDING">TRENDING</option>
                </select>
            </div>
            <div className="ps-5 pe-1 mt-5 col-5 col-sm-5 col-md-6 col-lg-8 col-xl-8 col-xxl-9 contact-form">
                <input name='search' type="text" className="form-control" id="validationDefault02" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search" required/>
            </div>
            <button className="btn-search col-auto mt-5 me-5 btn" onClick={handleSearch}><i class="fas fa-search    "></i></button>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mx-5 mt-2 mb-5">
            {loading === false? 
                <>
                    {dataList?.donate_post_aggregate?.nodes.map((result) => (
                        <div className="col">
                            <div className="card h-100 shadow">
                                <img className="card-img-top img-head" src={result.IMAGE_URL === null? "noImage" : result.IMAGE_URL} alt="img" />
                                <div className="card-body post-cursor" onClick={() => action(result.ID_POST, result.Title)}>
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