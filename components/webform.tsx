import React, { useState }  from "react";
import Input from "@/components/input";
import ParagraphWarning from "@/components/paragraphs/paragraph-warning";

export default function Webform({webform, elements}) {
    const inputs = getInputs(elements);
    const [message, setMessage] = useState({});

    function getInputs(items) {
        let inputs = [];
        for(const name in items) {
            const element = elements[name];
            if(name !== 'actions') {
                inputs.push(<Input key={name} name={name} element={element}/>);
            }
        }
        return inputs;
    }

    async function handleSubmit(event) {
        event.preventDefault()

        let data_to_send = {};
        for(const name in elements) {
            if (name !== 'actions') {
                data_to_send[name] = event.target[name].value
            }
        }

        const response = await fetch(`/api/`+webform.drupal_internal__id, {
            method: "POST",
            body: JSON.stringify({
                name: event.target.name.value,
                subject: event.target.subject.value,
                message: event.target.message.value,
                email: event.target.email.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            event.target.reset();
            setMessage({
                field_warning_type: 'info',
                field_simple_texte: 'Formulaire envoyé avec succès.'
            });
        }
        else {
            setMessage({
                field_warning_type: 'warning',
                field_simple_texte: 'Problème d\'envoi du formulaire, réessayez plus tard.'
            });
        }
        setTimeout(function() {
            setMessage({});
        }, 3000);
    }
    return (
        <div className="webform">
            {message?.field_warning_type &&
                <ParagraphWarning paragraph={message} />
            }
            <form onSubmit={handleSubmit}>
                {inputs}
                <button className="btn btn-styled mb-3" type="submit">{elements['actions']['#submit__label']}</button>
            </form>
        </div>
    );
}