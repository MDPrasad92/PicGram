import React from 'react';
import '../assets/app.scss';
import { asyncGetImaginaryAction } from '../redux/action/action'
import { connect } from "react-redux";
import {AppProfileHeader} from './profile-header';
import {AppProfileCard} from './profile-card';


class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            totalList: [],
            model:{
                toggle:false,
                src:'',
                alt: ''
            }
        }
    }
    async componentDidMount() {
        const end_poind_url = "https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json";
        await this.props.asyncGetImaginaryAction(end_poind_url);
        await this.getResult(this.props.data);
    }
    getResult = async (list) => {
        let result = list.map(function (el) {
            let o = Object.assign({}, el);
            o.commentText = "";
            o.clearValue = "";
            o.likeStatus = "Like";
            return o;
        });
        await this.setState({ ...this.state, dataList: result, totalList: result });
    }

    PostData = async (event, comment, index) => {
        if (comment.trim() !== "") {
            this.state.dataList[index].comments.unshift(comment);
            this.state.dataList[index].commentText = "";
            await this.setState({ ...this.state, dataList: this.state.dataList });
        }
    }
    PostTextData = async (event, index) => {
        debugger;
        this.state.dataList[index].commentText = event.target.value;
        await this.setState({ ...this.state, dataList: this.state.dataList });
    }
    incAndDecLikes = async (likeCount, index, status) => {
        this.state.dataList[index].likes = status === "Like" ? likeCount + 1 : likeCount - 1;
        this.state.dataList[index].likeStatus = status === "Like" ? "Unlike" : "Like";
        await this.setState({ ...this.state, dataList: this.state.dataList });
    }
    mostLiked = async () => {
        let list = this.state.dataList.sort((a, b) => b.likes - a.likes);
        await this.setState({ ...this.state, dataList: list });
    }
    mostCommented = async () => {
        debugger
        let list = this.state.dataList.sort((a, b) => b.comments.length - a.comments.length);
        await this.setState({ ...this.state, dataList: list });
    }
    normal = async () => {
        debugger
        await this.setState({ ...this.state, dataList: this.state.totalList });
    }
    searchImages = async (event) => {
        debugger;
        let result = [];
        if (event.target.value !== "") {
            result = this.state.dataList.filter(function (a) {
                return a.category.toLocaleLowerCase() === event.target.value.toLocaleLowerCase();
            });
        }
        if (result.length > 0) {
            await this.setState({ ...this.state, dataList: result });
        }
        else {
            await this.setState({ ...this.state, dataList: this.state.totalList });
        }
    }
    deleteComment = async (parentID, childID) => {
        this.state.dataList[parentID].comments.splice(childID, 1);
        await this.setState({ ...this.state, dataList: this.state.dataList });
    }
    showImage = async(obj) => {
        await this.setState({...this.state, model: {toggle: true, src: obj.url, alt: obj.category}})

    }
    hideImage = async() => {
        await this.setState({...this.state, model: {toggle: false, src: '', alt: ''}})
    }

    render() {
        return (
            <>

                    <AppProfileHeader 
                        mostLiked={() => this.mostLiked()}
                        mostCommented={() => this.mostCommented()}
                        searchImages={(e) => this.searchImages(e)}
                    />                
                    <div className="body-content">
                        <div className="container">
                            <div className="row">
                                {
                                    this.state.dataList.length > 0 && this.state.dataList.map((obj, index) =>
                                        <AppProfileCard 
                                        showImage={this.showImage}
                                        deleteComment={this.deleteComment}
                                        PostData ={this.PostData}
                                        PostTextData ={this.PostTextData}
                                        incAndDecLikes ={this.incAndDecLikes}
                                        obj={obj}
                                        key={index}
                                        index={index}/>                                
                                    )
                                }
                            </div>
                        </div>
                    </div>
                {this.state.model.toggle && <div id="myModal" className="modal" data-keyboard="false" data-backdrop="static">
                    <span className="close" onClick={() => this.hideImage()}>×</span>
                    <img src={this.state.model.src} className="modal-content" alt={this.state.model.alt} id="img01"  />
                    <div className="hideModel" onClick={() => this.hideImage()}></div>
                    <div id="caption"></div>
                </div>}
            </>
        )
    }
}

const mapStateToProps = state => {
    const { imaginaryData: { data } } = state;
    return {
        data: data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        asyncGetImaginaryAction: (url) => dispatch(asyncGetImaginaryAction(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BodyContent);
