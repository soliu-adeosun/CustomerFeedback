loadCustomerFormComponent = function () {
	if (MainApplication.cachedState.mode) {
		whenCustomerFormLoaded();
	} else {
		setTimeout(function () {
			MainApplication.cachedState.pageStateCall = loadCustomerFormComponent;
		}, 1000);
	}
};

var AppRequest;

MainApplication.CustomerComponent.ApplicationDetails = function () {
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

function whenCustomerFormLoaded() {

	$spcontext.assignAttributes();
	AppRequest = new MainApplication.CustomerComponent.ApplicationDetails();
	globalDefinitions.extendStages();
    customWorkflowEngine = new WorkflowManagerEngine(CurrentUserProperties);
    globalDefinitions.SetWorkflowRouting(customWorkflowEngine);
    AppRequest.itemId = $spcontext.getParameterByName("itemid", window.location.href);
    AppRequest.customerId = $spcontext.getParameterByName("customerid", window.location.href);

	MainApplication.CustomerComponent.buildRating('am-csat-row', 'csat', MainApplication.csat);
	MainApplication.CustomerComponent.buildRating('am-nps-row', 'nps', MainApplication.nps);

	if (AppRequest.customerId === CurrentUserProperties.email) {
		MainApplication.CustomerComponent.recoverListData();
	} else {
		MainApplication.notyf.error("You are unauthorized to access this form... ");
		$spcontext.redirect("https://russelsmithgroup.com", false);
	}
}

MainApplication.CustomerComponent.buildRating = function (rowId, key, data) {
  const el = document.getElementById(rowId);
  if (!el || el.children.length) return;

  data.forEach(item => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'rb';
    b.dataset.v = item.rating;

    b.innerHTML = `
      ${item.rating}
      <div class="emoji-tip">${item.title}</div>
    `;

    b.onclick = () => {
      el.querySelectorAll('.rb').forEach(x => x.classList.remove('sel'));
      b.classList.add('sel');
	  if (key === 'nps') {
      	AppRequest.npsRating = item.rating;
		AppRequest.npsCategory = item.category;
	  } else if (key === 'csat') {
		AppRequest.csatRating = item.rating;
		AppRequest.csatCategory = item.category;
	  }
    };

    el.appendChild(b);
  });
}
// Form submission processes
MainApplication.CustomerComponent.confirmSubmit = function (actionTaken) {
	$("#confirmModal").modal("show");
	AppRequest.actionTaken = actionTaken;
	MainApplication.confirmAction = MainApplication.CustomerComponent.actionConfirmed;
};

MainApplication.CustomerComponent.actionConfirmed = function () {
	$("#confirmModal").modal("hide");
	MainApplication.CustomerComponent.saveDataToList(AppRequest.actionTaken);
};

MainApplication.CustomerComponent.saveDataToList = function (actionTaken) {
	globalDefinitions.onActionClicked();
	var formData = {};
	formData.SubmittedDate = $spcontext.serverDate();

	if (AppRequest.npsRating === null || AppRequest.csatRating === null) {
		globalDefinitions.HandlerError("Please provide ratings for both NPS and CSAT before submitting.");
		globalDefinitions.onActionFailed();
		return;
	}

	globalDefinitions.callLoader();
	formData.NPS = AppRequest.npsRating;
	formData.CSAT = AppRequest.csatRating;
	formData.NPSCategory = AppRequest.npsCategory;
	formData.CSATCategory = AppRequest.csatCategory;
	formData.Comment = $("#am-csat-comment").val() || "";

	var historyProp = {
		stage: AppRequest.requestDetails.Current_Approver,
		comment: AppRequest.comment,
		action: actionTaken,
	};

	formData = customWorkflowEngine.routeEngine(customWorkflowEngine).requestHistoryHandler(formData, AppRequest.requestDetails.Transaction_History, historyProp);
	formData = customWorkflowEngine.routeEngine(customWorkflowEngine).runRouting(formData, AppRequest.requestDetails.Current_Approver_Code, actionTaken);

	globalDefinitions.onActionCompleted();
	MainApplication.CustomerComponent.proceedToList(formData, false);

};

MainApplication.CustomerComponent.proceedToList = function (formData) {
	globalDefinitions.callLoader();

	formData.ID = AppRequest.requestDetails.ID;

	$spcontext.updateItems([formData], globalDefinitions.stageDefinitions.listname, function () {
		// AppRequest.requestDetails.Current_Approver = formData.Current_Approver;
		globalDefinitions.closeLoader();
		globalDefinitions.HandlerSuccess(`Thank you for your feedback! Your response has been recorded.`);
		globalDefinitions.AuditLogManager_SaveLog({
			Action: `customer feedback submitted for ${AppRequest.requestDetails.WorkflowRequestID}`,
		});
		$spcontext.redirect("https://russelsmithgroup.com", false);

	});
	globalDefinitions.closeLoader();
};


MainApplication.CustomerComponent.recoverListData = function () {
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
			},
			{
				operator: 'Eq',
				field: 'Approval_Status',
				type: 'Text',
				val: globalDefinitions.stageDefinitions.pending
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
			"Author", "CustomerName", "ProjectTitle", "ServiceLine", "Division",
			"CSAT", "NPS", "CSATCategory", "NPSCategory", "Created", "CrewName",
			"JobNumber", "Approval_Status", "Year"
		];

		$spcontext.getListToControl(globalDefinitions.stageDefinitions.listname, query, extraProperties, function (listProperties) {
			if ($.isEmptyObject(listProperties)) {
				MainApplication.notyf.error("Request is not pending approval...");
				$spcontext.redirect("https://russelsmithgroup.com", false);
				$(".overlay-loader").hide();
				globalDefinitions.closeLoader();
			} else {
				customWorkflowEngine.routeEngine(customWorkflowEngine).updateRoutesinFlow(listProperties, function (resolved) {
					customWorkflowEngine.routeEngine(customWorkflowEngine).PageSecurity(customWorkflowEngine.stages.securityModeTask, listProperties.Current_Approver, listProperties.Approval_Status, function (error) {
						// if (MainApplication.configuredTaskMembers[listProperties.Current_Approver].belongs) {
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
							// AppRequest.FileUrls = $spcontext.deferenceObject(listProperties.AttachmentURL);

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
							$spcontext.redirect("https://russelsmithgroup.com", false);
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
		$spcontext.redirect("https://russelsmithgroup.com", false);
	}
};

