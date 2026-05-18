// import { Link } from "react-router-dom";
// import ClientButton from "../../../../Global/ClientButton";
import * as React from "react";
// import { NewLoader } from "../../../../Global/NewLoader";
import ApprovalLoader from "../../../../Global/ApprovalLoader";
require("approverequest");

export default class ApproveRequest extends React.Component<{}, {}> {
	public render(): React.ReactElement {
		return (
			<>
				<div className="page hidden" id="page-approval">
					<div className="idea-list">
						{/* CARD 1 — expanded with full review */}
						<div className="idea-card expanded">
							<div className="idea-avatar" style={{ background: '#16A34A' }} speed-bind="EmployeeInitials" />
							<div className="idea-body">
								<div className="idea-title" speed-bind="Title" />
								<div className="idea-meta">
									<span speed-bind="Division" /><span> · </span>
									<span speed-bind="EmployeeName" /><span> · </span>
									<span speed-bind="Created" /><span> · </span>
									<span speed-bind="WorkflowRequestID" />
								</div>
								<div className="idea-badges" id="improvementArea" />
								<div className="idea-badges" id="benefits" style={{ marginTop: 5, marginBottom: 5 }} />
								<div className="idea-badges">
									<span className="badge badge-gray" speed-bind="OtherBenefits" />
								</div>
								<div className="approve-panel">
									<p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, lineHeight: '1.6', background: 'var(--brand-lt)', borderLeft: '3px solid var(--brand)', padding: '10px 12px', borderRadius: '0 7px 7px 0' }} speed-bind="Ideas" />
									<div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--muted)', marginBottom: 8 }}>
										Attachment
									</div>
									<div speed-file-bind="SupportingDocuments" data-view-only style={{ marginBottom: 14 }} />

									<div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--muted)', marginBottom: 8 }}>
										Impact Assessment (1 = Low, 5 = High)</div>
									<div className="impact-grid">
										<div className="impact-row">
											<div className="impact-label">Customer Impact</div>
											<div className="star-row" data-field="CustomerImpact" >
												<div className="star" data-v={1}>★</div>
												<div className="star" data-v={2}>★</div>
												<div className="star" data-v={3}>★</div>
												<div className="star" data-v={4}>★</div>
												<div className="star" data-v={5}>★</div>
											</div>
										</div>
										<div className="impact-row">
											<div className="impact-label">Operational Impact</div>
											<div className="star-row" data-field="OperationalImpact" >
												<div className="star" data-v={1}>★</div>
												<div className="star" data-v={2}>★</div>
												<div className="star" data-v={3}>★</div>
												<div className="star" data-v={4}>★</div>
												<div className="star" data-v={5}>★</div>
											</div>
										</div>
										<div className="impact-row">
											<div className="impact-label">Financial Impact</div>
											<div className="star-row" data-field="FinancialImpact" >
												<div className="star" data-v={1}>★</div>
												<div className="star" data-v={2}>★</div>
												<div className="star" data-v={3}>★</div>
												<div className="star" data-v={4}>★</div>
												<div className="star" data-v={5}>★</div>
											</div>
										</div>
										<div className="impact-row">
											<div className="impact-label">Strategic Alignment</div>
											<div className="star-row" data-field="StrategicAlignment">
												<div className="star" data-v={1}>★</div>
												<div className="star" data-v={2}>★</div>
												<div className="star" data-v={3}>★</div>
												<div className="star" data-v={4}>★</div>
												<div className="star" data-v={5}>★</div>
											</div>
										</div>
										<div className="impact-row">
											<div className="impact-label">Safety Consideration</div>
											<div className="star-row" data-field="SafetyConsideration">
												<div className="star" data-v={1}>★</div>
												<div className="star" data-v={2}>★</div>
												<div className="star" data-v={3}>★</div>
												<div className="star" data-v={4}>★</div>
												<div className="star" data-v={5}>★</div>
											</div>
										</div>
									</div>
									
									{/* APPROVE FIELDS */}
									<div id="approve-fields-1" style={{}}>
										<div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 8 }}>Approval Details
										</div>
										{/* <div className="priority-row">
											<div className="ppill sel-h" onclick="selectPriority(this)">🔴 High (Fast-Track)</div>
											<div className="ppill" onclick="selectPriority(this)">🟡 Medium</div>
											<div className="ppill" onclick="selectPriority(this)">🟢 Low</div>
										</div> */}
										<div className="form-grid" style={{ marginBottom: 10 }}>
											<div className="form-group">
												<label>Implementation Owner (Division/Unit)</label>
												<select
													id="implementationOwner"
													speed-bind-validate="ImplementationOwner"
													speed-bind-class="ApprovalData"
													speed-validate-msg="Please select the Implementation Owner!"
												>
													<option value="">Please select a value</option>
												</select>
											</div>
											<div className="form-group">
												<label>Target Completion Date</label>
												<input
													type="date"
													id="targetCompletion"
													speed-bind-validate="TargetCompletion"
													speed-bind-class="ApprovalData"
													speed-validate-msg="Please select the Target Completion Date!"
												/>
											</div>
										</div>
									</div>
									
								</div>
								{/* Comment */}
								<div id="commentBox" style={{ marginBottom: '16px' }}>
									<label>Comment</label>
									<textarea
										id="approvercomment"
										speed-bind-validate="Comment"
										speed-include-control="false"
										speed-as-static="true"
										speed-validate-type="Comment"
										speed-event-switch="false"
										speed-validate-msg="Please tell us why you want to decline this idea!"
										placeholder="Enter your comments here..."
										className="w-full px-3 sm:px-4 py-2 sm:py-3  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
										defaultValue={""}
									/>
								</div>
								<div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--muted)', marginBottom: 8 }}>
									Decision</div>
								{/* <div className="decision-tabs">
									<ClientButton text="✅ Approve for Implementation" func="ApproveRequestComponent.confirmSubmit" clax="dtab app" prop="Approved" attr="" />
									<ClientButton text="💬 Request More Info" func="ApproveRequestComponent.confirmSubmit" clax="dtab" prop="Revise" attr="id='rtnBtn'" />
									<ClientButton text="❌ Decline" func="ApproveRequestComponent.confirmSubmit" clax="dtab" prop="Declined" attr="id='declineBtn'" />
								</div> */}
							</div>
							<div className="idea-right" id="approvalStatus" />
						</div>
					</div>
					{/* Audit Trail */}
                    <div className="card" style={{marginTop: 14}}>
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
					{/* <NewLoader /> */}
				</div>
				<ApprovalLoader />
			</>
		);
	}

	public componentDidMount(): void {
		window.loadApproveRequestComponent();
	}
}
