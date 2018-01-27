import React from 'react'

export default class CandidacyPanelCV extends React.Component {
    render() {
        const { candidacy } = this.props

        return (
            <div className="tab-pane active" id="exampleTabsLineOne" role="tabpanel" aria-expanded="true">
                <div className="user-background card card-shadow">
                    <div className="card-header card-header-transparent p-20">
                        <h4 className="card-title m-b-0 text-uppercase">Information au recruteur</h4>
                    </div>
                    <div className="card-block p-t-5">
                        <table>
                            <tbody>
                                <tr className="p-y-10 ">
                                    <td className="p-r-25"> Coordonnées</td>
                                    <td className="p-b-10">
                                        <div> {candidacy.applicant.user.email}</div>
                                    </td>
                                </tr>
                                <tr className="p-y-10">
                                    <td className="p-r-25"> Poste recherchés</td>
                                    <td className="p-b-10">
                                        <div className="tags">
                                            {
                                                candidacy.applicant.wanted_jobs.map((job, index) => {
                                                    return (
                                                        <button key={index} type="button" className="btn btn-outline btn-default m-r-10"> {job}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </td>
                                </tr>
                                <tr className="p-y-10">
                                    <td className="p-r-25"> Contrat recherchés</td>
                                    <td className="p-b-10">
                                          <div className="tags">
                                            <button type="button" className="btn btn-outline btn-default">CDI</button>
                                          </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-header card-header-transparent p-20">
                        <h4 className="card-title m-b-0 text-uppercase">Information sur le candidat</h4>
                    </div>
                    <div className="card-block p-t-5">
                        <h5 className="card-title font-size-16">
                            <i className="icon wb-clipboard"></i>
                            <span>Description</span>
                        </h5>
                        <p className="card-text">
                            {candidacy.applicant.description}
                        </p>
                    </div>
                    <div className="card-block p-t-5 p-b-0">
                        <h5 className="card-title p-b-5 font-size-16">
                            <i className="icon wb-briefcase"></i>
                            <span>Experience</span>
                        </h5>
                        <ul className="timeline timeline-single">
                            {
                                candidacy.applicant.experiences.map((experience) => {
                                    return (
                                        <li className="timeline-item" key={experience.id}>
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-content">
                                                <span className="block font-weight-400 m-b-5">{experience.position}</span>
                                                <span className="block m-b-5">{experience.company}</span>
                                                <span className="block m-b-5">{experience.description}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="card-block p-t-5 p-b-0">
                        <h5 className="card-title p-b-5 font-size-16">
                            <i className="icon wb-flag"></i>
                            <span>Formations</span>
                        </h5>
                        <ul className="timeline timeline-single">
                            {
                                candidacy.applicant.educations.map((education) => {
                                    return (
                                        <li className="timeline-item" key={education.id}>
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-content">
                                                <span className="block font-weight-400 m-b-5">{education.degree}</span>
                                                <span className="block m-b-5">{education.school}</span>
                                                <span className="block m-b-5">{education.date_start}  {education.data_end}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="card-block p-t-5 p-b-0">
                        <h5 className="card-title p-b-5 font-size-16">
                            <i className="icon wb-share"></i>
                            <span>Competences</span>
                        </h5>
                        {
                            candidacy.applicant.skills.map((skill) => {
                                return (
                                    <span key={skill.id} className="tag m-b-10 m-r-10 tag-primary font-weight-400 font-size-14">{skill.name}</span>
                                )
                            })
                        }
                    </div>
                    <div className="card-block p-t-15 p-b-0">
                        <h5 className="card-title p-b-5 font-size-16">
                            <i className="icon wb-chat"></i>
                            <span>Languages</span>
                        </h5>
                        {
                            candidacy.applicant.languages.map((language) => {
                                return (
                                    <span key={language.id} className="tag m-b-10 m-r-10 tag-default font-weight-400 font-size-14">{language.name}</span>
                                )
                            })
                        }
                    </div>
                    <div className="card-block p-t-15 p-b-0">
                        <h5 className="card-title p-b-5 font-size-16">
                            <i className="icon wb-star"></i>
                            <span>Interets</span>
                        </h5>
                        {
                            candidacy.applicant.interests.map((interest) => {
                                return (
                                    <span key={interest.id} className="tag m-b-10 m-r-10 tag-default font-weight-400 font-size-14">{interest.name}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )

    }
}
