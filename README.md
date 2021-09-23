# Nipa_Ticket_Management_API
This api using for create, modify or get helpdesk ticket data.

## Create new ticket
**Request Method:** `POST`<br/>
**Request Url:** `/ticket/`<br/>
Request Body
---- |
<br/><pre>{<br/>"information": "Your information",<br/>"title": "Your Title",<br/>"description": "Your description",<br/>"contact_information": "Your contact_information"<br/>}</pre> |

<br/><br/>
## Update ticket
**Request Method:** `PUT`<br/>
**Request Url:** `/ticket/`<br/>
Request Body
---- |
<br/><pre>{<br/>"id": "Which ticket id",<br/>"information": "New information (optional)",<br/>"title": "New Title (optional)",<br/>"description (optional)": "New description (optional)",<br/>"contact_information": "New contact_information (optional)",<br/>"status": "(pending \|\| accepted \|\| resolved \|\| rejected)"<br/>}</pre> |


<br/><br/>
## Get ticket data
**Request Method:** `GET`<br/>
**Request Url:** `/ticket/`<br/>
Request Body | Result
---- | ----
Nothing | Get All Tickets |
{<br/>"status": "(pending \|\| accepted \|\| resolved \|\| rejected) (optional)"<br/>} | Get Ticket By Status |
