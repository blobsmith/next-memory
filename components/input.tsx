import React from "react";

export default function Input({name, element}) {
    let input;
    if (element['#type'] === 'textarea') {
        input = <textarea className="form-control" id={name} name={name} required={element['#required']} rows="3" placeholder=" "></textarea>;
    }
    else {
        input = <input className="form-control" type={getType(element['#type'])} id={name} name={name} required={element['#required']} placeholder=" " />;
    }

    function getType(field_type) {
        let type = field_type;
        if (field_type === 'textfield') {
            type = 'text';
        }
        return type;
    }

    return (
        <div className={'mb-3 ' + element['#type']+'-container'} key={name}>
            <div className={element['#type'] + ' input-container'}>
                {input}
                <label htmlFor={name} className={'form-label ' + element['#required']?'required':''}>{element['#title']}</label>
            </div>
        </div>
    );
}