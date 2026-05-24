loadNewRequestComponent = function () {
	if (MainApplication.cachedState.mode) {
		whenNewRequestDependeciesLoaded();
	} else {
		setTimeout(function () {
			MainApplication.cachedState.pageStateCall = loadNewRequestComponent;
		}, 1000);
	}
};

var AppRequest;
var customWorkflowEngine;

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

function whenNewRequestDependeciesLoaded() {
	$spcontext.assignAttributes();
	MainApplication.CurrentPageSubmitFunction = MainApplication.NewRequestComponent.confirmSubmit;
	AppRequest = new MainApplication.NewRequestComponent.ApplicationDetails();
	globalDefinitions.extendStages();

	AppRequest.itemId = $spcontext.getParameterByName("itemid", window.location.href);
	AppRequest.mode = $spcontext.getParameterByName("mode", window.location.href);

	customWorkflowEngine = new WorkflowManagerEngine(CurrentUserProperties);
	globalDefinitions.SetWorkflowRouting(customWorkflowEngine);
	customWorkflowEngine.routeEngine(customWorkflowEngine).setCurrentUserAsInitiator();

	$("#dopt-am").on("click", function () {
		MainApplication.NewRequestComponent.selectDiv("am");
		AppRequest.selectedDivision = "Advanced Manufacturing";
	});

	$("#dopt-ai").on("click", function () {
		MainApplication.NewRequestComponent.selectDiv("ai");
		AppRequest.selectedDivision = "Asset Integrity";
	});

	$('#am-cust').on('change', function () {
		var selected = $(this).find('option:selected');

		var contactName = selected.data('contact-name');
		var contactEmail = selected.data('contact-email');

		AppRequest.contactName = contactName;
		AppRequest.contactEmail = contactEmail;

	});

	$('#ai-cust').on('change', function () {
		var selected = $(this).find('option:selected');

		var contactName = selected.data('contact-name');
		var contactEmail = selected.data('contact-email');

		AppRequest.contactName = contactName;
		AppRequest.contactEmail = contactEmail;

	});

	// Attach reset function to all reset buttons
	$('.reset-btn').on('click', function () {
		MainApplication.NewRequestComponent.resetDivSelection();
	});

	for (var i = 0; i < MainApplication.customerList.length; i++) {
        $("#am-cust").append(`<option data-contact-name="${MainApplication.customerList[i].contactName}" data-contact-email="${MainApplication.customerList[i].contactEmail}">${MainApplication.customerList[i].title}</option>`);
		$("#ai-cust").append(`<option data-contact-name="${MainApplication.customerList[i].contactName}" data-contact-email="${MainApplication.customerList[i].contactEmail}">${MainApplication.customerList[i].title}</option>`);
    }

	for (var j = 0; j < MainApplication.machineTypes.length; j++) {
		$("#am-machine").append(`<option value="${MainApplication.machineTypes[j]}">${MainApplication.machineTypes[j]}</option>`);
	}

	for (var k = 0; k < MainApplication.serviceLines.length; k++) {
		$("#ai-service-line").append(`<option value="${MainApplication.serviceLines[k]}">${MainApplication.serviceLines[k]}</option>`);
	}

	for (var c = 0; c < MainApplication.crewNames.length; c++){
		$("#ai-crewname").append(`<option value="${MainApplication.crewNames[c]}">${MainApplication.crewNames[c]}</option>`);
	}

	if (MainApplication.configuredTaskMembers[configProperties.CUSTOMER.setting]?.belongs){
		globalDefinitions.HandlerError("You are not allowed to access this page");
		globalDefinitions.AuditLogManager_SaveLog({
			Action: `Unauthorized action on CS New Survey page`,
			Message: "User is not allowed to act on this request",
		});
						
		$spcontext.redirect("https://russelsmithgroup.com", false);
	} else {
		$("#globalLoader").hide();
    	$("#real-content").removeClass("hidden");
	}
}

MainApplication.NewRequestComponent.selectDiv = function (div) {
    ['am', 'ai'].forEach(function (d) {
		$('#dopt-' + d).attr('class', 'div-opt');
        $('#form-' + d).removeClass('open');

        // Disable all inputs in inactive forms
        $('#form-' + d).find('[speed-bind-validate]').prop('disabled', true);
    });

	// $('#success-bar').removeClass('open');

    $('#dopt-' + div).addClass(div === 'am' ? 'sel-gold' : 'sel-teal');

    $('#form-' + div).addClass('open');

    // Enable only active form
    $('#form-' + div).find('[speed-bind-validate]').prop('disabled', false);
};

MainApplication.NewRequestComponent.resetDivSelection = function () {
    // Reset both options
    $('#dopt-am').removeClass('sel-gold sel-teal').addClass('div-opt');
    $('#dopt-ai').removeClass('sel-gold sel-teal').addClass('div-opt');

    // Close both forms
    $('#form-am, #form-ai').removeClass('open');

    // Disable all inputs in both forms
    $('#form-am, #form-ai').find('[speed-bind-validate]').prop('disabled', true);

    // Hide success bar
    // $('#success-bar').removeClass('open');
};

// Form submission processes
MainApplication.NewRequestComponent.confirmSubmit = function (action) {
	MainApplication.confirmAction = MainApplication.NewRequestComponent.actionConfirmed;
	$("#confirmModal").modal("show");
};

MainApplication.NewRequestComponent.actionConfirmed = function () {
	MainApplication.NewRequestComponent.saveDataToList();
};

MainApplication.NewRequestComponent.saveDataToList = function () {
	globalDefinitions.onActionClicked();
	if (AppRequest.selectedDivision === "Advanced Manufacturing") {
		var formData = $spcontext.bind({}, "AdvancedManufacturing");
	}
	if (AppRequest.selectedDivision === "Asset Integrity") {
		var formData = $spcontext.bind({}, "AssetIntegrity");
	}
	
	formData.RequestCreated = $spcontext.serverDate();
	formData.InitiatorLogin = CurrentUserProperties.email;
	formData.InitiatorEmailAddress = CurrentUserProperties.email;
	formData.InitiatorName = CurrentUserProperties.title;
	formData.Division = AppRequest.selectedDivision;
	formData.ContactName = AppRequest.contactName;
	formData.ContactEmail = AppRequest.contactEmail;
	formData.Title = formData.CustomerName;

	formData.Year = $spcontext.serverDate().getFullYear();
	formData.Month = $spcontext.serverDate().getMonth();
	
	if ($spcontext.checkPassedValidation()) {
		globalDefinitions.callLoader();
		AppRequest.returned = AppRequest.requestDetails.ReturnForCorrection;

		if (AppRequest.returned === "Yes") {
			formData = customWorkflowEngine.routeEngine(customWorkflowEngine).requestHistoryHandler(formData, AppRequest.requestDetails.Transaction_History, { stage: "Initiator", action: "Survey Re-Submitted" });
			formData = customWorkflowEngine.routeEngine(customWorkflowEngine).runRouting(formData);
		}
		else {
			formData = customWorkflowEngine.routeEngine(customWorkflowEngine).requestHistoryHandler(formData, AppRequest.transactionHistory, { stage: "Initiator", action: "Survey Created" });
			formData = customWorkflowEngine.routeEngine(customWorkflowEngine).runRouting(formData);
		}
		globalDefinitions.onActionCompleted();
		MainApplication.NewRequestComponent.proceedToList(formData, false);
	} else {
		globalDefinitions.HandlerError("", true);
		globalDefinitions.onActionFailed();
	}
};

MainApplication.NewRequestComponent.proceedToList = function (formData) {

	var Attachments = $spcontext.grabAllAttachments();
	//used to grab all string links so that it can be updated.
	//mostly used when return for more information is part of the workflow process
	AppRequest.FileUrls = $spcontext.grabAllAttachmentsLinks();
	globalDefinitions.uploadAttachment($spcontext, Attachments, globalDefinitions.stageDefinitions.foldername, globalDefinitions.stageDefinitions.documentlib, function () {
		if (AppRequest.itemId == null) {
			$spcontext.createItems([formData], globalDefinitions.stageDefinitions.listname, function (createdItemsProperties) {
				var itemID = createdItemsProperties[0].get_id();
				var updateObj = {};
				updateObj.ID = itemID;
				updateObj.WorkflowRequestID = globalDefinitions.stageDefinitions.workflowcode + itemID;
				$("#idOnSuccess").html(updateObj.WorkflowRequestID);

				AppRequest.requestDetails = formData;
				AppRequest.requestDetails.WorkflowRequestID = updateObj.WorkflowRequestID;
				if (!jQuery.isEmptyObject(AppRequest.AttachmentLoader)) {
					updateObj.Attachment_Folder = AppRequest.AttachmentLoader.Attachmentfolder;
					updateObj.AttachmentURL = AppRequest.AttachmentLoader.Attachmentlinks;
				}
				updateObj.Year = $spcontext.serverDate().getFullYear();
				updateObj.LastTimeItemModifiedByWorklow = $spcontext.serverDate();
				updateObj.SLA_COUNT_UPDATED = "No";

				$spcontext.updateItems([updateObj], globalDefinitions.stageDefinitions.listname, function () {
					globalDefinitions.HandlerSuccess(`Request submitted successfully`);
					// $spcontext.redirect("#/", false);
					// globalDefinitions.closeLoader();

					globalDefinitions.AuditLogManager_SaveLog({
						Action: `Submitted Request for document  ${AppRequest.requestDetails.WorkflowRequestID}`,
					});
					// });

					globalDefinitions.onActionCompleted();
					AppRequest.transactionHistory = [];
					$spcontext.resetBind();
					// MainApplication.NewRequestComponent.clearAllAttachments("SupportingDocuments", "fu");
					// $spcontext.redirect("#/", false);
					globalDefinitions.closeLoader();
					$("#newSuccessModal").modal("show");
					MainApplication.NewRequestComponent.resetDivSelection();

				});
			});
		} else {
			formData.ID = AppRequest.requestDetails.ID;
			formData.AttachmentURL = JSON.stringify(AppRequest.FileUrls);

			$("#idOnSuccess").html(formData.WorkflowRequestID);
			$spcontext.updateItems([formData], globalDefinitions.stageDefinitions.listname, function () {
				if (AppRequest.requestDetails.ReturnForCorrection !== "Yes") {
					AppRequest.requestDetails.Current_Approver = formData.Current_Approver;
				}

				setTimeout(() => {
					globalDefinitions.closeLoader();
				}, 2000);
				globalDefinitions.HandlerSuccess("Request Modified & Submitted Successfully");

				globalDefinitions.AuditLogManager_SaveLog({
					Action: `submitted Request ${AppRequest.requestDetails.WorkflowRequestID}`
				});
				globalDefinitions.onActionCompleted();
				$spcontext.resetBind();
				$spcontext.redirect("#/", false);
				globalDefinitions.closeLoader();
				$("#newSuccessModal").modal("show");
				MainApplication.NewRequestComponent.resetDivSelection();
			});
		}
	});
};
