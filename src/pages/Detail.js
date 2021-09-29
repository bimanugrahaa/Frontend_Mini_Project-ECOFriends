import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import HeaderLogo from "../components/HeaderLogo";
import { useGetDonatePostById } from "../hooks/useGetDonatePost";
import useSubscribeComments from "../hooks/useSubscribeComments";
import './Detail.css'

export default function Detail(props) {

    console.log("props", props)
    const ID = props.location.state.ID_POST
    console.log("ID_POST", ID)
    const [detail, getDetail] = useState([])
    const [comments, getComments] = useState([])
    const {detailData, detailLoading, detailError} = useGetDonatePostById(ID);
    const {commentsData, commentsLoading, commentsError} = useSubscribeComments(ID);
    // console.log("commentsData", commentsData.donate_post)
    const history = useHistory();

    const fetchDetail = async() => {

        try{
            await getDetail(detailData.donate_post[0])
            console.log("detail", detail)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = async() => {
        try{
            await getComments(commentsData.donate_post[0])
            console.log("commentsData", comments)
        } catch (error) {
            console.log(error)
        }
    }
    // getPostDetail({variables: {
    //     ID_POST: ID
    // }})
    // console.log("ID_POST", ID_POST)
    // console.log("getPostDetail", detailData.donate_post)
    
    // useEffect(() => {
    //     getDetail(detailData.donate_post[0])
    // }, [])
    // console.log("detail", detailData)

    useEffect(() => {
        fetchDetail();
        fetchComments();
    })
    return(
        <>
        <HeaderLogo/>
        <p className="detail-title font-signika">{detail.Title}</p>
        <div className="row detail-row-1 mx-auto">
            <div className="col-md-10 detail-post font-signika">
                <img className="detail-img shadow-lg" src={detail.IMAGE_URL}/>
                <p className="detail-subtitle">{detail.Subtitle}</p>
                <p className="detail-description">{detail.Description}</p>
            </div>
            <div className="col-md-2 detail-info">
                <NavLink to="/donate" type="button" className="btn btn-donate-now">Donate Now</NavLink>
                <p>{comments.Donation_Raised} Raised</p>
                <p>of Goal {comments.Donation_Total}</p>
            </div>
        </div>
        <div className="row">
            <h4>Support from #ECOFriends</h4>
            <div></div>
            <div className="form-nominal form-control mx-auto">
                <input name='nominal' type="tel" className="ms-2 input-nominal font-signika" placeholder="0" id="validationDefault02" required/>
            </div>
            <button className="btn btn-donate mt-3 mx-auto font-signika">DONATE</button>
        </div>
        </>
    )
    
}