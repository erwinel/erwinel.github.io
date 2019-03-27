function setupTopLevelCardChange($scope, name) {
    function onTopLevelCardChanged() {
        if ($scope.currentTopLevelCard === name) {
            $scope.topLevelCardVisible = true;
            $scope.topLevelIconUrl = "images/collapse.svg";
            $scope.topLevelIconVerb = "Collapse";
        } else {
            $scope.topLevelCardVisible = false;
            $scope.topLevelIconUrl = "images/expand.svg";
            $scope.topLevelIconVerb = "Expand";
        }
    }
    $scope.addNotifyTopLevelCardSelect(onTopLevelCardChanged);
    $scope.toggleTopLevelCardSelect = function() {
        if ($scope.currentTopLevelCard === name)
            $scope.currentTopLevelCard = "";
        else
            $scope.currentTopLevelCard = name;
        onTopLevelCardChanged();
    };
    onTopLevelCardChanged();
}
function setupInitialConfigurationCardChange($scope, name) {
    function onInitialConfigurationCardChanged() {
        if ($scope.currentInitialConfigurationCard === name) {
            $scope.initialConfigurationCardVisible = true;
            $scope.initialConfigurationIconUrl = "images/collapse.svg";
            $scope.initialConfigurationIconVerb = "Collapse";
        } else {
            $scope.initialConfigurationCardVisible = false;
            $scope.initialConfigurationIconUrl = "images/expand.svg";
            $scope.initialConfigurationIconVerb = "Expand";
        }
    }
    $scope.addNotifyInitialConfigurationCardSelect(onInitialConfigurationCardChanged);
    $scope.toggleInitialConfigurationCardSelect = function() {
        if ($scope.currentInitialConfigurationCard === name)
            $scope.currentInitialConfigurationCard = "";
        else
            $scope.currentInitialConfigurationCard = name;
            onInitialConfigurationCardChanged();
    };
    onInitialConfigurationCardChanged();
}
var mainModule = angular.module("mainModule", []);
mainModule.controller("mainController", function($scope) {
    $scope.preRequisitesAreInvalid = false;
    
    var notifyCardChange = [];
    $scope.addNotifyTopLevelCardSelect = function(f) {
        if (typeof(f) === "function")
            notifyCardChange.push(f);
    };
    $scope.setTopLevelCardVisible = function(n) {
        if (n === $scope.currentTopLevelCard)
            return;
        localStorage.setItem("currentTopLevelCard", n);
        $scope.currentTopLevelCard = n;
        notifyCardChange.filter(function(f) { f(n); });
    };

    $scope.plugins = [
        { id: "com.glide.quiz_designer", manualActivate: true }, { id: "com.glide.ui.list_v3", manualActivate: true }, { id: "com.glide.web_service_provider_v2", manualActivate: true },
		{ id: "com.glideapp.live_feed_v2", manualActivate: true }, { id: "com.glideapp.report_statreports", manualActivate: true },
		{ id: "com.snc.automatic_assignment", manualActivate: true }, { id: "com.snc.bestpractice.bulkchange", manualActivate: true },
		{ id: "com.snc.change_management.risk_assessment", manualActivate: true }, { id: "com.snc.extended_cmdb", manualActivate: true },
		{ id: "com.snc.field_normalization", manualActivate: true }, { id: "com.snc.financial_planning_pmo", manualActivate: true }, { id: "com.snc.iam", manualActivate: true },
		{ id: "com.snc.knowledge_document", manualActivate: true }, { id: "com.snc.pa.configurationgenerator", manualActivate: true }, { id: "com.snc.procurement", manualActivate: true },
		{ id: "com.snc.required_form_fields", manualActivate: true }, { id: "com.snc.sc_catalog_manager", manualActivate: true }, { id: "com.snc.sdlc.agile.2.0", manualActivate: true },
		{ id: "com.snc.service_portfolio.sla", manualActivate: true }, { id: "com.snc.sla.contract2", manualActivate: true }, { id: "com.snc.task_activity", manualActivate: true },
		{ id: "com.snc.treemap", manualActivate: true }, { id: "com.snc.undelete", manualActivate: true }, { id: "com.snc.vendor_performance", manualActivate: true },
		{ id: "com.snc.whtp", manualActivate: true }, { id: "com.glide.api_analytics", manualActivate: false }, { id: "com.glide.assessment_designer", manualActivate: false },
		{ id: "com.glide.assessment_designer.common", manualActivate: false }, { id: "com.glide.automated_testing_framework", manualActivate: false },
		{ id: "com.glide.automated_testing_impl.rest_inbound", manualActivate: false }, { id: "com.glide.automated_testing_impl.schedule", manualActivate: false },
		{ id: "com.glide.automated_testing_impl.service_catalog", manualActivate: false }, { id: "com.glide.autorecovery", manualActivate: false },
		{ id: "com.glide.auxdb", manualActivate: false }, { id: "com.glide.business_rule_v2", manualActivate: false }, { id: "com.glide.client_transaction", manualActivate: false },
		{ id: "com.glide.cms", manualActivate: false }, { id: "com.glide.cms.extensions", manualActivate: false }, { id: "com.glide.cms.types", manualActivate: false },
		{ id: "com.glide.code-search", manualActivate: false }, { id: "com.glide.collision_detector", manualActivate: false }, { id: "com.glide.column_statistics", manualActivate: false },
		{ id: "com.glide.company", manualActivate: false }, { id: "com.glide.connect", manualActivate: false }, { id: "com.glide.connect.scriptable", manualActivate: false },
		{ id: "com.glide.connect_v3plus.core.ah", manualActivate: false }, { id: "com.glide.context_help", manualActivate: false },
		{ id: "com.glide.custom_web_service", manualActivate: false }, { id: "com.glide.data_lookup", manualActivate: false },
		{ id: "com.glide.data_lookup.catalog", manualActivate: false }, { id: "com.glide.data_policy2", manualActivate: false },
		{ id: "com.glide.data_services_canonicalization.config", manualActivate: false }, { id: "com.glide.db_audio", manualActivate: false },
		{ id: "com.glide.db_images", manualActivate: false }, { id: "com.glide.db_video", manualActivate: false }, { id: "com.glide.db_view", manualActivate: false },
		{ id: "com.glide.debugger", manualActivate: false }, { id: "com.glide.delegated_development", manualActivate: false }, { id: "com.glide.dev-studio", manualActivate: false },
		{ id: "com.glide.dictionary_override", manualActivate: false }, { id: "com.glide.editor.tinymce", manualActivate: false },
		{ id: "com.glide.email.random_watermark", manualActivate: false }, { id: "com.glide.email.service", manualActivate: false },
		{ id: "com.glide.email_accounts", manualActivate: false }, { id: "com.glide.email_client_template", manualActivate: false },
		{ id: "com.glide.email_createuser", manualActivate: false }, { id: "com.glide.email_digest", manualActivate: false }, { id: "com.glide.email_engine_notifs", manualActivate: false },
		{ id: "com.glide.email_filter", manualActivate: false }, { id: "com.glide.email_notification_preview", manualActivate: false },
		{ id: "com.glide.email_ordered_processing", manualActivate: false }, { id: "com.glide.email_outbound", manualActivate: false },
		{ id: "com.glide.email_retention", manualActivate: false }, { id: "com.glide.email_sms_separation", manualActivate: false },
		{ id: "com.glide.email_unsubscribe", manualActivate: false }, { id: "com.glide.embedded_help", manualActivate: false }, { id: "com.glide.erd", manualActivate: false },
		{ id: "com.glide.glide-js-debugger", manualActivate: false }, { id: "com.glide.globalsearch", manualActivate: false }, { id: "com.glide.guided_tours", manualActivate: false },
		{ id: "com.glide.high_security", manualActivate: false }, { id: "com.glide.history_set", manualActivate: false }, { id: "com.glide.history_walker", manualActivate: false },
		{ id: "com.glide.htmlsanitizer", manualActivate: false }, { id: "com.glide.hub", manualActivate: false }, { id: "com.glide.hub.action_step.core", manualActivate: false },
		{ id: "com.glide.hub.action_step.crud", manualActivate: false }, { id: "com.glide.hub.action_step.email", manualActivate: false },
		{ id: "com.glide.hub.action_step.log", manualActivate: false }, { id: "com.glide.hub.action_step.notification", manualActivate: false },
		{ id: "com.glide.hub.action_step.script", manualActivate: false }, { id: "com.glide.hub.action_step.template", manualActivate: false },
		{ id: "com.glide.hub.action_type.system", manualActivate: false }, { id: "com.glide.hub.designer", manualActivate: false },
		{ id: "com.glide.hub.designer_backend.model", manualActivate: false }, { id: "com.glide.hub.designer_backend.suite", manualActivate: false },
		{ id: "com.glide.hub.flow_engine", manualActivate: false }, { id: "com.glide.hub.flow_reporting", manualActivate: false },
		{ id: "com.glide.hub.flow_reporting.dashboard", manualActivate: false }, { id: "com.glide.hub.flow_trigger", manualActivate: false },
		{ id: "com.glide.index_suggestion", manualActivate: false }, { id: "com.glide.list_v2", manualActivate: false }, { id: "com.glide.local_update_set", manualActivate: false },
		{ id: "com.glide.metadata", manualActivate: false }, { id: "com.glide.metadata_delete", manualActivate: false }, { id: "com.glide.metrics", manualActivate: false },
		{ id: "com.glide.monitor.diagnostics", manualActivate: false }, { id: "com.glide.notification", manualActivate: false },
		{ id: "com.glide.notification.preference.service", manualActivate: false }, { id: "com.glide.notification.preference.ui", manualActivate: false },
		{ id: "com.glide.notification.push", manualActivate: false }, { id: "com.glide.notification.subscription", manualActivate: false },
		{ id: "com.glide.odbc.commons", manualActivate: false }, { id: "com.glide.outbound_http_log", manualActivate: false }, { id: "com.glide.outbound_tracking", manualActivate: false },
		{ id: "com.glide.performance_dashboards", manualActivate: false }, { id: "com.glide.phone_number", manualActivate: false },
		{ id: "com.glide.protocol_profile", manualActivate: false }, { id: "com.glide.push", manualActivate: false }, { id: "com.glide.push_retention", manualActivate: false },
		{ id: "com.glide.quota", manualActivate: false }, { id: "com.glide.rest", manualActivate: false }, { id: "com.glide.rest.cors", manualActivate: false },
		{ id: "com.glide.role_management", manualActivate: false }, { id: "com.glide.role_management.inh_count", manualActivate: false },
		{ id: "com.glide.role_management.inh_count.rest_api", manualActivate: false }, { id: "com.glide.scope.design", manualActivate: false },
		{ id: "com.glide.scope.privilege", manualActivate: false }, { id: "com.glide.scoped_analytics_framework", manualActivate: false },
		{ id: "com.glide.script.templates", manualActivate: false }, { id: "com.glide.script.whitelist", manualActivate: false },
		{ id: "com.glide.scripted_rest_services", manualActivate: false }, { id: "com.glide.scripted_rest_services.errors", manualActivate: false },
		{ id: "com.glide.scripted_rest_services.internal", manualActivate: false }, { id: "com.glide.security.dashboard", manualActivate: false },
		{ id: "com.glide.service_creator", manualActivate: false }, { id: "com.glide.service-portal.announcements", manualActivate: false },
		{ id: "com.glide.service-portal.config", manualActivate: false }, { id: "com.glide.service-portal.designer", manualActivate: false },
		{ id: "com.glide.service-portal.esm", manualActivate: false }, { id: "com.glide.service-portal.knowledge-base", manualActivate: false },
		{ id: "com.glide.service-portal.service-catalog", manualActivate: false }, { id: "com.glide.service-portal.service-status", manualActivate: false },
		{ id: "com.glide.service-portal.sqanda", manualActivate: false }, { id: "com.glide.service-portal.survey", manualActivate: false },
		{ id: "com.glide.sessiondebug", manualActivate: false }, { id: "com.glide.sn_tourbuilder", manualActivate: false }, { id: "com.glide.snc_code_editor", manualActivate: false },
		{ id: "com.glide.sorting", manualActivate: false }, { id: "com.glide.source_control", manualActivate: false }, { id: "com.glide.stats", manualActivate: false },
		{ id: "com.glide.stats.api", manualActivate: false }, { id: "com.glide.stats.cache_build", manualActivate: false }, { id: "com.glide.stats.event", manualActivate: false },
		{ id: "com.glide.stats.mutex", manualActivate: false }, { id: "com.glide.stats.query", manualActivate: false }, { id: "com.glide.stats.script", manualActivate: false },
		{ id: "com.glide.stats.transaction", manualActivate: false }, { id: "com.glide.subscription_framework", manualActivate: false },
		{ id: "com.glide.survey_designer", manualActivate: false }, { id: "com.glide.syntax_editor", manualActivate: false }, { id: "com.glide.system_apply_once", manualActivate: false },
		{ id: "com.glide.system_export_set", manualActivate: false }, { id: "com.glide.system_hierarchy_update_set", manualActivate: false },
		{ id: "com.glide.system_import_set", manualActivate: false }, { id: "com.glide.system_update_set", manualActivate: false },
		{ id: "com.glide.system_update_set_picker", manualActivate: false }, { id: "com.glide.system_update_set_preview", manualActivate: false },
		{ id: "com.glide.text_index_attachments", manualActivate: false }, { id: "com.glide.text_search", manualActivate: false }, { id: "com.glide.tiny_url", manualActivate: false },
		{ id: "com.glide.transaction_scope", manualActivate: false }, { id: "com.glide.ui.checklist", manualActivate: false }, { id: "com.glide.ui.doctype", manualActivate: false },
		{ id: "com.glide.ui.hopscotch", manualActivate: false }, { id: "com.glide.ui.list_v3_components", manualActivate: false }, { id: "com.glide.ui.m", manualActivate: false },
		{ id: "com.glide.ui.magellan_navigator", manualActivate: false }, { id: "com.glide.ui.mergetool", manualActivate: false },
		{ id: "com.glide.ui.name_values_editor", manualActivate: false }, { id: "com.glide.ui.ng", manualActivate: false }, { id: "com.glide.ui.ng.amb", manualActivate: false },
		{ id: "com.glide.ui.ng.cc", manualActivate: false }, { id: "com.glide.ui.ng.dc", manualActivate: false }, { id: "com.glide.ui.ng.fd", manualActivate: false },
		{ id: "com.glide.ui.overview_help", manualActivate: false }, { id: "com.glide.ui.personalize_form", manualActivate: false },
		{ id: "com.glide.ui.relationship_layout", manualActivate: false }, { id: "com.glide.ui.scss", manualActivate: false }, { id: "com.glide.ui.scss.bootstrap", manualActivate: false },
		{ id: "com.glide.ui.themes.doctype", manualActivate: false }, { id: "com.glide.ui.ui16", manualActivate: false }, { id: "com.glide.ui.vtb", manualActivate: false },
		{ id: "com.glide.ui.vtb.ah", manualActivate: false }, { id: "com.glide.ui_activity_formatter", manualActivate: false }, { id: "com.glide.upgrade_blame", manualActivate: false },
		{ id: "com.glide.upgrade_metric", manualActivate: false }, { id: "com.glide.user_guide", manualActivate: false }, { id: "com.glide.web_service_application", manualActivate: false },
		{ id: "com.glide.web_service_consumer", manualActivate: false }, { id: "com.glide.web_service_import_sets", manualActivate: false },
		{ id: "com.glide.web_service_provider", manualActivate: false }, { id: "com.glideapp.agent", manualActivate: false }, { id: "com.glideapp.canvas", manualActivate: false },
		{ id: "com.glideapp.dashboards", manualActivate: false }, { id: "com.glideapp.google_maps", manualActivate: false }, { id: "com.glideapp.home.splash_page", manualActivate: false },
		{ id: "com.glideapp.interactive_analysis", manualActivate: false }, { id: "com.glideapp.knowledge2.wiki", manualActivate: false },
		{ id: "com.glideapp.live_feed", manualActivate: false }, { id: "com.glideapp.live_feed_document", manualActivate: false },
		{ id: "com.glideapp.password_reset", manualActivate: false }, { id: "com.glideapp.report.charting_v2", manualActivate: false },
		{ id: "com.glideapp.report.itsm.change.overview", manualActivate: false }, { id: "com.glideapp.report.itsm.incident.overview", manualActivate: false },
		{ id: "com.glideapp.report.itsm.problem.overview", manualActivate: false }, { id: "com.glideapp.report.knowledge.overview", manualActivate: false },
		{ id: "com.glideapp.report_page_hdrftr", manualActivate: false }, { id: "com.glideapp.report_security", manualActivate: false },
		{ id: "com.glideapp.servicecatalog", manualActivate: false }, { id: "com.glideapp.servicecatalog.cms", manualActivate: false },
		{ id: "com.glideapp.servicecatalog.currency", manualActivate: false }, { id: "com.glideapp.servicecatalog.execution_plan", manualActivate: false },
		{ id: "com.glideapp.servicecatalog.item_designer", manualActivate: false }, { id: "com.glideapp.servicecatalog.portal", manualActivate: false },
		{ id: "com.glideapp.servicecatalog.rest.api", manualActivate: false }, { id: "com.glideapp.servicecatalog.scoped.api", manualActivate: false },
		{ id: "com.glideapp.summary_report_engine", manualActivate: false }, { id: "com.glideapp.ui_components", manualActivate: false },
		{ id: "com.glideapp.version", manualActivate: false }, { id: "com.glideapp.workflow", manualActivate: false }, { id: "com.glideapp.workflow.authoring", manualActivate: false },
		{ id: "com.glideapp.workflow_change_management", manualActivate: false }, { id: "com.sn_bm_client", manualActivate: false }, { id: "com.sn_bm_client.spoke", manualActivate: false },
		{ id: "com.sn_bm_common", manualActivate: false }, { id: "com.sn_dd_user_admin", manualActivate: false }, { id: "com.sn_kb_social_qa", manualActivate: false },
		{ id: "com.snc.app_common.service_portal", manualActivate: false }, { id: "com.snc.application.json_service", manualActivate: false }, { id: "com.snc.apps", manualActivate: false },
		{ id: "com.snc.apps_access", manualActivate: false }, { id: "com.snc.apps_complete", manualActivate: false }, { id: "com.snc.apps_creator", manualActivate: false },
		{ id: "com.snc.apps_creator_template", manualActivate: false }, { id: "com.snc.apps_file", manualActivate: false }, { id: "com.snc.apps_hub", manualActivate: false },
		{ id: "com.snc.apps_picker", manualActivate: false }, { id: "com.snc.assessment_core", manualActivate: false }, { id: "com.snc.asset_management", manualActivate: false },
		{ id: "com.snc.asset_myassets", manualActivate: false }, { id: "com.snc.bestpractice.change_risk", manualActivate: false },
		{ id: "com.snc.bestpractice.incident", manualActivate: false }, { id: "com.snc.bestpractice.itil_kpi", manualActivate: false },
		{ id: "com.snc.certification_core", manualActivate: false }, { id: "com.snc.certification_desired_state", manualActivate: false },
		{ id: "com.snc.change.collision", manualActivate: false }, { id: "com.snc.change_management", manualActivate: false },
		{ id: "com.snc.change_management.cab", manualActivate: false }, { id: "com.snc.change_management.standard_change_catalog", manualActivate: false },
		{ id: "com.snc.change_management.state_model", manualActivate: false }, { id: "com.snc.change_request", manualActivate: false },
		{ id: "com.snc.change_request_calendar", manualActivate: false }, { id: "com.snc.cmdb", manualActivate: false }, { id: "com.snc.cmdb.dashboard", manualActivate: false },
		{ id: "com.snc.cmdb.enterprise", manualActivate: false }, { id: "com.snc.cmdb.group", manualActivate: false }, { id: "com.snc.cmdb.group.dashboard", manualActivate: false },
		{ id: "com.snc.cmdb.guided_setup", manualActivate: false }, { id: "com.snc.contextual_search", manualActivate: false },
		{ id: "com.snc.contextual_search.internal", manualActivate: false }, { id: "com.snc.contextual_search.service-portal", manualActivate: false },
		{ id: "com.snc.contract_management", manualActivate: false }, { id: "com.snc.core.automation.connection_credential", manualActivate: false },
		{ id: "com.snc.cost_management", manualActivate: false }, { id: "com.snc.datastructure", manualActivate: false }, { id: "com.snc.db.rotation", manualActivate: false },
		{ id: "com.snc.db.rotation_default_tables", manualActivate: false }, { id: "com.snc.demand_management", manualActivate: false },
		{ id: "com.snc.depreciation", manualActivate: false }, { id: "com.snc.dhtmlx.gantt", manualActivate: false }, { id: "com.snc.dhtmlx.scheduler", manualActivate: false },
		{ id: "com.snc.document_management", manualActivate: false }, { id: "com.snc.expense_line", manualActivate: false }, { id: "com.snc.fiscal_calendar", manualActivate: false },
		{ id: "com.snc.fixed_asset", manualActivate: false }, { id: "com.snc.guided_setup", manualActivate: false }, { id: "com.snc.guided_setup_metadata.itom", manualActivate: false },
		{ id: "com.snc.guided_setup_metadata.itsm", manualActivate: false }, { id: "com.snc.incident", manualActivate: false }, { id: "com.snc.incident.updates", manualActivate: false },
		{ id: "com.snc.incident_notification", manualActivate: false }, { id: "com.snc.incident_resolution_fields", manualActivate: false },
		{ id: "com.snc.integration.multifactor.authentication", manualActivate: false }, { id: "com.snc.ipauthenticator", manualActivate: false },
		{ id: "com.snc.itil_mobile", manualActivate: false }, { id: "com.snc.itsm.spoke", manualActivate: false }, { id: "com.snc.keylines", manualActivate: false },
		{ id: "com.snc.keylines_bsm_map", manualActivate: false }, { id: "com.snc.knowledge3", manualActivate: false }, { id: "com.snc.maintenance_schedules", manualActivate: false },
		{ id: "com.snc.metadata", manualActivate: false }, { id: "com.snc.metadata_tree", manualActivate: false }, { id: "com.snc.model", manualActivate: false },
		{ id: "com.snc.ng_bsm", manualActivate: false }, { id: "com.snc.organization_extension", manualActivate: false }, { id: "com.snc.organization_management", manualActivate: false },
		{ id: "com.snc.pa", manualActivate: false }, { id: "com.snc.pa.administration.console", manualActivate: false }, { id: "com.snc.pa.diagnostics", manualActivate: false },
		{ id: "com.snc.pa.guided_setup", manualActivate: false }, { id: "com.snc.pa.scores_migration", manualActivate: false }, { id: "com.snc.pa.solution.library", manualActivate: false },
		{ id: "com.snc.pa.usage.overview", manualActivate: false }, { id: "com.snc.paas", manualActivate: false }, { id: "com.snc.password_reset", manualActivate: false },
		{ id: "com.snc.pdf_generator", manualActivate: false }, { id: "com.snc.platform.security.oauth", manualActivate: false },
		{ id: "com.snc.platform.security.oauth.legacy", manualActivate: false }, { id: "com.snc.problem", manualActivate: false }, { id: "com.snc.problem_kb", manualActivate: false },
		{ id: "com.snc.problem_task", manualActivate: false }, { id: "com.snc.process_flow_formatter", manualActivate: false }, { id: "com.snc.product_catalog", manualActivate: false },
		{ id: "com.snc.project_management_v3", manualActivate: false }, { id: "com.snc.project_portfolio_suite", manualActivate: false },
		{ id: "com.snc.read_only.role", manualActivate: false }, { id: "com.snc.release_management_v2", manualActivate: false },
		{ id: "com.snc.resource_management", manualActivate: false }, { id: "com.snc.role_delegation", manualActivate: false }, { id: "com.snc.sdlc", manualActivate: false },
		{ id: "com.snc.sdlc.scrum", manualActivate: false }, { id: "com.snc.sdlc.scrum.pp", manualActivate: false }, { id: "com.snc.service.db_views", manualActivate: false },
		{ id: "com.snc.service_portfolio", manualActivate: false }, { id: "com.snc.signaturepad", manualActivate: false }, { id: "com.snc.skills_management", manualActivate: false },
		{ id: "com.snc.sla", manualActivate: false }, { id: "com.snc.sla.guided_tour", manualActivate: false }, { id: "com.snc.sla.timeline", manualActivate: false },
		{ id: "com.snc.system_security", manualActivate: false }, { id: "com.snc.test_mgmt", manualActivate: false }, { id: "com.snc.time_card", manualActivate: false },
		{ id: "com.snc.timeline_visualization", manualActivate: false }, { id: "com.snc.usage_admin.base", manualActivate: false }, { id: "com.snc.usage_admin.snc", manualActivate: false },
		{ id: "com.snc.version", manualActivate: false }, { id: "com.snc.web_service_import_set_tables", manualActivate: false }
    ];
    $scope.sys_properties = [
        { name: "glide.sys.default.tz", type: "timezone", description: "System timezone for all users unless overridden in the user's record", sys_package: "glidesoft",
            prod: "US/Eastern", test: "US/Eastern", dev: "US/Eastern", sb: "US/Eastern" },
        { name: "glide.product.name", type: "string", description: "Browser tab title", sys_package: "apps/system2",
            prod: "ServiceNow Production", test: "ServiceNow Test", dev: "ServiceNow Dev", sb: "ServiceNow Sandbox" },
        { name: "glide.product.description", type: "string", description: "Page header caption", sys_package: "apps/system2",
            prod: "Enterprise Service Tool", test: "Enterprise Service Tool", dev: "Enterprise Service Tool", sb: "Enterprise Service Tool" },
        { name: "css.base.color", type: "color", description: "Banner and list caption background color", sys_package: "apps/system2",
            prod: "#985252", test: "#526498", dev: "#649852", sb: "#645298" },
        { name: "css.banner.description.color", type: "color", description: "Banner text color", sys_package: "glidesoft",
            prod: "#d58181", test: "#8196d5", dev: "#96d581", sb: "#96d581" },
        { name: "css.$navpage-header-bg", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
            prod: "#5b1a1a", test: "#1a2a5b", dev: "#2a5b1a", sb: "#9681d5" },
        { name: "css.$navpage-header-color", type: "color", description: "Header Background Color", sys_package: "com.glide.ui.ui16",
            prod: "#fafad2", test: "#fafad2", dev: "#fafad2", sb: "#fafad2" },
        { name: "css.$navpage-header-divider-color", type: "color", description: "Header divider stripe color", sys_package: "global",
            prod: "#822626", test: "#263d82", dev: "#3d8226", sb: "#3d2682" },
        { name: "css.$navpage-nav-bg", type: "color", description: "Navigation Header/Footer", sys_package: "com.glide.ui.ui16",
            prod: "#5b1a1a", test: "#1a2a5b", dev: "#2a5b1a", sb: "#9681d5" },
        { name: "css.$subnav-background-color", type: "color", description: "Navigation background expanded items", sys_package: "com.glide.ui.ui16",
            prod: "#592222", test: "#223d59", dev: "#2f5922", sb: "#2f2259" },
        { name: "css.$navpage-nav-color-sub", type: "color", description: "Module text color for UI16<br/>Also affects unselected navigation tab icon and favorite icons color.", sys_package: "com.glide.ui.ui16",
            prod: "#d7d7ac", test: "#d7d7ac", dev: "#dde1ee", sb: "#d7d7ac" },
        { name: "css.$navpage-nav-selected-bg", type: "color", description: "Navigation selected tab background color", sys_package: "com.glide.ui.ui16",
            prod: "#7e2a2a", test: "#2a3f7e", dev: "#3f7e2a", sb: "#3f2a7e" },
        { name: "css.$nav-hr-color", type: "color", description: "Navigation separator color", sys_package: "com.glide.ui.ui16",
            prod: "#7e2a2a", test: "#2a3f7e", dev: "#3f7e2a", sb: "#3f2a7e" },
        { name: "css.$navpage-nav-bg-sub", type: "color", description: "Background for navigator and sidebars", sys_package: "com.glide.ui.ui16",
            prod: "#822626", test: "#263d82", dev: "#3d8226", sb: "#3d2682" },
        { name: "css.$navpage-nav-unselected-color", type: "color", description: "Unselected navigation tab icon and favorite icons color", sys_package: "global",
            prod: "#e0a3a3", test: "#a3c2e0", dev: "#b3e0a3", sb: "#b3a3e0" },
        { name: "css.$navpage-nav-selected-color", type: "", description: "Currently selected Navigation tab icon color for UI16", sys_package: "",
            prod: "#afeeee", test: "#f08080", dev: "#f08080", sb: "#f08080" },
        { name: "css.$navpage-nav-border", type: "color", description: "Border color for UI16", sys_package: "com.glide.ui.ui16",
                prod: "#eecdcd", test: "#ced6ee", dev: "#d6eece", sb: "#d6ceee" },
        { name: "css.$nav-highlight-main", type: "color", description: "Navigation highlight background color", sys_package: "com.glide.ui.ui16",
            prod: "#493131", test: "#2e3d4d", dev: "#374931", sb: "#373149" }
    ];
    
    $scope.currentTopLevelCard = "";

    $scope.serviceNow = $scope.$new();
    $scope.serviceNow.backgroundScriptsUrl = "#";
    $scope.serviceNow.userAdministrationUrl = "#";
    $scope.serviceNow.systemPluginsUrl = "#";
    $scope.serviceNow.progressWorkerUrl = "#";
    $scope.serviceNow.systemPropertiesUrl = "#";
    $scope.serviceNow.rootUrl = "";
    $scope.serviceNow.sdlcStage = "";
    $scope.serviceNow.uiConfigScript = "";    
    
    $scope.gitServer = $scope.$new();
    $scope.gitServer.rootUrl = "#";
    $scope.gitServer.repoName = "#";
    $scope.gitServer.browserUrl = "#";
    $scope.gitServer.apiUrl = "";

    $scope.elevateRolesVisible = false;
    $scope.showElevateRoles = function() { $scope.elevateRolesVisible = true; };
    $scope.closeElevateRoles = function() { $scope.elevateRolesVisible = false; };

    $scope.systemTimeZoneVisible = false;
    $scope.showSystemTimeZone = function() { $scope.systemTimeZoneVisible = true; };
    $scope.closeSystemTimeZone = function() { $scope.systemTimeZoneVisible = false; };

    $scope.infoDialog = $scope.$new();
    $scope.infoDialog.visible = false;
    $scope.infoDialog.title = "";
    $scope.infoDialog.message = "";
    $scope.showInfoDialog = function(message, title) {
        var s = Utility.asString(title, true);
        $scope.infoDialog.title = (s.length > 0) ? s : "Notice";
        $scope.infoDialog.message = Utility.asString(message, true);
        $scope.infoDialog.visible = true;
    };
    $scope.infoDialog.close = function() { $scope.infoDialog.visible = false; };

    $scope.warningDialog = $scope.$new();
    $scope.warningDialog.visible = false;
    $scope.warningDialog.title = "";
    $scope.warningDialog.message = "";
    $scope.showWarningDialog = function(message, title) {
        var s = Utility.asString(title, true);
        $scope.warningDialog.title = (s.length > 0) ? s : "Warning";
        $scope.warningDialog.message = Utility.asString(message, true);
        $scope.warningDialog.visible = true;
    };
    $scope.warningDialog.close = function() { $scope.warningDialog.visible = false; };

    var s = ''; localStorage.getItem("currentTopLevelCard");
    $scope.setTopLevelCardVisible((Utility.isNil(s) || s.length == 0) ? "preRequisiteInfo" : s);

    $scope.updateFromSdlcStage = function() {
        if ($scope.serviceNow.sdlcStage.length == 0) {
            $scope.serviceNow.uiConfigScript = "";
            return;
        }
         
        $scope.serviceNow.uiConfigScript = 'var sys_properties = [\n' + $scope.sys_properties.map(function(a) {
            return "\t{ name: " + JSON.stringify(a.name) + ", type: " + JSON.stringify(a.type) + ",\n\t\tvalue: " + JSON.stringify(a[$scope.serviceNow.sdlcStage]) +
                ", description: " + JSON.stringify(a.description) + ", sys_package: " + JSON.stringify(a.sys_package) + " }";
        }).join(",\n") + "\n];\n\nvar errorCount = 0;\nvar updateCount = 0;\nfor (var i = 0; i < sys_properties.length; i++) {\n" +
            "\tvar settingsGr = new GlideRecord('sys_properties');\n\tsettingsGr.addQuery('name', sys_properties[i].name);\n\tsettingsGr.query();\n\tif (settingsGr.next()) {\n" +
            "\t\tvar oldValue = settingsGr.getValue('value');\n\t\tif (oldValue == sys_properties[i].value)\n" +
            "\t\t\tgs.info(\"Property \" + sys_properties[i].name + \" was already set to '\" + sys_properties[i].value + \"'\");\n\t\telse {\n\t\t\ttry {\n" +
            "\t\t\t\tsettingsGr.setValue('value', sys_properties[i].value);\n\t\t\t\tsettingsGr.update();\n" +
            "\t\t\t\tgs.info(\"Changed \" + sys_properties[i].name + \" from '\" + oldValue + \"' to '\" + sys_properties[i].value + \"'\");\n\t\t\t\tupdateCount++;\n" +
            "\t\t\t} catch (e) {\n\t\t\t\terrorCount++;\n" +
            "\t\t\t\tgs.warn(\"Error changing \" + sys_properties[i].name + \" from '\" + oldValue + \"' to '\" + sys_properties[i].value + \"': \" + e);\n\t\t\t}\n\t\t}\n" +
            "\t} else {\n\t\ttry {\n\t\t\tsettingsGr.initialize();\n\t\t\tsettingsGr.setValue('name', sys_properties[i].name);\n" +
            "\t\t\tsettingsGr.setValue('sys_name', sys_properties[i].name);\n\t\t\tsettingsGr.setValue('description', sys_properties[i].description);\n" +
            "\t\t\tsettingsGr.setValue('type', sys_properties[i].type);\n\t\t\tsettingsGr.setValue('ignore_cache', false);\n\t\t\tsettingsGr.setValue('is_private', false);\n" +
            "\t\t\tsettingsGr.setValue('value', sys_properties[i].value);\n\t\t\tvar packageGr = new GlideRecord('sys_package');\n" +
            "\t\t\tpackageGr.addQuery('source', sys_properties[i].sys_package);\n\t\t\tpackageGr.query();\n\t\t\tif (packageGr.next())\n" +
            "\t\t\t\tsettingsGr.setValue('sys_package', packageGr.sys_id);\n\t\t\tsettingsGr.insert();\n" +
            "\t\t\tgs.info(\"Added \" + sys_properties[i].name + \" with the value of '\" + sys_properties[i].value + \"'\");\n\t\t\tupdateCount++;\n\t\t} catch (e) {\n" +
            "\t\t\terrorCount++;\n\t\t\tgs.warn(\"Error adding \" + sys_properties[i].name + \" with the value of '\" + sys_properties[i].value + \"': \" + e);\n\t\t}\n\t}\n}\n\n" +
            "if (errorCount == 0)\n\tgs.info('There were no errors.');\nelse if (errorCount == 1)\n\tgs.warn('1 error has occurred.');\nelse\n" +
            "\tgs.warn(errorCount + ' errors have occurred.');\nif (updateCount > 0)\n\tgs.info(\"You may need to refresh your browser to see the changes.\");\n" +
            "else if (errorCount == 0)\n\tgs.info(\"No changes were required.\");";
    };
    $scope.$watch('serviceNow.sdlcStage', $scope.updateFromSdlcStage);

    $scope.setPluginScripts = function() {
        $scope.serviceNow.bulkActivationScript = "var pluginIds = [\n\t'" +
            ($scope.plugins.filter(function(a) { return a.manualActivate; }).map(function(a) { return a.id; }).join("',\n\t'")) + "'\n];\nvar skipped = [];\nvar results = [];\n" +
                "var stopAfter = new GlideDateTime();\nstopAfter.add(1000 * 300);\nvar gpm = new GlidePluginManager();\nvar stopReason = 'before 5 minutes had elapsed';\n" +
                "var failCount = 0;\nvar activateCount = 0;\nfor (var i = 0; i < pluginIds.length; i++) {\n\tgs.info('*** BEGIN Activation: ' + pluginIds[i] + ' ***');\n" +
                "\tvar pluginGlideRecord = new GlideRecord(\"v_plugin\");\n\tpluginGlideRecord.addQuery(\"id\", pluginIds[i]);\n\tpluginGlideRecord.query();\n" +
                "\tif (pluginGlideRecord.next()) {\n\t\tvar displayText = pluginGlideRecord.getValue('name') + ' (' + pluginIds[i] + ')';\n\t\tif (gpm.isActive(pluginIds[i])) {\n" +
                "\t\t\tresults.push({ success: true, message: 'Plugin ' + displayText + ' was already activated.' });\n\t\t\tgs.info('*** END Activation: ' + pluginIds[i] + ' ***');\n" +
                "\t\t\tcontinue;\n\t\t}\n\t\tvar currentDateTime = new GlideDateTime();\n\t\tif (stopAfter.before(currentDateTime))\n\t\t\tskipped.push(displayText);\n\t\telse {\n" +
                "\t\t\tvar worker = new GlidePluginManagerWorker();\n\t\t\tworker.setPluginId(pluginIds[i]);\n\t\t\tworker.setIncludeDemoData(false);\n" +
                "\t\t\tworker.setProgressName('Activate ' + displayText);\n\t\t\tworker.setBackground(false);\n\t\t\tworker.start();\n\t\t\tvar progressId = worker.getProgressID();\n" +
                "\t\t\tvar progressGlideRecord = new GlideRecord(\"sys_progress_worker\");\n\t\t\tprogressGlideRecord.addQuery(\"sys_id\", progressId);\n" +
                "\t\t\tprogressGlideRecord.query();\n\t\t\tif (progressGlideRecord.next()) {\n\t\t\t\tvar completion_code = progressGlideRecord.getValue('state');\n" +
                "\t\t\t\tgs.info(\"state is \" + completion_code);\n\t\t\t\tif (completion_code == 'complete' || completion_code == 'cancelled') {\n" +
                "\t\t\t\t\tvar c = progressGlideRecord.getValue('state_code');\n\t\t\t\t\tif (!gs.nil(c) && c.length > 0)\n\t\t\t\t\t\tcompletion_code = c;\n\t\t\t\t}\n" +
                "\t\t\t\tvar r = '';\n\t\t\t\tvar success = false;\n\t\t\t\tswitch (completion_code) {\n\t\t\t\t\tcase 'success':\n\t\t\t\t\t\tsuccess = true;\n" +
                "\t\t\t\t\t\tr = 'Activated plugin';\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'complete':\n\t\t\t\t\t\tsuccess = true;\n\t\t\t\t\t\tr = 'Activation completed for plugin';\n" +
                "\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'cancelled':\n\t\t\t\t\t\tr = 'Activated cancelled for';\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'error':\n" +
                "\t\t\t\t\t\tr = 'Error activating plugin';\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tdefault:\n" +
                "\t\t\t\t\t\tr = 'Unexpected result { Code: ' + completion_code + '; ProgressID: ' + progressId + '} while activating plugin';\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n" +
                "\t\t\t\tvar msg = progressGlideRecord.getValue('message');\n\t\t\t\tmsg = (gs.nil(msg)) ? \"\" : ((typeof(msg) === 'string') ? msg.trim() : msg.toString().trim());\n" +
                "\t\t\t\tif (success)\n\t\t\t\t\tactivateCount++;\n\t\t\t\telse {\n\t\t\t\t\tfailCount++;\n\t\t\t\t\tvar e = progressGlideRecord.getValue('error_message');\n" +
                "\t\t\t\t\te = (gs.nil(e)) ? \"\" : ((typeof(e) === 'string') ? e.trim() : e.toString().trim());\n\t\t\t\t\tif (msg.length == 0)\n\t\t\t\t\t\tmsg = e;\n" +
                "\t\t\t\t\telse if (e.length > 0 && e != msg)\n\t\t\t\t\t\tmsg += ' (' + e + ')';\n\t\t\t\t}\n" +
                "\t\t\t\tresults.push({ success: success, message: r + ' ' + displayText + ': ' + msg });\n\t\t\t} else {\n\t\t\t\tfailCount++;\n" +
                "\t\t\t\tresults.push({ success: false, message: 'Unable to find progress record ' + progressId + ' for ' + displayText });\n\t\t\t}\n\t\t}\n\t} else\n" +
                "\t\tresults.push({ success: false, message: 'Plugin with ID of \"' + pluginIds[i] + '\" not found.' });\n\tgs.info('*** END Activation: ' + pluginIds[i] + ' ***');\n" +
                "}\n\nif (failCount == 0)\n\tgs.info(activateCount + ' Activated, 0 Failed.');\nelse\n\tgs.warn(activateCount + ' Activated, ' + failCount + ' Failed.');\n\n" +
                "for (var i = 0; i < results.length; i++) {\n\tif (results[i].success)\n\t\tgs.info(results[i].message);\n}\nif (skipped.length == 0) {\n\tif (failCount == 0)\n" +
                "\t\tgs.info('All plugin activations completed and/or verified.');\n} else {\n\tvar msg = 'The following plugins were not activated ' + stopReason + \":\";\n" +
                "\tfor (var i = 0; i < skipped.length; i++)\n\t\tmsg += \"\\n\t\" + skipped[i] + \"\\n\";\n\tif (failCount == 0)\n\t\tmsg += \"\\nRe-run this script to continue.\";\n" +
                "\tgs.info(msg);\n}\n\nfor (var i = 0; i < results.length; i++) {\n\tif (!results[i].success)\n\t\tgs.warn(results[i].message);\n}";
                var scriptText = "";
                var l = 0;
                var currentLine = "var expectedPlugins = [";
                $scope.plugins.forEach(function(a, i) {
                    var s = "'" + a.id + "'";
                    if (i > 0)
                        currentLine += ",";
                    if ((currentLine.length + s.length + ((l > 0) ? 5 : 1)) > 180) {
                        scriptText += ("\n" + currentLine);
                        currentLine = s;
                    } else
                        currentLine += " " + s;
                });
                $scope.serviceNow.validatePluginsScript = scriptText + ("\n" + currentLine + "];\nvar gpm = new GlidePluginManager();\nvar failCount = 0;\n" +
                    "for (var i = 0; i < expectedPlugins.length; i++) {\n\tvar pluginGlideRecord = new GlideRecord(\"v_plugin\");\n" +
                    "\tpluginGlideRecord.addQuery(\"id\", expectedPlugins[i]);\n\tpluginGlideRecord.query();\n\tif (pluginGlideRecord.next()) {\n" +
                    "\t\tif (!gpm.isActive(expectedPlugins[i])) {\n\t\t\tfailCount++;\n" +
                    "\t\t\tgs.warn('Plugin ' + pluginGlideRecord.getValue('name') + ' (' + expectedPlugins[i] + ') was not activated (Status = ' + pluginGlideRecord.getValue('active') + ').');\n" +
                    "\t\t}\n\t} else {\n\t\tfailCount++;\n\t\tgs.warn('Plugin with id of ' + expectedPlugins[i] + ' was not found.');\n\t}\n}\nif (failCount == 0)\n" +
                    "\tgs.info(\"All \" +  expectedPlugins.length + \" expected plugins were found to have been activated.\");");
    };
    $scope.updateFromSdlcStage();
    $scope.setPluginScripts();
})
.controller("preRequisiteInfoController", function($scope) {
    var validationResults = [];
    setupTopLevelCardChange($scope, "preRequisiteInfo");
    $scope.setValidationResult = function(name, isValid) {
        isValid = isValid == true;
        var matching = validationResults.filter(function(r) { return r.name === name; });
        if (matching.length == 0) {
            validationResults.push({ name: name, isValid: isValid });
            if (isValid)
                return;
        } else {
            if (matching[0].isValid == isValid)
                return;
            isValid = validationResults.filter(function(r) { return !r.isValid; }).length == 0;
        }
        if (isValid == $scope.preRequisitesAreInvalid)
            $scope.preRequisitesAreInvalid = !isValid;
    };
})
.controller("initialConfigurationController", function($scope) {
    var notifyCardChange = [];
    $scope.currentInitialConfigurationCard = "";
    $scope.addNotifyInitialConfigurationCardSelect = function(f) {
        if (typeof(f) === "function")
            notifyCardChange.push(f);
    };
    $scope.setInitialConfigurationCardVisible = function(n) {
        if (n === $scope.currentInitialConfigurationCard)
            return;
        localStorage.setItem("currentInitialConfigurationCard", n);
        $scope.currentInitialConfigurationCard = n;
        notifyCardChange.filter(function(f) { f(n); });
    };
    setupTopLevelCardChange($scope, "initialConfiguration");

    var s = localStorage.getItem("currentInitialConfigurationCard");
    $scope.setInitialConfigurationCardVisible((Utility.isNil(s) || s.length == 0) ? "initializationScript" : s);
})
.controller("pluginActivationController", function($scope) {
    setupTopLevelCardChange($scope, "pluginActivation");
})
.controller("importCustomApplicationController", function($scope) {
    setupTopLevelCardChange($scope, "importCustomApplication");
})
.controller("applyInitialUpdateSetsController", function($scope) {
    setupTopLevelCardChange($scope, "applyInitialUpdateSets");
})
.controller("serviceNowInputController", function($scope) {
    function onUrlChanged() {
        var s = $scope.urlString.trim();
        if (s.length == 0)
            $scope.urlErrorMessage = "URL cannot be empty.";
        else {
            var parsedUrl = Utility.parseUrl(s);
            if (Utility.isNil(parsedUrl.baseUrl))
                $scope.errorMessage = "Invalid URL (URL must include scheme and authority)";
            else {
                $scope.urlErrorMessage = "";
                $scope.urlHasError = false;
                s = parsedUrl.baseUrl + parsedUrl.pathAndQuery;
                if (parsedUrl.baseUrl.length < s.length)
                    $scope.showInfoDialog("Ignoring extraneous URL text (" + s.substr(parsedUrl.baseUrl.length) + ")");
                $scope.serviceNow.backgroundScriptsUrl = parsedUrl.baseUrl + "/nav_to.do?uri=%2Fsys.scripts.do";
                $scope.serviceNow.userAdministrationUrl = parsedUrl.baseUrl + "/nav_to.do?uri=%2Fsys_user_list.do";
                $scope.serviceNow.systemPluginsUrl = parsedUrl.baseUrl + "/nav_to.do?uri=%2Fv_plugin_list.do";
                $scope.serviceNow.progressWorkerUrl = parsedUrl.baseUrl + "/nav_to.do?uri=%2Fsys_progress_worker_list.do";
                $scope.serviceNow.systemPropertiesUrl = parsedUrl.baseUrl + "/nav_to.do?uri=%2F$system_properties_ui.do%3Fsysparm_title%3DSystem%2520Configuration%26sysparm_category%3DSystem%2520Configuration";
                if (!Utility.isNil(parsedUrl.path) && parsedUrl.path.length > 0) {
                    s = parsedUrl.path;
                    if (!Utility.isNil(parsedUrl.query))
                        s += ("?" + parsedUrl.query);
                    if (!Utility.isNil(parsedUrl.fragment))
                        s += ("#" + parsedUrl.fragment);
                    $scope.showInfoDialog("Ignoring extraneous URL text (" + s + ")");
                } else if (!Utility.isNil(parsedUrl.query)) {
                    s = "?" + parsedUrl.query;
                    if (!Utility.isNil(parsedUrl.fragment))
                        s += ("#" + parsedUrl.fragment);
                    $scope.showInfoDialog("Ignoring extraneous URL text (" + s + ")");
                } else if (!Utility.isNil(parsedUrl.fragment))
                    $scope.showInfoDialog("Ignoring extraneous URL text (#" + parsedUrl.fragment + ")");
                if ($scope.serviceNow.rootUrl !== parsedUrl.baseUrl)
                    $scope.serviceNow.rootUrl = parsedUrl.baseUrl;
                localStorage.setItem("serviceNowUrl", parsedUrl.baseUrl);
                $scope.setValidationResult("serviceNowUrl", true);
                return;
            }
            localStorage.setItem("serviceNowUrl", s);
        }
        $scope.urlHasError = true;
        $scope.setValidationResult("serviceNowUrl", false);
    }
    function onSdlcStageChanged() {
        var s = $scope.sdlcStageSelection.trim();
        if (s.length == 0) {
            $scope.sdlcStageErrorMessage = "SDLC stage not selected.";
            $scope.sdlcStageHasError = true;
            $scope.setValidationResult("sdlcStage", false);
        } else {
            $scope.sdlcStageErrorMessage = "";
            $scope.sdlcStageHasError = false;
            $scope.serviceNow.sdlcStage = s;
            localStorage.setItem("sdlcStageSelection", s);
            $scope.setValidationResult("sdlcStage", true);
        }
        $scope.updateFromSdlcStage();
    }
    $scope.setValidationResult("serviceNowUrl", false);
    $scope.setValidationResult("sdlcStage", false);
    var s = localStorage.getItem("serviceNowUrl");
    $scope.urlString = (Utility.isNil(s) || s.length == 0) ? defaultSettings.snServerUrl : s;
    s = localStorage.getItem("sdlcStageSelection");
    $scope.sdlcStageSelection = (Utility.isNil(s)) ? "" : s;
    $scope.$watch('urlString', onUrlChanged);
    $scope.$watch('sdlcStageSelection', onSdlcStageChanged);
    onUrlChanged();
    onSdlcStageChanged();
})
.controller("sourceControlIntegrationInputController", function($scope) {
    function onUrlChanged() {
        var s = $scope.urlString.trim();
        if (s.length == 0)
            $scope.errorMessage = "URL cannot be empty.";
        else {
            var parsedUrl = Utility.parseUrl(s);
            if (Utility.isNil(parsedUrl.baseUrl))
                $scope.errorMessage = "Invalid URL (URL must include scheme and authority)";
            else if (Utility.isNil(parsedUrl.baseName) || parsedUrl.baseName.length == 0)
                $scope.errorMessage = "URL must include the git repository";
            else {
                $scope.urlErrorMessage = "";
                $scope.urlHasError = false;
                $scope.gitServer.rootUrl = parsedUrl.baseUrl;
                $scope.gitServer.browserUrl = (Utility.isNil(parsedUrl.dir) || parsedUrl.dir.length == 0) ? parsedUrl.baseUrl : parsedUrl.baseUrl + parsedUrl.dir;
                var url = $scope.gitServer.browserUrl + "/" + parsedUrl.leaf;
                s = parsedUrl.baseUrl + parsedUrl.pathAndQuery;
                if (url.length < s.length)
                    $scope.showInfoDialog("Ignoring extraneous URL text (" + s.substr(url.length) + ")");
                if (Utility.isNil(parsedUrl.ext) || parsedUrl.ext.toLowerCase() != "git") {
                    $scope.gitServer.repoName = parsedUrl.leaf;
                    url += ".git";
                } else
                    $scope.gitServer.repoName = parsedUrl.baseName;
                
                if ($scope.gitServer.apiUrl !== url)
                    $scope.gitServer.apiUrl = url;
                localStorage.setItem("gitServerUrl", $scope.gitServer.apiUrl);
                $scope.setValidationResult("gitServerUrl", true);
                return;
            }
            localStorage.setItem("gitServerUrl", s);
        }
        $scope.urlHasError = true;
        $scope.setValidationResult("gitServerUrl", false);
    }
    $scope.setValidationResult("gitServerUrl", false);
    var s = localStorage.getItem("gitServerUrl");
    $scope.urlString = (Utility.isNil(s) || s.length == 0) ? defaultSettings.gitServerUrl : s;
    $scope.$watch('urlString', onUrlChanged);
    onUrlChanged();
})
.controller("initializationScriptController", function($scope) {
    setupInitialConfigurationCardChange($scope, "initializationScript");
})
.controller("createPersonalAdminAcctController", function($scope) {
    setupInitialConfigurationCardChange($scope, "createPersonalAdminAcct");
});