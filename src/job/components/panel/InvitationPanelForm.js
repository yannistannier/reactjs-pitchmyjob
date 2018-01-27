import React from 'react'
import { Field } from 'redux-form'

export default class InvitationPanelForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emails: ''
        }

        this.handleEmailsSubmit = this.handleEmailsSubmit.bind(this)
        this.emailsUpdated = this.emailsUpdated.bind(this)
    }

    emailsUpdated(event){
        this.setState({emails: event.target.value})
    }

    handleEmailsSubmit(event){
        event.preventDefault();
        let emails = this.state.emails

        if (this.state.emails) {
            if (emails.indexOf(',') == -1 ){
                emails = emails.replace(/ +(?= )/g,'').split(" ")
            }else{
                emails = emails.replace(/ /g,'').split(",")
            }

            this.props.createInvitationEmail(this.props.job, {emails})
        }

    }

    render() {
        return (
            <form className="page-search-form" role="search" onSubmit={this.handleEmailsSubmit}>
                <div className="col-md-12 col-xs-12">
                  <div className="form-group form-material m-t-20" data-plugin="formMaterial">
                    <input type="text" className="form-control" value={this.state.search} id="inputText" name="inputText" placeholder="Emails" onChange={this.emailsUpdated} />
                    <div> <small>(separez par des virgules ou par un espace pour mettre plusieurs adresses email.</small> </div>
                  </div>
                </div>

                <div className="col-md-12 col-xs-12 text-xs-center">
                  <button className="m-l-10 btn btn-success waves-effect waves-light waves-effect" > Envoyer </button>
                </div>
            </form>
        )
    }
}
