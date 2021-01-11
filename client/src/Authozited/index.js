import React from "react";
import { Route , Redirect} from "react-router-dom";

const Authorzited = ({component: Component, ...rest}) => {
    const Auth = localStorage.getItem('Auth');
    return (
        
        <Route
          {...rest}
          render={props =>
            Auth ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login"/>
            )
          }
        />
     
          
    )
    
}

export default Authorzited;