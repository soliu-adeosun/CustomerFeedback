loadDashboardComponent = function () {
    if (MainApplication.cachedState.mode) {
        whenDashboardDependeciesLoaded();
    } else {
        MainApplication.cachedState.pageStateCall = loadDashboardComponent;
    }
};

var AppRequest;
var customWorkflowEngine;

MainApplication.DashboardComponent.ApplicationDetails = function () {
    this.url = window.location.href;
    this.itemId = null;
    this.mode = null;
    this.requestDetails = {};
    this.Attachments = [];
    this.FileUrls = {};
    this.FolderUrl = "";
    this.AttachmentLoader = {};
    this.messageTemplate = {};
    this.feedback = false;
    this.approverComments = "";
    this.transactionHistory = [];
    this.defaultStage = "AA0";
    this.returned = null;
    this.sectionArr = [];
    this.sections = {};
    this.finalrating = [];
    this.questionSetCounter = 0;
    this.groupProperties = {};
    this.nonConformanceCounter = 1;
}

whenDashboardDependeciesLoaded = function () {
    // globalDefinitions.callLoader();
    globalDefinitions.extendStages();
    globalDefinitions.sortResponse();
    AppRequest = new MainApplication.DashboardComponent.ApplicationDetails();
    AppRequest.pendingItems = [];
    AppRequest.myItems = [];
    customWorkflowEngine = new WorkflowManagerEngine(CurrentUserProperties);

    MainApplication.DashboardComponent.myRequests();

    $(document).off("click", ".idea-card")
    .on("click", ".idea-card", function () {
        $(this).toggleClass("expanded");
    });

    setTimeout(function () {
        $(".overlay-loader").hide();
        globalDefinitions.closeLoader();
    }, 2000);

};

MainApplication.DashboardComponent.myRequests = function () {

    var queryToUse = [{
        ascending: "FALSE",
        orderby: "Modified",
        viewScope: "RecursiveAll"
    }, {
        operator: 'Eq',
        field: 'EmployeeEmail',
        type: 'Text',
        val: CurrentUserProperties.email
    }];
    var query = vbContext.camlBuilder(queryToUse);
    var extraProperties = {
        merge: true,
        data: [
            "ID", "Title", "WorkflowRequestID", "Current_Approver", "Current_Approver_Code", "Approval_Status",
            "Created", "InitiatorEmailAddress", "InitiatorLogin", "Transaction_History", "ReturnForCorrection",
            "Modified", "PendingUserEmail", "PendingUserLogin", "Attachment_Folder", "AttachmentURL", "Author",
            "Division", "Ideas", "Benefits", "ImprovementArea", "Points", "EmployeeName"
        ]
    };
    vbContext.getListToItems(configProperties.VBLIST.setting, query, extraProperties, true, null, function (tableData) {
        var completedItems = tableData.filter(function (item) {
            return item.Approval_Status === "Completed";
        });
        var pendingItems = tableData.filter(function (item) {
            return item.Approval_Status === "Pending";
        });

        var totalPoints = tableData.reduce(function (sum, item) {
            var val = item.Points;

            if (val === null || val === undefined || val === "") return sum;

            var num = Number(val);
            if (isNaN(num)) return sum;

            return sum + num;
        }, 0);

        AppRequest.myItems = tableData;
        // AppRequest.ncData = MainApplication.AuditList;
        $("#dash-stats").empty();
        $("#dash-stats").append(
            `
                        <div class="stat-card blue">
                            <div class="stat-top">
                                <div class="stat-label">Submitted</div>
                                <div class="stat-icon">📨</div>
                            </div>
                            <div class="stat-num">${tableData.length || 0}</div>
                            <div class="stat-sub">Total ideas shared</div>
                        </div>
                        <div class="stat-card green">
                            <div class="stat-top">
                                <div class="stat-label">Approved</div>
                                <div class="stat-icon">✅</div>
                            </div>
                            <div class="stat-num">${completedItems.length || 0}</div>
                            <div class="stat-sub">In progress</div>
                        </div>
                        <div class="stat-card amber">
                            <div class="stat-top">
                                <div class="stat-label">Under Review</div>
                                <div class="stat-icon">⏳</div>
                            </div>
                            <div class="stat-num">${pendingItems.length || 0}</div>
                            <div class="stat-sub">Awaiting committee</div>
                        </div>
                        <div class="stat-card purple">
                            <div class="stat-top">
                                <div class="stat-label">Kreedland Pts</div>
                                <div class="stat-icon">🏆</div>
                            </div>
                            <div class="stat-num">${totalPoints || 0}</div>
                            <div class="stat-sub">Keep contributing!</div>
                        </div>

            `

        );

        MainApplication.DashboardComponent.renderIdeaCards(tableData);
    });

};

MainApplication.DashboardComponent.renderIdeaCards = function (data) {

    const container = $(".idea-list");
    container.empty();

    if (!data || data.length === 0) {

        container.append(`
            <div style="text-align:center;padding:40px;color:#6b7280">
                No ideas submitted yet.
            </div>
        `);

        return;
    }

    data.forEach(function (item) {

        let initials = CurrentUserProperties.initials || "";

        let date = $spcontext.stringnifyDate({
                        value: item.Created,
                        includeTime: false,
                        format: "dd/mm/yy"
                    })

        let statusBadge = "";

        if (item.Approval_Status === "Completed") {
            statusBadge = `<span class="badge badge-green">✅ Approved</span>`;
        }
        else if (item.Approval_Status === "Pending") {
            statusBadge = `<span class="badge badge-amber">⏳ Under Review</span>`;
        }
        else if (item.Approval_Status === "Revise") {
            statusBadge = `<a href="#/?itemid=${item.WorkflowRequestID}" class="badge badge-blue">💬 Info Requested</a>`;
        }
        else if (item.Approval_Status === "Declined") {
            statusBadge = `<span class="badge badge-red">❌ Declined</span>`;
        }

        const cardHtml = `
        <div class="idea-card">

            <div class="idea-avatar" style="background:#2563EB">
                ${initials}
            </div>

            <div class="idea-body">

                <div class="idea-title">
                    ${item.Title || "Untitled Idea"}
                </div>

                <div class="idea-meta">${item.Division} · Submitted ${date} · #${item.WorkflowRequestID}
                </div>

                <div class="idea-badges improvementArea" />
                <div class="idea-badges benefits" style={{ marginTop: 5, marginBottom: 5 }} />

                <div class="expand-panel">
                    <p style="font-size:12px;color:var(--muted);line-height:1.6">
                        ${item.Ideas || "No description provided"}
                    </p>
                </div>

            </div>

            <div class="idea-right">
                ${statusBadge}
            </div>

        </div>
        `;

        const $card = $(cardHtml);
        // console.log($card, typeof $card);
        container.append($card);

        MainApplication.populateBadgeList(
            $card.find(".benefits"),
            item.Benefits
        );
		MainApplication.populateBadgeList(
            $card.find(".improvementArea"),
            item.ImprovementArea
        );

    });

    $(document).off("click", ".idea-card")
    .on("click", ".idea-card", function () {
        $(this).toggleClass("expanded");
    });

};
