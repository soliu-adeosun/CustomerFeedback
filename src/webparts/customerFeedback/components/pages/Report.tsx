import * as React from 'react';
import GlobalLoader from '../../../../Global/GlobalLoader';
// import { FilterBox } from '../../../../Global/FilterBox';
// import ReportLoader from '../../../../Global/ReportLoader';
// import { NewLoader } from '../../../../Global/NewLoader';
require("report");


export default class Report extends React.Component<{}, {}> {
    public render(): React.ReactElement {

        return (
            <>
                <GlobalLoader message='Preparing Survey History...' />
                <div className="hidden" id="real-content">
                    <div className="hist-wrap">
                        {/* <div className="period-bar" style={{ marginBottom: 16 }}>
                            <div className="period-title">Survey <span>History</span></div>
                            <div className="period-meta" id="hist-meta">24 records</div>
                        </div> */}
                        <div className="hist-ctrl">
                            <select className="ctrl-sel" id="hist-div">
                                <option>All Divisions</option>
                                <option value="Advanced Manufacturing">Adv. Manufacturing</option>
                                <option value="Asset Integrity">Asset Integrity</option>
                            </select>
                            <select className="ctrl-sel" id="hist-nps">
                                <option>All NPS Categories</option>
                                <option value="Defactor">Promoters (1-4)</option>
                                <option value="Passive">Passives (5-7)</option>
                                <option value="Promoter">Detractors (8-10)</option>
                            </select>
                            <select className="ctrl-sel" id="hist-csat">
                                <option>All CSAT Categories</option>
                                <option value="Dissatisfied">Dissatisfied (1–4)</option>
                                <option value="Neutral">Neutral (5–7)</option>
                                <option value="Satisfied">Satisfied (8–10)</option>
                            </select>
                            <input className="hist-search" id="hist-q" placeholder="🔍  Search by customer, job, or project…" />
                            <button className="btn btn-navy" id="hist-export">Export</button>
                        </div>
                        <div className="panel">
                            <div className="panel-hdr"><div className="panel-title">Survey Records</div><span className="ptag ptag-teal" id="hist-count">24 records</span></div>
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
                            <table className="data-tbl data-table">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th speed-table-data="Modified">Date</th>
                                        <th speed-table-data="Title">Division</th>
                                        <th speed-table-data="customerName">Customer</th>
                                        <th speed-table-data="jobNumber">Job No.</th>
                                        <th speed-table-data="partName">CSAT</th>
                                        <th speed-table-data="createdAt">NPS</th>
                                        <th speed-table-data="crewName" id='crew-column'>Crew Name</th>
                                        <th speed-table-data="machineUsed" id='machine-column'>Machine Used</th>
                                        <th speed-table-data="status">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="speed-data-table" />
                            </table>
                        </div>
                        <div className="pagination-wrap">
                            <ul id="myrequestpagination" className="pagination"></ul>
                        </div>
                    </div>
                </div>

            </>
        );
    }

    public componentDidMount(): void {
        window.loadReportComponent();
    }
}