import React from 'react';
import {withRouter} from 'react-router-dom';
import db from '../../Helpers/Dexie';

class FavoriteDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:null, 
            data:[]
        }
    }
    componentWillMount(){
        let location=this.props.history.location.pathname.split('/');
        let page=location[location.length-1]
        this.setState({page:page});
    }
    async componentDidMount(){
        if(this.state.page=='groups'){
            let data=await db.groups.where('isFavorite').equals(1).toArray();
            console.log(data);
        }
    }
    render(){
        return(
            <div className="container">
                <h1>This is the favorite Detail</h1>
            </div>
        );
    }
}

export default withRouter(FavoriteDetail);