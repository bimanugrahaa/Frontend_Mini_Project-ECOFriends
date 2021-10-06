import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Loader from "react-loader-spinner";
import Avatar from 'react-avatar';
import NumberFormat from "react-number-format";
import { auth } from "../firebase"; 
import { useGetDonatePostById } from "../hooks/useGetDonatePost";
import useSubscribeComments from "../hooks/useSubscribeComments";
import useInsertComment from "../hooks/useInsertComment";
import useDeleteComment from "../hooks/useDeleteComment";
import useSubscribeInfo from "../hooks/useSubscribeInfo";
import useUpdateComment from "../hooks/useUpdateComment";
import Header from "../components/Header";
import ModalPrivate from "../components/ModalPrivate";
import tree from '../assets/tree.png'
import './Detail.css'

export default function Detail() {

    //Loading comment
    //Alert delete comment
    //Private route
    //Not found
    //About us
    const history = useHistory();

    /* Get active user */
    const [ID_USER, getActiveUser] = useState("")
    auth.onAuthStateChanged((user) => {
        if (user === null) {
            getActiveUser('0')
        } else {
            getActiveUser(user.uid);
        }
      })

    /* Get current url and ID */
    const urlNow = window.location.pathname
    const uriSplit = urlNow.split('/')
    const ID = uriSplit[2]

    /* Get data from hasura */
    const {detailData, detailLoading, detailError} = useGetDonatePostById(ID);
    const {commentsData, commentsLoading, commentsError} = useSubscribeComments(ID);
    const {infoData, infoLoading, infoError} = useSubscribeInfo(ID)
    const [detail, getDetail] = useState([])
    const [comments, getComments] = useState([])
    const [info, getInfo] = useState([])

    /* Handle comment */
    const {insertComment, loadingInsertComment} = useInsertComment();
    const {deleteComment, loadingDeleteComment} = useDeleteComment();
    const {updateComment, loadingUpdateComment} = useUpdateComment();
    const [getEdit, setEdit] = useState({
        editState: false,
        ID_COMMENT: 0,
        Comment_post: ""
    })
    const [getEdited, setEdited] = useState(true)
    const [commentPost, setCommentPost] = useState("")

    /* Handle donate click modal */
    const [show, setShow] = useState(false);
    
    /* Handle donate button */
    const action = (ID) => {
        if (ID_USER !== '0') {
            history.push(
                {
                    pathname: `/donate`,
                    state: {
                        ID_POST: ID,
                        Donation_Raised: info?.Donation_Raised
                    }
                    
                }
            )
        } else {
            setShow(true)
        }
    }

    /* Get detail */
    const fetchDetail = async() => {
        try{
            await getDetail(detailData?.donate_post[0])
        } catch (error) {
            console.log("error fetch detail", error)
        }
    }

    /* Get comments */
    const fetchComments = async() => {
        try{
            await getComments(commentsData)
        } catch (error) {
            console.log("error fetch comments", error)
        }
    }

    /* Get info */
    const fetchInfo = async() => {
        try{
            await getInfo(infoData?.donate_post[0])
            console.log("infoData", info)
        } catch (error) {
            console.log("error fetch info", error)
        }
    }
    
    /* Insert comment by user */
    const insertCommentOne = (Comment_post) => {
        insertComment({variables: {
            object: {
                ID_POST: ID,
                ID_USER: ID_USER,
                Comment_post: Comment_post
            }
        }})
    }

    /* Delete comment by ID */
    const deleteCommentByPk = (ID_COMMENT) => {
        deleteComment({variables: {
            ID_COMMENT: ID_COMMENT 
        }})

    }

    /* Update comment by ID */
    const updateCommentByPk = (ID_COMMENT, Comment_post, isEdited) => {
        updateComment({variables: {
            ID_COMMENT: ID_COMMENT,
            Comment_post: Comment_post,
            isEdited: isEdited
        }})
    }

    /* Handle comment submit */
    const handleSubmit = (e) => {
        insertCommentOne(commentPost)
        setCommentPost("")
    }

    /* Handle edit comment */
    const handleEdit = (ID_COMMENT, Comment_post) => {
        setEdit({...getEdit,
            editState: !getEdit.editState,
            ID_COMMENT: ID_COMMENT,
            Comment_post: Comment_post
        })
    }

    const onChangeEdit = (e) => {
        setEdit({...getEdit,
            Comment_post: e.target.value
        })
    }

    const handleSubmitEdit = () => {
        setEdited(true)
        updateCommentByPk(getEdit.ID_COMMENT, getEdit.Comment_post, getEdited)
        setEdit({...getEdit,
        editState: !getEdit.editState,
        ID_COMMENT: 0})
    }

    useEffect(() => {
        fetchDetail();
        fetchComments();
        fetchInfo();
    })


    return(
        <>
        <Header/>
        {detailLoading || commentsLoading || infoLoading === true?
            <div className="my-5 align-middle">
                <Loader className="text-center mx-auto" type="TailSpin" color="#528A62" height={80} width={80}/>
            </div>
        :
            <>
            <div className=" mx-5 my-2 back-button">
                <i onClick={() => {history.replace('/fundraising')}} className="fa fa-chevron-left fa donate-cursor" aria-hidden="true"><span className="ms-2 fs-5 font-signika">Back</span></i>
            </div>
            <p className="detail-title font-signika">{detail?.Title}</p>
            <div className="row detail-row-1 justify-content-center">
                <div className="col-md-10 detail-post font-signika">
                    <img className="detail-img shadow-lg" src={detail?.IMAGE_URL} alt="Post img"/>
                    <p className="detail-subtitle">{detail?.Subtitle}</p>
                    <p className="detail-description">{detail?.Description}</p>
                </div>
                <div className="col-md-2 detail-info">
                    <h4 className="text-center font-signika text-uppercase mt-2">Info</h4>
                    <h5 className="text-center font-signika text-success mb-0">
                        <NumberFormat
                        thousandsGroupStyle="thousand"
                        value={info?.Donates}
                        decimalSeparator=""
                        displayType="text"
                        type="tel"
                        thousandSeparator={true}
                        allowNegative={false}/> Donates</h5>
                    <ProgressBar now={info?.Donation_Raised} min={0} max={info?.Donation_Total} variant="success" style={{height: "15px"}} className="mt-2 mb-4 rounded-pill"/>
                    <div className="row mt-4">
                        <img src={tree} className="col-3" alt="tree icon"/>
                        <p className="text-raised mb-0 ps-0 col-9">
                            <NumberFormat
                            className="donation-raised font-signika"
                            thousandsGroupStyle="thousand"
                            value={info?.Donation_Raised}
                            prefix="Rp"
                            decimalSeparator=""
                            displayType="text"
                            type="tel"
                            thousandSeparator={true}
                            allowNegative={false} /> Raised of Goal
                            <NumberFormat
                            className=" font-signika"
                            thousandsGroupStyle="thousand"
                            value={info?.Donation_Total}
                            prefix=" Rp"
                            decimalSeparator=""
                            displayType="text"
                            type="tel"
                            thousandSeparator={true}
                            allowNegative={false} />
                        </p>
                    </div>
                    <div className="text-center">
                        <button onClick={() => action(ID)} className="btn btn-donate-now mx-auto my-4">Donate Now</button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <h4 className="text-support mt-5 mx-auto text-center">Support from #ECOFriends</h4>
                {ID_USER !== "0"?
                    <div className="row justify-content-center">
                        <textarea name='commentPost' type="text" className="form-control form-comment font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" value={commentPost} onChange={(e) => setCommentPost(e.target.value)} required/>
                        <button onClick={handleSubmit} className="btn btn-post-comment ms-2 mt-2 mb-5 font-signika">Add comment</button>
                    </div>
                :
                    <div className="text-center card-comment-nologin card mx-auto mt-4">
                        
                        <h4 className="my-auto"><i class="fas fa-key"></i> <NavLink to="/login" className="text-success ms-2">Sign in</NavLink> or <NavLink to="/signup" className="text-success">sign up</NavLink> to comment! </h4>
                    </div>
                }
                <div className="row  mt-4 mx-auto">
                {commentsData?.comments.length === 0 ?
                    <h5 className="text-center my-5"> No comments </h5> 
                :
                    commentsData?.comments.map((comment) => (
                        <div className="row justify-content-center">
                            <div className="col-md-auto align-middle card-comment bg-comment bg-gradient rounded-start">
                                <Avatar name={comment.user.name} size={50} round={true}/>
                            </div>
                            <div className="col-md-4 card-comment bg-comment bg-gradient ">
                                <p className="mb-0 fs-6">{comment.user.name}
                                {comment.isEdited?
                                    <span className="text-muted"> (Edited) </span>
                                :
                                    <span></span>
                                }
                                </p>
                                <span className="text-muted">{comment.Date}</span>
                                {getEdit.ID_COMMENT === comment.ID_COMMENT && getEdit.editState === true? 
                                    <div>
                                        <textarea name='commentPost' type="text" className="form-control form-comment-edit font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChangeEdit} value={getEdit.Comment_post} required/>
                                        <button onClick={handleSubmitEdit} className="btn btn-post-comment mt-1">Edit comment</button>
                                    </div>
                                :
                                    <p className="mt-2">{comment.Comment_post}</p>
                                }
                            </div>
                            {comment.ID_USER === ID_USER ? 
                                <div className="col-md-auto card-comment bg-comment bg-gradient rounded-end">
                                    <i onClick={() => handleEdit(comment.ID_COMMENT, comment.Comment_post)} class="fas fa-edit me-2"></i>
                                    <i onClick={() => deleteCommentByPk(comment.ID_COMMENT)} class="fas fa-trash-alt"></i>
                                </div>   
                                :
                                <div className="col-md-auto empty-comment bg-comment bg-gradient rounded-end"></div> 
                            }                
                        </div>
                    ))}
                </div>
            </div>
            <ModalPrivate show={show} />
            </>
            }  
        </>
    )
}