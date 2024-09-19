export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <h3>Assignment Name</h3>
      </label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea cols={40} rows={10} id="wd-description">
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Links to the Kanbas application Links to all relevant source
        code repositories. The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td colSpan={2}>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option selected value="Percentage">
                Percentage
              </option>
              <option value="Points">Points</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option selected value="Online">
                Online
              </option>
              <option value="inperson">In person</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td></td>
          <td align="left" valign="top" colSpan={2}>
            <label>Online Entry Options</label> <br />
            <input type="checkbox" name="check-genre" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" name="check-genre" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input
              type="checkbox"
              name="check-genre"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="check-genre"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" name="check-genre" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>
            <br />
          </td>
        </tr>
        <br />
        <tr>
          <td colSpan={2} align="center">
            <label htmlFor="wd-assign-to">Assign Assignment to</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td colSpan={2}>
            <input id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <br />
        <tr>
          <td></td>
          <td>
            <label htmlFor="wd-due-date">Due</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
          </td>
        </tr>
        <br />

        <tr>
          <td></td>
          <td>
            <label htmlFor="wd-available-from">Available from</label> <br />
            <input
              type="date"
              id="wd-available-from"
              defaultValue="2024-05-06"
            />
          </td>
          <td>
            <label htmlFor="wd-available-until">Until</label>
            <br />
            <input
              type="date"
              id="wd-available-until"
              defaultValue="2024-05-20"
            />
          </td>
        </tr>
      </table>
      <hr></hr>

      <table width="100%">
        <tr>
          <td align="right">
            <button>Cancel</button>
            <button>Save</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
