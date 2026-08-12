import * as React from "react";
import GlobalLoader from "../../../../Global/GlobalLoader";
import { Link } from "react-router-dom";
require("viewrequest");

export default class ViewRequest extends React.Component<{}, {}> {

	public render(): React.ReactElement {
		return (
			<>
				<GlobalLoader message="Preparing Survey Content..." />
				<div className="hidden" id="real-content">
					<div className="wrap">
						<div className="form-body card">
							<div className="sec-lbl"><div className="sec-lbl-txt">Job Details</div><div className="sec-lbl-line" /></div>

							<div className="form-grid hidden" id="am-job-details">
								<div className="field-group"><label className="field-label">Ref ID </label><input readOnly className="field-input" speed-bind="documentNo" /></div>
								<div className="field-group"><label className="field-label">Part Name </label><input readOnly className="field-input" id="am-part" placeholder="e.g. API Flanged Spool" speed-bind="partName" /></div>
								<div className="field-group"><label className="field-label">Job Number </label><input readOnly className="field-input" id="am-job" placeholder="e.g. RS-AM-2025-0042" speed-bind="jobNumber" /></div>
								{/* <div className="field-group"><label className="field-label">Machine Used </label><input readOnly className="field-input" id="am-machine" placeholder="e.g. CNC Mill" speed-bind="MachineUsed" /></div> */}
							</div>

							<div className="form-grid hidden" id="ai-job-details">
								<div className="field-group"><label className="field-label">Ref ID </label><input readOnly className="field-input" speed-bind="documentNo" /></div>
								<div className="field-group"><label className="field-label">Crew Name </label><input readOnly className="field-input" id="ai-crew" placeholder="e.g. Crew Alpha / Team Lead" speed-bind="crewName" /></div>
								<div className="field-group"><label className="field-label">Job Number </label><input readOnly className="field-input" id="ai-job" placeholder="e.g. RS-AI-2025-0089" speed-bind="jobNumber" /></div>
								<div className="field-group"><label className="field-label">Project Title </label><input readOnly className="field-input" id="ai-project" placeholder="e.g. Asset Integrity Project" speed-bind="projectTitle" /></div>
								<div className="field-group"><label className="field-label">Service Line </label><input readOnly className="field-input" id="ai-service" placeholder="e.g. Asset Integrity" speed-bind="serviceLine" /></div>
							</div>

							{/* <div className="sec-lbl"><div className="sec-lbl-txt">CSAT — Product Satisfaction</div><div className="sec-lbl-line" /></div> */}
							<div className="rating-q">1. How satisfied are you with our product(s)/service(s)?  <small>1 — lowest, 10 — highest </small></div>
							<div className="rating-row" id="am-csat-row" />
							{/* <div className="rating-legend"><span>1 — Very Dissatisfied</span><span>10 — Extremely Satisfied!</span></div> */}
							<div className="field-group" style={{ marginTop: 20 }}>
								<label className="field-label">What can we do differently to improve our products?</label>
								<textarea readOnly className="field-textarea" id="am-csat-comment" speed-bind="improvement" placeholder="Feedback on product quality, service delivery, specifications…" defaultValue={""} />
							</div>
							{/* <div className="sec-lbl" style={{ marginTop: 20 }}><div className="sec-lbl-txt">NPS — Likelihood to Recommend</div><div className="sec-lbl-line" /></div> */}
							<div className="rating-q">2. How likely are you to recommend Arridex?  <small>1 — lowest, 10 — highest </small></div>
							<div className="rating-row" id="am-nps-row" />
							{/* <div className="rating-legend"><span>1 — Not at all likely</span><span>10 — Absolutely!</span></div> */}
						</div>
						<div className="form-foot">
							{/* <div className="req-note">Fields marked <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>*</em> are required.</div> */}
							<div className="form-acts">
								<Link to="/" className="btn btn-ghost">Cancel</Link>
							</div>
						</div>
					</div>
					<div className="wrap">
						<div className="form-body card hidden">
							<div className="card-header">
								<span className="card-title">🔍 Audit Trail</span>
							</div>
							<div style={{ overflowX: 'auto' }}>
								<table className="table">
									<thead>
										<tr>
											<th>Name</th>
											<th>Stage</th>
											<th>Action</th>
											<th>Comment</th>
											<th>Action Time</th>
										</tr>
									</thead>
									<tbody id="logs"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</>

		);
	}

	public componentDidMount(): void {
		window.loadViewRequestComponent();
	}
}
