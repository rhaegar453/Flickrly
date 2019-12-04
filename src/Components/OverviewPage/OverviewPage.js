import React, { Suspense } from 'react';
/* import { PieChart, Pie, Legend, Tooltip, } from 'recharts'; */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { chunk, flatten } from 'lodash';

const PieChart=React.lazy(()=>import('../PieChart'));


class OverviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataByLikes: [],
            dataByViews: [],
            dataByComments: [],
            show: false
        }
    }
    showGraph = () => {
        this.setState({ show: true });
    }

    componentDidMount() {
        let data = this.props.history.location.pathname.split('/');
        let nsid = data[data.length - 1];
        let images = JSON.parse(localStorage.getItem(nsid));
        let imagesFormatted = flatten(chunk(images.map(item => {
            return { title: item.title, views: parseInt(item.views), comments: parseInt(item.comments), likes: parseInt(item.likes) }
        }), 10).map((item, index) => {
            if (index == 1) {
                let summed = item.map(item => ({ ...item, title: "Others" })).reduce((a, c) => {
                    return { title: a.title, views: a.views + c.views, comments: a.comments + c.comments, likes: a.likes + c.likes };
                });
                return summed;
            }
            else {
                return item;
            }
        }));
        console.log(imagesFormatted);
        let imagesByViews = imagesFormatted.map(item => ({ key: item.title, data: item.views }));
        let imagesByComments = imagesFormatted.map(item => ({ key: item.title, data: item.comments }));
        this.setState({ dataByViews: imagesByViews, dataByComments: imagesByComments });
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col0md-4 col-sd-12">
                        <h1  style={{textAlign:'center'}}>Comments Chart</h1>
                        <Suspense fallback={<div>Loading...</div>}><PieChart data={this.state.dataByComments} label="comments" ></PieChart></Suspense>
                    </div>
                    <div className="col-md-4 col-sd-12">
                        <h1  style={{textAlign:'center'}}>Likes Chart</h1>
                        <Suspense fallback={<div>Loading...</div>}><PieChart data={this.state.dataByViews} label="likes" ></PieChart></Suspense>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.selectedGroupImages
    }
}

export default connect(mapStateToProps)(withRouter(OverviewPage));