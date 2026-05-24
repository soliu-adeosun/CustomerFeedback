import * as React from "react";
import ClientButton from "../../../../Global/ClientButton";
import GlobalLoader from "../../../../Global/GlobalLoader";
// import { Link } from "react-router-dom";
// import ClientButton from "../../../../Global/ClientButton";
// // import { NewLoader } from "../../../../Global/NewLoader";
// import IdeaFormSkeleton from "../../../../Global/IdeaFormSkeleton";
require("customer");

export default class CustomerForm extends React.Component<{}, {}> {

	public render(): React.ReactElement {
		return (
			<>
				<GlobalLoader message="Preparing Survey..." />
				<div className="hidden" id="real-content">
					<div className="wrap">
						{/* Hero */}
						<div className="survey-hero hidden">
							{/* <div className="hero-eye">Customer Experience</div> */}
							<div className="hero-h1">Customer Feedback Platform</div>
							<div className="hero-sub">Thank you for choosing RusselSmith Nigeria Limited. As part of our commitment to excellence, we would like to hear about your experience.</div>
						</div>

						{/* AM FORM */}
						<div className="card" id="form-am">
							<div className="form-head hidden">
								<div className="form-head-icon" style={{ background: 'rgba(200,130,10,.1)' }}>
									<svg viewBox="0 0 24 24" fill="none" stroke="#C8820A" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
								</div>
								<div className="hidden" id="am-header">
									<div className="form-head-title">Advanced Manufacturing — Customer Satisfaction</div>
									<div className="form-head-sub">Product quality &amp; manufacturing experience evaluation</div>
								</div>
								<div className="hidden" id="ai-header">
									<div className="form-head-title">Asset Integrity — Customer Satisfaction</div>
									<div className="form-head-sub">Service delivery &amp; crew performance evaluation</div>
								</div>
								<div className="form-ref hidden">Rev.21 · 17 Jul 2025</div>
							</div>
							<div className="form-body">
								<div className="sec-lbl"><div className="sec-lbl-txt">Job Details</div><div className="sec-lbl-line" /></div>

								<div className="form-grid hidden" id="am-job-details">
									<div className="field-group"><label className="field-label">Part Name <em>*</em></label><input readOnly className="field-input" id="am-part" placeholder="e.g. API Flanged Spool" speed-bind="PartName" /></div>
									<div className="field-group"><label className="field-label">Job Number <em>*</em></label><input readOnly className="field-input" id="am-job" placeholder="e.g. RS-AM-2025-0042" speed-bind="JobNumber" /></div>
									{/* <div className="field-group"><label className="field-label">Machine Used <em>*</em></label><input readOnly className="field-input" id="am-machine" placeholder="e.g. CNC Mill" speed-bind="MachineUsed" /></div> */}
								</div>

								<div className="form-grid hidden" id="ai-job-details">
									<div className="field-group"><label className="field-label">Crew Name <em>*</em></label><input readOnly className="field-input" id="ai-crew" placeholder="e.g. Crew Alpha / Team Lead" speed-bind="CrewName" /></div>
									<div className="field-group"><label className="field-label">Job Number <em>*</em></label><input readOnly className="field-input" id="ai-job" placeholder="e.g. RS-AI-2025-0089" speed-bind="JobNumber" /></div>
									<div className="field-group"><label className="field-label">Project Title <em>*</em></label><input readOnly className="field-input" id="ai-project" placeholder="e.g. Asset Integrity Project" speed-bind="ProjectTitle" /></div>
									<div className="field-group"><label className="field-label">Service Line <em>*</em></label><input readOnly className="field-input" id="ai-service" placeholder="e.g. Asset Integrity" speed-bind="ServiceLine" /></div>
								</div>

								{/* <div className="sec-lbl"><div className="sec-lbl-txt">CSAT — Product Satisfaction</div><div className="sec-lbl-line" /></div> */}
								<div className="rating-q">1. How satisfied are you with our product(s)? <em>*</em> <small>1 — lowest, 10 — highest </small></div>
								<div className="rating-row" id="am-csat-row" />
								{/* <div className="rating-legend"><span>1 — Very Dissatisfied</span><span>10 — Extremely Satisfied!</span></div> */}
								<div className="field-group" style={{ marginTop: 20 }}>
									<label className="field-label">What can we do differently to improve our products?</label>
									<textarea className="field-textarea" id="am-csat-comment" speed-bind="Comment" placeholder="Feedback on product quality, service delivery, specifications…" defaultValue={""} />
								</div>
								{/* <div className="sec-lbl" style={{ marginTop: 20 }}><div className="sec-lbl-txt">NPS — Likelihood to Recommend</div><div className="sec-lbl-line" /></div> */}
								<div className="rating-q">2. How likely are you to recommend RusselSmith? <em>*</em> <small>1 — lowest, 10 — highest </small></div>
								<div className="rating-row" id="am-nps-row" />
								{/* <div className="rating-legend"><span>1 — Not at all likely</span><span>10 — Absolutely!</span></div> */}
							</div>
							<div className="form-foot">
								{/* <div className="req-note">Fields marked <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>*</em> are required.</div> */}
								<div className="form-acts">
									<button className="btn btn-ghost hidden">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12a9 9 0 101.5-5M3 3v5h5" /></svg>
										Reset
									</button>
									<ClientButton func="CustomerComponent.confirmSubmit" clax="btn btn-gold" prop="Approved" attr="">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
										Submit Survey
									</ClientButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>

		);
	}

	public componentDidMount(): void {
		window.loadCustomerFormComponent();
	}
}
