import React from 'react'

export default class ImageBase64Field extends React.Component {
    handleChange(event) {
        let files = event.target.files

        var allFiles = []
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                allFiles.push(reader.result)

                if (allFiles.length === files.length) {
                    this.props.input.onChange(allFiles[0])
                }
            }
        }
    }

    render() {
        const { input, meta } = this.props

        return (
            <div>
                <div className="form-group form-material" data-plugin="formMaterial">
                    <label className="form-control-label"></label>
                    <img src={input.value} alt="..." />
                </div>
                <div className={'form-group form-material' + (meta.touched && meta.error ? ' has-error' : '')} data-plugin="formMaterial">
                    <label className="form-control-label" htmlFor={input.name}>{this.props.label}</label>
                    <input
                        {...input}
                        value={undefined}
                        type="file"
                        className="form-control"
                        onChange={this.handleChange.bind(this)} />
                    {meta.error && <small className="help-block">{meta.error}</small>}
                </div>
            </div>
        )
    }
}
