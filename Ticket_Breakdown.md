# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
Assumptions made:
- Frontend and backend are separate repositories and/or engineers work on backend and frontend tasks separately.
- Facility dashboard is handled by Facility admin only.
- I am assuming max 12 chars alphanumeric string.

1. [Backend]Add `custom_id` column to Agents Table. Add `use_custom_agent_id` in Facilities Table (ideally with a migration). Time Effort (1hr)

2. [Frontend] In Facility Dashboard, create a checkbox to set the value of `use_custom_agent_id` flag based on preference of facility admin. The value is to be sent in the Create/Update Facility API. 
    - Time effort (6h)
    - Acceptance Criteria:
        - If checkbox selected, the value must be stored as true
        - If checkbox unselected the value must be stored as false

3. [Frontend] Create an input field in the Create/Update/Manage Agent screen that can be used by facility managers to input customised IDs for each agent. Send the input as `custom_id` in the POST/PATCH agent api. This field is only visible if the facility has set `use_custom_agent_id` = true in the facility settings dashboard.
    - Time effort (6h)
    - Acceptance Criteria:
        - if facility.use_custom_agent_id = true, then the input box disabled prop should be false
        - if facility.use_custom_agent_id = false/undefined, then the input box disabled prop should be true
        - if input box is enabled, then the field must not be empty when the submit button is pressed
        - if input box is enabled the data type must be string and should not exceed 12 chars and should not contain special characters.

4. [Backend] in the POST/PATCH agent api add a validation for `custom_id` property.
    - Time effort(2h)
    - Validations And Acceptance criteria :
        - If `custom_id` is passed it cannot be empty/undefined/null
        - Format must be string
        - We can define a max length for readability purpose

5. [Backend] 
    - In the `getShiftsByFacility` function:
        - The db query must return `custom_id` field when agent data is queried.
        - Transform the data returned by query such that:
            - if (shift?.agent?.custom_id && facility?._use_custom_agent_id) {
                shift.agent.id = shift.agent.custom_id
            }
        This will make the changes isolated to the `getShiftsByFacility` and will not affect/change functionality at any other place in the backend.

    - Time effort(6h)
    -Acceptance criteria:
        - For facility with `use_custom_agent_id` = false, in data passed to `generateReport`, the agent ID must be the internal db id
        - For facility with `use_custom_agent_id` = true, in data passed to `generateReport`, the agent ID must be the custom_id
