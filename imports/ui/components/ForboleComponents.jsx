import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';

export const Loading = ({size = 42}) => (
  <img src="/img/loading.svg" height={size} width={size} />
);

export const ValidateSuccess = () => (
  <span className="form-control-feedback">
    <i className="material-icons">done</i>
  </span>
);

export const ValidateFail = () => (
  <span className="form-control-feedback">
    <i className="material-icons">clear</i>
  </span>
)

export const Alert = (props) => {
  return (
    <div className={"alert alert-"+props.type}>
      <div className="container">
        <div className="alert-icon">
          <i className="material-icons">check</i>
        </div>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">
            <i className="material-icons">clear</i>
          </span>
        </button>
        {props.text}
      </div>
    </div>
  )
}

export const Skill = (props) => {
  return(
    <span className="label label-rose">{props.skill}</span>
  )
}

export const ProfileCard = (props) => {
    return (<div className="card card-profile card-plain">
      <div className="card-avatar">
        <Link to={"/@"+props.username}>
          <img className="img" src={props.picture} />
        </Link>
      </div>
      <div className="card-content text-center">
        <h4 className="card-title">{props.name}</h4>
        <div className="category text-grey"><span className="headline">{props.headline}</span><br/><span className="position">{props.position}</span></div>
        <p className="card-description">
          {props.text}
        </p>
      </div>
    </div>)
}

export class RecommendationCard extends Component {
  constructor(props){
    super(props);
  }

  handleShareLink = (e) =>{
    e.preventDefault();
    // console.log(e.target.dataset.link);

    const el = document.createElement('textarea');
    el.value = e.target.dataset.link;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    toast.success("The share URL has been copied to clipboard.");
  }

  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (
      <div className="card card-testimonial">
        <div className="card-avatar" style={bg}>
          <Link to={"/@"+this.props.username} />
        </div>
        <div className="card-content">
          <h4 className="card-title">{this.props.createdBy}</h4>
          <p className="category text-grey">{this.props.title}</p>
          <p className="time text-grey">Recommended on {moment(this.props.createdAt).format("Do MMM YYYY")}</p>
          <p className="card-description">
            {this.props.recommendation}
          </p>
          <div className="footer skills">
            {(this.props.skills)?this.props.skills.map((skill, i) => <Skill key={i} skill={skill} />):''}
          </div>
          <blockquote className="blockquote">{this.props.event}</blockquote>
          {(this.props.notAccepted)?
            <div className="footer text-danger">
              <div className="not-accepted">
                <i className="material-icons">error_outline</i> Not accepted yet
	    	      </div>
            </div>:''}
            {(this.props.acceptButton)?<div className="footer">
              <Link to={"/recommendation/accept/"+this.props.recoId} className="btn btn-primary">Response</Link>
            </div>:''}
            {(this.props.share && (this.props.acceptor != ''))?<div className="footer">
              <Link to="#" onClick={this.handleShareLink}><i className="material-icons" data-link={Meteor.settings.public.host+"/@"+this.props.acceptor+"/recommendation/"+this.props.recoId}>share</i></Link>
            </div>:''}
        </div>
      </div>
    )
  }
}

export class InvitationCard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (
      <div className="card card-testimonial">
        <div className="card-avatar" style={bg}>
          <Link to={"/@"+this.props.username} />
        </div>
        <div className="card-content">
          <h4 className="card-title">{this.props.createdBy}</h4>
          <p className="category text-grey">{this.props.title}</p>
          <blockquote className="blockquote">{this.props.relationship}</blockquote>
          {(this.props.recommendation)?<div>
          <p className="time text-grey">Recommended on {moment(this.props.createdAt).format("Do MMM YYYY")}</p>
          <p className="card-description">
            {this.props.recommendation}
          </p>
          <div className="footer skills">
            {(this.props.skills)?this.props.skills.map((skill, i) => <Skill key={i} skill={skill} />):''}
          </div>
          <blockquote className="blockquote">{this.props.event}</blockquote></div>:''}
        </div>
      </div>
    )
  }
}

export class ContributionListCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let action = "";
    let object = "";
    let toName = this.props.to;

    if (typeof this.props.to == "object"){
      toName = <Link to={"/@"+this.props.to.username}>{this.props.to.profile.name}</Link>;
    }

    // console.log(this.props);
    switch (this.props.type){
      case "recommendation":
        action = "recommended";
        object = <Link to={"/@"+this.props.to.username}>{this.props.to.profile.name}</Link>
        break;
      case "downvote":
        action = "downvoted";
        object = <span><em>{this.props.to}</em>'s <Link to={"#"}>recommendataion</Link> </span>;
        break;
      case "upvote":
        action = "voted";
        object = <span><em>{this.props.to}</em>'s <Link to="#">answer </Link> </span>;
        break;
      case "blog":
        action = "published";
        object = <Link to="#">{this.props.to}</Link>;
        break;
      case "connection":
        action = "connected with";
        object = <Link to={"/@"+this.props.to.username}>{this.props.to.profile.name}</Link>;
        break;
      case "post":
        action = "posted";
        object = <Link to="#">an update</Link>;
        break;
      case "comment":
        action = "commented";
        object = <span><em>{this.props.to}</em>'s <Link to="#">update</Link></span>;
        break;
      case "share":
        action = "shared";
        object = <span><em>{this.props.to}</em>'s <Link to="#">blog post</Link></span>;
        break;
      case "received-referral":
        action = "referred";
        object = <span>a business to {toName}</span>;
        break;
      case "referral":
        action = "helped";
        object = <span>{toName} with a business referral</span>;
        break;
      case "invite":
        action = "invited";
        object = <span>{toName} to join FRN</span>;
        break;
      case "introduction":
        action = "introduced";
        object = <span><Link to="#">{this.props.to}</Link> to <Link to="#">{this.props.object}</Link></span>;
        break;
    }
    return <div className="card contribution">
      <div className="card-content clearfix">
        <div className="col-xs-9">{this.props.from} <span className="text-info">{action}</span> {object} <em>{moment(this.props.time, "YYYYMMDD").fromNow()}</em>.</div>
        <div className="col-xs-3 text-right"><span className="label label-success">+ {this.props.score}</span></div>
      </div>
    </div>
  }
}
export class ConnectionsListCard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (
      <div className="card">
        <div className="card-body media">
          <div className="row">
            <div className="col-xs-3">
              <Link to={"/@"+this.props.username} className="pull-left">
                <div className="avatar" style={bg} />
              </Link>
            </div>
            <div className="col-xs-9">
              <h4 className="media-heading">{this.props.name}</h4>
              <h6 className="media-muted">{this.props.title}</h6>
            </div>
            <div className="media-footer col-xs-12">
              {(this.props.recoCount > 0)?<p>Received {this.props.recoCount} recommendations.</p>:''}
              {(this.props.skills.length > 0)?this.props.skills.map((skill, i) =>
                <span className="label label-rose" key={i}>{skill}</span>
              ):<div>No recommendation yet. </div>}
              {(this.props.otherSkills > 0)? <small>And {this.props.otherSkills} more skills</small>: ''}
            </div>
            <div className="col-xs-12">
              <Link to={"/recommend/"+this.props.title} className="btn btn-primary btn-round btn-sm">Recommend</Link> 
              <Link to={"/refer/"+this.props.title} className="btn btn-primary btn-round btn-sm">Refer</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class FeedCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      message: "",
      introA: "",
      introB: "",
      votes: 0,
      comments: 0,
      shares: 0,
      upvote: "",
      downvote: ""
    }
    // this.vote = this.vote.bind(this);
  }

  vote= (dir) => (e) => {
    // console.log(dir);
    // console.log(this.props.activity);
    Meteor.call('votes.add', dir, this.props.activity.type, this.props.activity.propId, (err, result) => {
      if (result){
        console.log(result);
      }
      if (err){
        console.log(err);
      }
    })
    // console.log(e);
  }

  componentDidUpdate(prevProps){
    if (this.props.activity != prevProps.activity){
      let activity = this.props.activity;
      
      if (activity.property && activity.user){
          console.log(activity);
        if (activity.property.votes != undefined){
          this.setState({
            votes: activity.property.votes
          })
        }

        Meteor.call('votes.exists', 1, activity.type, activity.propId, (err, result) => {
            if (err){
                console.log(err);
            }
            if (result){
                // console.log(result);
                this.setState({
                  upvote: "liked"
                })
            }
            else{
              this.setState({
                upvote: ""
              })
            }
        });

        Meteor.call('votes.exists', -1, activity.type, activity.propId, (err, result) => {
            if (err){
                console.log(err);
            }
            if (result){
                // console.log(result);
                this.setState({
                  downvote: "liked"
                })
            }
            else{
              this.setState({
                downvote: ""
              })
            }
        });

        switch (activity.type){
          case "introduction":
            this.setState({
              message: <div><Link to={"/@"+activity.user.username}>{activity.user.profile.name}</Link> has introduced {(activity.property.acceptor())?<Link to={"/@"+activity.property.acceptor().username}>{activity.property.acceptor().profile.name}</Link>:''} to {activity.property.referee()?<Link to="#">{activity.property.referee().profile.name}</Link>:''}.</div>,
              introA: (activity.property.acceptor())?activity.property.acceptor().profilePic():'',
              introB: (activity.property.referee())?activity.property.referee().profilePic():''
            })
            break;
          case "referral":
            this.setState({
              message: <div><Link to={"/@"+activity.user.username}>{activity.user.profile.name}</Link> has referred a bussiness opportunity to {activity.property.referee()?<Link to={"/@"+activity.property.referee().username}>{activity.property.referee().profile.name}</Link>:''}.</div>,
              // introA: activity.property.acceptor().profilePic(),
              // introB: activity.property.referee().profilePic()
            })
            break;
          case "received-referral":
            this.setState({
              message: <div>{(activity.property.referee())?<Link to={"/@"+activity.property.referee().username}>{activity.property.referee().profile.name}</Link>:''} has accepted being referred to {activity.property.acceptor()?<Link to={"/@"+activity.property.acceptor().username}>{activity.property.acceptor().profile.name}</Link>:activity.property.name}.</div>,
              // introA: activity.property.acceptor().profilePic(),
              // introB: activity.property.referee().profilePic()
            })
            break;
          case "recommendation":
            this.setState({
              message: <div>
                <Link to={"/@"+activity.user.username}>{activity.user.profile.name}</Link> recommended {activity.property.acceptor()?<Link to={"/@"+activity.property.acceptor().username}>{activity.property.acceptor().profile.name}</Link>:''}.
                <blockquote>{activity.property.recommendation}</blockquote>
                {(activity.property.skills.length>0)?activity.property.skills.map((skill,i) => <Skill key={i} skill={skill} />):''}
                </div>
            })
            break;
          case "invite":
            this.setState({
              message: <div><Link to={"/@"+activity.user.username}>{activity.user.profile.name}</Link> invited {activity.property.acceptor()?<Link to={"/@"+activity.property.acceptor().username}>{activity.property.acceptor().profile.name}</Link>:''} to join <strong className="text-primary">FRN</strong>.</div>
            })
            break;
        }
      }
    }
  }

  render(){
    let activity = this.props.activity;
    return <div className="card card-blog feed">
      <div className="card-header">
        {activity.user?
        <div className="author">
          <Link to={(activity.user)?"/@"+activity.user.username:"#"}>
            <div className="row">
              <div className="col-xs-2">
                <img src={(activity.user)?activity.user.profilePic():''} alt={(activity.user)?activity.user.profile.name:''} className="avatar img-raised" />
              </div>
              <div className="col-xs-10">
                <span>{(activity.user)?activity.user.profile.name:''}</span><br/>
                <span className="headline">{(activity.user)?activity.user.profile.headline:''}</span>
                <span className="timeago">{moment(activity.createdAt).fromNow()}</span>
              </div>
            </div>
          </Link>
        </div>
        :''}
        <div className="row message">{this.state.message}</div>
      </div>
      {(this.props.cardImage)?
      <div className="card-image">
        <Link to="#pablo">
          <img className="img" src={this.props.cardImage} />
	    								</Link>
        <div className="ripple-container"></div>
        </div>:''}
        <div className="card-content">
          {(this.props.category)?<h6 className="category text-danger">
            {this.props.category}
	    								</h6>:''}
          {(this.props.title)?<h4 className="card-title">
            <Link to="#pablo">{this.props.title}</Link>
          </h4>:''}
          {(this.state.introA)?<div className="introduction row">
            <div className="col-xs-5"><img className="avatar img-raised" src={this.state.introA} /></div>
            <div className="col-xs-2"><i className="material-icons symbol">all_inclusive</i></div>
            <div className="col-xs-5"><img className="avatar img-raised" src={this.state.introB} /></div>
          </div>:''}
          <div className="footer">
            <div className="engagement row text-center">
            <div className="col-xs-4"><i className={"material-icons " + this.state.upvote} onClick={this.vote(1)}>thumb_up_alt</i> {this.state.votes} <i className={"material-icons " + this.state.downvote} onClick={this.vote(-1)}>thumb_down_alt</i></div>
            <div className="col-xs-4"><i className="material-icons">chat_bubble</i> {this.state.comments}</div>
            <div className="col-xs-4">
            {/* <i className="material-icons">share</i> {this.state.shares} */}
            </div>
	    	      </div>
            </div>
          </div>
        </div>
  }
}

export class BlogCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let liked = '';
    if (this.props.liked){
      liked = "liked"
    }

    return <div className="card card-blog">
      {/* <div className="card-header">
        <div className="author container">
          <Link to="#pablo">
            <div className="row">
              <div className="col-xs-3">
                <img src={this.props.avatar} alt="..." className="avatar img-raised" />
              </div>
              <div className="col-xs-9">
                <span>{this.props.name}</span><br/>
                <span className="headline">{this.props.headline}</span>
              </div>
            </div>
            
          </Link>
        </div>
      </div> */}
      <div className="card-image">
        <Link to="#pablo">
          <img className="img" src={this.props.cardImage} />
	    								</Link>
        <div className="ripple-container"></div>
        </div>
        <div className="card-content">
          <h6 className="category text-danger">
            {this.props.category}
	    								</h6>
          <h4 className="card-title">
            <Link to="#pablo">{this.props.title}</Link>
          </h4>
          <div className="footer">
             <div className="author">
                <Link to="#pablo">
                      <img src={this.props.avatar} alt="..." className="avatar img-raised" />
                      <span>{this.props.name}</span>
                </Link>
              </div>
              <div className="stats"><i className="material-icons">schedule</i> {this.props.date}</div>            
              <div className="engagement row text-center">
            <div className="col-xs-4"><i className={"material-icons " + liked}>favorite</i> {this.props.likes}</div>
            <div className="col-xs-4"><i className="material-icons">chat_bubble</i> {this.props.comments}</div>
            <div className="col-xs-4"><i className="material-icons">share</i> {this.props.shares}</div>
	    	      </div>
            </div>
          </div>
        </div>
  }
}
export class ProfileUserControl extends Component {
  constructor(props){
    super(props);

    this.state = {
      connected: false
    }
  }

  componentDidMount(){

    Meteor.call('connections.connected', this.props.userId, (err, result) => {

      if (err){
        console.log(err);
      }
      if (result){
        this.setState({
          connected: true
        }, (err, result) => {
          $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
        })
      }
      else{
        $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
      }
    });
  }

  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (<div className="profile row">
        <div className="col-xs-4 follow">
          {(this.props.userId != Meteor.userId()) && this.state.connected?<Link to={"/refer/"+this.props.username} className="btn btn-fab btn-primary" rel="tooltip" title={"Refer "+this.props.firstname}>
                  <i className="material-icons">all_inclusive</i>
              </Link>:''}
        </div>
        <div className="col-xs-4">
            <div className="avatar img-circle img-raised" style={bg}></div>
        </div>
        <div className="col-xs-4 follow">
            {(this.props.userId != Meteor.userId())?
            (<Link to={"/recommend/"+this.props.username} className="btn btn-fab btn-primary" rel="tooltip" title={(this.state.connected?'Recommend ':'Connect ')+this.props.firstname}>
                    <i className="material-icons">{this.state.connected?'how_to_reg':'add'}</i>
                </Link>):''}
            {(this.props.edit)?<div className="fileinput profile text-center" data-provides="fileinput" rel="tooltip" title="Replace profile picture">
              <div>
                <span className="btn btn-fab btn-info btn-file">
                  <i className="material-icons">insert_emoticon</i>
                  <input type="file" name="profile" />
                </span>
              </div>
            </div>:''}
        </div>
        <div className="name col-xs-12">
            <h4 className="title">{this.props.name}</h4>
        <div className="category text-grey"><span className="headline">{(this.props.headline != null) ? this.props.headline : <em>Headline not provided yet</em>}</span><br /><span className="position">{(this.props.position != null) ? this.props.position:<em>Position not provided yet</em>}</span></div>
        <div className="other-info category text-muted"><span><i className="material-icons">location_on</i>{(this.props.location != null) ? this.props.location:<em>Location not provided yet</em>}</span> {/*<span><i className="material-icons">grade</i>{this.props.reputation}</span>*/}</div>
            <div className="row">
            <div className="records col-md-6 col-md-offset-3 clearfix">
              <div className="record text-grey col-xs-4"><Link to={"/@"+this.props.username+"/connections"}><strong>{this.props.connections}</strong> Connections</Link></div>
              <div className="record text-grey col-xs-4"><Link to={"/@"+this.props.username+"/contributions"}><strong>{this.props.scores}</strong> Scores</Link></div>
              <div className="record text-grey col-xs-4 rank"><img src="/img/icons/diamond.png" /> Conductor</div>
            </div>
            </div>
        </div>
    </div>)
  }

}
