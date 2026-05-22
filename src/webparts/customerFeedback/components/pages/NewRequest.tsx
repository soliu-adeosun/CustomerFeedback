import * as React from "react";
// import { Link } from "react-router-dom";
import ClientButton from "../../../../Global/ClientButton";
import GlobalLoader from "../../../../Global/GlobalLoader";
// // import { NewLoader } from "../../../../Global/NewLoader";
// import IdeaFormSkeleton from "../../../../Global/IdeaFormSkeleton";
require("newrequest");

export default class NewRequest extends React.Component<{}, {}> {
	public render(): React.ReactElement {
		return (
			<>
				<GlobalLoader />
				<div className="hidden" id="real-content">
					<div className="wrap">
						{/* Hero */}
						<div className="survey-hero">
							{/* <div className="hero-eye">Customer Experience</div> */}
							<div className="hero-h1">Customer Feedback Platform</div>
							<div className="hero-sub">Select a division, fill in customer details, then dispatch the survey below.</div>
						</div>
						{/* Division selector */}
						<div className="card div-sel-card" style={{ padding: 22, marginBottom: 18 }}>
							<div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>Select Division</div>
							{/* <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 16 }}>Which division is this survey for?</div> */}
							<div className="div-opts">
								<div className="div-opt" id="dopt-am">
									<div className="div-opt-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg></div>
									<div className="div-opt-icon" style={{ background: 'rgba(200,130,10,.1)' }}>
										<svg viewBox="0 0 24 24" fill="none" stroke="#C8820A" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
									</div>
									<div className="div-opt-name">Advanced Manufacturing</div>
									<div className="div-opt-desc">Products, parts &amp; precision manufacturing — evaluates product quality and delivery.</div>
								</div>
								<div className="div-opt" id="dopt-ai">
									<div className="div-opt-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg></div>
									<div className="div-opt-icon" style={{ background: 'rgba(12,126,138,.1)' }}>
										<svg viewBox="0 0 24 24" fill="none" stroke="#0C7E8A" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
									</div>
									<div className="div-opt-name">Asset Integrity</div>
									<div className="div-opt-desc">Inspection, maintenance &amp; integrity services — evaluates crew performance and service delivery.</div>
								</div>
							</div>
						</div>
						{/* AM FORM */}
						<div className="card form-card" id="form-am">
							<div className="form-head hidden">
								<div className="form-head-icon" style={{ background: 'rgba(200,130,10,.1)' }}>
									<svg viewBox="0 0 24 24" fill="none" stroke="#C8820A" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
								</div>
								<div>
									<div className="form-head-title">Advanced Manufacturing — Customer Satisfaction</div>
									<div className="form-head-sub">Product quality &amp; manufacturing experience evaluation</div>
								</div>
								<div className="form-ref">Rev.21 · 17 Jul 2025</div>
							</div>
							<div className="form-body">
								{/* <div className="sec-lbl"><div className="sec-lbl-txt">Customer Information</div><div className="sec-lbl-line" /></div> */}
								<div className="form-grid">
									<div className="field-group"><label className="field-label">Customer Name <em>*</em></label>
										<select className="field-select" id="am-cust" speed-bind-validate="CustomerName" speed-bind-class="AdvancedManufacturing">
											<option>Select a customer</option>
										</select>
									</div>
									<div className="field-group"><label className="field-label">Part Name <em>*</em></label><input className="field-input" id="am-part" placeholder="e.g. API Flanged Spool" speed-bind-validate="PartName" speed-bind-class="AdvancedManufacturing" /></div>
									<div className="field-group"><label className="field-label">Job Number <em>*</em></label><input className="field-input" id="am-job" placeholder="e.g. RS-AM-2025-0042" speed-bind-validate="JobNumber" speed-bind-class="AdvancedManufacturing" /></div>
									<div className="field-group"><label className="field-label">Machine Used</label>
										<select className="field-select" id="am-machine" speed-bind-validate="MachineUsed" speed-bind-class="AdvancedManufacturing">
											<option>Select a machine</option>
										</select>
									</div>
								</div>
								
							</div>
							<div className="form-foot">
								{/* <div className="req-note">Fields marked <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>*</em> are required.</div> */}
								<div className="form-acts">
									<button className="btn btn-ghost reset-btn">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12a9 9 0 101.5-5M3 3v5h5" /></svg>
										Reset
									</button>
									{/* <button className="btn btn-gold">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
										Send Survey
									</button> */}
									<ClientButton func="NewRequestComponent.confirmSubmit" clax="btn btn-gold" prop="NewRequest" attr="">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg> 
										Send Survey
									</ClientButton>
								</div>
							</div>
						</div>
						{/* AI FORM */}
						<div className="card form-card" id="form-ai">
							<div className="form-head hidden">
								<div className="form-head-icon" style={{ background: 'rgba(12,126,138,.1)' }}>
									<svg viewBox="0 0 24 24" fill="none" stroke="#0C7E8A" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
								</div>
								<div>
									<div className="form-head-title">Asset Integrity — Customer Satisfaction</div>
									<div className="form-head-sub">Service delivery &amp; crew performance evaluation</div>
								</div>
								<div className="form-ref">Rev.21 · 17 Jul 2025</div>
							</div>
							<div className="form-body">
								{/* <div className="sec-lbl"><div className="sec-lbl-txt">Customer &amp; Job Information</div><div className="sec-lbl-line" /></div> */}
								<div className="form-grid">
									<div className="field-group"><label className="field-label">Customer Name <em>*</em></label>
										<select className="field-select" id="ai-cust" speed-bind-validate="CustomerName" speed-bind-class="AssetIntegrity">
											<option>Select a customer</option>
										</select>
									</div>
									{/* <div className="field-group"><label className="field-label">Crew Name <em>*</em></label><input className="field-input" id="ai-crew" placeholder="e.g. Crew Alpha / Team Lead" speed-bind-validate="CrewName" speed-bind-class="AssetIntegrity"/></div> */}
									<div className="field-group"><label className="field-label">Crew Name</label>
										<select className="field-select" id="ai-crewname" speed-bind-validate="CrewName" speed-bind-class="AssetIntegrity">
											<option>Select a Crew</option>
										</select>
									</div>
									<div className="field-group"><label className="field-label">Job Number <em>*</em></label><input className="field-input" id="ai-job" placeholder="e.g. RS-AI-2025-0089" speed-bind-validate="JobNumber" speed-bind-class="AssetIntegrity"/></div>
									<div className="field-group"><label className="field-label">Project Title <em>*</em></label>
										<input className="field-input" placeholder="Enter Project Title" speed-bind-validate="ProjectTitle" speed-bind-class="AssetIntegrity" />
									</div>
									<div className="field-group"><label className="field-label">Service Line</label>
										<select className="field-select" id="ai-service-line" speed-bind-validate="ServiceLine" speed-bind-class="AssetIntegrity">
											<option>Select a service line</option>
										</select>
									</div>
								</div>
							</div>
							<div className="form-foot">
								{/* <div className="req-note">Fields marked <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>*</em> are required.</div> */}
								<div className="form-acts">
									<button className="btn btn-ghost reset-btn">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12a9 9 0 101.5-5M3 3v5h5" /></svg>
										Reset
									</button>
									{/* <button className="btn btn-teal">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
										Send Survey
									</button> */}

									<ClientButton func="NewRequestComponent.confirmSubmit" clax="btn btn-teal" prop="NewRequest" attr="">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
										Send Survey
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
		window.loadNewRequestComponent();
	}
}
