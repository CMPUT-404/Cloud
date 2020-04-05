//
// import React from 'react';
// import 'antd/dist/antd.css';
// import './CardContent.css';
// import { Card,Button } from 'antd';
// import { Modal} from 'antd';
// import  { Link } from 'react-router-dom'
// import axios from 'axios';
//
//
// class ProfileCardContent extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             ModalText: "display a list of comments",
//             confirmLoading: false,
//             editVisible: false,
//             token: localStorage.getItem("token")
//           };
//
//     }
//
//     displayProfile(){
//         //Route to profile
//         window.alert("Going to user's profile")
//         return <Link to={'/Profile'} >see more</Link>
//     }
//
//     deletePost =() => {
//       alert("🌬 Deleting your post.....")
//       axios.delete("https://cloud-align-server.herokuapp.com/posts/"+this.props.post.id, {headers:{Authorization: "Token "+this.state.token}})
//       .then(()=>{
//         window.location.reload()
//       })
//
//     }
//
//     editPost = () =>{
//         this.setState({editVisible:true})
//     }
//
//     save_edit = () =>{
//
//       var new_title = document.getElementById('edit_title').value
//       var new_text = document.getElementById('edit_content').value
//
//       if (new_title === "" && new_text === ""){
//         this.setState({editVisible:false})
//         return
//       }
//
//
//       axios.patch("https://cloud-align-server.herokuapp.com/posts/"+this.props.post.id+"/",
//       {content:new_text,
//         title:new_title}, {headers:{
//        "Authorization":"Token "+ this.state.token,
//      }
//    })
//      .then(()=>{
//        window.location.reload()
//      }).catch(function(err){
//        alert(err)
//      })
//     }
//
//     handleOk = () => {
//         this.setState({
//           ModalText: 'Posting your comment',
//           confirmLoading: true,
//         });
//         setTimeout(() => {
//           this.setState({
//             visible: false,
//             confirmLoading: false,
//           });
//         }, 2000);
//       };
//
//     handleCancel = () => {
//         console.log('Clicked cancel button');
//         this.setState({
//           visible: false,
//         });
//       };
//
//       exit_edit = () =>{
//         this.setState({editVisible:false})
//       }
//
//
//     render(){
//         return(
//             <div>
//                 <Card title={this.props.post.title}
//                   extra={ <Link to={  { pathname:'/Timeline/' + this.props.post.id,
//                   state:{user: this.props.post.id,
//                           text: this.props.post.plainText}}
//                   } >
//                     see more </Link> }>
//
//
//
//
//                     <Link to={{ pathname:'/OtherProfile/'+ this.props.post.author.displayName,
//                       state:{
//                         author:this.props.post.author,
//                         token: this.state.token,
//                       } }}>{this.props.post.author.displayName}</Link>
//
//                     <Link to={'/Profile/'}><img id="cardProfile" alt='profile' align="left" src={require('../Images/profile.jpeg')} /></Link>
//
//                     <p>{this.props.post.content}</p>
//                     <img alt = '' src={this.props.post.image}/><br/>
//                     <Button onClick={this.deletePost}>Delete</Button>
//                     <Button onClick={this.editPost}>Edit Post</Button>
//
//                     <Modal title={this.props.post.title}
//                            visible={this.state.editVisible}
//                            onOk ={this.save_edit}
//                            onCancel={this.exit_edit}
//                     >
//                       <textarea rows="1" placeholder="new title" id="edit_title"></textarea><br></br>
//                       <textarea rows="3" cols="45" placeholder="new content" id="edit_content"></textarea>
//
//                     </Modal>
//
//
//                 </Card>
//             </div>
//         )
//     }
// }
//
// export default ProfileCardContent
