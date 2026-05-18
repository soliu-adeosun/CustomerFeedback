import * as React from 'react';
// import { NewLoader } from '../../../../Global/NewLoader';
import ReportLoader from '../../../../Global/ReportLoader';
// import { FilterBox } from '../../../../Global/FilterBox';
require("reviewqueue");


export default class ReviewQueue extends React.Component<{}, {}> {
    public render(): React.ReactElement {

        return (
            <>
                <div className="page hidden" id="page-reviewqueue">
                    {/* <FilterBox /> */}
                    <div className="filter-bar">
                        <div className="search-input">🔍<input id="reportsearchfield" placeholder="Search ideas, submitter, division…" /></div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">All Submissions</span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <div className="norequest hidden text-center py-10" id="noDataState">

                                <div className="no-data-icon">📭</div>

                                <div className="no-data-title">
                                    Nothing here… yet!
                                </div>

                                <div className="no-data-sub">
                                    Looks like there are no data to display right now
                                </div>

                                <div className="no-data-hint">
                                    Check back later 👀
                                </div>

                            </div>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th speed-table-data="WorkflowRequestID">Ref ID</th>
                                        <th speed-table-data="EmployeeName">Submitter</th>
                                        <th speed-table-data="Title">Idea</th>
                                        <th speed-table-data="Division">Division</th>
                                        <th speed-table-data="Approval_Status">Status</th>
                                        <th speed-table-data="Modified">Date</th>
                                        <th speed-table-data="Created">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="speed-data-table" />
                            </table>
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: 11, color: 'var(--muted)' }}>Showing 6 of 47 ideas</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button className="btn btn-ghost btn-sm">← Prev</button>
                                <button className="btn btn-ghost btn-sm">Next →</button>
                            </div>
                        </div> */}
                        <div>
                            <ul id="myrequestpagination" className="pagination"></ul>
                        </div>
                    </div>
                    {/* <NewLoader /> */}
                </div>
                <ReportLoader />
            </>

        );
    }

    public componentDidMount(): void {
        window.loadReviewQueueComponent();
    }
}
