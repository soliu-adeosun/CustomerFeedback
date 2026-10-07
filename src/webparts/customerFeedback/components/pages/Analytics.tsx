import * as React from 'react';
import Chart from 'chart.js/auto';
import GlobalLoader from '../../../../Global/GlobalLoader';

(window as any).Chart = Chart;
require("analytics");

export default class Analytics extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);

        this.handleTabSwitch    = this.handleTabSwitch.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleMarkReviewed = this.handleMarkReviewed.bind(this);
    }

    // ── Tab switching ──────────────────────────────────────────────────────
    // Calls window.switchDashTab which is exposed by analytics.js in whenAnalyticsDependenciesLoaded.
    // Passing the exact Division string (or "Overall") so the JS can match it.
    handleTabSwitch(tab: string): void {
        (window as any).switchDashTab?.(tab);
    }

    // ── Period / Year selects ──────────────────────────────────────────────
    // Both selects share one handler — analytics.js reads both selects by index
    // inside handlePeriodChange(), so we just trigger that directly.
    handleFilterChange(): void {
        (window as any).MainApplication?.AnalyticsComponent?.handlePeriodChange?.();
    }

    // ── Mark alert reviewed ────────────────────────────────────────────────
    handleMarkReviewed(e: React.MouseEvent<HTMLButtonElement>): void {
        const target = e.currentTarget.closest('.alert-bar') as HTMLElement;
        if (target) target.style.opacity = '.35';
    }

    // ── Render ─────────────────────────────────────────────────────────────
    public render(): React.ReactElement {
        return (
            <>
                <GlobalLoader message="Preparing Analytics Dashboard..." />
                <div id="real-content" className="hidden">
                    <div className="wrap">

                        {/* ── TABS ── */}
                        <div className="dash-tabs">
                            <button className="dash-tab active"  data-tab="Overall"                onClick={() => this.handleTabSwitch("Overall")}>Overall</button>
                            <button className="dash-tab tab-am"  data-tab="Advanced Manufacturing" onClick={() => this.handleTabSwitch("Advanced Manufacturing")}>Advanced Manufacturing</button>
                            <button className="dash-tab tab-ai"  data-tab="Asset Integrity"        onClick={() => this.handleTabSwitch("Asset Integrity")}>Asset Integrity</button>
                        </div>

                        {/* ── CONTROLS ── */}
                        {/* First select = year (options injected by JS). Second select = period. */}
                        <div className="dash-ctrl">
                            <span className="ctrl-lbl">Period</span>
                            {/* Year — options are populated by whenAnalyticsDependenciesLoaded */}
                            <select className="ctrl-sel" onChange={this.handleFilterChange} />
                            {/* Period — ytd must be first/default to match activePeriod initial value */}
                            <select className="ctrl-sel" onChange={this.handleFilterChange}>
                                <option value="ytd">YTD</option>
                                <option value="q1">Q1</option>
                                <option value="q2">Q2</option>
                                <option value="q3">Q3</option>
                                <option value="q4">Q4</option>
                            </select>
                        </div>

                        {/* ── PERIOD BAR ── */}
                        <div className="period-bar">
                            <div className="period-title">
                                Customer Satisfaction — <span id="ov-lbl">YTD {new Date().getFullYear()}</span>
                            </div>
                            <div className="period-meta" id="ov-meta">— responses · Updated —</div>
                        </div>

                        {/* ── KPI CARDS ── */}
                        <div className="kpi-strip">
                            <div className="kpi-card" style={{ ['--accent' as any]: 'var(--gold-l)' }}>
                                <div className="kpi-lbl">NPS Score</div>
                                {/* ID matches what analytics.js writes to: $("#ov-nps") */}
                                <div className="kpi-val mono" id="ov-nps">—</div>
                                {/* <span className="kpi-delta delta-up" id="ov-d-nps">▲ +7 pts vs prior</span>
                                <div className="kpi-sub">Target: +40 · Benchmark: +30–+50</div> */}
                            </div>

                            <div className="kpi-card" style={{ ['--accent' as any]: '#0ea5e9' }}>
                                <div className="kpi-lbl">CSAT Average</div>
                                <div className="kpi-val mono" id="ov-csat">—</div>
                                {/* <span className="kpi-delta delta-up" id="ov-d-csat">▲ +0.3 vs prior</span>
                                <div className="kpi-sub">Out of 10 · Target: 8.0+</div> */}
                            </div>

                            {/* <div className="kpi-card" style={{ ['--accent' as any]: 'var(--green)' }}>
                                <div className="kpi-lbl">Satisfaction Rate</div>
                                <div className="kpi-val mono" id="ov-sat">—</div>
                            </div> */}

                            <div className="kpi-card" style={{ ['--accent' as any]: 'var(--txt3)' }}>
                                <div className="kpi-lbl">Total Responses</div>
                                <div className="kpi-val mono" id="ov-resp">—</div>
                                {/* <span className="kpi-delta delta-up" id="ov-d-resp">▲ +12 this month</span>
                                <div className="kpi-sub" id="ov-s-resp">Response rate: 74%</div> */}
                            </div>
                        </div>

                        {/* ── TREND ANALYSIS ── */}
                        <div className="sec-div"><span className="sec-div-lbl">Trend Analysis</span><div className="sec-div-line" /></div>
                        <div className="charts-row">
                            <div className="panel">
                                <div className="panel-hdr">
                                    <div className="panel-title">NPS Monthly Trend</div>
                                    {/* <span className="ptag ptag-gold">NPS</span> */}
                                </div>
                                <div className="legend">
                                    <div className="leg-item"><div className="leg-sw" style={{ background: '#F5A623' }} />NPS Score</div>
                                    <div className="leg-item"><div className="leg-sw" style={{ background: 'transparent', border: '1px dashed #7A8BA0' }} />Target (+50)</div>
                                </div>
                                <div className="chart-wrap" style={{ height: 190 }}><canvas id="chart-ov-nps" /></div>
                            </div>

                            <div className="panel">
                                <div className="panel-hdr">
                                    <div className="panel-title">CSAT Score Distribution</div>
                                    {/* <span className="ptag ptag-teal">CSAT</span> */}
                                </div>
                                <div className="legend">
                                    <div className="leg-item"><div className="leg-sw" style={{ background: 'rgba(193,32,46,.6)' }} />Dissatisfied (1–4)</div>
                                    <div className="leg-item"><div className="leg-sw" style={{ background: 'rgba(180,83,9,.6)' }} />Neutral (5–7)</div>
                                    <div className="leg-item"><div className="leg-sw" style={{ background: 'rgba(11,122,82,.6)' }} />Satisfied (8–10)</div>
                                </div>
                                <div className="chart-wrap" style={{ height: 190 }}><canvas id="chart-ov-dist" /></div>
                            </div>
                        </div>

                        {/* ── NPS SEGMENT BREAKDOWN ── */}
                        <div className="nps-panel">
                            <div className="panel-hdr" style={{ marginBottom: 0 }}>
                                <div className="panel-title">NPS Segment Breakdown</div>
                                <div className="nps-formula hidden">
                                    NPS = <span id="ov-fp">—</span> Promoters − <span id="ov-fd">—</span> Detractors = <span style={{ color: 'var(--green)' }} id="ov-fs">—</span>
                                </div>
                            </div>
                            <div className="seg-bar">
                                <div className="seg-chunk seg-p" id="ov-sp" style={{ width: '0%' }}></div>
                                <div className="seg-chunk seg-n" id="ov-sn" style={{ width: '0%' }}></div>
                                <div className="seg-chunk seg-d" id="ov-sd" style={{ width: '0%' }}></div>
                            </div>
                            <div className="seg-stats">
                                <div className="seg-stat"><div className="seg-val mono" style={{ color: 'var(--green)' }}  id="ov-pn">—</div><div className="seg-lbl">Promoters</div></div>
                                <div className="seg-stat"><div className="seg-val mono" style={{ color: 'var(--amber)' }}  id="ov-nn">—</div><div className="seg-lbl">Passives</div></div>
                                <div className="seg-stat"><div className="seg-val mono" style={{ color: 'var(--red)' }}    id="ov-dn">—</div><div className="seg-lbl">Detractors</div></div>
                                <div className="seg-stat"><div className="seg-val mono"                                    id="ov-rr">74%</div><div className="seg-lbl">Response Rate</div></div>
                            </div>
                        </div>

                        {/* ── DIVISION COMPARISON ── */}
                        <div className="sec-div"><span className="sec-div-lbl">Division Comparison</span><div className="sec-div-line" /></div>
                        <div className="charts-row">
                            <div className="panel">
                                <div className="panel-hdr">
                                    <div className="panel-title">CSAT by Division — Monthly</div>
                                    <span className="ptag ptag-green">Comparison</span>
                                </div>
                                <div className="legend">
                                    <div className="leg-item"><div className="leg-sw" style={{ background: 'var(--gold)' }} />Adv. Manufacturing</div>
                                    <div className="leg-item"><div className="leg-sw" style={{ background: 'var(--teal)' }} />Asset Integrity</div>
                                </div>
                                <div className="chart-wrap" style={{ height: 190 }}><canvas id="chart-ov-div" /></div>
                            </div>

                            <div className="panel">
                                <div className="panel-hdr">
                                    <div className="panel-title">Survey Volume by Division</div>
                                    <span className="ptag ptag-gold">Split</span>
                                </div>
                                <div className="chart-wrap" style={{ height: 190 }}><canvas id="chart-ov-pie" /></div>
                            </div>
                        </div>

                        {/* ── RECENT FEEDBACK ── */}
                        <div className="sec-div"><span className="sec-div-lbl">Recent Feedback</span><div className="sec-div-line" /></div>
                        <div className="panel" style={{ marginBottom: 11 }}>
                            <div className="panel-hdr">
                                <div className="panel-title">Latest Customer Comments</div>
                                <span className="ptag ptag-teal">All Divisions</span>
                            </div>
                            {/* Populated dynamically by renderRecentFeedback in analytics.js */}
                            <div className="comment-list" />
                        </div>

                    </div>
                </div>
            </>
        );
    }

    public componentWillUnmount(): void {
        const charts = (window as any).MainApplication?.AnalyticsComponent?.charts;
        if (charts) {
            Object.keys(charts).forEach(key => {
                charts[key]?.destroy();
                charts[key] = null;
            });
        }
    }

    public componentDidMount(): void {
        (window as any).loadAnalyticsComponent?.();
    }
}