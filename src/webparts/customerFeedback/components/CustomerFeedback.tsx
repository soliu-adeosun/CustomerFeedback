import * as React from 'react';
import type { ICustomerFeedbackProps } from './ICustomerFeedbackProps';

import {Route, Routes, HashRouter} from "react-router-dom";
import {Layout} from "../../../Global/Layout";
import Dashboard from "./pages/MySubmission";
import ApproveRequest from "./pages/ApproveRequest";
import ViewRequest from "./pages/ViewRequest";
import Report from './pages/Report';
import Analytics from "./pages/Analytics";
import { HelmetProvider } from "react-helmet-async";
import ReviewQueue from "./pages/ReviewQueue";
import CustomerForm from "./pages/CustomerForm";


require('main');

declare global {
    interface Window {
        globalProp: any;
        loadDashboardComponent: () => void;
        loadNewRequestComponent: () => void;
        loadApproveRequestComponent: () => void;
        loadViewRequestComponent: () => void;
        loadReportComponent : () => void;
        loadAnalyticsComponent: () => void;
        loadReviewQueueComponent: () => void;
        loadCustomerFormComponent: () => void;
    }
}

export default class VoiceBox extends React.Component<ICustomerFeedbackProps, {}> {
  public render(): React.ReactElement<ICustomerFeedbackProps> {
    const {} = this.props;

    return (
            <>
                <HelmetProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Report />} />
                            <Route path="mysubmissions" element={<Dashboard />} />
                            <Route path="approverequest" element={<ApproveRequest />} />
                            <Route path="viewrequest" element={<ViewRequest />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="reviewqueue" element={<ReviewQueue />} />
                            <Route path="customerform" element={<CustomerForm />} />
                        </Route>
                    </Routes>
                </HashRouter>
                </HelmetProvider>
            </>
    );
  }
}