import React from 'react'
import ReactQuill from 'react-quill'


export default class DraftWysiwyg extends React.Component {
    handleChange(value) {
        this.props.input.onChange(value)
    }

    render() {
        return (
            <ReactQuill
                theme="snow"
                value={this.props.input.value}
                onChange={this.handleChange.bind(this)}/>
        )
    }
}
