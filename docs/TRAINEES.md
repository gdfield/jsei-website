# Trainee profiles: how they work and how to set them up

Project scientists, postdocs, graduate students, medical students, and staff research associates add themselves to the website through a Google Form. Nothing appears on the site until you approve it in the linked Google Sheet. A GitHub Action copies approved profiles (and headshots) into the repository every night, and Vercel redeploys.

```
Trainee fills in Google Form (signs in with Google to upload a headshot)
        |
        v
"Form Responses" tab  --you tick Approved-->  "Published" tab
                                                   |
                       nightly GitHub Action (scripts/sync-trainees.mjs)
                                                   |
                                                   v
   app/data/trainees.json + public/images/trainees/*.jpg  -->  commit to main  -->  Vercel deploy
```

## What the site shows

- `/trainees`: directory of everyone currently active, grouped by role and filterable by role and lab. The **Trainees** link appears in the header and footer once at least one profile is published.
- `/trainees/<name>`: one profile page per person (photo, name, pronouns, title, lab, description, optional public email and links).
- Every lab page gets a **Lab Members** section listing that lab's trainees. It is hidden while a lab has none.
- A profile is shown from its start date until its expected end date, then disappears automatically (pages re-check daily).

What is never published: the Google account email the trainee signed in with, Drive file IDs, and anything in rows you have not approved. Headshots are cropped to 600 x 600 and their metadata (including any location data) is removed.

## Day-to-day use

- **Invite people:** send the form's share link (from step 2 below). Trainees can reopen the form to edit their response at any time.
- **Approve:** open the responses Sheet and tick **Approved** on the row. That copies it to the **Published** tab. The site updates after the next nightly sync, or run it right away: GitHub > Actions > "Sync trainee profiles" > Run workflow.
- **Edits:** when someone edits their response, their Approved box clears automatically and the cell note says "Pending review". Their current live profile stays up until you tick Approved again.
- **Fix a typo yourself:** edit the cell on the responses tab. If the row is already approved, the Published copy updates automatically.
- **Remove someone:** untick Approved. They disappear at the next sync. (Or let their expected end date pass.) Untick before deleting a response row; deleting a row on its own does not unpublish it.
- **Problems:** the Action's log lists any rows it skipped and why (for example an unrecognized lab or missing consent). Headshots in formats the sync cannot read (possibly some iPhone HEIC files) are reported by name; ask the person for a JPEG or PNG.
- **Safety stops:** the sync fails, and changes nothing, if a required column on the Published tab is missing or renamed, or if it would remove more than half of the published profiles at once. If a large removal is intended, run the workflow manually with **allow_shrink** ticked.
- **Stable links:** each person keeps the same profile URL across syncs, even if someone with the same name joins later (`scripts/trainees/slug-registry.json` records this using a one-way hash of the sign-in email, never the email itself).

## One-time setup (about 30 minutes)

### 1. Create the form and Sheet

1. Go to <https://script.google.com>, click **New project**, and name it "JSEI trainee form".
2. Delete the contents of `Code.gs`, paste in all of `scripts/google/create-trainee-form.gs` from this repository, and click **Save**.
3. Pick `createTraineeForm` in the function menu and click **Run**. Approve the permissions prompt (Google warns that the app is unverified because it is your own script; choose Advanced > Go to project).
4. Open **Execution log**. It lists the form edit link, the share link, the Sheet link, and the **Sheet ID**. Keep the Sheet ID for step 4.
5. In the form editor, open **Settings > Responses** and confirm **Collect email addresses** is set to **Verified**. The script requests this, but check it: the sign-in email is what ties a person's edits to their earlier response.

### 2. Add the headshot question (by hand)

Apps Script cannot create file-upload questions, so add this one in the form editor:

1. Open the form edit link. Click the Consent to publish question, click **+** to add a question, then drag the new question just above Consent to publish.
2. Set the type to **File upload**, title it exactly `Headshot`, and mark it **Required**.
3. Allow only specific file types: **Image**. Maximum number of files: **1**. Maximum file size: **10 MB**.
4. Help text suggestion: "A clear, recent head-and-shoulders photo, ideally square, at least 600 x 600 pixels."

Then back in Apps Script, run `finishSetup`. It adds the **Approved** column, creates the **Published** tab, and installs the two review triggers. Approve the extra permissions it asks for.

Test it: submit the form once yourself, tick Approved, and check that a row appears on the Published tab. Edit your response and check that Approved clears.

### 3. Create a Google service account (read-only access for the sync)

1. Go to <https://console.cloud.google.com>, create a project (for example "jsei-website"), and select it.
2. **APIs & Services > Library**: enable **Google Sheets API** and **Google Drive API**.
3. **IAM & Admin > Service Accounts > Create service account**, name it "jsei-trainee-sync". No roles are needed. Click Done.
4. Open the new service account > **Keys > Add key > Create new key > JSON**. A `.json` file downloads. Treat it like a password.
5. Copy the service account's email address (it ends in `iam.gserviceaccount.com`).
6. Share with that address, as **Viewer**:
   - the responses Sheet, and
   - the Drive folder that holds the uploaded headshots. Google creates it the first time someone uploads a file; it is named after the form with "(File responses)" and sits next to the form in your Drive.

If UCLA's Google Workspace does not let you create Cloud projects or share with outside accounts, a personal Google account works for the form, the Sheet, and the service account.

### 4. Add the secrets to GitHub

In the repository on GitHub: **Settings > Secrets and variables > Actions > New repository secret**.

- `GOOGLE_SERVICE_ACCOUNT_JSON`: paste the entire contents of the downloaded `.json` key file.
- `TRAINEE_SHEET_ID`: the Sheet ID from step 1.

Then delete the downloaded key file from your computer.

### 5. Run it

GitHub > **Actions > Sync trainee profiles > Run workflow**. The log reports how many profiles were published and any rows that were skipped. If anything changed it commits to `main`, and Vercel deploys a minute or two later.

To check new profiles before they go live, type a branch name such as `trainee-preview` in the **preview_branch** box. The sync then pushes to that branch instead of `main`, and Vercel builds a preview deployment you can open from the branch's commit on GitHub (or the Vercel dashboard). The live site is untouched. Leave the box blank to publish.

### 6. Branch protection

The Action commits directly to `main`. If you later add branch protection that requires pull requests or status checks on `main`, allow GitHub Actions to bypass it or the nightly sync will fail to push.

## When labs change

The form's Lab dropdown must match the labs in `app/data/labs.js` (which come from `app/data/faculty.js` plus the four standalone lab pages). After adding or removing a lab:

1. Run `npm run trainees:lab-choices` and paste the output over `LAB_CHOICES` in the Apps Script project.
2. Run `updateLabChoices` in Apps Script.

A response whose lab is no longer recognized is skipped (and named in the sync log) rather than published under the wrong lab.

## Files

| File | Purpose |
|---|---|
| `scripts/google/create-trainee-form.gs` | Creates the form and Sheet; review/publish triggers |
| `scripts/trainees/fields.mjs` | Exact question titles and role choices (must match the form) |
| `scripts/trainees/transform.mjs` | Turns Sheet rows into public records (validation, links, slugs) |
| `scripts/sync-trainees.mjs` | Reads the Published tab and headshots, writes the data and photos |
| `scripts/trainees/slug-registry.json` | Generated; keeps each person's URL stable |
| `scripts/test-trainees.mjs` | Offline checks (`npm run test:trainees`), using a fictional fixture |
| `.github/workflows/sync-trainees.yml` | Nightly and on-demand sync, commits to `main` |
| `app/data/labs.js` | Lab list shared by the form, sync, and pages |
| `app/data/trainees.json`, `trainees-meta.json` | Generated; do not edit by hand |
| `app/trainees/`, `app/components/Trainee*.js`, `LabTrainees.js` | Pages and components |

Local preview with fictional data: `node scripts/sync-trainees.mjs --fixture scripts/trainees/fixtures/sample-sheet.json --write`, then `npm run dev` (fixture profiles have no photos). Without `--write` the fixture run only reports what it would do. Undo with `git checkout app/data/trainees.json app/data/trainees-meta.json` and never commit fixture data.

Running the real sync on your own computer needs the service-account key in `GOOGLE_SERVICE_ACCOUNT_JSON` and `TRAINEE_SHEET_ID` set; normally just use the GitHub Action. Run `npm install` once first so the image library (`sharp`) is installed for your Mac.

## Privacy

Publication is opt-in: the form requires the consent checkbox and every profile is approved by a person before it appears. Graduate and medical students may have FERPA directory-information restrictions; confirm UCLA's policy on publishing student information with the Registrar's Office before inviting students. This document is not legal advice.
