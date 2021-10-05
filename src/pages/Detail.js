import { useEffect, useState } from "react";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Avatar from 'react-avatar';
import { Modal, Button, ProgressBar } from "react-bootstrap";
import { useGetDonatePostById } from "../hooks/useGetDonatePost";
import useSubscribeComments from "../hooks/useSubscribeComments";
import useInsertComment from "../hooks/useInsertComment";
import { useGetAllUser, useGetUserById } from "../hooks/useGetAllUser";
import useDeleteComment from "../hooks/useDeleteComment";
import useSubscribeInfo from "../hooks/useSubscribeInfo";
import './Detail.css'
import useUpdateComment from "../hooks/useUpdateComment";
import NumberFormat from "react-number-format";
import { auth } from "../firebase"; 
import ModalPrivate from "../components/ModalPrivate";
import Logo from '../components/Logo'
import tree from '../assets/tree.png'
import Loader from "react-loader-spinner";

export default function Detail(props) {

    const [ID_USER, getActiveUser] = useState("")
    auth.onAuthStateChanged((user) => {
        if (user === null) {
            getActiveUser('0')
        } else {
            getActiveUser(user.uid);
        }
      })

    const urlNow = props.location.pathname
    const uriSplit = urlNow.split('/')
    console.log(uriSplit[2])

    console.log("props", props)
    const ID = props.location.state.ID_POST
    // const ID_USER = 2;
    console.log("ID_POST", ID)

    const [detail, getDetail] = useState([])
    const [comments, getComments] = useState([])
    const [info, getInfo] = useState([])
    const [getEdit, setEdit] = useState({
        editState: false,
        ID_COMMENT: 0,
        Comment_post: ""
    })
    const [getEdited, setEdited] = useState(true)
    const [show, setShow] = useState(false);
    const [commentPost, setCommentPost] = useState("")
    const {detailData, detailLoading, detailError} = useGetDonatePostById(ID);
    const {commentsData, commentsLoading, commentsError} = useSubscribeComments(ID);
    const {infoData, infoLoading, infoError} = useSubscribeInfo(ID)
    const {insertComment, loadingInsertComment} = useInsertComment();
    const {deleteComment, loadingDeleteComment} = useDeleteComment();
    const {updateComment, loadingUpdateComment} = useUpdateComment();

    console.log('commentsData out', commentsData)
    const history = useHistory();
    const goBack = () => {
        history.goBack()
    }
    const action = (ID) => {
        console.log("getInAction")
        console.log("ID_USER", ID_USER)
        if (ID_USER !== '0') {
            console.log('go to donate')
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
            console.log("getInModal");
            setShow(true)

        }
        console.log("ID_POST", ID)
    }

    const fetchDetail = async() => {

        try{
            await getDetail(detailData?.donate_post[0])
            console.log("detail", detail)
        } catch (error) {
            console.log("error fetch detail", error)
        }
    }

    const fetchComments = async() => {
        try{
            await getComments(commentsData)
            console.log("commentsData", comments)
        } catch (error) {
            console.log("error fetch comments", error)
        }
    }

    const fetchInfo = async() => {
        try{
            await getInfo(infoData?.donate_post[0])
            console.log("infoData", info)
        } catch (error) {
            console.log("error fetch info", error)
        }
    }
    
    const insertCommentOne = (Comment_post) => {
        insertComment({variables: {
            object: {
                ID_POST: ID,
                ID_USER: ID_USER,
                Comment_post: Comment_post
            }
        }})
    }

    const deleteCommentByPk = (ID_COMMENT) => {
        deleteComment({variables: {
            ID_COMMENT: ID_COMMENT 
        }})

    }

    const updateCommentByPk = (ID_COMMENT, Comment_post, isEdited) => {
        updateComment({variables: {
            ID_COMMENT: ID_COMMENT,
            Comment_post: Comment_post,
            isEdited: isEdited
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
        console.log("getEditedIn")
        setEdited(true)
        console.log("getEdited", getEdited)
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
        <header className="shadow-sm p-2">
            <Logo />
        </header>
        {detailLoading || commentsLoading || infoLoading === true?
        <div className="my-5 align-middle">
            <Loader className="text-center mx-auto" type="TailSpin" color="#528A62" height={80} width={80}/>
        </div>
        :
        <>
        <div className=" mx-5 my-2 back-button">
                            <i onClick={goBack} className="fa fa-chevron-left fa donate-cursor" aria-hidden="true"><span className="ms-2 fs-5 font-signika">Back</span></i>
                        </div>
            <p className="detail-title font-signika">{detail?.Title}</p>
        <div className="row detail-row-1 justify-content-center">
            <div className="col-md-10 detail-post font-signika">
                <img className="detail-img shadow-lg" src={detail?.IMAGE_URL}/>
                <p className="detail-subtitle">{detail?.Subtitle}</p>
                <p className="detail-description">{detail?.Description}</p>
                
            </div>
            <div className="col-md-2 detail-info">
                <h4 className="text-center font-signika text-uppercase mt-2">Info</h4>
                
                <h5 className="text-center font-signika text-success mb-0"> <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={info?.Donates}
                    decimalSeparator=""
                    displayType="text"
                    type="tel"
                    thousandSeparator={true}
                    allowNegative={false} /> Donates</h5>
                <ProgressBar now={info?.Donation_Raised} min={0} max={info?.Donation_Total} variant="success" style={{height: "15px"}} className="mt-2 mb-4 rounded-pill"/>
                
                
                <div className="row mt-4">
                <img src={tree} className="col-3"/>
                <p className="text-raised mb-0 ps-0 col-9"><NumberFormat
                    className="donation-raised font-signika"
                    thousandsGroupStyle="thousand"
                    value={info?.Donation_Raised}
                    prefix="Rp"
                    decimalSeparator=""
                    displayType="text"
                    type="tel"
                    thousandSeparator={true}
                    allowNegative={false} /> Raised of Goal Rp{info?.Donation_Total}</p>
                {/* <p>of Goal Rp{info?.Donation_Total}</p> */}
                </div>
                <div className="text-center">
                    <button onClick={() => action(ID)} className="btn btn-donate-now mx-auto my-4">Donate Now</button>
                </div>
                {/* <p className="text-raised mb-0"><span className="donation-raised font-signika">Rp{info?.Donation_Raised}</span> Raised</p>
                <p>of Goal Rp{info?.Donation_Total}</p> */}
            </div>
        </div>
        <div className="row justify-content-center">
        <h4 className="text-support mt-5 mx-auto text-center">Support from #ECOFriends</h4>
            {ID_USER !== "0"?
                <div className="row justify-content-center">
                    <textarea name='commentPost' type="text" className="form-control form-comment font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChange} required/>
                    <button onClick={handleSubmit} className="btn btn-post-comment ms-2 mt-2 mb-5 font-signika">Add comment</button>
                </div>
            :
                <div className="text-center card-comment-nologin card mx-auto mt-4">
                    
                    <h4 className="my-auto"><i class="fas fa-key"></i> <NavLink to="/login" className="text-success ms-2">Sign in</NavLink> or <NavLink to="/signup" className="text-success">sign up</NavLink> to comment! </h4>
                </div>
            }
            {/* <div className="row justify-content-center">
            <textarea name='commentPost' type="text" className="form-control form-comment font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChange} required/>
            <button onClick={handleSubmit} className="btn btn-post-comment ms-2 mt-2 mb-5 font-signika">Add comment</button>
            </div> */}
            <div className="row  mt-4 mx-auto">
                {commentsData?.comments.length === 0 ?
                    <h5 className="text-center my-5"> No comments </h5> :
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
                                {/* <textarea name='commentPost' type="text" className="form-control form-comment font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChange} required/>
            <button onClick={handleSubmit} className="btn btn-post-comment ms-2 mt-2 mb-5 font-signika">Add comment</button> */}
                                {/* {comment.Comment_post} */}
                            </div>
                            {comment.ID_USER === ID_USER ? 
                                <div className="col-md-auto card-comment bg-comment bg-gradient rounded-end">
                                    {/* <i onClick={() => handleEdit(comment.ID_COMMENT, comment.Comment_post)} class="text-muted">Edit</i>
                                    <i onClick={() => deleteCommentByPk(comment.ID_COMMENT)} class="text-muted ms-1">Delete</i> */}
                                    <i onClick={() => handleEdit(comment.ID_COMMENT, comment.Comment_post)} class="fas fa-edit me-2"></i>
                                    <i onClick={() => deleteCommentByPk(comment.ID_COMMENT)} class="fas fa-trash-alt"></i>
                                </div>   :
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