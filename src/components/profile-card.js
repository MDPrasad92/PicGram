import deleteIcon from '../assets/delete.png'
export const AppProfileCard = ({showImage, deleteComment ,PostData,PostTextData, incAndDecLikes,obj,index })=>{
return<>
    <div className="col m3">
    <div className="image-data">
        <div>
            <img src={obj.url} alt={obj.category} onClick={(e) => showImage(obj)} />
        </div>
        <div className="like-content">
            <span className="like-count"> <span className="like-status" onClick={() => incAndDecLikes(obj.likes, index, obj.likeStatus)}><b>{obj.likeStatus} :</b></span> {obj.likes}  </span><span className="like-category">{obj.category}</span>
        </div>
        <div className="post-content">
            <span>
                <input type="text" className="content-textbox" key={index + 1} value={obj.commentText} placeholder="Type your comment here..." onChange={(e) => PostTextData(e, index)} />
            </span>
            <span>
                <button type="button" disabled={obj.commentText === "" ? true : false} className="btn info" onClick={(e) => PostData(e, obj.commentText, index)}>Post</button>
            </span>
        </div>
        <div className="table-style">
            <table>
                <tbody>
                    {obj.comments.map((col, indexComment) =>
                        <tr key={indexComment + 1}>
                            <td>{col}</td>
                            <td className="td-width"><img title="Delete Comment" onClick={() => deleteComment(index, indexComment)} className="deleteIcon" src={deleteIcon} alt="deleteData" /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
</div>
</>
};