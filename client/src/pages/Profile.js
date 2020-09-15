import React, {useState,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

class Profile extends React.Component {

    constructor(props){
        super(props);
    }


    static contextType = AuthContext;
    render(){
        return(
            <div>
      
            </div>
        )
    }
};

export default Profile;