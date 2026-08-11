// ============================================================
// GUIDED CASE TRIAGE
// Browser-local case intake and copy-ready outputs. No API calls.
// ============================================================

(function () {
  'use strict';

  var context = { appId: null, issueId: null };
  var updateTimer = null;

  function el(id) {
    return document.getElementById(id);
  }

  function getApp(id) {
    return (window.ESSENTIAL_APPS || []).find(function (item) { return item.id === id; }) || null;
  }

  function getIssue(id) {
    return (window.ESSENTIAL_ISSUES || []).find(function (item) { return item.id === id; }) || null;
  }

  function getAppResource(id) {
    var resources = window.ESSENTIAL_SUPPORT_RESOURCES || {};
    return ((resources.apps || {})[id]) || {};
  }

  function getChecklist(id) {
    return ((window.ESSENTIAL_CHECKLISTS || {})[id]) || [];
  }

  function getRootCauseLabel(id) {
    var match = (window.ESSENTIAL_ROOT_CAUSES || []).find(function (item) { return item.id === id; });
    return match ? match.label : (id || 'Not classified');
  }

  function getValue(id) {
    var input = el(id);
    return input ? input.value.trim() : '';
  }

  function lines(value) {
    return (value || '').split(/\n+/).map(function (item) { return item.trim(); }).filter(Boolean);
  }

  function bullets(items, emptyText) {
    var values = (items || []).filter(Boolean);
    if (!values.length) return '- ' + (emptyText || 'None recorded');
    return values.map(function (item) { return '- ' + item; }).join('\n');
  }

  function numbered(items, emptyText) {
    var values = (items || []).filter(Boolean);
    if (!values.length) return '1. ' + (emptyText || 'Continue with the normal support checklist.');
    return values.map(function (item, index) { return (index + 1) + '. ' + item; }).join('\n');
  }

  function copyText(text, button) {
    if (!text) return;
    var finish = function () {
      if (!button) return;
      var original = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(function () {
        button.textContent = original;
        button.classList.remove('copied');
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(finish).catch(function () {
        legacyCopy(text);
        finish();
      });
      return;
    }
    legacyCopy(text);
    finish();
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
  }

  function rootCauseForIssue(issue) {
    if (!issue) return 'configuration';
    if (issue.rootCause) return issue.rootCause;
    var map = {
      setup: 'configuration',
      theme: 'theme-conflict',
      conflict: 'theme-conflict',
      'shopify-limit': 'shopify-limitation',
      'needs-dev': 'app-bug',
      'needs-access': 'configuration'
    };
    if (issue.id === 'feature-request') return 'feature-request';
    return map[issue.status] || 'configuration';
  }

  function caseStatusForIssue(issue) {
    if (!issue) return 'Needs merchant information';
    if (issue.id === 'feature-request') return 'Feature request logged';
    var map = {
      setup: 'Configuration guidance',
      theme: 'Needs access',
      conflict: 'Engineering investigation',
      'shopify-limit': 'Known limitation',
      'needs-dev': 'Engineering investigation',
      'needs-access': 'Needs access'
    };
    return map[issue.status] || 'Needs merchant information';
  }

  function getCaseData() {
    var app = getApp(context.appId);
    var issue = getIssue(context.issueId);
    return {
      app: app,
      issue: issue,
      agentName: getValue('case-agent-name') || 'Support team',
      store: getValue('case-store'),
      merchantName: getValue('case-merchant-name'),
      merchantEmail: getValue('case-merchant-email'),
      expected: getValue('case-expected'),
      actual: getValue('case-actual'),
      affected: getValue('case-affected'),
      browserDevice: getValue('case-browser-device'),
      themeApps: getValue('case-theme-apps'),
      accessStatus: getValue('case-access-status') || 'Unknown',
      rootCause: getValue('case-root-cause') || rootCauseForIssue(issue),
      severity: getValue('case-severity') || 'Medium',
      confidence: getValue('case-confidence') || 'Medium',
      caseStatus: getValue('case-status') || caseStatusForIssue(issue),
      troubleshooting: lines(getValue('case-troubleshooting')),
      suppliedEvidence: lines(getValue('case-evidence'))
    };
  }

  function getMissingEvidence(data) {
    var missing = [];
    if (!data.affected) missing.push('Affected URL, product, order, campaign, or customer identifier');
    if (!data.actual) missing.push('Exact actual behavior and a clear reproduction description');
    if (!data.browserDevice) missing.push('Browser and device used for testing');
    if (!data.themeApps && data.rootCause === 'theme-conflict') missing.push('Theme name and related third-party apps');
    if (!data.suppliedEvidence.length) missing.push('Screenshots or a full-screen recording');
    (data.issue && data.issue.evidenceNeeded ? data.issue.evidenceNeeded : []).forEach(function (item) {
      if (!missing.includes(item)) missing.push(item);
    });
    return missing;
  }

  function buildSummary(data) {
    return [
      '=== TICKET SUMMARY ===',
      'Store: ' + (data.store || 'Not provided'),
      'Merchant: ' + (data.merchantName || 'Not provided') + (data.merchantEmail ? ' <' + data.merchantEmail + '>' : ''),
      'App: ' + (data.app ? data.app.name : 'Not selected'),
      'Issue: ' + (data.issue ? data.issue.label : 'Not selected'),
      'Expected behavior: ' + (data.expected || 'Not provided'),
      'Actual behavior: ' + (data.actual || 'Not provided'),
      'Affected reference: ' + (data.affected || 'Not provided'),
      'Browser/device: ' + (data.browserDevice || 'Not provided'),
      'Theme/related apps: ' + (data.themeApps || 'Not provided'),
      'Collaborator access: ' + data.accessStatus,
      'Likely category: ' + getRootCauseLabel(data.rootCause),
      'Severity: ' + data.severity,
      'Confidence: ' + data.confidence,
      'Case status: ' + data.caseStatus,
      '',
      'Troubleshooting completed:',
      bullets(data.troubleshooting),
      '',
      'Evidence received:',
      bullets(data.suppliedEvidence)
    ].join('\n');
  }

  function buildDiagnosis(data) {
    var issue = data.issue;
    var checks = issue ? getChecklist(issue.checklistId) : [];
    var missing = getMissingEvidence(data);
    return [
      '=== DIAGNOSIS & NEXT CHECKS ===',
      'Likely category: ' + getRootCauseLabel(data.rootCause),
      'Confidence: ' + data.confidence,
      '',
      'Likely causes:',
      bullets(issue ? issue.causes : [], 'Select an issue to load likely causes.'),
      '',
      'Checks to perform:',
      numbered(checks, 'Select an issue to load its investigation checklist.'),
      '',
      'Evidence still needed:',
      bullets(missing, 'No obvious evidence gaps.'),
      '',
      'Recommended fixes:',
      bullets(issue ? issue.fixes : [], 'Complete the investigation before recommending a fix.'),
      '',
      'Escalation threshold:',
      issue && issue.escalationThreshold
        ? issue.escalationThreshold
        : 'Escalate only after configuration is confirmed, the issue is reproducible, and the relevant evidence is attached.'
    ].join('\n');
  }

  function buildMerchantResponse(data) {
    var name = data.merchantName || 'there';
    var appName = data.app ? data.app.name : 'the app';
    var issueName = data.issue ? data.issue.label.toLowerCase() : 'the reported issue';
    var missing = getMissingEvidence(data).slice(0, 4);
    var fixes = data.issue && data.issue.fixes ? data.issue.fixes.slice(0, 3) : [];

    if (data.rootCause === 'feature-request') {
      return [
        'Hi ' + name + ',',
        '',
        'Thank you for sharing how you would like to use ' + appName + '.',
        '',
        'The requested functionality — ' + (data.expected || issueName) + ' — is not currently available in the way described. I have documented your use case for our product team and checked it against our existing feature requests.',
        '',
        'While I cannot promise a delivery date, your example helps the team understand the impact and evaluate demand. If a supported workaround applies, I will be happy to help you set it up.',
        '',
        'Best regards,',
        data.agentName,
        'Essential Apps Support'
      ].join('\n');
    }

    if (data.rootCause === 'shopify-limitation' || data.rootCause === 'product-limitation') {
      return [
        'Hi ' + name + ',',
        '',
        'Thank you for the details. I understand that you expected ' + (data.expected || issueName) + ', but you are currently seeing ' + (data.actual || 'different behavior') + '.',
        '',
        'Based on the current information, this appears to be ' + getRootCauseLabel(data.rootCause).toLowerCase() + '. This is not caused by a setting that can be corrected directly in the storefront.',
        '',
        fixes.length ? 'The closest supported options are:\n' + numbered(fixes) : 'I will confirm the nearest supported workflow for your setup.',
        '',
        'We will not promise a release timeline, but I can document the use case if the missing behavior should be considered as a feature request.',
        '',
        'Best regards,',
        data.agentName,
        'Essential Apps Support'
      ].join('\n');
    }

    return [
      'Hi ' + name + ',',
      '',
      'Thank you for the additional information. I understand that you expected ' + (data.expected || issueName) + ', but you are currently seeing ' + (data.actual || 'different behavior') + '.',
      '',
      'Based on the information available, this most likely relates to ' + getRootCauseLabel(data.rootCause).toLowerCase() + '.',
      '',
      fixes.length ? 'Please try/check the following:\n' + numbered(fixes) : 'I am reviewing the configuration and the affected storefront behavior.',
      '',
      missing.length ? 'If the issue continues, please send:\n' + bullets(missing) : 'If the issue continues, please send a full-screen recording showing the complete reproduction.',
      '',
      'Once we have those details, we can confirm whether this can be resolved through configuration or needs development review.',
      '',
      'Best regards,',
      data.agentName,
      'Essential Apps Support'
    ].join('\n');
  }

  function buildEscalation(data) {
    var issue = data.issue;
    return [
      '=== ENGINEERING ESCALATION ===',
      'Store: ' + (data.store || 'Not provided'),
      'App: ' + (data.app ? data.app.name : 'Not selected'),
      '',
      'Issue:',
      issue ? issue.label : 'Not selected',
      '',
      'Expected behavior:',
      data.expected || 'Not provided',
      '',
      'Actual behavior:',
      data.actual || 'Not provided',
      '',
      'Affected URL / Product / Order / Customer:',
      data.affected || 'Not provided',
      '',
      'Browsers and devices tested:',
      data.browserDevice || 'Not provided',
      '',
      'Troubleshooting completed:',
      bullets(data.troubleshooting),
      '',
      'Theme and third-party apps:',
      data.themeApps || 'Not provided',
      '',
      'Screenshots / recordings:',
      bullets(data.suppliedEvidence),
      '',
      'Collaborator access:',
      data.accessStatus,
      '',
      'Classification:',
      getRootCauseLabel(data.rootCause) + ' / ' + data.severity + ' severity / ' + data.confidence + ' confidence',
      '',
      'Request:',
      issue && issue.escalationThreshold
        ? 'Investigate after confirming this threshold: ' + issue.escalationThreshold
        : 'Confirm the cause and advise the exact fix or limitation.'
    ].join('\n');
  }

  function buildOutputs() {
    var data = getCaseData();
    return {
      summary: buildSummary(data),
      diagnosis: buildDiagnosis(data),
      merchant: buildMerchantResponse(data),
      escalation: buildEscalation(data)
    };
  }

  function getPackageText() {
    var output = buildOutputs();
    return [output.summary, output.diagnosis, output.merchant, output.escalation].join('\n\n');
  }

  function renderOutputs() {
    var output = buildOutputs();
    if (el('case-summary-output')) el('case-summary-output').textContent = output.summary;
    if (el('case-diagnosis-output')) el('case-diagnosis-output').textContent = output.diagnosis;
    if (el('case-merchant-output')) el('case-merchant-output').textContent = output.merchant;
    if (el('case-escalation-output')) el('case-escalation-output').textContent = output.escalation;
  }

  function scheduleRender() {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(renderOutputs, 120);
  }

  function renderSelectedContext() {
    var container = el('case-selected-context');
    if (!container) return;
    var app = getApp(context.appId);
    var issue = getIssue(context.issueId);
    var resource = getAppResource(context.appId);

    container.textContent = app
      ? app.name + (issue ? ' · ' + issue.label : ' · Select an issue for guided recommendations.')
      : 'Select an app and issue to activate guided recommendations.';

    var links = [];
    if (resource.helpCenterUrl) links.push(['Help Center', resource.helpCenterUrl]);
    if (issue && issue.sourceUrl) links.push([issue.sourceTitle || 'Source article', issue.sourceUrl]);
    links.forEach(function (item) {
      var link = document.createElement('a');
      link.href = item[1];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item[0];
      container.appendChild(link);
    });
  }

  function applyIssueSuggestions() {
    var issue = getIssue(context.issueId);
    var rootSelect = el('case-root-cause');
    var statusSelect = el('case-status');
    if (rootSelect) rootSelect.value = rootCauseForIssue(issue);
    if (statusSelect) statusSelect.value = caseStatusForIssue(issue);
    renderSelectedContext();
    renderOutputs();
  }

  function populateSelects() {
    var rootSelect = el('case-root-cause');
    var statusSelect = el('case-status');
    if (rootSelect) {
      rootSelect.innerHTML = (window.ESSENTIAL_ROOT_CAUSES || []).map(function (item) {
        return '<option value="' + item.id + '">' + item.label + '</option>';
      }).join('');
    }
    if (statusSelect) {
      statusSelect.innerHTML = (window.ESSENTIAL_CASE_STATUSES || []).map(function (item) {
        return '<option value="' + item + '">' + item + '</option>';
      }).join('');
    }
  }

  function resetForm() {
    var fields = document.querySelectorAll('#case-triage .case-field');
    fields.forEach(function (field) {
      if (field.id === 'case-agent-name') field.value = 'Wendyle';
      else if (field.id === 'case-access-status') field.value = 'Unknown';
      else if (field.id === 'case-severity' || field.id === 'case-confidence') field.value = 'Medium';
      else if (field.tagName === 'SELECT') field.selectedIndex = 0;
      else field.value = '';
    });
    applyIssueSuggestions();
  }

  function init() {
    if (!el('case-triage')) return;
    populateSelects();

    document.querySelectorAll('#case-triage .case-field').forEach(function (field) {
      field.addEventListener('input', scheduleRender);
      field.addEventListener('change', renderOutputs);
    });

    document.querySelectorAll('[data-copy-case-target]').forEach(function (button) {
      button.addEventListener('click', function () {
        var target = el(button.getAttribute('data-copy-case-target'));
        copyText(target ? target.textContent : '', button);
      });
    });

    var generateButton = el('generate-case-package');
    if (generateButton) generateButton.addEventListener('click', renderOutputs);

    var copyButton = el('copy-case-package');
    if (copyButton) copyButton.addEventListener('click', function () {
      copyText(getPackageText(), copyButton);
    });

    var resetButton = el('reset-case-triage');
    if (resetButton) resetButton.addEventListener('click', resetForm);

    document.addEventListener('essential:selection-changed', function (event) {
      context.appId = event.detail ? event.detail.appId : null;
      context.issueId = event.detail ? event.detail.issueId : null;
      applyIssueSuggestions();
    });

    if (window.ESSENTIAL_DASHBOARD_SELECTION) {
      context.appId = window.ESSENTIAL_DASHBOARD_SELECTION.appId || null;
      context.issueId = window.ESSENTIAL_DASHBOARD_SELECTION.issueId || null;
    }

    applyIssueSuggestions();
    window.ESSENTIAL_CASE_TRIAGE = {
      getPackageText: getPackageText,
      refresh: renderOutputs
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
