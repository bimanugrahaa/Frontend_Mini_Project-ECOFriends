import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Avatar from 'react-avatar';
import HeaderLogo from "../components/HeaderLogo";
import { useGetDonatePostById } from "../hooks/useGetDonatePost";
import useSubscribeComments from "../hooks/useSubscribeComments";
import useInsertComment from "../hooks/useInsertComment";
import './Detail.css'

export default function Detail(props) {

    const urlNow = props.location.pathname
    const uriSplit = urlNow.split('/')
    console.log(uriSplit[2])

    console.log("props", props)
    const ID = props.location.state.ID_POST
    const ID_USER = 2;
    console.log("ID_POST", ID)
    const [detail, getDetail] = useState([])
    const [comments, getComments] = useState([])
    const [commentPost, setCommentPost] = useState("")
    const {detailData, detailLoading, detailError} = useGetDonatePostById(ID);
    const {commentsData, commentsLoading, commentsError} = useSubscribeComments(ID);
    const {insertComment, loadingInsertComment} = useInsertComment();
    // console.log("commentsData", commentsData.donate_post)
    const history = useHistory();
    

    const fetchDetail = async() => {

        try{
            await getDetail(detailData?.donate_post[0])
            console.log("detail", detail)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = async() => {
        try{
            await getComments(commentsData?.donate_post[0])
            console.log("commentsData", comments)
        } catch (error) {
            console.log(error)
        }
    }
    
    const insertCommentOne = (comment_post) => {
        insertComment({variables: {
            object: {
                ID_POST: ID,
                ID_USER: ID_USER,
                Comment_post: comment_post
            }
        }})
    }

    const onChange = (e) => {
        setCommentPost(
            e.target.value
        )
        console.log("commentPost", commentPost)
    }
    const handleSubmit = (e) => {
        console.log("handleSubmit")
        insertCommentOne(commentPost)
        setCommentPost({
            commentPost: ""
        })
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
        <p className="detail-title font-signika">{detail?.Title}</p>
        <div className="row detail-row-1 justify-content-center">
            <div className="col-md-10 detail-post font-signika">
                <img className="detail-img shadow-lg" src={detail?.IMAGE_URL}/>
                <p className="detail-subtitle">{detail?.Subtitle}</p>
                <p className="detail-description">{detail?.Description}</p>
                
            </div>
            <div className="col-md-2 detail-info">
                <NavLink to="/donate" type="button" className="btn btn-donate-now">Donate Now</NavLink>
                <p className="text-raised mb-0"><span className="donation-raised font-signika">Rp{comments?.Donation_Raised}</span> Raised</p>
                <p>of Goal Rp{comments?.Donation_Total}</p>
            </div>
        </div>
        <div className="row justify-content-center">
        <h4 className="text-support mt-5 mx-auto text-center">Support from #ECOFriends</h4>
            {/* <div className=""> */}
            <textarea name='commentPost' type="text" className="form-control form-comment font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChange} required/>
            <button onClick={handleSubmit} className="btn btn-post-comment ms-2 mt-2 mb-5 font-signika">Add comment</button>
            {/* </div> */}
            <div className="row  mt-4 mx-auto">
                {commentsData?.donate_post[0].comments.length === 0 ?
                    <h5> No comments </h5> :
                    commentsData?.donate_post[0].comments.map((comment) => (
                        <div className="row justify-content-center">
                            <div className="col-md-auto align-middle card-comment  ">
                                <Avatar name="Sisca Saras" size={50} round={true}/>
                            </div>
                            <div className="col-md-4 card-comment  ">
                                <p>Sisca Saras</p>
                                {comment.Comment_post}
                            </div>                        
                        </div>
                        
                    ))}
            </div>

        </div>
            
            
        </>
    )
    
}