loadReportComponent = function () {
    if (MainApplication.cachedState.mode) {
        whenReportDependeciesLoaded();
    } else {
        MainApplication.cachedState.pageStateCall = loadReportComponent;
    }
};

var AppRequest;

MainApplication.NewRequestComponent.ApplicationDetails = function () {
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
	this.hodName = "";
	this.hodEmail = "";
	this.selectedDivision = null;
	this.contactName = "";
	this.contactEmail = "";
};

whenReportDependeciesLoaded = function () {
    globalDefinitions.extendStages();
    globalDefinitions.sortResponse();

    AppRequest = new MainApplication.NewRequestComponent.ApplicationDetails();
    AppRequest.fullTableData = [];

    $spcontext.DataForTable.tablecontentId = "speed-data-table";
    $spcontext.DataForTable.pagesize = 30;
    $spcontext.DataForTable.paginateSize = 5;
    $spcontext.DataForTable.modifyTR = false;
    $spcontext.DataForTable.context = $spcontext;
    $spcontext.DataForTable.paginationbId = "myrequestpagination";

    // Formatters (ONLY what is used in your table)
    $spcontext.DataForTable.propertiesHandler = {
        "Modified": function (valueToEva) {
            return $spcontext.stringnifyDate({
                value: valueToEva.Modified,
                includeTime: false,
                format: "dd/mm/yy"
            });
        },
        "Title": function (valueToEva) {
            let division = valueToEva.Division || "";

            if (division === "Advanced Manufacturing") {
                return '<span class="pill pill-gold">AM</span>';
            } else {
                return '<span class="pill pill-teal">AI</span>';
            }
        },
        "createdAt": function (valueToEva) {
            let nps = valueToEva.NPSCategory || "";
            if (nps === "Promoter") {
                return '<span class="pill pill-green">Promoter</span>';
            } else if (nps === "Passive") {
                return '<span class="pill pill-amber">Passive</span>';
            } else if (nps === "Detractor") {
                return '<span class="pill pill-red">Detractor</span>';
            } else {
                return nps;
            }
        },
        "partName": function (valueToEva) {
            let csat = valueToEva.CSATCategory || "";
            if (csat === "Satisfied") {
                return '<span class="pill pill-green">Satisfied</span>';
            } else if (csat === "Neutral") {
                return '<span class="pill pill-amber">Neutral</span>';
            } else if (csat === "Dissatisfied") {
                return '<span class="pill pill-red">Dissatisfied</span>';
            } else {
                return csat;
            }
        },
        "status": function (valueToEva) {
            var viewStr = `
                <a title="View" href="#/viewrequest?itemId=${valueToEva.ID}" 
                    class="view-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </a>`;

                return `<div class="">${viewStr}</div>`;
        },
        "customerName": function (valueToEva) {
            return valueToEva.CustomerName || "";
        },
        "jobNumber": function (valueToEva) {
            return valueToEva.JobNumber || "";
        }
    };

    // Filters (ONLY existing controls)
    $("#hist-div, #hist-nps, #hist-csat").on("change", function () {
        MainApplication.ReportComponent.applyFilters();

        if ($(this).attr("id") === "hist-div") {
            const selected = $(this).val();

            const toggleColumn = (colIndex, show) => {
                $(".data-table tr").each(function () {
                    $(this).find(`th:nth-child(${colIndex}), td:nth-child(${colIndex})`)
                        .toggle(show);
                });
            };

            if (selected === "Advanced Manufacturing") {
                toggleColumn(9, true);  // Machine
                toggleColumn(8, false); // Crew
            } 
            else if (selected === "Asset Integrity") {
                toggleColumn(8, true);  // Crew
                toggleColumn(9, false); // Machine
            } 
            else {
                toggleColumn(8, false);
                toggleColumn(9, false);
            }
        }
    });

    $("#hist-q").on("keyup", function () {
        MainApplication.ReportComponent.applyFilters();
    });

    $("#hist-export").on("click", function () {
        MainApplication.ReportComponent.exportToExcel();
    });

    MainApplication.ReportComponent.retrieveRequest();
    globalDefinitions.closeLoader();
};

// ─── Schema Adapter (CustomerAPIList → legacy field names) ──
// The list was migrated to "CustomerAPIList" with renamed/retyped columns.
// NPSCategory/CSATCategory no longer exist as list fields — they're derived
// here from the raw "recommend"/"satisfaction" numbers via the rating→category
// lookup tables (MainApplication.nps / MainApplication.csat).
MainApplication.ReportComponent.mapListItem = function (item) {
    return {
        ID: item.ID,
        Modified: item.Modified,
        Division: item.Title,
        CustomerName: item.customerName,
        MachineUsed: item.machineUsed,
        CrewName: item.crewName,
        JobNumber: item.jobNumber,
        CSAT: item.satisfaction,
        NPS: item.recommend,
        CSATCategory: MainApplication.ReportComponent.getCSATCategory(item.satisfaction),
        NPSCategory: MainApplication.ReportComponent.getNPSCategory(item.recommend)
    };
};

MainApplication.ReportComponent.getCSATCategory = function (value) {
    var idx = Math.round(parseFloat(value)) - 1;
    return (MainApplication.csat && MainApplication.csat[idx]) ? MainApplication.csat[idx].category : "";
};

MainApplication.ReportComponent.getNPSCategory = function (value) {
    var idx = Math.round(parseFloat(value)) - 1;
    return (MainApplication.nps && MainApplication.nps[idx]) ? MainApplication.nps[idx].category : "";
};

// ─── Fetch data ─────────────────────────────────────────

MainApplication.ReportComponent.retrieveRequest = function () {
    var reportQuery = [{
        ascending: "FALSE",
        orderby: "Modified"
    }];

    var query = $spcontext.camlBuilder(reportQuery);

    var extraProperties = {
        merge: true,
        data: [
            "ID", "Modified", "Title", "customerName", "machineUsed", "crewName",
            "jobNumber", "satisfaction", "recommend"
        ]
    };

    $spcontext.getListToItems(
        configProperties.CSLIST.setting,
        query,
        extraProperties,
        true,
        null,
        function (tableData) {
            AppRequest.fullTableData = (tableData || []).map(MainApplication.ReportComponent.mapListItem);
            MainApplication.ReportComponent.applyFilters();
        }
    );
};

// ─── Apply filters (client-side ONLY) ───────────────────

MainApplication.ReportComponent.applyFilters = function () {
    var data = AppRequest.fullTableData || [];

    var division = $("#hist-div").val();
    var nps = $("#hist-nps").val();
    var csat = $("#hist-csat").val();
    var query = ($("#hist-q").val() || "").toLowerCase();

    var filtered = data.filter(function (item) {

        // Division filter
        if (division && division !== "All Divisions" && item.Division !== division) {
            return false;
        }

        // NPS filter
        if (nps && nps !== "All NPS Categories" && item.NPSCategory !== nps) {
            return false;
        }

        // CSAT filter
        if (csat && csat !== "All CSAT Categories" && item.CSATCategory !== csat) {
            return false;
        }

        // Search filter
        if (query) {
            var text = (
                (item.CustomerName || "") +
                (item.JobNumber || "") +
                (item.ProjectTitle || "")
            ).toLowerCase();

            if (!text.includes(query)) return false;
        }

        return true;
    });

    MainApplication.ReportComponent.showTableData(filtered);
};

// ─── Render table ───────────────────────────────────────

MainApplication.ReportComponent.showTableData = function (tableData) {

    AppRequest.dataForExport = tableData; // ← ADD THIS

    $("#hist-count").text(tableData.length + " records");
    $("#hist-meta").text(tableData.length + " records");

    if (tableData.length === 0) {
        $("#speed-data-table").empty();
        $(".data-table").hide();
        $(".norequest").show();
        $(".pagination-wrap").hide();
    } else {
        $(".norequest").hide();
        $(".data-table").show();
        $spcontext.manualTable(tableData);
        $(".pagination-wrap").show();
    }

    $("#globalLoader").hide();
    $("#real-content").removeClass("hidden");
};

MainApplication.ReportComponent.exportToExcel = function () {

    var excelName = "SurveyHistory_" + $spcontext.stringnifyDate() + ".csv";

    var headers = [
        "Date",
        "Division",
        "Customer",
        "Job Number",
        "CSAT",
        "NPS"
    ];

    var csv = headers.join(",") + "\n";

    $.each(AppRequest.dataForExport || [], function (i, item) {

        var row = [];

        row.push($spcontext.stringnifyDate({
            value: item.Modified,
            includeTime: false
        }));

        row.push(MainApplication.ReportComponent.cleanCSV(item.Division));
        row.push(MainApplication.ReportComponent.cleanCSV(item.CustomerName));
        row.push(MainApplication.ReportComponent.cleanCSV(item.JobNumber));
        row.push(MainApplication.ReportComponent.cleanCSV(item.CSATCategory));
        row.push(MainApplication.ReportComponent.cleanCSV(item.NPSCategory));

        csv += row.join(",") + "\n";
    });

    csv = "\uFEFF" + csv;

    MainApplication.ReportComponent.downloadCSV(excelName, csv);
};

MainApplication.ReportComponent.downloadCSV = function (filename, data) {

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob([data], { type: "text/csv" });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        link.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(data));
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

MainApplication.ReportComponent.cleanCSV = function (value) {

    if (!value) return "";

    value = value.toString().replace(/\r?\n|\r/g, "");

    if (value.includes(",") || value.includes('"')) {
        value = '"' + value.replace(/"/g, '""') + '"';
    }

    return value;
};