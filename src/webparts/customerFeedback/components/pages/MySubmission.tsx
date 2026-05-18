import * as React from 'react';
import { MyIdeaLoader } from '../../../../Navigation/MyIdeaLoader';
// import AuditCardSkeleton from '../../../../Global/AuditCardSkeleton';
require("mysubmission");


export default class Dashboard extends React.Component<{}, {}> {
    public render(): React.ReactElement {

        return (
            <div className="page">
                <div id="panel-mine">
                    <div className="stats-row" id='dash-stats'>
                        <div className="stat-skel-card">
                            <div className="stat-skel-top">
                                <div className="stat-skel-label shimmer"></div>
                                <div className="stat-skel-icon shimmer"></div>
                            </div>

                            <div className="stat-skel-num shimmer"></div>
                            <div className="stat-skel-sub shimmer"></div>
                        </div>
                        <div className="stat-skel-card">
                            <div className="stat-skel-top">
                                <div className="stat-skel-label shimmer"></div>
                                <div className="stat-skel-icon shimmer"></div>
                            </div>

                            <div className="stat-skel-num shimmer"></div>
                            <div className="stat-skel-sub shimmer"></div>
                        </div>
                        <div className="stat-skel-card">
                            <div className="stat-skel-top">
                                <div className="stat-skel-label shimmer"></div>
                                <div className="stat-skel-icon shimmer"></div>
                            </div>

                            <div className="stat-skel-num shimmer"></div>
                            <div className="stat-skel-sub shimmer"></div>
                        </div>
                        <div className="stat-skel-card">
                            <div className="stat-skel-top">
                                <div className="stat-skel-label shimmer"></div>
                                <div className="stat-skel-icon shimmer"></div>
                            </div>

                            <div className="stat-skel-num shimmer"></div>
                            <div className="stat-skel-sub shimmer"></div>
                        </div>
                    </div>
                    <div className="idea-list">
                        <MyIdeaLoader />
                        <MyIdeaLoader />
                        <MyIdeaLoader />
                    </div>
                </div>

            </div>
        );
    }

    public componentDidMount(): void {
        window.loadDashboardComponent();
    }
}
