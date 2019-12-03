import React from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';


const Card = ({title, iconClass, linkText, link, history}) => (
    <div className="col-md-6 col-sm-12 centeredCss" style={{alignItems:'center'}}> 
        <div>
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px' }}>
                <h1>{title}</h1>
                <div className="centeredCss marginate">
                    <i className={`${iconClass}`}></i>
                </div>
                <div>
                    <button className="btn btn-danger btn-lg btn-block" onClick={()=>history.push(`${link}`)}>{linkText}</button>
                </div>
            </div>
        </div>
    </div>
)

Card.propTypes={
    title:PropTypes.string.isRequired, 
    iconClass:PropTypes.string.isRequired,
    linkText:PropTypes.string.isRequired, 
    link:PropTypes.string.isRequired
}

export default withRouter(Card);