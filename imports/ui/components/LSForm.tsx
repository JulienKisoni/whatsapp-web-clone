import React from 'react';
import FontAwesome from 'react-fontawesome';

import StyledLSForm from '../elements/StyledLSForm';

const LSForm = (props:any):JSX.Element => {
    const { type } = props;
    const title:string = type === "actue" ? "Actu" : "Votre nom";
    return (
        <StyledLSForm>
            <span className="LSForm--title">
                {title}
            </span>
            <div className="LSForm--container">
                <input 
                    readOnly={true}
                    className="LSForm--input __border"
                />
                <FontAwesome 
                    className="LSForm--icon"
                    name="check"
                />
            </div>
        </StyledLSForm>
    )
}

export default LSForm;