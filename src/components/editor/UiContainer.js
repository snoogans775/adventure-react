import React, {useState, useEffect} from 'react';

export default function UiContainer({children, ...props}) {

    return (
        <div className="ui-container">
            {children}
        </div>
    )
}