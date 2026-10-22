/**
 * Creates the JSEI trainee intake Google Form and its response Sheet.
 *
 * How to use (see docs/TRAINEES.md for the full walkthrough):
 *   1. Go to https://script.google.com and create a new project.
 *   2. Replace the contents of Code.gs with this file and click Save.
 *   3. Choose createTraineeForm in the function menu and click Run
 *      (approve the permissions prompt the first time).
 *   4. Open the form edit link from the log and add the Headshot question by hand
 *      (Apps Script cannot create file-upload questions).
 *   5. Then run finishSetup. It adds the Approved checkbox column, creates the
 *      "Published" tab that the website reads, and installs two triggers:
 *        - when a trainee submits OR edits a response, its Approved box is cleared,
 *          so every change waits for your review;
 *        - when you tick Approved, that row is copied to "Published" (replacing the
 *          person's previous version); untick it to take the profile down.
 *      Because the website reads only "Published", a trainee's pending edit never
 *      replaces their live profile until you approve it.
 *
 * Question titles must match scripts/trainees/fields.mjs, and the Lab choices must
 * match app/data/labs.js. To refresh the Lab list after labs change, run
 *   npm run trainees:lab-choices
 * and paste the output over LAB_CHOICES below, then run updateLabChoices.
 *
 * Undergraduates (added 2026-10-22): choosing "Undergraduate Student" as Role
 * sends the person to a short section with a required "Expected graduation date",
 * which becomes their end date so their profile is removed after graduation.
 * Everyone else skips that section. To add this to a form created before then,
 * paste this file into the existing Apps Script project and run
 * addUndergraduateSection once.
 */

const FORM_TITLE = 'Jules Stein Eye Institute: Trainee Profile';

const LAB_CHOICES = [
    "Aldave Lab (Anthony Aldave)",
    "Au Lab (Adrian Au)",
    "Barzelay-Wollman Lab (Aya Barzelay-Wollman)",
    "Bittner Lab (Ava Bittner)",
    "Brecha Lab (Nicholas Brecha)",
    "Coleman Lab (Anne Coleman)",
    "Demer Lab (Joseph Demer)",
    "Deng Lab (Sophie Deng)",
    "Fain Lab (Gordon Fain)",
    "Field Lab (Greg D. Field)",
    "Gilhooley Lab (Michael J Gilhooley)",
    "Glasgow Lab (Ben Glasgow)",
    "Gorin Lab (Michael Gorin)",
    "Huk Lab (Alex Huk)",
    "Nouri-Mahdavi Lab (Kouros Nouri-Mahdavi)",
    "Peng Lab (Yi-Rong Peng)",
    "Piri Lab (Natik Piri)",
    "Radu Lab (Roxana A. Radu)",
    "Sampath Lab (Alapakkam Sampath)",
    "Sun Lab (Hui Sun)",
    "Travis Lab (Gabriel Travis)",
    "Tseng Lab (Victoria Tseng)",
    "Tsui Lab (Edmund Tsui)",
    "Tsui Lab (Irena Tsui)",
    "Williams Lab (David Williams)",
    "Yang Lab (Xian-Jie Yang)",
    "Zheng Lab (Jie J. Zheng)",
    "Zylberberg Lab (Joel Zylberberg)",
];

const ROLE_CHOICES = [
    "Project Scientist",
    "Postdoctoral Scholar / Fellow",
    "Graduate Student",
    "Medical Student",
    "Staff Research Associate / Research Technician",
    "Undergraduate Student",
];

const UNDERGRAD_CHOICE = "Undergraduate Student";
const UNDERGRAD_SECTION = "Undergraduate students";
const PROFILE_SECTION = "Your profile";
const END_DATE_HELP =
  'Optional. Your profile is hidden automatically after this date. You can update it later. ' +
  'Undergraduates: leave blank, your graduation date is used.';

// Adds the undergraduate section and the section that follows it, then points
// the Role choices at them: undergraduates go to the graduation-date section,
// everyone else skips straight to the profile section.
function addUndergradBranch_(form, roleItem) {
  const ugrad = form
    .addPageBreakItem()
    .setTitle(UNDERGRAD_SECTION)
    .setHelpText('Undergraduate profiles are removed automatically after graduation.');
  form
    .addDateItem()
    .setTitle("Expected graduation date")
    .setHelpText('Required. Your profile is removed after this date. If your plans change, edit your response.')
    .setRequired(true);
  const profile = form.addPageBreakItem().setTitle(PROFILE_SECTION);
  const mc = roleItem.asMultipleChoiceItem();
  mc.setChoices(
    ROLE_CHOICES.map(function (c) {
      return mc.createChoice(c, c === UNDERGRAD_CHOICE ? ugrad : profile);
    })
  );
  return { ugrad: ugrad, profile: profile };
}

function createTraineeForm() {
  const form = FormApp.create(FORM_TITLE);
  form.setDescription(
    'Use this form to add or update your profile on the Jules Stein Eye Institute research website ' +
      '(julessteinlabs.org). Profiles are reviewed before they appear. You can come back and edit your ' +
      'response at any time to update it. You will need to sign in with a Google account to upload a headshot.'
  );
  // Collect the respondent's signed-in (verified) Google account email. It is used
  // only to match a person's edits to their earlier response; it is never published.
  if (FormApp.EmailCollectionType && form.setEmailCollectionType) {
    form.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED);
  } else {
    form.setCollectEmail(true);
  }
  form.setAllowResponseEdits(true);
  form.setLimitOneResponsePerUser(true);
  form.setConfirmationMessage(
    'Thank you! Your profile will appear on the website after it is reviewed. ' +
      'To make changes later, use the edit link in your confirmation email or open this form again.'
  );

  form.addTextItem().setTitle("Full name").setHelpText('As it should appear on the website.').setRequired(true);
  form.addTextItem().setTitle("Pronouns").setHelpText('Optional, e.g. she/her, he/him, they/them.');
  const roleItem = form.addMultipleChoiceItem().setTitle("Role").setChoiceValues(ROLE_CHOICES).setRequired(true);
  addUndergradBranch_(form, roleItem);
  form
    .addTextItem()
    .setTitle("Title")
    .setHelpText('Your official title, e.g. "Postdoctoral Scholar", "PhD Candidate, Neuroscience IDP", "Staff Research Associate II".')
    .setRequired(true);
  form.addListItem().setTitle("Lab").setChoiceValues(LAB_CHOICES).setRequired(true);

  const maxLen = FormApp.createParagraphTextValidation()
    .requireTextLengthLessThanOrEqualTo(1200)
    .setHelpText('Please keep this under 1200 characters.')
    .build();
  form
    .addParagraphTextItem()
    .setTitle("Research interests and role")
    .setHelpText(
      'Two to four sentences, written in the third person, about your research interests and/or your role in the lab. ' +
        'Example: "Jane studies how retinal ganglion cells adapt to changing light levels, using multi-electrode array recordings."'
    )
    .setValidation(maxLen)
    .setRequired(true);

  form.addDateItem().setTitle("Start date").setHelpText('When you started at JSEI (approximate is fine).').setRequired(true);
  form
    .addDateItem()
    .setTitle("Expected end date")
    .setHelpText(END_DATE_HELP);

  const emailValidation = FormApp.createTextValidation().requireTextIsEmail().build();
  form
    .addTextItem()
    .setTitle("Public contact email")
    .setHelpText('Optional. Shown publicly on your profile. Leave blank to hide.')
    .setValidation(emailValidation);

  const urlValidation = FormApp.createTextValidation().requireTextIsUrl().build();
  form.addTextItem().setTitle("Personal website").setHelpText('Optional. Full URL, starting with https://').setValidation(urlValidation);
  form.addTextItem().setTitle("ORCID iD").setHelpText('Optional, e.g. 0000-0002-1825-0097');
  form.addTextItem().setTitle("Google Scholar profile").setHelpText('Optional. Full URL.').setValidation(urlValidation);
  form.addTextItem().setTitle("LinkedIn profile").setHelpText('Optional. Full URL.').setValidation(urlValidation);

  form
    .addCheckboxItem()
    .setTitle("Consent to publish")
    .setChoiceValues([
      'I agree that my name, photo, and the information above may be published on the public Jules Stein Eye Institute website, and I understand I can ask for my profile to be removed at any time.',
    ])
    .setRequired(true);

  const ss = SpreadsheetApp.create(FORM_TITLE + ' (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Form (edit):      ' + form.getEditUrl());
  Logger.log('Form (share):     ' + form.getPublishedUrl());
  Logger.log('Responses Sheet:  ' + ss.getUrl());
  Logger.log('Sheet ID (for the TRAINEE_SHEET_ID secret): ' + ss.getId());
  Logger.log('NEXT: add the Headshot question by hand, then run finishSetup.');
  PropertiesService.getScriptProperties().setProperties({ formId: form.getId(), sheetId: ss.getId() });
}

const PUBLISHED_SHEET = 'Published';
const APPROVED_HEADER = 'Approved';
const ACCOUNT_HEADER = 'email address'; // form-collected Google account, compared lowercase

function responsesSheet_() {
  const sheetId = PropertiesService.getScriptProperties().getProperty('sheetId');
  const ss = SpreadsheetApp.openById(sheetId);
  return ss.getSheets().filter(function (sh) {
    return sh.getFormUrl();
  })[0] || ss.getSheets()[0];
}

function headerIndex_(sheet, name) {
  if (sheet.getLastColumn() < 1) return -1;
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === name.toLowerCase()) return i + 1;
  }
  return -1;
}

/** One-time setup after the Headshot question has been added to the form. */
function finishSetup() {
  const sheet = responsesSheet_();
  const ss = sheet.getParent();
  if (headerIndex_(sheet, APPROVED_HEADER) < 0) {
    const col = sheet.getLastColumn() + 1;
    sheet.getRange(1, col).setValue(APPROVED_HEADER).setFontWeight('bold');
    sheet.getRange(2, col, sheet.getMaxRows() - 1, 1).insertCheckboxes();
  }
  sheet.setFrozenRows(1);

  var pub = ss.getSheetByName(PUBLISHED_SHEET);
  if (!pub) pub = ss.insertSheet(PUBLISHED_SHEET);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  pub.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  pub.setFrozenRows(1);
  pub.getRange('A1').setNote('Filled automatically when you tick Approved on the responses tab. Do not edit by hand.');

  // Replace only this project's own review triggers (safe to re-run).
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (['onTraineeResponse', 'onReviewEdit'].indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onTraineeResponse').forSpreadsheet(ss).onFormSubmit().create();
  ScriptApp.newTrigger('onReviewEdit').forSpreadsheet(ss).onEdit().create();
  Logger.log('Setup complete. Share the form link with trainees; tick Approved to publish.');
}

/** Trigger: a new or edited response always needs review. */
function onTraineeResponse(e) {
  const sheet = e.range.getSheet();
  const col = headerIndex_(sheet, APPROVED_HEADER);
  if (col < 0) return;
  const cell = sheet.getRange(e.range.getRow(), col);
  cell.insertCheckboxes();
  cell.uncheck();
  cell.setNote('Pending review (' + new Date().toLocaleString() + ')');
}

/**
 * Trigger: ticking or unticking Approved publishes or unpublishes that row.
 * Editing any other cell of an already-approved row (e.g. fixing a typo)
 * re-publishes it with the correction.
 */
function onReviewEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() === PUBLISHED_SHEET || !sheet.getFormUrl()) return;
  const col = headerIndex_(sheet, APPROVED_HEADER);
  if (col < 0) return;
  const touchesApproved = e.range.getColumn() <= col && e.range.getLastColumn() >= col;
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    for (var r = Math.max(2, e.range.getRow()); r <= e.range.getLastRow(); r++) {
      const approved = sheet.getRange(r, col).getValue() === true;
      if (touchesApproved || approved) publishRow_(sheet, r, approved);
    }
  } finally {
    lock.releaseLock();
  }
}

function publishRow_(sheet, row, approved) {
  const ss = sheet.getParent();
  const pub = ss.getSheetByName(PUBLISHED_SHEET);
  const width = sheet.getLastColumn();
  const values = sheet.getRange(row, 1, 1, width).getValues()[0];
  const acctCol = headerIndex_(sheet, ACCOUNT_HEADER);
  const key = acctCol > 0 ? String(values[acctCol - 1]).trim().toLowerCase() : '';
  if (!key) return;
  // Remove this person's existing published row(s).
  // Keep Published's header row identical to the responses tab.
  sheet.getRange(1, 1, 1, width).copyTo(pub.getRange(1, 1, 1, width), { contentsOnly: true });
  const pubAcct = headerIndex_(pub, ACCOUNT_HEADER);
  if (pubAcct > 0) {
    for (var i = pub.getLastRow(); i >= 2; i--) {
      if (String(pub.getRange(i, pubAcct).getValue()).trim().toLowerCase() !== key) continue;
      // Sheets refuses to delete the last non-frozen row; clear it instead.
      if (pub.getMaxRows() - pub.getFrozenRows() > 1) pub.deleteRow(i);
      else pub.getRange(i, 1, 1, pub.getLastColumn()).clearContent();
    }
  }
  if (approved) {
    // copyTo with contentsOnly copies stored values exactly: text that looks like a
    // formula (e.g. "=...") stays text, and dates are not shifted between time zones.
    const target = pub.getRange(pub.getLastRow() + 1, 1, 1, width);
    sheet.getRange(row, 1, 1, width).copyTo(target, { contentsOnly: true });
    sheet.getRange(row, headerIndex_(sheet, APPROVED_HEADER)).setNote('Published ' + new Date().toLocaleString());
  } else {
    sheet.getRange(row, headerIndex_(sheet, APPROVED_HEADER)).setNote('Not published');
  }
}

/** Replaces the Lab dropdown choices with LAB_CHOICES (after labs change). */
function updateLabChoices() {
  const formId = PropertiesService.getScriptProperties().getProperty('formId');
  const form = FormApp.openById(formId);
  const item = form.getItems(FormApp.ItemType.LIST).filter(function (i) {
    return i.getTitle() === "Lab";
  })[0];
  item.asListItem().setChoiceValues(LAB_CHOICES);
  Logger.log('Lab choices updated (' + LAB_CHOICES.length + ' labs).');
}

/**
 * One-time update for a form created before 2026-10-22: adds "Undergraduate
 * Student" to Role and the required graduation-date section. Existing questions
 * and responses are not changed. Safe to run again: it stops if the section exists.
 */
function addUndergraduateSection() {
  const formId = PropertiesService.getScriptProperties().getProperty('formId');
  const form = FormApp.openById(formId);
  const items = form.getItems();
  const byTitle = function (t) {
    return items.filter(function (i) { return i.getTitle() === t; })[0];
  };
  if (byTitle(UNDERGRAD_SECTION)) {
    Logger.log('The undergraduate section already exists; nothing to do.');
    return;
  }
  const role = byTitle("Role");
  if (!role) throw new Error('Could not find the "Role" question.');
  const roleIndex = role.getIndex();
  // Questions after Role (Title, Lab, ...) end up in the new "Your profile" section.
  const branch = addUndergradBranch_(form, role);
  // New items were added at the end; move them to sit right after Role.
  const gradItem = byTitleFresh_(form, "Expected graduation date");
  // moveItem by index; re-read each index because every move shifts the others.
  form.moveItem(branch.ugrad.getIndex(), roleIndex + 1);
  form.moveItem(gradItem.getIndex(), roleIndex + 2);
  form.moveItem(branch.profile.getIndex(), roleIndex + 3);
  const end = byTitleFresh_(form, "Expected end date");
  if (end) end.asDateItem().setHelpText(END_DATE_HELP);
  Logger.log('Done. Role now offers "' + UNDERGRAD_CHOICE + '", which leads to a required "Expected graduation date".');
  Logger.log('Check the form with the Preview (eye) button: choose Undergraduate Student, then another role.');
}

function byTitleFresh_(form, title) {
  return form.getItems().filter(function (i) { return i.getTitle() === title; })[0];
}
