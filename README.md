# Clinic Landing Page + Admin (Next.js)

## Naye client ke liye (10 minute)
1. Is folder ko copy karo, GitHub pe naya repo banao.
2. `npm install && npm run dev` -> http://localhost:3000/admin (local me ADMIN_PASSWORD=test npm run dev)
3. Admin me naam, logo, phone, services bharo -> **site.json download** -> `config/site.json` replace karo.
4. GitHub pe push -> vercel.com me "Import Project" -> Deploy (free). Live link mil jayega.
5. Vercel > Settings > Environment Variables me `ADMIN_PASSWORD` sirf APNE project me rakho. Client ke project me mat daalo (admin lock rahega).

## Leads Google Sheet me (free CRM)
1. Naya Google Sheet banao, row 1: Time | Naam | Phone | Takleef | Kab | Status
2. Extensions > Apps Script me ye paste karo:
```
function doPost(e){var d=JSON.parse(e.postData.contents);SpreadsheetApp.getActiveSheet().appendRow([new Date(),d.name,d.phone,d.concern,d.time,"New"]);return ContentService.createTextOutput("ok");}
function doGet(){return ContentService.createTextOutput(JSON.stringify(SpreadsheetApp.getActiveSheet().getDataRange().getValues())).setMimeType(ContentService.MimeType.JSON);}
```
3. Deploy > New deployment > Web app > Who has access: **Anyone** > URL copy karo.
4. Wo URL admin me "Leads webhook URL" me daalo, site.json download karke deploy karo.
Status column Sheet me khud badlo (New/Called/Booked).

# dental_clinic
