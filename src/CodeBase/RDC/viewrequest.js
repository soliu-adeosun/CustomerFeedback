loadViewRequestComponent = function () {
	if (MainApplication.cachedState.mode) {
		whenViewRequestLoaded();
	} else {
		setTimeout(function () {
			MainApplication.cachedState.pageStateCall = loadViewRequestComponent;
		}, 1000);
	}
};

var AppRequest;
var customWorkflowEngine;

MainApplication.ViewRequestComponent.ApplicationDetails = function () {
	this.url = window.location.href;
	this.itemId = null;
	this.mode = null;
	this.requestDetails = {};
	this.approverComments = "";
	this.transactionHistory = [];
	this.defaultStage = "AA0";
	this.returned = null;
	this.npsRating = null;
	this.csatRating = null;
	this.npsCategory = null;
	this.csatCategory = null;
	this.customerId = null;
};

function whenViewRequestLoaded() {
	$spcontext.assignAttributes();
	AppRequest = new MainApplication.ViewRequestComponent.ApplicationDetails();
	globalDefinitions.extendStages();
    customWorkflowEngine = new WorkflowManagerEngine(CurrentUserProperties);
    globalDefinitions.SetWorkflowRouting(customWorkflowEngine);
    AppRequest.itemId = $spcontext.getParameterByName("itemid", window.location.href);

	if (MainApplication.isUserAnActor) {
		MainApplication.ViewRequestComponent.recoverListData();
	} else {
		MainApplication.notyf.error("You are unauthorized to access this page... ");
		$spcontext.redirect("#/", false);
	}
}

MainApplication.ViewRequestComponent.recoverListData = function () {
	if (AppRequest.itemId !== null && AppRequest.itemId !== "") {
		var query = $spcontext.camlBuilder([
			{
				rowlimit: 1,
			},

			{
				operator: "Eq",
				field: "WorkflowRequestID",
				type: "Text",
				val: AppRequest.itemId,
			}
		]);

		var extraProperties = [
			"ID", "Title", "WorkflowRequestID",
			"Current_Approver",
			"Current_Approver_Code",
			"Approval_Status",
			"Created",
			"InitiatorEmailAddress",
			"InitiatorLogin",
			"Transaction_History",
			"ReturnForCorrection",
			"Modified",
			"PendingUserEmail",
			"PendingUserLogin",
			"Attachment_Folder",
			"AttachmentURL",
			"Author", "CustomerName", "ProjectTitle", "ServiceLine", "Division", "MachineUsed", "CSAT", "NPS", "CSATCategory", "NPSCategory", "Created", "CrewName",
			"CSAT", "NPS", "CSATCategory", "NPSCategory", "Created", "CrewName",
			"JobNumber", "Approval_Status", "Year"
		];

		$spcontext.getListToControl(globalDefinitions.stageDefinitions.listname, query, extraProperties, function (listProperties) {
			if ($.isEmptyObject(listProperties)) {
				MainApplication.notyf.error("Request is not pending approval...");
				$spcontext.redirect("#/", false);
				$(".overlay-loader").hide();
				globalDefinitions.closeLoader();
			} else {
				customWorkflowEngine.routeEngine(customWorkflowEngine).updateRoutesinFlow(listProperties, function (resolved) {
					customWorkflowEngine.routeEngine(customWorkflowEngine).PageSecurity(customWorkflowEngine.stages.securityModeView, listProperties.Current_Approver, listProperties.Approval_Status, function (error) {
						// if (MainApplication.configuredTaskMembers[listProperties.Current_Approver].belongs) {
						console.log(error);
						if (typeof error === "undefined") {
							listProperties.Created = $spcontext.stringnifyDate({
								value: listProperties.Created,
							});

							listProperties.RequestCreated = $spcontext.stringnifyDate({
								value: listProperties.RequestCreated,
								includeTime: false,
								format: "dd/mm/yy"
							});

							listProperties.Transaction_History = $spcontext.JSONToObject(listProperties.Transaction_History);
							listProperties.AttachmentURL = $spcontext.JSONToObject(listProperties.AttachmentURL, "object");

							AppRequest.FolderUrl = listProperties.Attachment_Folder;
							AppRequest.FileUrls = $spcontext.deferenceObject(listProperties.AttachmentURL);

							for (var file in AppRequest.FileUrls) {
								$spcontext.filesDictionary[file] = { files: AppRequest.FileUrls[file] };
							}
							if (listProperties.Division === "Advanced Manufacturing") {
								$("#am-header").removeClass("hidden");
								$("#am-job-details").removeClass("hidden");
							} else {
								$("#ai-header").removeClass("hidden");
								$("#ai-job-details").removeClass("hidden");
							}

							MainApplication.buildRating('am-csat-row', 'csat', MainApplication.csat, listProperties.CSAT, true);
							MainApplication.buildRating('am-nps-row', 'nps', MainApplication.nps, listProperties.NPS, true);
							// AppRequest.FileUrls = $spcontext.deferenceObject(listProperties.AttachmentURL);

							if (listProperties.Transaction_History.length !== 0) {
								$("#transaction-history").show();
								globalDefinitions.displayHistory(listProperties.Transaction_History);
							}

							AppRequest.requestDetails = listProperties;

							$spcontext.htmlBind(listProperties);

							$("#globalLoader").hide();
            				$("#real-content").removeClass("hidden");
							// if (AppRequest.requestDetails.Current_Approver !== 'Employee'){
							$spcontext.attachmentLinkBind(listProperties.AttachmentURL);
							// }

							// setTimeout(function () {
								// $(".overlay-loader").hide();
								// $("#approvalloader").hide();
        						// $("#page-approval").show();
							// 	globalDefinitions.closeLoader();
							// }, 2000);
						} else {
							globalDefinitions.HandlerError("You are not allowed to access this page");
							globalDefinitions.AuditLogManager_SaveLog({
								Action: `Unauthorized action on CS ${listProperties.WorkflowRequestID}`,
								Message: "User is not allowed to act on this request",
							});
							setTimeout(function () {
								$(".overlay-loader").hide();
								globalDefinitions.closeLoader();
							}, 1000);
							$spcontext.redirect("#/", false);
						}

						// }
					}); //commented here
				}); //commented here
			}
		});
	} else {
		$(".overlay-loader").hide();
		globalDefinitions.closeLoader();
		MainApplication.notyf.error("Invalid Request...");
		$spcontext.redirect("#/", false);
	}
};

