import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Avatar from 'react-avatar';
import HeaderLogo from "../components/HeaderLogo";
import { useGetDonatePostById } from "../hooks/useGetDonatePost";
import useSubscribeComments from "../hooks/useSubscribeComments";
import useInsertComment from "../hooks/useInsertComment";
import { useGetAllUser, useGetUserById } from "../hooks/useGetAllUser";
import useDeleteComment from "../hooks/useDeleteComment";
import useSubscribeInfo from "../hooks/useSubscribeInfo";
import './Detail.css'
import useUpdateComment from "../hooks/useUpdateComment";

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
    const [info, getInfo] = useState([])
    const [getEdit, setEdit] = useState({
        editState: false,
        ID_COMMENT: 0,
        Comment_post: ""
    })
    // const [user, getUser] = useState([])
    const [commentPost, setCommentPost] = useState("")
    const {detailData, detailLoading, detailError} = useGetDonatePostById(ID);
    const {commentsData, commentsLoading, commentsError} = useSubscribeComments(ID);
    const {infoData, infoLoading, infoError} = useSubscribeInfo(ID)
    const {insertComment, loadingInsertComment} = useInsertComment();
    const {deleteComment, loadingDeleteComment} = useDeleteComment();
    const {updateComment, loadingUpdateComment} = useUpdateComment();
    // const {userDataById, userErrorById } = useGetUserById(ID_USER)
    // const {userData, userError} = useGetAllUser();
    // console.log("commentsData", commentsData.donate_post)
    const history = useHistory();
    const action = (ID) => {
        // getPostId(data?.donate_post.ID_POST)
        history.push(
            {
                pathname: `/donate`,
                state: {
                    ID_POST: ID,
                    Donation_Raised: info?.Donation_Raised
                }
                
            }
        )
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

    // const fetchUser = async() => {
    //     try{
    //         await getUser(userDataById?.user)
    //         console.log("user", user)
    //     } catch (error) {
    //         console.log("error fetch user", error)
    //     }
    // }
    
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

    const updateCommentByPk = (ID_COMMENT, Comment_post) => {
        updateComment({variables: {
            ID_COMMENT: ID_COMMENT,
            Comment_post: Comment_post
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
        updateCommentByPk(getEdit.ID_COMMENT, getEdit.Comment_post)
        setEdit({...getEdit,
        editState: !getEdit.editState,
        ID_COMMENT: 0})
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
        fetchInfo();
        // fetchUser();
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
                <button onClick={() => action(ID)} type="button" className="btn btn-donate-now">Donate Now</button>
                <p className="text-raised mb-0"><span className="donation-raised font-signika">Rp{info?.Donation_Raised}</span> Raised</p>
                <p>of Goal Rp{info?.Donation_Total}</p>
            </div>
        </div>
        <div className="row justify-content-center">
        <h4 className="text-support mt-5 mx-auto text-center">Support from #ECOFriends</h4>
            {/* <div className=""> */}
            <textarea name='commentPost' type="text" className="form-control form-comment font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChange} required/>
            <button onClick={handleSubmit} className="btn btn-post-comment ms-2 mt-2 mb-5 font-signika">Add comment</button>
            {/* </div> */}
            <div className="row  mt-4 mx-auto">
                {commentsData?.comments.length === 0 ?
                    <h5> No comments </h5> :
                    commentsData?.comments.map((comment) => (
                        <div className="row justify-content-center">
                            <div className="col-md-auto align-middle card-comment  ">
                                <Avatar name={comment.user.name} size={50} round={true}/>
                            </div>
                            <div className="col-md-4 card-comment  ">
                                <p>{comment.user.name}</p>
                                {getEdit.ID_COMMENT === comment.ID_COMMENT && getEdit.editState === true? 
                                <div>
                                    <textarea name='commentPost' type="text" className="form-control form-comment-edit font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChangeEdit} value={getEdit.Comment_post} required/>
                                    <button onClick={handleSubmitEdit} className="btn btn-post-comment">Edit comment</button>
                                </div>
                                 :
                                <p>{comment.Comment_post}</p>
                                }
                                {/* <textarea name='commentPost' type="text" className="form-control form-comment font-signika mt-2" placeholder="Say something nice here" id="validationDefault02" onChange={onChange} required/>
            <button onClick={handleSubmit} className="btn btn-post-comment ms-2 mt-2 mb-5 font-signika">Add comment</button> */}
                                {/* {comment.Comment_post} */}
                            </div>
                            {comment.ID_USER === ID_USER ? 
                                <div className="col-md-auto card-comment">
                                    <i onClick={() => handleEdit(comment.ID_COMMENT, comment.Comment_post)} class="fas fa-edit me-2"></i>
                                    <i onClick={() => deleteCommentByPk(comment.ID_COMMENT)} class="fas fa-trash-alt"></i>
                                </div>   :
                                <div className="col-md-auto empty-comment"></div> 
                            }
                                                  
                        </div>
                        
                    ))}
            </div>

        </div>
            
            
        </>
    )
    
}