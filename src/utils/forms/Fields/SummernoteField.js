import React from 'react'

// const randomUid = () => Math.floor(Math.random() * 1000)

export default class SummernoteField extends React.Component {
    handleChange(value) {
        this.props.input.onChange(value)
    }

    // constructor(props) {
    //     super(props)
    //     this.uid = `react-summernote-${randomUid()}`
    // }

    // componentDidMount() {
    //     this.editor = jQuery(`#{this.uid}`)
    //     this.editor.summernote()
    // }

    // componentWillUnmount() {
    //     if (this.editor) {
    //       this.editor.summernote('destroy')
    //     }
    // }

    render() {
        const { input, meta } = this.props

        return (
            <div className={'form-group form-material' + (meta.touched && meta.error ? ' has-error' : '')} data-plugin="formMaterial">
                {/*<div id={this.uid}>{input.value}</div>*/}
                <div>{input.value}</div>
                {meta.error && <small className="help-block">{meta.error}</small>}
            </div>
        )
    }
}
