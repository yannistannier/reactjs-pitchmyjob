import React from 'react'
import Geosuggest from 'react-geosuggest'
import { change } from 'redux-form'

export default class LocationField extends React.Component {
    handleChange(value) {
        this.props.input.onChange(value)
    }

    handleSuggestSelect(suggest) {
        const { meta } = this.props

        if (suggest.hasOwnProperty('gmaps')) {
            for (let i = 0, len = suggest.gmaps.address_components.length; i < len; i++) {
                let gmap = suggest.gmaps.address_components[i]

                if (gmap.types[0] === 'postal_code')
                    gmap.types[0] = 'cp'

                meta.dispatch(change(meta.form, gmap.types[0], gmap.long_name))
            }
        }

        this.props.input.onChange(suggest.label)
    }

    render() {
        const { input, meta } = this.props

        return (
            <div className={'form-group form-material' + (meta.touched && meta.error ? ' has-error' : '')} data-plugin="formMaterial">
                <label className="form-control-label" htmlFor={input.name}>{this.props.label}</label>
                <Geosuggest
                    inputClassName="form-control"
                    initialValue={input.value}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange.bind(this)}
                    onSuggestSelect={this.handleSuggestSelect.bind(this)} />
                {meta.error && <small className="help-block">{meta.error}</small>}
            </div>
        )
    }
}
